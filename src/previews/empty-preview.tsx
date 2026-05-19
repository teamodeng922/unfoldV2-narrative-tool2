type EmptyPreviewProps = {
  message?: string;
};

export function EmptyPreview({ message = "玩法细节将影响游戏体验" }: EmptyPreviewProps) {
  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center py-4">
      <div className="rounded-lg border border-white/[0.10] bg-[#111217] px-8 py-10 text-center">
        <p className="text-[13px] text-white/52">{message}</p>
      </div>
    </div>
  );
}
