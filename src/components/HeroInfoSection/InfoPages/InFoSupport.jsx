import { Autocomplete, Box, Button, Divider, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

function InFoSupport({ setSelectedIcon, selectedIcon, allFaMdIcons }) {
    return (
        <Fragment>
            <div className='service main  h-[500px] flex items-center justify-center'>
                <form className='service-form flex flex-col w-[500px] gap-4  border border-slate-400/20 rounded-md p-5 bg-[#1f1e1f]  shadow-black shadow-xl'>
                    <h1>Customize InFo Support</h1>
                    <Divider />
                    <TextField
                        size='small'
                        label="Heading"
                    ></TextField>
                    <TextField
                        size='small'
                        label="Description"
                    ></TextField>

                    <Autocomplete
                        options={allFaMdIcons}
                        value={selectedIcon}
                        onChange={(e, newValue) => {
                            if (newValue) setSelectedIcon(newValue);
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

                    <Button
                        variant='outlined'
                    >Save Changes</Button>

                </form>

            </div>
        </Fragment>
    )
}

export default InFoSupport