import Navbar from "../../components/header_navigator";
import Footer from "../../components/footer/Index.tsx";
import ScrollToTop from "../../components/ScrollToTop.tsx";
import React from "react";
import {Outlet} from "react-router-dom";



const LayOut: React.FC = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
  )
}

export default LayOut;