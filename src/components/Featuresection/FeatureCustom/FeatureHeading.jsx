import { Button, Checkbox, Divider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Fragment } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function FeatureHeading() {
    const inisiatailState = {
        sectionTitle: "",
        setionDescriptions: "",
        setionImage: ""
    }
    const [featureFrom, setFeatureForm] = useState(inisiatailState)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setImagePreview(URL.createObjectURL(file))

        if (file) {
            setFeatureForm((prev) => ({
                ...prev,
                setionImage: file,
            }));
        }
    };
    const onchangeFeature = (e) => {
        const { name, value } = e.target
        setFeatureForm((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const submitHandler = async () => {

        // const { heroImgUrl, heroSlideSubTitle, heroSlideTitle } = featureFrom
        // if (!heroImgUrl) {
        //     showError("Slider Image is Required !")
        //     return
        // }
        // if (!heroSlideSubTitle) {
        //     showError("Title  is Required !")
        //     return
        // }
        // if (!heroSlideTitle) {
        //     showError("Headline Image is Required !")
        //     return
        // }
        const userId = localStorage.getItem("user-ID")
        const formData = new FormData();
        if (featureFrom.setionImage) {
            formData.append("setionImage", featureFrom.setionImage);
        }

        formData.append("sectionTitle", featureFrom.sectionTitle);
        formData.append("setionDescriptions", featureFrom.setionDescriptions);


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-create-update/${"685efa2843641b31b1b13d1f"}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message)
                // showSnackbar(result.message)
                // setHeroFormData(initialState)
                // setSelectedIcon(null);
                // setInputValue("");
            } else {
                console.error("Error response:", result);
                alert("Failed to update hero section.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        }
    };


    console.log("featureFrom", featureFrom)

    return (
        <Fragment>
            <div className='form-contanier  w-full min-h-[95%] flex flex-col items-center justify-center gap-20'>
                {/* <div className='w-full px-20'>
                    <Button
                        sx={{
                            textTransform: "none",
                            px: 7
                        }}
                        variant='outlined'
                    >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} />  Button
                    </Button>
                </div> */}
                <form className='form-main border border-slate-500/20 rounded-md w-[50%] flex flex-col gap-3 items-center p-5'>
                    <div className='w-full'>
                        <h1>Add  Features Heading</h1>
                        <Divider sx={{
                            my: 1
                        }} />
                    </div>
                    <TextField

                        label="Section Title"
                        size="small"
                        variant="outlined"
                        sx={{
                            width: '100%'
                        }}
                        name="sectionTitle"
                        value={featureFrom.sectionTitle}
                        onChange={onchangeFeature}
                    // error={submitted && !portFormData.title.trim()}
                    // helperText={
                    //     submitted && !portFormData.title.trim() ? 'Title is required' : ''
                    // }
                    />

                    <TextField

                        label="Section Descriptions"
                        size="small"
                        variant="outlined"
                        sx={{
                            width: '100%',
                        }}
                        name="setionDescriptions"
                        value={featureFrom.setionDescriptions}
                        onChange={onchangeFeature}
                    // error={submitted && !portFormData.title.trim()}
                    // helperText={
                    //     submitted && !portFormData.title.trim() ? 'Title is required' : ''
                    // }
                    />

                    <Button
                        sx={{
                            width: '100%',
                            textTransform: "none"
                        }}
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                    // size='small'
                    // color={submitted && !file ? 'error' : 'primary'}
                    >
                        Selete Section Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}

                        />
                    </Button>
                    <div className="flex items-center gap-2  sticky top-0 w-full">
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
                    <div className='button w-full  flex justify-end'>
                        <Button
                            onClick={submitHandler}
                            variant='contained'
                            sx={{
                                textTransform: "none",
                                px: 7
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default FeatureHeading