const locations = [
  { name: "御花园", x: "48%", y: "31%" },
  { name: "练武场", x: "74%", y: "56%" },
  { name: "太医院", x: "31%", y: "52%" },
  { name: "书房", x: "56%", y: "47%" },
  { name: "寝宫", x: "50%", y: "68%" },
  { name: "宫墙小道", x: "18%", y: "74%" },
  { name: "冷宫", x: "22%", y: "24%" },
];

export function SceneMapPreview() {
  return (
    <div className="w-full py-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/[0.10] bg-[linear-gradient(135deg,#17100d,#050509_55%,#161314)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(47,140,255,0.16),transparent_32%),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
        <div className="absolute left-[18%] top-[18%] h-[58%] w-[64%] rounded-[30%] border border-[rgba(47,140,255,0.18)] bg-[rgba(47,140,255,0.04)]" />
        <div className="absolute left-[34%] top-[34%] h-[28%] w-[34%] rounded-lg border border-[rgba(47,140,255,0.18)] bg-black/20" />
        {locations.map((location) => (
          <div key={location.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: location.x, top: location.y }}>
            <span className="block h-3 w-3 rounded-full bg-[#2F8CFF] shadow-[0_0_18px_rgba(47,140,255,0.8)]" />
            <span className="mt-1 block whitespace-nowrap rounded bg-black/45 px-2 py-0.5 text-[11px] text-white/70">{location.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {locations.map((location, index) => (
          <article key={location.name} className="overflow-hidden rounded-lg border border-white/[0.10] bg-[#111217]">
            <div
              className="aspect-video"
              style={{
                background: `radial-gradient(circle at 35% 25%, rgba(22,119,255,.22), transparent 30%), linear-gradient(135deg, hsl(${28 + index * 18}, 34%, 18%), hsl(${210 + index * 12}, 26%, 9%))`,
              }}
            />
            <div className="p-3">
              <p className="text-[14px] font-semibold text-white">{location.name}</p>
              <p className="mt-1 text-[13px] text-white/42">16:9 场景缩略图</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
