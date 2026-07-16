import React from "react";
import SearchBox from "../../../components/search/SearchBox.tsx";

const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      {/* 背景图片 */}
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
        alt="travel background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* 内容区域 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide">
          探索世界，从这里开始
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow-lg">
          发现精彩目的地，预订超值机票与酒店，开启属于你的专属旅程
        </p>

        {/* 搜索框 */}
        <div className="w-full max-w-3xl">
          <SearchBox />
        </div>

        {/* 统计数据 */}
        <div className="flex gap-8 md:gap-16 mt-12 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold drop-shadow">200+</div>
            <div className="text-sm text-white/80 mt-1">目的地</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold drop-shadow">10k+</div>
            <div className="text-sm text-white/80 mt-1">旅行者</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold drop-shadow">5k+</div>
            <div className="text-sm text-white/80 mt-1">旅行攻略</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold drop-shadow">99%</div>
            <div className="text-sm text-white/80 mt-1">好评率</div>
          </div>
        </div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
