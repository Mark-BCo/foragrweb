import { Outlet } from 'react-router-dom'
import Sidebar from '../header/Sidebar'
import React from "react"

const Layout = () => {
    return (
        <>
            <Outlet />
            <Sidebar /> 
        </>
    )
}
export default Layout