import React from 'react'

import MyIcon from "../../../components/icons/MyIcon.tsx";



const TravelOptions: React.FC = () => {
    const circle_item = [
        {
            icon_name: 'abroad',
            content: '出国游'
        },
        {
            icon_name: 'local',
            content: '国内游'
        },
        {
            icon_name: 'hotel',
            content: '酒店'
        },
        {
            icon_name: 'visa',
            content: '签证'
        },
    ]
  return (
      <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 pl-20">
              {circle_item.map((item, index) => {
                  return (
                      <div
                          key={index}
                          className="
              flex flex-col items-center justify-center
              bg-white shadow-md rounded-2xl p-6
              hover:shadow-lg hover:scale-105 transition-transform duration-300
            "
                      >
                          <div className="mb-3">
                              <MyIcon name={item.icon_name} />
                          </div>
                          <span className="text-gray-800 text-lg tracking-wide font-bold">
              {item.content}
            </span>
                      </div>
                  )
              })}

          </div>
      </div>
  )
}


export default TravelOptions