import React from "react";
import DisplayCard from "./components/DisplayCard.tsx";
import TravelOptions from './components/TravelOptions.tsx';
import SearchBox from "../../components/search/SearchBox.tsx";
import TodayRecommendation from "./components/TodayRecommendation.tsx";

const HomeIndex: React.FC = () => {
  return (
      <div>
          <div className="grid grid-cols-[100] grid-rows-3 gap-4 pt-8">
              <div className="row-span-3">
                  <div className="grid grid-flow-col grid-rows-3 gap-4">
                      <div className="row-span-3 w-120 h-full"><TravelOptions></TravelOptions></div>
                      <div className="col-span-2 w-130 h-full"><SearchBox></SearchBox></div>
                      <div className="col-span-2 row-span-2 w-full h-full"><TodayRecommendation></TodayRecommendation></div>
                      <div className='w-120 h-full bg-amber-950'>1233333333333</div>
                      <div className='w-full h-full bg-blue-500 row-span-2'></div>
                  </div>

              </div>
          </div>
          <DisplayCard></DisplayCard>
      </div>
  )
}


export default HomeIndex;