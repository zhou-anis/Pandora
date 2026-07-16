import React from "react";
import { Tag, Avatar } from "antd";
import {
  EyeOutlined,
  LikeOutlined,
  CommentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import type { Article } from "../../views/strategy/data";
import { useNavigate } from "react-router-dom";

interface Props {
  article: Article;
  layout?: "feed" | "featured";
  className?: string;
}

const ArticleCard: React.FC<Props> = ({ article, layout = "feed", className }) => {
  const navigate = useNavigate();
  const isFeatured = layout === "featured";

  const goDetail = () => navigate(`/strategy/${article.id}`);

  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

  // ====== Featured 大卡片（保留） ======
  if (isFeatured) {
    return (
      <div
        className={classNames(
          "relative rounded-2xl overflow-hidden cursor-pointer group h-[420px] shadow-lg hover:shadow-2xl transition-all duration-300",
          className
        )}
        onClick={goDetail}
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex gap-2 mb-3">
            <Tag className="!bg-orange-500/80 !text-white !border-0 !rounded-full !text-xs backdrop-blur-sm">精选</Tag>
            <Tag className="!bg-white/20 !text-white !border-white/30 !rounded-full !text-xs backdrop-blur-sm">{article.category}</Tag>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-white/70 text-sm line-clamp-2 mb-4">{article.summary}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar src={article.author.avatar} size="small" />
              <span className="text-white/80 text-sm">{article.author.name}</span>
              <span className="text-white/50 text-xs ml-1">
                <ClockCircleOutlined className="mr-1" />{article.readTime} 分钟阅读
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <span><EyeOutlined /> {fmt(article.views)}</span>
              <span><LikeOutlined /> {fmt(article.likes)}</span>
              <span><CommentOutlined /> {article.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====== Feed 信息流卡片（知乎风格） ======
  return (
    <article
      onClick={goDetail}
      className={classNames(
        "flex gap-5 py-6 px-1 cursor-pointer group",
        "border-b border-gray-100 last:border-0",
        "hover:bg-gray-50/80 -mx-1 px-1 rounded-lg transition-colors duration-200",
        className
      )}
    >
      {/* 左侧：文字内容区 */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* 标题 */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-snug mb-2">
          {article.title}
        </h3>

        {/* 摘要 */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {article.summary}
        </p>

        {/* 底部元信息 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mt-auto">
          {/* 作者 */}
          <span className="flex items-center gap-1.5 text-gray-600">
            <Avatar src={article.author.avatar} size={20} />
            <span className="font-medium">{article.author.name}</span>
          </span>

          {/* 日期 & 阅读时间 */}
          <span className="flex items-center gap-1">
            {article.createdAt}
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <ClockCircleOutlined />
            {article.readTime} 分钟阅读
          </span>

          {/* 分类标签 */}
          <Tag className="!text-xs !rounded-full !bg-gray-100 !border-0 !text-gray-500 !px-2 !py-0">
            {article.category}
          </Tag>

          {/* 数据 */}
          <span className="flex items-center gap-3 ml-auto sm:ml-4">
            <span className="flex items-center gap-1"><EyeOutlined />{fmt(article.views)}</span>
            <span className="flex items-center gap-1"><LikeOutlined />{fmt(article.likes)}</span>
            <span className="flex items-center gap-1"><CommentOutlined />{article.commentCount}</span>
          </span>
        </div>
      </div>

      {/* 右侧：封面图 */}
      <div className="w-36 h-24 sm:w-48 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
      </div>
    </article>
  );
};

export default ArticleCard;
