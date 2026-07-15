import React from "react";
import HeroBanner from "./components/HeroBanner.tsx";
import TravelOptions from "./components/TravelOptions.tsx";
import TodayRecommendation from "./components/TodayRecommendation.tsx";
import HotTickets from "./components/HotTickets.tsx";
import HotelSelection from "./components/HotelSelection.tsx";
import HotelSwiper from "./components/HotelSwiper.tsx";
import PopularDestinations from "./components/PopularDestinations.tsx";
import HotDiary from "./components/HotDiary.tsx";
import classNames from "classnames";

const HomeIndex: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* ========== 1. 顶部英雄区 + 搜索 ========== */}
      <HeroBanner />

      {/* ========== 2. 出行服务入口 ========== */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-30">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <TravelOptions />
        </div>
      </section>

      {/* ========== 3. 每日推荐 + 热门机票（双栏布局） ========== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧：每日推荐（占3份宽度） */}
          <div className="lg:col-span-3">
            <SectionTitle title="每日推荐" subtitle="精选旅行灵感 · 每日更新" />
            <TodayRecommendation />
          </div>
          {/* 右侧：热门机票（占2份宽度） */}
          <div className="lg:col-span-2">
            <SectionTitle title="热门机票" subtitle="超值航班 · 限时特惠" />
            <HotTickets />
          </div>
        </div>
      </section>

      {/* ========== 4. 酒店预订区（双栏：搜索表单 + 推荐轮播） ========== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="酒店预订"
            subtitle="精选优质酒店 · 舒适入住体验"
            className="text-center"
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
            {/* 左侧：酒店搜索表单（占2份） */}
            <div className="lg:col-span-2">
              <HotelSelection />
            </div>
            {/* 右侧：酒店推荐轮播（占3份） */}
            <div className="lg:col-span-3">
              <HotelSwiper />
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. 热门目的地 ========== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <PopularDestinations />
      </section>

      {/* ========== 6. 热门攻略 ========== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 左侧标题 */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                热门攻略
              </h2>
              <p className="text-gray-500 text-lg mb-4">
                来自真实旅行者的精彩分享
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                每一篇攻略都是旅行者的亲身经历。
                <br />
                从自驾川藏到海岛发呆，从美食探店到徒步冒险——
                <br />
                这里有最真实的旅行故事。
              </p>
              <button
                className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
                  text-white font-medium hover:from-indigo-500 hover:to-purple-500
                  shadow-md hover:shadow-lg transition-all duration-300"
              >
                查看更多攻略
              </button>
            </div>
            {/* 右侧列表 */}
            <div className="lg:col-span-2">
              <HotDiary />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/** 统一的区块标题组件 */
const SectionTitle: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className }) => (
  <div className={classNames("mb-6", className)}>
    <div className="flex items-center gap-3 mb-1">
      <span className="w-1 h-7 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full inline-block" />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    {subtitle && <p className="text-gray-400 text-sm ml-4">{subtitle}</p>}
  </div>
);

export default HomeIndex;
