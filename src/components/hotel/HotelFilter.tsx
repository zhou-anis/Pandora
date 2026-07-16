import React from "react";
import { Checkbox, Slider, Divider, Button } from "antd";
import {
  StarFilled,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

interface FilterState {
  priceRange: [number, number];
  stars: number[];
  types: string[];
  amenities: string[];
  city: string;
}

interface Props {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  starOptions: { value: number; label: string }[];
  typeOptions: { value: string; label: string }[];
  amenityOptions: string[];
  cityOptions: { value: string; label: string }[];
  priceMin: number;
  priceMax: number;
}

const HotelFilter: React.FC<Props> = ({
  filter,
  onChange,
  starOptions,
  typeOptions,
  amenityOptions,
  cityOptions,
  priceMin,
  priceMax,
}) => {
  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filter, ...patch });
  };

  const resetAll = () => {
    onChange({
      priceRange: [priceMin, priceMax],
      stars: [],
      types: [],
      amenities: [],
      city: "all",
    });
  };

  const hasFilter =
    filter.stars.length > 0 ||
    filter.types.length > 0 ||
    filter.amenities.length > 0 ||
    filter.city !== "all" ||
    filter.priceRange[0] !== priceMin ||
    filter.priceRange[1] !== priceMax;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <FilterOutlined className="text-blue-500" />
          筛选条件
        </h3>
        {hasFilter && (
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={resetAll}
            className="!text-gray-400 hover:!text-blue-500 !text-xs"
          >
            重置
          </Button>
        )}
      </div>

      {/* 城市 */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">城市</h4>
        <div className="flex flex-wrap gap-2">
          {cityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update({ city: opt.value })}
              className={classNames(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                filter.city === opt.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Divider className="!my-4" />

      {/* 价格范围 */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          价格范围（每晚）
        </h4>
        <Slider
          range
          min={priceMin}
          max={priceMax}
          step={100}
          value={filter.priceRange}
          onChange={(v) => update({ priceRange: v as [number, number] })}
          tooltip={{ formatter: (v) => `¥${v}` }}
          className="!mx-1"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>¥{filter.priceRange[0]}</span>
          <span>¥{filter.priceRange[1]}</span>
        </div>
      </div>

      <Divider className="!my-4" />

      {/* 星级 */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">酒店星级</h4>
        <Checkbox.Group
          value={filter.stars}
          onChange={(v) => update({ stars: v as number[] })}
          className="flex flex-col gap-2"
        >
          {starOptions.map((opt) => (
            <Checkbox key={opt.value} value={opt.value} className="!text-sm !text-gray-600">
              <span className="flex items-center gap-1">
                {Array.from({ length: opt.value }).map((_, i) => (
                  <StarFilled key={i} className="text-yellow-400 text-xs" />
                ))}
              </span>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="!my-4" />

      {/* 酒店类型 */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">酒店类型</h4>
        <Checkbox.Group
          value={filter.types}
          onChange={(v) => update({ types: v as string[] })}
          className="flex flex-col gap-2"
        >
          {typeOptions
            .filter((t) => t.value !== "all")
            .map((opt) => (
              <Checkbox key={opt.value} value={opt.value} className="!text-sm !text-gray-600">
                {opt.label}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>

      <Divider className="!my-4" />

      {/* 设施 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">设施服务</h4>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((a) => (
            <button
              key={a}
              onClick={() => {
                const next = filter.amenities.includes(a)
                  ? filter.amenities.filter((x) => x !== a)
                  : [...filter.amenities, a];
                update({ amenities: next });
              }}
              className={classNames(
                "px-3 py-1 rounded-full text-xs transition-all",
                filter.amenities.includes(a)
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { FilterState };
export default HotelFilter;
