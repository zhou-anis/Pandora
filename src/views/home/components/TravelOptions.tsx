import React from "react";
import MyIcon from "../../../components/icons/MyIcon.tsx";
import { useNavigate } from "react-router-dom";

interface TravelOption {
  icon_name: string;
  content: string;
  route: string;
  color: string; // tailwind bg color class for the icon wrapper
}

const TravelOptions: React.FC = () => {
  const navigate = useNavigate();

  const options: TravelOption[] = [
    {
      icon_name: "abroad",
      content: "出国游",
      route: "/destination?type=abroad",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon_name: "local",
      content: "国内游",
      route: "/destination?type=domestic",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon_name: "hotel",
      content: "订酒店",
      route: "/hotel",
      color: "from-orange-400 to-yellow-400",
    },
    {
      icon_name: "visa",
      content: "办签证",
      route: "/strategy",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon_name: "abroad",
      content: "攻略分享",
      route: "/strategy",
      color: "from-teal-400 to-cyan-400",
    },
    {
      icon_name: "local",
      content: "周边商城",
      route: "/shopping",
      color: "from-rose-400 to-red-400",
    },
  ];

  return (
    <div>
      {/* 标题 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          出行服务
        </h2>
        <p className="text-gray-500">一站式旅行服务，让你的出行更简单</p>
      </div>

      {/* 选项网格 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            {/* 图标容器 */}
            <div
              className={`w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.color}
                flex items-center justify-center shadow-md
                group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 mb-3`}
            >
              <MyIcon name={item.icon_name} size={40} />
            </div>
            <span className="text-gray-700 text-sm font-medium group-hover:text-cyan-600 transition-colors">
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelOptions;
