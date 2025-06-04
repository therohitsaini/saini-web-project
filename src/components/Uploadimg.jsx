import React, { useState } from 'react';
import { Button, IconButton, Box, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Uploadimg() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            // Implement your upload logic here, e.g., using fetch or axios
            // fetch('/api/upload', {
            //   method: 'POST',
            //   body: formData,
            // })
            //   .then((response) => response.json())
            //   .then((data) => {
            //     console.log('Success:', data);
            //   })
            //   .catch((error) => {
            //     console.error('Error:', error);
            //   });

            console.log("Image uploaded successfully!");
            setSelectedImage(null);
            setPreviewImage(null); // Clear the preview after upload
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                    Upload
                </Button>
            </label>
            {previewImage && (
                <Avatar
                    src={previewImage}
                    alt="Preview"
                    sx={{ width: 200, height: 200 }}
                />
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedImage}
            >
                Confirm Upload
            </Button>
        </Box>
    );
}

export default Uploadimg;