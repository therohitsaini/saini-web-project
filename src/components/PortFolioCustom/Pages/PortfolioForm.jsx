import React, { useState, useMemo, Fragment } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect } from 'react';
const userCategories = ['design', 'development', 'marketing', 'support']


function PortfolioForm({ setPortFormData, portFormData, submitPortHandler, setPortMode, submitted, portMode, updatePortHandler }) {
    const [selectedIcone, setSelectedIcone] = useState(
        allFaMdIconsList.find((i) => i.label === portFormData?.item_Icone) || null
    );
    const [inputValue, setInputValue] = useState('');
    const [imagePreview, setImagePreview] = useState(null);


    const filteredIcons = useMemo(() => {

        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50); // default
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
            
    }, [inputValue]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPortFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))

        if (file) {
            setPortFormData((prev) => ({
                ...prev,
                userImage: file,
            }));
        }
    };




    return (
        <Fragment>
            <div className="header-left-form-main h-[550px] flex items-center flex-col justify-center">
                <Box sx={{
                    display: "flex",
                    width: "80%",

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                >
                    <Button
                        onClick={() => setPortMode("Table")}
                        variant='outlined'
                        sx={{
                            px: 5,

                        }}
                    >
                        <KeyboardBackspaceIcon sx={{ mr: 1 }} />  Back
                    </Button>

                    <div className='img-wrraper h-30 rounded-full w-30'>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover h-full w-full rounded-full"
                            />
                        ) : (
                            <Typography variant="body2" sx={{ p: 1, fontSize: 12, textAlign: "center" }}>
                                Not Found!
                            </Typography>
                        )}
                    </div>
                </Box>
                <form className="form flex justify-center items-center h-[420px] w-full">
                    <div className="border border-slate-400/20 rounded-md p-5 flex flex-col gap-4 w-[80%]">
                        <div className='flex justify-between items-center'>
                            <Typography component="span" fontSize={20}>Create New Post </Typography>

                        </div>
                        <Divider />

                        <div className='button-input flex gap-2'>
                            <Button
                                sx={{
                                    width: '96%'
                                }}
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                size='small'
                            // color={submitted && !file ? 'error' : 'primary'}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}

                                />
                            </Button>

                            <TextField

                                label="Title"
                                size="small"
                                variant="outlined"
                                sx={{
                                    width: '100%'
                                }}
                                name="title"
                                value={portFormData.title}
                                onChange={onChangeHandler}
                                error={submitted && !portFormData.title.trim()}
                                helperText={
                                    submitted && !portFormData.title.trim() ? 'Title is required' : ''
                                }
                            />
                        </div>

                        <div className='AutoComplete-input flex gap-2'>
                            <TextField
                                label="Sub Title"
                                size="small"
                                sx={{
                                    width: "100%"
                                }}
                                variant="outlined"
                                name="subTitle"
                                value={portFormData.subTitle}
                                onChange={onChangeHandler}
                                error={submitted && !portFormData.subTitle.trim()}
                                helperText={
                                    submitted && !portFormData.subTitle.trim() ? 'subTitle is required' : ''
                                }
                            />

                            <Autocomplete
                                multiple
                                size="small"
                                disablePortal
                                options={userCategories}
                                name="categories"
                                value={portFormData.categories || []}
                                onChange={(event, newValue) =>
                                    setPortFormData((prev) => ({
                                        ...prev,
                                        categories: newValue,
                                    }))
                                }

                                sx={{ width: "100%" }}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Categories"
                                        error={submitted && !portFormData.category}
                                        helperText={
                                            submitted && !portFormData.category ? 'Category is required' : ''
                                        }
                                    />
                                )}
                            />

                        </div>

                        <div className='AutoComplete-input flex gap-2'>


                            <Autocomplete
                                sx={{
                                    width: '100%'
                                }}
                                size="small"
                                options={filteredIcons}
                                value={selectedIcone}
                                onChange={(e, newValue) => {
                                    setSelectedIcone(newValue);
                                    setPortFormData((prev) => ({
                                        ...prev,
                                        Icone: newValue ? newValue.label : '',
                                    }));
                                }}
                                inputValue={inputValue}
                                onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value?.label}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {option.Icon && <option.Icon size={18} />}
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select icone"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment:
                                                selectedIcone?.Icon && (
                                                    <InputAdornment position="start" sx={{ mr: 1 }}>
                                                        <selectedIcone.Icon size={18} />
                                                    </InputAdornment>
                                                ),
                                        }}

                                        error={submitted && !portFormData.Icone}
                                        helperText={
                                            submitted && !portFormData.Icone ? 'Category is required' : ''
                                        }
                                    />
                                )}
                            />

                            <TextField
                                label="Url"
                                size="small"
                                variant="outlined"
                                name="item_IconeUrl"
                                value={portFormData.item_IconeUrl}
                                onChange={onChangeHandler}
                                sx={{
                                    width: '100%'
                                }}

                            />
                        </div>



                        <div className="flex items-center gap-2">
                            <Checkbox
                                defaultChecked
                                checked={portFormData.item_ShowOnWebsite || false}
                                onChange={(e) =>
                                    setPortFormData((prev) => ({
                                        ...prev,
                                        item_ShowOnWebsite: e.target.checked,
                                    }))
                                }
                                sx={{ m: 0, p: 0 }}
                                size="small"
                            />
                            <p className="text-[14px] text-slate-500">
                                If you want to show this on the website
                            </p>
                        </div>

                        <div className='flex justify-end'>
                            {
                                portMode === "UpdateForm" ?
                                    (<Button
                                        sx={{ textTransform: 'none', px: 10 }}
                                        onClick={updatePortHandler}
                                        variant="contained"
                                    >
                                        Update Information
                                    </Button>
                                    )
                                    :
                                    (<Button
                                        sx={{ textTransform: 'none', px: 10 }}
                                        onClick={submitPortHandler}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                    )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default PortfolioForm;
