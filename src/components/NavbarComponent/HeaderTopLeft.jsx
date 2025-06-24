import { Autocomplete, Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
// import { useState } from 'react';
// import { Autocomplete, , Box, Typography, InputAdornment } from '@mui/material';


export const allFaMdIcons_ = {
    ...MdIcons,
    ...FaIcons,
};

function HeaderTopLeft({ formData, setFormData, submitHandler,  }) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    const allFaMdIcons_ = [
        ...Object.entries(MdIcons),
        ...Object.entries(FaIcons),
        // ...MdIcons,
        // ...FaIcons,

    ]

    const allFaMdIcons = allFaMdIcons_.map(([name, Icon]) => ({
        label: name,
        Icon
    }))

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIcons.find((i) => i.label === formData?.item_Icone) || null
    )

    useEffect(() => {
        if (formData?.item_Icone) {
            const foundIcon = allFaMdIcons.find(i => i.label === formData?.item_Icone)
            if (foundIcon) {
                setSelectedIcon(foundIcon)
            }
        }
    }, [formData?.item_Icone])

    return (
        <Fragment >
            <div className='header-left-form-main  h-[530px] flex items-center'>
                <from className="form flex justify-center items-center  h-[420px]  w-full">
                    <div className="border border-slate-400/20 rounded-md p-5  flex flex-col gap-4 w-[80%]">
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


                        <Autocomplete
                            options={allFaMdIcons}
                            value={selectedIcon}
                            // defaultValue={formData.item_Icone}
                            onChange={(e, newValue) => {
                                if (newValue) setSelectedIcon(newValue);
                                setFormData((prev) => ({
                                    ...prev,
                                    item_Icone: newValue ? newValue.label : "", // Save icon name like "FaPhone" or "MdEmail"
                                }));
                            }}
                            size='small'

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
                                    label="Search Iocne"
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
            </div>
        </Fragment>
    )
}

export default HeaderTopLeft
