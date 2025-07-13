import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Divider,
    Avatar,
    Snackbar,
    Alert,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

const FooterSponsorsForm = ({ id }) => {
    const [sponsors, setSponsors] = useState({
        sponsorsOne: null,
        sponsorsTwo: null,
        sponsorsThree: null,
        sponsorsFour: null,
        sponsorsFive: null,
    });

    const [preview, setPreview] = useState({
        sponsorsOne: null,
        sponsorsTwo: null,
        sponsorsThree: null,
        sponsorsFour: null,
        sponsorsFive: null,
    });

    const [showOnWebsite, setShowOnWebsite] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [imagePreview, setImagePreview] = useState([])

    const handleImageUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setSponsors((prev) => ({ ...prev, [field]: file }));
            setPreview((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const renderUploadButton = (label, field) => (
        <Button
            component="label"
            variant="contained"
            startIcon={
                preview[field] ? (
                    <Avatar src={preview[field]} sx={{ width: 24, height: 24 }} />
                ) : (
                    <UploadFileIcon />
                )
            }
            sx={{ textTransform: 'none', px: 5, width: '100%', justifyContent: 'flex-start' }}
        >
            {preview[field] ? 'Change Image' : label}
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageUpload(e, field)}
            />
        </Button>
    );

    const getSponsorData = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-get-footer-sponsor/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const result = await response.json()
            if (response.ok) {
                setImagePreview(result.data)
            }

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getSponsorData(id)
    }, [])

    useEffect(() => {
        if (imagePreview) {
            const baseURL = import.meta.env.VITE_BACK_END_URL;
            const formatURL = (imgPath) =>
                imgPath ? `${baseURL}/${imgPath.replace(/\\/g, '/')}` : null;

            setPreview({
                sponsorsOne: formatURL(imagePreview?.sponsorsOne),
                sponsorsTwo: formatURL(imagePreview?.sponsorsTwo),
                sponsorsThree: formatURL(imagePreview?.sponsorsThree),
                sponsorsFour: formatURL(imagePreview?.sponsorsFour),
                sponsorsFive: formatURL(imagePreview?.sponsorsFive),
            });
        }
    }, [imagePreview])

    console.log(imagePreview)

    const handleSubmit = async () => {
        const id = localStorage.getItem("user-ID")
        if (!id) {
            setError(true);
            setMessage('Missing document ID.');
            return;
        }

        const formData = new FormData();
        Object.entries(sponsors).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });
        formData.append('showOnWebsite', showOnWebsite);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-data/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to update sponsors');
            const result = await res.json();

            setError(false);
            setMessage('Sponsors updated successfully!');
        } catch (err) {
            console.error(err);
            setError(true);
            setMessage('Error while updating sponsors.');
        }
    };

    return (
        <div className="footer-sponsors h-full w-full flex justify-center items-center">
            <form className="border border-slate-300 p-6 rounded-lg flex flex-col gap-4 w-[90%] max-w-xl">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Update Footer Sponsors
                </h2>
                <Divider />

                {renderUploadButton('Upload Sponsor One', 'sponsorsOne')}
                {renderUploadButton('Upload Sponsor Two', 'sponsorsTwo')}
                {renderUploadButton('Upload Sponsor Three', 'sponsorsThree')}
                {renderUploadButton('Upload Sponsor Four', 'sponsorsFour')}
                {renderUploadButton('Upload Sponsor Five', 'sponsorsFive')}

                <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                        checked={showOnWebsite}
                        onChange={(e) => setShowOnWebsite(e.target.checked)}
                        size="small"
                        color="primary"
                    />
                    <p className="text-sm text-slate-600">Show on website</p>
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        sx={{ textTransform: 'none', px: 5 }}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>

            <Snackbar
                open={!!message}
                autoHideDuration={3000}
                onClose={() => setMessage('')}
            >
                <Alert
                    onClose={() => setMessage('')}
                    severity={error ? 'error' : 'success'}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FooterSponsorsForm;
