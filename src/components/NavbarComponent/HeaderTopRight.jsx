import { Autocomplete, Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

function HeaderTopRight({ setFormDataRight, formDataRight, submitHandler, allFaMdIcons, selectedIcon, setSelectedIcon, allFaMdIconsList, filteredIcons, setInputValue, inputValue }) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormDataRight((prevState) => ({
            ...prevState,
            [name]: value,
        })); 1
    };

    // const [selectedIcon, setSelectedIcon] = useState(
    //     allFaMdIconsList.find((i) => i.label === formDataRight?.item_Icone) || null
    // );

    // useEffect(() => {
    //     if (formDataRight?.item_IconeRight && allFaMdIconsList?.length) {
    //         const foundIcon = allFaMdIconsList.find(
    //             (i) => i.label === formDataRight.item_IconeRight
    //         );
    //         if (foundIcon) {
    //             setSelectedIcon(foundIcon);
    //         }
    //     }
    // }, [formDataRight?.item_IconeRight, allFaMdIconsList]);



    return (
        <Fragment >
            <form className='form-header-top-right   flex justify-center items-center  h-[530px]'>
                <div className="border border-slate-400/20 rounded-md p-5  bg-[#1f1e1f] flex flex-col gap-4 w-[80%] shadow-black shadow-xl">
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

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setFormDataRight(prev => ({
                                ...prev,
                                item_IconeRight: newValue ? newValue.label : ""
                            }));
                        }}
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}

                        size='small'
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {option.Icon && <option.Icon />}
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Icon"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: selectedIcon?.Icon && (
                                        <InputAdornment position="start" sx={{ mr: 1 }}>
                                            <selectedIcon.Icon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <TextField
                        label=" Url"
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