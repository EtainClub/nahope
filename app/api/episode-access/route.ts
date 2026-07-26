import { NextRequest, NextResponse } from "next/server";
import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";

const EPISODE_THREE_GATE = 20_000;
const EPISODE_FOUR_GATE = 100_000;
const REQUIRED_BALANCE = {
  3: EPISODE_THREE_GATE,
  4: EPISODE_FOUR_GATE,
} as const;
const RPC_URL =
  process.env.SOLANA_RPC_URL ||
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  "https://api.mainnet-beta.solana.com";
const NAHOPE_MINT = process.env.NAHOPE_MINT || process.env.NEXT_PUBLIC_NAHOPE_MINT;
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");


export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet");
  const episode = request.nextUrl.searchParams.get("episode");

  if (episode !== "3" && episode !== "4") {
    return NextResponse.json({ error: "Unsupported episode" }, { status: 400 });
  }
  const episodeNumber = Number(episode) as keyof typeof REQUIRED_BALANCE;
  const requiredBalance = REQUIRED_BALANCE[episodeNumber];
  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet" }, { status: 400 });
  }
  if (!NAHOPE_MINT) {
    return NextResponse.json({ error: "$NAHOPE mint is not configured" }, { status: 503 });
  }

  let walletKey: PublicKey;
  let mintKey: PublicKey;
  try {
    walletKey = new PublicKey(wallet);
    mintKey = new PublicKey(NAHOPE_MINT);
  } catch {
    return NextResponse.json({ error: "Invalid public key configuration" }, { status: 400 });
  }

  try {
    const connection = new Connection(RPC_URL, "confirmed");
    const accounts = await connection.getParsedTokenAccountsByOwner(walletKey, {
      mint: mintKey,
      programId: TOKEN_PROGRAM_ID,
    });
    const balance = accounts.value.reduce((total, account) => {
      const data = account.account.data as ParsedAccountData;
      const amount = data.parsed?.info?.tokenAmount?.uiAmount;
      return total + (typeof amount === "number" ? amount : 0);
    }, 0);

    return NextResponse.json(
      { episode: episodeNumber, balance, required: requiredBalance, granted: balance >= requiredBalance },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Unable to verify the wallet balance" }, { status: 502 });
  }
}
