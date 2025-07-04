import { Button, Divider, TextField, Typography, CircularProgress } from '@mui/material';
import React, { Fragment } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect } from 'react';

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
                    <Typography sx={{ fontSize: "20px" }}>Princing Custom Form</Typography>
                    <Divider />

                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        name="heading"
                        value={princingData.heading}
                        onChange={pricingOnchangeForm}
                        error={submitted && !princingData.heading.trim()}
                    />

                    <TextField
                        label="List Items (comma-separated)"
                        size="small"
                        variant="outlined"
                        multiline
                        minRows={1}
                        sx={{ width: '100%' }}
                        name="listItem"
                        value={princingData.listItem}
                        onChange={pricingOnchangeForm}
                    // error={submitted && !princingData?.listItem.trim()}
                    />

                    <TextField
                        label="Price/Month"
                        size="small"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        name="price"
                        value={princingData.price}
                        onChange={pricingOnchangeForm}
                        error={submitted && !princingData.price.trim()}
                    />

                    <TextField
                        label="Button"
                        size="small"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        name="button"
                        value={princingData.button}
                        onChange={pricingOnchangeForm}
                        error={submitted && !princingData.button.trim()}
                    />

                    <div className='button-wrraper flex justify-end'>
                        {
                            princingMode === "UpdateForm"
                                ?
                                (
                                    <Button
                                        variant="contained"
                                        onClick={updatePrincing}
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
                                        onClick={postPrincingData}
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
                
                </form>
            </div>
        </Fragment>
    );
}

export default PrincingForm;
