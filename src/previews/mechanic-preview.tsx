"use client";

import type { EditorMode } from "@/src/types";

type MechanicPreviewProps = {
  mode: EditorMode;
};

const flow = ["初遇", "日常互动", "好感积累", "关键抉择", "路线分化", "情感爆发", "结局判定"];

export function MechanicPreview(_props: MechanicPreviewProps) {
  void _props;
  return (
    <div className="w-full py-4">
      <section className="mb-6 rounded-lg border border-white/[0.10] bg-[#111217] px-5 pb-12 pt-5">
        <h3 className="mb-6 text-[16px] font-semibold text-white/52">玩家体验流程</h3>
        <div className="mx-auto flex w-full max-w-[880px] items-start">
          {flow.map((item, index) => (
            <div
              key={item}
              className={[
                "relative flex min-w-0 items-start",
                index < flow.length - 1 ? "flex-1" : "w-8 shrink-0",
              ].join(" ")}
            >
              <div className="flex w-full items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2F8CFF]/45 bg-[#2F8CFF]/16 text-[17px] text-[#2F8CFF]">
                  {index + 1}
                </span>
                {index < flow.length - 1 ? (
                  <span className="mx-4 h-px flex-1 bg-white/10" />
                ) : null}
              </div>
              <p className="absolute left-4 top-11 -translate-x-1/2 whitespace-nowrap text-center text-[14px] text-white/52">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[rgba(56,213,255,0.22)] bg-[rgba(56,213,255,0.05)] p-5">
        <h3 className="mb-4 text-[17px] font-semibold text-[#38D5FF]">多玩法组合</h3>
        <p className="text-[15px] leading-7 text-white/62">
          以恋爱攻略作为主驱动力，叠加养成模拟作为节奏变化与分支压力。
        </p>
      </section>
    </div>
  );
}
