import type { CharacterType, FemaleHeroineTypeId } from "@/src/types";

export const FEMALE_HEROINE_TYPES: CharacterType<FemaleHeroineTypeId>[] = [
  { id: "dv", label: "独立大女主", desc: "我不需要谁来救，我自己就是靠山" },
  { id: "bq", label: "白切黑", desc: "所有人都觉得我好欺负，直到来不及后悔" },
  { id: "ql", label: "清冷淡漠", desc: "不争不抢不是不行，是懒得理你们" },
  { id: "tc", label: "甜飒兼备", desc: "可盐可甜，我可以很软也可以很刚" },
  { id: "fp", label: "疯批美人", desc: "温柔是装的，发疯才是真的" },
];

export const HEROINE_OUTER_TAGS = [
  "温柔",
  "傲娇",
  "冷艳",
  "活泼",
  "飒爽",
  "妩媚",
  "呆萌",
  "清纯",
  "病弱",
  "邪魅",
];

export const HEROINE_INNER_TAGS = [
  "坚韧",
  "腹黑",
  "痴情",
  "独立",
  "疯批",
  "脆弱",
  "野心",
  "赤诚",
  "神秘",
  "忠义",
];
