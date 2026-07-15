import React, { useState } from "react";
import type { HTMLAriaDataAttributes } from "antd/es/_util/aria-data-attrs";
import { Cascader, type CascaderProps, DatePicker, Select, InputNumber } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { Dayjs } from "dayjs";

type Option = {
  value: string;
  label: string;
  children?: Option[];
} & HTMLAriaDataAttributes;

const cityOptions: Option[] = [
  {
    value: "国内",
    label: "🇨🇳 国内",
    children: [
      { value: "北京", label: "北京", children: [{ value: "北京市", label: "北京市" }] },
      { value: "上海", label: "上海", children: [{ value: "上海市", label: "上海市" }] },
      { value: "杭州", label: "杭州", children: [{ value: "杭州市", label: "杭州市" }] },
      { value: "成都", label: "成都", children: [{ value: "成都市", label: "成都市" }] },
      { value: "三亚", label: "三亚", children: [{ value: "三亚市", label: "三亚市" }] },
      { value: "丽江", label: "丽江", children: [{ value: "丽江市", label: "丽江市" }] },
      { value: "西安", label: "西安", children: [{ value: "西安市", label: "西安市" }] },
      { value: "广东省", label: "广东省",
        children: [
          { value: "广州市", label: "广州市" },
          { value: "深圳市", label: "深圳市" },
        ],
      },
      { value: "江苏省", label: "江苏省",
        children: [
          { value: "南京市", label: "南京市" },
          { value: "苏州市", label: "苏州市" },
        ],
      },
    ],
  },
  {
    value: "国外",
    label: "🌏 国外",
    children: [
      { value: "东京", label: "东京", children: [{ value: "东京", label: "东京" }] },
      { value: "曼谷", label: "曼谷", children: [{ value: "曼谷", label: "曼谷" }] },
      { value: "首尔", label: "首尔", children: [{ value: "首尔", label: "首尔" }] },
      { value: "巴厘岛", label: "巴厘岛", children: [{ value: "巴厘岛", label: "巴厘岛" }] },
      { value: "巴黎", label: "巴黎", children: [{ value: "巴黎", label: "巴黎" }] },
      { value: "新加坡", label: "新加坡", children: [{ value: "新加坡", label: "新加坡" }] },
      { value: "悉尼", label: "悉尼", children: [{ value: "悉尼", label: "悉尼" }] },
      { value: "纽约", label: "纽约", children: [{ value: "纽约", label: "纽约" }] },
      { value: "清迈", label: "清迈", children: [{ value: "清迈", label: "清迈" }] },
    ],
  },
];

const HotelSelection: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>("");
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const onCityChange: CascaderProps<Option>["onChange"] = (value) => {
    if (value && value.length > 0) {
      setCity(value[value.length - 1] as string);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (dates?.[0]) params.set("checkin", dates[0].format("YYYY-MM-DD"));
    if (dates?.[1]) params.set("checkout", dates[1].format("YYYY-MM-DD"));
    params.set("guests", String(guests));
    params.set("rooms", String(rooms));
    navigate(`/hotel?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full inline-block" />
        搜索酒店
      </h3>

      {/* 目的地 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          目的地
        </label>
        <Cascader
          options={cityOptions}
          onChange={onCityChange}
          placeholder="选择城市或地区"
          className="w-full"
          size="large"
          showSearch
        />
      </div>

      {/* 入住 / 离店日期 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          入住 - 离店日期
        </label>
        <DatePicker.RangePicker
          placeholder={["入住时间", "离店时间"]}
          className="w-full"
          size="large"
          value={dates as any}
          onChange={(v) => setDates(v as [Dayjs | null, Dayjs | null])}
        />
      </div>

      {/* 房客 & 房间数 */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            房客数
          </label>
          <Select
            value={guests}
            onChange={setGuests}
            className="w-full"
            size="large"
            options={[
              { value: 1, label: "1 位" },
              { value: 2, label: "2 位" },
              { value: 3, label: "3 位" },
              { value: 4, label: "4 位" },
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            房间数
          </label>
          <InputNumber
            value={rooms}
            onChange={(v) => setRooms(v || 1)}
            min={1}
            max={10}
            className="w-full"
            size="large"
          />
        </div>
      </div>

      {/* 搜索按钮 */}
      <button
        onClick={handleSearch}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500
          text-white font-semibold text-base hover:from-indigo-500 hover:to-purple-500
          shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <SearchOutlined />
        搜索酒店
      </button>
    </div>
  );
};

export default HotelSelection;
