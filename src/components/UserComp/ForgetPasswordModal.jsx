import { Box, Button, Modal, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { Fragment, useRef, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatedCard } from '../../StyledComponents/StyledComp';


function ForgetPasswordModal({ forgetPassword, setForgetPassword }) {
    const [emailData, setEmailData] = useState({})
    const [emptyEmailInput, setEmptyInput] = useState(false)
    const email = useRef("")

    const forgetPasswordHandler = async (e) => {

        e.preventDefault()

        const emailObject = { email: email.current.value }
        if ((email.current.value).length === 0) {
            setEmptyInput(true)
            return false
        }

        setEmailData(emailObject)
        const Url = `${import.meta.env.VITE_BACK_END_URL}all/forget_password/api`;
        const fetchUrl = await fetch(Url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(emailObject)
        })
        const response = await fetchUrl.json()
        console.log("response", response)

    }
    console.log("emailData", emailData)
    console.log("emptyEmailInput", emptyEmailInput)

    return (
        <Fragment>
            <Modal
                open={forgetPassword}
            >
                <div className='h-screen  flex justify-center items-center '>
                    <AnimatedCard>
                        <Box sx={{ bgcolor: "#f8fcfc", borderRadius: "6px", p: 1, pb: 2, px: 2, display: "flex", flexDirection: "column", gap: 2, border: "none" }}>

                            <div className='handler   w-[500px] flex justify-end '> <Icon onClick={() => setForgetPassword(!forgetPassword)} fontSize={40} icon={"line-md:close-circle"} /> </div>

                            <label className={`forget-password-label shadow-sm shadow-black/40 w-full ${emptyEmailInput ? "bg-red-400/20" : ""}`}>
                                <h1 className={`heading font-semibold text-[17px] p-1 pl-2 ${emptyEmailInput ? "text-red-400" : ""}`}>Forget Password ...</h1>
                                <input ref={email} className={`p-2 border-b-3 border-black/50 w-full  outline-0 ${emptyEmailInput ? "border-red-400" : "border-black/50"}`} type='text' placeholder='Enter email' required></input>
                            </label>

                            <Button onClick={(e) => forgetPasswordHandler(e)} variant="outlined" sx={{ fontSize: 14, p: 1, color: 'white', bgcolor: 'black', border: 'none' }}>Submit </Button>

                        </Box>
                    </AnimatedCard>
                </div>
            </Modal>
        </Fragment>
    )
}

export default ForgetPasswordModal;