import { type ButtonHTMLAttributes } from "react";
import { AppIcon } from "@/src/components/ui/app-icon";

type RegenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: string;
  iconOnly?: boolean;
};

export function RegenButton({
  children = "重新生成",
  className = "",
  iconOnly = false,
  type = "button",
  ...props
}: RegenButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-lg border border-[#2F8CFF]/65 bg-[#0D2B52] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition hover:bg-[#123967] hover:shadow-[0_0_18px_rgba(47,140,255,0.26)]",
        iconOnly ? "h-8 w-8 px-0 text-[13px]" : "h-10 px-5 text-[13px]",
        className,
      ].join(" ")}
      {...props}
    >
      <AppIcon
        className={iconOnly ? "" : "mr-1.5 inline-block align-[-2px]"}
        name="refresh-cw"
        size={iconOnly ? 13 : 14}
      />
      {iconOnly ? null : children}
    </button>
  );
}
