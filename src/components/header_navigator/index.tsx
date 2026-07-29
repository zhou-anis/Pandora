import React from "react";
import {Popover, message} from "antd";
import classNames from 'classnames';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import type {RootState, RootDispatch} from "../../store";
import {logout} from "../../store/reducers/user";
import type {UserRole} from "../../store/reducers/user";


const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<RootDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const {username, token, role, avatar} = user;

    const nav_menu = [
        { title: "首页", name: '' },
        { title: "目的地", name: 'destination' },
        { title: '订机票', name: 'flight' },
        { title: '订酒店', name: 'hotel' },
        { title: '攻略分享', name: 'strategy' },
    ];

    const routeJump = (name: string) => {
      navigate(`/${name}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        message.success("已退出登录");
        navigate("/");
    };

    const popoverContent = (
        <div className="w-36 py-1">
            <div
                onClick={() => { routeJump("user/profile"); }}
                className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
                👤 个人中心
            </div>
            {role === "creator" && (
                <div
                    onClick={() => { routeJump("user/creator"); }}
                    className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                >
                    ✍️ 创作中心
                </div>
            )}
            <div className="border-t border-gray-100 my-1" />
            <div
                onClick={handleLogout}
                className="px-3 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
            >
                🚪 退出登录
            </div>
        </div>
    );

    const roleTag: Record<UserRole, string> = { user: "旅行者", creator: "创作者" };

    return (
        <header className="w-full bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
            {/* 顶部导航栏 */}
            <nav className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* 左侧 Logo + 网站名称 */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => routeJump('')}>
                    <div className="w-25 h-5 bg-transparent rounded-md flex items-center justify-center">
                        <img src="src/assets/logo/logo.png" alt="logo" />
                    </div>
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
                            onClick={() => { routeJump(item.name); }}
                        >
                            {item.title}
                        </li>
                    )})}
                </ul>

                {/* 右侧用户信息/登录注册 */}
                <div className="flex items-center space-x-4">
                    {token ? (
                        <div className="hidden md:flex items-center space-x-2">
                            <Popover trigger="hover" content={popoverContent} placement="bottomRight">
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="rounded-full w-10 h-10 cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-colors object-cover"
                                />
                            </Popover>
                            <Popover trigger="hover" content={popoverContent} placement="bottomRight">
                                <span className="text-gray-800 font-medium cursor-pointer hover:text-blue-600 transition-colors">
                                    {roleTag[role]} · {username}
                                </span>
                            </Popover>
                        </div>
                    ) : (
                        <div className="hidden md:flex space-x-3">
                            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    onClick={() => { routeJump('signin'); }}>
                                登录
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => { routeJump('signup'); }}>
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
