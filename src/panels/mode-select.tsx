"use client";

import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode } from "@/src/types";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";

const modes: Array<{
  id: EditorMode;
  icon: AppIconName;
  title: string;
  description: string;
  tone: "gold" | "blue";
}> = [
  {
    id: "beginner",
    icon: "sparkle",
    title: "我是新手",
    description: "AI帮你搞定一切，选一选点一点就能创建游戏，不满意就重新生成",
    tone: "gold",
  },
  {
    id: "pro",
    icon: "settings",
    title: "我是策划",
    description: "完整的编辑能力，每个字段都可以精细调整，适合有经验的创作者",
    tone: "blue",
  },
];

export function ModeSelect() {
  const setMode = useEditorStore((state) => state.setMode);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[#050509] text-[#E6E1D8]">
      <section className="w-[520px] text-center">
        <div className="mb-2 flex justify-center text-[#2F8CFF]">
          <AppIcon name="pencil-line" size={22} />
        </div>
        <h1 className="mb-2 font-serif text-[22px] font-bold tracking-[0.1em] text-white">
          开卷 Unfold
        </h1>
        <p className="mb-10 text-[13px] text-white/35">选择适合你的创作模式</p>

        <div className="grid grid-cols-2 gap-4">
          {modes.map((mode) => {
            const disabled = mode.id === "pro";

            return (
            <button
              key={mode.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!disabled) setMode(mode.id);
              }}
              className={[
                "h-[186px] rounded-lg border p-6 text-center transition",
                disabled
                  ? "cursor-not-allowed border-white/10 bg-white/[0.025] opacity-35 grayscale"
                  : mode.tone === "gold"
                  ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                  : "border-[rgba(56,213,255,0.2)] bg-[rgba(56,213,255,0.04)] hover:border-[rgba(56,213,255,0.45)] hover:bg-[rgba(56,213,255,0.08)]",
              ].join(" ")}
            >
              <span className="mb-3 flex justify-center text-[#2F8CFF]">
                <AppIcon name={mode.icon} size={28} />
              </span>
              <span className="mb-2 block text-[14px] font-bold text-white">{mode.title}</span>
              <span className="block text-[14px] leading-7 text-white/45">{mode.description}</span>
            </button>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div />
          <p className="text-center text-[13px] font-medium tracking-[0.08em] text-white/36">
            未来开放
          </p>
        </div>
      </section>
    </main>
  );
}
