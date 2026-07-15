import React from "react";
import {Popover} from "antd";
import classNames from 'classnames';
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import type {RootState} from "../../store";


const profileOptions: string[] = ['个人中心', '退出登陆', '设置']

const content = (
    <div>
        {profileOptions.map((item: string, index: number) => {
            console.log(index);
            return (
                <div className={'w-full h-10 text-xl cursor-pointer hover:bg-gray-300'}>{item}</div>
            )
        })}
    </div>
);
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {username, token} = useSelector((state: RootState) => state.user);
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


    const routeJump = (name: string) => {
      navigate(`/${name}`);
    }


    return (
        <header className="w-full bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
            {/* 顶部导航栏 */}
            <nav className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* 左侧 Logo + 网站名称 */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => routeJump('')}>
                    {/* Logo 预留 */}
                    <div className="w-25 h-5 bg-transparent rounded-md flex items-center justify-center">
                        <img src="src/assets/logo/logo.png" alt="logo" />
                    </div>
                    {/* 网站名称 */}
                    <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                        Pandora · TravelNow
                    </h1>
                </div>

                {/* 中间导航部分 */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    {nav_menu.map((item, index) => {
                        const isActive = location.pathname === `/${item.name}` || (item.name === "" && location.pathname === "/");

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
                    {token ? (<div className="hidden md:flex items-center space-x-2">
                        <img src="/diary/hotest.jpeg" alt="" className={classNames('rounded-full'
                            , 'w-10', 'h-10', 'cursor-pointer'
                        ) }/>
                        <Popover trigger='hover' content={content}>
                            <span className="text-gray-800 font-medium">旅行者 · {username}</span>
                        </Popover>
                    </div>) : (
                        <div className="hidden md:flex space-x-3">
                            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    onClick={() => {
                                        routeJump('signin')
                                    }}
                            >
                                登录
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => {
                                        routeJump('signup')
                                    }}
                            >
                                注册
                            </button>
                        </div>
                    )}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;
