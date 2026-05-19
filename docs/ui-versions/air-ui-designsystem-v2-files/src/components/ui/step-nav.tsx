"use client";

import type { StepDefinition, StepId } from "@/src/types";

type StepNavProps = {
  current: StepId;
  done: StepId[];
  steps: StepDefinition[];
  onSelect: (step: StepId) => void;
};

function StepIcon({ id, active }: { id: StepId; active: boolean }) {
  const common = (
    <>
      {id === "world" ? <path d="M12 3 21 12 12 21 3 12 12 3Z" /> : null}
      {id === "mechanic" ? (
        <>
          <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </>
      ) : null}
      {id === "style" ? <path d="M12 3l2.1 6.1L20 12l-5.9 2.9L12 21l-2.1-6.1L4 12l5.9-2.9L12 3Z" /> : null}
      {id === "hero" ? (
        <>
          <path d="M12 4 18 20H6L12 4Z" />
          <path d="M9 13h6" />
        </>
      ) : null}
      {id === "heroine" ? (
        <>
          <path d="M12 20s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.8-7 10-7 10Z" />
        </>
      ) : null}
      {id === "plot" ? (
        <>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      ) : null}
      {id === "scene" ? (
        <>
          <path d="M6 5v14" />
          <path d="M6 6h11l-2 4 2 4H6" />
        </>
      ) : null}
      {id === "detail" ? (
        <>
          <path d="M5 9h5" />
          <path d="M14 9h5" />
          <path d="M5 15h5" />
          <path d="M14 15h5" />
        </>
      ) : null}
      {id === "play" ? <path d="M8 5 18 12 8 19V5Z" /> : null}
    </>
  );

  return (
    <span className={["air-icon text-[24px]", active ? "air-icon-active air-icon-gold" : ""].join(" ")}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {common}
      </svg>
    </span>
  );
}

export function StepNav({ current, done, steps, onSelect }: StepNavProps) {
  return (
    <nav className="flex flex-col gap-3 pt-1">
      {steps.map((step) => {
        const active = step.id === current;
        const completed = done.includes(step.id);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.id)}
            className={[
              "relative grid h-10 w-full grid-cols-[26px_minmax(56px,1fr)_10px] items-center gap-2 pl-3 pr-2 text-left transition",
              active
                ? "opacity-100 before:absolute before:left-0 before:top-1/2 before:h-6 before:w-px before:-translate-y-1/2 before:bg-[#D4B886]/70 before:shadow-[0_0_12px_rgba(212,184,134,0.35)]"
                : "opacity-55 hover:opacity-90",
              completed && !active ? "opacity-80" : "",
              !completed && !active ? "opacity-45" : "",
            ].join(" ")}
          >
            <StepIcon id={step.id} active={active} />
            <span
              className={[
                "whitespace-nowrap text-[13px] leading-none tracking-0",
                active ? "text-white" : "text-white/60",
              ].join(" ")}
            >
              {step.label}
            </span>
            <span className="air-icon text-[12px] text-[#A4B8D6]/70">
              {completed ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 12 4 4 8-8" />
                </svg>
              ) : null}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
