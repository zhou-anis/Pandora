import React from "react";
import { Rate, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockDestinations, type Destination } from "../data";

const featured = mockDestinations.filter((d) => d.featured);

const FeaturedCard: React.FC<{ dest: Destination; index: number }> = ({ dest, index }) => {
  const navigate = useNavigate();

  const goDetail = () => navigate(`/destination/${dest.id}`);

  return (
    <div
      onClick={goDetail}
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-[420px] shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ transform: `translateY(${index % 2 === 1 ? "0px" : "0px"})` }}
    >
      {/* 背景图 */}
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {/* 渐变 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* 内容 */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        {/* 标签 */}
        <div className="flex gap-2 mb-3">
          {dest.tags.map((tag) => (
            <Tag
              key={tag}
              className="!text-white !bg-white/20 !border-white/30 backdrop-blur-sm !rounded-full !text-xs !px-3 !py-0.5"
            >
              {tag}
            </Tag>
          ))}
          <Tag className="!text-white !bg-orange-500/80 !border-0 backdrop-blur-sm !rounded-full !text-xs !px-3 !py-0.5">
            热门推荐
          </Tag>
        </div>

        {/* 名称 */}
        <h3 className="text-3xl font-bold drop-shadow-lg mb-1">{dest.name}</h3>
        <p className="text-white/80 text-sm mb-3">{dest.country}</p>

        {/* 评分 & 价格 */}
        <div className="flex items-center gap-3 mb-3">
          <Rate disabled defaultValue={dest.rating} allowHalf style={{ fontSize: 14, color: "#fadb14" }} />
          <span className="text-white/90 text-sm">{dest.rating}</span>
        </div>

        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {dest.description}
        </p>

        {/* 底部 */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-400">{dest.price}</span>
          <button
            className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-gray-800 rounded-full
              font-medium text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            探索目的地
            <RightOutlined className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedDestinations: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.slice(0, 6).map((dest, index) => (
          <FeaturedCard key={dest.id} dest={dest} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
