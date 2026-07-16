import React from "react";
import { Card, Rate, Tag } from "antd";
import {
  EnvironmentOutlined,
  WifiOutlined,
  CoffeeOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import type { Hotel } from "../../views/hotel/data";

interface Props {
  hotel: Hotel;
  layout?: "grid" | "list";
  onClick?: () => void;
  className?: string;
}

const HotelCard: React.FC<Props> = ({ hotel, layout = "grid", onClick, className }) => {
  const navigate = useNavigate();
  const isList = layout === "list";

  const handleClick = onClick ?? (() => navigate(`/hotel/${hotel.id}`));

  const amenityIcons: Record<string, React.ReactNode> = {
    免费WiFi: <WifiOutlined />,
    餐厅: <CoffeeOutlined />,
    游泳池: <ThunderboltOutlined />,
  };

  const renderImage = () => (
    <div
      className={classNames(
        "relative overflow-hidden",
        isList ? "w-72 h-full min-h-52 flex-shrink-0" : "h-52"
      )}
    >
      <img
        alt={hotel.name}
        src={hotel.image}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* 折扣标签 */}
      {hotel.discount && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          -{hotel.discount}%
        </div>
      )}

      {/* 收藏按钮 */}
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full
          flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white
          transition-all shadow-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        ♡
      </button>

      {/* 底部城市信息 — 仅 grid */}
      {!isList && (
        <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1 drop-shadow">
          <EnvironmentOutlined />
          <span>{hotel.city} · {hotel.country}</span>
        </div>
      )}
    </div>
  );

  const renderInfo = () => (
    <div className={classNames("flex flex-col", isList ? "flex-1" : "")}>
      {/* 酒店名称 */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 truncate text-base">
            {hotel.name}
          </h3>
          <p className="text-gray-400 text-xs truncate">{hotel.nameEn}</p>
        </div>
        {/* 星级 */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-sm">★</span>
          ))}
        </div>
      </div>

      {/* 评分 */}
      <div className="flex items-center gap-2 mb-2">
        <Rate disabled defaultValue={hotel.rating} allowHalf style={{ fontSize: 12 }} />
        <span className="text-blue-600 font-semibold text-sm">{hotel.rating}</span>
        <span className="text-gray-400 text-xs">
          ({hotel.reviewCount.toLocaleString()}条评价)
        </span>
      </div>

      {/* 描述 — 仅列表 */}
      {isList && (
        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {hotel.description}
        </p>
      )}

      {/* 标签 */}
      <div className="flex flex-wrap gap-1 mb-2">
        {hotel.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} color="cyan" className="!text-xs !px-2 !py-0 !rounded-full">
            {tag}
          </Tag>
        ))}
      </div>

      {/* 设施 */}
      <div className="flex flex-wrap gap-2 text-gray-400 text-xs mb-2">
        {hotel.amenities.slice(0, isList ? 6 : 4).map((a) => (
          <span key={a} className="flex items-center gap-1">
            {amenityIcons[a] || "✓"}
            {a}
          </span>
        ))}
      </div>

      {/* 距离 */}
      <p className="text-gray-400 text-xs flex items-center gap-1 mb-3">
        <EnvironmentOutlined />
        {hotel.distance}
      </p>

      {/* 价格 */}
      <div className="mt-auto flex items-end justify-between">
        <div>
          <span className="text-orange-500 font-bold text-xl">¥{hotel.price}</span>
          <span className="text-gray-400 text-xs ml-1">/晚</span>
          {hotel.originalPrice && (
            <span className="text-gray-300 text-xs line-through ml-2">
              ¥{hotel.originalPrice}
            </span>
          )}
        </div>
        <button
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
            text-white text-xs font-medium hover:from-indigo-500 hover:to-purple-500
            shadow-md hover:shadow-lg transition-all duration-300"
        >
          查看详情
        </button>
      </div>
    </div>
  );

  // ------ Grid 布局 ------
  if (!isList) {
    return (
      <Card
        hoverable
        onClick={handleClick}
        className={classNames(
          "overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group h-full",
          className
        )}
        cover={renderImage()}
        bodyStyle={{ padding: "16px" }}
      >
        {renderInfo()}
      </Card>
    );
  }

  // ------ List 布局 ------
  return (
    <Card
      hoverable
      onClick={handleClick}
      className={classNames(
        "overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group",
        className
      )}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex">
        {renderImage()}
        <div className="p-5 flex-1 min-w-0">{renderInfo()}</div>
      </div>
    </Card>
  );
};

export default HotelCard;
