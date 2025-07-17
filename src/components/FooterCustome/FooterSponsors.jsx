import { Avatar, Button, Divider, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SaveIcon from '@mui/icons-material/Save'

function FooterSponsors({ showSnackbar, showError }) {
    const [formData, setFormData] = useState({
        sponsors: [
            { id: 1, image: null, preview: null },
            { id: 2, image: null, preview: null },
            { id: 3, image: null, preview: null },
            { id: 4, image: null, preview: null },
            { id: 5, image: null, preview: null }
        ]
    });
    
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("user-ID");
        if (id) {
            setUserId(id);
            getExistingSponsors(id);
        }
    }, []);

    const getExistingSponsors = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/get-footer-sponsors/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            if (response.ok && data.data) {
                const updatedSponsors = formData.sponsors.map((sponsor, index) => {
                    const imageFieldName = `Image_${index === 0 ? 'one' : index === 1 ? 'two' : index === 2 ? 'three' : index === 3 ? 'four' : 'five'}`;
                    return {
                        ...sponsor,
                        image: data.data[imageFieldName] || null,
                        preview: data.data[imageFieldName] 
                            ? `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${data.data[imageFieldName].replace(/^\/?/, '')}`
                            : null
                    };
                });

                setFormData(prev => ({
                    ...prev,
                    sponsors: updatedSponsors
                }));
            }
        } catch (error) {
            console.log("Error fetching footer sponsors:", error);
        }
    };

    const handleImageUpload = (event, sponsorId) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            
            setFormData(prev => ({
                ...prev,
                sponsors: prev.sponsors.map(sponsor => 
                    sponsor.id === sponsorId 
                        ? { ...sponsor, image: file, preview: previewUrl }
                        : sponsor
                )
            }));
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

            formData.sponsors.forEach((sponsor, index) => {
                if (sponsor.image) {
                    const imageFieldName = `Image_${index === 0 ? 'one' : index === 1 ? 'two' : index === 2 ? 'three' : index === 3 ? 'four' : 'five'}`;
                    formDataToSend.append(imageFieldName, sponsor.image);
                }
            });

            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/update-footer-sponsors/${userId}`;
            const response = await fetch(url, {
                method: "PUT",
                body: formDataToSend
            });

            const data = await response.json();

            if (response.ok) {
                showSnackbar(data.message || "Footer sponsors updated successfully!");
                getExistingSponsors(userId);
            } else {
                showError(data.message || "Failed to update footer sponsors");
            }
        } catch (error) {
            console.log("Error saving footer sponsors:", error);
            showError("An error occurred while saving footer sponsors");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className='footer-sponsors w-full h-full flex justify-center items-center'>
                <form className='bg-form-footer border border-slate-400/20 rounded-md p-5 flex flex-col gap-5 w-[50%]'>
                    <div className='heading-wrraper'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
                            Footer Sponsors Settings
                        </h1>
                    </div>

                    <Divider sx={{ width: '100%' }} />

                    <div className='sponsors-section'>
                        <h3 className='text-lg font-semibold mb-3 text-gray-700'>Sponsor Images</h3>
                        <div className='flex flex-col gap-4'>
                            {formData.sponsors.map((sponsor) => (
                                <div key={sponsor.id} className='flex items-center gap-4'>
                                    {sponsor.preview && (
                                        <Avatar
                                            src={sponsor.preview}
                                            alt={`Sponsor ${sponsor.id} Preview`}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    )}
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<UploadFileIcon />}
                                        sx={{ textTransform: 'none', px: 5, width: '100%' }}
                                    >
                                        {sponsor.preview ? `Change Sponsor ${sponsor.id} Image` : `Upload Sponsor ${sponsor.id} Image`}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, sponsor.id)}
                                        />
                                    </Button>
                                </div>
                            ))}
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

export default FooterSponsors