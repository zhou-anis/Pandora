import React from 'react'
import {Checkbox} from "antd";


const SearchBox: React.FC = () => {
  const checkOptions = [{
      value: 'destination',
      label: '目的地'
  }, {
      value: 'hotel',
      label: "酒店",
  }, {
      value: 'spot',
      label: '景点'
  }, {
      value: 'novel',
      label: '旅行笔记'
  }]
  return (
      <div className="w-full max-w-xl mx-auto mt-6">
          <div
              className="flex items-center bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg
           hover:shadow-xl transition-all duration-300 px-4 py-1"
          >

              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
              </svg>


              <input
                  type="text"
                  placeholder="搜索目的地、景点或酒店..."
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400
             focus:placeholder-gray-300 text-base"
              />


              <button
                  className="ml-3 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
             text-white font-medium hover:from-indigo-500 hover:to-purple-500
             shadow-md hover:shadow-lg transition-all duration-300"
              >
                  搜索
              </button>
          </div>
          <div className={'pt-6 pl-4'}>
              <Checkbox.Group options={checkOptions}></Checkbox.Group>
          </div>
      </div>

  )
}

export default SearchBox
