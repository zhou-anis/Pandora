export interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  flightNo: string;
  departCity: string;
  departCode: string;
  arriveCity: string;
  arriveCode: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  durationMin: number;
  stops: number;
  stopCity?: string;
  price: number;
  originalPrice?: number;
  aircraft: string;
  tags: string[];
  /** 价格脉动: "deal" | "normal" | "high" */
  priceLevel: "deal" | "normal" | "high";
}

/** 城市&机场代码 */
export const cityAirports: Record<string, { code: string; name: string }> = {
  "北京": { code: "PKX", name: "北京大兴" },
  "上海": { code: "PVG", name: "上海浦东" },
  "广州": { code: "CAN", name: "广州白云" },
  "深圳": { code: "SZX", name: "深圳宝安" },
  "成都": { code: "CTU", name: "成都天府" },
  "杭州": { code: "HGH", name: "杭州萧山" },
  "东京": { code: "NRT", name: "东京成田" },
  "大阪": { code: "KIX", name: "大阪关西" },
  "首尔": { code: "ICN", name: "首尔仁川" },
  "曼谷": { code: "BKK", name: "曼谷素万那普" },
  "新加坡": { code: "SIN", name: "新加坡樟宜" },
  "巴黎": { code: "CDG", name: "巴黎戴高乐" },
  "伦敦": { code: "LHR", name: "伦敦希思罗" },
  "纽约": { code: "JFK", name: "纽约肯尼迪" },
  "悉尼": { code: "SYD", name: "悉尼金斯福德" },
};

/** 航空公司 */
export const airlines: Record<string, { name: string; code: string }> = {
  "CA": { name: "中国国航", code: "CA" },
  "MU": { name: "东方航空", code: "MU" },
  "CZ": { name: "南方航空", code: "CZ" },
  "HU": { name: "海南航空", code: "HU" },
  "3U": { name: "四川航空", code: "3U" },
  "NH": { name: "全日空", code: "NH" },
  "JL": { name: "日本航空", code: "JL" },
  "KE": { name: "大韩航空", code: "KE" },
  "TG": { name: "泰国航空", code: "TG" },
  "SQ": { name: "新加坡航空", code: "SQ" },
  "AF": { name: "法国航空", code: "AF" },
  "UA": { name: "美联航", code: "UA" },
};

export const mockFlights: Flight[] = [
  // ===== 北京 → 东京 =====
  { id: 1, airline: "中国国航", airlineCode: "CA", flightNo: "CA925", departCity: "北京", departCode: "PKX", arriveCity: "东京", arriveCode: "NRT", departTime: "07:30", arriveTime: "11:40", duration: "3h10m", durationMin: 190, stops: 0, price: 1880, originalPrice: 2400, aircraft: "Boeing 787-9", tags: ["直飞", "含餐"], priceLevel: "deal" },
  { id: 2, airline: "全日空", airlineCode: "NH", flightNo: "NH964", departCity: "北京", departCode: "PKX", arriveCity: "东京", arriveCode: "NRT", departTime: "08:45", arriveTime: "13:00", duration: "3h15m", durationMin: 195, stops: 0, price: 2280, aircraft: "Boeing 787-10", tags: ["直飞", "含餐", "好评"], priceLevel: "normal" },
  { id: 3, airline: "日本航空", airlineCode: "JL", flightNo: "JL022", departCity: "北京", departCode: "PKX", arriveCity: "东京", arriveCode: "NRT", departTime: "10:20", arriveTime: "14:35", duration: "3h15m", durationMin: 195, stops: 0, price: 2560, aircraft: "Airbus A350", tags: ["直飞"], priceLevel: "normal" },
  { id: 4, airline: "大韩航空", airlineCode: "KE", flightNo: "KE856", departCity: "北京", departCode: "PKX", arriveCity: "东京", arriveCode: "NRT", departTime: "09:00", arriveTime: "15:30", duration: "5h30m", durationMin: 330, stops: 1, stopCity: "首尔", price: 1350, originalPrice: 1800, aircraft: "Airbus A330", tags: ["低价", "1停"], priceLevel: "deal" },
  { id: 5, airline: "东方航空", airlineCode: "MU", flightNo: "MU523", departCity: "北京", departCode: "PKX", arriveCity: "东京", arriveCode: "NRT", departTime: "14:00", arriveTime: "20:30", duration: "5h30m", durationMin: 330, stops: 1, stopCity: "上海", price: 1580, aircraft: "Airbus A320", tags: ["中转"], priceLevel: "normal" },

  // ===== 上海 → 曼谷 =====
  { id: 6, airline: "泰国航空", airlineCode: "TG", flightNo: "TG665", departCity: "上海", departCode: "PVG", arriveCity: "曼谷", arriveCode: "BKK", departTime: "17:25", arriveTime: "21:00", duration: "4h35m", durationMin: 275, stops: 0, price: 1680, aircraft: "Boeing 777-300ER", tags: ["直飞", "含餐"], priceLevel: "deal" },
  { id: 7, airline: "东方航空", airlineCode: "MU", flightNo: "MU547", departCity: "上海", departCode: "PVG", arriveCity: "曼谷", arriveCode: "BKK", departTime: "22:50", arriveTime: "02:20", duration: "4h30m", durationMin: 270, stops: 0, price: 1980, aircraft: "Airbus A330", tags: ["直飞", "红眼航班"], priceLevel: "normal" },
  { id: 8, airline: "南方航空", airlineCode: "CZ", flightNo: "CZ357", departCity: "上海", departCode: "PVG", arriveCity: "曼谷", arriveCode: "BKK", departTime: "12:00", arriveTime: "18:30", duration: "5h30m", durationMin: 330, stops: 1, stopCity: "广州", price: 950, originalPrice: 1400, aircraft: "Boeing 737-800", tags: ["低价", "1停"], priceLevel: "deal" },

  // ===== 上海 → 巴黎 =====
  { id: 9, airline: "法国航空", airlineCode: "AF", flightNo: "AF111", departCity: "上海", departCode: "PVG", arriveCity: "巴黎", arriveCode: "CDG", departTime: "23:20", arriveTime: "05:50", duration: "12h30m", durationMin: 750, stops: 0, price: 4580, originalPrice: 5800, aircraft: "Boeing 777-300ER", tags: ["直飞", "含餐"], priceLevel: "deal" },
  { id: 10, airline: "东方航空", airlineCode: "MU", flightNo: "MU553", departCity: "上海", departCode: "PVG", arriveCity: "巴黎", arriveCode: "CDG", departTime: "00:10", arriveTime: "06:30", duration: "12h20m", durationMin: 740, stops: 0, price: 5200, aircraft: "Boeing 787-9", tags: ["直飞"], priceLevel: "normal" },
  { id: 11, airline: "中国国航", airlineCode: "CA", flightNo: "CA833", departCity: "上海", departCode: "PVG", arriveCity: "巴黎", arriveCode: "CDG", departTime: "13:30", arriveTime: "06:40", duration: "23h10m", durationMin: 1390, stops: 1, stopCity: "北京", price: 3800, aircraft: "Airbus A350", tags: ["低价", "中转"], priceLevel: "deal" },

  // ===== 广州 → 悉尼 =====
  { id: 12, airline: "南方航空", airlineCode: "CZ", flightNo: "CZ325", departCity: "广州", departCode: "CAN", arriveCity: "悉尼", arriveCode: "SYD", departTime: "21:05", arriveTime: "08:25", duration: "9h20m", durationMin: 560, stops: 0, price: 3980, originalPrice: 5200, aircraft: "Airbus A380", tags: ["直飞", "含餐", "大飞机"], priceLevel: "deal" },
  { id: 13, airline: "新加坡航空", airlineCode: "SQ", flightNo: "SQ851", departCity: "广州", departCode: "CAN", arriveCity: "悉尼", arriveCode: "SYD", departTime: "08:30", arriveTime: "22:40", duration: "12h10m", durationMin: 730, stops: 1, stopCity: "新加坡", price: 3200, aircraft: "Airbus A350", tags: ["低价", "1停", "好评"], priceLevel: "deal" },

  // ===== 北京 → 纽约 =====
  { id: 14, airline: "中国国航", airlineCode: "CA", flightNo: "CA981", departCity: "北京", departCode: "PKX", arriveCity: "纽约", arriveCode: "JFK", departTime: "13:00", arriveTime: "14:20", duration: "13h20m", durationMin: 800, stops: 0, price: 6280, aircraft: "Boeing 777-300ER", tags: ["直飞", "含餐"], priceLevel: "normal" },
  { id: 15, airline: "美联航", airlineCode: "UA", flightNo: "UA089", departCity: "北京", departCode: "PKX", arriveCity: "纽约", arriveCode: "JFK", departTime: "17:25", arriveTime: "18:50", duration: "13h25m", durationMin: 805, stops: 0, price: 7180, aircraft: "Boeing 787-9", tags: ["直飞"], priceLevel: "high" },
];

export const filterOptions = {
  stops: [
    { value: "all", label: "全部" },
    { value: "0", label: "直飞" },
    { value: "1", label: "1次经停" },
  ],
  departureTimes: [
    { value: "all", label: "全部" },
    { value: "morning", label: "清晨 00:00-08:00" },
    { value: "day", label: "白天 08:00-18:00" },
    { value: "night", label: "晚间 18:00-24:00" },
  ],
  sortOptions: [
    { value: "recommended", label: "推荐排序" },
    { value: "price-low", label: "价格从低到高" },
    { value: "price-high", label: "价格从高到低" },
    { value: "duration", label: "飞行时长最短" },
    { value: "depart-early", label: "出发最早" },
    { value: "depart-late", label: "出发最晚" },
  ],
};
