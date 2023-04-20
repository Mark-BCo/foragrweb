import { useRef, useState, useEffect } from 'react'
import axios from '../../app/api/user'
import { Icon } from '@iconify/react';
import React from "react"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@£$%^&*()_+=]).{8,24}$/
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const REGISTER_URL = '/users'

const Register = () => {

    // set the focus on the user input when the component loads
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [firstname, setFirstName] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)

    const [lastname, setLastName] = useState('')
    const [validLastName, setValidLastName] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username, firstname, lastname)
        setValidName(result)
        setValidFirstName(result)
        setValidLastName(result)
    }, [username, firstname, lastname])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPwd(result)
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [username, email, password, matchPwd])

    const handleRegister = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, firstname, lastname, password, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response))
            setSuccess(true);

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setFirstName('');
            setLastName('');
            setEmail('')
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Sorry, that username or email has been taken.');
            } else {
                // console.log(err.response.data)
                // console.log(err.response.status)
                // console.log(err.response)
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ?
                (<div className="grid place-content-center min-h-screen">
                    <h1>Thanks for registering!
                        <br/>
                        <a href="/Login">Head to the login page</a>
                    </h1>
                </div>
                ) : (
                    <>
                        <div className="grid place-content-center min-h-screen items-center antialiased font-black">
                            <form className="border rounded-md p-2" onSubmit={handleRegister}>
                                <p className="flex justify-center text-4xl">Get started with Foragr<Icon icon="file-icons:leaflet" className="text-1xl material-symbols-outlineds" color="darkgreen" width="16" height="35" rotate={1} /></p>
                                <div className="flex flex-col p-4 text-2xl">
                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                    <label htmlFor="username" className="flex">Username
                                    <div className={validName ? "valid" : "hide"}><p className='border m-1 text-md'><Icon icon="mdi:password-check" color="darkgreen" /></p></div>
                                    <div className={validName || !username ? "hide" : "invalid"}><p className='border m-1 text-md'><Icon icon="mdi:password-remove" color="red" /></p></div>
                                    </label>
                                    <input
                                        className="text-left shadow border rounded"
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)} />
                                    <p id="uidnote"
                                        className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                        4 to 24 Characters.<br />
                                        Must begin with a letter.<br />
                                        Underscore and numbers allowed.<br />
                                    </p>
                                    <label htmlFor="firstname" className="">First Name</label>
                                    <input
                                        className="text-left shadow border rounded"
                                        type="text"
                                        id="firstname"
                                        autoComplete="off"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="lastname" className="">Last Name</label>
                                    <input
                                        className="text-left shadow border rounded"
                                        type="text"
                                        id="lastname"
                                        autoComplete="off"
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="email" className="flex">Email
                                    <div className={validEmail ? "valid" : "hide"}><p className='border m-1 text-md'><Icon icon="mdi:password-check" color="darkgreen" /></p></div>
                                    <div className={validEmail || !email ? "hide" : "invalid"}><p className='border m-1 text-md'><Icon icon="mdi:password-remove" color="red" /></p></div>                            
                                    </label>
                                    <input
                                        className="text-left shadow border rounded"
                                        type="text"
                                        id="email"
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)} />
                                    <p id="emailnote"
                                        className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                        Not a valid email address.<br />
                                    </p>
                                    <label htmlFor="password" className="flex">Password
                                    <div className={validPwd ? "valid" : "hide"}><p className='border m-1 text-md'><Icon icon="mdi:password-check" color="darkgreen" /></p></div>
                                    <div className={validPwd || !password ? "hide" : "invalid"}><p className='border m-1 text-md'><Icon icon="mdi:password-remove" color="red" /></p></div>
                                    </label>
                                    <input
                                        className={`text-left shadow border rounded`}
                                        type="password"
                                        id="password"
                                        autoComplete='new-password'
                                        onChange={(e) => setPwd(e.target.value)}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)} />
                                    <p id="pwdnote"
                                        className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        You'll want a strong password!<br />
                                        Must be a minimum of 8 characters!<br />
                                        Upper and lower case!<br />
                                        Please include:
                                        <span aria-label="exclamation mark">!</span>
                                        <span aria-label="at symbol">@</span>
                                        <span aria-label="dollar sign">$</span>
                                        <span aria-label="percent">%</span>
                                    </p>
                                    <label htmlFor="confirm_pwd" className="flex">Confirm Password
                                    <div className={validMatch && matchPwd ? "valid" : "hide"}><p className='border m-1 text-md'><Icon icon="mdi:password-check" color="darkgreen" /></p></div>
                                    <div className={validMatch || !matchPwd ? "hide" : "invalid"}><p className='border m-1 text-md'><Icon icon="mdi:password-remove" color="red" /></p></div>
                                    </label>
                                    <input
                                        className="text-left shadow border rounded"
                                        type="password"
                                        id="confirm_pwd"
                                        autoComplete='new-password'
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)} />
                                    <p id="confirmnote"
                                        className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        Passwords must match.
                                    </p>
                                    <button disabled={!validName || !validFirstName || !validLastName || !validPwd || !validMatch || !validEmail ? true : false} className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen ease-in duration-300 hover:text-white">Sign Up!</button>
                                    <div>
                                        <a className="flex justify-center border rounded-md mt-2 p-2  hover:bg-cugreen ease-in duration-300 hover:text-white" href="/for-login">Already have an account?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}
        </>
    )
}
export default Register;

//mb-4 md:w1/2 md:flex md:flex-wrap md:justify-between