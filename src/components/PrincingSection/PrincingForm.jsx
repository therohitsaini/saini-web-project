import { Button, Divider, TextField, Typography, CircularProgress, Checkbox } from '@mui/material';
import React, { Fragment } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect } from 'react';
import GradientButton from '../ReuseComponent/ReuseComponent';

function PrincingForm({ princingData, setPrincingData, postPrincingData, setLoading, loading, submitted, setPrincingMode, princingMode, updatePrincing, initialState }) {

    const pricingOnchangeForm = (event) => {
        const { name, value } = event.target;
        setPrincingData((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    useEffect(() => {
        if (princingMode === "SubmitForm") {
            setPrincingData(initialState)
        }
    }, [princingMode])

    return (
        <Fragment>
            <div className='princing-form-main h-[95%] flex flex-col justify-center items-center gap-20'>
                <div className='back-button w-[90%]'>
                    <Button
                        onClick={() => setPrincingMode("Table")}
                        variant='outlined'
                        sx={{ px: 5 }}
                    >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} />
                        Back
                    </Button>
                </div>

                <form className='form w-[65%] border border-slate-500/20 flex flex-col gap-5 p-4 px-7 rounded-md shadow-2xl shadow-black/20'>
                    <h1 className=' text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' >Princing Custom Form</h1>
                    <Divider sx={{ mb: 1 }} />

                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"

                        name="heading"
                        value={princingData.heading}
                        onChange={pricingOnchangeForm}
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
                            '& label': {
                                color: 'gray',
                                fontSize: '14px',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            }
                        }}
                        error={submitted && !princingData.heading.trim()}
                    />

                    <TextField
                        label="List Items (comma-separated)"
                        size="small"
                        variant="outlined"
                        multiline
                        minRows={1}
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
                            '& label': {
                                color: 'gray',
                                fontSize: '14px',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            }
                        }}
                        name="listItem"
                        value={princingData.listItem}
                        onChange={pricingOnchangeForm}
                    // error={submitted && !princingData?.listItem.trim()}
                    />

                    <TextField
                        label="Price/Month"
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
                            '& label': {
                                color: 'gray',
                                fontSize: '14px',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            }
                        }}
                        name="price"
                        value={princingData.price}
                        onChange={pricingOnchangeForm}
                        error={submitted && !princingData.price.trim()}
                    />

                    <TextField
                        label="Button"
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
                            '& label': {
                                color: 'gray',
                                fontSize: '14px',
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                            }
                        }}
                        name="button"
                        value={princingData.button}
                        onChange={pricingOnchangeForm}
                        error={submitted && !princingData.button.trim()}
                    />
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={true}
                            // onChange={(e) =>
                            //     setFormData((prev) => ({
                            //         ...prev,
                            //         item_ShowOnWebsite: e.target.checked,
                            //     }))
                            // }
                            sx={{ m: 0, p: 0 }}
                            size="small"
                            color='default'
                        />
                        <p className="text-[14px] text-slate-500">
                            If you want to show this on the website
                        </p>
                    </div>

                    <div className='button-wrraper flex justify-end'>
                        {
                            princingMode === "UpdateForm"
                                ?
                                (
                                    <GradientButton

                                        onClick={updatePrincing}
                                        disabled={loading}

                                    >
                                        {loading ? (
                                            <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
                                        ) : (
                                            'Update'
                                        )}
                                    </GradientButton>
                                )
                                :
                                (
                                    <GradientButton

                                        onClick={postPrincingData}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
                                        ) : (
                                            'Submit'
                                        )}
                                    </GradientButton>
                                )
                        }
                    </div>

                </form>
            </div>
        </Fragment>
    );
}

export default PrincingForm;
