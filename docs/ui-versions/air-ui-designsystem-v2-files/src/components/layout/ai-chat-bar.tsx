"use client";

import { useState } from "react";

export function AiChatBar() {
  const [message, setMessage] = useState("");

  return (
    <footer className="air-surface shrink-0 px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="air-icon text-[28px] text-[#A4B8D6]">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
            <path d="M12 8v8" />
            <path d="M8.5 10.5 12 8l3.5 2.5" />
          </svg>
        </div>
        <div className="relative flex-1">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="和AI说说你想调整什么..."
            className="h-11 w-full px-1 pr-12 text-[15px] font-light text-white/80 outline-none transition placeholder:text-white/25 focus:border-[rgba(212,184,134,0.3)]"
          />
          <button
            type="button"
            className={[
              "absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 text-lg font-light transition",
              message.trim() ? "text-[#D4B886]" : "text-white/20",
            ].join(" ")}
          >
            ↑
          </button>
        </div>
        <button
          type="button"
          className="h-11 shrink-0 px-4 text-xs font-light text-white/45 transition hover:text-[#D4B886]"
        >
          🔄 重新生成
        </button>
      </div>
    </footer>
  );
}
