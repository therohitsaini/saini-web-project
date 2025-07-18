import { Avatar, Button, Checkbox, CircularProgress, Divider, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { useEffect } from 'react';

function TeamForm({ teamForm, teamData, setTeamForm, submitHandler, loading }) {
    const [imagePreview, setImagePreview] = useState(null);

    const onchangeTeam = (e) => {
        const { name, value } = e.target
        setTeamForm((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))

        if (file) {
            setTeamForm((prev) => ({
                ...prev,
                teamBgImage: file,
            }));
        }
    };

    useEffect(() => {
        if (teamData && teamData[0]?.teamBgImage) {
            const image = teamData[0].teamBgImage;
            const imgSrc = image.startsWith('http')
                ? image
                : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${image.replace(/^\/?/, '')}`;
            setImagePreview(imgSrc);
        }
    }, [teamData]);

  

    return (
        <Fragment>
            <div className='form-contanier  w-full h-[580px] flex flex-col items-center justify-center gap-20 '>

                <form className='form-main border border-slate-500/20 rounded-md w-[50%] flex flex-col gap-4 items-center p-5 '>
                    <div className='w-full'>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
                            Add Team Section Heading
                        </h1>
                        <Divider sx={{
                            my: 1
                        }} />
                    </div>
                    <div className='flex items-center w-full gap-4'>
                        <Avatar src={imagePreview} sx={{
                            height: 56, width: 56,
                        }}
                        />
                        <Button
                            sx={{
                                width: 250,
                                p: 1,
                                textTransform: 'none',
                                color: "white"
                            }}
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}

                        >
                            Upload BackGround Image
                            <input
                                type="file"
                                hidden
                                name='teamBgImage'
                                accept="image/*"
                                onChange={handleFileChange}

                            />
                        </Button>
                    </div>

                    <TextField
                        label="Section Title"
                        size="small"
                        variant="outlined"
                        name="teamHeading"
                        value={teamForm.teamHeading}
                        onChange={onchangeTeam}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                    />


                    <TextField
                        label="Section Descriptions"
                        size="small"
                        variant="outlined"
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                fontSize: '12px',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        name="teamDescription"
                        value={teamForm.teamDescription}
                        onChange={onchangeTeam}
                    />



                    <div className="flex items-center gap-2  sticky top-0 w-full">
                        <Checkbox
                            defaultChecked
                            sx={{ m: 0, p: 0 }}
                            size="small"
                        />
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>
                    <div className='button w-full  flex justify-end'>
                        <Button
                            onClick={submitHandler}
                            variant='contained'
                            sx={{
                                textTransform: "none",
                                minWidth: "200px",
                                backgroundImage: "linear-gradient(to right, #1e3a8a, #9333ea)",
                                color: "white",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(to right, #1e40af, #7c3aed)",
                                },
                            }}
                        >
                            {
                                loading ?
                                    (
                                        <CircularProgress color='white' size={23} sx={{ color: '#0b9ad2' }} />
                                    )
                                    :
                                    (
                                        "  Submit"
                                    )
                            }

                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default TeamForm