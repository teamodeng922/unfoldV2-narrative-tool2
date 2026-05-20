"use client";

import { create } from "zustand";
import { GAME_NAMES } from "@/src/data/game-names";
import { OUTLINES_MAP, DEFAULT_OUTLINES } from "@/src/data/outlines";
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
  selectGender: (gender: WorldSettings["gender"]) => void;
  selectEra: (era: WorldSettings["era"]) => void;
  selectWorldType: (worldType: string) => void;
  markDone: (step: StepId) => void;
  goNext: (step: StepId) => void;
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

function buildMainPlot(worldType: string, seed: number): PlotValues {
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

export const useEditorStore = create<EditorState>((set, get) => ({
  mode: null,
  step: "world",
  done: [],
  worldSettings: initialWorldSettings,
  gameName: GAME_NAMES[initialWorldSettings.worldType],
  worldOutlineSeed: 0,
  mechTypes: WORLD_MECHANIC_MAP[initialWorldSettings.worldType] ?? ["romance"],
  artStyle: "cn_fine",
  proportion: "slim",
  heroes: initialHeroes,
  activeHeroId: initialHeroes[0].id,
  maleHeroType: "yx",
  maleHeroAge: "22",
  maleHeroIdentity: "不受宠的边缘皇子，从冷宫与废墟中重新组织自己的势力。",
  maleHeroAppearance: "身形修长，眉目沉静，常穿不起眼的深色衣袍，腰间藏着旧玉佩。",
  heroines: initialHeroines,
  activeHeroineId: initialHeroines[0].id,
  femaleHeroineType: "dv",
  femaleHeroineAge: "21",
  femaleHeroineIdentity: "出身普通却不愿被命运安排，正在为自己争取真正的选择权。",
  femaleHeroineAppearance: "眉眼清亮，身形利落，衣着简洁但有锋芒。",
  mainPlot: initialMainPlot,
  characterLines: initialFemaleLines,
  locations: initialLocations,
  actions: initialActions,
  totalDays: "30",
  sceneStages: initialStages,
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
      gameName: GAME_NAMES[worldSettings.worldType] ?? get().gameName,
      mechTypes: WORLD_MECHANIC_MAP[worldSettings.worldType] ?? get().mechTypes,
    }),
  setGameName: (gameName) => set({ gameName }),
  generateWorldOutline: () =>
    set((state) => {
      const nextSeed = state.worldOutlineSeed + 1;
      const nextMechanics = defaultMechanics(state.worldSettings.worldType);
      const nextScenes = buildScenes(state.worldSettings.worldType, nextSeed);

      return {
        worldOutlineSeed: nextSeed,
        gameName: getGeneratedGameName(state.worldSettings.worldType, nextSeed),
        mechTypes: nextMechanics,
        mainPlot: buildMainPlot(state.worldSettings.worldType, nextSeed),
        characterLines: buildCharacterLines(state.worldSettings.gender, nextSeed),
        locations: nextScenes.locations,
        actions: nextScenes.actions,
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
      const currentIndex = heroPool.findIndex((hero) => hero.name === activeHero.name);
      const nextHero = heroPool[(Math.max(currentIndex, 0) + 1) % heroPool.length];
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
  selectGender: (gender) => {
    const era = "ancient";
    const worldType = WORLDS[gender][era][0];
    const nextScenes = buildScenes(worldType, 0);

    set({
      worldSettings: { gender, era, worldType },
      gameName: GAME_NAMES[worldType] ?? "",
      mechTypes: defaultMechanics(worldType),
      mainPlot: buildMainPlot(worldType, 0),
      characterLines: buildCharacterLines(gender, 0),
      locations: nextScenes.locations,
      actions: nextScenes.actions,
    });
  },
  selectEra: (era) => {
    const { gender } = get().worldSettings;
    const worldType = WORLDS[gender][era][0];
    const nextScenes = buildScenes(worldType, 0);

    set({
      worldSettings: { gender, era, worldType },
      gameName: GAME_NAMES[worldType] ?? "",
      mechTypes: defaultMechanics(worldType),
      mainPlot: buildMainPlot(worldType, 0),
      characterLines: buildCharacterLines(gender, 0),
      locations: nextScenes.locations,
      actions: nextScenes.actions,
    });
  },
  selectWorldType: (worldType) =>
    set((state) => {
      const nextScenes = buildScenes(worldType, state.worldOutlineSeed);
      return {
        worldSettings: { ...state.worldSettings, worldType },
        gameName: GAME_NAMES[worldType] ?? state.gameName,
        mechTypes: defaultMechanics(worldType),
        mainPlot: buildMainPlot(worldType, state.worldOutlineSeed),
        characterLines: buildCharacterLines(state.worldSettings.gender, state.worldOutlineSeed),
        locations: nextScenes.locations,
        actions: nextScenes.actions,
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
}));
