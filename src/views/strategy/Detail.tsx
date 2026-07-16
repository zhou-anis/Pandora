import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Tag, Button, Divider, Empty } from "antd";
import {
  LikeOutlined,
  BookOutlined,
  ShareAltOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import CommentSection from "../../components/article/CommentSection.tsx";
import ArticleCard from "../../components/article/ArticleCard.tsx";
import { mockArticles, getCommentsByArticle } from "./data";

const StrategyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = Number(id);

  const article = useMemo(
    () => mockArticles.find((a) => a.id === articleId),
    [articleId]
  );

  const comments = useMemo(() => getCommentsByArticle(articleId), [articleId]);

  const relatedArticles = useMemo(
    () =>
      article
        ? mockArticles
            .filter((a) => a.id !== article.id && a.category === article.category)
            .slice(0, 3)
        : [],
    [article]
  );

  // 互动状态 (mock)
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(article?.likes || 0);
  const [bookmarkCount, setBookmarkCount] = React.useState(article?.bookmarks || 0);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Empty description="攻略不存在或已删除">
          <Button type="primary" onClick={() => navigate("/strategy")}>
            返回攻略列表
          </Button>
        </Empty>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    setBookmarkCount((c) => (bookmarked ? c - 1 : c + 1));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ========== 顶部封面头图 ========== */}
      <section className="relative w-full h-[420px] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
        {/* 返回按钮 */}
        <button
          onClick={() => navigate("/strategy")}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-md
            text-white rounded-full text-sm hover:bg-white/30 transition-all"
        >
          <ArrowLeftOutlined />
          返回列表
        </button>
        {/* 标题信息 */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 max-w-4xl">
          <div className="flex gap-2 mb-3">
            <Tag className="!bg-orange-500/80 !text-white !border-0 !rounded-full !text-xs backdrop-blur-sm">{article.category}</Tag>
            {article.tags.slice(0, 2).map((t) => (
              <Tag key={t} className="!bg-white/20 !text-white !border-white/30 !rounded-full !text-xs backdrop-blur-sm">{t}</Tag>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <Avatar src={article.author.avatar} size={28} />
              {article.author.name}
            </span>
            <span className="flex items-center gap-1"><CalendarOutlined />{article.createdAt}</span>
            <span className="flex items-center gap-1"><ClockCircleOutlined />{article.readTime} 分钟阅读</span>
            <span className="flex items-center gap-1"><EyeOutlined />{article.views.toLocaleString()} 阅读</span>
          </div>
        </div>
      </section>

      {/* ========== 正文内容区 ========== */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- 左侧：正文 --- */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
              {/* 摘要 */}
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-8 text-gray-700 text-sm leading-relaxed italic">
                {article.summary}
              </div>

              {/* 正文渲染 */}
              <div className="prose prose-gray max-w-none">
                {article.content.map((section, idx) => {
                  switch (section.type) {
                    case "heading":
                      return (
                        <h2 key={idx} className="text-2xl font-bold text-gray-800 mt-10 mb-4 first:mt-0">
                          {section.content}
                        </h2>
                      );
                    case "paragraph":
                      return (
                        <p key={idx} className="text-gray-700 leading-relaxed mb-5 text-base">
                          {section.content}
                        </p>
                      );
                    case "image":
                      return (
                        <figure key={idx} className="my-8 -mx-4 md:-mx-10">
                          <img
                            src={section.src}
                            alt={section.alt || ""}
                            className="w-full rounded-xl shadow-md object-cover max-h-[500px]"
                          />
                          {section.alt && (
                            <figcaption className="text-center text-gray-400 text-sm mt-2">
                              {section.alt}
                            </figcaption>
                          )}
                        </figure>
                      );
                    case "tip":
                      return (
                        <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 text-sm text-amber-800 leading-relaxed">
                          {section.content}
                        </div>
                      );
                    case "list":
                      return (
                        <ul key={idx} className="list-disc pl-5 mb-5 space-y-2 text-gray-700 text-base">
                          {section.items?.map((item, i) => (
                            <li key={i} className="leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              {/* 标签 */}
              <Divider className="!my-8" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Tag key={tag} className="!rounded-full !text-sm !px-4 !py-1 !bg-gray-100 !text-gray-600 !border-0 hover:!bg-blue-50 hover:!text-blue-500 cursor-pointer">
                    #{tag}
                  </Tag>
                ))}
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                <Button
                  icon={<LikeOutlined />}
                  onClick={handleLike}
                  className={classNames("!rounded-full !text-sm", liked && "!text-blue-500 !border-blue-500")}
                >
                  {likeCount.toLocaleString()} 赞
                </Button>
                <Button
                  icon={<BookOutlined />}
                  onClick={handleBookmark}
                  className={classNames("!rounded-full !text-sm", bookmarked && "!text-orange-500 !border-orange-500")}
                >
                  {bookmarkCount.toLocaleString()} 收藏
                </Button>
                <Button icon={<ShareAltOutlined />} className="!rounded-full !text-sm">
                  分享
                </Button>
              </div>
            </div>

            {/* 评论区 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mt-6">
              <CommentSection comments={comments} articleId={article.id} />
            </div>
          </div>

          {/* --- 右侧：作者卡片 + 相关推荐 --- */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
            {/* 作者卡片 */}
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <Avatar src={article.author.avatar} size={72} icon={<UserOutlined />} />
              <h3 className="font-bold text-gray-800 mt-3 text-lg">{article.author.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mt-2">{article.author.bio}</p>
              <Divider className="!my-4" />
              <div className="flex justify-around text-center text-sm">
                <div>
                  <div className="font-bold text-gray-800">{mockArticles.filter((a) => a.author.name === article.author.name).length}</div>
                  <div className="text-gray-400 text-xs">攻略</div>
                </div>
                <div>
                  <div className="font-bold text-gray-800">{article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}k` : article.views}</div>
                  <div className="text-gray-400 text-xs">阅读</div>
                </div>
                <div>
                  <div className="font-bold text-gray-800">{article.likes >= 1000 ? `${(article.likes / 1000).toFixed(1)}k` : article.likes}</div>
                  <div className="text-gray-400 text-xs">获赞</div>
                </div>
              </div>
              <Button type="primary" ghost className="!rounded-full !mt-4 !w-full">
                + 关注作者
              </Button>
            </div>

            {/* 相关推荐 */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-bold text-gray-800 mb-4">相关推荐</h3>
                <div className="space-y-4">
                  {relatedArticles.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => navigate(`/strategy/${a.id}`)}
                      className="flex gap-3 cursor-pointer group"
                    >
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                          {a.title}
                        </h4>
                        <span className="text-gray-400 text-xs mt-1 inline-block">
                          <EyeOutlined className="mr-1" />{a.views >= 1000 ? `${(a.views / 1000).toFixed(1)}k` : a.views}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategyDetail;
