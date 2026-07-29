import React from "react";
import { Checkbox, Slider, Divider } from "antd";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import classNames from "classnames";

interface FilterState {
  stops: string[];
  airlines: string[];
  priceRange: [number, number];
  departureTime: string;
}

interface Props {
  filter: FilterState;
  onChange: (f: FilterState) => void;
  airlines: { code: string; name: string }[];
  priceMin: number;
  priceMax: number;
}

const FlightFilter: React.FC<Props> = ({ filter, onChange, airlines, priceMin, priceMax }) => {
  const update = (patch: Partial<FilterState>) => onChange({ ...filter, ...patch });

  const hasFilter = filter.stops.length > 0 || filter.airlines.length > 0 ||
    filter.departureTime !== "all" || filter.priceRange[0] !== priceMin || filter.priceRange[1] !== priceMax;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
          <FilterOutlined className="text-blue-500" /> 筛选
        </h3>
        {hasFilter && (
          <button
            onClick={() => onChange({ stops: [], airlines: [], priceRange: [priceMin, priceMax], departureTime: "all" })}
            className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
          >
            <ReloadOutlined /> 重置
          </button>
        )}
      </div>

      {/* 经停 */}
      <div className="mb-5">
        <h4 className="text-xs font-semibold text-slate-600 mb-2.5">经停</h4>
        <Checkbox.Group value={filter.stops} onChange={(v) => update({ stops: v as string[] })} className="flex flex-col gap-2">
          {[{ value: "0", label: "直飞" }, { value: "1", label: "1次经停" }].map((o) => (
            <Checkbox key={o.value} value={o.value} className="!text-sm !text-slate-600">{o.label}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="!my-3" />

      {/* 出发时间 */}
      <div className="mb-5">
        <h4 className="text-xs font-semibold text-slate-600 mb-2.5">出发时间</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "全部" },
            { value: "morning", label: "清晨" },
            { value: "day", label: "白天" },
            { value: "night", label: "晚间" },
          ].map((o) => (
            <button
              key={o.value}
              onClick={() => update({ departureTime: o.value })}
              className={classNames(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                filter.departureTime === o.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <Divider className="!my-3" />

      {/* 航司 */}
      <div className="mb-5">
        <h4 className="text-xs font-semibold text-slate-600 mb-2.5">航空公司</h4>
        <Checkbox.Group value={filter.airlines} onChange={(v) => update({ airlines: v as string[] })} className="flex flex-col gap-2">
          {airlines.map((a) => (
            <Checkbox key={a.code} value={a.code} className="!text-sm !text-slate-600">{a.name}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Divider className="!my-3" />

      {/* 价格范围 */}
      <div>
        <h4 className="text-xs font-semibold text-slate-600 mb-3">价格范围</h4>
        <Slider
          range
          min={priceMin}
          max={priceMax}
          step={100}
          value={filter.priceRange}
          onChange={(v) => update({ priceRange: v as [number, number] })}
          tooltip={{ formatter: (v) => `¥${v?.toLocaleString()}` }}
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>¥{filter.priceRange[0].toLocaleString()}</span>
          <span>¥{filter.priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export type { FilterState };
export default FlightFilter;
