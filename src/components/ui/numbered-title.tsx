import type { ReactNode } from "react";

type NumberedTitleProps = {
  num: string;
  children: ReactNode;
  className?: string;
};

export function NumberedTitle({ num, children, className = "" }: NumberedTitleProps) {
  return (
    <h3
      className={[
        "mb-3 flex items-center gap-2 text-[14px] font-semibold tracking-[0.04em] text-white/64",
        className,
      ].join(" ")}
    >
      <span className="font-mono text-[12px] font-semibold tracking-[0.12em] text-[#2F8CFF]">
        {num}
      </span>
      <span>{children}</span>
    </h3>
  );
}
