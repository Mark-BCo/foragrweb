import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../app/api/authSlice'
import { useLoginMutation } from '../../app/api/authApiSlice'
import usePersist from '../../hooks/usePersist';
import React from "react"

// Create login input form [x]
// Create a function to handle the user input and log the user in [x]
// Persist the state of the login to avoid logging out on refresh [x]

// LOGIN 
const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Looks like your username or password is wrong, please try again!');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <div className="grid place-content-center min-h-screen items-center antialiased font-black">
                <form className="border rounded-md p-2" onSubmit={handleLogin}>
                    <p className="flex justify-center text-4xl">Login to Foragr<Icon icon="file-icons:leaflet" className="text-1xl material-symbols-outlineds" color="darkgreen" width="16" height="35" rotate={1} /></p>
                    <div className="flex flex-col p-4 text-2xl">
                        <label htmlFor="username" className="">Username</label>
                        <input
                            className="text-left shadow border rounded"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required />
                        <p id="uidnote"
                            className="">
                        </p>
                        <label htmlFor="password" className="">Password</label>
                        <input
                            className="text-left shadow border rounded"
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            autoComplete="current-password"
                            required />
                        <p id="pwdnote"
                            className="">
                        </p>
                        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                        <button className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen hover:text-white">Login!</button>
                        <div>
                            <a className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen ease-in duration-300 hover:text-white" href="/Register">Don't have an account?</a>
                        </div>
                        <div>
                            <a className="flex justify-center border rounded-md mt-2 p-2  hover:bg-cugreen ease-in duration-300 hover:text-white" href="/Login">Forgotten your password?</a>
                        </div>
                    </div>
                    <label htmlFor="persist" className="flex justify-center p-2">
                        <input type="checkbox" className="" id="persist" onChange={handleToggle} checked={persist}/>
                        Tick this box to stay logged in!
                    </label>

                </form>
            </div>
        </>
    )
}
export default Login;

