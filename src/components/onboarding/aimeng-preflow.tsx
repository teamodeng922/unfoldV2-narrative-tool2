"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { EditorMode } from "@/src/types";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";

type AimengPreflowProps = {
  initialStep?: number;
  skipFinale?: boolean;
  onEnter: (mode: EditorMode) => void;
};

type BubbleItem = {
  title: string;
  desc: string;
  x: number;
  y: number;
  size: number;
  live?: boolean;
};

const steps = ["欢迎", "品类", "视角", "模式", "· · ·"];

const modeOptions: Array<{
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
    description: "AI帮你生成完整内容，你只需要选择、确认和重新生成。",
    tone: "gold",
  },
  {
    id: "pro",
    icon: "settings",
    title: "我是策划",
    description: "开放完整编辑能力，每个字段都可以手动调整和细化。",
    tone: "blue",
  },
];

const genreBubbles: BubbleItem[] = [
  { title: "交互叙事", desc: "NARRATIVE", x: 38, y: 34, size: 120, live: true },
  { title: "模拟养成", desc: "SIM", x: 13, y: 13, size: 84 },
  { title: "解密", desc: "PUZZLE", x: 70, y: 16, size: 76 },
  { title: "Roguelike", desc: "ROGUE", x: 74, y: 56, size: 88 },
  { title: "卡牌构筑", desc: "DECK", x: 19, y: 60, size: 78 },
  { title: "模拟经营", desc: "TYCOON", x: 50, y: 73, size: 68 },
];

const perspectiveBubbles: BubbleItem[] = [
  { title: "女性视角", desc: "FEMALE", x: 40, y: 36, size: 122, live: true },
  { title: "男性视角", desc: "MALE", x: 15, y: 20, size: 84 },
  { title: "上帝视角", desc: "GOD", x: 68, y: 22, size: 84 },
  { title: "第一人称", desc: "FIRST", x: 64, y: 60, size: 72 },
  { title: "群像", desc: "ENSEMBLE", x: 22, y: 62, size: 70 },
];

const twinkles = [
  [8, 18],
  [18, 72],
  [28, 34],
  [42, 12],
  [55, 82],
  [64, 28],
  [76, 68],
  [88, 22],
  [92, 54],
  [12, 48],
  [34, 88],
  [48, 52],
  [68, 8],
  [80, 42],
  [24, 8],
  [6, 84],
  [58, 66],
  [72, 88],
];

export function AimengPreflow({
  initialStep = 0,
  skipFinale = false,
  onEnter,
}: AimengPreflowProps) {
  const [step, setStep] = useState(initialStep);
  const [collapsing, setCollapsing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [selectedMode, setSelectedMode] = useState<EditorMode>("beginner");
  const canReturnToWelcome = initialStep === 0;

  const collapseBubbles = useMemo(
    () =>
      [...genreBubbles, ...perspectiveBubbles].slice(0, 9).map((item, index) => ({
        ...item,
        x: 10 + ((index * 19) % 78),
        y: 8 + ((index * 29) % 66),
        size: 46 + ((index * 13) % 50),
      })),
    [],
  );

  useEffect(() => {
    if (step !== 4) return;

    const collapseTimer = window.setTimeout(() => setCollapsing(true), 80);
    const enterTimer = window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => onEnter(selectedMode), 650);
    }, 3400);

    return () => {
      window.clearTimeout(collapseTimer);
      window.clearTimeout(enterTimer);
    };
  }, [onEnter, selectedMode, step]);

  const goToStep = (nextStep: number) => {
    if (nextStep === 4) {
      setCollapsing(false);
    }
    setStep(nextStep);
  };

  const selectMode = (mode: EditorMode) => {
    setSelectedMode(mode);

    if (skipFinale) {
      setLeaving(true);
      window.setTimeout(() => onEnter(mode), 450);
      return;
    }

    goToStep(4);
  };

  return (
    <main
      className={[
        "relative h-screen w-screen overflow-hidden text-[#E6E1D8] transition-opacity duration-700",
        "bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,140,255,0.16)_0%,#050509_58%),radial-gradient(circle_at_85%_18%,rgba(56,213,255,0.08),transparent_28%)]",
        leaving ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <ProgressRail step={step} />

      <Screen active={step === 0}>
        <div className="mb-[18px] font-sans text-[12px] uppercase tracking-[0.18em] text-[#2F8CFF]">
          AIMENG · AI NATIVE GAME ENGINE
        </div>
        <h1 className="mb-3 text-center font-serif text-[32px] font-semibold leading-tight tracking-[0.02em] text-white">
          欢迎来到 AIMENG
        </h1>
        <p className="max-w-[560px] text-center text-[14px] leading-7 text-white/55">
          这不是一款游戏，是一台能做出无数游戏的引擎。
          <br />
          接下来三步，你会看到它的可能性，然后我们先带你做出第一个。
        </p>
        <div className="mt-9">
          <button
            type="button"
            onClick={() => goToStep(1)}
            className="rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] px-8 py-3 text-[14px] font-semibold tracking-[0.04em] text-white shadow-[0_16px_36px_rgba(0,0,0,0.34)] transition hover:bg-[#123967]"
          >
            开始
            <AppIcon className="ml-1.5 inline-block align-[-2px]" name="play" size={14} />
          </button>
        </div>
      </Screen>

      <Screen active={step === 1}>
        <div className="mb-[18px] font-sans text-[12px] uppercase tracking-[0.18em] text-[#2F8CFF]">
          STEP 01 · 选择你想做的品类
        </div>
        <h1 className="mb-3 text-center font-serif text-[32px] font-semibold leading-tight tracking-[0.02em] text-white">
          引擎能做的，远不止一种
        </h1>
        <p className="max-w-[620px] text-center text-[14px] leading-7 text-white/55">
          交互叙事、模拟养成、解密、Roguelike、卡牌……每一颗都是一个完整品类。
          <br />
          别担心，选你最想做的，后续可以叠加任意玩法元素，1 后面可以有无限个 0。
        </p>
        <BubbleField items={genreBubbles} onLiveClick={() => goToStep(2)} />
        <p className="mt-1 text-center text-[14px] italic text-[#2F8CFF]/78">
          现在我们先开放最低门槛的那条：交互叙事。其余正在路上。
        </p>
        {canReturnToWelcome ? <BackButton onClick={() => goToStep(0)} /> : null}
      </Screen>

      <Screen active={step === 2}>
        <div className="mb-[18px] font-sans text-[12px] uppercase tracking-[0.18em] text-[#2F8CFF]">
          STEP 02 · 选择叙事视角
        </div>
        <h1 className="mb-3 text-center font-serif text-[32px] font-semibold leading-tight tracking-[0.02em] text-white">
          以谁的眼睛进入这个世界
        </h1>
        <p className="max-w-[560px] text-center text-[14px] leading-7 text-white/55">
          视角决定了主角是谁、玩家代入谁。
          <br />
          同样，未来三种都开放，这次我们先从最成熟的一种开始。
        </p>
        <BubbleField items={perspectiveBubbles} onLiveClick={() => goToStep(3)} />
        <p className="mt-1 text-center text-[14px] italic text-[#2F8CFF]/78">
          这次我们先只开放女性视角 —— Lady first :)
        </p>
        <BackButton onClick={() => goToStep(1)} />
      </Screen>

      <Screen active={step === 3}>
        <div className="mb-[18px] font-sans text-[12px] uppercase tracking-[0.18em] text-[#2F8CFF]">
          STEP 03 · 选择你的创作方式
        </div>
        <h1 className="mb-3 text-center font-serif text-[32px] font-semibold leading-tight tracking-[0.02em] text-white">
          接下来，交给 AI 到什么程度
        </h1>
        <p className="max-w-[560px] text-center text-[14px] leading-7 text-white/55">
          新手模式更像有人带着你做，策划模式则把所有细节都交给你掌控。
          <br />
          两种模式共享同一套世界，后续也可以重新选择。
        </p>
        <div className="mt-10 grid w-[520px] grid-cols-2 gap-4">
          {modeOptions.map((option) => {
            const disabled = option.id === "pro";

            return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!disabled) selectMode(option.id);
              }}
              className={[
                "relative h-[186px] rounded-lg border p-6 text-center shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition",
                disabled
                  ? "cursor-not-allowed border-white/10 bg-white/[0.025] opacity-35 grayscale"
                  : option.tone === "gold"
                  ? "border-[rgba(47,140,255,0.24)] bg-[rgba(47,140,255,0.05)] hover:border-[rgba(47,140,255,0.48)] hover:bg-[#2F8CFF]/15"
                  : "border-[rgba(56,213,255,0.24)] bg-[rgba(56,213,255,0.05)] hover:border-[rgba(56,213,255,0.48)] hover:bg-[rgba(56,213,255,0.1)]",
              ].join(" ")}
            >
              <span className="mb-3 flex justify-center text-[#2F8CFF]">
                <AppIcon name={option.icon} size={28} />
              </span>
              <span className="mb-2 block text-[18px] font-bold text-white">{option.title}</span>
              <span className="block text-[14px] leading-7 text-white/45">{option.description}</span>
            </button>
            );
          })}
        </div>
        <div className="mt-3 grid w-[520px] grid-cols-2 gap-4">
          <div />
          <p className="text-center text-[13px] font-medium tracking-[0.08em] text-white/36">
            未来开放
          </p>
        </div>
        {canReturnToWelcome ? <BackButton onClick={() => goToStep(2)} /> : null}
      </Screen>

      <Screen active={step === 4}>
        <div className="relative mb-7 h-[300px] w-[min(700px,90vw)]">
          {twinkles.map(([x, y], index) => (
            <span
              key={`${x}-${y}`}
              className="absolute h-[3px] w-[3px] rounded-full bg-[#38D5FF]/40"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: index % 3 === 0 ? 0.7 : 0.25,
              }}
            />
          ))}
          {collapseBubbles.map((item) => (
            <div
              key={item.title}
              className="absolute flex items-center justify-center rounded-lg border border-[#38D5FF]/20 bg-[radial-gradient(circle_at_35%_30%,rgba(56,213,255,0.12),rgba(56,213,255,0.03))] text-center transition-all duration-1000 ease-in-out"
              style={{
                width: collapsing ? 8 : item.size,
                height: collapsing ? 8 : item.size,
                left: collapsing ? "50%" : `${item.x}%`,
                top: collapsing ? "50%" : `${item.y}%`,
                opacity: collapsing ? 0 : 1,
                transform: collapsing ? "translate(-50%,-50%) scale(0.2)" : "translate(0,0)",
              }}
            >
              <span className="text-[11px] text-white/75">{item.title}</span>
            </div>
          ))}
          <div
            className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F8CFF] transition-all duration-700"
            style={{
              opacity: collapsing ? 1 : 0,
              boxShadow: collapsing ? "0 0 60px 18px rgba(47,140,255,0.55)" : "none",
            }}
          />
        </div>
        <div
          className={[
            "text-center font-serif text-[22px] tracking-[0.06em] text-[#2F8CFF] transition-opacity duration-1000",
            collapsing ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          你的世界，从这里开始。
        </div>
        <div
          className={[
            "mt-3 text-center font-sans text-[12px] tracking-[0.16em] text-white/50 transition-opacity delay-300 duration-1000",
            collapsing ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          刚才看到的无数可能，现在，我们先把这一个做出来
        </div>
      </Screen>
    </main>
  );
}

function ProgressRail({ step }: { step: number }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex h-[60px] items-center gap-1.5 px-[30px] font-sans text-[11px] uppercase tracking-[0.12em] text-white/55">
      <span className="mr-6 text-[#38D5FF]">{steps[step]}</span>
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="flex flex-1 items-center gap-1.5">
          <span
            className={[
              "h-1.5 w-1.5 rounded-full transition",
              item <= step ? "bg-[#2F8CFF] shadow-[0_0_8px_rgba(47,140,255,0.6)]" : "bg-[#38D5FF]/20",
            ].join(" ")}
          />
          {item < 3 ? <span className="h-px flex-1 bg-[#38D5FF]/15" /> : null}
        </div>
      ))}
    </div>
  );
}

function Screen({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <section
      className={[
        "absolute inset-x-0 bottom-0 top-[60px] flex flex-col items-center justify-center px-[30px] py-5 transition-opacity duration-500",
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      {children}
    </section>
  );
}

function BubbleField({
  items,
  onLiveClick,
}: {
  items: BubbleItem[];
  onLiveClick: () => void;
}) {
  const getTitleSize = (item: BubbleItem) => {
    if (item.live) return item.size >= 120 ? 19 : 17;
    if (/^[A-Za-z]+$/.test(item.title)) return item.size <= 80 ? 11 : 12;
    if (item.title.length >= 4) return item.size <= 72 ? 11 : 12;
    return item.size <= 76 ? 13 : 14;
  };

  const getDescSize = (item: BubbleItem) => {
    if (item.live) return 11;
    return item.size <= 72 ? 8 : 9;
  };

  return (
    <div className="relative my-5 h-[330px] w-[min(700px,90vw)]">
      {twinkles.map(([x, y], index) => (
        <span
          key={`${x}-${y}`}
          className="absolute h-[3px] w-[3px] rounded-full bg-[#38D5FF]/40"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            opacity: index % 4 === 0 ? 0.7 : 0.25,
          }}
        />
      ))}
      {items.map((item) => (
        <button
          key={item.title}
          type="button"
          disabled={!item.live}
          onClick={onLiveClick}
          className={[
            "absolute flex flex-col items-center justify-center rounded-full border text-center transition duration-300",
            item.live
              ? "cursor-pointer border-[rgba(47,140,255,0.55)] bg-[radial-gradient(circle_at_35%_30%,rgba(47,140,255,0.22),rgba(47,140,255,0.04))] shadow-[0_0_30px_rgba(47,140,255,0.25)] hover:scale-105"
              : "cursor-not-allowed border-[rgba(56,213,255,0.15)] bg-[radial-gradient(circle_at_35%_30%,rgba(56,213,255,0.1),rgba(56,213,255,0.02))] opacity-30 grayscale",
          ].join(" ")}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
          }}
        >
          <span
            className={[
              "block whitespace-nowrap leading-tight tracking-0",
              item.live ? "font-medium text-[#2F8CFF]" : "text-white",
            ].join(" ")}
            style={{
              maxWidth: item.size * 0.92,
              fontSize: getTitleSize(item),
            }}
          >
            {item.title}
          </span>
          <span
            className="mt-1.5 block font-sans uppercase tracking-[0.16em] text-white/50"
            style={{
              maxWidth: item.size * 0.92,
              fontSize: getDescSize(item),
            }}
          >
            {item.desc}
          </span>
          {!item.live ? (
            <span className="absolute bottom-[-17px] font-sans text-[9px] uppercase tracking-[0.18em] text-white/45">
              SOON
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-7 border-0 bg-transparent font-sans text-[14px] text-white/55 transition hover:text-white"
    >
      <AppIcon className="mr-1.5 inline-block align-[-2px]" name="chevron-left" size={14} />
      返回
    </button>
  );
}
