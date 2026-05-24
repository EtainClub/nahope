"use client";

import { useEffect } from "react";

export default function PaletteSwitcher() {
  useEffect(() => {
    localStorage.setItem("omega-palette", "alien");
    document.documentElement.dataset.palette = "alien";
  }, []);

  return null;
}
