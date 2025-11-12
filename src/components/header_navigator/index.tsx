import React from "react";
import { Carousel } from "antd";
import classNames from 'classnames';

import {useNavigate, useLocation} from "react-router-dom";



const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const nav_menu = [
        {
            title: "首页",
            name: ''
        },
        {
            title: "目的地",
            name: 'destination'
        },
        {
            title: '订酒店',
            name: 'hotel'
        },
        {
            title: '攻略分享',
            name: 'strategy'
        },
        {
            title: '周边商城',
            name: 'shopping'
        }
    ]
    const swiper_img = [
        '/swiper/pexels-fr3nks-356808.jpg',
        '/swiper/pexels-freestockpro-2166553.jpg',
        '/swiper/pexels-jimmy-teoh-294331-1010657.jpg',
        '/swiper/pexels-tobiasbjorkli-2104152.jpg'
    ]

    const routeJump = (name: string) => {
      navigate(`/${name}`);
    }
    return (
        <header className="w-full bg-white shadow-sm">
            {/* 顶部导航栏 */}
            <nav className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* 左侧 Logo + 网站名称 */}
                <div className="flex items-center space-x-3">
                    {/* Logo 预留 */}
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Logo</span>
                    </div>
                    {/* 网站名称 */}
                    <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                        Pandora · TravelNow
                    </h1>
                </div>

                {/* 中间导航部分 */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    {nav_menu.map((item, index) => {
                        const isActive = location.pathname === `/${item.name}` || (item.name === "home" && location.pathname === "/");

                        return (
                        <li className={`hover:text-cyan-400 cursor-pointer transition-colors ${
                            isActive ? "text-cyan-400 border-b-3 border-cyan-400 pb-2" : ""
                        }`}
                            key={index}
                            onClick={() => {
                                routeJump(item.name);
                            }}
                        >
                            {item.title}
                        </li>
                    )})}
                </ul>

                {/* 右侧用户信息/登录注册 */}
                <div className="flex items-center space-x-4">

                    {/* 已登录示例 */}
                    {/*<div className="hidden md:flex items-center space-x-2">*/}
                    {/*    <img*/}
                    {/*        src="https://via.placeholder.com/32"*/}
                    {/*        alt="User Avatar"*/}
                    {/*        className="w-8 h-8 rounded-full object-cover"*/}
                    {/*    />*/}
                    {/*    <span className="text-gray-800 font-medium">旅行者 · 小周</span>*/}
                    {/*</div>*/}

                    {/* 未登录示例 */}
                    {<div className="hidden md:flex space-x-3">
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          登录
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          注册
                        </button>
                    </div>}
                </div>
            </nav>

            {/* 轮播图 */}
            <Carousel autoplay autoplaySpeed={2500}>
                {swiper_img.map((item, index) => {
                    return (
                        <img src={item} alt="" className={classNames('object-cover', 'w-full', 'h-[500px]')} key={index} />
                    )
                })}
            </Carousel>
        </header>
    );
};

export default Navbar;
