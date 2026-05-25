"use client";

import { useEffect } from "react";

/**
 * Attaches a `.is-game-route` marker to <body> while the player is on /game.
 * Used by global CSS (see app/globals.css) to suppress the global mobile
 * bottom navigation — the game owns the full viewport on every breakpoint.
 */
export default function GameRouteBodyClass() {
  useEffect(() => {
    document.body.classList.add("is-game-route");
    return () => {
      document.body.classList.remove("is-game-route");
    };
  }, []);
  return null;
}
