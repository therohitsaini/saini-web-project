import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function ResetPassword() {
    const [passwordIsMatch, setPasswordIsMatch] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState(false)
    const [response_, setResponse] = useState("")
    const [user_id, setUser_id] = useState()
    const [isOldPassword, setIsOldPassword] = useState(false)
    const old_Password = useRef("")
    const password = useRef("")

    const confirm_Password = useRef()

    useEffect(() => {
        const ID = localStorage.getItem("user-ID");
        if (ID && /^[a-f\d]{24}$/i.test(ID)) {
            setUser_id(ID)
        }
    }, []);

    const updatePassword = async (event) => {
        event.preventDefault()

        const passObj = {
            old_Password: old_Password.current.value,
            password: password.current.value,
            confirm_Password: confirm_Password.current.value
        }
        if ((old_Password.current.value).length === 0) {
            toast("Fill old password field");
            return;
        }
        if ((password.current.value).length === 0) {
            toast("Fill new password field");
            return;
        } if ((confirm_Password.current.value).length === 0) {
            toast("Fill confirm password field");
            return;
        }
        if (password.current.value !== confirm_Password.current.value) {
            setPasswordIsMatch(true)
            return;
        }

        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}all/reset-password-id/${user_id}`
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passObj)
            })
            const response = await fetchData.json()
            // setResponse(response.message)
            toast(JSON.stringify(response.message));

            // alert(JSON.stringify(response.message))
            console.log(response.message)
            if (fetchData.ok) {
                setPasswordSuccess(true)

            }
        } catch (error) {
            console.log("somthing webbt wrong !", error)
        }

    }
    // console.log("response", response_)

    return (
        <Fragment>
            <ToastContainer />
            <Snackbar open={passwordIsMatch} autoHideDuration={6000} onClose={() => setPasswordIsMatch(false)}>
                <Alert
                    onClose={() => setPasswordIsMatch(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Confirm password is incrrect ...!
                </Alert>
            </Snackbar>
            <Snackbar open={passwordSuccess} autoHideDuration={6000} onClose={() => setPasswordSuccess(false)}>
                <Alert
                    onClose={() => setPasswordSuccess(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {response_ ? response_ : " Password update successfully....!"}
                </Alert>
            </Snackbar>
            <div className='reset-password-main h-[600px] -mt-25  bg-[#131312] flex justify-center items-center' >
                <form className='h-[400px] w-[600px]  rounded-md p-1 px-5 flex flex-col gap-4 justify-center  border border-slate-500/20'>
                    <h1 className='font-serif text-2xl text-cyan-800 mb-2'>Reset Password</h1>

                    <TextField inputRef={old_Password} id="outlined-basic" type='password' label="Old Password" variant="outlined" size='small' sx={{ width: "100%", bgcolor: isOldPassword ? "rgba(219, 160, 161) " : "" }} />
                    <TextField inputRef={password} id="outlined-basic" type='password' label="New Password" variant="outlined" size='small' sx={{ width: "100%" }} />
                    <TextField inputRef={confirm_Password} id="outlined-basic" type='password' label="Confirm Password" variant="outlined" size='small' sx={{ width: "100%" }} />

                    <Button
                        onClick={updatePassword}
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            zIndex: 1,
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 400,
                            transition: 'color 0.4s ease, border-color 0.4s ease',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '0%',
                                backgroundColor: 'primary.main',
                                zIndex: -1,
                                transition: 'height 0.4s ease',
                            },
                            '&:hover::before': {
                                height: '100%',
                            },
                            '&:hover': {
                                color: 'black',
                                borderColor: 'primary.main',
                            },
                        }}
                    >
                        Save Changes
                    </Button>

                </form>

            </div >
        </Fragment>
    )
}

export default ResetPassword