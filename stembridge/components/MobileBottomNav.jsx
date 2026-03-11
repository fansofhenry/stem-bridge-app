// components/MobileBottomNav.jsx — Sticky bottom nav for mobile
// Shows 3 core actions: Browse, Match, Upload — always accessible.
"use client";

import { useState, useEffect } from "react";

export default function MobileBottomNav() {
  const [visible, setVisible] = useState(false);

  // Only show after scrolling past the hero section
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md
        border-t border-sand shadow-[0_-2px_16px_rgba(0,0,0,0.08)]
        flex items-stretch justify-around px-2 py-1.5
        animate-[slideUp_.3s_ease-out]"
    >
      <a
        href="#search-anchor"
        className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl
          text-green-DEFAULT no-underline transition-colors hover:bg-green-pale active:bg-green-pale"
      >
        <span className="text-lg">🔍</span>
        <span className="text-[0.6rem] font-bold tracking-wide">Browse</span>
      </a>

      <a
        href="#match"
        className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl
          text-green-DEFAULT no-underline transition-colors hover:bg-green-pale active:bg-green-pale"
      >
        <span className="text-lg">🎯</span>
        <span className="text-[0.6rem] font-bold tracking-wide">Match</span>
      </a>

      <button
        onClick={() => window.dispatchEvent(new CustomEvent("stembridge:openUpload", { detail: "upload" }))}
        className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl
          bg-green-DEFAULT text-white border-none cursor-pointer font-sans transition-all
          hover:bg-green-mid active:bg-green-mid"
      >
        <span className="text-lg">⬆</span>
        <span className="text-[0.6rem] font-bold tracking-wide">Upload</span>
      </button>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
