import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "../../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../../config/roles"
import React from "react"
import useAuth from "../../../hooks/useAuth"
import { useSendLogoutMutation } from "../../../app/api/authApiSlice"
import axios from 'axios'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const { isUser, isAdmin, isProfessional, isManager } = useAuth()

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

    const [sendLogout, {
        isSuccess: isLogoutSuccess
    }] = useSendLogoutMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [bio, setBio] = useState('')
    const [craft, setCraft] = useState(false)
    const [forage, setForage] = useState(false)
    const [eat, setEat] = useState(false)
    const [lore, setLore] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const idObject = {id: user.id}
    console.log(idObject)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setBio('')
            setCraft(false)
            setForage(false)
            setEat(false)
            setLore(false)
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, isDelSuccess, navigate])

    useEffect(() => {
        if (isSuccess || isDelSuccess || isLogoutSuccess) {
            setUsername('')
            setPassword('')
            setBio('')
            setCraft(false)
            setForage(false)
            setEat(false)
            setLore(false)
            setRoles([])
            if (isUser || isProfessional) {
                sendLogout()
                navigate('/Login')
            }
        }
    }, [isSuccess, isDelSuccess, isUser, isLogoutSuccess, isProfessional, navigate, sendLogout])

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    console.log(handleImageChange)
    console.log(selectedImage)

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }
    const onActiveChanged = () => setActive(prev => !prev)

    const updateUserImage = async () => {

        const formData = new FormData();
        formData.append('image', selectedImage);
      
        try {
          const response = await axios.patch(`https://foragr-api.onrender.com/users/${user.id}/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
          // If the update was successful, return the updated user object
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      };

    const onSaveUserClicked = async () => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active, bio, forage, craft, eat, lore, isProfessional })
            // await updateProfile({ bio, forage, craft, eat, lore, selectedImage })
        } else {
            await updateUser({ id: user.id, username, roles, active, bio, forage, craft, eat, lore, isProfessional })
            // await updateProfile({ bio, forage, craft, eat, lore, selectedImage })

        }
    }
    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }
    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}>{role}</option >
        )
    })
    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''



    if (isUser || isProfessional) {
        const content = <>
            <div className="flex justify-center">
                <p className={errClass}>{errContent}</p>
                <form className="border rounded mt-20 md:mt:8 w-96" onSubmit={e => e.preventDefault()}>
                    <h2 className="bg-cugreen text-white text-2xl text-center">Edit User</h2>
                    <ul className="flex flex-col p-2">
                        <input type='hidden' name="hiddenField" value={isProfessional}></input>


                        <li className="p-1" >
                            <div className="flex justify-between">
                                <label htmlFor="text" >Please enter a little bit about yourself</label>
                                <input id="text" type="text" onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </li>
                        <div>Please upload your Profile Picture</div>

                        <input className="border rounded"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <li className="p-1" >
                            <div className="flex justify-between">
                                <label htmlFor="checkbox" >Do you enjoy making crafts?</label>
                                <input id="checkbox1" type="checkbox" onChange={(e) => setCraft(true)} />
                            </div>
                        </li>
                        <li className="p-1" >
                            <div className="flex justify-between">
                                <label htmlFor="checkbox" >Do you enjoy foraging?</label>
                                <input id="checkbox2" type="checkbox" onChange={(e) => setForage(true)} />
                            </div>
                        </li>
                        <li className="p-1" >
                            <div className="flex justify-between">
                                <label htmlFor="checkbox" >Would you like to find recipies from foraging wild food?</label>
                                <input id="checkbox3" type="checkbox" onChange={(e) => setEat(true)} />
                            </div>
                        </li>
                        <li className="p-1" >
                            <div className="flex justify-between">
                                <label htmlFor="checkbox" >Would you like to know more about folklore in your local area?</label>
                                <input id="checkbox4" type="checkbox" onChange={(e) => setLore(true)} />
                            </div>
                        </li>
                    </ul>
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
                                autoComplete="current-password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                        </div>

                        <div className="grid place-content-center">
                            <button
                                className="flex justify-center border rounded-md mt-4 p-2 hover:bg-cugreen hover:text-white"
                                title="Save"
                                onClick={() => {onSaveUserClicked(); updateUserImage()}}
                                disabled={!canSave}
                            >Save User
                            </button>
                            <button
                                className="border rounded-md mt-4 p-2 hover:bg-cugreen hover:text-white"
                                title="Delete"
                                onClick={onDeleteUserClicked}
                            > Delete Your Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
        return content
    }

    if (isManager || isAdmin) {
        const content = (
            <>
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

                            <div className="flex flex-col">
                                <label className="" htmlFor="user-active">
                                    Active:
                                    <input
                                        className="form__checkbox rounded"
                                        id="user-active"
                                        name="user-active"
                                        type="checkbox"
                                        checked={active}
                                        onChange={onActiveChanged}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <label className="" htmlFor="roles">
                                    Roles:</label>
                                <select
                                    id="roles"
                                    name="roles"
                                    className={`form__select ${validRolesClass}`}
                                    multiple={true}
                                    size="4"
                                    value={roles}
                                    onChange={onRolesChanged}
                                >
                                    {options}
                                </select>
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
}
export default EditUserForm

// const handleProfileForm = (e) => {
//     const formData = new FormData()
//     formData.append('username', userName)
//     formData.append('bio', bio)
//     formData.append('craft', craft)
//     formData.append('forage', forage)
//     formData.append('eat', eat)
//     formData.append('lore', lore)
//     formData.append('image', selectedImage)
//     axios
//         .patch(`http://localhost:3500/profile/${idObject.id}`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         })
//         .then((res) => {
//             console.log(res);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }