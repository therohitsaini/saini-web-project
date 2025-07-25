import React, { useEffect, useMemo, useState, Fragment } from 'react';
import {
    Autocomplete,
    Checkbox,
    Divider,
    InputAdornment,
    TextField,
    Button,
    Avatar
} from '@mui/material';
import { allFaMdIconsList } from '../../../NavbarComponent/HeaderTopLeft';
import { Box } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GradientButton from '../../../ReuseComponent/ReuseComponent';

function FeatureListForm({
    setFeatureListForm,
    featureListForm,
    postListitemFeature,
    setFeatureMode,
    freatureMode,
    updateListitemFeature,
    inisialState,
    loading
}) {

    const [selectedIconLeft, setSelectedIconLeft] = useState(null);
    const [selectedIconRight, setSelectedIconRight] = useState(null);
    const [inputLeft, setInputLeft] = useState('');
    const [inputRight, setInputRight] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (freatureMode === "SubmitForm") {
            setFeatureListForm(inisialState);
            setSelectedIconLeft(null);
            setSelectedIconRight(null);
            setInputLeft('');
            setInputRight('');
            setImagePreview(null);
        }
    }, [freatureMode]);

    const featureOnchange = (e) => {
        const { name, value } = e.target;
        setFeatureListForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        if (file) {
            setFeatureListForm((prev) => ({
                ...prev,
                backGroundImage: file,
            }));
        }
    };

    useEffect(() => {
        if (featureListForm?.backGroundImage && typeof featureListForm.backGroundImage === 'string') {
            const imgSrc = featureListForm.backGroundImage.startsWith('http')
                ? featureListForm.backGroundImage
                : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${featureListForm.backGroundImage.replace(/^\/?/, '')}`;
            setImagePreview(imgSrc);
        }
    }, [featureListForm]);

    const filteredIconsLeft = useMemo(() => {
        const term = inputLeft.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputLeft]);

    const filteredIconsRight = useMemo(() => {
        const term = inputRight.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputRight]);

    useEffect(() => {
        // Reset icons if fields are empty
        if (!featureListForm?.listIconeLeft) {
            setSelectedIconLeft(null);
        } else {
            const foundIcon = allFaMdIconsList.find((i) => i.label === featureListForm.listIconeLeft);
            setSelectedIconLeft(foundIcon || null);
        }

        if (!featureListForm?.listIconeRight) {
            setSelectedIconRight(null);
        } else {
            const foundIcon = allFaMdIconsList.find((i) => i.label === featureListForm.listIconeRight);
            setSelectedIconRight(foundIcon || null);
        }
    }, [featureListForm]);

    return (
        <Fragment>
            <div className='service main h-[95%] flex items-center justify-center flex-col'>
                <div className='w-[80%] h-30 '>
                    <Button
                        onClick={() => setFeatureMode("Table")}
                        sx={{ fontVariant: "all-petite-caps", px: 5 }}
                        variant='outlined'
                    >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} /> Back
                    </Button>
                </div>

                <form className='service-form flex flex-col w-[60%] gap-4 border border-slate-400/20 rounded-md p-5'>
                    <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Feature List Item</h1>
                    <Divider />

                    <div className='flex items-center gap-3'>
                        <Avatar sx={{ height: 56, width: 56 }} src={imagePreview} />
                        <Button
                            sx={{ width: 250, textTransform: "none", border: "1px solid #413f3f" }}
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                        >
                            Select Background Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>

                    <TextField
                        size='small'
                        label="Title"
                        name='listTitle'
                        value={featureListForm.listTitle}
                        onChange={featureOnchange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: '12px',
                                '& input': {
                                    fontSize: '14px',
                                },
                                '&:hover fieldset': { borderColor: 'blue' },
                                '&.Mui-focused fieldset': { borderColor: 'blue' },
                            },
                        }}
                    />

                    {/* Left Icon Autocomplete */}
                    <Autocomplete
                        key={freatureMode === "SubmitForm" ? "left-reset" : "left-active"}
                        options={filteredIconsLeft}
                        value={selectedIconLeft}
                        onChange={(e, newValue) => {
                            setSelectedIconLeft(newValue);
                            setFeatureListForm((prev) => ({
                                ...prev,
                                listIconeLeft: newValue ? newValue.label : '',
                            }));
                        }}
                        onInputChange={(e, newValue) => setInputLeft(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        size='small'
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Left Icon"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: selectedIconLeft?.Icon && (
                                        <InputAdornment position="start" sx={{ mr: 1 }}>
                                            <selectedIconLeft.Icon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '12px',
                                        '& input': { fontSize: '14px' },
                                        '&:hover fieldset': { borderColor: 'blue' },
                                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                                    },
                                }}
                            />
                        )}
                    />

                    {/* Right Icon Autocomplete */}
                    <Autocomplete
                        key={freatureMode === "SubmitForm" ? "right-reset" : "right-active"}
                        options={filteredIconsRight}
                        value={selectedIconRight}
                        onChange={(e, newValue) => {
                            setSelectedIconRight(newValue);
                            setFeatureListForm((prev) => ({
                                ...prev,
                                listIconeRight: newValue ? newValue.label : '',
                            }));
                        }}
                        onInputChange={(e, newValue) => setInputRight(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        size='small'
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Right Icon"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: selectedIconRight?.Icon && (
                                        <InputAdornment position="start" sx={{ mr: 1 }}>
                                            <selectedIconRight.Icon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '12px',
                                        '& input': { fontSize: '14px' },
                                        '&:hover fieldset': { borderColor: 'blue' },
                                        '&.Mui-focused fieldset': { borderColor: 'blue' },
                                    },
                                }}
                            />
                        )}
                    />

                    <div className="flex items-center gap-2 sticky top-0">
                        <Checkbox
                            checked={featureListForm.item_ShowOnWebsite || true}
                            onChange={(e) =>
                                setFeatureListForm((prev) => ({
                                    ...prev,
                                    item_ShowOnWebsite: e.target.checked,
                                }))
                            }
                            sx={{ m: 0, p: 0 }}
                            size="small"
                        />
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>

                    <div className='flex gap-2 justify-end'>
                        {
                            freatureMode === "UpdateForm" ? (
                                <GradientButton onClick={updateListitemFeature} loading={loading}>
                                    Update
                                </GradientButton>
                            ) : (
                                <GradientButton onClick={postListitemFeature} loading={loading}>
                                    Save Changes
                                </GradientButton>
                            )
                        }
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default FeatureListForm;
