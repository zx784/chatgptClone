"use client"

import { FaRegShareFromSquare } from "react-icons/fa6"
import { FiMenu } from "react-icons/fi"

const Header = ({ toggleSidebar, sidebarVisible }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center md:w-64">
          <button
            className="p-2 mr-2 rounded-md hover:bg-gray-100 md:hidden"
            onClick={toggleSidebar}
            aria-label={sidebarVisible ? "Close sidebar" : "Open sidebar"}
          >
            <FiMenu className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 md:hidden">ChatGPT</h1>
          </div>
          {/* let's add profile simulator frontend on right */}
        
            <div className="flex items-center space-x-4 md:mr-7">
            <span className="text-sm font-medium text-gray-800"><FaRegShareFromSquare/></span>
            <span className="text-sm font-medium text-gray-800">|</span>
              <img
                src="https://i.pinimg.com/736x/79/03/cd/7903cdd49c1d723430ad2ae899ac3c6c.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
          </div>
        
      </div>
    </header>
  )
}

export default Header
