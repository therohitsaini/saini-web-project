

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
import HeroAllComponents from './HeroSectionCustomePages/HeroAllComponents';

export default function HeroSectionCustome() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const initialState = {
        play_Icone: "",
        hero_Title: "",
        hero_Headline: "",
        hero_Images: "",
        hero_Button: ""

    }

    // const initialStateRight = {
    //     item_ContactIdRight: "",
    //     item_TitleRight: "",
    //     item_IconeRight: "",
    //     item_IconeUrlRight: ""
    // }
    const [heroFormData, setHeroFormData] = useState([initialState]);
    // const [formDataRight, setFormDataRight] = useState(initialStateRight)
    // const [iconFields, setIconFields] = useState([
    //     { menuItem: '', menuItemRoute: '' }
    // ]);

    // const [headerButtom, setHeaderButtom] = useState(
    //     { hirringTitle: "", openingTime: "", closeTimnig: "" }
    // )

    // console.log("navMenuItem", iconFields)



    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);

    // useEffect(() => {
    //     dispatch(getHeaderData());
    // }, [dispatch]);

    // useEffect(() => {

    //     if (headerToBarData?.headerData?.headerTopBar?.length > 0) {
    //         const topLeft = headerToBarData.headerData.headerTopBar.find(
    //             (section) => section.section === "HeaderTopLeftBar"
    //         )?.item[0];

    //         const topRight = headerToBarData.headerData.headerTopBar.find(
    //             (section) => section.section === "HeaderTopRightBar"
    //         )?.item[0];


    //         setFormData((pre) => ({

    //             pre,
    //             item_Title: topLeft?.item_Title || "",
    //             item_ContactId: topLeft?.item_ContactId || "",
    //             item_Icone: topLeft?.item_Icone || "",
    //             item_IconeUrl: topLeft?.item_IconeUrl || "",

    //         }))

    //         setFormDataRight((pre) => ({

    //             pre,
    //             item_TitleRight: topRight?.item_Title || "",
    //             item_ContactIdRight: topRight?.item_ContactId || "",
    //             item_IconeRight: topRight?.item_Icone || "",
    //             item_IconeUrlRight: topRight?.item_IconeUrl || "",

    //         }))

    //         const navBarListItem = headerToBarData.headerData.headerTopBar.find(
    //             (section) => section.section === "NavManuItem"
    //         )?.item;

    //         const mappedMenuItems = navBarListItem?.map(data => ({
    //             menuItem: data.item_Title || '',
    //             menuItemRoute: data.item_IconeUrl || '',
    //         }));

    //         setIconFields(mappedMenuItems)

    //     }


    // }, [headerToBarData])

    const submitHandler = async (section) => {
        let payload;

        if (section === "HeroSection") {

            payload = {

                section: section,
                item: [
                    {

                        play_Icone: heroFormData.play_Icone,
                        hero_Title: heroFormData.hero_Title,
                        hero_Headline: heroFormData.hero_Headline,
                        hero_Images: heroFormData.hero_Images,
                        hero_Button: heroFormData.hero_Button

                    }
                ]
            };
        }
        // else if (section === "HeaderTopRightBar") {

        //     payload = {
        //         section: section,
        //         item: [
        //             {
        //                 item_ContactId: formDataRight.item_ContactIdRight,
        //                 item_Title: formDataRight.item_TitleRight,
        //                 item_Icone: formDataRight.item_IconeRight,
        //                 item_IconeUrl: formDataRight.item_IconeUrlRight,
        //             }
        //         ]
        //     };
        // } else if (section === "NavManuItem") {
        //     payload = {
        //         section: section,
        //         item: iconFields.map(field => ({
        //             item_Title: field.menuItem,
        //             item_IconeUrl: field.menuItemRoute
        //         }))
        //     };
        // }


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

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...heroFormData];
        updatedFields[index][name] = value;
        setHeroFormData(updatedFields);
    };

    // Add new field set
    const addNewField = () => {
        const inistialState = {
            play_Icone: "",
            hero_Title: '',
            hero_Headline: '',
            hero_Button: "",
            hero_Images: ""
        }
        setHeroFormData([...heroFormData, inistialState]);
    };

    // Remove a field set
    const removeField = (index) => {
        const updatedFields = heroFormData.filter((_, i) => i !== index);
        setHeroFormData(updatedFields);
    };

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
            <form className='flex justify-center flex-col items-center w-full  min-h-[500px]'>

                <div className="flex flex-col gap-4 shadow-black shadow-xl  p-5 rounded-md bg-[#1f1e1f]  ">
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
                                    images
                                    <VisuallyHiddenInput
                                        type="file"
                                        // onChange={(event) => console.log(event.)}
                                        multiple
                                    />
                                </Button>

                                <TextField
                                    size='small'
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
                                    fullWidth
                                />

                                <TextField
                                    size='small'
                                    label="Heading"
                                    fullWidth
                                />
                            </div>

                            <div className='flex gap-3 ' >

                                <TextField
                                    size='small'
                                    label="Button Text 1"
                                    fullWidth
                                />

                                <TextField
                                    size='small'
                                    label="Button Text 2"
                                    fullWidth
                                />
                            </div>

                            {/* <div className='flex justify-end'>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => removeField(index)}
                                                color="error"
                                                disabled={heroFormData.length === 1}
                                            >
                                                <DeleteIcon />
                                            </IconButton >
                                        </Tooltip>
                                    </div> */}
                        </div>
                    </div>


                    <div className='button-wrraper flex justify-end'>
                        {/* <Button
                            onClick={addNewField}
                            variant="contained"
                            className="w-fit"
                            sx={{
                                textTransform: "none",
                                fontFamily: 'revert',
                                fontVariant: 'all-small-caps'
                            }}
                        >
                            + Add More Image
                        </Button> */}

                        <Button variant="contained"
                            sx={{
                                textTransform: "none",
                                px: 10
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>

            <HeroAllComponents />
        </div>
    );
}
