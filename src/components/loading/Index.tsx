import React from "react";
import classNames from "classnames";

const Loading: React.FC = () => {
    return (
        <div
            className={classNames(
                "flex flex-col items-center justify-center h-screen w-full",
                "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
                "text-gray-700 dark:text-gray-200"
            )}
        >
            {/* 动画加载图标 */}
            <div
                className={classNames(
                    "loading loading-bars loading-xl"
                )}
            />

            {/* 提示文字 */}
            <h3
                className={classNames(
                    "mt-6 text-lg font-semibold tracking-wide text-sky-900 dark:text-blue-400 animate-pulse"
                )}
            >
                页面加载中，请稍候...
            </h3>
        </div>
    );
};

export default Loading;
