import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Statistic, Row, Col, Tag, Empty, Tabs, List, Avatar } from "antd";
import {
  EditOutlined, FileTextOutlined, EyeOutlined, LikeOutlined,
  CommentOutlined, ArrowLeftOutlined, PlusOutlined,
} from "@ant-design/icons";
import type { RootState, RootDispatch } from "../../store";
import { setMockStats } from "../../store/reducers/user";
import { mockArticles } from "../strategy/data";
import ArticleCard from "../../components/article/ArticleCard.tsx";

const CreatorCenter: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const userArticles = mockArticles.filter((a) => a.author.name === user.username);
  const totalViews = userArticles.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = userArticles.reduce((sum, a) => sum + a.likes, 0);
  const totalComments = userArticles.reduce((sum, a) => sum + a.commentCount, 0);

  useEffect(() => {
    dispatch(setMockStats({ articleCount: userArticles.length }));
  }, [dispatch, userArticles.length]);

  if (user.role !== "creator") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Empty description="此页面仅创作者可访问">
          <Button type="primary" onClick={() => navigate("/user/profile")}>返回个人中心</Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 顶部 */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <button onClick={() => navigate("/user/profile")} className="text-white/70 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors">
            <ArrowLeftOutlined /> 返回个人中心
          </button>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">创作中心</h1>
          <p className="text-white/70 text-sm">管理你的文章，查看数据表现</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8">
        {/* 数据概览 */}
        <Row gutter={16} className="mb-8">
          <Col xs={12} sm={6}><Card className="!rounded-2xl !shadow-md !border-0"><Statistic title="总阅读量" value={totalViews} prefix={<EyeOutlined />} /></Card></Col>
          <Col xs={12} sm={6}><Card className="!rounded-2xl !shadow-md !border-0"><Statistic title="总获赞" value={totalLikes} prefix={<LikeOutlined />} /></Card></Col>
          <Col xs={12} sm={6}><Card className="!rounded-2xl !shadow-md !border-0"><Statistic title="总评论" value={totalComments} prefix={<CommentOutlined />} /></Card></Col>
          <Col xs={12} sm={6}><Card className="!rounded-2xl !shadow-md !border-0"><Statistic title="已发布" value={userArticles.length} prefix={<FileTextOutlined />} /></Card></Col>
        </Row>

        {/* 快捷操作 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate("/strategy")}
            className="!rounded-xl !h-12 !text-base !font-semibold !bg-gradient-to-r !from-indigo-500 !to-purple-500 !border-0 !px-8"
          >
            写新文章
          </Button>
          <Button size="large" icon={<EditOutlined />} onClick={() => navigate("/strategy")} className="!rounded-xl !h-12">
            管理草稿
          </Button>
        </div>

        {/* 文章管理 */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Tabs items={[
            {
              key: "published",
              label: `已发布 (${userArticles.length})`,
              children: userArticles.length > 0 ? (
                <div className="space-y-2">
                  {userArticles.map((a) => (
                    <ArticleCard key={a.id} article={a} layout="feed" />
                  ))}
                </div>
              ) : (
                <Empty description="还没有发布文章" className="!py-10">
                  <Button type="primary" onClick={() => navigate("/strategy")} className="!rounded-full">去创作</Button>
                </Empty>
              ),
            },
            {
              key: "drafts",
              label: "草稿箱 (0)",
              children: (
                <Empty description="草稿箱为空" className="!py-10">
                  <Button type="primary" className="!rounded-full">开始写作</Button>
                </Empty>
              ),
            },
            {
              key: "analytics",
              label: "数据分析",
              children: (
                <div className="text-center py-10 text-gray-400">
                  <p>更详细的数据分析功能即将上线 📊</p>
                </div>
              ),
            },
          ]} />
        </div>
      </section>
    </div>
  );
};

export default CreatorCenter;
