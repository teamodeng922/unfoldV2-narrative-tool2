import type { Outline, OutlineMap } from "@/src/types";
import { WORLD_DEFAULT_OUTLINES } from "@/src/data/world-defaults";

export const OUTLINES_MAP: OutlineMap = {
  宫廷后宫: [
    {
      id: 1,
      title: "低位逆袭",
      desc: "出身卑微的宫女，从最底层一步步攀升，在后宫倾轧中活到最后成为皇后",
      crisis: "皇帝病重，太子之位悬空，三方势力蠢蠢欲动",
      factions: "太后一党 vs 丞相一派 vs 边疆军阀，三足鼎立",
      mystery: "先帝遗诏的真实内容，到底谁才是真正的继承人？",
    },
    {
      id: 2,
      title: "替身入宫",
      desc: "顶替他人身份入宫，必须维持伪装，一旦暴露就是死罪，却与皇帝产生了真感情",
      crisis: "真正的皇后已死，你顶替她的身份入宫，而知情者正在一个个消失",
      factions: "皇帝亲信 vs 皇后母族 vs 暗中调查真相的御史",
      mystery: "皇后到底是怎么死的？她的死和皇帝有没有关系？",
    },
    {
      id: 3,
      title: "亡国复仇",
      desc: "亡国公主被迫入宫为妃，表面温顺实则暗中复国，在仇恨与爱情之间反复撕裂",
      crisis: "故国余党蠢蠢欲动，而你是他们唯一的旗帜",
      factions: "新朝皇室 vs 故国余党 vs 中立世家",
      mystery: "灭国之战当夜到底发生了什么？父皇真的是战死的吗？",
    },
  ],
  帝王争霸: [
    {
      id: 1,
      title: "夺嫡之路",
      desc: "不受宠的皇子从零开始拉拢势力，在兄弟残杀中步步为营，最终登上皇位",
      crisis: "皇帝老迈，五位皇子各怀鬼胎，夺嫡之争一触即发",
      factions: "太子党 vs 三皇子军功派 vs 你（废墟中崛起的边缘皇子）",
      mystery: "母妃当年被打入冷宫的真正原因，牵涉皇室最大的秘密",
    },
    {
      id: 2,
      title: "乱世开国",
      desc: "天下大乱民不聊生，平民出身的男主从一支残兵起家，南征北战建立新朝",
      crisis: "前朝崩塌，群雄割据，百姓流离失所",
      factions: "北方军阀 vs 南方世族联盟 vs 你（从底层崛起的新势力）",
      mystery: "前朝末帝留下的传国玉玺到底在谁手中？",
    },
    {
      id: 3,
      title: "傀儡翻盘",
      desc: "被权臣扶上龙椅的少年天子，表面任人摆布，暗中布局十年，一朝清洗夺回实权",
      crisis: "你是权臣手中的傀儡，朝堂上没有一个人真正效忠于你",
      factions: "权臣一族 vs 暗中忠于皇室的老臣 vs 外敌虎视眈眈",
      mystery: "先帝驾崩的真相，是病逝还是被毒杀？",
    },
  ],
  ...WORLD_DEFAULT_OUTLINES,
};

export const DEFAULT_OUTLINES: Outline[] = [
  {
    id: 1,
    title: "主线方向一",
    desc: "AI将根据你选择的世界类型自动生成第一条主线方向",
    crisis: "核心危机将根据世界类型生成",
    factions: "阵营格局将根据世界类型生成",
    mystery: "核心悬念将根据世界类型生成",
  },
  {
    id: 2,
    title: "主线方向二",
    desc: "AI将根据你选择的世界类型自动生成第二条主线方向",
    crisis: "—",
    factions: "—",
    mystery: "—",
  },
  {
    id: 3,
    title: "主线方向三",
    desc: "AI将根据你选择的世界类型自动生成第三条主线方向",
    crisis: "—",
    factions: "—",
    mystery: "—",
  },
];
