import React from "react";
import { List, Card, Row, Col, Typography, Tag } from "antd";
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface TicketProps {
  id: number;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  price: number;
  airline: string;
  image: string;
  direct: boolean;
}

/** 单个机票卡片 */
const FlightTicketItem: React.FC<TicketProps> = ({
  from,
  fromCode,
  to,
  toCode,
  date,
  departTime,
  arriveTime,
  duration,
  price,
  airline,
  image,
  direct,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      onClick={() => navigate(`/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
      className="rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <Row align="middle" gutter={0} className="h-28">
        {/* 左侧目的地图片 */}
        <Col className="w-28 h-full flex-shrink-0">
          <img
            alt={to}
            src={image}
            className="w-full h-full object-cover"
          />
        </Col>

        {/* 航班信息 */}
        <Col flex="auto" className="px-4 py-3">
          <Row justify="space-between" align="middle">
            <Col>
              <Text className="text-xl font-bold">{departTime}</Text>
              <Text type="secondary" className="block text-xs mt-0.5">
                {from} ({fromCode})
              </Text>
            </Col>

            <Col className="text-center px-2">
              <div className="text-gray-300 text-xs flex items-center gap-1">
                <span className="border-t border-gray-300 w-8 inline-block" />
                <ArrowRightOutlined className="text-gray-400" />
                <span className="border-t border-gray-300 w-8 inline-block" />
              </div>
              <Text className="text-xs text-gray-400 flex items-center gap-1 justify-center mt-0.5">
                <ClockCircleOutlined />
                {duration}
              </Text>
              {direct && (
                <Tag color="green" className="text-xs mt-1 px-1 leading-tight">
                  直飞
                </Tag>
              )}
            </Col>

            <Col className="text-right">
              <Text className="text-xl font-bold">{arriveTime}</Text>
              <Text type="secondary" className="block text-xs mt-0.5">
                {to} ({toCode})
              </Text>
            </Col>
          </Row>
        </Col>

        {/* 右侧价格 & 航空公司 */}
        <Col className="w-28 text-center border-l border-gray-100 h-full flex flex-col items-center justify-center px-3 bg-gray-50/50">
          <Text className="text-2xl font-bold text-orange-500 leading-none">
            ¥{price}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">{date}</Text>
          <Tag color="blue" className="mt-1.5 text-xs">
            {airline}
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

/** mock 数据 —— 后端就绪后可替换 */
const mockTickets: TicketProps[] = [
  {
    id: 1,
    from: "北京",
    fromCode: "PEK",
    to: "上海",
    toCode: "SHA",
    date: "01-20",
    departTime: "07:30",
    arriveTime: "10:10",
    duration: "2h40m",
    price: 880,
    airline: "国航",
    image: "https://images.unsplash.com/photo-1537531383496-f4749b88b535?w=200&q=80",
    direct: true,
  },
  {
    id: 2,
    from: "广州",
    fromCode: "CAN",
    to: "成都",
    toCode: "CTU",
    date: "01-22",
    departTime: "09:15",
    arriveTime: "12:05",
    duration: "2h50m",
    price: 760,
    airline: "南航",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&q=80",
    direct: true,
  },
  {
    id: 3,
    from: "深圳",
    fromCode: "SZX",
    to: "杭州",
    toCode: "HGH",
    date: "01-25",
    departTime: "14:20",
    arriveTime: "16:45",
    duration: "2h25m",
    price: 620,
    airline: "深航",
    image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=200&q=80",
    direct: true,
  },
  {
    id: 4,
    from: "上海",
    fromCode: "PVG",
    to: "东京",
    toCode: "NRT",
    date: "01-28",
    departTime: "08:45",
    arriveTime: "12:30",
    duration: "3h45m",
    price: 2580,
    airline: "东航",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&q=80",
    direct: true,
  },
  {
    id: 5,
    from: "北京",
    fromCode: "PEK",
    to: "曼谷",
    toCode: "BKK",
    date: "02-01",
    departTime: "19:00",
    arriveTime: "23:30",
    duration: "5h30m",
    price: 1860,
    airline: "国航",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=200&q=80",
    direct: true,
  },
];

interface TicketListProps {
  tickets?: TicketProps[];
}

const FlightTicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const data = tickets ?? mockTickets;
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item: TicketProps) => (
        <List.Item className="!border-0 !p-0 !mb-3">
          <FlightTicketItem {...item} />
        </List.Item>
      )}
      className="!border-0"
    />
  );
};

export default FlightTicketList;
export type { TicketProps };
