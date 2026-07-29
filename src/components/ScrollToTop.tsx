import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 路由切换时自动滚动到页面顶部 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
