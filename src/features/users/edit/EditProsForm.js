import { useState, useEffect } from "react"
import { useUpdateProMutation, useDeleteProMutation } from "../../../app/api/proApiSlice"
import { useNavigate } from "react-router-dom"
import React from "react"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditProsForm = ({ user }) => {

    const [updatePros, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProMutation()

    const [deletePros, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.ownername)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            navigate('/dash/pros')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updatePros({ id: user.id, username, password, active })
        } else {
            await updatePros({ id: user.id, username, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deletePros({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="flex flex-col justify-center mt-20 md:mt:8" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col p-4 text-2xl">
                    <h2>Edit Pros</h2>

                    <label className="" htmlFor="username">
                        Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                    <label className="" htmlFor="password">
                        Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                    <label className="" htmlFor="user-active">
                        ACTIVE:
                        <input
                            className="form__checkbox"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>

                    <div className="flex flex-col p-4 text-2xl">
                        <button
                            className="flex justify-center border rounded-md mt-4 p-2 hover:bg-cugreen"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >Save New User Details
                        </button>
                        <button
                            className="flex justify-center border rounded-md mt-4 p-2 hover:bg-cugreen"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        > Delete User
                        </button>
                    </div>
                </div>

            </form>
        </>
    )

    return content
}
export default EditProsForm