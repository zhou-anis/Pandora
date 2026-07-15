import Navbar from "../../components/header_navigator";
import Footer from "../../components/footer/Index.tsx";
import React from "react";
import {Outlet} from "react-router-dom";



const LayOut: React.FC = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
  )
}

export default LayOut;