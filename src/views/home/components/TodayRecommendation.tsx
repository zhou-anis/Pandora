import React from "react";
import classNames from "classnames";
import MyDate from "../../../components/date/MyDate.tsx";




const TodayRecommendation: React.FC = () => {
  const current_time = new Date();
  return (
      <div className={classNames("w-full", "h-[250px]", 'overflow-y-hidden', 'relative')}>
          <img src="/recommendation/pexels-tobiasbjorkli-1559846.jpg" alt=""
               className={classNames('object-cover', 'bg-transparent')}/>
          <div
              className="absolute inset-0 flex px-10 py-8
           bg-black/10 text-white text-xl font-semibold"
          >
              <MyDate date={current_time.toDateString()}></MyDate>
          </div>
      </div>

  )

}


export default TodayRecommendation;