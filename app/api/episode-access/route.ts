import { NextRequest, NextResponse } from "next/server";

/**
 * Legacy compatibility endpoint.
 *
 * Episode access no longer depends on a wallet, token balance, or artifact
 * holdings. The game runtime enforces only the previous episode's local clear
 * record. Keep this route so older clients receive the new policy instead of
 * attempting a Solana balance check.
 */
export async function GET(request: NextRequest) {
  const episode = request.nextUrl.searchParams.get("episode");

  if (episode !== "2" && episode !== "3" && episode !== "4") {
    return NextResponse.json({ error: "지원하지 않는 에피소드입니다." }, { status: 400 });
  }

  return NextResponse.json(
    {
      episode: Number(episode),
      granted: true,
      requiredBalance: 0,
      walletRequired: false,
      artifactRequirement: 0,
      policy: "previous-episode-clear-only",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
