import { Autocomplete, Box, Button, Checkbox, Divider, InputAdornment, TextField, CircularProgress } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft';
import { useMemo } from 'react';
import { inputBaseStyleAccount } from '../../ResueCss/ResuseCss';
import GradientButton from '../../ReuseComponent/ReuseComponent';



function BreadCrumbCustome() {
    const [breadCrumb, setBreadCrumb] = useState({
        breadCrumbImage: "",
        BreadCrumbIcone: "",
        item_ShowOnWebsite: false
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [existingData, setExistingData] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [id, setId] = useState(null)

    useEffect(() => {
        const _id = localStorage.getItem("user-ID")
        setId(_id)
    },[])


    // Fetch existing data on component mount
    console.log("breadCrumb", breadCrumb,id)

    const fetchBreadCrumbData = async () => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/breadcrumb/api-bread-crumb-update/${id}`
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const responseJson = await response.json()
            if (response.ok) {
                console.log(responseJson)
            }

        } catch (error) {
            console.error('Error fetching breadcrumb data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBreadCrumbData()
    }, [])

    const SubmitHandler = async () => {
        const docsId = ""
        setLoading(true);
        try {
            const formData = new FormData();

            if (breadCrumb.breadCrumbImage instanceof File) {
                formData.append("breadCrumbImage", breadCrumb.breadCrumbImage);
            }

            formData.append("BreadCrumbIcone", breadCrumb.BreadCrumbIcone);
            formData.append("item_ShowOnWebsite", breadCrumb.item_ShowOnWebsite);

            const methord = docsId ? "PUT" : "POST"
            const url = docsId ? `${import.meta.env.VITE_BACK_END_URL}api/breadcrumb/api-bread-crumb-update/${id}/${docsId}`
                :
                `${import.meta.env.VITE_BACK_END_URL}api/breadcrumb/api-bread-crumb-post/${id}`;

            const response = await fetch(url, {
                method: methord,
                headers: { "Content-Type": "application/json" },
                body: formData
            })
            const responseJson = await response.json()
            if (response.ok) {
                console.log(responseJson)
            }

        } catch (error) {
            console.error('Error submitting breadcrumb:', error);
            alert('An error occurred while saving the breadcrumb');
        } finally {
            setLoading(false);
        }
    }



    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIconsList.find((i) => i.label === breadCrumb?.BreadCrumbIcone) || null
    );
    const [inputValue, setInputValue] = useState('');

    const filteredIcons = useMemo(() => {
        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setBreadCrumb((prev) => ({
                ...prev,
                breadCrumbImage: file,
            }));
        }
    };
    if (loading && !existingData) {
        return (
            <div className='breadcurmbsection h-full w-full flex justify-center items-center'>
                <CircularProgress size={60} />
            </div>
        );
    }

    return (
        <Fragment>
            <div className='breadcurmbsection h-full w-full flex justify-center items-center'>
                <form className='form border border-slate-500/20 p-5 w-[50%] rounded-md flex flex-col gap-3'>
                    <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold">
                        {isEditMode ? 'Edit Bread Crumb Section' : 'Create Bread Crumb Section'}
                    </h1>
                    <Divider sx={{ mb: 1 }} />
                    <div className=' flex flex-col gap-3'>
                        <Button
                            sx={{
                                width: '400px',
                                textTransform: "none"
                            }}
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Background Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>

                        <Autocomplete
                            size="small"
                            options={filteredIcons}
                            value={selectedIcon}
                            onChange={(e, newValue) => {
                                setSelectedIcon(newValue);
                                setBreadCrumb((prev) => ({
                                    ...prev,
                                    BreadCrumbIcone: newValue ? newValue.label : '',
                                }));
                            }}
                            inputValue={inputValue}
                            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.label === value?.label}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <option.Icon size={18} />
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Icon"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: selectedIcon?.Icon && (
                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                <selectedIcon.Icon size={18} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={inputBaseStyleAccount}
                                />
                            )}
                        />
                        <div>
                            {imagePreview && <div>
                                <p className=' font-mono text-slate-500'> Image Previw</p>
                                <div className='h-40'>
                                    <img className='object-cover h-full w-full rounded-md' src={imagePreview} />

                                </div>
                            </div>
                            }

                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={breadCrumb?.item_ShowOnWebsite || false}
                            onChange={(e) =>
                                setBreadCrumb((prev) => ({
                                    ...prev,
                                    item_ShowOnWebsite: e.target.checked,
                                }))
                            }
                            sx={{ m: 0, p: 0 }}
                            size="small"
                            color="default"
                        />
                        <p className="text-[13px] text-slate-300">
                            If you want to show this on the website
                        </p>
                    </div>
                    <GradientButton
                        onClick={SubmitHandler}
                        disabled={loading}
                        sx={{ position: 'relative' }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                                {isEditMode ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            isEditMode ? 'Update Changes' : 'Save Changes'
                        )}
                    </GradientButton>

                </form>

            </div>
        </Fragment>
    )
}

export default BreadCrumbCustome