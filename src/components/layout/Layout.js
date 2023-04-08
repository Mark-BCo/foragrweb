import { Outlet } from 'react-router-dom'
// import Sidebar from '../header/Sidebar'
import React from "react"
import ForHeader from '../header/Header'

const Layout = () => {
    return (
        <>
            <Outlet />
            {/* <Sidebar />  */}
            <ForHeader/>
        </>
    )
}
export default Layout