import React, { useMemo } from "react";
import { Card, Rate } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockDestinations } from "../../destination/data";

interface HomeDest {
  name: string;
  country: string;
  image: string;
  rating: number;
  price: string;
  tag: string;
}

const destinations: HomeDest[] = [
  { name: "东京", country: "日本", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", rating: 4.8, price: "¥3,999起", tag: "热门" },
  { name: "巴黎", country: "法国", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", rating: 4.7, price: "¥5,999起", tag: "浪漫" },
  { name: "巴厘岛", country: "印度尼西亚", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", rating: 4.9, price: "¥2,999起", tag: "海岛" },
  { name: "马尔代夫", country: "马尔代夫", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", rating: 4.9, price: "¥8,999起", tag: "蜜月" },
  { name: "纽约", country: "美国", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", rating: 4.6, price: "¥6,999起", tag: "都市" },
  { name: "曼谷", country: "泰国", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80", rating: 4.5, price: "¥1,999起", tag: "性价比" },
  { name: "悉尼", country: "澳大利亚", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80", rating: 4.7, price: "¥5,499起", tag: "自然" },
  { name: "伦敦", country: "英国", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", rating: 4.6, price: "¥5,299起", tag: "经典" },
];

const PopularDestinations: React.FC = () => {
  const navigate = useNavigate();

  // 动态匹配 mockDestinations，不写死 ID
  const resolved = useMemo(
    () =>
      destinations.map((d) => {
        const match = mockDestinations.find((m) => m.name === d.name);
        return { ...d, destId: match?.id };
      }),
    []
  );

  return (
    <div>
      {/* 标题区域 */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          热门目的地
        </h2>
        <p className="text-gray-500 text-lg">
          精选全球最受欢迎的旅行目的地，总有一个让你心动
        </p>
      </div>

      {/* 目的地卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resolved.map((dest, index) => (
          <Card
            key={index}
            hoverable
            onClick={() => {
              if (dest.destId) navigate(`/destination/${dest.destId}`);
            }}
            className="overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 group"
            cover={
              <div className="relative overflow-hidden h-52">
                <img
                  alt={dest.name}
                  src={dest.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {dest.tag}
                </span>
              </div>
            }
            bodyStyle={{ padding: "16px" }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-800">{dest.name}</h3>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <EnvironmentOutlined />
                {dest.country}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Rate disabled defaultValue={dest.rating} allowHalf style={{ fontSize: 14 }} />
              <span className="text-orange-500 font-bold text-lg">{dest.price}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
