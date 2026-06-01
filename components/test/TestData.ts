export type PersonalityId =
  | "guoban-jelly"
  | "suizhijie-latiao"
  | "huatong-fire-noodle"
  | "langlangcui-puffed"
  | "hongtu-food";

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  emoji: string;
  text: string;
  personality: PersonalityId;
}

export interface PersonalityResult {
  id: PersonalityId;
  brand: string;
  title: string;
  subtitle: string;
  tags: string[];
  analysis: string;
  /** 社交雷达图 */
  radar: RadarChart;
  /** 合拍矩阵 */
  match: { soulmate: PersonalityId; nemesis: PersonalityId };
  /** 微信转化钩子 */
  hook: string;
  color: string;
}

export interface RadarChart {
  socialGlow: number;    // 社交高光度
  stressHardcore: number; // 抗压硬核度
  emotional: number;      // 情感细腻度
  optimism: number;       // 乐天开心值
  reliable: number;       // 靠谱陪伴感
}

/** ========== 5 道趣味测试题 ========== */
export const questions: Question[] = [
  {
    id: 1,
    title: "周末晚上朋友群突然炸了：「出来喝酒！有人请客！」",
    subtitle: "你的第一反应是……",
    options: [
      {
        emoji: "🔥",
        text: "「发定位！！」三秒换好衣服，杀过去之前还要在楼下便利店来份辣条开胃",
        personality: "suizhijie-latiao",
      },
      {
        emoji: "🤔",
        text: "「都有谁？」默默查完名单，确认今晚没有尴尬的人，才慢悠悠出门",
        personality: "hongtu-food",
      },
      {
        emoji: "😎",
        text: "「不去。」干脆利落。今晚的约会是Netflix+被子+空调，天王老子来了也不出门",
        personality: "huatong-fire-noodle",
      },
      {
        emoji: "😂",
        text: "「等下！我在看搞笑视频笑到肚子痛，让我缓一下……等等这集还有1分钟」",
        personality: "langlangcui-puffed",
      },
    ],
  },
  {
    id: 2,
    title: "老板在群里@你，说你负责的项目出了个不大不小的差错",
    subtitle: "你在群里怎么回应？",
    options: [
      {
        emoji: "🧊",
        text: "「收到，我来处理。」顺手甩出三条解决方案，冷静得让老板以为自己看错了人",
        personality: "huatong-fire-noodle",
      },
      {
        emoji: "😜",
        text: "先甩个「猫猫搓手.gif」缓和群气氛，然后私下开小群疯狂吐槽老板",
        personality: "suizhijie-latiao",
      },
      {
        emoji: "💎",
        text: "「我的锅，已经复盘好了，这是改进方案PDF。」表面波澜不惊，内心已经在盘算离职补偿金了",
        personality: "hongtu-food",
      },
      {
        emoji: "🧘",
        text: "「感谢提醒～已经跟相关同事同步过了，这是最新进度。」一句话安抚所有人，优雅得让人挑不出刺",
        personality: "guoban-jelly",
      },
    ],
  },
  {
    id: 3,
    title: "暧昧对象突然发来一句：「突然有点想你了」",
    subtitle: "你的心情和操作是……",
    options: [
      {
        emoji: "💅",
        text: "心跳加速但淡定回复「哦？展开说说」，内心已经开始规划婚礼菜单了",
        personality: "suizhijie-latiao",
      },
      {
        emoji: "🫧",
        text: "盯着屏幕看了十分钟，打了删、删了打，最后回了一个「🌙」然后盯着天花板傻笑",
        personality: "guoban-jelly",
      },
      {
        emoji: "🗿",
        text: "「知道了。」秒回，但其实已经截图发给所有闺蜜/兄弟群做深度人类学分析了",
        personality: "huatong-fire-noodle",
      },
      {
        emoji: "🤪",
        text: "秒回一个沙雕熊猫人表情包，用搞笑化解一切肉麻场面。浪漫过敏体质，没救的那种",
        personality: "langlangcui-puffed",
      },
    ],
  },
  {
    id: 4,
    title: "一个人去吃海底捞，服务员在你对面放了一只陪吃熊",
    subtitle: "你会……",
    options: [
      {
        emoji: "🐻",
        text: "认真和熊聊天，给它涮肉夹菜，路过的人问就说「这是我今天的饭搭子」",
        personality: "langlangcui-puffed",
      },
      {
        emoji: "📸",
        text: "拍张照发小红书「一个人也要好好吃饭✨」，配文精致得像美食博主，然后淡定涮肉",
        personality: "guoban-jelly",
      },
      {
        emoji: "🍖",
        text: "觉得挺有意思，拍个照发朋友圈说「我居然沦落到和熊吃饭了哈哈」，然后开开心心涮肉",
        personality: "suizhijie-latiao",
      },
      {
        emoji: "🧹",
        text: "把熊移到旁边，腾出空间专心吃饭，临走前还帮熊整理了一下领结。别人觉得离谱，你觉得这是基本礼仪",
        personality: "hongtu-food",
      },
    ],
  },
  {
    id: 5,
    title: "凌晨两点你还没睡着，最有可能的原因是……",
    subtitle: "诚实面对自己",
    options: [
      {
        emoji: "📊",
        text: "在复盘今天和老板的对话，在心里模拟了12种更好的回应方式。越想越清醒，甚至想爬起来加班",
        personality: "hongtu-food",
      },
      {
        emoji: "😭",
        text: "在看一部心里知道会哭成狗的电影/番，哭完感觉心里好干净，然后发条朋友圈「今晚情绪崩了」又秒删",
        personality: "guoban-jelly",
      },
      {
        emoji: "🤣",
        text: "在刷土味视频/沙雕段子，笑到床板颤抖，室友砸墙让你小点声才收敛",
        personality: "langlangcui-puffed",
      },
      {
        emoji: "⚔️",
        text: "白天被人说了一句「你不行」——现在满脑子都在复盘人生，越想越燃，决定明天要让他们全部闭嘴",
        personality: "huatong-fire-noodle",
      },
    ],
  },
];

/** ========== 5 种零食人格结果 ========== */
export const results: Record<PersonalityId, PersonalityResult> = {
  "guoban-jelly": {
    id: "guoban-jelly",
    brand: "忘不了果板果冻",
    title: "🍮 人间清醒 · 浪漫主义型",
    subtitle: "100%纯正的忘不了果板果冻人格",
    tags: ["通透清醒", "情绪细腻", "浪漫不死", "人间解语花"],
    analysis:
      "你就像一颗Q弹的果冻——外表软萌无害，内心却比谁都通透。你有超强的情感雷达，朋友还没开口你就知道他们今天心情不好。你对生活有自己独特的审美和坚持，心里始终保留着一块柔软的浪漫自留地。你相信世界上美好的事物值得被守护，所以身边的人总会在你的陪伴里找到一种「被看见」的情绪价值。别怀疑，你就是朋友圈里那个最好的聆听者和最温柔的治愈者。",
    radar: {
      socialGlow: 22,
      stressHardcore: 18,
      emotional: 48,
      optimism: 35,
      reliable: 30,
    },
    match: {
      soulmate: "hongtu-food",
      nemesis: "huatong-fire-noodle",
    },
    hook: "想要获取你的命格零食快来联系我们哦，凭借此截图还会有小福利赠送哦 ✨",
    color: "#87CEEB",
  },
  "suizhijie-latiao": {
    id: "suizhijie-latiao",
    brand: "穗之杰辣条",
    title: "🌶 重情重义 · 气氛担当型",
    subtitle: "100%纯正的穗之杰辣条人格",
    tags: ["直爽上头", "社交天花板", "嘴硬心软", "团队灵魂"],
    analysis:
      "你就是零食界的辣条——有你在的场子永远不会冷。你是朋友群里的「人形气氛组」，一张嘴就是段子，一出手就是团魂。你以为自己只是「爱热闹」，但你不知道的是，每一次朋友emo时刻，第一个到场陪他们喝酒的也是你。直来直去不藏着掖着，做事讲究的就是一个「爽」字，但了解你的人都知道：你嘴硬心软，嘴上说着「关我什么事」，背地里已经帮人把事办妥了。",
    radar: {
      socialGlow: 50,
      stressHardcore: 30,
      emotional: 20,
      optimism: 38,
      reliable: 15,
    },
    match: {
      soulmate: "langlangcui-puffed",
      nemesis: "huatong-fire-noodle",
    },
    hook: "想要获取你的命格零食快来联系我们哦，凭借此截图还会有小福利赠送哦 ✨",
    color: "#FF6B6B",
  },
  "huatong-fire-noodle": {
    id: "huatong-fire-noodle",
    brand: "华统火鸡面",
    title: "🔥 敢爱敢恨 · 独行冒险家型",
    subtitle: "100%纯正的华统火鸡面人格",
    tags: ["特立独行", "极强抗压", "活得真实", "硬核玩家"],
    analysis:
      "你身上有一种「别惹我，但我也不惹事」的强大气场。像一碗滚烫的火鸡面，第一口让人劝退，但懂你的人会上瘾。你享受独处、享受痛苦、享受把不可能变成可能的快感。别人觉得你「不合群」，你觉得——「合群」这个词太累了。你信奉实力说话，讨厌虚伪和客套，在社会这台大型剧本杀里，你是为数不多的真人玩家。你的人生信条是：活得真实，哪怕烫嘴。",
    radar: {
      socialGlow: 10,
      stressHardcore: 50,
      emotional: 12,
      optimism: 22,
      reliable: 25,
    },
    match: {
      soulmate: "suizhijie-latiao",
      nemesis: "guoban-jelly",
    },
    hook: "想要获取你的命格零食快来联系我们哦，凭借此截图还会有小福利赠送哦 ✨",
    color: "#FF4500",
  },
  "langlangcui-puffed": {
    id: "langlangcui-puffed",
    brand: "琅琅脆膨化",
    title: "✨ 乐天派 · 闪闪发光开心果型",
    subtitle: "100%纯正的琅琅脆膨化人格",
    tags: ["纯粹快乐", "脑回路清奇", "治愈系", "快乐传染源"],
    analysis:
      "你是人类世界的「快乐寄生虫」——不是说你依赖别人，而是你走到哪里就把快乐传播到哪里。你脑子里永远有奇怪的BGM在播放，看到路边的狗你都要跟它打招呼。你以为大家只是觉得你「很好笑」，但你不知道的是，很多人在他们最灰暗的日子里，是靠翻和你的聊天记录才走出来的。嘎嘣脆的外壳，内里却是最柔软的治愈内核。你闪闪发光的样子，是这个世界最珍贵的调味剂。",
    radar: {
      socialGlow: 35,
      stressHardcore: 10,
      emotional: 28,
      optimism: 50,
      reliable: 18,
    },
    match: {
      soulmate: "suizhijie-latiao",
      nemesis: "hongtu-food",
    },
    hook: "想要获取你的命格零食快来联系我们哦，凭借此截图还会有小福利赠送哦 ✨",
    color: "#FFD700",
  },
  "hongtu-food": {
    id: "hongtu-food",
    brand: "宏途食品",
    title: "🫖 内敛稳重 · 靠谱细节控型",
    subtitle: "100%纯正的宏途食品人格",
    tags: ["低调沉稳", "长效陪伴", "细节控", "踏实安全感"],
    analysis:
      "你不是那种第一眼会喧宾夺主的人，但你是所有人遇到困难第一个想到的名字。像一碗深夜的泡面，不华丽但永远在那里，温度刚好，味道刚好。你做事滴水不漏，对细节的执着有时候让身边的人觉得「不至于吧」，但每次关键时刻，你的预案就是全团队的救命稻草。你是那种不需要天天联系、但知道对方一直都在的朋友。靠谱，是你身上最温柔的超能力。",
    radar: {
      socialGlow: 15,
      stressHardcore: 35,
      emotional: 25,
      optimism: 20,
      reliable: 50,
    },
    match: {
      soulmate: "guoban-jelly",
      nemesis: "langlangcui-puffed",
    },
    hook: "想要获取你的命格零食快来联系我们哦，凭借此截图还会有小福利赠送哦 ✨",
    color: "#8B4513",
  },
};

/** 计算测试结果 */
export function computeResult(answers: PersonalityId[]): PersonalityResult {
  const tally: Record<string, number> = {};
  for (const a of answers) {
    tally[a] = (tally[a] || 0) + 1;
  }
  let max = 0;
  let winner: PersonalityId = "guoban-jelly";
  for (const [k, v] of Object.entries(tally)) {
    if (v > max) {
      max = v;
      winner = k as PersonalityId;
    }
  }
  // 平局时取第一个出现的
  if (max === 1 && Object.keys(tally).length > 2) {
    // 如果每人一票（5个人格各一票），取第一题的选择
    winner = answers[0];
  }
  return results[winner];
}
