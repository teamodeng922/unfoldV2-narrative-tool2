"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GAME_NAMES } from "@/src/data/game-names";
import { OUTLINES_MAP, DEFAULT_OUTLINES } from "@/src/data/outlines";
import { getWorldDefault } from "@/src/data/world-defaults";
import { WORLD_MECHANIC_MAP } from "@/src/data/world-mechanic-map";
import { WORLDS } from "@/src/data/worlds";
import type {
  ArtStyleId,
  CharacterPlotLine,
  EditorMode,
  FemaleHeroineTypeId,
  GameTypeId,
  HeroCharacter,
  MaleHeroTypeId,
  PlotKey,
  PlotValues,
  ProportionId,
  SceneAction,
  SceneLocation,
  StepDefinition,
  StepId,
  WorldSettings,
  WorldAiPatch,
} from "@/src/types";

export const ALL_STEPS: StepDefinition[] = [
  { id: "world", label: "世界设定", icon: "book-open", mode: "all" },
  { id: "mechanic", label: "游戏玩法", icon: "gamepad", mode: "all" },
  { id: "style", label: "美术风格", icon: "palette", mode: "pro" },
  { id: "hero", label: "男主设定", icon: "spade", mode: "all" },
  { id: "heroine", label: "女主设定", icon: "heart", mode: "all" },
  { id: "plot", label: "剧情线", icon: "route", mode: "all" },
  { id: "scene", label: "地点与场景", icon: "map", mode: "all" },
  { id: "play", label: "开始游戏", icon: "play", mode: "all" },
];

export const getSteps = (mode: EditorMode) =>
  ALL_STEPS.filter((step) => step.mode === "all" || step.mode === mode);

type EditorState = {
  hasHydrated: boolean;
  mode: EditorMode | null;
  step: StepId;
  done: StepId[];
  worldSettings: WorldSettings;
  gameName: string;
  worldOutlineSeed: number;
  mechTypes: GameTypeId[];
  artStyle: ArtStyleId;
  proportion: ProportionId;
  heroes: HeroCharacter[];
  activeHeroId: string;
  maleHeroType: MaleHeroTypeId;
  maleHeroAge: string;
  maleHeroIdentity: string;
  maleHeroAppearance: string;
  heroines: HeroCharacter[];
  activeHeroineId: string;
  femaleHeroineType: FemaleHeroineTypeId;
  femaleHeroineAge: string;
  femaleHeroineIdentity: string;
  femaleHeroineAppearance: string;
  mainPlot: PlotValues;
  characterLines: CharacterPlotLine[];
  locations: SceneLocation[];
  actions: SceneAction[];
  totalDays: string;
  sceneStages: Record<"guide" | "free" | "mid" | "late", string>;
  setMode: (mode: EditorMode | null) => void;
  setStep: (step: StepId) => void;
  setWorldSettings: (worldSettings: WorldSettings) => void;
  setGameName: (gameName: string) => void;
  generateWorldOutline: () => void;
  generateMechanics: () => void;
  setMechTypes: (mechTypes: GameTypeId[]) => void;
  toggleMechanic: (mechanicId: GameTypeId) => void;
  moveMechanic: (mechanicId: GameTypeId, direction: "up" | "down") => void;
  setArtStyle: (artStyle: ArtStyleId) => void;
  setProportion: (proportion: ProportionId) => void;
  setActiveHeroId: (heroId: string) => void;
  updateHero: (heroId: string, patch: Partial<HeroCharacter>) => void;
  addHero: () => void;
  setMaleHeroType: (heroType: MaleHeroTypeId) => void;
  setMaleHeroField: (field: "maleHeroAge" | "maleHeroIdentity" | "maleHeroAppearance", value: string) => void;
  generateActiveHero: () => void;
  generateMaleHeroSetting: () => void;
  setActiveHeroineId: (heroineId: string) => void;
  updateHeroine: (heroineId: string, patch: Partial<HeroCharacter>) => void;
  addHeroine: () => void;
  setFemaleHeroineType: (heroineType: FemaleHeroineTypeId) => void;
  setFemaleHeroineField: (
    field: "femaleHeroineAge" | "femaleHeroineIdentity" | "femaleHeroineAppearance",
    value: string,
  ) => void;
  generateActiveHeroine: () => void;
  generateFemaleHeroineSetting: () => void;
  setMainPlotValue: (key: PlotKey, value: string) => void;
  generateMainPlot: () => void;
  generateCharacterLine: (lineId: string) => void;
  setLocations: (locations: SceneLocation[]) => void;
  setActions: (actions: SceneAction[]) => void;
  setTotalDays: (totalDays: string) => void;
  setSceneStage: (stage: "guide" | "free" | "mid" | "late", value: string) => void;
  generateScenes: () => void;
  applyAiInstruction: (text: string) => string;
  applyWorldPatch: (patch: WorldAiPatch) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  exportProject: () => string;
  importProject: (json: string) => { ok: boolean; message: string };
  selectGender: (gender: WorldSettings["gender"]) => void;
  selectEra: (era: WorldSettings["era"]) => void;
  selectWorldType: (worldType: string) => void;
  markDone: (step: StepId) => void;
  goNext: (step: StepId) => void;
};

type PersistedEditorState = Pick<
  EditorState,
  | "mode"
  | "step"
  | "done"
  | "worldSettings"
  | "gameName"
  | "worldOutlineSeed"
  | "mechTypes"
  | "artStyle"
  | "proportion"
  | "heroes"
  | "activeHeroId"
  | "maleHeroType"
  | "maleHeroAge"
  | "maleHeroIdentity"
  | "maleHeroAppearance"
  | "heroines"
  | "activeHeroineId"
  | "femaleHeroineType"
  | "femaleHeroineAge"
  | "femaleHeroineIdentity"
  | "femaleHeroineAppearance"
  | "mainPlot"
  | "characterLines"
  | "locations"
  | "actions"
  | "totalDays"
  | "sceneStages"
>;

type ProjectSnapshot = {
  app: "unfold";
  version: 1;
  exportedAt: string;
  project: PersistedEditorState;
};

const initialWorldSettings: WorldSettings = {
  gender: "female",
  era: "ancient",
  worldType: "宫廷后宫",
};

const WORLD_NAME_VARIANTS: Record<string, string[]> = {
  宫廷后宫: ["凤鸣长安", "深宫月影", "金阶暗香"],
  世家宅斗: ["深闺谋", "朱门暗局", "花厅雪"],
  仙侠情缘: ["三生劫", "问灵录", "云上盟"],
  江湖恩怨: ["刀与月", "风雪故人", "断桥刀影"],
  将门风云: ["铁衣红妆", "玉门春秋", "烽火故人"],
  帝王争霸: ["龙御九州", "孤城帝业", "山河为局"],
};

const getGeneratedGameName = (worldType: string, seed: number) => {
  const variants = WORLD_NAME_VARIANTS[worldType] ?? [GAME_NAMES[worldType] ?? "未命名之卷"];
  return variants[seed % variants.length];
};

const initialHeroes: HeroCharacter[] = [
  {
    id: "xiao-yehan",
    name: "萧夜寒",
    age: "24",
    outerTags: ["高冷"],
    innerTags: ["深情"],
    identity: "冷宫废皇子，表面失势，暗中仍有人替他传递消息。",
    appearance: "墨发如瀑，肤若冷玉，常着玄色旧袍，眼神锋利而克制。",
  },
  {
    id: "shen-mochen",
    name: "沈墨尘",
    age: "26",
    outerTags: ["痞气"],
    innerTags: ["腹黑"],
    identity: "镇北将军之子，玩世不恭只是保护色。",
    appearance: "剑眉英挺，肤色微铜，笑起来漫不经心，手背有旧伤。",
  },
];

const heroPool: HeroCharacter[] = [
  ...initialHeroes,
  {
    id: "gu-yuan",
    name: "顾渊",
    age: "25",
    outerTags: ["温润"],
    innerTags: ["孤独"],
    identity: "太医院少院判，温和守礼，掌握宫中许多不能说的病案。",
    appearance: "眉眼清雅，常带药香，袖口总压着一枚旧银针。",
  },
  {
    id: "pei-xingzhou",
    name: "裴行舟",
    age: "27",
    outerTags: ["张扬"],
    innerTags: ["野心"],
    identity: "新贵权臣，锋芒太露，却愿意为你留一条退路。",
    appearance: "红衣金扣，眉峰凌厉，笑意明亮却带审视。",
  },
  {
    id: "xie-linyuan",
    name: "谢临渊",
    age: "23",
    outerTags: ["清冷"],
    innerTags: ["偏执"],
    identity: "前朝遗孤，隐身禁军，所有忠诚都藏着代价。",
    appearance: "眼尾微冷，常佩无纹短刀，站在人群里像一段雪光。",
  },
];

const initialHeroines: HeroCharacter[] = [
  {
    id: "su-wanyue",
    name: "苏挽月",
    age: "22",
    outerTags: ["温柔"],
    innerTags: ["坚韧"],
    identity: "医馆少东家，表面温顺，遇事却从不退让。",
    appearance: "眉眼柔和，常着浅青衣裙，腕间系着一枚旧铃。",
  },
  {
    id: "liu-ruyan",
    name: "柳如烟",
    age: "24",
    outerTags: ["冷艳"],
    innerTags: ["腹黑"],
    identity: "情报组织首领，擅长用笑意遮住刀锋。",
    appearance: "红唇冷眸，衣饰利落，发间银簪暗藏机关。",
  },
];

const heroinePool: HeroCharacter[] = [
  ...initialHeroines,
  {
    id: "jiang-ning",
    name: "姜宁",
    age: "21",
    outerTags: ["活泼"],
    innerTags: ["赤诚"],
    identity: "江湖跑商之女，消息灵通，胆子比天大。",
    appearance: "笑眼明亮，衣角总沾着风尘，腰间挂满小物件。",
  },
  {
    id: "ye-qinglan",
    name: "叶清澜",
    age: "25",
    outerTags: ["清纯"],
    innerTags: ["神秘"],
    identity: "失忆的琴师，琴声里藏着某个灭门旧案。",
    appearance: "白衣素净，指尖有薄茧，望人时像隔着一层雾。",
  },
  {
    id: "tang-xue",
    name: "唐雪",
    age: "23",
    outerTags: ["飒爽"],
    innerTags: ["独立"],
    identity: "边城女捕，行事果决，最讨厌拖泥带水。",
    appearance: "束发劲装，眼神清亮，佩刀从不离身。",
  },
];

const initialMainPlot: PlotValues = {
  opening: "主角在命运的夹缝中进入新的世界，第一次看见权力、情感与危险交织的真实面。",
  develop: "关键人物陆续登场，旧秘密被一点点揭开，主角开始在不同阵营之间做出选择。",
  climax: "所有关系与矛盾集中爆发，信任被考验，主角必须付出代价换取真正的主动权。",
  ending: "世界危机迎来结算，角色关系落定，主角走向由选择共同塑造的最终结局。",
};

const initialFemaleLines: CharacterPlotLine[] = [
  {
    id: "xiao",
    title: "萧夜寒 + 你",
    values: {
      opening: "冷宫雪夜，你误入禁地，第一次看见他从黑暗中抬眼。",
      develop: "他教你读懂宫中暗语，你也逐渐发现他藏起的旧伤。",
      climax: "夺嫡风暴中，他愿把唯一退路让给你，却也把真心暴露在刀锋前。",
      ending: "若你选择相信，他会与你共同走出长夜；若你退后，他仍会替你守住最后一盏灯。",
    },
  },
  {
    id: "shen",
    title: "沈墨尘 + 你",
    values: {
      opening: "练武场上，他用漫不经心的笑替你挡下一场羞辱。",
      develop: "你发现他的轻佻只是伪装，真正的他比任何人都清醒。",
      climax: "边军与朝堂冲突爆发，他必须在家族忠义与你之间做出选择。",
      ending: "你们可能并肩策马离开，也可能在宫门前把未说出口的话永远藏起。",
    },
  },
];

const initialMaleLines: CharacterPlotLine[] = [
  {
    id: "su",
    title: "你 + 苏挽月",
    values: {
      opening: "你在雨夜受伤，被苏挽月藏进医馆后院。",
      develop: "她帮你处理伤口，也一点点看穿你不肯说出口的来历。",
      climax: "敌人追至城中，她第一次违背家训，将你推向生路。",
      ending: "若你回头，她会与你并肩；若你远走，她会把那枚旧铃留给你。",
    },
  },
  {
    id: "liu",
    title: "你 + 柳如烟",
    values: {
      opening: "你在黑市交易中遇见柳如烟，她一句话便拆穿你的伪装。",
      develop: "你们互相利用，却在一次次试探里生出危险的默契。",
      climax: "情报网崩塌，她把最致命的秘密交到你手中。",
      ending: "你们可能共享胜利，也可能在真相揭开后成为彼此最锋利的遗憾。",
    },
  },
];

const initialStages = {
  guide: "引导期 1-3 天：通过固定事件建立世界规则、初遇关键角色。",
  free: "自由期第 4 天起：开放主要地点，让玩家通过行动积累关系和线索。",
  mid: "中期大事件约第 15 天：主线危机第一次集中爆发，迫使玩家站队。",
  late: "后期 20-30 天：地点开放条件收紧，角色线与主线进入最终结算。",
};

const initialLocations: SceneLocation[] = [
  { id: "garden", name: "御花园", times: ["上午", "下午", "晚上"], condition: "默认开放", roles: ["萧夜寒", "苏挽月"] },
  { id: "training", name: "练武场", times: ["上午", "下午"], condition: "第4天后开放", roles: ["沈墨尘"] },
  { id: "clinic", name: "太医院", times: ["上午", "下午", "晚上"], condition: "触发受伤事件后开放", roles: ["萧夜寒", "顾渊"] },
  { id: "study", name: "书房", times: ["下午", "晚上"], condition: "才智达到10后开放", roles: ["顾渊"] },
  { id: "bedroom", name: "寝宫", times: ["晚上"], condition: "每日固定返回", roles: ["你"] },
  { id: "wall-path", name: "宫墙小道", times: ["下午", "晚上"], condition: "完成一次夜探后开放", roles: ["沈墨尘", "柳如烟"] },
  { id: "cold-palace", name: "冷宫", times: ["晚上"], condition: "主线第3天后开放", roles: ["萧夜寒"] },
];

const initialActions: SceneAction[] = [
  { id: "explore", name: "探索地点", desc: "在当前地点搜索线索、触发随机事件。" },
  { id: "meet", name: "去找某人", desc: "主动前往角色所在地点，触发互动剧情。" },
  { id: "train", name: "提升属性", desc: "消耗一个时段，提高四维养成数值。" },
  { id: "rest", name: "休息恢复", desc: "回复体力或理智，可能错过部分限时事件。" },
  { id: "investigate", name: "调查线索", desc: "消耗线索点推进谜团或主线真相。" },
];

function cloneMainPlot(worldType: string): PlotValues | null {
  const defaults = getWorldDefault(worldType);
  return defaults ? { ...defaults.mainPlot } : null;
}

function cloneCharacterLines(worldType: string, gender: WorldSettings["gender"]): CharacterPlotLine[] | null {
  const defaults = getWorldDefault(worldType);
  if (!defaults || gender !== "female") return null;

  return defaults.characterLines.map((line) => ({
    ...line,
    values: { ...line.values },
  }));
}

function cloneScenes(worldType: string) {
  const defaults = getWorldDefault(worldType);
  if (!defaults) return null;

  return {
    locations: defaults.locations.map((location) => ({
      ...location,
      times: [...location.times],
      roles: [...location.roles],
    })),
    actions: initialActions.map((action) => ({ ...action })),
  };
}

function cloneHeroes(worldType: string): HeroCharacter[] | null {
  const defaults = getWorldDefault(worldType);
  if (!defaults) return null;

  return defaults.heroes.map((hero) => ({
    id: hero.id,
    name: hero.name,
    age: hero.age,
    outerTags: [...hero.outerTags],
    innerTags: [...hero.innerTags],
    identity: hero.identity,
    appearance: hero.appearance,
    intro: hero.intro,
  }));
}

function buildWorldDefaultPatch(worldType: string, gender: WorldSettings["gender"]) {
  const defaults = getWorldDefault(worldType);
  const nextScenes = cloneScenes(worldType);
  const nextHeroes = cloneHeroes(worldType);
  const patch: Partial<EditorState> = {
    gameName: defaults?.gameName ?? GAME_NAMES[worldType] ?? "",
    mechTypes: defaultMechanics(worldType),
    mainPlot: cloneMainPlot(worldType) ?? buildMainPlot(worldType, 0),
    characterLines: cloneCharacterLines(worldType, gender) ?? buildCharacterLines(gender, 0),
    locations: nextScenes?.locations ?? buildScenes(worldType, 0).locations,
    actions: nextScenes?.actions ?? buildScenes(worldType, 0).actions,
  };

  if (nextHeroes && gender === "female") {
    patch.heroes = nextHeroes;
    patch.activeHeroId = nextHeroes[0]?.id ?? "";
  }

  if (defaults && gender === "female") {
    patch.femaleHeroineType = defaults.heroine.typeId;
    patch.femaleHeroineIdentity = defaults.heroine.identity;
    patch.femaleHeroineAppearance = defaults.heroine.appearance;
  }

  return patch;
}

function buildMainPlot(worldType: string, seed: number): PlotValues {
  const defaultPlot = cloneMainPlot(worldType);
  if (defaultPlot) return defaultPlot;

  const outlines = OUTLINES_MAP[worldType] ?? DEFAULT_OUTLINES;
  const outline = outlines[seed % outlines.length] ?? outlines[0];
  return {
    opening: `${outline.title}成为开端：${outline.desc}`,
    develop: `围绕「${outline.factions}」展开探索，玩家在日常行动中逐步接近核心人物。`,
    climax: `${outline.crisis}，所有角色关系和阵营选择被推到台前。`,
    ending: `${outline.mystery}将决定最终真相，结局会随好感、阵营与关键选择分化。`,
  };
}

function buildCharacterLines(gender: WorldSettings["gender"], seed: number) {
  const baseLines = gender === "female" ? initialFemaleLines : initialMaleLines;
  const variants = [
    ["一次偶然相遇让你们被迫同行，最初的试探里藏着戒备。", "共同经历让关系逐渐松动，对方开始交出隐秘软肋。", "危机逼近时，信任与自保之间只剩一次选择。", "这条线会根据选择收束为守护、分离，或迟来的坦白。"],
    ["你在最狼狈的时刻撞见对方，也撞见不该被看见的秘密。", "对方一边推开你，一边在暗处替你清路。", "旧案翻出真相，你们依赖彼此的理由被彻底撕开。", "你可以把对方拉回人间，也可能亲手结束这段牵制。"],
    ["一个看似普通的约定成为起点，你们从互相利用开始靠近。", "日常互动积累出细小信任，连沉默都有了只有你们懂的含义。", "外部压力集中爆发，对方必须公开立场，你也要回应这份偏爱。", "若选择并肩，长夜会结束；若选择退后，遗憾会成为最后的灯。"],
  ];
  const picked = variants[seed % variants.length];

  return baseLines.map((line, index) => ({
    ...line,
    values: {
      opening: `${line.title}：${picked[0]}`,
      develop: picked[1 + (index % 2)],
      climax: picked[2],
      ending: picked[3],
    },
  }));
}

function buildScenes(worldType: string, seed: number) {
  const defaultScenes = cloneScenes(worldType);
  if (defaultScenes) return defaultScenes;

  const ancient = worldType.includes("宫") || worldType.includes("帝") || worldType.includes("将");
  const nameSets = ancient
    ? [
        ["御花园", "练武场", "太医院", "书房", "寝宫", "宫墙小道", "冷宫"],
        ["含章殿", "玄武门", "司药局", "藏书阁", "偏殿", "月廊", "废苑"],
      ]
    : [
        ["咖啡馆", "事务所", "医院", "图书馆", "公寓", "天台", "旧仓库"],
        ["社团楼", "训练室", "档案馆", "美术馆", "车站", "地下街", "秘密基地"],
      ];
  const names = nameSets[seed % nameSets.length];
  const locations = names.map((name, index) => ({
    id: `location-${index + 1}`,
    name,
    times: index % 3 === 0 ? ["上午", "下午", "晚上"] : index % 3 === 1 ? ["上午", "下午"] : ["下午", "晚上"],
    condition: index < 2 ? "默认开放" : `主线第${index + 2}天后开放`,
    roles: index % 2 === 0 ? ["萧夜寒", "苏挽月"] : ["沈墨尘", "顾渊"],
  })) satisfies SceneLocation[];

  const actions: SceneAction[] = [
    { id: "explore", name: "探索地点", desc: `在「${worldType}」的关键地点搜索线索、触发随机事件。` },
    { id: "meet", name: "去找某人", desc: "主动前往角色所在地点，推进好感与专属剧情。" },
    { id: "train", name: "提升属性", desc: "消耗一个时段提升四维属性，解锁后续分支。" },
    { id: "rest", name: "休息恢复", desc: "恢复状态并整理情报，但可能错过限时事件。" },
    { id: "investigate", name: "调查线索", desc: "消耗线索点推进主线谜团或阵营真相。" },
  ];

  return { locations, actions };
}

function defaultMechanics(worldType: string): GameTypeId[] {
  const recommended = WORLD_MECHANIC_MAP[worldType] ?? ["romance", "raising"];
  const openOnly = recommended.filter((id) => id === "romance" || id === "raising");
  return openOnly.length ? openOnly : ["romance", "raising"];
}

const initialWorldPatch = buildWorldDefaultPatch(
  initialWorldSettings.worldType,
  initialWorldSettings.gender,
);

const toProjectState = (state: EditorState): PersistedEditorState => ({
  mode: state.mode,
  step: state.step,
  done: state.done,
  worldSettings: state.worldSettings,
  gameName: state.gameName,
  worldOutlineSeed: state.worldOutlineSeed,
  mechTypes: state.mechTypes,
  artStyle: state.artStyle,
  proportion: state.proportion,
  heroes: state.heroes,
  activeHeroId: state.activeHeroId,
  maleHeroType: state.maleHeroType,
  maleHeroAge: state.maleHeroAge,
  maleHeroIdentity: state.maleHeroIdentity,
  maleHeroAppearance: state.maleHeroAppearance,
  heroines: state.heroines,
  activeHeroineId: state.activeHeroineId,
  femaleHeroineType: state.femaleHeroineType,
  femaleHeroineAge: state.femaleHeroineAge,
  femaleHeroineIdentity: state.femaleHeroineIdentity,
  femaleHeroineAppearance: state.femaleHeroineAppearance,
  mainPlot: state.mainPlot,
  characterLines: state.characterLines,
  locations: state.locations,
  actions: state.actions,
  totalDays: state.totalDays,
  sceneStages: state.sceneStages,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeImportedProject = (value: unknown): Partial<PersistedEditorState> | null => {
  if (!isRecord(value)) return null;
  const project = isRecord(value.project) ? value.project : value;
  if (!isRecord(project)) return null;

  return project as Partial<PersistedEditorState>;
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
  hasHydrated: false,
  mode: null,
  step: "world",
  done: [],
  worldSettings: initialWorldSettings,
  gameName: initialWorldPatch.gameName ?? GAME_NAMES[initialWorldSettings.worldType],
  worldOutlineSeed: 0,
  mechTypes: initialWorldPatch.mechTypes ?? defaultMechanics(initialWorldSettings.worldType),
  artStyle: "cn_fine",
  proportion: "slim",
  heroes: initialWorldPatch.heroes ?? initialHeroes,
  activeHeroId: initialWorldPatch.activeHeroId ?? initialHeroes[0].id,
  maleHeroType: "yx",
  maleHeroAge: "22",
  maleHeroIdentity: "不受宠的边缘皇子，从冷宫与废墟中重新组织自己的势力。",
  maleHeroAppearance: "身形修长，眉目沉静，常穿不起眼的深色衣袍，腰间藏着旧玉佩。",
  heroines: initialHeroines,
  activeHeroineId: initialHeroines[0].id,
  femaleHeroineType: initialWorldPatch.femaleHeroineType ?? "dv",
  femaleHeroineAge: "21",
  femaleHeroineIdentity: initialWorldPatch.femaleHeroineIdentity ?? "出身普通却不愿被命运安排，正在为自己争取真正的选择权。",
  femaleHeroineAppearance: initialWorldPatch.femaleHeroineAppearance ?? "眉眼清亮，身形利落，衣着简洁但有锋芒。",
  mainPlot: initialWorldPatch.mainPlot ?? initialMainPlot,
  characterLines: initialWorldPatch.characterLines ?? initialFemaleLines,
  locations: initialWorldPatch.locations ?? initialLocations,
  actions: initialWorldPatch.actions ?? initialActions,
  totalDays: "30",
  sceneStages: initialStages,
  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
  setMode: (mode) =>
    set({
      mode,
      step: "world",
      done: [],
    }),
  setStep: (step) => set({ step }),
  setWorldSettings: (worldSettings) =>
    set({
      worldSettings,
      ...buildWorldDefaultPatch(worldSettings.worldType, worldSettings.gender),
    }),
  setGameName: (gameName) => set({ gameName }),
  generateWorldOutline: () =>
    set((state) => {
      const nextSeed = state.worldOutlineSeed + 1;
      const defaultPatch = buildWorldDefaultPatch(
        state.worldSettings.worldType,
        state.worldSettings.gender,
      );

      return {
        ...defaultPatch,
        worldOutlineSeed: nextSeed,
        gameName: defaultPatch.gameName ?? getGeneratedGameName(state.worldSettings.worldType, nextSeed),
      };
    }),
  generateMechanics: () =>
    set((state) => ({
      mechTypes: defaultMechanics(state.worldSettings.worldType),
    })),
  setMechTypes: (mechTypes) => set({ mechTypes }),
  toggleMechanic: (mechanicId) =>
    set((state) => {
      if (state.mechTypes.includes(mechanicId)) {
        return {
          mechTypes:
            state.mechTypes.length === 1
              ? state.mechTypes
              : state.mechTypes.filter((id) => id !== mechanicId),
        };
      }

      if (state.mechTypes.length >= 3) {
        return { mechTypes: state.mechTypes };
      }

      return { mechTypes: [...state.mechTypes, mechanicId] };
    }),
  moveMechanic: (mechanicId, direction) =>
    set((state) => {
      const index = state.mechTypes.indexOf(mechanicId);
      const nextIndex = direction === "up" ? index - 1 : index + 1;

      if (index < 0 || nextIndex < 0 || nextIndex >= state.mechTypes.length) {
        return { mechTypes: state.mechTypes };
      }

      const nextMechTypes = [...state.mechTypes];
      [nextMechTypes[index], nextMechTypes[nextIndex]] = [
        nextMechTypes[nextIndex],
        nextMechTypes[index],
      ];

      return { mechTypes: nextMechTypes };
    }),
  setArtStyle: (artStyle) => set({ artStyle }),
  setProportion: (proportion) => set({ proportion }),
  setActiveHeroId: (activeHeroId) => set({ activeHeroId }),
  updateHero: (heroId, patch) =>
    set((state) => ({
      heroes: state.heroes.map((hero) => (hero.id === heroId ? { ...hero, ...patch } : hero)),
    })),
  addHero: () =>
    set((state) => {
      if (state.heroes.length >= 5) return { heroes: state.heroes };
      const nextHero =
        heroPool.find((hero) => !state.heroes.some((existing) => existing.id === hero.id)) ??
        heroPool[state.heroes.length % heroPool.length];
      return {
        heroes: [...state.heroes, { ...nextHero, id: `${nextHero.id}-${state.heroes.length}` }],
        activeHeroId: `${nextHero.id}-${state.heroes.length}`,
      };
    }),
  setMaleHeroType: (maleHeroType) => set({ maleHeroType }),
  setMaleHeroField: (field, value) => set({ [field]: value }),
  generateActiveHero: () =>
    set((state) => {
      const activeHero = state.heroes.find((hero) => hero.id === state.activeHeroId) ?? state.heroes[0];
      const worldHeroes = cloneHeroes(state.worldSettings.worldType);
      const sourcePool = worldHeroes?.length ? worldHeroes : heroPool;
      const currentIndex = sourcePool.findIndex((hero) => hero.name === activeHero.name);
      const nextHero = sourcePool[(Math.max(currentIndex, 0) + 1) % sourcePool.length];
      return {
        heroes: state.heroes.map((hero) =>
          hero.id === activeHero.id ? { ...nextHero, id: hero.id } : hero,
        ),
      };
    }),
  generateMaleHeroSetting: () =>
    set((state) => {
      const seed = state.worldOutlineSeed + state.maleHeroAge.length;
      const variants = [
        {
          maleHeroAge: "22",
          maleHeroIdentity: "不受宠的边缘皇子，从冷宫与废墟中重新组织自己的势力。",
          maleHeroAppearance: "身形修长，眉目沉静，常穿不起眼的深色衣袍，腰间藏着旧玉佩。",
        },
        {
          maleHeroAge: "25",
          maleHeroIdentity: "被流放归来的旧臣之子，表面收敛，暗中掌握一条隐秘情报线。",
          maleHeroAppearance: "黑发束起，眼尾锋利，衣饰克制却总带着战场留下的旧痕。",
        },
        {
          maleHeroAge: "27",
          maleHeroIdentity: "新晋权臣，擅长在宴席与朝局之间布置退路。",
          maleHeroAppearance: "肩背挺拔，常着深色官服，笑意温和但目光极冷。",
        },
      ];
      return variants[seed % variants.length];
    }),
  setActiveHeroineId: (activeHeroineId) => set({ activeHeroineId }),
  updateHeroine: (heroineId, patch) =>
    set((state) => ({
      heroines: state.heroines.map((heroine) =>
        heroine.id === heroineId ? { ...heroine, ...patch } : heroine,
      ),
    })),
  addHeroine: () =>
    set((state) => {
      if (state.heroines.length >= 5) return { heroines: state.heroines };
      const nextHeroine =
        heroinePool.find((heroine) => !state.heroines.some((existing) => existing.id === heroine.id)) ??
        heroinePool[state.heroines.length % heroinePool.length];
      const nextId = `${nextHeroine.id}-${state.heroines.length}`;
      return {
        heroines: [...state.heroines, { ...nextHeroine, id: nextId }],
        activeHeroineId: nextId,
      };
    }),
  setFemaleHeroineType: (femaleHeroineType) => set({ femaleHeroineType }),
  setFemaleHeroineField: (field, value) => set({ [field]: value }),
  generateActiveHeroine: () =>
    set((state) => {
      const activeHeroine =
        state.heroines.find((heroine) => heroine.id === state.activeHeroineId) ?? state.heroines[0];
      const currentIndex = heroinePool.findIndex((heroine) => heroine.name === activeHeroine.name);
      const nextHeroine = heroinePool[(Math.max(currentIndex, 0) + 1) % heroinePool.length];
      return {
        heroines: state.heroines.map((heroine) =>
          heroine.id === activeHeroine.id ? { ...nextHeroine, id: heroine.id } : heroine,
        ),
      };
    }),
  generateFemaleHeroineSetting: () =>
    set((state) => {
      const defaults = getWorldDefault(state.worldSettings.worldType);
      if (defaults && state.worldSettings.gender === "female") {
        return {
          femaleHeroineType: defaults.heroine.typeId,
          femaleHeroineIdentity: defaults.heroine.identity,
          femaleHeroineAppearance: defaults.heroine.appearance,
        };
      }
      const seed = state.worldOutlineSeed + state.femaleHeroineAge.length;
      const variants = [
        {
          femaleHeroineAge: "21",
          femaleHeroineIdentity: "出身普通却不愿被命运安排，正在为自己争取真正的选择权。",
          femaleHeroineAppearance: "眉眼清亮，身形利落，衣着简洁但有锋芒。",
        },
        {
          femaleHeroineAge: "19",
          femaleHeroineIdentity: "刚入宫的采女，被分配到最偏僻的浣衣局，却记得每一次轻慢。",
          femaleHeroineAppearance: "容貌清丽但不张扬，眉眼间有一股不服输的劲。",
        },
        {
          femaleHeroineAge: "24",
          femaleHeroineIdentity: "亡国旧族之后，表面温顺入局，暗中寻找翻盘机会。",
          femaleHeroineAppearance: "衣着素净，举止端方，笑起来温和却从不交出底牌。",
        },
      ];
      return variants[seed % variants.length];
    }),
  setMainPlotValue: (key, value) =>
    set((state) => ({
      mainPlot: { ...state.mainPlot, [key]: value },
    })),
  generateMainPlot: () =>
    set((state) => ({
      worldOutlineSeed: state.worldOutlineSeed + 1,
      mainPlot: buildMainPlot(state.worldSettings.worldType, state.worldOutlineSeed + 1),
    })),
  generateCharacterLine: (lineId) =>
    set((state) => {
      const nextSeed = state.worldOutlineSeed + 1;
      const generatedLines = buildCharacterLines(state.worldSettings.gender, nextSeed);
      const generatedLine = generatedLines.find((line) => line.id === lineId);
      if (!generatedLine) return { worldOutlineSeed: nextSeed };
      return {
        worldOutlineSeed: nextSeed,
        characterLines: state.characterLines.map((line) =>
          line.id === lineId ? generatedLine : line,
        ),
      };
    }),
  setLocations: (locations) => set({ locations }),
  setActions: (actions) => set({ actions }),
  setTotalDays: (totalDays) => set({ totalDays }),
  setSceneStage: (stage, value) =>
    set((state) => ({
      sceneStages: { ...state.sceneStages, [stage]: value },
    })),
  generateScenes: () =>
    set((state) => {
      const nextSeed = state.worldOutlineSeed + 1;
      const nextScenes = buildScenes(state.worldSettings.worldType, nextSeed);
      return {
        worldOutlineSeed: nextSeed,
        locations: nextScenes.locations,
        actions: nextScenes.actions,
        sceneStages: {
          guide: `引导期 1-3 天：围绕「${state.worldSettings.worldType}」建立目标、地点与关键人物。`,
          free: "自由期第 4 天起：开放主要地点，允许玩家自由安排探索、互动和养成。",
          mid: "中期大事件约第 15 天：阵营矛盾集中爆发，角色关系进入不可回避的选择点。",
          late: "后期 20-30 天：地点开放条件收紧，主线与角色线共同进入最终结算。",
        },
      };
    }),
  applyAiInstruction: (text) => {
    const state = get();
    const normalized = text.toLowerCase();
    const hasDark = /黑暗|更暗|阴暗|压抑|残酷|危险/.test(text);
    const hasMystery = /悬疑|推理|线索|真相|谜/.test(text);
    const hasStrategy = /策略|谋略|权谋|势力|博弈/.test(text);
    const hasStrong = /强势|大女主|独立|不求人/.test(text);
    const hasAssassination = /刺杀|暗杀|血案|袭击/.test(text);
    const hasSecretRoom = /密室|隐藏地点|秘密地点/.test(text);
    const hasShorten = /缩短|减少天数|短一点/.test(text);

    if (state.step === "world") {
      if (hasDark) {
        set({
          gameName: state.gameName.includes("暗") ? state.gameName : `${state.gameName}：暗卷`,
          mainPlot: {
            opening: "主角踏入一个更阴冷的世界：表面的秩序仍在，暗处却早已被背叛、旧案与权力交易腐蚀。",
            develop: "每个阵营都藏着不能公开的罪证，角色关系不再只是亲近或疏远，而是互相试探、利用与交换底牌。",
            climax: "皇室秘闻被迫浮出水面，昔日盟友可能倒戈，主角必须在保全自己和揭开真相之间付出代价。",
            ending: "最终结局不再只有胜利或失败，而取决于主角愿意留下多少善意、牺牲多少信任。",
          },
        });
        return "已调整世界设定：整体氛围变得更黑暗，主线加入了旧案、背叛和权力交易。";
      }

      get().generateWorldOutline();
      return "已根据你的描述重新生成世界名称和世界大纲。";
    }

    if (state.step === "mechanic") {
      if (hasMystery) {
        set({ mechTypes: ["romance", "raising"] });
        return "已调整游戏玩法：当前开放玩法仍保留恋爱攻略和养成模拟，并把体验说明往线索与真相压力靠拢。";
      }
      if (hasStrategy) {
        set({ mechTypes: ["romance", "raising"] });
        return "已调整游戏玩法：恋爱攻略保留为主驱动，养成模拟会承担更多权衡、节奏和分支压力。";
      }
      get().generateMechanics();
      return "已重新推荐当前世界适配的玩法组合。";
    }

    if (state.step === "hero") {
      if (state.worldSettings.gender === "female") {
        const activeHero = state.heroes.find((hero) => hero.id === state.activeHeroId);
        if (activeHero) {
          set({
            heroes: state.heroes.map((hero) =>
              hero.id === activeHero.id
                ? {
                    ...hero,
                    outerTags: hasDark ? ["阴郁"] : ["高冷"],
                    innerTags: hasDark ? ["偏执"] : ["深情"],
                    identity: hasDark
                      ? "废太子旧党暗中扶持的影子继承人，手里握着足以掀翻朝局的血案证据。"
                      : "冷宫废皇子，表面失势，暗中仍有人替他传递消息。",
                    appearance: hasDark
                      ? "眉眼苍白冷峻，常着无纹黑衣，指节有旧伤，笑意里带着危险的克制。"
                      : hero.appearance,
                  }
                : hero,
            ),
          });
        }
        return "已调整男主设定：他的气质更危险，身份与外貌也同步加深了暗线感。";
      }
      get().generateMaleHeroSetting();
      return "已重新生成男性向男主的身份、年龄和外貌设定。";
    }

    if (state.step === "heroine") {
      if (state.worldSettings.gender === "female") {
        if (hasStrong) {
          set({
            femaleHeroineType: "dv",
            femaleHeroineIdentity: "她不再等待任何人拯救，哪怕被推入权力夹缝，也要亲手拿回选择权。",
            femaleHeroineAppearance: "眼神清亮坚定，衣着简洁利落，举止克制却有不肯低头的锋芒。",
          });
          return "已调整女主设定：她更强势、更独立，身份处境也更主动。";
        }
        get().generateFemaleHeroineSetting();
        return "已重新生成女主的身份、年龄和外貌设定。";
      }
      get().generateActiveHeroine();
      return "已重新生成当前女主角色卡。";
    }

    if (state.step === "plot") {
      const nextMainPlot = {
        opening: hasAssassination
          ? "开端加入一场突如其来的刺杀：主角在混乱中被迫看见权力与情感交织的真实面。"
          : state.mainPlot.opening,
        develop: hasDark
          ? "发展阶段加入更深的旧案追查，角色之间的帮助都带着交换条件。"
          : state.mainPlot.develop,
        climax: hasDark || hasAssassination
          ? "高潮更残酷：刺杀真凶、阵营背叛与角色关系在同一夜集中爆发。"
          : state.mainPlot.climax,
        ending: /开放/.test(text)
          ? "结局改为开放式：真相揭开后仍留下选择余地，角色关系不被彻底钉死。"
          : state.mainPlot.ending,
      };
      set({ mainPlot: nextMainPlot });
      return "已调整剧情线：主线节奏和关键冲突已经按你的要求改写。";
    }

    if (state.step === "scene") {
      if (hasSecretRoom) {
        const nextLocation: SceneLocation = {
          id: `secret-room-${state.locations.length + 1}`,
          name: "密室",
          times: ["晚上"],
          condition: "发现旧案线索后开放",
          roles: ["萧夜寒", "你"],
        };
        set({ locations: [...state.locations, nextLocation] });
        return "已增加密室地点，并设置为夜晚开放的关键线索场景。";
      }
      if (hasShorten) {
        set({ totalDays: "20" });
        return "已把游戏总天数缩短到 20 天，节奏会更紧凑。";
      }
      get().generateScenes();
      return "已重新生成地点、行动类型和场景节奏。";
    }

    return normalized.includes("检查")
      ? "已检查当前配置：核心内容已经具备，可以继续逐页确认并补充细节。"
      : "已收到，我会把这条要求用于当前页的内容调整。";
  },
  applyWorldPatch: (patch) =>
    set((state) => ({
      gameName: patch.gameName ?? state.gameName,
      mainPlot: patch.mainPlot ? { ...state.mainPlot, ...patch.mainPlot } : state.mainPlot,
    })),
  exportProject: () => {
    const snapshot: ProjectSnapshot = {
      app: "unfold",
      version: 1,
      exportedAt: new Date().toISOString(),
      project: toProjectState(get()),
    };

    return JSON.stringify(snapshot, null, 2);
  },
  importProject: (json) => {
    try {
      const parsed = JSON.parse(json) as unknown;
      const importedProject = normalizeImportedProject(parsed);

      if (!importedProject) {
        return { ok: false, message: "这个文件不是可识别的开卷项目 JSON。" };
      }

      const nextMode = importedProject.mode === "beginner" || importedProject.mode === "pro"
        ? importedProject.mode
        : "beginner";
      const nextSteps = getSteps(nextMode);
      const importedStep = importedProject.step;
      const nextStep = nextSteps.some((item) => item.id === importedStep) ? importedStep : "world";
      const nextDone = Array.isArray(importedProject.done)
        ? importedProject.done.filter((item): item is StepId =>
            nextSteps.some((step) => step.id === item),
          )
        : [];

      set({
        ...importedProject,
        mode: nextMode,
        step: nextStep,
        done: nextDone,
      });

      return { ok: true, message: "项目已导入，可以继续编辑。" };
    } catch {
      return { ok: false, message: "JSON 文件读取失败，请确认文件格式正确。" };
    }
  },
  selectGender: (gender) => {
    const era = "ancient";
    const worldType = WORLDS[gender][era][0];

    set({
      worldSettings: { gender, era, worldType },
      worldOutlineSeed: 0,
      ...buildWorldDefaultPatch(worldType, gender),
    });
  },
  selectEra: (era) => {
    const { gender } = get().worldSettings;
    const worldType = WORLDS[gender][era][0];

    set({
      worldSettings: { gender, era, worldType },
      worldOutlineSeed: 0,
      ...buildWorldDefaultPatch(worldType, gender),
    });
  },
  selectWorldType: (worldType) =>
    set((state) => {
      return {
        worldSettings: { ...state.worldSettings, worldType },
        worldOutlineSeed: 0,
        ...buildWorldDefaultPatch(worldType, state.worldSettings.gender),
      };
    }),
  markDone: (step) =>
    set((state) => ({
      done: state.done.includes(step) ? state.done : [...state.done, step],
    })),
  goNext: (step) => {
    const mode = get().mode ?? "pro";
    const steps = getSteps(mode);
    const currentIndex = steps.findIndex((item) => item.id === step);
    const nextStep = steps[currentIndex + 1]?.id;

    get().markDone(step);

    if (nextStep) {
      set({ step: nextStep });
    }
  },
    }),
    {
      name: "unfold-editor-project-v2",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: toProjectState,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
