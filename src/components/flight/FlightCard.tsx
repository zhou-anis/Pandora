import React, { useState } from "react";
import { Tag, Modal, message } from "antd";
import { SwapRightOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import type { Flight } from "../../views/flight/data";

interface Props {
  flight: Flight;
  className?: string;
}

const priceBarColor: Record<Flight["priceLevel"], string> = {
  deal: "bg-emerald-400",
  normal: "bg-amber-400",
  high: "bg-rose-400",
};

const priceLabel: Record<Flight["priceLevel"], string> = {
  deal: "超值",
  normal: "正常",
  high: "偏贵",
};

const FlightCard: React.FC<Props> = ({ flight, className }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBook = () => {
    message.success(`已预订 ${flight.airline} ${flight.flightNo}！¥${flight.price.toLocaleString()}`);
    setBookingOpen(false);
  };

  return (
    <>
    <Modal
      open={bookingOpen}
      onCancel={() => setBookingOpen(false)}
      onOk={handleBook}
      okText="确认预订"
      cancelText="取消"
      title="确认预订"
      className="!rounded-2xl"
    >
      <div className="space-y-3 py-2">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{flight.airlineCode}</div>
          <div>
            <p className="font-semibold text-slate-800">{flight.airline} · {flight.flightNo}</p>
            <p className="text-slate-500 text-xs">{flight.aircraft}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-center p-3">
          <div>
            <p className="text-2xl font-bold">{flight.departTime}</p>
            <p className="text-slate-500 text-xs">{flight.departCity}({flight.departCode})</p>
          </div>
          <div className="text-slate-400 text-xs">
            <p>{flight.duration}</p>
            <SwapRightOutlined className="mx-2" />
            <p>{flight.stops === 0 ? "直飞" : `${flight.stops}停`}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{flight.arriveTime}</p>
            <p className="text-slate-500 text-xs">{flight.arriveCity}({flight.arriveCode})</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <span className="text-slate-600">票价</span>
          <span className="text-2xl font-extrabold text-orange-500">¥{flight.price.toLocaleString()}</span>
        </div>
        {flight.originalPrice && (
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>原价</span>
            <span className="line-through">¥{flight.originalPrice.toLocaleString()}</span>
          </div>
        )}
      </div>
    </Modal>

    <div className={classNames("bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer overflow-hidden", className)}>
      <div className="flex">
        {/* 价格脉动条 — Signature */}
        <div className={classNames("w-1.5 flex-shrink-0", priceBarColor[flight.priceLevel])} />

        <div className="flex-1 p-5 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* 航司 & 航班号 */}
            <div className="flex items-center gap-3 w-40 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                {flight.airlineCode}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{flight.airline}</p>
                <p className="text-slate-400 text-xs">{flight.flightNo}</p>
              </div>
            </div>

            {/* 时间 & 航线 */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <div className="text-center flex-shrink-0">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{flight.departTime}</p>
                <p className="text-slate-500 text-xs mt-0.5">{flight.departCode}</p>
              </div>

              <div className="flex-1 flex flex-col items-center min-w-0 px-1">
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <ClockCircleOutlined />
                  {flight.duration}
                </p>
                <div className="w-full flex items-center my-1">
                  <div className="flex-1 border-t border-dashed border-slate-300" />
                  <SwapRightOutlined className="text-slate-300 mx-1 text-xs" />
                  <div className="flex-1 border-t border-dashed border-slate-300" />
                </div>
                <p className="text-slate-400 text-xs">
                  {flight.stops === 0 ? "直飞" : `${flight.stops}停 · ${flight.stopCity}`}
                </p>
              </div>

              <div className="text-center flex-shrink-0">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{flight.arriveTime}</p>
                <p className="text-slate-500 text-xs mt-0.5">{flight.arriveCode}</p>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1 flex-shrink-0">
              {flight.tags.slice(0, 2).map((t) => (
                <Tag key={t} className="!rounded-full !text-xs !py-0 !px-2 !bg-slate-50 !text-slate-500 !border-slate-200">
                  {t}
                </Tag>
              ))}
              {flight.originalPrice && (
                <Tag className="!rounded-full !text-xs !py-0 !px-2 !bg-emerald-50 !text-emerald-600 !border-emerald-200">
                  -{Math.round((1 - flight.price / flight.originalPrice) * 100)}%
                </Tag>
              )}
            </div>

            {/* 价格 & 预订 */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-xs text-slate-400">¥</span>
                <span className="text-2xl font-extrabold text-orange-500">{flight.price.toLocaleString()}</span>
              </div>
              {flight.originalPrice && (
                <p className="text-slate-300 text-xs line-through">¥{flight.originalPrice.toLocaleString()}</p>
              )}
              <span className={classNames(
                "inline-block text-xs px-2 py-0.5 rounded-full mt-1",
                flight.priceLevel === "deal" ? "bg-emerald-50 text-emerald-600" :
                flight.priceLevel === "high" ? "bg-rose-50 text-rose-600" :
                "bg-amber-50 text-amber-600"
              )}>
                {priceLabel[flight.priceLevel]}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setBookingOpen(true); }}
                className="block mt-2 px-5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                预订
              </button>
            </div>
          </div>

          {/* 机型 */}
          <p className="text-slate-400 text-xs mt-3 pt-3 border-t border-slate-50 flex items-center gap-3">
            <span>{flight.aircraft}</span>
            <span>{flight.departCity}({flight.departCode}) → {flight.arriveCity}({flight.arriveCode})</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default FlightCard;
