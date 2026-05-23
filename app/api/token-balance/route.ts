import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL =
  process.env.SOLANA_RPC_URL ||
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  "https://api.mainnet-beta.solana.com";

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const wallet = searchParams.get("wallet");
  const mint = searchParams.get("mint");

  if (!wallet || !mint) {
    return NextResponse.json(
      { error: "Missing wallet or mint param" },
      { status: 400 }
    );
  }

  let walletPubkey: PublicKey;
  let mintPubkey: PublicKey;
  try {
    walletPubkey = new PublicKey(wallet);
    mintPubkey = new PublicKey(mint);
  } catch {
    return NextResponse.json({ error: "Invalid public key" }, { status: 400 });
  }

  try {
    const connection = new Connection(RPC_URL, "confirmed");
    const accounts = await connection.getParsedTokenAccountsByOwner(
      walletPubkey,
      { mint: mintPubkey, programId: TOKEN_PROGRAM_ID }
    );

    const balance = accounts.value.reduce((sum, acc) => {
      const amount = (acc.account.data as any).parsed?.info?.tokenAmount
        ?.uiAmount;
      return sum + (typeof amount === "number" ? amount : 0);
    }, 0);

    return NextResponse.json({ balance });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "RPC error" },
      { status: 502 }
    );
  }
}
