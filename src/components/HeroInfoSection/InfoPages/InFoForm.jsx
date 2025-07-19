import { Autocomplete, Box, Button, Checkbox, Divider, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft'
import { useState } from 'react'
import { useMemo } from 'react'
import GradientButton from '../../ReuseComponent/ReuseComponent'
import { useEffect } from 'react'

function InFoForm({ setInFoService, inFoService, infoHandler, inFoIsTrue, infoUpdateHandler }) {



    const inFoOnchange = (event) => {
        const { name, value } = event.target
        setInFoService((pre) => ({
            ...pre, [name]: value
        }))

    }

    useEffect(() => {
        if (inFoIsTrue === "Save") {
            setInFoService({
                inFoHeading: "",
                inFoDescription: "",
                inFoIcone: ""
            })
            setSelectedIcon(null); 
            setInputValue("");
        }
    }, [])

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIconsList.find((i) => i.label === inFoService?.inFoIcone) || null
    );
    const [inputValue, setInputValue] = useState('');

    const filteredIcons = useMemo(() => {
        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50); // default first 50
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputValue]);



    return (
        <Fragment>
            <div className='service main  h-[500px] flex items-center justify-center'>
                <form className='service-form flex flex-col w-[550px] gap-4  border border-slate-400/20 rounded-md p-5  '>
                    <h1 className=' text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Info Section</h1>
                    <Divider sx={{ mb: 1 }} />
                    <TextField
                        size='small'
                        label="Title"
                        name='inFoHeading'
                        value={inFoService.inFoHeading}
                        onChange={inFoOnchange}
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
                    ></TextField>
                    <TextField
                        size='small'
                        label="Description"
                        name='inFoDescription'
                        value={inFoService.inFoDescription}
                        onChange={inFoOnchange}
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
                    ></TextField>

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
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
                        name="inFoIcone"
                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setInFoService((pre) => ({
                                ...pre,
                                inFoIcone: newValue ? newValue.label : ''
                            }))
                        }}
                        size='small'
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label=" Iocne"
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
                    <div className="flex items-center gap-2  sticky top-0">
                        <Checkbox
                            defaultChecked
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
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>
                    <div className='w-full flex justify-end'>
                        {
                            inFoIsTrue === "Edit" ?
                                (
                                    <GradientButton
                                        onClick={() => infoUpdateHandler()}

                                    >
                                        Update Documents
                                    </GradientButton>
                                )

                                : (
                                    <GradientButton
                                        onClick={() => infoHandler("ServiceInFo")}


                                    >
                                        Save Documents
                                    </GradientButton>
                                )
                        }
                    </div>
                </form>

            </div>
        </Fragment>
    )
}

export default InFoForm