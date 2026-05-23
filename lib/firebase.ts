import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, query, where, orderBy, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
let db: any = null;

try {
  db = getFirestore(app);
} catch (e) {
  console.warn("Failed to initialize Firestore, using localStorage fallback:", e);
}

// Fallback Local Storage functions
const getLocalData = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultValue;
  }
};

const setLocalData = (key: string, data: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Interfaces
export interface UserProfile {
  solanaAddress: string;
  tokenBalance: number;
  inventory: string[];
  checkInDates: string[]; // YYYY-MM-DD
  lastCheckIn: string | null;
}

export interface CommunityPost {
  id: string;
  category: "scenario" | "brag";
  author: string;
  authorAddress: string;
  text: string;
  items: string[];
  votes: number;
  votedBy: string[]; // mock user ids or addresses that voted
  timestamp: number;
}

const DEFAULT_PROFILE: UserProfile = {
  solanaAddress: "Hopo...7XzP",
  tokenBalance: 25000,
  inventory: [],
  checkInDates: [],
  lastCheckIn: null,
};

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "scen-1",
    category: "scenario",
    author: "HopoSurvivor_88",
    authorAddress: "8xY7...9PqR",
    text: "Part 2 opens in a hidden military bunker beneath Hopo Port. Sung-ki discovers that the Korean Defense Unit was secretly experimenting on the extraterrestrial debris since the 1970s. Utilizing the translator fragment, he hacks into the alien hive mind frequency, planning to weaponize the cosmic radiation against the mothership using his modified Carbine rifle.",
    items: ["Lost Carbine Rifle", "Omega (Ω) Amulet", "Translator Fragment"],
    votes: 14820,
    votedBy: [],
    timestamp: Date.now() - 7200000,
  },
  {
    id: "scen-2",
    category: "scenario",
    author: "K_Occultist",
    authorAddress: "3wA1...2BsD",
    text: "The 'Red Silhouette' entity is actually an ancient shamanic deity from Korean folklore that was awakened by the alien electromagnetic pulse. Bum-seok tries to call the mainland using a dead phone, only to hear the voices of deceased soldiers. In Part 2, the conflict escalates into a three-way war between human survivors, the ancient deity, and the cosmic entities.",
    items: ["Dead Rotary Phone", "Sun-like Red Emblem", "Torn ID Tag of a Defense Soldier"],
    votes: 9340,
    votedBy: [],
    timestamp: Date.now() - 18000000,
  },
  {
    id: "brag-1",
    category: "brag",
    author: "SolanaMemeLord",
    authorAddress: "Fxz3...8KyL",
    text: "Look at my Omega collection! Picked up the Green Alien Slime by using the screwdriver on the desk rifle. Took me an hour to figure out! Also holding 120,000 $NAHOPE! Ready for Episode 2! 🚀👽",
    items: ["Green Alien Slime", "Lost Carbine Rifle", "Cabinet Key"],
    votes: 421,
    votedBy: [],
    timestamp: Date.now() - 14400000,
  }
];

let firestoreActive = true;

// Unified database operations with fallback
export const database = {
  // 1. User profile persistence
  async saveUserProfile(walletAddress: string, profile: UserProfile): Promise<void> {
    const localKey = `profile_${walletAddress}`;
    setLocalData(localKey, profile);
    
    // Save current active profile identity
    setLocalData("active_wallet_address", walletAddress);
    setLocalData("active_profile", profile);

    if (db && firestoreActive) {
      try {
        const docRef = doc(db, "users", walletAddress);
        await setDoc(docRef, profile, { merge: true });
      } catch (e) {
        console.error("Firestore save failed, disabling remote sync:", e);
        firestoreActive = false;
      }
    }
  },

  async getUserProfile(walletAddress: string): Promise<UserProfile> {
    const localKey = `profile_${walletAddress}`;
    const localProfile = getLocalData(localKey, null);

    if (db && firestoreActive) {
      try {
        const docRef = doc(db, "users", walletAddress);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          // Merge to sync local storage if remote has newer
          setLocalData(localKey, data);
          return data;
        }
      } catch (e) {
        console.error("Firestore fetch failed, disabling remote sync:", e);
        firestoreActive = false;
      }
    }

    if (localProfile) {
      return localProfile;
    }

    // Default configuration for new wallets
    const newProfile = { ...DEFAULT_PROFILE, solanaAddress: walletAddress };
    setLocalData(localKey, newProfile);
    return newProfile;
  },

  // 2. Community posts operations
  async addPost(post: Omit<CommunityPost, "id" | "votes" | "votedBy" | "timestamp">): Promise<CommunityPost> {
    const id = `post-${Date.now()}`;
    const newPost: CommunityPost = {
      ...post,
      id,
      votes: 0,
      votedBy: [],
      timestamp: Date.now(),
    };

    // Save to local storage
    const localPosts: CommunityPost[] = getLocalData("community_posts", DEFAULT_POSTS);
    const updatedPosts = [newPost, ...localPosts];
    setLocalData("community_posts", updatedPosts);

    if (db && firestoreActive) {
      try {
        const docRef = doc(db, "posts", id);
        await setDoc(docRef, newPost);
      } catch (e) {
        console.error("Firestore add post failed, disabling remote sync:", e);
        firestoreActive = false;
      }
    }

    return newPost;
  },

  async getPosts(category?: "scenario" | "brag"): Promise<CommunityPost[]> {
    let posts: CommunityPost[] = getLocalData("community_posts", DEFAULT_POSTS);

    if (db && firestoreActive) {
      try {
        const postsCol = collection(db, "posts");
        const docSnaps = await getDocs(postsCol);
        const fbPosts: CommunityPost[] = [];
        docSnaps.forEach((doc) => {
          fbPosts.push(doc.data() as CommunityPost);
        });
        if (fbPosts.length > 0) {
          // Sort descending by timestamp
          fbPosts.sort((a, b) => b.timestamp - a.timestamp);
          setLocalData("community_posts", fbPosts);
          posts = fbPosts;
        }
      } catch (e) {
        console.error("Firestore get posts failed, disabling remote sync:", e);
        firestoreActive = false;
      }
    }

    if (category) {
      return posts.filter((p: CommunityPost) => p.category === category);
    }
    return posts;
  },

  async votePost(postId: string, walletAddress: string): Promise<{ votes: number; voted: boolean }> {
    const localPosts: CommunityPost[] = getLocalData("community_posts", DEFAULT_POSTS);
    const post = localPosts.find((p: CommunityPost) => p.id === postId);

    if (!post) return { votes: 0, voted: false };

    const votedIdx = post.votedBy.indexOf(walletAddress);
    let voted = false;

    if (votedIdx > -1) {
      // Remove vote
      post.votedBy.splice(votedIdx, 1);
      post.votes = Math.max(0, post.votes - 1);
      voted = false;
    } else {
      // Add vote
      post.votedBy.push(walletAddress);
      post.votes += 1;
      voted = true;
    }

    setLocalData("community_posts", localPosts);

    if (db && firestoreActive) {
      try {
        const docRef = doc(db, "posts", postId);
        await setDoc(docRef, {
          votes: post.votes,
          votedBy: post.votedBy
        }, { merge: true });
      } catch (e) {
        console.error("Firestore vote failed, disabling remote sync:", e);
        firestoreActive = false;
      }
    }

    return { votes: post.votes, voted };
  },
};
