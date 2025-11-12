import Navbar from "../../components/header_navigator";
import React from "react";
import {Outlet} from "react-router-dom";



const LayOut: React.FC = () => {
  return (
      <div>
        <Navbar />
          <Outlet></Outlet>
      </div>
  )
}

export default LayOut;