export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface Comment {
  id: number;
  articleId: number;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
  replyTo?: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  author: Author;
  coverImage: string;
  category: string;
  tags: string[];
  summary: string;
  content: ArticleSection[];
  createdAt: string;
  readTime: number;
  likes: number;
  bookmarks: number;
  views: number;
  commentCount: number;
  featured: boolean;
}

interface ArticleSection {
  type: "paragraph" | "heading" | "image" | "tip" | "list";
  content?: string;
  src?: string;
  alt?: string;
  items?: string[];
}

export const categories = [
  { key: "all", label: "全部攻略", icon: "📚" },
  { key: "自驾", label: "自驾旅行", icon: "🚗" },
  { key: "美食", label: "美食探店", icon: "🍜" },
  { key: "徒步", label: "徒步户外", icon: "🥾" },
  { key: "海岛", label: "海岛度假", icon: "🏝️" },
  { key: "城市", label: "城市漫步", icon: "🏙️" },
  { key: "摄影", label: "摄影之旅", icon: "📷" },
];

export const sortOptions = [
  { value: "latest", label: "最新发布" },
  { value: "popular", label: "最受欢迎" },
  { value: "views", label: "最多阅读" },
];

/** 模拟 Markdown 风格的正文内容 */
function buildContent(sections: ArticleSection[]): ArticleSection[] {
  return sections;
}

export const mockArticles: Article[] = [
  // ===== 热门/精选 =====
  {
    id: 1,
    title: "318川藏线自驾全攻略：从成都到拉萨的15天",
    slug: "sichuan-tibet-highway-self-drive",
    author: {
      name: "爱旅行的妖精",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      bio: "十年自驾老司机，走过中国所有进藏路线，梦想是环游世界。",
    },
    coverImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80",
    category: "自驾",
    tags: ["川藏线", "自驾", "318国道", "西藏", "高原"],
    summary: "告别陪伴10年的小蓝，大黄蜂接棒！详细记录318川藏线的每一天：路线规划、住宿推荐、高原反应应对、最美拍摄点，一篇就够了。",
    content: buildContent([
      { type: "heading", content: "前言：为什么是318？" },
      { type: "paragraph", content: "国道318线，东起上海，西至西藏樟木，全长5476公里。其中成都至拉萨段约2140公里，被誉为'中国人的景观大道'。这条路上，有雪山、草原、峡谷、冰川、森林……几乎囊括了中国所有的地貌景观。今年秋天，我终于下定决心，告别陪伴了我十年的小蓝，开着新入手的大黄蜂，踏上了这条魂牵梦绕的路。" },
      { type: "image", src: "https://images.unsplash.com/photo-1559827291-baf8ef4d3285?w=800&q=80", alt: "318国道沿途风光" },
      { type: "heading", content: "行程总览（15天）" },
      { type: "list", items: ["Day 1-2: 成都 → 雅安 → 康定（330km）", "Day 3-4: 康定 → 新都桥 → 雅江（190km）", "Day 5-6: 雅江 → 理塘 → 稻城亚丁（360km）", "Day 7-8: 稻城 → 巴塘 → 芒康（420km）", "Day 9-10: 芒康 → 左贡 → 八宿（360km）", "Day 11-12: 八宿 → 波密 → 林芝（450km）", "Day 13-15: 林芝 → 拉萨（410km）"] },
      { type: "heading", content: "Day 1-2: 成都出发，初上高原" },
      { type: "paragraph", content: "从成都出发，第一站雅安。雅安有三雅：雅雨、雅鱼、雅女。可惜我们是路过，只在雅安吃了顿午饭——砂锅雅鱼，汤鲜肉嫩，推荐！下午翻越二郎山隧道，一出隧道口，高原风光扑面而来——天更蓝了，云更近了。晚上住在康定，海拔2560米，第一天不要剧烈运动，让身体慢慢适应。" },
      { type: "tip", content: "⚠️ 高原贴士：初上高原，睡前喝一杯葡萄糖水有助于缓解高反。红景天提前一周开始服用效果最佳。" },
      { type: "heading", content: "Day 3-4: 摄影天堂新都桥" },
      { type: "paragraph", content: "新都桥被称为'摄影家的天堂'不是没有道理的。秋季的新都桥，杨树金黄，藏寨炊烟袅袅，远处的贡嘎雪山在晨光中泛着金光。我们在新都桥待了两天，每天早起等日出，傍晚追光影——随便一拍都是大片。住宿推荐'等风来客栈'，老板是个退休摄影师，可以请他带路去找机位。" },
      { type: "image", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "新都桥秋色" },
      { type: "heading", content: "Day 5-8: 世界高城理塘 & 稻城亚丁" },
      { type: "paragraph", content: "理塘，海拔4014米，'世界高城'之名当之无愧。这里的天空蓝得不像话，云朵低得像伸手就能够到。去稻城亚丁的路上，经过兔儿山、海子山，全是4000+的海拔，但风景值得一切辛苦。稻城亚丁的牛奶海和五色海是必打卡点，徒步上去需要一定的体力，但看到那片蓝色的时候，一切都值了。" },
      { type: "heading", content: "Day 9-12: 穿越横断山脉" },
      { type: "paragraph", content: "从芒康进入西藏后，路况明显变差。怒江72拐是整段路最惊险的部分——连续72个回头弯，从海拔4658米的业拉山顶一路下到海拔3100米的怒江桥。过弯的时候手心全是汗，但回头看走过的路，弯弯绕绕像一条巨龙盘在山间，那种震撼无法用语言形容。" },
      { type: "tip", content: "🚗 驾驶提示：怒江72拐下坡路段，手动挡建议挂低挡利用发动机制动，避免长时间踩刹车导致刹车过热失灵。" },
      { type: "heading", content: "Day 13-15: 抵达拉萨" },
      { type: "paragraph", content: "当布达拉宫出现在视野里的那一刻，眼眶竟然有些湿润。15天，2140公里，穿过了无数隧道、翻过了无数山口、经历了高反和爆胎——但这一切在布达拉宫面前都不值一提。拉萨的阳光是真的不一样，照在身上暖洋洋的，照在布达拉宫的白墙上，整座宫殿都在发光。晚上去八廓街喝甜茶、吃藏面，再来一碗牦牛酸奶，完美收官。" },
      { type: "heading", content: "费用总结" },
      { type: "list", items: ["油费+过路费：约 ¥3,500", "住宿（14晚）：约 ¥4,200（平均 ¥300/晚）", "餐饮：约 ¥2,800", "门票（稻城亚丁+其他）：约 ¥800", "总计：约 ¥11,300（两人一车）"] },
      { type: "paragraph", content: "318川藏线，此生必驾，绝非虚言。如果你有了这个念头，不要犹豫——出发吧，路上见！🏔️" },
    ]),
    createdAt: "2025-11-15",
    readTime: 12,
    likes: 3241,
    bookmarks: 1856,
    views: 28650,
    commentCount: 4,
    featured: true,
  },
  {
    id: 2,
    title: "东京米其林扫街指南：三天吃了14家店",
    slug: "tokyo-michelin-street-food-guide",
    author: {
      name: "环球美食家CC",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      bio: "吃遍全球50国的职业美食博主，不是在吃，就是在去吃的路上。",
    },
    coverImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    category: "美食",
    tags: ["东京", "米其林", "美食", "日本料理", "探店"],
    summary: "从筑地市场的海鲜丼到银座的寿司之神，三天吃了14家店。整理了每家的排队时间、人均价格和必点菜品，去东京照着吃就对了！",
    content: buildContent([
      { type: "heading", content: "序：为什么是东京？" },
      { type: "paragraph", content: "东京是全世界米其林星星最多的城市——2025年共有200+家米其林餐厅。但东京的美食远不止米其林，从100日元一碗的立ち食いそば到人均3000+的怀石料理，这座城市能满足各种预算和口味。这次我专门空出了三天时间，只为一件事：吃。" },
      { type: "heading", content: "Day 1: 筑地 → 银座 → 新宿" },
      { type: "paragraph", content: "早上去筑地场外市场，虽然场内市场搬到了丰洲，但场外的热闹依旧。推荐'鮨国'的海鲜丼（¥2,200），海胆、金枪鱼、鲑鱼子堆得满满的，每一口都是大海的味道。中午在银座的'数寄屋桥次郎'（寿司之神的店）朝圣，需要提前一个月预约，30分钟吃完20贯寿司，¥40,000一位——贵，但值。" },
      { type: "image", src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", alt: "筑地市场海鲜丼" },
      { type: "tip", content: "🍣 预约技巧：数寄屋桥次郎每月1号开放下个月的预约，建议通过酒店礼宾部帮忙电话预约，成功率更高。" },
      { type: "heading", content: "Day 2: 浅草 → 上野 → 秋叶原" },
      { type: "paragraph", content: "浅草寺周边的小吃一条街不容错过——人形烧、团子、抹茶冰淇淋，边走边吃最惬意。上野的'一頭や'是烧肉专门店，山形牛的霜降纹理美得像艺术品，入口即化。秋叶原的'丸五'猪排饭，外酥里嫩，面包糠的脆度完美。" },
      { type: "heading", content: "Day 3: 涩谷 → 代官山 → 惠比寿" },
      { type: "paragraph", content: "涩谷的'UOBEI'是性价比最高的回转寿司，每盘¥110起，但品质远超价格。代官山的'IVY PLACE'适合悠闲的brunch，法式吐司外焦里嫩。惠比寿的'Joël Robuchon'是米其林三星的法餐，用日本食材演绎法式经典，是此行的最高潮。" },
      { type: "heading", content: "14家店完整清单（含排队时间和人均）" },
      { type: "list", items: ["1. 鮨国（筑地）— 海鲜丼 ¥2,200 / 排队30分钟", "2. 数寄屋桥次郎（银座）— 寿司 ¥40,000 / 需预约", "3. 一蘭（新宿）— 拉面 ¥980 / 排队45分钟", "4. 一頭や（上野）— 烧肉 ¥6,000 / 排队20分钟", "5. 丸五（秋叶原）— 猪排 ¥1,800 / 排队30分钟", "6. UOBEI（涩谷）— 回转寿司 ¥1,500 / 排队15分钟", "7. IVY PLACE（代官山）— brunch ¥2,500 / 无需排队", "8. Joël Robuchon（惠比寿）— 法餐 ¥35,000 / 需预约", "9-14. 更多详见正文…"] },
    ]),
    createdAt: "2025-12-02",
    readTime: 8,
    likes: 2890,
    bookmarks: 2103,
    views: 19870,
    commentCount: 3,
    featured: true,
  },
  {
    id: 3,
    title: "马尔代夫发呆日记：在印度洋中央的7天",
    slug: "maldives-7-days-diary",
    author: {
      name: "在路上の小林",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      bio: "海岛控，已打卡全球30+海岛目的地。相信'人生苦短，多去海边'。",
    },
    coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    category: "海岛",
    tags: ["马尔代夫", "海岛", "蜜月", "潜水", "水屋"],
    summary: "在印度洋中央的7天：每天的生活就是潜水、读书、看日落。强烈推荐芙花芬岛的水屋，海底餐厅的体验终生难忘。",
    content: buildContent([
      { type: "heading", content: "为什么选马尔代夫？" },
      { type: "paragraph", content: "马尔代夫由1192个珊瑚岛组成，其中200多个有人居住。一岛一酒店的模式让每个度假村都像一个独立的小世界。这次选的是芙花芬岛（Hurawalhi Island），2019年开业的五星级度假村，以海底餐厅和水屋闻名。" },
      { type: "image", src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80", alt: "马尔代夫水屋" },
      { type: "heading", content: "水屋生活" },
      { type: "paragraph", content: "水屋是马尔代夫的灵魂。房间地板有一块透明玻璃，躺着就能看鱼游来游去。从私人露台的楼梯可以直接下海浮潜——珊瑚礁就在脚下，小丑鱼、鹦鹉鱼、偶尔还能看到海龟。每天被海浪声叫醒的感觉，真的会上瘾。" },
      { type: "tip", content: "🏊 选岛建议：喜欢浮潜选珊瑚环礁好的岛（如Baa环礁）；想要拍照出片选潟湖大的岛；蜜月的话选成人专属岛会更安静。" },
      { type: "heading", content: "海底餐厅：5.8米深的美食" },
      { type: "paragraph", content: "芙花芬岛的5.8 Undersea Restaurant是世界上最大的全玻璃海底餐厅。坐在里面，四周是碧蓝的海水，魔鬼鱼和鲨鱼从头顶游过——在这种环境下用餐，吃什么已经不重要了。不过话说回来，七道式的海鲜套餐也相当出色。" },
    ]),
    createdAt: "2025-10-20",
    readTime: 7,
    likes: 2156,
    bookmarks: 1432,
    views: 15430,
    commentCount: 2,
    featured: true,
  },
  // ===== 普通文章 =====
  {
    id: 4,
    title: "雨崩徒步全攻略：从西当村到神瀑冰湖",
    slug: "yubeng-hiking-complete-guide",
    author: {
      name: "山野闲人老张",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      bio: "户外领队，每年在山上超过100天。走过EBC、ACT、TMB等世界级徒步路线。",
    },
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    category: "徒步",
    tags: ["雨崩", "徒步", "梅里雪山", "云南", "户外"],
    summary: "详细整理了雨崩徒步的装备清单、海拔变化、住宿推荐。神瀑-冰湖-神湖三条线各有特色，适合第一次去雨崩的朋友收藏！",
    content: buildContent([
      { type: "heading", content: "雨崩：最后的世外桃源" },
      { type: "paragraph", content: "雨崩村位于云南德钦县，梅里雪山脚下，分为上雨崩和下雨崩两个自然村。这里直到2012年才通公路（目前仅限越野车，且只能到西当温泉），被称为'云南最后的世外桃源'。对于徒步爱好者来说，这里是朝圣梅里的最佳方式。" },
    ]),
    createdAt: "2025-09-10",
    readTime: 10,
    likes: 1567,
    bookmarks: 834,
    views: 8750,
    commentCount: 1,
    featured: false,
  },
  {
    id: 5,
    title: "巴塞罗那72小时：高迪、足球与地中海的阳光",
    slug: "barcelona-72-hours",
    author: {
      name: "环球美食家CC",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      bio: "吃遍全球50国的职业美食博主，不是在吃，就是在去吃的路上。",
    },
    coverImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
    category: "城市",
    tags: ["巴塞罗那", "西班牙", "高迪", "建筑", "地中海"],
    summary: "三天时间，朝圣高迪的圣家堂和米拉之家，在诺坎普看一场巴萨的比赛，傍晚在巴塞罗内塔海滩看日落。",
    content: buildContent([
      { type: "paragraph", content: "巴塞罗那是一座让人一见钟情的城市。高迪的建筑像童话一样散落在城市各处，地中海的阳光慷慨地洒在每一个角落。72小时虽然紧凑，但足够感受这座城市的灵魂。" },
    ]),
    createdAt: "2025-11-05",
    readTime: 6,
    likes: 1234,
    bookmarks: 678,
    views: 6540,
    commentCount: 2,
    featured: false,
  },
  {
    id: 6,
    title: "北海道冬季摄影之旅：在零下15度的浪漫",
    slug: "hokkaido-winter-photography",
    author: {
      name: "追光者阿磊",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
      bio: "风光摄影师，佳能签约摄影师。追逐极光、星空和一切美好的光线。",
    },
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
    category: "摄影",
    tags: ["北海道", "摄影", "冬季", "日本", "雪景"],
    summary: "札幌、小樽、函馆——北海道的冬天是漫画里的样子。分享冬季拍摄技巧、机位推荐和相机防冻指南。",
    content: buildContent([
      { type: "heading", content: "北海道：摄影师的冬日童话" },
      { type: "paragraph", content: "北海道的冬天，气温可以低至零下15度，但每一帧画面都像从新海诚的动画里截出来的。这次我带着佳能R5和两支镜头在北海道待了10天，从札幌一路拍到函馆——以下是我的精选机位和拍摄心得。" },
      { type: "image", src: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&q=80", alt: "小樽运河冬景" },
      { type: "tip", content: "📷 防冻贴士：低温下电池耗电极快，建议带3-4块备用电池，放在贴身口袋保暖。从室外进入室内前，把相机放进密封袋防止冷凝。" },
    ]),
    createdAt: "2025-12-20",
    readTime: 9,
    likes: 2100,
    bookmarks: 1120,
    views: 11230,
    commentCount: 3,
    featured: false,
  },
  {
    id: 7,
    title: "清迈咖啡地图：古城里的10家必打卡咖啡馆",
    slug: "chiang-mai-coffee-map",
    author: {
      name: "咖啡旅人Mia",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      bio: "SCA认证咖啡师，环游世界只为一杯好咖啡。",
    },
    coverImage: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
    category: "美食",
    tags: ["清迈", "咖啡", "泰国", "探店", "慢生活"],
    summary: "清迈是咖啡爱好者的天堂。古城里藏着无数精品咖啡馆，从兰纳风的老屋咖啡到北欧极简的Ristr8to。10家店，带你喝遍清迈。",
    content: buildContent([
      { type: "paragraph", content: "清迈的咖啡文化相当成熟。作为泰国北部咖啡产区的中心，这里的咖啡豆品质上乘，加上低廉的物价和悠闲的氛围，让清迈成为了数字游民和咖啡爱好者的聚集地。" },
    ]),
    createdAt: "2025-08-25",
    readTime: 5,
    likes: 876,
    bookmarks: 567,
    views: 4320,
    commentCount: 1,
    featured: false,
  },
  {
    id: 8,
    title: "冰岛环岛自驾：10天绕行世界的边缘",
    slug: "iceland-ring-road-10-days",
    author: {
      name: "爱旅行的妖精",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      bio: "十年自驾老司机，走过中国所有进藏路线，梦想是环游世界。",
    },
    coverImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80",
    category: "自驾",
    tags: ["冰岛", "自驾", "极光", "环岛", "一号公路"],
    summary: "10天行驶2400公里，沿着一号公路绕冰岛一周。看过黑沙滩的日出、冰川湖的浮冰、漫天飞舞的极光——这里是地球的缩影。",
    content: buildContent([
      { type: "heading", content: "冰岛：不属于地球的风景" },
      { type: "paragraph", content: "冰岛的风景有一种'不在地球'的错觉——黑色的火山岩、绿色的苔原、白色的冰川、蓝色的冰洞……所有的颜色都浓烈到了极致。10天的时间刚好可以沿着1号环岛公路绕一圈，每天都是视觉盛宴。" },
    ]),
    createdAt: "2025-07-15",
    readTime: 11,
    likes: 1876,
    bookmarks: 998,
    views: 9870,
    commentCount: 2,
    featured: false,
  },
  {
    id: 50,
    title: "【北海道】完结篇 — 札幌 · 小樽的四日游",
    slug: "hokkaido-sapporo-otaru-4-days",
    author: {
      name: "追光者阿磊",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
      bio: "风光摄影师，佳能签约摄影师。追逐极光、星空和一切美好的光线。",
    },
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
    category: "摄影",
    tags: ["北海道", "札幌", "小樽", "冬季", "雪景"],
    summary: "雪中的北海道，是漫画里的冬天。四天走遍札幌和小樽：白色恋人公园、小樽运河的黄昏、天狗山的夜景、二条市场的海鲜丼。实用交通卡+住宿推荐，新手也能轻松玩转！",
    content: buildContent([
      { type: "heading", content: "Day 1: 札幌 — 初遇雪之城" },
      { type: "paragraph", content: "落地新千岁机场，第一感受是——空气好冷、好干净。坐上JR快速エアポート，约37分钟抵达札幌站。第一站直奔白色恋人公园，整个园区被厚厚的白雪覆盖，像走进了姜饼屋的童话世界。晚上去狸小路商店街觅食，推荐「すみれ」的味噌拉面，浓郁的汤底在寒冷的冬夜格外治愈。" },
      { type: "image", src: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=800&q=80", alt: "小樽运河冬景" },
      { type: "heading", content: "Day 2: 小樽 — 运河与硝子" },
      { type: "paragraph", content: "从札幌坐JR约40分钟到小樽。出站后沿着运河方向走，沿途全是精致的硝子（玻璃）馆和八音盒堂。小樽运河的最佳拍摄时间是傍晚蓝调时刻，雪灯点亮后，整个运河变成了一条光带——这一刻你会理解为什么这里是北海道最上镜的地方。" },
      { type: "heading", content: "Day 3: 天狗山 — 百万夜景" },
      { type: "paragraph", content: "坐缆车登上小樽天狗山，这里据说是《情书》的取景地之一。山顶俯瞰整个小樽港的夜景，被称为北海道三大夜景之一。雪地里踩出一串脚印，回头看小樽的万家灯火，浪漫至极。" },
      { type: "heading", content: "Day 4: 札幌 — 告别" },
      { type: "paragraph", content: "最后一天去了北海道神宫，在白雪覆盖的鸟居前许了个愿。中午回到二条市场，以一碗豪华海鲜丼为这次北海道之旅画上完美句号。雪中的北海道，是漫画里的冬天——这句话一点不假。❄️" },
    ]),
    createdAt: "2025-12-28",
    readTime: 8,
    likes: 2890,
    bookmarks: 1654,
    views: 21340,
    commentCount: 3,
    featured: true,
  },
];

/** 每日推荐文章 ID（供首页引用） */
export const DAILY_RECOMMENDATION_ID = 50;

/** 模拟评论数据 */
export const mockComments: Comment[] = [
  {
    id: 1,
    articleId: 1,
    author: { name: "越野e族老李", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=10", bio: "" },
    content: "太详细的攻略了！收藏了，明年秋天照着你这个路线走。问一下大黄蜂是哪款车？",
    createdAt: "2025-11-16",
    likes: 23,
  },
  {
    id: 2,
    articleId: 1,
    author: { name: "爱旅行的妖精", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1", bio: "" },
    content: "大黄蜂是坦克300！川藏线完全够用，动力超车也很轻松 👍",
    createdAt: "2025-11-16",
    likes: 15,
    replyTo: "越野e族老李",
  },
  {
    id: 3,
    articleId: 1,
    author: { name: "高原行者", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=11", bio: "" },
    content: "补充一点：理塘到巴塘那段路况比你说的要好一些，今年刚翻修过。不过72拐确实刺激，我第一次开手心全是汗 😂",
    createdAt: "2025-11-18",
    likes: 8,
  },
  {
    id: 4,
    articleId: 1,
    author: { name: "小白的旅行日记", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=12", bio: "" },
    content: "新手想问一下，没有越野经验可以走318吗？开的是城市SUV。",
    createdAt: "2025-11-20",
    likes: 5,
  },
  {
    id: 5,
    articleId: 1,
    author: { name: "爱旅行的妖精", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1", bio: "" },
    content: "完全可以！现在318全程基本都是柏油路了，城市SUV没问题。注意避开雨季（7-8月），选好季节出发就好。",
    createdAt: "2025-11-20",
    likes: 12,
    replyTo: "小白的旅行日记",
  },
  {
    id: 10,
    articleId: 2,
    author: { name: "日料控阿Ken", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=20", bio: "" },
    content: "补充一家：中目黑的「とんかつ かつ壱」炸猪排超好吃！老板每天只做60份，卖完就关门。",
    createdAt: "2025-12-03",
    likes: 18,
  },
  {
    id: 11,
    articleId: 2,
    author: { name: "环球美食家CC", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3", bio: "" },
    content: "感谢推荐！下次去东京一定去试试。中目黑那边还有好多隐藏好店 🍜",
    createdAt: "2025-12-03",
    likes: 7,
    replyTo: "日料控阿Ken",
  },
  {
    id: 12,
    articleId: 2,
    author: { name: "旅行预算管理大师", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=21", bio: "" },
    content: "想问一下三天总共花了多少钱在吃上面？想参考一下预算 😂",
    createdAt: "2025-12-04",
    likes: 3,
  },
  {
    id: 20,
    articleId: 3,
    author: { name: "蜜月规划师", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=30", bio: "" },
    content: "芙花芬岛和娇丽岛哪个更推荐？正在计划蜜月～",
    createdAt: "2025-10-22",
    likes: 6,
  },
  {
    id: 21,
    articleId: 3,
    author: { name: "在路上の小林", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2", bio: "" },
    content: "蜜月的话推荐芙花芬！海底餐厅太适合求婚/纪念日了。娇丽更适合亲子~",
    createdAt: "2025-10-22",
    likes: 11,
    replyTo: "蜜月规划师",
  },
  {
    id: 30,
    articleId: 6,
    author: { name: "尼康党小王", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=40", bio: "" },
    content: "拍得太好了！想问问小樽运河那个机位具体在哪里？",
    createdAt: "2025-12-21",
    likes: 4,
  },
  {
    id: 31,
    articleId: 6,
    author: { name: "追光者阿磊", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=5", bio: "" },
    content: "浅草桥上面，Google Maps搜「小樽運河 浅草橋」就能找到。日出前后半小时光线最好！",
    createdAt: "2025-12-21",
    likes: 9,
    replyTo: "尼康党小王",
  },
  {
    id: 32,
    articleId: 6,
    author: { name: "摄影新手", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=41", bio: "" },
    content: "请问手机能拍出你这种效果吗？还是必须用单反？",
    createdAt: "2025-12-22",
    likes: 2,
  },
];

/** 获取某篇文章的评论（含嵌套结构） */
export function getCommentsByArticle(articleId: number): Comment[] {
  const all = mockComments.filter((c) => c.articleId === articleId);
  const topLevel = all.filter((c) => !c.replyTo);
  return topLevel.map((c) => ({
    ...c,
    replies: all.filter((r) => r.replyTo === c.author.name),
  }));
}
