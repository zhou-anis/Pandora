import React from "react";
import { Card, Rate, Tag } from "antd";
import { EnvironmentOutlined, CalendarOutlined, CommentOutlined } from "@ant-design/icons";
import type { Destination } from "../data";

interface Props {
  destination: Destination;
  size?: "normal" | "large";
  onClick?: () => void;
}

const DestinationCard: React.FC<Props> = ({ destination, size = "normal", onClick }) => {
  const isLarge = size === "large";

  return (
    <Card
      hoverable
      onClick={onClick}
      className="overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group h-full"
      cover={
        <div
          className={`relative overflow-hidden ${isLarge ? "h-64" : "h-48"}`}
        >
          <img
            alt={destination.name}
            src={destination.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* 顶部标签 */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {destination.tags.slice(0, 2).map((tag) => (
              <Tag
                key={tag}
                className="!bg-white/90 backdrop-blur-sm !text-gray-700 !text-xs !font-semibold !px-2 !py-0.5 !rounded-full !border-0"
              >
                {tag}
              </Tag>
            ))}
          </div>

          {/* 底部国家名（大卡片显示） */}
          {isLarge && (
            <div className="absolute bottom-3 left-3 text-white text-sm flex items-center gap-1 drop-shadow">
              <EnvironmentOutlined />
              <span>{destination.country}</span>
            </div>
          )}
        </div>
      }
      bodyStyle={{ padding: isLarge ? "20px" : "16px" }}
    >
      {/* 标题行 */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className={`font-bold text-gray-800 ${isLarge ? "text-xl" : "text-lg"}`}>
            {destination.name}
          </h3>
          {!isLarge && (
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
              <EnvironmentOutlined />
              {destination.country}
            </p>
          )}
        </div>
        <div className="text-right">
          <span className="text-orange-500 font-bold text-lg">{destination.price}</span>
        </div>
      </div>

      {/* 评分 */}
      <div className="flex items-center gap-2 mb-2">
        <Rate disabled defaultValue={destination.rating} allowHalf style={{ fontSize: 12 }} />
        <span className="text-gray-500 text-xs">
          {destination.rating} ({destination.reviewCount.toLocaleString()}条评价)
        </span>
      </div>

      {/* 描述（大卡片显示） */}
      {isLarge && (
        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {destination.description}
        </p>
      )}

      {/* 底部信息 */}
      <div className="flex items-center gap-4 text-gray-400 text-xs pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1">
          <CalendarOutlined />
          {destination.bestSeason}
        </span>
        <span className="flex items-center gap-1">
          <CommentOutlined />
          {destination.reviewCount.toLocaleString()}
        </span>
      </div>
    </Card>
  );
};

export default DestinationCard;
