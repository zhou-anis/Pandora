import React, { useState } from "react";
import { Modal, DatePicker, Select, InputNumber, Button, Divider, Tag, message } from "antd";
import {
  EnvironmentOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { Hotel } from "../../views/hotel/data";

const { RangePicker } = DatePicker;

interface RoomRow {
  name: string;
  size: string;
  bed: string;
  guests: number;
  price: number;
  originalPrice: number;
  breakfast: boolean;
  cancel: string;
}

interface Props {
  open: boolean;
  hotel: Hotel;
  onClose: () => void;
}

const ROOM_OPTIONS: RoomRow[] = [
  { name: "标准大床房", size: "28m²", bed: "1张大床", guests: 2, price: 680, originalPrice: 880, breakfast: false, cancel: "入住前24小时免费取消" },
  { name: "豪华双床房", size: "35m²", bed: "2张单人床", guests: 2, price: 880, originalPrice: 1080, breakfast: true, cancel: "入住前24小时免费取消" },
  { name: "行政套房", size: "55m²", bed: "1张特大床", guests: 2, price: 1580, originalPrice: 1980, breakfast: true, cancel: "入住前48小时免费取消" },
  { name: "家庭套房", size: "65m²", bed: "1张大床+1张沙发床", guests: 4, price: 1980, breakfast: true, cancel: "入住前48小时免费取消" },
];

const BookingModal: React.FC<Props> = ({ open, hotel, onClose }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomRow | null>(null);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [step, setStep] = useState<"select" | "confirm">("select");

  const totalNights = 1; // 简化：按1晚计算
  const subtotal = selectedRoom ? selectedRoom.price * rooms * totalNights : 0;
  const tax = Math.round(subtotal * 0.1);
  const totalPrice = subtotal + tax;

  const handleBook = () => {
    if (!selectedRoom) {
      message.warning("请先选择房型");
      return;
    }
    setStep("confirm");
  };

  const handleConfirm = () => {
    message.success(`预订成功！${hotel.name} - ${selectedRoom!.name}，¥${totalPrice}`);
    setStep("select");
    setSelectedRoom(null);
    onClose();
  };

  const handleClose = () => {
    setStep("select");
    setSelectedRoom(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={700}
      className="!rounded-2xl overflow-hidden"
      closeIcon={<CloseOutlined className="text-gray-400" />}
    >
      {/* 酒店名称 */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
          <p className="text-gray-400 text-xs flex items-center gap-1">
            <EnvironmentOutlined /> {hotel.city} · {hotel.country}
          </p>
        </div>
      </div>

      {step === "select" ? (
        <>
          {/* 搜索条件 */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">入住 - 离店日期</label>
              <RangePicker className="w-full !rounded-xl" size="large" placeholder={["入住", "离店"]} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">房客</label>
                <Select value={guests} onChange={setGuests} size="large" className="w-full"
                  options={[1, 2, 3, 4].map((n) => ({ value: n, label: `${n} 位` }))} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">房间</label>
                <InputNumber value={rooms} onChange={(v) => setRooms(v || 1)} min={1} max={5} size="large" className="w-full" />
              </div>
            </div>
          </div>

          {/* 房型列表 */}
          <h4 className="font-semibold text-gray-700 mb-3">选择房型</h4>
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {ROOM_OPTIONS.map((room, idx) => {
              const isSelected = selectedRoom?.name === room.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRoom(room)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${isSelected ? "border-blue-500 bg-blue-50/50 shadow-md" : "border-gray-100 hover:border-blue-200 hover:shadow-sm"}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold text-gray-800 text-sm">{room.name}</h5>
                      {room.breakfast && <Tag className="!text-xs !rounded-full" color="green">含早餐</Tag>}
                    </div>
                    <p className="text-gray-400 text-xs">{room.size} · {room.bed} · 最多{room.guests}人</p>
                    <p className="text-blue-500 text-xs mt-1">{room.cancel}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-orange-500 font-bold text-lg">¥{room.price}</p>
                    <p className="text-gray-300 text-xs line-through">¥{room.originalPrice}</p>
                    <p className="text-gray-400 text-xs">/ 晚</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
            <Button
              type="primary"
              size="large"
              onClick={handleBook}
              disabled={!selectedRoom}
              className="!rounded-xl !h-12 !px-10 !text-base !font-semibold !bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0"
            >
              下一步
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* 确认订单 */}
          <h4 className="font-semibold text-gray-700 mb-4">确认订单</h4>
          <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{selectedRoom!.name}</span>
              <span className="text-gray-700 font-medium">¥{selectedRoom!.price} × {rooms}间 × {totalNights}晚</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">入住日期</span>
              <span className="text-gray-700">2025-03-15 — 2025-03-16</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">房客 · 房间</span>
              <span className="text-gray-700">{guests}人 · {rooms}间</span>
            </div>
            <Divider className="!my-3" />
            <div className="flex justify-between">
              <span className="text-gray-500">小计</span>
              <span className="text-gray-700">¥{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">税费及服务费 (10%)</span>
              <span className="text-gray-700">¥{tax}</span>
            </div>
            <Divider className="!my-3" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-gray-800">总计</span>
              <span className="font-bold text-orange-500 text-xl">¥{totalPrice}</span>
            </div>
          </div>
          <div className="space-y-2 mt-4 text-xs text-gray-400">
            <p className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> {selectedRoom!.cancel}</p>
            <p className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> 无需预付 — 到店付款</p>
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <Button size="large" onClick={() => setStep("select")} className="!rounded-xl !h-12">返回修改</Button>
            <Button
              type="primary"
              size="large"
              onClick={handleConfirm}
              className="!rounded-xl !h-12 !px-10 !text-base !font-semibold !bg-gradient-to-r !from-orange-500 !to-red-500 !border-0"
            >
              确认预订 ¥{totalPrice}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BookingModal;
