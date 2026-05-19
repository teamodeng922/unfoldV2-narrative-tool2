"use client";

import type { StepDefinition, StepId } from "@/src/types";
import { AppIcon, type AppIconName } from "@/src/components/ui/app-icon";

type StepNavProps = {
  current: StepId;
  done: StepId[];
  steps: StepDefinition[];
  onSelect: (step: StepId) => void;
};

export function StepNav({ current, done, steps, onSelect }: StepNavProps) {
  return (
    <nav className="flex flex-col gap-1 px-2">
      {steps.map((step) => {
        const active = step.id === current;
        const completed = done.includes(step.id);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.id)}
            className={[
              "grid h-10 w-full grid-cols-[24px_minmax(76px,1fr)_18px] items-center gap-2 rounded-none border-l-2 border-y-0 border-r-0 px-3 text-left transition",
              active
                ? "border-[#2F8CFF]/65 bg-[linear-gradient(180deg,rgba(47,140,255,0.18),rgba(47,140,255,0.045))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(47,140,255,0.16)] opacity-100"
                : "border-transparent bg-transparent hover:bg-[#111217]",
              completed && !active ? "opacity-80" : "",
              !completed && !active ? "opacity-45" : "",
            ].join(" ")}
          >
            <span
              className={[
                "text-center text-[13px]",
                active ? "text-[#2F8CFF]" : completed ? "text-[#38D5FF]" : "text-white/42",
              ].join(" ")}
            >
              <AppIcon name={step.icon as AppIconName} size={14} />
            </span>
            <span
              className={[
                "whitespace-nowrap text-[14px] leading-none tracking-0",
                active ? "text-white" : "text-white/64",
              ].join(" ")}
            >
              {step.label}
            </span>
            <span className="flex justify-end text-[#2F8CFF]">
              {completed ? <AppIcon name="check" size={13} strokeWidth={2.6} /> : null}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
