import { AppIcon } from "@/src/components/ui/app-icon";

export function Header() {
  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#050509] px-5 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[linear-gradient(135deg,#2F8CFF,#38D5FF)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.34)]">
          <AppIcon name="pencil-line" size={15} />
        </span>
        <span className="text-[17px] font-bold tracking-[0.02em] text-white">开卷 Unfold</span>
      </div>
      <div />
    </header>
  );
}
