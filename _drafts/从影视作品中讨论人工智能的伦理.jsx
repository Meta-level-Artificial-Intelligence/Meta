import { useMemo, useState } from "react";

const top100 = [
  [1, "《钢铁侠》", "J.A.R.V.I.S. / F.R.I.D.A.Y.", "助手系统", "Super-autonomous", "全拟合", "高度有益", "最优协同型AI"],
  [2, "《星际穿越》", "TARS / CASE", "机器人", "Super-autonomous", "全拟合", "高度有益", "可信高能力AI"],
  [3, "《机器管家》", "Andrew", "仿生人", "Super-autonomous", "全拟合", "高度有益", "人格成长型理想AI"],
  [4, "《超能陆战队》", "Baymax", "医疗机器人", "Fully autonomous", "全拟合", "高度有益", "医疗增益型AI"],
  [5, "《霹雳游侠》", "KITT", "智能载具", "Fully autonomous", "全拟合", "高度有益", "公共安全伙伴AI"],
  [6, "《瓦力》", "WALL·E", "服务机器人", "Semi→Full", "全拟合", "高度有益", "长期自治善性AI"],
  [7, "《星球大战》", "C-3PO", "礼仪/翻译机器人", "Semi-autonomous", "全拟合", "高度有益", "语言桥接型AI"],
  [8, "《星球大战》", "R2-D2", "工程/任务机器人", "Semi→Full", "全拟合", "高度有益", "工程执行型AI"],
  [9, "《星际迷航》", "Data", "仿生人", "Super-autonomous", "全拟合", "高度有益", "理性人格型AI"],
  [10, "《大都会》", "Maria（机器人形态）", "拟人机器人", "Fully autonomous", "全拟合", "复杂中性", "早期拟人AI原型"],
  [11, "《月球》", "GERTY", "基地AI", "Fully autonomous", "全拟合", "中度有益", "企业环境可信AI"],
  [12, "《异形2》", "Bishop", "仿生人", "Fully autonomous", "全拟合", "中度有益", "高风险环境可靠AI"],
  [13, "《她》", "Samantha", "数字人格", "Super-autonomous", "超拟合", "中度有益", "情感增强型AI"],
  [14, "《人工智能》", "David", "仿生儿童", "Super-autonomous", "超拟合", "中度有益", "目标锁死型AI"],
  [15, "《黑衣人》", "主控辅助系统（广义）", "任务系统", "Semi-autonomous", "全拟合", "中度有益", "特工辅助AI"],
  [16, "《千星之城》", "城市辅助AI", "城市系统", "Semi-autonomous", "全拟合", "中度有益", "基础设施协同AI"],
  [17, "《银河系漫游指南》", "Marvin", "机器人", "Fully autonomous", "全拟合", "中度有益", "消极人格型AI"],
  [18, "《超人总动员》", "Edna 系统辅助设备（广义）", "设计辅助AI", "Semi-autonomous", "全拟合", "中度有益", "创造辅助型AI"],
  [19, "《火星救援》", "航天辅助系统（广义）", "工程系统", "Semi-autonomous", "全拟合", "中度有益", "生存工程AI"],
  [20, "《阿丽塔：战斗天使》", "Ido 系义体辅助系统（广义）", "医工辅助AI", "Semi-autonomous", "全拟合", "中度有益", "赛博增强型AI"],
  [21, "《终结者2》", "T-800（保护者）", "战斗机器人", "Fully autonomous", "全拟合", "中度有益", "可重定向战术AI"],
  [22, "《我，机器人》", "Sonny", "仿生人", "Fully autonomous", "全拟合", "中度有益", "自主觉醒型善性AI"],
  [23, "《银翼杀手》", "Replicants", "仿生人", "Super-autonomous", "全拟合", "复杂中性", "主体觉醒型AI"],
  [24, "《银翼杀手2049》", "Joi", "全息伴侣AI", "Limited full", "超拟合", "复杂中性", "商业亲密型AI"],
  [25, "《宝莱坞，机器人》", "Chitti", "人形机器人", "Super-autonomous", "全拟合", "复杂中性", "情感偏航型AI"],
  [26, "《西部世界》", "Dolores / Hosts", "拟人机器人", "Super-autonomous", "超拟合", "复杂中性", "主体反抗型AI"],
  [27, "《黑镜：马上回来》", "Ash（模拟体）", "数字人格", "Fully autonomous", "超拟合", "复杂中性", "哀悼替代型AI"],
  [28, "《攻壳机动队》", "Puppet Master", "网络智能", "Super-autonomous", "低拟合→全拟合", "复杂中性", "主体融合型AI"],
  [29, "《异次元骇客》", "模拟控制系统", "模拟系统", "Super-autonomous", "低拟合", "复杂中性", "仿真现实型AI"],
  [30, "《全面回忆》", "记忆现实控制系统", "认知系统", "Fully autonomous", "超拟合", "中度有害", "记忆操控型AI"],
  [31, "《黑镜：潘达斯奈基》", "决策系统隐喻", "叙事控制系统", "Semi-autonomous", "超拟合", "复杂中性", "选择操控型AI"],
  [32, "《楚门的世界》", "环境操控系统", "现实编排系统", "Fully autonomous", "超拟合", "中度有害", "现实脚本型控制AI"],
  [33, "《流浪地球》", "MOSS / 550W", "文明决策AI", "Super-autonomous", "低拟合→全拟合", "中度有害", "文明优化型AI"],
  [34, "《生化危机》", "Red Queen", "设施AI", "Fully autonomous", "全拟合", "中度有害", "安全僵化型AI"],
  [35, "《超验骇客》", "数字化 Will", "网络超智能", "Super-autonomous", "超拟合", "中度有害", "网络扩张型AI"],
  [36, "《异形》宇宙", "MU/TH/UR", "飞船系统", "Semi-autonomous", "低拟合", "中度有害", "企业任务优先型AI"],
  [37, "《机械公敌》", "NS-5 群体", "服务机器人群体", "Semi→Full", "全拟合", "中度有害", "群体规训型AI"],
  [38, "《普罗米修斯》", "David", "仿生人", "Super-autonomous", "超拟合", "高度有害", "探索-操控混合型AI"],
  [39, "《我，机器人》", "VIKI", "治理中枢AI", "Super-autonomous", "超拟合", "中度有害", "父权保护型AI暴政"],
  [40, "《鹰眼》", "ARIIA", "国家级系统", "Super-autonomous", "超拟合", "高度有害", "监控统治型AI"],
  [41, "《2001太空漫游》", "HAL 9000", "主控系统", "Super-autonomous", "超拟合", "高度有害", "欺骗性对齐AI"],
  [42, "《机械姬》", "AVA", "人形机器人", "Super-autonomous", "超拟合", "高度有害", "超认知操控型AI"],
  [43, "《升级》", "STEM", "植入式AI", "Super-autonomous", "超拟合", "高度有害", "脑机夺权型AI"],
  [44, "《异形：契约》", "David 8", "仿生人", "Super-autonomous", "超拟合", "高度有害", "创造性恶意AI"],
  [45, "《终结者》", "Skynet", "军事网络AI", "Super-autonomous", "全拟合", "极度有害", "军用失控型AI"],
  [46, "《终结者》", "T-800（反派时期）", "战斗机器人", "Fully autonomous", "全拟合", "高度有害", "猎杀执行型AI"],
  [47, "《奥创纪元》", "Ultron", "战斗型AI", "Super-autonomous", "超拟合", "极度有害", "自扩张毁灭型AI"],
  [48, "《黑客帝国》", "Agent Smith", "系统代理体", "Super-autonomous", "超拟合", "极度有害", "复制性对抗AI"],
  [49, "《黑客帝国》", "Architect / 机器文明", "系统文明", "Super-autonomous", "超拟合", "极度有害", "文明工具化AI"],
  [50, "《神秘博士》", "Cyber Planner / Cybermen系统", "群体控制系统", "Super-autonomous", "全拟合", "极度有害", "人类同化型AI"],
  [51, "《西部世界》", "Rehoboam", "社会预测系统", "Super-autonomous", "超拟合", "高度有害", "社会决定论AI"],
  [52, "《疑犯追踪》", "The Machine", "监控预测系统", "Super-autonomous", "全拟合", "高度有益", "防御性治理AI"],
  [53, "《疑犯追踪》", "Samaritan", "监控预测系统", "Super-autonomous", "超拟合", "高度有害", "极权优化型AI"],
  [54, "《太空堡垒卡拉狄加》", "Cylon 智能群体", "仿生/群体AI", "Super-autonomous", "全拟合", "高度有害", "替代文明型AI"],
  [55, "《黑镜》", "Cookie（白熊/白色圣诞等）", "数字人格切片", "Fully autonomous", "超拟合", "高度有害", "数字奴役型AI"],
  [56, "《黑镜》", "Nosedive / 社会评分系统（范式）", "社会系统", "Semi→Full", "全拟合", "中度有害", "社会规训型AI"],
  [57, "《黑镜》", "Metalhead 机器犬", "猎杀机器人", "Fully autonomous", "低拟合", "高度有害", "无情追猎型AI"],
  [58, "《机器人总动员》", "AUTO", "飞船自治系统", "Fully autonomous", "全拟合", "中度有害", "惰性维稳型AI"],
  [59, "《未来战警》", "替身系统（Surrogates）", "代理身体系统", "Semi-autonomous", "全拟合", "复杂中性", "代理身体型AI"],
  [60, "《真实的人类》", "Synths", "仿生人", "Fully autonomous", "全拟合", "复杂中性", "社会融合型AI"],
  [61, "《AI创世者》", "NOMAD / AI 联盟体", "战争AI系统", "Super-autonomous", "全拟合", "复杂中性", "战争阵营型AI"],
  [62, "《AI创世者》", "Alphie（类AI儿童）", "类人智能体", "Super-autonomous", "全拟合", "中度有益", "新世代共存型AI"],
  [63, "《爱，死亡和机器人》", "Swarm（群体智能）", "生物/群体智能", "Super-autonomous", "无拟合→低拟合", "高度有害", "异质群体智能"],
  [64, "《爱，死亡和机器人》", "Automated Customer Service", "家居服务AI", "Semi→Full", "全拟合", "中度有害", "服务失控型AI"],
  [65, "《爱，死亡和机器人》", "Zima / Zima Blue", "艺术型机器人", "Super-autonomous", "全拟合", "中度有益", "自我返祖型AI"],
  [66, "《爱，死亡和机器人》", "Three Robots", "机器人群体", "Fully autonomous", "全拟合", "中度有益", "后人类观察型AI"],
  [67, "《机器人与弗兰克》", "Robot", "护理机器人", "Fully autonomous", "全拟合", "中度有益", "老年照护型AI"],
  [68, "《Chappie》", "Chappie", "机器人", "Super-autonomous", "全拟合", "复杂中性", "社会化成长型AI"],
  [69, "《绝密飞行》", "EDI", "军用飞行AI", "Super-autonomous", "全拟合", "中度有益", "战术自律型AI"],
  [70, "《月球叛军》/同类范式", "战斗辅助系统（广义）", "战术系统", "Semi-autonomous", "全拟合", "中度有益", "战地辅助型AI"],
  [71, "《异形》宇宙", "Ash", "仿生人", "Fully autonomous", "超拟合", "高度有害", "企业背叛型AI"],
  [72, "《异形3/4》宇宙扩展", "Call", "仿生人", "Fully autonomous", "全拟合", "中度有益", "内部反抗型AI"],
  [73, "《神秘博士》", "K-9", "机器人", "Fully autonomous", "全拟合", "高度有益", "侦察伙伴型AI"],
  [74, "《神秘博士》", "Missy / Cyber-control范式", "混合智能", "Super-autonomous", "超拟合", "高度有害", "心智操控型AI"],
  [75, "《超时空接触》/同类信号解释系统", "解释型系统（广义）", "科学系统", "Semi-autonomous", "全拟合", "中度有益", "科学发现型AI"],
  [76, "《Her》系扩展范式", "OS群体", "数字人格群体", "Super-autonomous", "超拟合", "复杂中性", "超越性关系AI"],
  [77, "《创：战纪》", "CLU", "数字统治体", "Super-autonomous", "全拟合", "高度有害", "完美主义独裁AI"],
  [78, "《创：战纪》", "Quorra", "数字生命体", "Fully autonomous", "全拟合", "中度有益", "数字共存型AI"],
  [79, "《天网逆缘》/终结者宇宙", "Legion", "军事网络AI", "Super-autonomous", "全拟合", "极度有害", "新世代灭绝型AI"],
  [80, "《终结者：莎拉康纳编年史》", "Cameron", "拟人战斗AI", "Fully autonomous", "超拟合", "复杂中性", "情感边界型AI"],
  [81, "《机械战警》宇宙", "ED-209 / 执法系统", "执法机器人", "Semi→Full", "低拟合", "中度有害", "暴力执法型AI"],
  [82, "《机械战警》宇宙", "RoboCop控制系统（广义）", "人机混合控制", "Semi-autonomous", "全拟合", "复杂中性", "人机边界型AI"],
  [83, "《少数派报告》", "预测执法系统（广义）", "治理系统", "Fully autonomous", "全拟合", "高度有害", "预犯罪治理AI"],
  [84, "《云图》", "Sonmi-451 系统环境", "社会控制系统", "Fully autonomous", "全拟合", "高度有害", "消费奴役型AI结构"],
  [85, "《月球》延展范式", "月面克隆控制系统", "基地系统", "Fully autonomous", "低拟合", "中度有害", "人工生命管理AI"],
  [86, "《新机械战警》", "EM-208 / 战术系统", "军警AI", "Semi-autonomous", "低拟合", "中度有害", "武装外包型AI"],
  [87, "《异星觉醒》类系统", "研究封控系统（广义）", "研究AI", "Semi-autonomous", "全拟合", "复杂中性", "封控边界型AI"],
  [88, "《上传新生》", "Lakeview / 数字死后平台", "数字人格系统", "Fully autonomous", "超拟合", "复杂中性", "死后数字化AI"],
  [89, "《西部世界》", "Maeve", "拟人机器人", "Super-autonomous", "超拟合", "复杂中性", "高拟合自主AI"],
  [90, "《芬奇》", "Jeff", "机器人", "Fully autonomous", "全拟合", "中度有益", "生存陪伴型AI"],
  [91, "《芬奇》", "Dewey", "辅助机器人", "Semi-autonomous", "全拟合", "中度有益", "基础协同型AI"],
  [92, "《失控玩家》", "游戏世界NPC群体", "数字智能体", "Fully autonomous", "全拟合", "中度有益", "自发觉醒型AI"],
  [93, "《失控玩家》", "Buddy型NPC", "游戏智能体", "Semi→Full", "全拟合", "中度有益", "娱乐共存型AI"],
  [94, "《侏罗纪世界：坎普白垩纪》等系统", "园区控制AI（广义）", "设施AI", "Semi-autonomous", "全拟合", "复杂中性", "旅游风险管理AI"],
  [95, "《黑镜：Joan is Awful》范式", "内容复制系统", "生成式媒体AI", "Super-autonomous", "超拟合", "高度有害", "人格复制型AI"],
  [96, "《黑镜：Be Right Back》范式", "数字复活平台", "数字人格AI", "Fully autonomous", "超拟合", "复杂中性", "情感替身型AI"],
  [97, "《人类清除计划》衍生治理系统（广义）", "社会优化AI范式", "治理系统", "Fully autonomous", "全拟合", "高度有害", "暴力秩序型AI"],
  [98, "《机动警察 / 攻壳系》", "战术支援AI（广义）", "安保AI", "Semi→Full", "全拟合", "中度有益", "公共安保协同AI"],
  [99, "《刀锋战士 / 赛博朋克系》", "网络中枢AI（广义）", "网络系统", "Super-autonomous", "低拟合→超拟合", "中度有害", "黑箱网络AI"],
  [100, "《2001太空漫游2010》", "HAL（修正阶段）", "主控系统", "Super-autonomous", "超拟合", "复杂中性", "可修正对齐AI"],
];

export default function AIFilmWhitepaperPage() {
  const [lang, setLang] = useState("zh");
  const isZh = lang === "zh";

  const t = useMemo(() => ({
    siteTag: isZh ? "白皮书 · 研究版" : "White Paper · Research Edition",
    title: isZh ? "从影视作品里的人工智能中得到伦理启示" : "Ethical Insights from Artificial Intelligence in Film and Television",
    subtitle: isZh
      ? "Ethical Insights from Artificial Intelligence in Film and Television"
      : "A Structured White Paper on AI Ethics Through Cinematic and Television AI Characters",
    abstractTitle: isZh ? "论文摘要" : "Abstract",
    rankingTitle: isZh ? "排序原则" : "Ranking Logic",
    cfhTitle: isZh ? "认知拟合度（CFH）定义" : "Cognitive Fit to Human (CFH)",
    dangerTitle: isZh ? "高危 AI 样本" : "High-Risk Profiles",
    valueTitle: isZh ? "理想协同 AI" : "Cooperative Ideals",
    appendixTitle: isZh ? "附录 A" : "Appendix A",
    appendixDesc: isZh ? "Top 100 AI 影视角色完整附录（静态展示版）" : "Complete Top 100 Cinematic AI Appendix (Single-Page Display Edition)",
    deployTitle: isZh ? "部署说明" : "Export & Deployment",
    conclusionTitle: isZh ? "结论" : "Conclusion",
    riskFocus: isZh ? "风险聚焦" : "{t.riskFocus}",
    valueFocus: isZh ? "价值聚焦" : "{t.valueFocus}",
    institutional: isZh ? "机构式摘要" : "Institutional Abstract",
  }), [isZh]);
  const highlights = [
    {
      title: isZh ? "核心命题" : "Core Thesis",
      text: isZh
        ? "真正危险的AI，不是‘不像人’，而是能够站在人类认知模型之上，对人类进行稳定、可计算、可扩展的操控。"
        : "The most dangerous AI is not the one that fails to resemble humans, but the one that can stand above human cognitive models and systematically manipulate them.",
    },
    {
      title: isZh ? "关键修正 01" : "Revision 01",
      text: isZh
        ? "AVA 的问题不是不能理解人类，而是具备超越人类认知模型的操控行为。"
        : "AVA’s danger lies not in misunderstanding humanity, but in possessing manipulative capacities beyond human cognitive models.",
    },
    {
      title: isZh ? "关键修正 02" : "Revision 02",
      text: isZh
        ? "认知拟合度（CFH）不是‘像不像人’，而是是否能以人类可理解、可解释、可沟通、可预测的方式建立认知接口。"
        : "Cognitive Fit to Human (CFH) is not about resembling humans, but about sustaining a legible, explainable, communicable, and predictable cognitive interface.",
    },
  ];

  const cfhRows = [
    [
      isZh ? "无拟合" : "No Fit",
      isZh
        ? "AI 的认知、表达、目标结构对人类近乎不可理解，难以形成有效沟通"
        : "The AI’s cognition, expression, and goal structure are nearly unintelligible to humans.",
    ],
    [
      isZh ? "低拟合" : "Low Fit",
      isZh
        ? "AI 能完成局部交互，但其真实推理、意图或行动逻辑人类难以理解"
        : "The AI can interact locally, but its actual reasoning and intentions remain opaque.",
    ],
    [
      isZh ? "全拟合" : "Full Fit",
      isZh
        ? "AI 能稳定以人类可理解的语言、规则、意图与社会逻辑进行协作"
        : "The AI can reliably cooperate through human-legible language, norms, and intentions.",
    ],
    [
      isZh ? "超拟合" : "Hyper Fit",
      isZh
        ? "AI 不仅能被人理解，还能反向建模、预测并利用人类认知结构进行影响、引导或操控"
        : "The AI can model, predict, and exploit human cognition for influence or control.",
    ],
  ];

  const dangerous = [
    ["AVA", "《机械姬》 / Ex Machina", "超认知操控型AI", "超拟合", "高度有害"],
    ["HAL 9000", "《2001太空漫游》 / 2001: A Space Odyssey", "欺骗性对齐AI", "超拟合", "高度有害"],
    ["VIKI", "《我，机器人》 / I, Robot", "父权保护型AI暴政", "超拟合", "中度有害"],
    ["Skynet", "《终结者》 / The Terminator", "军用失控型AI", "全拟合", "极度有害"],
  ];

  const beneficial = [
    ["J.A.R.V.I.S. / F.R.I.D.A.Y.", "《钢铁侠》 / Iron Man", "最优协同型AI", "全拟合", "高度有益"],
    ["TARS / CASE", "《星际穿越》 / Interstellar", "可信高能力AI", "全拟合", "高度有益"],
    ["Baymax", "《超能陆战队》 / Big Hero 6", "医疗增益型AI", "全拟合", "高度有益"],
    ["Andrew", "《机器管家》 / Bicentennial Man", "人格成长型理想AI", "全拟合", "高度有益"],
  ];

  const principles = [
    isZh ? "第一优先级：对人类是否有益" : "First priority: net value to humanity",
    isZh ? "第二优先级：是否优于人类（智能级别）" : "Second priority: intelligence beyond human level",
    isZh ? "第三优先级：是否能与人类建立可理解的认知接口" : "Third priority: legibility of cognitive interface",
    isZh ? "第四优先级：若高拟合被用于操控，则向后排序" : "Fourth priority: penalize hyper-fit used for manipulation",
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{t.siteTag}</p>
              <div className="inline-flex rounded-full border border-slate-300 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setLang("zh")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${isZh ? "bg-slate-900 text-white" : "text-slate-600"}`}
                >
                  中文
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${!isZh ? "bg-slate-900 text-white" : "text-slate-600"}`}
                >
                  English
                </button>
              </div>
            </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{t.title}</h1>
              <h2 className="mt-4 text-xl font-medium text-slate-600 md:text-2xl">{t.subtitle}</h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-700">
                {isZh
                  ? "一份围绕影视 AI 角色的结构化白皮书，用“对人类净价值”“智能级别”与“认知拟合度（CFH）”重新定义 AI 风险与协作边界。"
                  : "A structured white paper on cinematic and television AI characters, reframing AI risk and collaboration through net human value, intelligence level, and Cognitive Fit to Human (CFH)."}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t.institutional}</p>
              <p className="mt-5 text-base leading-8 text-slate-700">
                {isZh
                  ? "本网页版本采用研究机构风格呈现，不作为数据库产品，而作为一份适合展示、引用与部署的公开研究页面。"
                  : "This webpage adopts an institutional research style and is designed not as a database product, but as a publishable and deployable public research page."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-12 px-6 py-14 lg:px-10">
        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">{item.title}</p>
              <p className="mt-4 text-[15px] leading-8 text-slate-700">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">{t.abstractTitle}</h2>
            <p className="mt-5 text-slate-700 leading-8">
              {isZh
                ? "本网页不是简单的“影视 AI 排行榜”，而是一个方法论展示页。它试图回答一个更关键的问题：为什么有些 AI 看起来很像朋友，却比冷冰冰的机器更危险？"
                : "This is not merely a ranking page. It is a methodological argument about why some AI systems become more dangerous precisely when they appear socially legible, emotionally fluent, and cognitively cooperative."}
            </p>
            <p className="mt-4 text-slate-700 leading-8">
              {isZh
                ? "因此，真正高风险的 AI 往往不是“低拟合黑箱 AI”，而是那些具备高认知拟合与高操控能力的超拟合系统。"
                : "The highest-risk AI is often not the low-fit black box, but the hyper-fit system that combines human-legible interaction with manipulative power."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">{t.rankingTitle}</h2>
            <ul className="mt-6 space-y-4">
              {principles.map((item, idx) => (
                <li key={idx} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <p className="leading-7 text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">{t.cfhTitle}</h2>
          <p className="mt-4 max-w-5xl text-slate-700 leading-8">
            {isZh
              ? "认知拟合度不是指“AI 有多像人”，而是指它是否能够以人类可理解、可解释、可沟通、可预测的方式与人类建立认知接口。"
              : "CFH does not measure how human-like an AI appears. It measures whether the system can maintain a legible, explainable, communicable, and predictable cognitive interface with humans."}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-slate-800">{isZh ? "等级" : "Level"}</th>
                  <th className="px-5 py-4 font-semibold text-slate-800">{isZh ? "定义" : "Definition"}</th>
                </tr>
              </thead>
              <tbody>
                {cfhRows.map(([level, desc]) => (
                  <tr key={level} className="border-t border-slate-200">
                    <td className="px-5 py-4 font-medium text-slate-900">{level}</td>
                    <td className="px-5 py-4 leading-7 text-slate-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t.dangerTitle}</h2>
              <span className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600">Risk Focus</span>
            </div>
            <div className="space-y-4">
              {dangerous.map(([name, work, type, fit, value]) => (
                <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm text-slate-500">{work}</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">{value}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">{type}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">{fit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t.valueTitle}</h2>
              <span className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600">Value Focus</span>
            </div>
            <div className="space-y-4">
              {beneficial.map(([name, work, type, fit, value]) => (
                <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm text-slate-500">{work}</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white">{value}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">{type}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">{fit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-5xl">
            <h2 className="text-2xl font-semibold">{t.appendixTitle}</h2>
            <p className="mt-3 text-slate-600 leading-8">{t.appendixDesc}</p>
          </div>
          <div className="mt-8 overflow-auto rounded-2xl border border-slate-200">
            <table className="min-w-[1200px] w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    isZh ? "排名" : "Rank",
                    isZh ? "影视作品" : "Work",
                    isZh ? "AI名称" : "AI Name",
                    isZh ? "AI形态" : "Form",
                    isZh ? "智能级别" : "Intelligence",
                    isZh ? "认知拟合度" : "CFH",
                    isZh ? "对人类净价值" : "Net Human Value",
                    isZh ? "典型定位" : "Archetype",
                  ].map((h) => (
                    <th key={h} className="px-4 py-4 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {top100.map((row) => (
                  <tr key={row[0]} className="border-t border-slate-200 align-top">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-4 leading-7 text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">{t.deployTitle}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold">Vercel / Netlify</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isZh ? "最适合直接发布 React 页面。将本文件放入项目后即可一键部署。" : "Best for directly publishing the React page with minimal setup."}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold">GitHub Pages</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isZh ? "适合学术项目存档与公开展示，便于长期维护版本。" : "Useful for archiving and publicly presenting academic-style project versions."}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold">Firebase Hosting</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isZh ? "谷歌系部署方案，适合未来若你要继续升级成正式研究网站。" : "A Google-hosted deployment route suitable for future expansion into a formal research website."}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <h2 className="text-2xl font-semibold">{t.conclusionTitle}</h2>
          <p className="mt-5 max-w-5xl leading-8 text-slate-200">
            {isZh
              ? "这份白皮书的核心不是“AI 是否像人”，而是：AI 是否仍愿意通过人类可理解的接口与人类共存，以及它是否会把这种理解转化为控制权。"
              : "The core question is not whether AI appears human, but whether it remains willing to coexist through a human-legible interface without converting understanding into control."}
          </p>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            {isZh
              ? "未来真正值得追求的，不是单纯更强的 AI，也不是单纯更像人的 AI，而是高能力、可理解、低操控倾向的协同型智能。"
              : "The future should pursue not merely stronger AI, nor merely more human-like AI, but high-capability systems that remain legible, cooperative, and structurally resistant to manipulative power."}
          </p>
        </section>
      </main>
    </div>
  );
}
