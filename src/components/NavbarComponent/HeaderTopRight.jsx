import { Autocomplete, Box, Button, Checkbox, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import GradientButton from '../ReuseComponent/ReuseComponent';

function HeaderTopRight({
    setFormDataRight,
    formDataRight,
    submitHandler,
    allFaMdIcons,
    selectedIcon,
    setSelectedIcon,
    allFaMdIconsList,
    filteredIcons,
    setInputValue,
    inputValue,
    loading

}) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormDataRight((prevState) => ({
            ...prevState,
            [name]: value,
        })); 1
    };

    useEffect(() => {
        if (formDataRight?.item_IconeRight) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === formDataRight?.item_IconeRight);
            if (foundIcon) setSelectedIcon(foundIcon);
        }
    }, [formDataRight?.item_IconeRight]);



    return (
        <Fragment >
            <form className='form-header-top-right   flex justify-center items-center  h-[530px]'>
                <div className="border border-slate-400/20 rounded-md p-5  flex flex-col gap-4 w-[80%] ">
                    <h1 className='text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Top Bar Support Section</h1>
                    <Divider sx={{ mb: 1 }} />
                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        name="item_TitleRight"
                        value={formDataRight?.item_TitleRight || ''}
                        onChange={onChangeHandler}
                        sx={{
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
                    />
                    <TextField
                        label="Contact"
                        size="small"
                        variant="outlined"
                        name="item_ContactIdRight"
                        value={formDataRight.item_ContactIdRight}
                        onChange={onChangeHandler}
                        sx={{
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
                                sx={{
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
                            />
                        )}
                    />

                    <TextField
                        label=" Url"
                        size="small"
                        // disabled
                        variant="outlined"
                        name="item_IconeUrlRight"
                        value={formDataRight.item_IconeUrlRight}
                        onChange={onChangeHandler}
                        sx={{
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
                    />

                    <div className="flex items-center gap-2  sticky top-0">
                        <Checkbox
                            defaultChecked
                            color='defualt'

                            // checked={formData?.item_ShowOnWebsite || false}
                            // onChange={(e) =>
                            //     setIconeCenter((prev) => ({
                            //         ...prev,
                            //         item_ShowOnWebsite: e.target.checked,
                            //     }))
                            // }
                            sx={{ m: 0, p: 0 }}
                            size="small"
                        />
                        <p className="text-[12px] text-slate-500/70 font-semibold">
                            If you want to show this on the website
                        </p>
                    </div>

                    <div className='button flex justify-end'>
                        <GradientButton
                            onClick={() => submitHandler("HeaderTopRightBar")}
                            loading={loading}
                        >
                            Save Changes
                        </GradientButton>

                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default HeaderTopRight