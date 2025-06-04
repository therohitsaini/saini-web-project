import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function SignUp() {

    const [fullNameReq, setFullNameReq] = useState(false)
    const [emailReq, setEmailReq] = useState(false)
    const [passwordReq, setPassword] = useState(false)
    const [massageReq, setMassageReq] = useState("")
    const [usernameReq, setUsernameReq] = useState(false)
    const [userPermissions, setUserPermissions] = useState([])
    const [permission_, setPermissions] = useState("")
    const [roleIsEmpty, setRoleIsEmpty] = useState("")


    // console.log('permission', permission)

    const fullname = useRef("")
    const username = useRef("")
    const email = useRef("")
    const password = useRef("")
    // const permission = useRef("")
    const addPermission = useRef("")



    const signUpFromHandler = async (e) => {
        e.preventDefault()
        const object = {
            fullname: fullname.current.value,
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            permission: permission_
        }

        if ((fullname.current.value).length === 0) {
            setFullNameReq(true)
            return false
        }

        if ((username.current.value).length === 0) {
            setUsernameReq(true)
            return false
        }

        if ((email.current.value).length === 0) {
            setEmailReq(true)
            return false
        }

        if ((password.current.value).length === 0) {
            setPassword(true)
            return false
        }
        if (permission_.length === 0) {
            setRoleIsEmpty(true)
            alert("Role is required..")
            return false
        }


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/create-user-by-admin/`
            const fetchData = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object)
            })
            const response = await fetchData.json()
            toast(JSON.stringify(response.massage));
            setMassageReq(response.massageReq)



            console.log(response)
        } catch (err) {
            console.log(err)
        }

        // setSignUpForm(object)
    }

    useEffect(() => {

        const getPermission = async (e) => {
            // e.preventDefault()
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}admin/permission`
                const fetch_Data = await fetch(url, {
                    method: "GET"
                })
                const response = await fetch_Data.json()
                // console.log("response", response.find_permission)
                setUserPermissions(response.find_permission)

            } catch (error) {
                console.log(error)
            }
        }

        getPermission()

    }, [])

    // const top100Films = Array.isArray(userPermissions)
    //     ? userPermissions.map(item => item.addPermission)
    //     : [];


    // console.log("signUpFrom", signUpFrom)


    return (
        <Fragment>
            <ToastContainer />
            <div className='mian-container  h-full w-full px-4 flex justify-center my-10'>
                {/* <div className='h-full w-[40%]'>
                    <img className='h-full w-full object-cover' src='https://cdn-cm.freepik.com/previews/51db95ba-51fd-4f85-821e-0d90d5d7dbc8.jpg?token=exp=1746429685~hmac=23365538c0a05ae543230de2cb33c837eaff81ba7802bcedf774c82d141e831d?w=500&h=500' />
                </div> */}
                <div className='h-full w-[700px] flex justify-center items-center bg-slate-100/10 rounded-md p-3 shadow-md shadow-blue'>
                    <form className=' flex flex-col gap-5  w-full  p-5 rounded-md '>
                        {/* <h1 className='heading-signup font-bold text-3xl mb-3'>Let's Get Your Account <span className='text-cyan-400 '>Set up</span> </h1> */}

                        <label className={`flex flex-col shadow-md shadow-black/20 pt-1   ${fullNameReq ? "bg-red-300/20" : "bg-white/20"}`}>
                            <label htmlFor="" className={`font-semibold text-md px-2  ${fullNameReq ? "text-red-400" : ""}`}>Full Name</label>
                            <input ref={fullname} className={`p-2 border-b-3 border-blue-400    outline-0 ${fullNameReq ? "border-red-400" : "border-black/50"} `} type='text' placeholder='Enter  name'></input>
                        </label>

                        <label className={`flex flex-col shadow-md shadow-black/20 pt-1 ${usernameReq ? "bg-red-300/20" : "bg-white/20"}`}>
                            <label htmlFor="" className={`font-semibold text-md px-2  ${usernameReq ? "text-red-400" : ""}`}>Username</label>
                            <input ref={username} className={`p-2 border-b-3 border-blue-400    outline-0 ${usernameReq ? "border-red-400" : "border-black/50"} `} type='text' placeholder='Enter username'></input>
                        </label>

                        <label className={`flex flex-col shadow-md shadow-black/20 pt-1 ${emailReq ? "bg-red-300/20" : "bg-white/20"}`}>
                            <label htmlFor="" className={`font-semibold px-2 ${emailReq ? "text-red-400" : ""}`}>Email</label>
                            <input ref={email} className={`p-2 border-b-3 border-blue-400  outline-0 ${emailReq ? "border-red-400" : "border-black/50"}`} type='email' placeholder='Enter email'></input>
                        </label>
                        <div>
                            <label className={`flex flex-col shadow-md shadow-black/20 pt-1 ${passwordReq ? "bg-red-300/20" : "bg-white/20"}`}>
                                <label htmlFor="" className={`font-semibold px-2 ${passwordReq ? "text-red-400" : ""}`}>Password</label>
                                <input ref={password} type="password" className={`p-2 border-b-3 border-blue-400 outline-0 ${passwordReq ? "border-red-400" : "border-black/50"}`} placeholder='Create password'></input>

                            </label>
                            <span className='text-[12px] duration-700 text-red-400 font-semibold'>{massageReq}</span>
                        </div>

                        <Autocomplete
                            disablePortal

                            options={userPermissions.addPermission}
                            onChange={(event, value) => setPermissions(value)}
                            sx={{ width: 200 ,bgcolor:roleIsEmpty ? "#584d4d" : ""}}
                            size='small'
                            renderInput={(params) => <TextField {...params} label="Add Permissions" />}
                        />

                        <Button onClick={signUpFromHandler} variant="outlined" sx={{ fontSize: 14, p: 1, color: 'white', bgcolor: '#0b81db', border: 'none' }}>Sign up</Button>

                        {/* <div className=' flex gap-2 font-semibold justify-end'>
                            <p className=' underline'>If you have an account ?</p>
                            <Link to={"/"} className='font-bold text-blue-600'>Sign in</Link>
                        </div> */}

                    </form>
                </div>

            </div>
        </Fragment>
    )
}

export default SignUp