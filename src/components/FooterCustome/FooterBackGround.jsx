import { Button } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
// import UploadFileIcon from "@mui/material"

function FooterBackGround() {
    const handleImageUpload = () => {

    }
    return (
        <Fragment>
            <div className='footer-bg-colour border border-red-900 h-[100%] w-full flex justify-center items-center'>
                <form className='bg-form-footer h-full w-full'>
                    <Button sx={{ textTransform: "none", px: 5, fontVariant: "all-small-caps" }} component="label" variant="contained" >
                        Upload Image
                        <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                    </Button>
                </form>

            </div>
        </Fragment>
    )
}

export default FooterBackGround