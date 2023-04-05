import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../app/api/authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../app/api/authSlice";
import React from "react"

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)

    // How to react strict mode in react 18
    const effectRan = useRef(false)

    // Unique to this code
    const [trueSuccess, setTrueSuccess] = useState(false)

    // isUnitilaised means the refresh function has not been cllaed yet
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    // const response =
                    await refresh()
                    // const {accessToken} = response.data
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    let content

    // This can be changed - take possiblilties into account
    if (!persist) {
        content = <Outlet />
    } else if (isLoading) {
        content = <p>Loading ...</p>
    } else if (isError) { // persist: yes, token: no
        content = (
                <Link className="grid place-content-center text-center antialiased min-h-screen text-2xl font-bold hover:bg-cugreen transition ease-in duration-300 hover:text-white" to="/Login">Sorry, you must be logged in to view this page.</Link>
        )
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) { // persist: yes, token: yes
        content = <Outlet />
    }

    return content
}

export default PersistLogin
