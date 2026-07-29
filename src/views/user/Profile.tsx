import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Tag, Tabs, Input, message, Card, Statistic, Row, Col } from "antd";
import {
  EditOutlined, UserOutlined, MailOutlined, PhoneOutlined,
  TrophyOutlined, FileTextOutlined, HeartOutlined, TeamOutlined,
  CalendarOutlined, EnvironmentOutlined, SaveOutlined, CloseOutlined,
} from "@ant-design/icons";
import type { RootState, RootDispatch } from "../../store";
import { updateProfile, setMockStats, upgradeToCreator } from "../../store/reducers/user";
import { mockArticles } from "../strategy/data";
import ArticleCard from "../../components/article/ArticleCard.tsx";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: user.username || "", bio: user.bio || "", phone: user.phone || "", email: user.email || "" });

  // 初始化 mock 统计数据
  useEffect(() => {
    dispatch(setMockStats({
      articleCount: user.role === "creator" ? 5 : 0,
      followerCount: 1280,
      likeCount: 3560,
      joinDate: "2024-06-15",
    }));
  }, [dispatch, user.role]);

  const handleSave = () => {
    dispatch(updateProfile(form));
    message.success("个人资料已更新");
    setEditing(false);
  };

  const userArticles = mockArticles.filter((a) => a.author.name === user.username);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 顶部背景卡片 */}
      <section className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200')] bg-cover bg-center" />
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        {/* 头像 & 基础信息 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar src={user.avatar} size={96} icon={<UserOutlined />} className="border-4 border-white shadow-md flex-shrink-0 -mt-16 sm:-mt-24" />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-800">{user.username || "旅行者"}</h1>
                <Tag className="!rounded-full !text-xs" color={user.role === "creator" ? "purple" : "blue"}>
                  {user.role === "creator" ? "创作者 ✍️" : "旅行者 🌍"}
                </Tag>
              </div>
              <p className="text-gray-500 text-sm mb-3">{user.bio || "这个人很懒，还没有写个人简介..."}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 justify-center sm:justify-start">
                <span><CalendarOutlined className="mr-1" />{user.joinDate} 加入</span>
                <span><MailOutlined className="mr-1" />{user.email || "未绑定"}</span>
                <span><PhoneOutlined className="mr-1" />{user.phone || "未绑定"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {!editing ? (
                <Button icon={<EditOutlined />} onClick={() => setEditing(true)} className="!rounded-full">编辑资料</Button>
              ) : (
                <>
                  <Button icon={<SaveOutlined />} type="primary" onClick={handleSave} className="!rounded-full !bg-blue-500">保存</Button>
                  <Button icon={<CloseOutlined />} onClick={() => setEditing(false)} className="!rounded-full">取消</Button>
                </>
              )}
            </div>
          </div>

          {/* 编辑表单 */}
          {editing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">用户名</label>
                <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="!rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">手机号</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="!rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">邮箱</label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="!rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">个人简介</label>
                <Input.TextArea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} className="!rounded-xl" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：统计 + Tab */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <Row gutter={16}>
                <Col span={6}><Statistic title="关注" value={user.followerCount} prefix={<TeamOutlined />} /></Col>
                <Col span={6}><Statistic title="获赞" value={user.likeCount} prefix={<HeartOutlined />} /></Col>
                <Col span={6}><Statistic title="文章" value={user.articleCount} prefix={<FileTextOutlined />} /></Col>
                <Col span={6}><Statistic title="成就" value={3} prefix={<TrophyOutlined />} /></Col>
              </Row>
            </div>

            {/* 用户文章 / 收藏 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <Tabs
                items={[
                  {
                    key: "articles",
                    label: "我的文章",
                    children: userArticles.length > 0 ? (
                      <div className="space-y-2">
                        {userArticles.map((a) => (
                          <ArticleCard key={a.id} article={a} layout="feed" />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-400">
                        <FileTextOutlined className="text-4xl mb-3 block" />
                        <p>还没有发布过文章</p>
                        {user.role === "creator" ? (
                          <Button type="primary" onClick={() => navigate("/user/creator")} className="!rounded-full !mt-3">去创作</Button>
                        ) : (
                          <Button type="primary" onClick={() => dispatch(upgradeToCreator())} className="!rounded-full !mt-3">升级为创作者</Button>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: "likes",
                    label: "我的收藏",
                    children: (
                      <div className="text-center py-10 text-gray-400">
                        <HeartOutlined className="text-4xl mb-3 block" />
                        <p>收藏夹里还没有内容</p>
                        <Button type="link" onClick={() => navigate("/strategy")}>去发现精彩攻略</Button>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          {/* 右侧：快捷入口 */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
            {user.role !== "creator" && (
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-md p-6 text-white text-center">
                <h3 className="font-bold text-lg mb-1">成为创作者 ✍️</h3>
                <p className="text-white/70 text-xs mb-4">分享你的旅行故事，让更多人看到</p>
                <Button
                  onClick={() => {
                    dispatch(upgradeToCreator());
                    message.success("恭喜！你已成为创作者，快去写第一篇文章吧 ✨");
                  }}
                  className="!rounded-full !bg-white !text-purple-600 !font-semibold !border-0"
                  block
                >
                  立即升级
                </Button>
              </div>
            )}

            {user.role === "creator" && (
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-md p-6 text-white text-center">
                <h3 className="font-bold text-lg mb-1">创作中心 ✍️</h3>
                <p className="text-white/70 text-xs mb-4">{user.articleCount} 篇文章已发布</p>
                <Button
                  onClick={() => navigate("/user/creator")}
                  className="!rounded-full !bg-white !text-blue-600 !font-semibold !border-0"
                  block
                >
                  进入创作中心
                </Button>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md p-5">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">快捷入口</h4>
              <div className="space-y-1 text-sm">
                {[
                  { icon: "📝", label: "我的攻略", path: "/strategy" },
                  { icon: "🏨", label: "酒店订单", path: "/hotel" },
                  { icon: "❤️", label: "收藏夹", path: "/user/profile" },
                  { icon: "⚙️", label: "账号设置", path: "/user/profile" },
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
