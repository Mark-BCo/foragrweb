import { store } from '../../app/store'
import { usersApiSlice } from '../../app/api/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import React from "react"

const Prefetch = () => {

    useEffect(() => {
        // console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))

        return () => {
            // console.log('unsubscribing')
            users.unsubscribe()
        }
        
    }, []) // Only run when the components mounts

    return <Outlet />
}
export default Prefetch