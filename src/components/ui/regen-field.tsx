"use client";

import { AppIcon } from "@/src/components/ui/app-icon";

type RegenFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  labelClassName?: string;
};

export function RegenField({ label, value, onChange, labelClassName }: RegenFieldProps) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <label className={labelClassName ?? "text-[14px] font-semibold text-white/58"}>{label}</label>
        <button type="button" className="text-[13px] text-white/35 transition hover:text-[#2F8CFF]">
          <AppIcon name="refresh-cw" size={13} />
        </button>
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-white/10 bg-[#111217] px-3 text-[14px] text-[#E6E1D8]/88 outline-none transition focus:border-[#2F8CFF]/45 focus:bg-[#141720]"
      />
    </div>
  );
}
