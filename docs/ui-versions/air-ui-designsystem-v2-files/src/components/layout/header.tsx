"use client";

import { useEditorStore } from "@/src/stores/editor-store";

function LineIcon({ type }: { type: "logo" | "save" | "play" | "mode" }) {
  if (type === "logo") {
    return (
      <span className="air-icon air-icon-gold text-[22px]">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 21 12 12 21 3 12 12 3Z" />
          <path d="M12 7 17 12 12 17 7 12 12 7Z" />
        </svg>
      </span>
    );
  }
  if (type === "save") {
    return (
      <span className="air-icon text-[18px]">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h10l2 2v14H6V4Z" />
          <path d="M9 4v6h6V4" />
          <path d="M9 17h6" />
        </svg>
      </span>
    );
  }
  if (type === "play") {
    return (
      <span className="air-icon air-icon-gold text-[18px]">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 9 6-9 6V6Z" />
        </svg>
      </span>
    );
  }
  return (
    <span className="air-icon text-[18px]">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v16" />
        <path d="M4 12h16" />
        <path d="M7 7l10 10" />
        <path d="M17 7 7 17" />
      </svg>
    </span>
  );
}

export function Header() {
  const mode = useEditorStore((state) => state.mode);
  const setMode = useEditorStore((state) => state.setMode);

  const isBeginner = mode === "beginner";

  return (
    <header className="air-surface flex h-[50px] shrink-0 items-center justify-between px-5">
      <div className="flex items-center gap-2.5">
        <LineIcon type="logo" />
        <span className="font-serif text-[15px] font-semibold tracking-[0.08em] text-white">AI 叙事工具</span>
        <button
          type="button"
          onClick={() => setMode(null)}
          className={[
            "ml-1 inline-flex items-center gap-1.5 px-2 py-1 text-xs font-light tracking-[0.08em] transition hover:text-white",
            isBeginner ? "text-[#D4B886]/80" : "text-[#A4B8D6]/85",
          ].join(" ")}
        >
          <LineIcon type="mode" />
          {isBeginner ? "新手模式" : "策划模式"}
          <span className="ml-1.5 text-[10px] opacity-50">切换</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-white/55 transition hover:text-white"
        >
          <LineIcon type="save" />
          保存
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-light text-[#D4B886]/80 transition hover:text-[#D4B886]"
        >
          <LineIcon type="play" />
          试玩
        </button>
      </div>
    </header>
  );
}
