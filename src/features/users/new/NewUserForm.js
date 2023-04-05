import { useState, useEffect, useRef } from "react"
import { useAddNewUserMutation } from "../../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../../config/roles"
import Admin from "../../auth/Admin"
import React from "react"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i


const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()

    const [username, setUserName] = useState('')
    const [validUsername, setValidUserName] = useState(false)

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [roles, setRoles] = useState(["User"])

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result)
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [username, email, password, matchPwd])


    useEffect(() => {
        if (isSuccess) {
            setUserName('')
            setEmail('')
            setFirstName('')
            setLastName('')
            setPassword('')
            setMatchPwd('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    // Allowing more than one option to be selected
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, firstname, lastname, email, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const content = (
        <>

            <Admin />

            <div className="grid place-content-center antialiased font-black">
                <div className="flex justify-center text-4xl">
                    <h2>New User</h2>
                </div>

                <form className="border rounded-md p-2" onSubmit={onSaveUserClicked}>

                    <p className={errClass}>{error?.data?.message}</p>

                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


                    <div className="flex flex-col p-4 text-2xl">
                        <label className="" htmlFor="username">Username </label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="username"
                            name="username"
                            type="text"
                            ref={userRef}
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <label className="" htmlFor="firstname">
                            First Name: </label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="firstname"
                            name="firstname"
                            type="text"
                            autoComplete="off"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label className="form__label" htmlFor="lastname">
                            Last Name: </label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="lastname"
                            name="lastname"
                            type="text"
                            autoComplete="off"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}></p>
                        <label className="form__label" htmlFor="email">
                            Email: </label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="email"
                            name="email"
                            type="text"
                            aria-invalid={validEmail ? "false" : "true"}
                            autoComplete="off"
                            value={email}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form__label" htmlFor="password">Password</label>
                        <input
                            className={`form__input ${validPwdClass}`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form__label" htmlFor="password">Confirm Password</label>
                        <input
                            className="text-left shadow border rounded"
                            id="confirm-password"
                            name="confirmpassword"
                            type="password"
                            aria-invalid={validMatch ? "false" : "true"}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote"
                            className={matchFocus && !validMatch ? "instructions" : "offscreen"}></p>
                        <label className="form__label" htmlFor="roles">
                            ASSIGNED ROLES:</label>
                        <select
                            id="roles"
                            name="roles"
                            className={`form__select ${validRolesClass}`}
                            multiple={true}
                            size="3"
                            value={roles}
                            onChange={onRolesChanged}
                        >
                            {options}
                        </select>
                        <div className="flex flex-col p-4 text-2xl">
                            <button
                                className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen hover:text-white"
                                title="Save"
                                disabled={!canSave}
                            >Save New User</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

    return content
}
export default NewUserForm