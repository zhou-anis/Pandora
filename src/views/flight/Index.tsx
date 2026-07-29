import React, { useMemo, useState, useEffect } from "react";
import { Select, DatePicker, Segmented, Button, Empty, Pagination, Badge } from "antd";
import { SwapOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import FlightCard from "../../components/flight/FlightCard.tsx";
import FlightFilter, { type FilterState } from "../../components/flight/FlightFilter.tsx";
import { mockFlights, airlines, filterOptions } from "./data";
import type { Flight } from "./data";

const PAGE_SIZE = 5;

/** 城市列表（从数据中提取） */
const cityList = Array.from(new Set(mockFlights.flatMap((f) => [f.departCity, f.arriveCity]))).sort();

const FlightIndex: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paramFrom = searchParams.get("from") || "";
  const paramTo = searchParams.get("to") || "";

  const [tripType, setTripType] = useState<string>("round");
  const [from, setFrom] = useState<string>(cityList.includes(paramFrom) ? paramFrom : "北京");
  const [to, setTo] = useState<string>(cityList.includes(paramTo) ? paramTo : "东京");
  const [sortBy, setSortBy] = useState("recommended");
  const [page, setPage] = useState(1);

  const priceMin = 500;
  const priceMax = 8000;
  const [filter, setFilter] = useState<FilterState>({
    stops: [], airlines: [], priceRange: [priceMin, priceMax], departureTime: "all",
  });

  const filtered = useMemo(() => {
    let list: Flight[] = [...mockFlights];

    // 城市筛选
    if (from) list = list.filter((f) => f.departCity === from);
    if (to) list = list.filter((f) => f.arriveCity === to);

    // 经停
    if (filter.stops.length > 0) {
      list = list.filter((f) => filter.stops.includes(String(f.stops)));
    }
    // 航司
    if (filter.airlines.length > 0) {
      list = list.filter((f) => filter.airlines.includes(f.airlineCode));
    }
    // 时间
    if (filter.departureTime !== "all") {
      list = list.filter((f) => {
        const h = parseInt(f.departTime.split(":")[0], 10);
        if (filter.departureTime === "morning") return h < 8;
        if (filter.departureTime === "day") return h >= 8 && h < 18;
        if (filter.departureTime === "night") return h >= 18;
        return true;
      });
    }
    // 价格
    list = list.filter((f) => f.price >= filter.priceRange[0] && f.price <= filter.priceRange[1]);

    // 排序
    switch (sortBy) {
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "duration": list.sort((a, b) => a.durationMin - b.durationMin); break;
      case "depart-early": list.sort((a, b) => a.departTime.localeCompare(b.departTime)); break;
      case "depart-late": list.sort((a, b) => b.departTime.localeCompare(a.departTime)); break;
      default: list.sort((a, b) => a.price - b.price); break;
    }

    return list;
  }, [from, to, sortBy, filter]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // 当前结果涉及的航司
  const activeAirlines = useMemo(() => {
    const codes = Array.from(new Set(filtered.map((f) => f.airlineCode)));
    return codes.map((c) => airlines[c]).filter(Boolean);
  }, [filtered]);

  const handleSearch = () => { setPage(1); };

  const swapCities = () => { setFrom(to); setTo(from); };

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* ====== 搜索面板 ====== */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 pt-6 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">搜索机票</h1>

          {/* 行程类型 */}
          <div className="flex justify-center mb-4">
            <Segmented
              value={tripType}
              onChange={(v) => setTripType(v as string)}
              className="!bg-white/10 !backdrop-blur-sm [&_.ant-segmented-item-selected]:!bg-white [&_.ant-segmented-item-selected]:!text-blue-600 [&_.ant-segmented-item]:!text-white"
              options={[
                { value: "round", label: "往返" },
                { value: "oneway", label: "单程" },
                { value: "multi", label: "多程" },
              ]}
            />
          </div>

          {/* 搜索表单 */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* 出发 */}
              <div className="flex-1">
                <label className="text-xs text-slate-400 mb-1 block">出发地</label>
                <Select
                  showSearch value={from} onChange={setFrom} size="large"
                  className="w-full [&_.ant-select-selector]:!rounded-xl"
                  options={cityList.map((c) => ({ value: c, label: c }))}
                />
              </div>

              {/* 交换按钮 */}
              <button
                onClick={swapCities}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 flex items-center justify-center transition-colors self-end mb-1"
              >
                <SwapOutlined className="text-slate-500 rotate-90 md:rotate-0" />
              </button>

              {/* 到达 */}
              <div className="flex-1">
                <label className="text-xs text-slate-400 mb-1 block">到达地</label>
                <Select
                  showSearch value={to} onChange={setTo} size="large"
                  className="w-full [&_.ant-select-selector]:!rounded-xl"
                  options={cityList.map((c) => ({ value: c, label: c }))}
                />
              </div>

              {/* 日期 */}
              {tripType !== "multi" ? (
                <div className="flex-1">
                  <label className="text-xs text-slate-400 mb-1 block">{tripType === "round" ? "往返日期" : "出发日期"}</label>
                  <DatePicker.RangePicker
                    size="large" className="w-full [&_.ant-picker]:!rounded-xl"
                    placeholder={["出发", tripType === "round" ? "返回" : ""]}
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <label className="text-xs text-slate-400 mb-1 block">出发日期</label>
                  <DatePicker size="large" className="w-full [&_.ant-picker]:!rounded-xl" />
                </div>
              )}

              {/* 乘客 */}
              <div className="w-32 flex-shrink-0">
                <label className="text-xs text-slate-400 mb-1 block">乘客</label>
                <Select
                  size="large" defaultValue={1}
                  className="w-full [&_.ant-select-selector]:!rounded-xl"
                  prefix={<UserOutlined />}
                  options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: n, label: `${n}位` }))}
                />
              </div>

              {/* 搜索按钮 */}
              <Button
                type="primary" size="large" icon={<SearchOutlined />}
                onClick={handleSearch}
                className="!rounded-xl !h-12 !px-8 !text-base !font-semibold !bg-orange-500 hover:!bg-orange-600 !border-0 !shadow-lg hover:!shadow-xl flex-shrink-0 self-end"
              >
                搜索
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 结果区 ====== */}
      <section className="max-w-6xl mx-auto px-4 pb-12 -mt-4">
        {/* 统计条 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 px-5 py-3 mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm">
            <Badge status="processing" text={<span className="text-slate-600">{filtered.length} 个航班</span>} />
            {from && to && <span className="text-slate-400">{from} → {to}</span>}
          </div>
          <Select
            value={sortBy} onChange={(v) => { setSortBy(v); setPage(1); }}
            size="small" className="w-36"
            options={filterOptions.sortOptions}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* 左侧筛选 */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <FlightFilter
              filter={filter} onChange={(f) => { setFilter(f); setPage(1); }}
              airlines={activeAirlines}
              priceMin={priceMin} priceMax={priceMax}
            />
          </div>

          {/* 右侧结果列表 */}
          <div className="flex-1 min-w-0">
            {paged.length > 0 ? (
              <>
                <div className="space-y-3">
                  {paged.map((f) => (
                    <FlightCard key={f.id} flight={f} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination current={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} showSizeChanger={false} />
                  </div>
                )}
              </>
            ) : (
              <Empty description="没有找到匹配的航班，试试调整搜索条件" className="!py-16" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightIndex;
