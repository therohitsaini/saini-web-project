import { Autocomplete, Box, Button, Checkbox, Divider, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft'
import { useState } from 'react'
import { useMemo } from 'react'

function InFoForm({ setInFoService, inFoService, infoHandler, inFoIsTrue, infoUpdateHandler }) {



    const inFoOnchange = (event) => {
        const { name, value } = event.target
        setInFoService((pre) => ({
            ...pre, [name]: value
        }))

    }

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
                <form className='service-form flex flex-col w-[500px] gap-4  border border-slate-400/20 rounded-md p-5  '>
                    <h1>Customize Service</h1>
                    <Divider />
                    <TextField
                        size='small'
                        label="Title"
                        name='inFoHeading'
                        value={inFoService.inFoHeading}
                        onChange={inFoOnchange}
                    ></TextField>
                    <TextField
                        size='small'
                        label="Description"
                        name='inFoDescription'
                        value={inFoService.inFoDescription}
                        onChange={inFoOnchange}
                    ></TextField>

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
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

                    {
                        inFoIsTrue === "Edit" ?
                            (
                                <Button
                                    onClick={() => infoUpdateHandler()}
                                    variant='outlined'
                                >
                                    Update
                                </Button>
                            )

                            : (
                                <Button
                                    onClick={() => infoHandler("ServiceInFo")}
                                    variant='outlined'
                                >Save Changes
                                </Button>
                            )
                    }

                </form>

            </div>
        </Fragment>
    )
}

export default InFoForm