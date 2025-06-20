import { Autocomplete, Box, Button, Divider, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import ServiceTable from './ServiceTable';

function ServiceCustom() {
    const [serviceTableTrue, setServiceTableTrue] = useState(true)
    const [serviceCustom, setServiceCustom] = useState(
        {
            iconeTop: "",
            iconeBottom: "",
            serviceHeading: "",
            ServiceDescription: "",

        }
    )

    const servieOnchange = async (event) => {
        const { name, value } = event.target
        setServiceCustom((pre) => ({
            ...pre,
            [name]: value

        }))
    }

    const serviceHadnler = async () => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/service-card/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceCustom)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }
        } catch (error) {
            console.log("Internal Error", error)
        }
    }

    const allFaMdIcons_ = [

        ...Object.entries(MdIcons),
        ...Object.entries(FaIcons),

    ]

    const allFaMdIcons = allFaMdIcons_.map(([name, Icon]) => ({
        label: name,
        Icon
    }))

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIcons.find((i) => i.label === '')
    )
    return (
        <Fragment>

            <div className='service main  h-[580px] flex items-center justify-center flex-col gap-10'>

                {

                    serviceTableTrue
                        ?
                        <form className='service-form flex flex-col w-[600px] gap-4  border border-slate-400/20 rounded-md p-5   '>
                            <div className='w-[580px] mb-4'>
                                <Button
                                    onClick={() => setServiceTableTrue(false)}
                                    sx={{ fontVariant: "all-petite-caps" }}
                                    variant='outlined'

                                >Explore Table Data</Button>
                            </div>
                            <h1>Customize Service</h1>
                            <Divider />
                            <TextField
                                size='small'
                                label="serviceHeading"
                                name='serviceHeading'
                                value={serviceCustom.serviceHeading}
                                onChange={servieOnchange}
                            ></TextField>
                            <TextField
                                size='small'
                                label="ServiceDescription"
                                name='ServiceDescription'
                                value={serviceCustom.ServiceDescription}
                                onChange={servieOnchange}
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
                                onClick={serviceHadnler}
                                variant='outlined'
                            >Save Changes</Button>

                        </form>
                        :
                        <ServiceTable setServiceTableTrue={setServiceTableTrue} />
                }



            </div>
        </Fragment>
    )
}

export default ServiceCustom