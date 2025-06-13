import { Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

function HeaderTopRight({ setFormDataRight, formDataRight, submitHandler }) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormDataRight((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Fragment >
            <form className='form-header-top-right   flex justify-center items-center  h-[420px]'>
                <div className="border border-slate-400/20 rounded-md p-5  bg-[#1f1e1f] flex flex-col gap-4 w-[80%]">
                    <Typography component="span">Top Bar Support Section</Typography>
                    <Divider />
                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        name="item_TitleRight"
                        value={formDataRight?.item_TitleRight || ''}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="Contact"
                        size="small"
                        variant="outlined"
                        name="item_ContactIdRight"
                        value={formDataRight.item_ContactIdRight}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="Icone"
                        size="small"
                        variant="outlined"
                        name="item_IconeRight"
                        value={formDataRight.item_IconeRight}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        label="Icone Url"
                        size="small"
                        variant="outlined"
                        name="item_IconeUrlRight"
                        value={formDataRight.item_IconeUrlRight}
                        onChange={onChangeHandler}
                    />

                    <Button onClick={() => submitHandler("HeaderTopRightBar")} variant='contained'>Update</Button>
                </div>
            </form>
        </Fragment>
    )
}

export default HeaderTopRight