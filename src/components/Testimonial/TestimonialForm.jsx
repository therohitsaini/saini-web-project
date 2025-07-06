import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';

import React from 'react'
import { Fragment } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



function TestimonialForm({ testimonialMode, loading, setTestimonialForm, testimonialForm, submitted, postTestimonialForm, setTestimonialMode,updateTestimonialForm }) {
    const [imagePreview, setImagePreview] = useState(null)

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))

        if (file) {
            setTestimonialForm((prev) => ({
                ...prev,
                userProfile: file,
            }));
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setTestimonialForm((pre) => ({
            ...pre,
            [name]: value
        }))
    }


    return (
        <Fragment>
            <div className="header-left-form-main h-[550px] flex items-center flex-col justify-center">
                <Box sx={{
                    display: "flex",
                    width: "80%",

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Button
                        onClick={() => setTestimonialMode("Table")}
                        variant='outlined'
                        sx={{
                            px: 5,

                        }}
                    >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} />  Back
                    </Button>

                    <div className='img-wrraper h-30 rounded-full w-30'>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover h-full w-full rounded-full"
                            />
                        ) : (
                            <Typography variant="body2" sx={{ p: 1, fontSize: 12, textAlign: "center" }}>
                                Not Found!
                            </Typography>
                        )}
                    </div>
                </Box>
                <form className="form flex justify-center items-center h-[420px] w-[80%]">
                    <div className="border border-slate-400/20 rounded-md p-5 flex flex-col gap-4 w-[80%]">
                        <div className='flex justify-between items-center'>
                            <Typography component="span" fontSize={20}>Create New  </Typography>

                        </div>
                        <Divider />

                        <div className='button-input flex gap-2'>
                            <Button
                                sx={{
                                    width: '96%'
                                }}
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                size='small'
                         
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}

                                />
                            </Button>

                            <TextField

                                label="Title"
                                size="small"
                                variant="outlined"
                                sx={{
                                    width: '100%'
                                }}
                                name="heading"
                                value={testimonialForm.heading}
                                onChange={onChangeHandler}
                                // error={submitted && !testimonialForm.heading.trim()}
                                // helperText={
                                //     submitted && !testimonialForm.heading.trim() ? 'Title is required' : ''
                                // }
                            />
                        </div>

                        <div className='input flex gap-2'>
                            <TextField
                                label="Name"
                                size="small"
                                sx={{
                                    width: "100%"
                                }}
                                variant="outlined"
                                name="userName"
                                value={testimonialForm.userName}
                                onChange={onChangeHandler}
                                error={submitted && !testimonialForm.userName.trim()}
                                helperText={
                                    submitted && !testimonialForm.userName.trim() ? 'Name  is required' : ''
                                }
                            />
                            <TextField
                                label="Role"
                                size="small"
                                variant="outlined"
                                name="occupationRole"
                                value={testimonialForm.occupationRole}
                                onChange={onChangeHandler}
                                sx={{
                                    width: '100%'
                                }}

                            />

                        </div>

                        <div className='AutoComplete-input flex gap-2'>

                            <TextField
                                label="Content"
                                size="small"
                                variant="outlined"
                                name="paragraph"
                                value={testimonialForm.paragraph}
                                onChange={onChangeHandler}
                                sx={{
                                    width: '100%'
                                }}

                            />

                        </div>

                        <div className='button-wrraper flex justify-end'>
                            {
                                testimonialMode === "UpdateForm"
                                    ?
                                    (
                                        <Button
                                            variant="contained"
                                            onClick={updateTestimonialForm}
                                            disabled={loading}
                                            sx={{
                                                textTransform: 'none',
                                                minWidth: 200,
                                                position: 'relative',
                                            }}
                                        >
                                            {loading ? (
                                                <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
                                            ) : (
                                                'Update'
                                            )}
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button
                                            variant="contained"
                                            onClick={postTestimonialForm}
                                            disabled={loading}
                                            sx={{
                                                textTransform: 'none',
                                                minWidth: 200,
                                                position: 'relative',
                                            }}
                                        >
                                            {loading ? (
                                                <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
                                            ) : (
                                                'Submit'
                                            )}
                                        </Button>
                                    )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default TestimonialForm