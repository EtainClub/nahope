const admin = require('firebase-admin');
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const serviceAccount = require('/Users/etain/devel-src/nahome/nahope-port-firebase-adminsdk-fbsvc-06cf3d5ed6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const storage = admin.storage();
const bucket = storage.bucket('nahope-port.firebasestorage.app');

const images = [
  {
    name: 'na_hong_jin.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2F31992f4dce7ce6cb8888057be56cc5a62e1fc57e'
  },
  {
    name: 'hwang_jung_min.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Fa1312834d18b63a2c528ed8087e96e8c1da0bcff'
  },
  {
    name: 'jo_in_sung.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Fab2933753dc87641e57d4d08c0924c584531e53f'
  },
  {
    name: 'jung_ho_yeon.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Fmovie-private%2Faa36783e905113c2ef76939071f89e61fe2397a6'
  },
  {
    name: 'taylor_russell.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F2479854F53F5D59F0D'
  },
  {
    name: 'cameron_britton.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Ffc661e62cbf715f4ced333724d9b6961a3530b3f'
  },
  {
    name: 'alicia_vikander.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmovie%2Ff8ab6896eb66da827506a21e8c91c9180203b330'
  },
  {
    name: 'michael_fassbender.jpg',
    url: 'https://search1.kakaocdn.net/thumb/C206x270.q85/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fmovie%2F93ae2b7be7bdc86ca0c5b26f6feafb103f81cf60'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function uploadImage(image) {
  const localPath = path.join(__dirname, image.name);
  console.log(`Downloading ${image.name}...`);
  await downloadFile(image.url, localPath);

  console.log(`Uploading ${image.name} to bucket ${bucket.name}...`);
  const token = crypto.randomUUID();
  const destination = `intro/${image.name}`;

  await bucket.upload(localPath, {
    destination: destination,
    metadata: {
      contentType: 'image/jpeg',
      metadata: {
        firebaseStorageDownloadTokens: token
      }
    }
  });

  // Clean up local file
  fs.unlinkSync(localPath);

  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/intro%2F${image.name}?alt=media&token=${token}`;
  console.log(`Successfully uploaded ${image.name}. Public URL:\n${publicUrl}\n`);
  return { name: image.name, url: publicUrl };
}

async function main() {
  const results = [];
  for (const image of images) {
    try {
      const res = await uploadImage(image);
      results.push(res);
    } catch (err) {
      console.error(`Error processing ${image.name}:`, err);
    }
  }
  console.log('--- ALL UPLOADS COMPLETED ---');
  console.log(JSON.stringify(results, null, 2));
}

main();
