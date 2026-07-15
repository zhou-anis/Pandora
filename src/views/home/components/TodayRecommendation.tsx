import React, { useMemo } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import MyDate from "../../../components/date/MyDate.tsx";
import { Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { mockArticles, DAILY_RECOMMENDATION_ID } from "../../strategy/data";

const TodayRecommendation: React.FC = () => {
  const current_time = new Date();
  const navigate = useNavigate();

  // 动态取推荐文章，不写死
  const article = useMemo(
    () => mockArticles.find((a) => a.id === DAILY_RECOMMENDATION_ID) ?? mockArticles.find((a) => a.featured),
    []
  );

  const handleClick = () => {
    if (article) {
      navigate(`/strategy/${article.id}`);
    } else {
      navigate("/strategy");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "w-full",
        "h-[320px]",
        "overflow-hidden",
        "relative",
        "rounded-2xl",
        "group",
        "cursor-pointer"
      )}
    >
      {/* 背景图片 */}
      <img
        src={article?.coverImage ?? "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80"}
        alt={article?.title ?? "每日推荐"}
        className={classNames(
          "object-cover",
          "w-full",
          "h-full",
          "bg-transparent",
          "duration-300",
          "group-hover:scale-110",
          "transition-transform"
        )}
      />

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* 日期 */}
      <div className="absolute top-6 left-8">
        <MyDate date={current_time.toDateString()} />
      </div>

      {/* 标题与标签 */}
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Tag color="blue" className="!text-white !bg-white/20 !border-white/30 backdrop-blur-sm">
            今日精选
          </Tag>
          {article?.tags.slice(0, 1).map((tag) => (
            <Tag key={tag} color="purple" className="!text-white !bg-white/20 !border-white/30 backdrop-blur-sm">
              {tag}
            </Tag>
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg mb-1">
          {article?.title ?? "精彩旅行推荐"}
        </h3>
        <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
          {article?.summary.slice(0, 50) ?? "点击查看完整攻略"}
          <RightOutlined className="text-xs" />
        </p>
      </div>
    </div>
  );
};

export default TodayRecommendation;
