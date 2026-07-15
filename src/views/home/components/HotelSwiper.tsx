import React from "react";
import { Carousel, Rate } from "antd";
import classNames from "classnames";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockHotels } from "../../hotel/data";

interface HotelItem {
  img: string;
  hotel_name: string;
  /** 对应 mockHotels 中的 id，用于跳转详情 */
  hotelId: number;
}

const hotelData: HotelItem[] = [
  {
    img: "/hotel/pexels-ana-hidalgo-burgos-4848204-33952744.jpg",
    hotel_name: "曼谷威客3號酒店",
    hotelId: 4,
  },
  {
    img: "/hotel/pexels-emilio-garcia-96280844-22922098.jpg",
    hotel_name: "东京京王广场大酒店",
    hotelId: 1,
  },
  {
    img: "/hotel/pexels-furkanakt-24800194.jpg",
    hotel_name: "新宿灿路都广场大饭店",
    hotelId: 2,
  },
  {
    img: "/hotel/pexels-navlakha-32671528.jpg",
    hotel_name: "天空花园酒店东大门1号店",
    hotelId: 7,
  },
];

const HotelSwiper: React.FC = () => {
  const navigate = useNavigate();

  /** 根据 hotelId 从 mock 数据中取详情展示（不写死） */
  const resolve = (hotelId: number) => mockHotels.find((h) => h.id === hotelId);

  return (
    <div className="w-full">
      <Carousel autoplay autoplaySpeed={3000} dots={{ className: "custom-dots" }}>
        {hotelData.map((item) => {
          const detail = resolve(item.hotelId);
          return (
            <div key={item.hotelId}>
              <div
                onClick={() => navigate(`/hotel/${item.hotelId}`)}
                className="relative h-[280px] rounded-2xl overflow-hidden cursor-pointer group mx-1"
              >
                <img
                  src={item.img}
                  alt={item.hotel_name}
                  className={classNames(
                    "object-cover",
                    "w-full",
                    "h-full",
                    "group-hover:scale-110 transition-transform duration-500"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* 价格标签 */}
                {detail && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md">
                    <span className="text-orange-500 font-bold text-lg">¥{detail.price}</span>
                    <span className="text-gray-400 text-xs ml-1">/晚</span>
                  </div>
                )}

                {/* 底部信息 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold drop-shadow-lg mb-1">
                    {item.hotel_name}
                  </h3>
                  {detail && (
                    <>
                      <p className="text-white/70 text-sm mb-2">{detail.nameEn}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Rate disabled defaultValue={detail.rating} allowHalf style={{ fontSize: 12, color: "#fadb14" }} />
                        <span className="text-white/80 text-xs">{detail.rating}</span>
                      </div>
                      <p className="text-white/60 text-xs flex items-center gap-1">
                        <EnvironmentOutlined />
                        {detail.address}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HotelSwiper;
