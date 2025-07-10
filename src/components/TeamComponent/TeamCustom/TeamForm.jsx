import { Button, Checkbox, CircularProgress, Divider, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

function TeamForm({ teamForm, setTeamForm, submitHandler, loading }) {

    const onchangeTeam = (e) => {
        const { name, value } = e.target
        setTeamForm((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setImagePreview(URL.createObjectURL(file))

        if (file) {
            setTeamForm((prev) => ({
                ...prev,
                teamBgImage: file,
            }));
        }
    };

    console.log("teamForm", teamForm)
    return (
        <Fragment>
            <div className='form-contanier  w-full h-[580px] flex flex-col items-center justify-center gap-20 '>

                <form className='form-main border border-slate-500/20 rounded-md w-[50%] flex flex-col gap-3 items-center p-5'>
                    <div className='w-full'>
                        <h1>Add  Team Section Heading</h1>
                        <Divider sx={{
                            my: 1
                        }} />
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


                    <Button
                        sx={{
                            width: '100%',
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: 'blue',
                            },
                            '&.Mui-focused': {
                                borderColor: 'blue',
                            },
                            // border:"1px solid blue",
                            backgroundColor: "transparent",
                            color: "white"
                        }}
                        component="label"
                        variant="outlined"
                    // startIcon={<CloudUploadIcon />}

                    >
                        Selete Section Image
                        <input
                            type="file"
                            hidden
                            name='teamBgImage'
                            accept="image/*"
                            onChange={handleFileChange}

                        />
                    </Button>
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
                                backgroundColor: "blue",
                                color: "white"
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