import { Button, Checkbox, Divider, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function FeatureHeading({ showSnackbar }) {
    const inisiatailState = {
        sectionTitle: "",
        setionDescriptions: "",
        setionImage: ""
    }
    const [featureFrom, setFeatureForm] = useState(inisiatailState)
    const [id, setId] = useState()
    const [FeatureData, setFeatureData] = useState([])

    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setId(userID)
    }, [])
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

        const sectioID = FeatureData[0]
        const sectionId = sectioID._id

        const formData = new FormData();
        if (featureFrom.setionImage) {
            formData.append("setionImage", featureFrom.setionImage);
        }

        formData.append("sectionTitle", featureFrom.sectionTitle);
        formData.append("setionDescriptions", featureFrom.setionDescriptions);


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-create-update/${id}/${sectionId}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {

                showSnackbar(result.message)

            } else {
                console.error("Error response:", result);
                alert("Failed to update hero section.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const getFeatureData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-feature/api-get/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });


            const JsonData = await response.json();

            if (response.ok) {
                setFeatureData(JsonData.data)
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
        getFeatureData(id)
    }, [id])

    useEffect(() => {
        if (FeatureData && FeatureData.length > 0) {
            const firstItem = FeatureData[0];
            setFeatureForm({
                sectionTitle: firstItem.sectionTitle || "",
                setionDescriptions: firstItem.setionDescriptions || "",
                setionImage: firstItem.setionImage || ""
            });
        }
    }, [FeatureData]);


    console.log("FeatureData", FeatureData)

    return (
        <Fragment>
            <div className='form-contanier  w-full min-h-[95%] flex flex-col items-center justify-center gap-20'>
              
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
                        name="sectionTitle"
                        value={featureFrom.sectionTitle}
                        onChange={onchangeFeature}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                    />


                    <TextField
                        label="Section Descriptions"
                        size="small"
                        variant="outlined"
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                fontSize: '12px',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        name="setionDescriptions"
                        value={featureFrom.setionDescriptions}
                        onChange={onchangeFeature}
                    />


                    <Button
                        sx={{
                            width: '100%',
                            textTransform: 'none',
                            // '&:hover': {
                            //     borderColor: 'blue',
                            // },
                            // '&.Mui-focused': {
                            //     borderColor: 'blue',
                            // },
                        }}
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}

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
                                px: 7,
                                backgroundColor: "white"
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