import { Button, Checkbox, CircularProgress, Divider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';

function BlogHeadingSection({ showSnackbar, showError }) {
    const initialState = {
        _id: "",
        blogHeading: "",
        blogDescription: "",

    };
    const [blogHeadingForm, setBlogHeadingForm] = useState(initialState);
    const [id, setId] = useState();
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const userID = localStorage.getItem("user-ID");
        setId(userID);
    }, [])


    const onchangeTeam = (e) => {
        const { name, value } = e.target
        setBlogHeadingForm((pre) => ({
            ...pre,
            [name]: value
        }))
    }


    const getBlogData = async (id) => {

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-blog/api-get-heading-data/${id}`;
            const response = await fetch(url, { method: "GET" });
            const json = await response.json();

            if (response.ok) {
                setBlogData(json.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getBlogData(id);
        }
    }, [id]);

    useEffect(() => {
        if (blogData && blogData.length > 0) {
            const firstItem = blogData[0];
            setBlogHeadingForm({
                _id: firstItem._id,
                blogHeading: firstItem.blogHeading,
                blogDescription: firstItem.blogDescription,
                teamBgImage: "",
            });
        }
    }, [blogData]);

    const submitHandler = async () => {
        const sectionId = blogHeadingForm._id
        if (!blogHeadingForm.blogHeading) {
            showErrorToast("Heading is required")
            return
        }
        if (!blogHeadingForm.blogDescription) {
            showErrorToast("Description is required")
            return
        }
        setLoading(true)
        try {
            const baseUrl = `${import.meta.env.VITE_BACK_END_URL}api-blog/api-create-update/bloges/${id}`
            const url = sectionId ? `${baseUrl}/${sectionId}` : baseUrl;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogHeadingForm)
            })
            const result = await response.json()
            if (response.ok) {
                showSuccessToast(result.message)
                setLoading(false)
            } else {
                showErrorToast(result.message)
            }

        } catch (err) {
            console.log(err)
        }
    }




    return (
        <Fragment>
            <ToastContainer />
            <div className='form-contanier  w-full h-[580px] flex flex-col items-center justify-center gap-20 '>

                <form
                    className='form-main border border-slate-500/20 rounded-md w-[50%] flex flex-col gap-3 items-center p-5 '>
                    <div className='w-full'>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2">
                            Add Blog Section Heading
                        </h1>
                        <Divider sx={{
                            my: 1
                        }} />
                    </div>
                    <TextField
                        label="Section Title"
                        size="small"
                        variant="outlined"
                        name="blogHeading"
                        value={blogHeadingForm.blogHeading}
                        onChange={onchangeTeam}
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
                        name="blogDescription"
                        value={blogHeadingForm.blogDescription}
                        onChange={onchangeTeam}
                    />



                    <div className="flex items-center gap-2  sticky top-0 w-full">
                        <Checkbox
                            defaultChecked
                            sx={{ m: 0, p: 0, }}
                            size="small"
                        />
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>
                    <div className='button w-full  flex justify-end'>
                        <Button
                            onClick={submitHandler}
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                minWidth: "200px",
                                backgroundImage: "linear-gradient(to right, #1e3a8a, #9333ea)", // Tailwind's blue-800 to purple-600
                                color: "white",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(to right, #1e40af, #7c3aed)", // slightly darker on hover
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={23} sx={{ color: "#ffffff" }} />
                            ) : (
                                "Submit"
                            )}
                        </Button>

                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default BlogHeadingSection