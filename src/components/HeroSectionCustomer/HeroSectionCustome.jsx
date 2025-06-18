

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
import { Button, IconButton, styled, TextField, Tooltip } from '@mui/material';
import HeroTable from './HeroSectionCustomePages/HeroTable';

export default function HeroSectionCustome() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const [isTureTable, setIsTableTrue] = useState(false)

    const initialState = {
        play_Icone: "",
        hero_Title: "",
        hero_Headline: "",
        hero_Images: "",
        hero_Button: ""

    }
    const [heroFormData, setHeroFormData] = useState(initialState);
    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);
    
    const submitHandler = async () => {
        let payload = {
            HeroSection: [{
                item:
                {

                    play_Icone: heroFormData.play_Icone,
                    hero_Title: heroFormData.hero_Title,
                    hero_Headline: heroFormData.hero_Headline,
                    hero_Images: heroFormData.hero_Images,
                    hero_Button: heroFormData.hero_Button

                }
            }]
        }

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/hero-section/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {

        // const updatedFields = [...heroFormData];
        // updatedFields[index][name] = value;
        // setHeroFormData((pre) => {
        //     pre, [name] = value
        // });

        const { name, value } = event.target;

        setHeroFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));


    };

    console.log("heroFormData", heroFormData)





    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });



    return (
        <div className='hero-all-section w-full   h-[95%] flex items-center flex-col'>

            {
                isTureTable ?
                    <form className='flex justify-center flex-col items-center w-full  min-h-[500px]  px-30 gap-3'>
                        <div className='w-full'>
                            <Button
                                onClick={() => setIsTableTrue(false)}
                                sx={{

                                    px: 10,
                                    textTransform: "none",
                                    fontVariant: "all-small-caps"
                                }} variant="outlined">
                                Hero Section Data
                            </Button>
                        </div>
                        <div className="flex flex-col gap-4 shadow-black shadow-xl  p-5 rounded-md bg-[#1f1e1f]  w-full ">
                            <h1 className='flex justify-start w-full'>Slider Image</h1>
                            <div
                                className="border border-slate-400/20 rounded-md p-5 w-[100%] relative flex justify-center"
                            >
                                <div className="flex flex-col justify-between gap-2 mb-3">
                                    <div className='flex gap-3'>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}

                                            sx={{
                                                textTransform: "none",
                                                fontVariant: 'all-small-caps',
                                                width: '400px'
                                            }}
                                        >
                                            Slider images
                                            <VisuallyHiddenInput
                                                type="file"
                                                // onChange={(event) => console.log(event.)}
                                                multiple
                                            />
                                        </Button>

                                        <TextField
                                            size='small'
                                            name='play_Icone'
                                            value={heroFormData.play_Icone}
                                            onChange={handleChange}
                                            label="Url"
                                            sx={{
                                                width: '400px'
                                            }}
                                        />

                                    </div>

                                    <div className='flex gap-3' >

                                        <TextField
                                            size='small'
                                            label="Title"
                                            name='hero_Title'
                                            value={heroFormData.hero_Title}
                                            onChange={handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            size='small'
                                            label="Heading"
                                            name='hero_Headline'
                                            value={heroFormData.hero_Headline}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>

                                    <div className='flex gap-3 ' >

                                        <TextField
                                            size='small'
                                            label="Button Text 1"
                                            name='hero_Button'
                                            value={heroFormData.hero_Button}
                                            onChange={handleChange}
                                            fullWidth
                                        />

                                        <TextField
                                            size='small'
                                            label="Button Text 2"
                                            name='play_Icone'
                                            // value={heroFormData.play_Icone}
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
                    <HeroTable setIsTableTrue={setIsTableTrue} />
            }


        </div>
    );
}
