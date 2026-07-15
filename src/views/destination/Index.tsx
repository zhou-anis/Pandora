import React, { useMemo, useState, useEffect } from "react";
import { Input, Select, Segmented, Empty, Pagination } from "antd";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import DestinationCard from "./components/DestinationCard.tsx";
import FeaturedDestinations from "./components/FeaturedDestinations.tsx";
import {
  mockDestinations,
  regionInfo,
  themeInfo,
  type Destination,
} from "./data";

const PAGE_SIZE = 8;

const DestinationIndex: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "all";

  // 筛选状态
  const [searchText, setSearchText] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>(() => {
    if (typeParam === "domestic") return "china";
    if (typeParam === "abroad") return "all";
    return "all";
  });
  const [activeTheme, setActiveTheme] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [currentPage, setCurrentPage] = useState(1);

  // 当 URL param 变化时同步
  useEffect(() => {
    if (typeParam === "domestic") setActiveRegion("china");
    else if (typeParam === "abroad") setActiveRegion("all");
    else setActiveRegion("all");
  }, [typeParam]);

  // 过滤 & 排序
  const filtered = useMemo(() => {
    let list = [...mockDestinations];

    // URL 参数: 出国游 / 国内游
    if (typeParam === "domestic") {
      list = list.filter((d) => d.domestic === true);
    } else if (typeParam === "abroad") {
      list = list.filter((d) => d.domestic === false);
    }

    // 搜索
    if (searchText.trim()) {
      const kw = searchText.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(kw) ||
          d.country.toLowerCase().includes(kw) ||
          d.tags.some((t) => t.toLowerCase().includes(kw)) ||
          d.description.toLowerCase().includes(kw)
      );
    }

    // 区域筛选（手动切换区域时，清除 URL type 参数）
    if (activeRegion !== "all" && typeParam === "all") {
      list = list.filter((d) => d.region === activeRegion);
    }

    // 主题筛选
    if (activeTheme !== "all") {
      list = list.filter((d) => d.themes.includes(activeTheme as Destination["themes"][number]));
    }

    // 排序
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        list.sort((a, b) => {
          const pa = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
          const pb = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
          return pa - pb;
        });
        break;
      case "price-high":
        list.sort((a, b) => {
          const pa = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
          const pb = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
          return pb - pa;
        });
        break;
      case "reviews":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return list;
  }, [searchText, activeRegion, activeTheme, sortBy, typeParam]);

  // 分页
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 切换筛选时重置页码
  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    // 清除 URL type 参数，让区域标签完全接管筛选
    if (typeParam !== "all") {
      setSearchParams({});
    }
    setCurrentPage(1);
  };

  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50">
      {/* ========== 1. Hero Banner ========== */}
      <section className="relative w-full h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="destinations hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 to-indigo-900/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            探索目的地
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl drop-shadow">
            全球 200+ 精选目的地，找到属于你的下一个远方
          </p>
          {/* 搜索框 */}
          <div className="w-full max-w-xl">
            <Input
              size="large"
              placeholder="搜索目的地、国家或关键词..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              className="!rounded-2xl !py-2 !text-base !shadow-xl"
            />
          </div>
        </div>
        {/* 波浪 */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
      </section>

      {/* ========== 2. 区域标签 ========== */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-30">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-center">
            {Object.entries(regionInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => handleRegionChange(key)}
                className={classNames(
                  "px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300",
                  activeRegion === key
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <span className="mr-1.5">{info.icon}</span>
                {info.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. 精选推荐 ========== */}
      <section className="max-w-7xl mx-auto px-4 pt-14 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              ✨ 精选推荐
            </h2>
            <p className="text-gray-500 text-sm">本月最受欢迎的旅行目的地</p>
          </div>
        </div>
        <FeaturedDestinations />
      </section>

      {/* ========== 4. 全部目的地 — 过滤 + 列表 ========== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* 标题 & 工具条 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">全部目的地</h2>
            <p className="text-gray-500 text-sm">
              {filtered.length > 0
                ? `共找到 ${filtered.length} 个目的地`
                : "未找到匹配的目的地"}
            </p>
          </div>
          {/* 排序 */}
          <div className="flex items-center gap-3">
            <SortAscendingOutlined className="text-gray-400" />
            <Select
              value={sortBy}
              onChange={(v) => {
                setSortBy(v);
                setCurrentPage(1);
              }}
              className="w-36"
              options={[
                { value: "rating", label: "评分最高" },
                { value: "price-low", label: "价格从低到高" },
                { value: "price-high", label: "价格从高到低" },
                { value: "reviews", label: "评论最多" },
              ]}
            />
          </div>
        </div>

        {/* 主题筛选 */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <FilterOutlined className="text-gray-400 mr-1" />
          {Object.entries(themeInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={classNames(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                activeTheme === key
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-cyan-300 hover:text-cyan-500"
              )}
            >
              {info.icon && <span className="mr-1">{info.icon}</span>}
              {info.label}
            </button>
          ))}
        </div>

        {/* 目的地网格 */}
        {paged.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paged.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} size="normal" onClick={() => navigate(`/destination/${dest.id}`)} />
              ))}
            </div>
            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  current={currentPage}
                  total={filtered.length}
                  pageSize={PAGE_SIZE}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                  showQuickJumper
                />
              </div>
            )}
          </>
        ) : (
          <Empty
            description="没有找到匹配的目的地，试试其他关键词吧"
            className="py-20"
          />
        )}
      </section>

      {/* ========== 5. 旅行灵感 — 按主题浏览 ========== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              按旅行主题探索
            </h2>
            <p className="text-gray-500 text-lg">
              无论你喜欢什么样的旅行方式，这里都有属于你的灵感
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(themeInfo)
              .filter(([key]) => key !== "all")
              .map(([key, info]) => (
                <div
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={classNames(
                    "flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 group h-40",
                    activeTheme === key
                      ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-200"
                      : "bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                  )}
                >
                  <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {info.icon}
                  </span>
                  <span
                    className={classNames(
                      "font-semibold text-sm",
                      activeTheme === key ? "text-white" : "text-gray-700"
                    )}
                  >
                    {info.label}
                  </span>
                  <span
                    className={classNames(
                      "text-xs mt-1",
                      activeTheme === key ? "text-white/70" : "text-gray-400"
                    )}
                  >
                    {mockDestinations.filter((d) => d.themes.includes(key as any)).length} 个目的地
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationIndex;
