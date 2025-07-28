import { Button, Divider } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AboutCustome() {
    const handleFileChange = () => {

    }
    return (
        <Fragment>
            <div className='about-section  border border-red-500 h-full w-full flex items-center justify-center'>
                <form className='about-custome-form border border-slate-500/20 w-[50%] p-3 rounded-md '>

                    <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold">
                        About Section
                    </h1>
                    <Divider sx={{ mb: 1 }} />
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            px: 5
                        }}
                    >
                        Upload video
                        <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileChange} />
                    </Button>

                </form>
            </div>
        </Fragment>
    )
}

export default AboutCustome