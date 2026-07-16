import React, { useMemo, useState, useEffect } from "react";
import {
  Input,
  Select,
  DatePicker,
  Pagination,
  Segmented,
  Empty,
  Tag,
  Badge,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import HotelCard from "../../components/hotel/HotelCard.tsx";
import HotelFilter, {
  type FilterState,
} from "../../components/hotel/HotelFilter.tsx";
import {
  mockHotels,
  starOptions,
  typeOptions,
  amenityOptions,
  cityOptions,
  sortOptions,
  type Hotel,
} from "./data";

const { RangePicker } = DatePicker;

const PAGE_SIZE = 6;

const HotelIndex: React.FC = () => {
  const [searchParams] = useSearchParams();

  // 从 URL 读取首页传来的搜索条件
  const paramCity = searchParams.get("city") || "";

  // 搜索状态
  const [searchText, setSearchText] = useState(paramCity);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // 筛选状态
  const priceMin = 0;
  const priceMax = 6000;
  const [filter, setFilter] = useState<FilterState>({
    priceRange: [priceMin, priceMax],
    stars: [],
    types: [],
    amenities: [],
    city: paramCity || "all",
  });

  // 当 URL 参数变化时同步
  useEffect(() => {
    if (paramCity) {
      setSearchText(paramCity);
      setFilter((prev) => ({ ...prev, city: paramCity }));
    }
  }, [paramCity]);

  // ---- 过滤 & 排序 ----
  const filtered = useMemo(() => {
    let list: Hotel[] = [...mockHotels];

    // 搜索关键词
    if (searchText.trim()) {
      const kw = searchText.trim().toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(kw) ||
          h.nameEn.toLowerCase().includes(kw) ||
          h.city.includes(kw) ||
          h.country.includes(kw) ||
          h.tags.some((t) => t.toLowerCase().includes(kw)) ||
          h.description.includes(kw)
      );
    }

    // 城市
    if (filter.city !== "all") {
      list = list.filter((h) => h.city === filter.city);
    }

    // 星级
    if (filter.stars.length > 0) {
      list = list.filter((h) => filter.stars.includes(h.stars));
    }

    // 类型
    if (filter.types.length > 0) {
      list = list.filter((h) => filter.types.includes(h.type));
    }

    // 设施
    if (filter.amenities.length > 0) {
      list = list.filter((h) =>
        filter.amenities.every((a) => h.amenities.includes(a))
      );
    }

    // 价格范围
    list = list.filter(
      (h) => h.price >= filter.priceRange[0] && h.price <= filter.priceRange[1]
    );

    // 排序
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // recommended: featured first, then rating
        list.sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.rating - a.rating;
        });
    }

    return list;
  }, [searchText, filter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 切换筛选时回到第一页
  const handleFilterChange = (f: FilterState) => {
    setFilter(f);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  // 激活的筛选条件
  const activeFilters: string[] = [];
  if (filter.city !== "all") activeFilters.push(`城市: ${filter.city}`);
  filter.stars.forEach((s) => activeFilters.push(`${s}星级`));
  filter.types.forEach((t) => {
    const opt = typeOptions.find((o) => o.value === t);
    if (opt) activeFilters.push(opt.label);
  });
  filter.amenities.forEach((a) => activeFilters.push(a));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ========== 1. Hero 搜索区 ========== */}
      <section className="relative w-full h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="hotel hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-blue-900/70 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            预订酒店
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl drop-shadow">
            全球 100,000+ 酒店供您选择，找到旅途中的理想居所
          </p>

          {/* 快速搜索栏 */}
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* 目的地 */}
              <Input
                size="large"
                placeholder="搜索目的地、酒店名称..."
                prefix={<EnvironmentOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                className="flex-1 !rounded-xl"
              />
              {/* 日期 */}
              <RangePicker
                size="large"
                placeholder={["入住日期", "离店日期"]}
                className="!rounded-xl"
                style={{ minWidth: 240 }}
              />
              {/* 房客 */}
              <Select
                size="large"
                defaultValue={2}
                className="!rounded-xl"
                style={{ minWidth: 120 }}
                prefix={<UserOutlined />}
                options={[
                  { value: 1, label: "1 位房客" },
                  { value: 2, label: "2 位房客" },
                  { value: 3, label: "3 位房客" },
                  { value: 4, label: "4 位房客" },
                ]}
              />
              {/* 搜索按钮 */}
              <button
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500
                  text-white font-semibold text-base hover:from-indigo-500 hover:to-purple-500
                  shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 flex-shrink-0"
              >
                <SearchOutlined />
                搜索
              </button>
            </div>
          </div>
        </div>
        {/* 波浪 */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
      </section>

      {/* ========== 2. 统计条 ========== */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-30 mb-8">
        <div className="bg-white rounded-xl shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Badge status="success" text={`找到 ${filtered.length} 家酒店`} />
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">价格 ¥{priceMin} - ¥{priceMax}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* 排序 */}
            <span className="text-gray-400 text-sm hidden md:inline">排序:</span>
            <Select
              value={sortBy}
              onChange={(v) => {
                setSortBy(v);
                setCurrentPage(1);
              }}
              className="w-36"
              size="small"
              options={sortOptions}
            />
            {/* 视图切换 */}
            <Segmented
              size="small"
              value={viewMode}
              onChange={(v) => setViewMode(v as "grid" | "list")}
              options={[
                { value: "grid", icon: <AppstoreOutlined /> },
                { value: "list", icon: <UnorderedListOutlined /> },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ========== 3. 主体：筛选 + 结果 ========== */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {/* 激活的筛选标签 */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-gray-400 text-sm">已选条件:</span>
            {activeFilters.map((f) => (
              <Tag
                key={f}
                closable
                onClose={() => {
                  // 移除对应筛选
                  if (f.startsWith("城市:")) handleFilterChange({ ...filter, city: "all" });
                  else if (f.endsWith("星级")) {
                    const star = parseInt(f, 10);
                    handleFilterChange({
                      ...filter,
                      stars: filter.stars.filter((s) => s !== star),
                    });
                  } else if (typeOptions.some((o) => o.label === f)) {
                    const opt = typeOptions.find((o) => o.label === f);
                    if (opt)
                      handleFilterChange({
                        ...filter,
                        types: filter.types.filter((t) => t !== opt.value),
                      });
                  } else {
                    handleFilterChange({
                      ...filter,
                      amenities: filter.amenities.filter((a) => a !== f),
                    });
                  }
                }}
                className="!rounded-full !bg-blue-50 !text-blue-600 !border-blue-200 !text-xs"
              >
                {f}
              </Tag>
            ))}
            <button
              onClick={() =>
                handleFilterChange({
                  priceRange: [priceMin, priceMax],
                  stars: [],
                  types: [],
                  amenities: [],
                  city: "all",
                })
              }
              className="text-blue-500 text-xs hover:text-blue-700 ml-1"
            >
              清除全部
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* --- 左侧筛选栏 --- */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <HotelFilter
              filter={filter}
              onChange={handleFilterChange}
              starOptions={starOptions}
              typeOptions={typeOptions}
              amenityOptions={amenityOptions.slice(0, 8)}
              cityOptions={cityOptions}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          </div>

          {/* --- 右侧结果区 --- */}
          <div className="flex-1 min-w-0">
            {paged.length > 0 ? (
              <>
                {/* 卡片列表 */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paged.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} layout="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {paged.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} layout="list" />
                    ))}
                  </div>
                )}

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
                description="没有找到匹配的酒店，试试调整筛选条件"
                className="py-20"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelIndex;
