import { Button } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import ForgetPasswordModal from './ForgetPasswordModal'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_FULL_NAME, fetchFullName } from '../../Store/SignInModalRedux/action'
import { CircularProgress } from '@mui/material';




function SignIn() {

    const [forgetPassword, setForgetPassword] = useState(false)
    const [emailEmptyTrue, setEmailEmptyTure] = useState(false)
    const [passwordEmptyTrue, setPasswordEmptyTure] = useState(false)
    const [loading, setLoading] = useState(false);



    const email_Username = useRef("")
    const password = useRef("")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const signInFromHandler = async (e) => {

        e.preventDefault()
        const userObject = {

            email_Username: email_Username.current.value,
            password: password.current.value
        }

        if ((email_Username.current.value).length === 0) {
            setEmailEmptyTure(true)
            return false
        }

        if ((password.current.value).length === 0) {
            setPasswordEmptyTure(true)
            return false
        }
        setLoading(true)

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/sign_in`
            const fetchData = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userObject)

            })
            const response = await fetchData.json()
            // console.log("userObject", JSON.stringify(response))

            if (fetchData.ok) {
                dispatch(fetchFullName(response.userData))
                localStorage.setItem("user-ID", response.userData._id)
                localStorage.setItem("header-email", response.userData.email)
                localStorage.setItem("header-username", response.userData.username)
                localStorage.setItem("set-role", response.userData.role)
                sessionStorage.setItem("WELCOMEMODAL", true)
                // setTimeout(() => {
                navigate("/muiappbar")
                toast(JSON.stringify(response.massage));
                // }, 1000)
            } else {
                navigate("/")
            }

        } catch (err) {
            console.log("sign in field ui ...! ", err)
        } finally {
            setLoading(false);
        }
    }



    return (
        <Fragment>

            <ToastContainer />
            <ForgetPasswordModal forgetPassword={forgetPassword} setForgetPassword={setForgetPassword} />
            <div className='mian-container  h-screen w-full flex'>
                <div className='img-main-section h-full w-[40%]'>
                    <img className='img-section h-full w-full object-cover' src='https://cdn-cm.freepik.com/previews/51db95ba-51fd-4f85-821e-0d90d5d7dbc8.jpg?token=exp=1746429685~hmac=23365538c0a05ae543230de2cb33c837eaff81ba7802bcedf774c82d141e831d?w=500&h=500' />
                </div>

                <div className='form-main-container h-full w-[60%] flex justify-center items-center'>
                    <form className='sign-in-form flex flex-col gap-3  w-full px-40'>
                        <h1 className='heading-signup font-bold text-3xl mb-3'>Access Your Account <span className='text-cyan-300'>Now</span> </h1>

                        <label className={`email-label flex flex-col shadow-sm shadow-black/10 pt-1 ${emailEmptyTrue ? "bg-red-400/20" : ""}`}>
                            <label htmlFor="" className={`font-semibold pl-1 ${emailEmptyTrue ? "text-red-400" : ""}`}>Email,Useranme</label>
                            <input ref={email_Username} className={`p-2 border-b-3   outline-0 ${emailEmptyTrue ? "border-red-400" : "border-black/50"}`} type='text' placeholder='Enter email/useranme' required ></input>
                        </label>

                        <label className={`password-label flex flex-col shadow-sm shadow-black/10 pt-1 ${passwordEmptyTrue ? "bg-red-400/20" : ""}`}>
                            <label htmlFor="" className={`font-semibold pl-1 ${passwordEmptyTrue ? "text-red-400" : ""}`}>Password</label>
                            <input ref={password} className={`p-2 border-b-3 border-black/50  outline-0 ${passwordEmptyTrue ? "border-red-400" : "border-black/50"}`} type='password' placeholder='Enter Password' required></input>
                        </label>

                        <div className='forget-section flex gap-2 font-semibold justify-end text-sm'>
                            <p onClick={() => setForgetPassword(!forgetPassword)} className='underline text-blue-600 cursor-pointer'>Forget Password</p>
                        </div>

                        {/* <Button onClick={signInFromHandler} variant="outlined" sx={{ fontSize: 14, p: 1, color: 'white', bgcolor: 'black', border: 'none' }}>Sign in</Button> */}
                        <Button
                            onClick={signInFromHandler}
                            variant="outlined"
                            disabled={loading}
                            sx={{
                                fontSize: 14,
                                p: 1,
                                color: 'white',
                                bgcolor: loading ? '#656262' : 'black',
                                border: 'none',
                                minWidth: 100
                            }}
                        >
                            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign in'}
                        </Button>
                        <div className=' flex gap-2 font-semibold justify-end'>
                            <p className=' underline'>If dont have an account ?</p>
                            <Link to={"/signup"} className='font-bold text-blue-600'>Sign up</Link>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default SignIn