"use client";

import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode } from "@/src/types";

const modes: Array<{
  id: EditorMode;
  icon: string;
  title: string;
  description: string;
  tone: "gold" | "blue";
}> = [
  {
    id: "beginner",
    icon: "◇",
    title: "我是新手",
    description: "AI帮你搞定一切，选一选点一点就能创建游戏，不满意就重新生成",
    tone: "gold",
  },
  {
    id: "pro",
    icon: "◎",
    title: "我是策划",
    description: "完整的编辑能力，每个字段都可以精细调整，适合有经验的创作者",
    tone: "blue",
  },
];

export function ModeSelect() {
  const setMode = useEditorStore((state) => state.setMode);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[#0a0a0f] text-[#e0e0e0]">
      <section className="w-[520px] text-center">
        <div className="mb-2 text-[22px] text-[#D4B886]">◇</div>
        <h1 className="mb-2 font-serif text-[22px] font-bold tracking-[0.1em] text-white">
          AI 叙事工具
        </h1>
        <p className="mb-10 text-[13px] text-white/35">选择适合你的创作模式</p>

        <div className="grid grid-cols-2 gap-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setMode(mode.id)}
              className={[
                "h-[186px] p-6 text-center transition hover:-translate-y-0.5",
                mode.tone === "gold"
                  ? "border-[rgba(212,184,134,0.2)] bg-[rgba(212,184,134,0.04)] hover:border-[rgba(212,184,134,0.45)] hover:bg-[rgba(212,184,134,0.08)]"
                  : "border-[rgba(164,184,214,0.2)] bg-[rgba(164,184,214,0.04)] hover:border-[rgba(164,184,214,0.45)] hover:bg-[rgba(164,184,214,0.08)]",
              ].join(" ")}
            >
              <span className="mb-3 block text-4xl">{mode.icon}</span>
              <span className="mb-2 block text-[17px] font-bold text-white">{mode.title}</span>
              <span className="block text-xs leading-7 text-white/45">{mode.description}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
