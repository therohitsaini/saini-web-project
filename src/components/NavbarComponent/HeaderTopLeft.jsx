import { Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react'


function HeaderTopLeft({ formData, setFormData, submitHandler }) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <Fragment >
            <from className="form flex justify-center items-center  h-[420px]  w-full">
                <div className="border border-slate-400/20 rounded-md p-5 bg-[#1f1e1f] flex flex-col gap-4 w-[80%] shadow-black shadow-xl">
                    <Typography component="span">Top Bar Email Section</Typography>
                    <Divider />
                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        name="item_Title"
                        value={formData?.item_Title}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="Contact"
                        size="small"
                        variant="outlined"
                        name="item_ContactId"
                        value={formData.item_ContactId}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="Icone"
                        size="small"
                        variant="outlined"
                        name="item_Icone"
                        value={formData.item_Icone}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="URL"
                        size="small"
                        variant="outlined"
                        name="item_IconeUrl"
                        value={formData.item_IconeUrl}
                        onChange={onChangeHandler}

                    />

                    <Button sx={{
                        textTransform: 'none',
                    }} onClick={() => submitHandler("HeaderTopLeftBar")}
                        variant='contained'
                    >
                        Save Changes
                    </Button>

                </div>
            </from>
        </Fragment>
    )
}

export default HeaderTopLeft