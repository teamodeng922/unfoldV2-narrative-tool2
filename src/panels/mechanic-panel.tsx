"use client";

import { useState } from "react";
import { GAME_TYPES } from "@/src/data/game-types";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode, GameTypeId } from "@/src/types";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";
import { NumberedTitle } from "@/src/components/ui/numbered-title";

type MechanicPanelProps = {
  mode: EditorMode;
};

const openMechanics: GameTypeId[] = ["romance", "raising"];

function roleLabel(id: GameTypeId) {
  if (id === "romance") return "主玩法";
  if (id === "raising") return "副玩法";
  if (id === "strategy") return "推荐";
  return "";
}

export function MechanicPanel(_props: MechanicPanelProps) {
  void _props;
  const worldType = useEditorStore((state) => state.worldSettings.worldType);
  const setMechTypes = useEditorStore((state) => state.setMechTypes);
  const [expandedIds, setExpandedIds] = useState<GameTypeId[]>([]);

  return (
    <div className="py-4">
      <div className="mb-5">
        <NumberedTitle className="mb-1" num="01">推荐玩法</NumberedTitle>
        <p className="text-[13px] text-white/40">{worldType} 默认适配的玩法组合</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {GAME_TYPES.map((gameType) => {
          const open = openMechanics.includes(gameType.id);
          const selected = open;
          const badge = roleLabel(gameType.id);

          return (
            <article
              key={gameType.id}
              className={[
                "min-h-[142px] rounded-lg border p-5 text-left transition",
                selected
                  ? "border-[#2F8CFF]/70 bg-[linear-gradient(180deg,rgba(47,140,255,0.15),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
                  : "cursor-not-allowed border-white/[0.10] bg-[#111217] opacity-38 grayscale",
              ].join(" ")}
            >
              <button
                type="button"
                disabled={!open}
                onClick={() => setMechTypes(openMechanics)}
                className="block w-full text-left"
              >
                <div className="grid grid-cols-[34px_1fr_auto] gap-3">
                <AppIcon
                  className={open ? "mt-1 text-[#2F8CFF]" : "mt-1 text-white/42"}
                  name={gameType.icon as AppIconName}
                  size={22}
                />
                <div className="min-w-0">
                  <h4 className="text-[16px] font-semibold text-white">{gameType.label}</h4>
                  <p className="mt-2 max-w-[300px] text-[14px] leading-6 text-white/38">
                    {gameType.desc}
                  </p>
                </div>
                {badge ? (
                  <span
                    className={[
                      "h-7 rounded-md px-3 text-[13px] leading-7",
                      open ? "bg-[#0D2B52] text-[#2F8CFF]" : "bg-[#123239] text-[#38D5FF]",
                    ].join(" ")}
                  >
                    {badge}
                  </span>
                ) : null}
                </div>
              </button>

              {open ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIds((current) =>
                        current.includes(gameType.id)
                          ? current.filter((id) => id !== gameType.id)
                          : [...current, gameType.id],
                      )
                    }
                    className="mt-5 inline-flex items-center text-[13px] font-medium text-[#38D5FF] transition hover:text-[#2F8CFF]"
                  >
                    {expandedIds.includes(gameType.id) ? "收起详情" : "查看详情"}
                    <AppIcon
                      className="ml-1.5"
                      name={expandedIds.includes(gameType.id) ? "chevron-up" : "chevron-down"}
                      size={12}
                    />
                  </button>

                  {expandedIds.includes(gameType.id) ? (
                    <div className="mt-5 border-t border-white/[0.10] pt-5">
                      <p className="text-[14px] leading-7 text-white/62">{gameType.detail}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {gameType.mechanics.map((mechanic) => (
                          <span
                            key={mechanic}
                            className="rounded-full border border-[rgba(56,213,255,0.28)] bg-[rgba(56,213,255,0.08)] px-3 py-1.5 text-[14px] text-[#38D5FF]"
                          >
                            {mechanic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[13px] tracking-[0.08em] text-white/42">
        更多玩法敬请期待
      </p>
    </div>
  );
}
