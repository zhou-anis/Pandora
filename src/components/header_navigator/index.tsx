import React from "react";


const Navbar: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-sm">
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
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                        首页
                    </li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                        目的地
                    </li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                        路线推荐
                    </li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                        攻略分享
                    </li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                        联系我们
                    </li>
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
            <div className="carousel w-full h-[450px]">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
