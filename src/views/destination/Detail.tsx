import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rate, Tag, Button, Divider, Empty, Breadcrumb, Image } from "antd";
import {
  EnvironmentOutlined, CalendarOutlined, StarFilled,
  FireOutlined, RightOutlined, ClockCircleOutlined,
  HomeOutlined, InfoCircleOutlined, EyeOutlined,
  ArrowLeftOutlined, ExpandOutlined, CompressOutlined,
} from "@ant-design/icons";
import DestinationCard from "./components/DestinationCard.tsx";
import MapViewer from "../../components/map/MapViewer.tsx";
import { mockDestinations, destinationExtras, destinationCoords } from "./data";

/** ---------- 模拟图集（每个目的地 4-6 张 Unsplash 图） ---------- */
const galleryImages: Record<number, string[]> = {
  1: [ // 东京
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80",
    "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&q=80",
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
  ],
  2: [ // 曼谷
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    "https://images.unsplash.com/photo-1518610502586-f1d6c9674b03?w=800&q=80",
    "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80",
  ],
  3: [ // 巴厘岛
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    "https://images.unsplash.com/photo-1537956965356-44a0cf25cbd7?w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  ],
  9: [ // 巴黎
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1565060169861-0b2c9e5e7b9d?w=800&q=80",
    "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=800&q=80",
    "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  ],
  16: [ // 纽约
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    "https://images.unsplash.com/photo-1534251369789-5067c8b8602a?w=800&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  ],
  25: [ // 北京
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80",
    "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
  ],
};

/** 时区映射 */
const timezoneMap: Record<string, string> = {
  "日本": "UTC+9", "泰国": "UTC+7", "印度尼西亚": "UTC+8",
  "法国": "UTC+1", "美国": "UTC-5", "中国": "UTC+8",
  "韩国": "UTC+9", "新加坡": "UTC+8", "阿联酋": "UTC+4",
  "英国": "UTC+0", "意大利": "UTC+1", "西班牙": "UTC+1",
  "希腊": "UTC+2", "捷克": "UTC+1", "荷兰": "UTC+1",
  "墨西哥": "UTC-6", "巴西": "UTC-3", "澳大利亚": "UTC+10",
  "新西兰": "UTC+12", "斐济": "UTC+12", "南非": "UTC+2", "摩洛哥": "UTC+1",
};

const themeLabels: Record<string, string> = {
  beach: "🏖️ 海滨度假", city: "🏙️ 城市探索", nature: "🏔️ 自然风光",
  culture: "🏛️ 文化古迹", food: "🍜 美食之旅", adventure: "🧗 户外冒险",
};

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destId = Number(id);
  const [descExpanded, setDescExpanded] = useState(false);

  const destination = useMemo(() => mockDestinations.find((d) => d.id === destId), [destId]);
  const extras = destination ? destinationExtras[destination.id] : undefined;
  const coords = destination ? destinationCoords[destination.id] : undefined;
  const gallery = destination ? (galleryImages[destination.id] || [destination.image]) : [];
  const timezone = destination ? (timezoneMap[destination.country] || "—") : "—";

  const related = useMemo(
    () => destination
      ? mockDestinations.filter((d) => d.region === destination.region && d.id !== destination.id).slice(0, 4)
      : [],
    [destination]
  );

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Empty description="目的地不存在">
          <Button type="primary" onClick={() => navigate("/destination")}>返回目的地列表</Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* ====== 1. 面包屑 ====== */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <Breadcrumb
          className="!text-xs"
          items={[
            { title: <><HomeOutlined className="mr-1" />首页</>, onClick: () => navigate("/") },
            { title: "目的地", onClick: () => navigate("/destination") },
            { title: destination.name },
          ]}
        />
      </div>

      {/* ====== 2. 图片画廊 ====== */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="relative rounded-2xl overflow-hidden bg-gray-200">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {gallery.map((img, idx) => (
              <div key={idx} className="snap-center flex-shrink-0 w-full md:w-3/5 lg:w-1/2 first:w-full">
                <Image
                  src={img}
                  alt={`${destination.name} photo ${idx + 1}`}
                  className="w-full h-[320px] md:h-[420px] object-cover"
                  preview={{ mask: <><EyeOutlined className="mr-1" />查看大图</> }}
                  fallback={destination.image}
                />
              </div>
            ))}
          </div>
          {/* 图片计数 */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            {gallery.length} 张照片
          </div>
        </div>
        {/* 缩略图指示器 */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {gallery.slice(0, 8).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 opacity-60 hover:opacity-100 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
            />
          ))}
        </div>
      </section>

      {/* ====== 3. 标题 & 评分行 ====== */}
      <section className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{destination.name}</h1>
              <p className="text-slate-500 text-sm flex items-center gap-1">
                <EnvironmentOutlined /> {destination.country}
                <span className="mx-2 text-slate-300">|</span>
                <ClockCircleOutlined className="mr-0.5" /> {timezone}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="flex items-center gap-1">
                  <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-md">{destination.rating}</span>
                  <Rate disabled defaultValue={destination.rating} allowHalf style={{ fontSize: 14, color: "#f59e0b" }} />
                </span>
                <span className="text-slate-500 text-sm">{destination.reviewCount.toLocaleString()} 条评价</span>
                {destination.featured && (
                  <Tag className="!rounded-full !text-xs !bg-amber-50 !text-amber-600 !border-amber-200"><FireOutlined /> 精选</Tag>
                )}
              </div>
            </div>
          </div>

          {/* 快速信息条 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
            {[
              { icon: <CalendarOutlined />, label: "最佳季节", value: destination.bestSeason },
              { icon: <StarFilled className="text-amber-400" />, label: "评分", value: `${destination.rating} / 5.0` },
              { icon: <ClockCircleOutlined />, label: "时区", value: timezone },
              { icon: <EnvironmentOutlined />, label: "区域", value: destination.domestic ? "国内" : "国外" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">{item.icon}</span>
                <div>
                  <p className="text-slate-400 text-xs">{item.label}</p>
                  <p className="text-slate-700 font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 4. 主体：双栏布局 ====== */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ---- 左侧主内容区 ---- */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* 简介 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <InfoCircleOutlined className="text-blue-600" /> 目的地简介
              </h2>
              <p className={`text-slate-600 text-sm leading-relaxed ${descExpanded ? "" : "line-clamp-3"}`}>
                {destination.description}
              </p>
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="text-blue-600 text-xs hover:text-blue-700 mt-2 flex items-center gap-1"
              >
                {descExpanded ? <><CompressOutlined />收起</> : <><ExpandOutlined />展开更多</>}
              </button>

              {/* 主题标签 */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                {destination.themes.map((t) => (
                  <Tag key={t} className="!rounded-full !text-xs !py-0.5 !px-3 !bg-slate-50 !text-slate-600 !border-slate-200 hover:!bg-blue-50 hover:!text-blue-600 hover:!border-blue-200 cursor-default transition-colors">
                    {themeLabels[t] || t}
                  </Tag>
                ))}
              </div>

              {/* 标签云 */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {destination.tags.map((t) => (
                  <span key={t} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">#{t}</span>
                ))}
              </div>
            </div>

            {/* 必去景点 */}
            {extras && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">🏛️ 必去景点</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extras.attractions.map((attr, idx) => (
                    <div key={idx} className="flex gap-3 group hover:bg-slate-50 rounded-xl p-2 -m-2 transition-colors">
                      <Image
                        src={attr.image}
                        alt={attr.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        preview={{ mask: <EyeOutlined /> }}
                        fallback="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-800 text-sm">{attr.name}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed mt-0.5 line-clamp-3">{attr.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 当地美食 */}
            {extras && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">🍜 当地美食</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {extras.cuisine.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all group">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        preview={{ mask: <EyeOutlined /> }}
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                        <p className="text-slate-400 text-xs leading-tight mt-0.5 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 地图 */}
            {coords && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-1">📍 地理位置</h2>
                <p className="text-slate-400 text-xs mb-4">{destination.name} · {destination.country}</p>
                <MapViewer lat={coords.lat} lng={coords.lng} name={destination.name} height="380px" />
              </div>
            )}

            {/* 旅行贴士 */}
            {extras && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">💡 旅行贴士</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {extras.tips.map((tip, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start p-3 rounded-xl bg-amber-50/50 border border-amber-100/50">
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                      <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 交通指南 */}
            {extras && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">🚇 交通指南</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{extras.transportation}</p>
              </div>
            )}

            {/* 同区域推荐 */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">附近推荐</h2>
                  <Button type="link" size="small" onClick={() => navigate(`/destination?type=${destination.domestic ? "domestic" : "abroad"}`)}>
                    更多 <RightOutlined />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {related.map((d) => (
                    <DestinationCard key={d.id} destination={d} size="normal" onClick={() => navigate(`/destination/${d.id}`)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---- 右侧 预订卡片（sticky） ---- */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* 价格 & 预订卡片 */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-amber-500">{destination.price}</span>
                  <span className="text-slate-400 text-xs">起</span>
                </div>
                <p className="text-slate-400 text-xs mb-4">价格因季节浮动，以实际查询为准</p>

                <Button
                  type="primary" size="large" block
                  onClick={() => navigate(`/hotel?city=${encodeURIComponent(destination.name)}`)}
                  className="!rounded-xl !h-12 !text-base !font-semibold !bg-blue-600 !border-0 hover:!bg-blue-700 !shadow-md"
                >
                  查看当地酒店
                </Button>
                <Button
                  block size="large"
                  onClick={() => navigate(`/strategy?search=${encodeURIComponent(destination.name)}`)}
                  className="!rounded-xl !h-10 !mt-2.5 !text-sm !text-blue-600 !border-blue-200 hover:!border-blue-400"
                >
                  查看相关攻略
                </Button>

                <Divider className="!my-4" />
                <div className="space-y-2 text-xs text-slate-400">
                  <p className="flex items-start gap-2">
                    <CalendarOutlined className="text-blue-500 mt-0.5" />
                    <span>最佳季节：{destination.bestSeason}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <StarFilled className="text-amber-400 mt-0.5" />
                    <span>评分 {destination.rating} · {destination.reviewCount.toLocaleString()} 条评价</span>
                  </p>
                </div>
              </div>

              {/* 热门标签 */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">热门标签</h4>
                <div className="flex flex-wrap gap-1.5">
                  {destination.tags.map((t) => (
                    <Tag key={t} className="!rounded-full !text-xs !bg-blue-50 !text-blue-600 !border-blue-100 cursor-default">
                      #{t}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* 游览小提示 */}
              <div className="bg-slate-900 rounded-2xl p-5 text-white text-xs space-y-3">
                <p className="text-slate-400 uppercase tracking-wider text-xs">Travel Note</p>
                <p className="leading-relaxed">
                  建议提前规划行程，旺季时热门景点可能需要提前预约。
                  {destination.domestic ? "国内目的地可使用身份证直接办理入住。" : "请确保护照有效期在6个月以上。"}
                </p>
                <p className="text-slate-500">
                  — Pandora TravelNow 旅行建议
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
