import { Autocomplete, Box, Button, Divider, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import ServiceTable from './ServiceTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { allFaMdIconsList } from '../NavbarComponent/HeaderTopLeft';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useSnackbar } from '../Snakbar/Snakbar';

function ServiceCustom() {
    const [serviceTableTrue, setServiceTableTrue] = useState("")
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

    useEffect(() => {
        if (serviceTableTrue === "NewForm") {
            setServiceCustom(serviceCustom);
            setSelectedIcon(null);
            setInputValue("");
        }
        else if (serviceTableTrue === "") {
            setServiceCustom({})
        }
    }, [serviceTableTrue])
    useEffect(() => {

    }, [serviceTableTrue]);

    const snackbar = useSnackbar();
    if (!snackbar) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    const { showSnackbar, showError } = snackbar;

    const serviceHadnler = async () => {
        const { iconeTop, iconeBottom, serviceHeading, ServiceDescription } = serviceCustom

        if (!serviceHeading) {
            showError("Title is Required ! ")
            return
        }
        if (!ServiceDescription) {
            showError("Descriptions is Required ! ")
            return
        }

        const id = localStorage.getItem("user-ID")
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/service-card/${id}`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceCustom)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                showSnackbar(responseJson.message)
            }
        } catch (error) {
            console.log("Internal Error", error)
        }
    }



    const serviceUpdateHandler = async () => {

        const { iconeTop, iconeBottom, serviceHeading, ServiceDescription } = serviceCustom

        if (!serviceHeading) {
            showError("Title is Required ! ")
            return
        }
        if (!ServiceDescription) {
            showError("Descriptions is Required ! ")
            return
        }

        const userId = localStorage.getItem("user-ID")
        const userDocID = serviceCustom._id
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/update-service/card-by-id/${userId}/${userDocID}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceCustom)
            });
            const result = await response.json();
            if (response.ok) {
                alert("Successfully updated!");
                console.log("Updated Data:", result);
            } else {
                console.error("Update failed:", result);
                alert("Update failed. Check console for details.");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIconsList.find((i) => i.label === serviceCustom?.iconeTop) || null
    );
    const [inputValue, setInputValue] = useState('');

    const filteredIcons = useMemo(() => {
        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputValue]);

    useEffect(() => {
        if (serviceCustom?.iconeTop) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === serviceCustom?.iconeTop);
            if (foundIcon) setSelectedIcon(foundIcon);
        }
    }, [serviceCustom?.iconeTop, serviceTableTrue]);


    // const [selectedIconBottom, setSelectedIconBottom] = useState(
    //     allFaMdIconsList.find((i) => i.label === serviceCustom?.iconeBottom) || null
    // );
    // useEffect(() => {
    //     if (serviceCustom?.iconeBottom) {
    //         const foundIcon = allFaMdIconsList.find((i) => i.label === serviceCustom?.iconeBottom);
    //         if (foundIcon) setSelectedIconBottom(foundIcon);
    //     }
    // }, [serviceCustom?.iconeBottom, serviceTableTrue]);



    //       useEffect(() => {
    //     if (mode === "edit") {
    //       const foundTop = allFaMdIconsList.find(i => i.label === form.iconeTop) || null;
    //       const foundBottom = allFaMdIconsList.find(i => i.label === form.iconeBottom) || null;
    //       setSelectedTop(foundTop);
    //       setSelectedBottom(foundBottom);
    //     }
    //   }, [mode, form.iconeTop, form.iconeBottom]);

    return (
        <Fragment>

            <div className='service main  h-[580px] flex items-center justify-center flex-col gap-10 w-full '>

                {

                    serviceTableTrue === "submitForm" || serviceTableTrue === "Edit"
                        ?
                        <div className=' h-full flex flex-col gap-20 justify-center items-center w-[100%]'>
                            <div className='w-[80%] '>
                                <Button
                                    onClick={() => setServiceTableTrue("")}
                                    sx={{
                                        fontVariant: "all-petite-caps",
                                        px: 5
                                    }}
                                    variant='outlined'


                                >
                                    <KeyboardBackspaceIcon sx={{ mr: 1 }} />  Back
                                </Button>
                            </div>
                            <form className='service-form flex flex-col w-[60%]  gap-4  border border-slate-400/20 rounded-md p-5   '>

                                <h1>Customize Service</h1>
                                <Divider />
                                <TextField
                                    size='small'
                                    label="Title"
                                    name='serviceHeading'
                                    value={serviceCustom.serviceHeading}
                                    onChange={servieOnchange}
                                ></TextField>
                                <TextField
                                    size='small'
                                    label="Description"
                                    name='ServiceDescription'
                                    value={serviceCustom.ServiceDescription}
                                    onChange={servieOnchange}
                                ></TextField>

                                <Autocomplete
                                    options={filteredIcons}
                                    value={selectedIcon}
                                    name="iconeTop"
                                    onChange={(e, newValue) => {
                                        if (newValue) setSelectedIcon(newValue);
                                        setServiceCustom((pre) => ({
                                            ...pre,
                                            iconeTop: newValue ? newValue.label : ''
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




                                {
                                    serviceTableTrue === "Edit" ?
                                        (
                                            <Button
                                                onClick={serviceUpdateHandler}
                                                variant='outlined'
                                            >
                                                Update
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button
                                                onClick={serviceHadnler}
                                                variant='outlined'
                                            >
                                                Submit
                                            </Button>
                                        )
                                }

                            </form>
                        </div>

                        :
                        <ServiceTable
                            setServiceTableTrue={setServiceTableTrue}
                            setServiceCustom={setServiceCustom}
                            showSnackbar={showSnackbar}
                        />
                }



            </div>
        </Fragment>
    )
}

export default ServiceCustom