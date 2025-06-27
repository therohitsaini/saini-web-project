import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../Store/ApisStore/ApisCollection';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, IconButton, InputAdornment, styled, TextField, Tooltip } from '@mui/material';
import HeroTable from './HeroSectionCustomePages/HeroTable';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export default function HeroSectionCustome() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const [isTureTable, setIsTableTrue] = useState(false)
    const [userId, setUserId] = useState()
    const [heroDataByID, setHeroDataByID] = useState([])

    const initialState = {
        heroImgUrl: "",
        heroPlay_Button: "",
        heroSlideSubTitle: "",
        heroSlideTitle: "",
        heroButton_One: "",
        heroButton_Two: ""

    }
    const [heroFormData, setHeroFormData] = useState(initialState);
    const data = useSelector((state) => state?.getHeaderDataReducer_);

    console.log("heroFormData", heroFormData)

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
        allFaMdIcons.find((i) => i.label === heroFormData?.heroPlay_Button) || null
    )

    useEffect(() => {

        const idFromStorage = localStorage.getItem("user-ID");
        if (idFromStorage && /^[0-9a-fA-F]{24}$/.test(idFromStorage)) {
            setUserId(idFromStorage);
        } else {
            console.warn("Invalid or missing user ID.");
        }

    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setHeroFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroFormData((prev) => ({
                ...prev,
                heroImgUrl: file,
            }));
        }
    };

    const submitHandler = async () => {
        const formData = new FormData();
        if (heroFormData.heroImgUrl) {
            formData.append("heroImg", heroFormData.heroImgUrl);
        }


        formData.append("heroPlay_Button", heroFormData.heroPlay_Button);
        formData.append("heroSlideSubTitle", heroFormData.heroSlideSubTitle);
        formData.append("heroSlideTitle", heroFormData.heroSlideTitle);
        formData.append("heroButton_One", heroFormData.heroButton_One);
        formData.append("heroButton_Two", heroFormData.heroButton_Two);

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/hero-section/${userId}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert("Sussfully ")
                console.log("Updated Data:", result);
            } else {
                console.error("Error response:", result);
                alert("Failed to update hero section.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const getHeroDataByID = async (userId) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-hero/get-hero-image/by-id/${userId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });


            const JsonData = await response.json();

            if (response.ok) {
                setHeroDataByID(JsonData)
            }
            else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Network error:", error);
            return null;
        }
    };

    useEffect(() => {
        getHeroDataByID(userId)
    }, [])






    return (
        <div className='hero-all-section w-full   h-[95%] flex items-center flex-col'>
            {
                isTureTable ?
                    <form className='flex justify-center flex-col items-center w-full  min-h-[560px]  px-30 gap-3'>
                        <div className='w-full'>
                            <Button
                                onClick={() => setIsTableTrue(false)}
                                sx={{

                                    px: 10,
                                    textTransform: "none",
                                    fontVariant: "all-small-caps"
                                }} variant="outlined">
                                Back
                            </Button>

                        </div>
                        <div className="flex flex-col gap-4 border border-slate-800  p-5 rounded-md   w-full ">
                            <h1 className='flex justify-start w-full'>Slider Image</h1>
                            <div
                                className="border border-slate-400/20 rounded-md p-5 w-[100%] relative flex justify-center"
                            >
                                <div className="flex flex-col justify-between gap-2 mb-3">
                                    <div className='flex gap-3'>

                                        <Button
                                            sx={{
                                                width: '400px'
                                            }}
                                            component="label"
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Image
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </Button>

                                        {/* <TextField
                                            size='small'
                                            fullWidth
                                            name='heroPlay_Button'
                                            value={heroFormData.heroPlay_Button}
                                            onChange={handleChange}
                                            label="heroPlay_Button"
                                           
                                        /> */}

                                        <Autocomplete
                                            options={allFaMdIcons}
                                            value={selectedIcon}

                                            onChange={(e, newValue) => {
                                                if (newValue) setSelectedIcon(newValue);
                                                setHeroFormData((prev) => ({
                                                    ...prev,
                                                    heroPlay_Button: newValue ? newValue.label : "",
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
                                                    sx={{
                                                        width: '400px'
                                                    }}
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

                                    </div>

                                    <div className='flex gap-3' >

                                        <TextField
                                            size='small'
                                            label="Title"
                                            name='heroSlideSubTitle'
                                            value={heroFormData.heroSlideSubTitle}
                                            onChange={handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            size='small'
                                            label="Heading"
                                            name='heroSlideTitle'
                                            value={heroFormData.heroSlideTitle}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>

                                    <div className='flex gap-3 ' >

                                        <TextField
                                            size='small'
                                            label="Button Text 1"
                                            name='heroButton_One'
                                            value={heroFormData.heroButton_One}
                                            onChange={handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            size='small'
                                            label="Button Text 2"
                                            name='heroButton_Two'
                                            value={heroFormData.heroButton_Two}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='button-wrraper flex justify-end'>

                                <Button variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        px: 10
                                    }}
                                    onClick={submitHandler}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </form>
                    :
                    <HeroTable setIsTableTrue={setIsTableTrue} userId={userId} setHeroFormData={setHeroFormData} />
            }


        </div >
    );
}


// import React, { useState } from 'react';
// import { Button, TextField, styled } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

// export default function HeroSectionCustom() {
//     const [heroFormData, setHeroFormData] = useState({
//         heroImgUrl: null,
//         heroPlay_Button: '',
//         heroSlideSubTitle: '',
//         heroSlideTitle: '',
//         heroButton_One: '',
//         heroButton_Two: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setHeroFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setHeroFormData((prev) => ({
//                 ...prev,
//                 heroImgUrl: file
//             }));
//         }
//     };

//     const submitHandler = async () => {
//         try {
//             const formData = new FormData();
//             if (heroFormData.heroImgUrl) {
//                 formData.append('image', heroFormData.heroImgUrl);
//             }

//             formData.append('heroPlay_Button', heroFormData.heroPlay_Button);
//             formData.append('heroSlideSubTitle', heroFormData.heroSlideSubTitle);
//             formData.append('heroSlideTitle', heroFormData.heroSlideTitle);
//             formData.append('heroButton_One', heroFormData.heroButton_One);
//             formData.append('heroButton_Two', heroFormData.heroButton_Two);

//             const response = await fetch('http://localhost:5000/admin-api/hero-section/683e90debc43f5b825e98d4a', {
//                 method: 'PUT',
//                 body: formData
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert('Uploaded successfully!');
//                 console.log(result);
//             } else {
//                 alert('Upload failed.');
//                 console.error(result);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//     console.log("heroFormData", heroFormData)
//     return (
//         <div className='p-5'>
//             <h2>Hero Section Upload</h2>

//             <Button
//                 component="label"
//                 variant="outlined"
//                 startIcon={<CloudUploadIcon />}
//                 sx={{ my: 2 }}
//             >
//                 Upload Image
//                 <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//             </Button>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <TextField
//                     label="Play Button"
//                     name="heroPlay_Button"
//                     value={heroFormData.heroPlay_Button}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Sub Title"
//                     name="heroSlideSubTitle"
//                     value={heroFormData.heroSlideSubTitle}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Main Title"
//                     name="heroSlideTitle"
//                     value={heroFormData.heroSlideTitle}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Button Text 1"
//                     name="heroButton_One"
//                     value={heroFormData.heroButton_One}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Button Text 2"
//                     name="heroButton_Two"
//                     value={heroFormData.heroButton_Two}
//                     onChange={handleChange}
//                 />
//             </div>

//             <Button
//                 variant="contained"
//                 sx={{ mt: 3 }}
//                 onClick={submitHandler}
//             >
//                 Submit All Data
//             </Button>
//         </div>
//     );
// }

