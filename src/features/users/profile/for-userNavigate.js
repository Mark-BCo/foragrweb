import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "../../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import React from "react"
import UploadAndDisplayImage from "../../tools/map/Image"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

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
            navigate('/dash/usersprofile')
        }

    }, [isSuccess, isDelSuccess, navigate])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            navigate('/dash/usersprofile')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password })
        } else {
            await updateUser({ id: user.id, username })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
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
            <UploadAndDisplayImage />
            <div className="flex justify-center">
                <p className={errClass}>{errContent}</p>
                <form className="border rounded mt-20 md:mt:8 w-96" onSubmit={e => e.preventDefault()}>
                    <h2 className="bg-cugreen text-white text-2xl text-center">Edit User</h2>
                    <div className="p-2 text-xl font-black antialiased">
                        <div className="flex flex-col">
                            <label className="" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className={`form__input rounded ${validUserClass}`}
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                value={username}
                                onChange={onUsernameChanged}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className={`form__input rounded ${validPwdClass}`}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                        </div>

                        <div className="grid place-content-center">
                            <button
                                className="flex justify-center border rounded-md mt-4 p-2 hover:bg-cugreen hover:text-white"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >Save User
                            </button>
                            <button
                                className="border rounded-md mt-4 p-2 hover:bg-cugreen hover:text-white"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            > Delete User
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )

    return content
}
export default EditUserForm