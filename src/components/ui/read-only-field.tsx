type ReadOnlyFieldProps = {
  label: string;
  value: string;
};

export function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-[14px] font-semibold text-white/58">{label}</div>
      <div className="rounded-lg border border-white/10 bg-[#111217] p-3 text-[14px] leading-6 text-white/62 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
        {value}
      </div>
    </div>
  );
}
