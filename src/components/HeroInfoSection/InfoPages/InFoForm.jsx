import { Autocomplete, Box, Button, Divider, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

function InFoForm({ setSelectedIcon, selectedIcon, allFaMdIcons, setInFoService, inFoService, infoHandler }) {

    console.log("inFoService", inFoService)
    console.log("selectedIcon", selectedIcon)
    const inFoOnchange = (event) => {
        const { name, value } = event.target
        setInFoService((pre) => ({
            ...pre, [name]: value
        }))

    }
    return (
        <Fragment>
            <div className='service main  h-[590px] flex items-center justify-center'>
                <form className='service-form flex flex-col w-[500px] gap-4  border border-slate-400/20 rounded-md p-5 bg-[#1f1e1f]  '>
                    <h1>Customize Service</h1>
                    <Divider />
                    <TextField
                        size='small'
                        label="Heading"
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
                        options={allFaMdIcons}
                        value={selectedIcon}
                        name="inFoIcone"
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
                        onClick={() => infoHandler("ServiceInFo")}
                        variant='outlined'
                    >Save Changes</Button>

                </form>

            </div>
        </Fragment>
    )
}

export default InFoForm