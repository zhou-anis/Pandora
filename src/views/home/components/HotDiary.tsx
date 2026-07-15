import React from "react";
import { Avatar, List, Tag } from "antd";
import {
  LikeOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

/** mock 攻略数据 */
const mockDiaries = [
  {
    id: 1,
    title: "爱旅行的妖精",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    image: "/diary/hotest.jpeg",
    tag: "自驾",
    content:
      "今年是值得纪念的一年，告别了陪伴我10年的小蓝，后面的十年将是G318（大黄蜂）带我走南闯北的日子！不能浪费四驱、越野、空悬——318川藏线，我们来了！",
    likes: 2341,
    stars: 856,
    views: 12580,
  },
  {
    id: 2,
    title: "在路上の小林",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    image: "/diary/hotest.jpeg",
    tag: "海岛",
    content:
      "马尔代夫发呆日记🌊 在印度洋的中央，每天的生活就是潜水、看书、看日落。原来这个世界可以如此安静，如此蓝。强烈推荐芙花芬岛的水屋！",
    likes: 1892,
    stars: 723,
    views: 9876,
  },
  {
    id: 3,
    title: "环球美食家CC",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
    image: "/diary/hotest.jpeg",
    tag: "美食",
    content:
      "东京米其林扫街指南🍣 三天吃了14家店，从筑地市场的海鲜丼到银座的寿司之神，整理了这份超详细攻略。每个店都附了人均价格和排队时间！",
    likes: 3201,
    stars: 1102,
    views: 18900,
  },
  {
    id: 4,
    title: "山野闲人老张",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
    image: "/diary/hotest.jpeg",
    tag: "徒步",
    content:
      "雨崩徒步全攻略⛰️ 从西当村进，神瀑-冰湖-神湖三条线都走了一遍。详细整理了装备清单、海拔变化、住宿推荐。适合第一次去雨崩的朋友收藏！",
    likes: 1567,
    stars: 634,
    views: 7654,
  },
];

const HotDiary: React.FC = () => {
  const navigate = useNavigate();

  const goDetails = (diaryID: number) => {
    console.log("view diary:", diaryID);
    navigate("/diary");
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={mockDiaries}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className={classNames("!border-0 !px-0 !py-4")}
            extra={
              <div className="relative overflow-hidden rounded-xl ml-4">
                <img
                  draggable={false}
                  width={200}
                  height={140}
                  alt={item.title}
                  src={item.image}
                  className={classNames(
                    "rounded-xl",
                    "cursor-pointer",
                    "object-cover",
                    "w-[200px] h-[140px]",
                    "hover:scale-105 transition-transform duration-300"
                  )}
                  onClick={() => goDetails(item.id)}
                />
              </div>
            }
          >
            {/* 标题行 */}
            <div className="flex items-center gap-2 mb-2">
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size="large" />}
                title={
                  <span className="text-base font-semibold text-gray-800">
                    {item.title}
                  </span>
                }
                className="!mb-0"
              />
              <Tag color="cyan" className="ml-2">
                {item.tag}
              </Tag>
            </div>

            {/* 内容摘要 */}
            <div
              onClick={() => goDetails(item.id)}
              className="cursor-pointer hover:text-blue-600 text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3"
            >
              {item.content}
            </div>

            {/* 互动数据 */}
            <div className="flex items-center gap-5 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <EyeOutlined /> {item.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <LikeOutlined /> {item.likes.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <StarOutlined /> {item.stars.toLocaleString()}
              </span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default HotDiary;
