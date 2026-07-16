import React from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  WechatOutlined,
  WeiboOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 品牌介绍 */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Pandora · TravelNow</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              致力于为旅行者提供最优质的出行服务，发现世界每一个角落的美好。让每一次旅程都成为难忘的回忆。
            </p>
            <div className="flex space-x-3 text-xl">
              <WechatOutlined className="cursor-pointer hover:text-green-400 transition-colors" />
              <WeiboOutlined className="cursor-pointer hover:text-red-400 transition-colors" />
              <MailOutlined className="cursor-pointer hover:text-blue-400 transition-colors" />
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              {["热门目的地", "特价机票", "酒店预订", "旅行攻略", "签证服务"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 热门目的地 */}
          <div>
            <h4 className="text-white font-semibold mb-4">热门目的地</h4>
            <ul className="space-y-2 text-sm">
              {["东京 · 日本", "巴黎 · 法国", "曼谷 · 泰国", "巴厘岛 · 印尼", "马尔代夫"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-white font-semibold mb-4">联系我们</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <EnvironmentOutlined className="text-cyan-400" />
                <span>中国 · 北京市朝阳区</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneOutlined className="text-cyan-400" />
                <span>400-888-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <MailOutlined className="text-cyan-400" />
                <span>hello@pandora-travel.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2025 Pandora TravelNow. All rights reserved.</span>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <span className="cursor-pointer hover:text-gray-300 transition-colors">
              隐私政策
            </span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">
              服务条款
            </span>
            <span className="cursor-pointer hover:text-gray-300 transition-colors">
              关于我们
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
