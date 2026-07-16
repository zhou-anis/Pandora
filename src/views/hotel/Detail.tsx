import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Rate,
  Tag,
  Button,
  Divider,
  Empty,
  DatePicker,
  Select,
  InputNumber,
  Avatar,
} from "antd";
import {
  EnvironmentOutlined,
  ArrowLeftOutlined,
  StarFilled,
  WifiOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { mockHotels } from "./data";
import type { Hotel } from "./data";

const { RangePicker } = DatePicker;

/** 模拟房型 */
const mockRooms = [
  { name: "标准大床房", size: "28m²", bed: "1张大床", guests: 2, price: 680, originalPrice: 880, breakfast: false, cancel: "入住前24小时免费取消" },
  { name: "豪华双床房", size: "35m²", bed: "2张单人床", guests: 2, price: 880, originalPrice: 1080, breakfast: true, cancel: "入住前24小时免费取消" },
  { name: "行政套房", size: "55m²", bed: "1张特大床", guests: 2, price: 1580, originalPrice: 1980, breakfast: true, cancel: "入住前48小时免费取消" },
  { name: "家庭套房", size: "65m²", bed: "1张大床+1张沙发床", guests: 4, price: 1980, breakfast: true, cancel: "入住前48小时免费取消" },
];

/** 模拟评价 */
const mockReviews = [
  { author: "旅行达人小王", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=a1", rating: 5, date: "2025-12-15", content: "位置太好了，出门就是地铁站。房间干净整洁，前台服务热情周到。下次还来！", stay: "商务出行" },
  { author: "蜜月旅人", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=a2", rating: 5, date: "2025-12-10", content: "蜜月旅行选择了套房，景观绝佳。酒店送了香槟和玫瑰花，非常贴心。", stay: "蜜月旅行" },
  { author: "背包客小李", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=a3", rating: 4, date: "2025-12-05", content: "性价比不错的选择。早餐种类丰富，健身房设施也很新。唯一遗憾是泳池偏小。", stay: "独自旅行" },
  { author: "家庭出游", avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=a4", rating: 4, date: "2025-11-28", content: "家庭套房空间很大，孩子们很喜欢。儿童俱乐部的工作人员很负责。推荐！", stay: "家庭出游" },
];

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotelId = Number(id);

  const hotel = useMemo(() => mockHotels.find((h) => h.id === hotelId), [hotelId]);

  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Empty description="酒店不存在或已下架">
          <Button type="primary" onClick={() => navigate("/hotel")}>返回酒店列表</Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ========== 顶部图集区 ========== */}
      <section className="relative w-full h-[450px] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />
        <button
          onClick={() => navigate("/hotel")}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-md
            text-white rounded-full text-sm hover:bg-white/30 transition-all"
        >
          <ArrowLeftOutlined /> 返回列表
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 text-white">
          <div className="flex gap-2 mb-3">
            {hotel.tags.map((t) => (
              <Tag key={t} className="!bg-white/20 !text-white !border-white/30 !rounded-full !text-xs backdrop-blur-sm">{t}</Tag>
            ))}
            {hotel.discount && (
              <Tag className="!bg-red-500/80 !text-white !border-0 !rounded-full !text-xs backdrop-blur-sm">-{hotel.discount}%</Tag>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-2">{hotel.name}</h1>
          <p className="text-white/70 text-sm mb-3">{hotel.nameEn}</p>
          <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1"><EnvironmentOutlined />{hotel.address}</span>
            <span className="flex items-center gap-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (<StarFilled key={i} className="text-yellow-400" />))}
            </span>
            <Rate disabled defaultValue={hotel.rating} allowHalf style={{ fontSize: 14, color: "#fadb14" }} />
            <span>{hotel.rating} ({hotel.reviewCount.toLocaleString()}条评价)</span>
          </div>
        </div>
      </section>

      {/* ========== 主体内容 ========== */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- 左侧详情 --- */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* 酒店简介 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">酒店简介</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{hotel.description}</p>
              <Divider className="!my-5" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">距离</p>
                  <p className="text-gray-700 font-medium">{hotel.distance}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">地址</p>
                  <p className="text-gray-700 font-medium">{hotel.city} · {hotel.country}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">星级</p>
                  <p className="text-gray-700 font-medium">{hotel.stars} 星级酒店</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">评分</p>
                  <p className="text-gray-700 font-medium">{hotel.rating} / 5.0</p>
                </div>
              </div>
            </div>

            {/* 设施服务 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">设施服务</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hotel.amenities.map((a) => (
                  <span key={a} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircleOutlined className="text-green-500" />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* 房型选择 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">房型选择</h2>
              <div className="space-y-3">
                {mockRooms.map((room, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800">{room.name}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">{room.size} · {room.bed} · 最多{room.guests}人</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        {room.breakfast && <Tag className="!text-xs !rounded-full" color="green">含早餐</Tag>}
                        <span>{room.cancel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-orange-500 font-bold text-xl">¥{room.price}</p>
                        {room.originalPrice && (
                          <p className="text-gray-300 text-xs line-through">¥{room.originalPrice}</p>
                        )}
                      </div>
                      <Button type="primary" className="!rounded-full !bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0">
                        预订
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 住客评价 */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                住客评价 <span className="text-blue-500 text-base">({mockReviews.length})</span>
              </h2>
              <div className="space-y-5">
                {mockReviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar src={review.avatar} icon={<UserOutlined />} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800 text-sm">{review.author}</span>
                          <Tag className="!text-xs !rounded-full">{review.stay}</Tag>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Rate disabled defaultValue={review.rating} style={{ fontSize: 12 }} />
                          <span className="text-gray-400 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- 右侧预订卡片（悬浮） --- */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-orange-500 font-bold text-2xl">¥{hotel.price}</span>
                  <span className="text-gray-400 text-xs">/ 晚（起）</span>
                </div>
                {hotel.originalPrice && (
                  <p className="text-gray-300 text-xs line-through -mt-3 mb-4">¥{hotel.originalPrice}</p>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">入住 - 离店</label>
                    <RangePicker className="w-full !rounded-xl" size="large" placeholder={["入住", "离店"]} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">房客</label>
                      <Select value={guests} onChange={setGuests} className="w-full" size="large"
                        options={[1,2,3,4].map(n => ({ value: n, label: `${n} 位` }))} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">房间</label>
                      <InputNumber value={rooms} onChange={(v) => setRooms(v || 1)} min={1} max={5} className="w-full" size="large" />
                    </div>
                  </div>
                  <Button type="primary" size="large" block
                    className="!rounded-xl !h-12 !text-base !font-semibold !bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0 !shadow-lg hover:!shadow-xl">
                    <SearchOutlined /> 查看可订房型
                  </Button>
                </div>

                <Divider className="!my-4" />
                <div className="text-xs text-gray-400 space-y-1.5">
                  <p className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 免费取消（大部分房型）</p>
                  <p className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 无需预付 — 到店付款</p>
                  <p className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 价格保障 — 买贵退差价</p>
                </div>

                <Divider className="!my-4" />
                <div className="text-xs text-gray-400 space-y-1.5">
                  <p className="flex items-center gap-1"><PhoneOutlined /> 客服热线: 400-888-9999</p>
                  <p className="flex items-center gap-1"><MailOutlined /> hotel@pandora-travel.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
