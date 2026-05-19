"use client";

import { useMemo, useState } from "react";
import { ENDINGS } from "@/src/data/endings";
import { DEFAULT_STAT_SKIN, STAT_SKINS } from "@/src/data/stat-skins";
import { useEditorStore } from "@/src/stores/editor-store";
import type { EditorMode, EndingId, GameTypeId, GenderDirection, StatSkin } from "@/src/types";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";

type DetailPanelProps = {
  mode: EditorMode;
  gender: GenderDirection;
  worldType: string;
  mechTypes: GameTypeId[];
};

type InfluenceMode = "none" | "option" | "trigger";
type LockMode = "free" | "soft" | "hard";
type ShuraTrigger = "affection" | "event" | "choice";

const influenceOptions: Array<{ id: InfluenceMode; label: string; desc: string }> = [
  { id: "none", label: "不影响", desc: "数值只影响养成线和关卡通过，攻略纯靠对话选择" },
  { id: "option", label: "影响选项出现", desc: "某些对话选项需要数值达标才解锁" },
  { id: "trigger", label: "影响剧情触发", desc: "数值直接决定能否进入特定剧情分支" },
];

const lockOptions: Array<{ id: LockMode; label: string; desc: string }> = [
  { id: "free", label: "自由多线", desc: "玩家可同时推进多条角色线" },
  { id: "soft", label: "软锁定", desc: "进入高好感阶段后提示路线倾向" },
  { id: "hard", label: "硬锁定", desc: "确认路线后其他角色线停止推进" },
];

const triggerOptions: Array<{ id: ShuraTrigger; label: string }> = [
  { id: "affection", label: "好感差距触发" },
  { id: "event", label: "关键事件触发" },
  { id: "choice", label: "选择冲突触发" },
];

function ModuleTitle({ num, title }: { num: string; title: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white/85">
      <span className="text-[12px] font-bold text-[#2F8CFF]/70">{num}</span>
      {title}
    </h3>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "relative h-6 w-11 rounded-full border transition",
        checked
          ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]"
          : "border-white/10 bg-[#191D25]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-4 w-4 rounded-full bg-white/80 transition",
          checked ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

function StatEditor({
  stat,
  onChange,
}: {
  stat: StatSkin;
  onChange: (patch: Partial<StatSkin>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-lg border border-white/10 bg-[#111217]">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
          <AppIcon name={stat.icon as AppIconName} size={14} />
          {stat.name}
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] text-[#38D5FF]">
          {open ? "收起" : "展开"}
          <AppIcon name={open ? "chevron-up" : "chevron-down"} size={12} />
        </span>
      </button>
      {open ? (
        <div className="border-t border-[rgba(255,255,255,0.06)] p-4">
          <label className="mb-1.5 block text-[14px] font-semibold text-white/58">数值名称</label>
          <input
            value={stat.name}
            onChange={(event) => onChange({ name: event.target.value })}
            className="mb-3 h-9 w-full rounded-lg border border-white/10 bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
          />
          <p className="mb-2 text-[13px] text-white/35">通用定位：{stat.base}</p>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[14px] font-semibold text-white/58">本世界说明</label>
            <button type="button" className="text-[13px] text-white/35 hover:text-[#2F8CFF]">
              <AppIcon name="refresh-cw" size={13} />
            </button>
          </div>
          <input
            value={stat.desc}
            onChange={(event) => onChange({ desc: event.target.value })}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111217] px-3 text-[14px] text-white/70 outline-none focus:border-[#2F8CFF]/45"
          />
        </div>
      ) : null}
    </article>
  );
}

export function DetailPanel({ mode, worldType, mechTypes }: DetailPanelProps) {
  const goNext = useEditorStore((state) => state.goNext);
  const [selectedEndings, setSelectedEndings] = useState<EndingId[]>(
    ENDINGS.filter((ending) => ending.defaultSelected).map((ending) => ending.id),
  );
  const [customEnding, setCustomEnding] = useState("");
  const [influenceMode, setInfluenceMode] = useState<InfluenceMode>("option");
  const [lockMode, setLockMode] = useState<LockMode>("free");
  const [shuraEnabled, setShuraEnabled] = useState(true);
  const [shuraTrigger, setShuraTrigger] = useState<ShuraTrigger>("affection");
  const [jealousyEnabled, setJealousyEnabled] = useState(true);
  const [collapseEnabled, setCollapseEnabled] = useState(false);
  const [activeBehavior, setActiveBehavior] = useState(true);
  const [behaviors, setBehaviors] = useState({
    visit: true,
    gift: true,
    intervene: false,
    jealous: true,
  });
  const defaultStats = useMemo(() => STAT_SKINS[worldType] ?? DEFAULT_STAT_SKIN, [worldType]);
  const mechanicSummary = mechTypes.length > 0 ? mechTypes.join(" + ") : "未选择玩法";
  const [statDrafts, setStatDrafts] = useState<Record<string, StatSkin[]>>({});
  const stats = statDrafts[worldType] ?? defaultStats;

  const toggleEnding = (id: EndingId) => {
    setSelectedEndings((current) => {
      if (current.includes(id)) {
        return current.length === 1 ? current : current.filter((item) => item !== id);
      }
      return [...current, id];
    });
  };

  if (mode === "beginner") {
    return (
      <div className="py-4">
        <section className="mb-6">
          <ModuleTitle num="01" title="结局框架" />
          <div className="flex flex-wrap gap-2">
            {ENDINGS.filter((ending) => selectedEndings.includes(ending.id)).map((ending) => (
              <span key={ending.id} className="rounded-full border border-[rgba(47,140,255,0.28)] bg-[#2F8CFF]/15 px-3 py-1.5 text-[14px] text-[#2F8CFF]">
                {ending.label}
              </span>
            ))}
          </div>
        </section>
        <section className="mb-6">
          <ModuleTitle num="02" title="数值与攻略" />
          <div className="rounded-lg border border-white/10 bg-[#111217] p-4 text-[14px] text-white/65">
            影响选项出现 · {mechanicSummary}
          </div>
        </section>
        <section className="mb-6">
          <ModuleTitle num="03" title="养成数值" />
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.id} className="rounded-lg border border-white/10 bg-[#111217] p-4">
                <p className="mb-1 flex items-center gap-1.5 text-[14px] font-semibold text-white">
                  <AppIcon name={stat.icon as AppIconName} size={14} />
                  {stat.name}
                </p>
                <p className="text-[13px] leading-5 text-white/45">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-7">
          <ModuleTitle num="04" title="多线恋爱规则" />
          <div className="rounded-lg border border-white/10 bg-[#111217] p-4 text-[14px] text-white/65">自由多线，修罗场与争风吃醋事件开启</div>
        </section>
        <div className="flex justify-center gap-3">
          <button type="button" className="rounded-lg border border-white/10 bg-[#111217] px-4 py-2 text-[14px] text-white/55">
            <AppIcon className="mr-1.5 inline-block align-[-2px]" name="refresh-cw" size={14} />
            重新生成
          </button>
          <button type="button" onClick={() => goNext("detail")} className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
            确认玩法细节
            <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <section className="mb-7">
        <ModuleTitle num="01" title="结局框架" />
        <div className="grid gap-2">
          {ENDINGS.map((ending) => (
            <label key={ending.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-[#111217] p-3">
              <input type="checkbox" checked={selectedEndings.includes(ending.id)} onChange={() => toggleEnding(ending.id)} className="mt-1 accent-[#2F8CFF]" />
              <span>
                <span className="block text-[14px] font-semibold text-white">{ending.label}</span>
                <span className="text-[13px] leading-5 text-white/40">{ending.desc}</span>
              </span>
            </label>
          ))}
        </div>
        <input value={customEnding} onChange={(event) => setCustomEnding(event.target.value)} placeholder="自定义结局类型..." className="mt-3 h-9 w-full rounded-lg border border-white/10 bg-[#111217] px-3 text-[14px] text-white/70 outline-none placeholder:text-white/25 focus:border-[#2F8CFF]/45" />
      </section>

      <section className="mb-7">
        <ModuleTitle num="02" title="数值对攻略的影响方式" />
        <p className="mb-3 text-[13px] text-white/32">当前玩法组合：{mechanicSummary}</p>
        <div className="grid grid-cols-3 gap-3">
          {influenceOptions.map((option) => (
            <button key={option.id} type="button" onClick={() => setInfluenceMode(option.id)} className={[
              "rounded-lg border p-3 text-left transition",
              influenceMode === option.id ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]" : "border-white/10 bg-[#111217] hover:bg-[#111217]",
            ].join(" ")}>
              <span className="block text-[14px] font-semibold text-white">{option.label}</span>
              <span className="mt-1 block text-[13px] leading-5 text-white/40">{option.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-7">
        <ModuleTitle num="03" title="养成数值" />
        <div className="mb-4 rounded-lg border border-[rgba(56,213,255,0.18)] bg-[rgba(56,213,255,0.05)] p-4 text-center text-[13px] text-white/55">
          演技 ↔ 魅力（外显层/表达） · 才智 ↔ 体魄（内在层/实力）
        </div>
        <div className="grid gap-3">
          {stats.map((stat, index) => (
            <StatEditor
              key={stat.id}
              stat={stat}
              onChange={(patch) =>
                setStatDrafts((current) => ({
                  ...current,
                  [worldType]: stats.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
                }))
              }
            />
          ))}
        </div>
      </section>

      <section className="mb-7">
        <ModuleTitle num="04" title="多线恋爱规则" />
        <div className="grid grid-cols-3 gap-3">
          {lockOptions.map((option) => (
            <button key={option.id} type="button" onClick={() => setLockMode(option.id)} className={[
              "rounded-lg border p-3 text-left transition",
              lockMode === option.id ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)]" : "border-white/10 bg-[#111217] hover:bg-[#111217]",
            ].join(" ")}>
              <span className="block text-[14px] font-semibold text-white">{option.label}</span>
              <span className="mt-1 block text-[13px] leading-5 text-white/40">{option.desc}</span>
            </button>
          ))}
        </div>
        {lockMode === "free" ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-[#111217] p-4">
            <div className="mb-4 flex items-center justify-between"><span className="text-[13px] text-white/70">修罗场</span><Toggle checked={shuraEnabled} onChange={setShuraEnabled} /></div>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {triggerOptions.map((option) => <button key={option.id} type="button" onClick={() => setShuraTrigger(option.id)} className={["rounded-lg border px-3 py-2 text-[12px]", shuraTrigger === option.id ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] text-[#2F8CFF]" : "border-white/10 bg-[#111217] text-white/50"].join(" ")}>{option.label}</button>)}
            </div>
            <div className="mb-3 flex items-center justify-between"><span className="text-[13px] text-white/70">争风吃醋</span><Toggle checked={jealousyEnabled} onChange={setJealousyEnabled} /></div>
            <div className="flex items-center justify-between"><span className="text-[13px] text-white/70">全线崩盘</span><Toggle checked={collapseEnabled} onChange={setCollapseEnabled} /></div>
          </div>
        ) : null}
      </section>

      <section className="mb-7">
        <ModuleTitle num="05" title="角色主动行为" />
        <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-[#111217] p-4">
          <span className="text-[13px] text-white/70">启用角色主动行为</span>
          <Toggle checked={activeBehavior} onChange={setActiveBehavior} />
        </div>
        <div className="grid grid-cols-2 gap-3 opacity-100">
          {[
            ["visit", "主动来访"],
            ["gift", "赠送物品"],
            ["intervene", "介入选择"],
            ["jealous", "吃醋反应"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#111217] p-3 text-[13px] text-white/65">
              <input type="checkbox" disabled={!activeBehavior} checked={behaviors[key as keyof typeof behaviors]} onChange={() => setBehaviors((current) => ({ ...current, [key]: !current[key as keyof typeof current] }))} className="accent-[#2F8CFF]" />
              {label}
            </label>
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <button type="button" onClick={() => goNext("detail")} className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
          确认玩法细节
          <AppIcon className="ml-1.5 inline-block align-[-2px]" name="chevron-right" size={14} />
        </button>
      </div>
    </div>
  );
}
