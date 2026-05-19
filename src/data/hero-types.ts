import type { CharacterType, MaleHeroTypeId } from "@/src/types";

export const MALE_HERO_TYPES: CharacterType<MaleHeroTypeId>[] = [
  { id: "yx", label: "隐忍爆发", desc: "先忍，后爆，一朝翻盘" },
  { id: "tx", label: "铁血碾压", desc: "不废话，拳头就是道理" },
  { id: "px", label: "痞邪狂狷", desc: "规矩是别人的，老子自己来" },
  { id: "ax", label: "暗面枭雄", desc: "为达目的，不择手段" },
  { id: "rx", label: "热血正道", desc: "一腔热血，干就完了" },
];

export const HERO_OUTER_TAGS = [
  "高冷",
  "温润",
  "张扬",
  "痞气",
  "阳光",
  "毒舌",
  "神秘",
  "阴郁",
  "清冷",
  "狂傲",
  "喜感",
];

export const HERO_INNER_TAGS = [
  "深情",
  "腹黑",
  "偏执",
  "赤诚",
  "孤独",
  "温善",
  "反差",
  "癫狂",
  "脆弱",
  "野心",
];
