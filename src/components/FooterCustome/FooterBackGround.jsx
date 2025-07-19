import { Button, Divider, Avatar, CircularProgress, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SaveIcon from '@mui/icons-material/Save'
import { ChromePicker } from 'react-color'
import { showErrorToast, showSuccessToast } from '../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable'
import { ToastContainer } from 'react-toastify'

function FooterBackGround({ showSnackbar, showError }) {
    const [formData, setFormData] = useState({
        backgroundColor: '#513838',
        backgroundImage: null,
        showColorPicker: false
    });
    console.log(formData)
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("user-ID");
        if (id) {
            setUserId(id);
            getExistingFooterBackground(id);
        }
    }, []);

    const getExistingFooterBackground = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/get-footer-background/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            if (response.ok && data.data) {
                setFormData(prev => ({
                    ...prev,
                    backgroundColor: data.data.backgroundColor || '#ffffff',
                    backgroundImage: data.data.backgroundImage || null
                }));

                if (data.data.backgroundImage) {
                    setPreview(`${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${data.data.backgroundImage.replace(/^\/?/, '')}`);
                }
            }
        } catch (error) {
            console.log("Error fetching footer background:", error);
        }
    };

    const handleColorChange = (color) => {
        setFormData(prev => ({
            ...prev,
            backgroundColor: color.hex
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                backgroundImage: file
            }));

            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    const handleSave = async () => {
        if (!userId) {
            alert("User ID not found. Please login again.");
            return;
        }
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("backgroundColor", formData.backgroundColor);

            if (formData.backgroundImage) {
                formDataToSend.append("backgroundImage", formData.backgroundImage);
            }

            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/update-footer-background/${userId}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formDataToSend
            });

            const data = await response.json();

            if (response.ok) {
                showSuccessToast(data.message || "Footer background updated successfully!");
                getExistingFooterBackground(userId);
            } else {
                showErrorToast(data.message || "Failed to update footer background");
            }
        } catch (error) {
            console.log("Error saving footer background:", error);
            showError("An error occurred while saving footer background");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <ToastContainer />
            <div className='footer-bg-colour h-[100%] w-full flex justify-center items-center'>
                <form className='bg-form-footer border border-slate-400/20 rounded-md p-5 flex flex-col gap-5 w-[50%]'>
                    <div className='heading-wrraper'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
                            Footer Background Settings
                        </h1>
                    </div>

                    <Divider sx={{ width: '100%' }} />


                    <div className='color-picker-section'>
                        <h3 className='text-lg font-semibold mb-3 text-gray-700'>Background Color</h3>
                        <div className='flex items-center gap-4'>
                            <div
                                className='w-12 h-12 rounded-md border-2 border-gray-300 cursor-pointer'
                                style={{ backgroundColor: formData.backgroundColor }}
                                onClick={() => setFormData(prev => ({ ...prev, showColorPicker: !prev.showColorPicker }))}
                            />
                            <TextField
                                label="Color Hex"
                                value={formData.backgroundColor}
                                onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                                size="small"
                                sx={{ width: 200 }}
                            />
                        </div>

                        {formData.showColorPicker && (
                            <div className='mt-4'>
                                <ChromePicker
                                    color={formData.backgroundColor}
                                    onChange={handleColorChange}
                                />
                            </div>
                        )}
                    </div>

                    {/* Image Upload Section */}
                    <div className='image-upload-section'>
                        <h3 className='text-lg font-semibold mb-3 text-gray-700'>Background Image</h3>
                        <div className='flex items-center gap-4'>
                            {preview && (
                                <Avatar
                                    src={preview}
                                    alt="Background Preview"
                                    sx={{ width: 80, height: 80 }}
                                />
                            )}
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<UploadFileIcon />}
                                sx={{ textTransform: 'none', px: 5 }}
                            >
                                {preview ? 'Change Image' : 'Upload Background Image'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </div>
                        {preview && (
                            <p className='text-sm text-gray-500 mt-2'>
                                Image preview shown above
                            </p>
                        )}
                    </div>


                    <div className='preview-section'>
                        <h3 className='text-lg font-semibold mb-3 text-gray-700'>Preview</h3>
                        <div
                            className='w-full h-32 rounded-md border-2 border-gray-300 flex items-center justify-center'
                            style={{
                                backgroundColor: formData.backgroundColor,
                                backgroundImage: preview ? `url(${preview})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <p className='text-gray-600 font-medium'>Footer Background Preview</p>
                        </div>
                    </div>

                    <div className='flex justify-end items-center w-full mt-4'>
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            sx={{
                                textTransform: 'none',
                                px: 5,
                                backgroundColor: loading ? "#6b6767" : "initial",
                                backgroundImage: loading
                                    ? "none"
                                    : "linear-gradient(to right, #1e3a8a, #9333ea)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: loading ? "#6b6767" : "initial",
                                    backgroundImage: loading
                                        ? "none"
                                        : "linear-gradient(to right, #1e40af, #7c3aed)",
                                },
                            }}
                            variant="contained"
                            startIcon={loading ? <CircularProgress size={20} sx={{ color: "#f3f6f7" }} /> : <SaveIcon />}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default FooterBackGround