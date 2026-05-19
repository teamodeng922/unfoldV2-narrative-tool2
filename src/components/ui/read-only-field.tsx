type ReadOnlyFieldProps = {
  label: string;
  value: string;
  labelClassName?: string;
};

export function ReadOnlyField({ label, value, labelClassName }: ReadOnlyFieldProps) {
  return (
    <div className="mb-4">
      <div className={labelClassName ?? "mb-1.5 text-[14px] font-semibold text-white/55"}>{label}</div>
      <div className="rounded-lg bg-[#111217] p-3 text-[14px] leading-6 text-white/62 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_12px_32px_rgba(0,0,0,0.14)]">
        {value}
      </div>
    </div>
  );
}
