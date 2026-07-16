import React, { useMemo, useState, useEffect } from "react";
import { Input, Select, Pagination, Empty, Tag } from "antd";
import {
  SearchOutlined,
  FireOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArticleCard from "../../components/article/ArticleCard.tsx";
import { mockArticles, categories, sortOptions } from "./data";
import type { Article } from "./data";

const PAGE_SIZE = 6;

const StrategyIndex: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramSearch = searchParams.get("search") || "";

  const [searchText, setSearchText] = useState(paramSearch);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  // 当 URL 参数变化时同步搜索框
  useEffect(() => {
    if (paramSearch) {
      setSearchText(paramSearch);
    }
  }, [paramSearch]);

  const filtered = useMemo(() => {
    let list: Article[] = [...mockArticles];

    if (searchText.trim()) {
      const kw = searchText.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(kw) ||
          a.summary.toLowerCase().includes(kw) ||
          a.tags.some((t) => t.toLowerCase().includes(kw)) ||
          a.author.name.toLowerCase().includes(kw)
      );
    }

    if (activeCategory !== "all") {
      list = list.filter((a) => a.category === activeCategory);
    }

    switch (sortBy) {
      case "popular":
        list.sort((a, b) => b.likes - a.likes);
        break;
      case "views":
        list.sort((a, b) => b.views - a.views);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [searchText, activeCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const featuredArticle = mockArticles.find((a) => a.featured && (activeCategory === "all" || a.category === activeCategory));

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ========== 1. Hero ========== */}
      <section className="relative w-full h-[350px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168d6b?w=1920&q=80"
          alt="travel blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/75 to-blue-900/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            攻略分享
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl drop-shadow">
            真实旅行者的精彩故事，为你的下一次旅程找找灵感 ✨
          </p>
          <div className="w-full max-w-xl">
            <Input
              size="large"
              placeholder="搜索攻略、目的地或作者..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              className="!rounded-2xl !py-2 !text-base !shadow-xl"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="rgb(249 250 251)" /></svg>
        </div>
      </section>

      {/* ========== 2. 分类标签 ========== */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-30 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={classNames(
                  "px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. 主体：信息流布局 ========== */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        {/* 精选推荐 */}
        {featuredArticle && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FireOutlined className="text-orange-500 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">精选推荐</h2>
            </div>
            <ArticleCard article={featuredArticle} layout="featured" />
          </div>
        )}

        {/* 排序 + 写攻略按钮 */}
        <div className="flex items-center justify-between mb-2 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">
              {activeCategory === "all" ? "最新攻略" : categories.find((c) => c.key === activeCategory)?.label}
            </h2>
            <span className="text-gray-400 text-sm">({filtered.length} 篇)</span>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={sortBy}
              onChange={(v) => { setSortBy(v); setCurrentPage(1); }}
              className="w-28"
              size="small"
              options={sortOptions}
              variant="borderless"
            />
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500
                text-white text-xs font-medium hover:bg-blue-600
                shadow-sm hover:shadow-md transition-all duration-200"
            >
              <EditOutlined />
              <span className="hidden sm:inline">写攻略</span>
            </button>
          </div>
        </div>

        {/* 信息流列表 */}
        {paged.length > 0 ? (
          <>
            <div className="divide-y divide-gray-100">
              {paged.map((article) => (
                <ArticleCard key={article.id} article={article} layout="feed" />
              ))}
            </div>
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
          <Empty description="没有找到匹配的攻略" className="py-20" />
        )}
      </section>
    </div>
  );
};

export default StrategyIndex;
