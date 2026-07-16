import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rate, Tag, Button, Divider, Empty, Card } from "antd";
import {
  EnvironmentOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  StarFilled,
  CommentOutlined,
  FireOutlined,
  RightOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import DestinationCard from "./components/DestinationCard.tsx";
import MapViewer from "../../components/map/MapViewer.tsx";
import { mockDestinations, destinationExtras, destinationCoords } from "./data";

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destId = Number(id);

  const destination = useMemo(
    () => mockDestinations.find((d) => d.id === destId),
    [destId]
  );

  const extras = destination ? destinationExtras[destination.id] : undefined;
  const coords = destination ? destinationCoords[destination.id] : undefined;

  // 同区域相关目的地（排除当前）
  const related = useMemo(
    () =>
      destination
        ? mockDestinations
            .filter((d) => d.region === destination.region && d.id !== destination.id)
            .slice(0, 4)
        : [],
    [destination]
  );

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Empty description="目的地不存在">
          <Button type="primary" onClick={() => navigate("/destination")}>
            返回目的地列表
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ========== 封面大图 ========== */}
      <section className="relative w-full h-[480px] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 z-10" />
        <button
          onClick={() => navigate("/destination")}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-md
            text-white rounded-full text-sm hover:bg-white/30 transition-all"
        >
          <ArrowLeftOutlined /> 返回列表
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 text-white">
          <div className="flex gap-2 mb-3">
            {destination.tags.map((t) => (
              <Tag key={t} className="!bg-white/20 !text-white !border-white/30 !rounded-full !text-xs backdrop-blur-sm">{t}</Tag>
            ))}
            {destination.featured && (
              <Tag className="!bg-orange-500/80 !text-white !border-0 !rounded-full !text-xs backdrop-blur-sm"><FireOutlined /> 精选</Tag>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-2">{destination.name}</h1>
          <p className="text-white/70 text-lg mb-3">
            <EnvironmentOutlined className="mr-1" />{destination.country}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Rate disabled defaultValue={destination.rating} allowHalf style={{ fontSize: 14, color: "#fadb14" }} />
              <span className="font-semibold">{destination.rating}</span>
              <span>({destination.reviewCount.toLocaleString()} 条评价)</span>
            </span>
            <span className="flex items-center gap-1">
              <CalendarOutlined /> 最佳季节：{destination.bestSeason}
            </span>
          </div>
        </div>
      </section>

      {/* ========== 主体 ========== */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- 左侧：详情 --- */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* 简介 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">目的地简介</h2>
              <p className="text-gray-600 leading-relaxed text-base">{destination.description}</p>
              <Divider className="!my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">国家</p>
                  <p className="text-gray-700 font-semibold">{destination.country}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">评分</p>
                  <p className="text-gray-700 font-semibold flex items-center gap-1">
                    <StarFilled className="text-yellow-400" /> {destination.rating} / 5.0
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">最佳季节</p>
                  <p className="text-gray-700 font-semibold">{destination.bestSeason}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">评价数</p>
                  <p className="text-gray-700 font-semibold flex items-center gap-1">
                    <CommentOutlined /> {destination.reviewCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* 旅行主题 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">旅行主题</h2>
              <div className="flex flex-wrap gap-2">
                {destination.themes.map((theme) => {
                  const labels: Record<string, string> = {
                    beach: "🏖️ 海滨度假",
                    city: "🏙️ 城市探索",
                    nature: "🏔️ 自然风光",
                    culture: "🏛️ 文化古迹",
                    food: "🍜 美食之旅",
                    adventure: "🧗 户外冒险",
                  };
                  return (
                    <Tag key={theme} className="!rounded-full !text-sm !px-4 !py-1.5 !bg-gray-100 !text-gray-700 !border-0 hover:!bg-blue-50">
                      {labels[theme] ?? theme}
                    </Tag>
                  );
                })}
              </div>
            </div>

            {/* 地图 */}
            {coords && (
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📍 地理位置
                </h2>
                <p className="text-gray-400 text-xs mb-4">
                  {destination.name} · {destination.country}
                </p>
                <MapViewer
                  lat={coords.lat}
                  lng={coords.lng}
                  name={destination.name}
                  height="380px"
                />
              </div>
            )}

            {/* 扩展内容 */}
            {extras && (
              <>
                {/* 必去景点 */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-5">🏛️ 必去景点</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {extras.attractions.map((attr, idx) => (
                      <div key={idx} className="flex gap-3 group cursor-pointer">
                        <img
                          src={attr.image}
                          alt={attr.name}
                          className="w-24 h-24 rounded-xl object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{attr.name}</h4>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{attr.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 当地美食 */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-5">🍜 当地美食</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {extras.cuisine.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100/50 hover:border-orange-200 transition-all group cursor-default"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-gray-400 text-xs leading-tight mt-0.5 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 交通指南 */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">🚇 交通指南</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{extras.transportation}</p>
                </div>

                {/* 旅行贴士 */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-5">💡 旅行贴士</h2>
                  <ul className="space-y-3">
                    {extras.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-600">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">✦</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* 相关目的地 */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-800">同区域推荐</h2>
                  <Button
                    type="link"
                    onClick={() => navigate(`/destination?type=${destination.domestic ? "domestic" : "abroad"}`)}
                    className="!text-blue-500 !text-sm"
                  >
                    查看更多 <RightOutlined />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {related.map((d) => (
                    <DestinationCard
                      key={d.id}
                      destination={d}
                      size="normal"
                      onClick={() => navigate(`/destination/${d.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- 右侧：预订卡片 --- */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-orange-500 font-bold text-2xl">{destination.price}</span>
                  <span className="text-gray-400 text-xs">起</span>
                </div>
                <div className="space-y-3 mb-4 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <CalendarOutlined className="text-blue-500" />
                    最佳季节：{destination.bestSeason}
                  </p>
                  <p className="flex items-center gap-2">
                    <StarFilled className="text-yellow-400" />
                    评分 {destination.rating} · {destination.reviewCount.toLocaleString()} 条评价
                  </p>
                </div>
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => navigate(`/hotel?city=${encodeURIComponent(destination.name)}`)}
                  className="!rounded-xl !h-12 !text-base !font-semibold !bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0 !shadow-lg hover:!shadow-xl"
                >
                  查看当地酒店
                </Button>
                <Divider className="!my-4" />
                <Button
                  block
                  onClick={() => navigate(`/strategy?search=${encodeURIComponent(destination.name)}`)}
                  className="!rounded-xl !h-10 !text-sm !border-blue-200 !text-blue-600 hover:!border-blue-400"
                >
                  查看相关攻略
                </Button>
              </div>

              {/* 标签 */}
              <div className="mt-4 bg-white rounded-2xl shadow-md p-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">热门标签</h4>
                <div className="flex flex-wrap gap-1.5">
                  {destination.tags.map((tag) => (
                    <Tag key={tag} className="!rounded-full !text-xs !bg-blue-50 !text-blue-600 !border-blue-100 cursor-pointer">
                      #{tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
