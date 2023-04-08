import React from 'react'
import { useState } from 'react';
// import ForHeader from './Header';

// HIDING AND SHOWING THE SIDEBAR
// This Function has been moved to the header page to allow all the links to close
// the sidebar inside when clicking
const Sidebar = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const content = (
        <>
        {showSidebar ? (
            <>
                <button
                    className="flex text-4xl items-center cursor-pointer fixed right-11 top-6 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}>
                    x
                </button>

            </>
        ) : (
            <>
                <svg onClick={() => setShowSidebar(!showSidebar)}
                    className="fixed flex items-center cursor-pointer right-10 top-10"
                    viewBox="0 0 100 80"
                    width="20"
                    height="20">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </>
        )}
        {/* <div className={`top-0 right-0 p-4 pl-5 bg-blugray border rounded-bl-lg fixed z-40 ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
            <ForHeader />
        </div> */}
        </>

    )

    return content
}

export default Sidebar