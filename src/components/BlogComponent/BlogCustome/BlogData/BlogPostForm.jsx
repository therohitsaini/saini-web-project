import { Autocomplete, Avatar, Box, Button, Checkbox, CircularProgress, Divider, InputAdornment, TextareaAutosize, TextField } from '@mui/material'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { useMemo } from 'react';
import { allFaMdIconsList } from '../../../NavbarComponent/HeaderTopLeft';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';



function BlogPostForm({ blodFormData, loading, setBlogFormData, postBloges, setBlogMode, blogMode, updateBloges, inisialState, imagePreview, setImagePreview }) {

    const [selectedIconShare, setSelectedIconShare] = useState(null);
    const [selectedIconRole, setSelectedIconRole] = useState(null);

    const [inputShare, setInputShare] = useState('');
    const [inputRole, setInputRole] = useState('');

    const filteredIconsLeft = useMemo(() => {
        const term = inputShare.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputShare]);

    const filteredIconsRight = useMemo(() => {
        const term = inputRole.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputRole]);

    useEffect(() => {
        if (blodFormData?.goIcone) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === blodFormData.goIcone);
            if (foundIcon) setSelectedIconShare(foundIcon);
        }
        if (blodFormData?.blogerRoleIocne) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === blodFormData.blogerRoleIocne);
            if (foundIcon) setSelectedIconRole(foundIcon);
        }
    }, [blodFormData]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        if (file) {
            setBlogFormData((prev) => ({
                ...prev,
                blogerImage: file,
            }));
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setBlogFormData((pre) => ({
            ...pre,
            [name]: value
        }))
    }



    useEffect(() => {
        if (blodFormData?.blogerImage) {
            const imgSrc = blodFormData?.blogerImage?.startsWith('http')
                ? blodFormData.blogerImage
                : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${blodFormData.blogerImage?.replace(/^\/?/, '')}`;
            setImagePreview(imgSrc)
        }
    }, [])

    useEffect(() => {
        if (blogMode === "Table" || blogMode === "SubmitBlogForm") {
            setBlogFormData(inisialState)
            setSelectedIconShare(null)
            setSelectedIconRole(null)
            setImagePreview(null)
        }
    }, [blogMode])


    return (
        <Fragment>
            <div className='main-blog-form h-[100%] w-full flex flex-col gap-5  justify-center items-center'>
                <div className='w-full px-5 '>
                    <Button
                        // onClick={() => setBlogMode("Table")}
                        variant='outlined'
                        sx={{
                            px: 5
                        }}
                    > <ArrowLeft sx={{ ml: 2 }} /> Back</Button>
                </div>
                <div className='input-wrraperr border border-slate-400/20 p-5 rounded-md'>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={imagePreview} sx={{ width: 56, height: 56, mr: 2 }} />
                        <Button sx={{ textTransform: "none", px: 5, fontVariant: "all-small-caps" }} component="label" variant="contained" startIcon={<UploadFileIcon />}>
                            Upload Image
                            <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                        </Button>
                    </Box>
                    <div className='grid grid-cols-2 gap-5'>

                        <Autocomplete
                            options={filteredIconsLeft}
                            value={selectedIconShare}
                            onChange={(e, newValue) => {
                                setSelectedIconShare(newValue);
                                setBlogFormData((prev) => ({
                                    ...prev,
                                    goIcone: newValue ? newValue.label : '',
                                }));
                            }}
                            onInputChange={(e, newValue) => setInputShare(newValue)}
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
                                    label="Share Icone"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: selectedIconShare?.Icon && (
                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                <selectedIconShare.Icon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
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
                                />
                            )}
                        />
                        <TextField
                            label="Date"
                            type="date"
                            name="blogDatePicker"
                            value={blodFormData.blogDatePicker}
                            onChange={onChangeHandler}
                            size="small"
                            sx={{
                                width: 300,
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
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Autocomplete
                            options={filteredIconsRight}
                            value={selectedIconRole}
                            onChange={(e, newValue) => {
                                setSelectedIconRole(newValue);
                                setBlogFormData((prev) => ({
                                    ...prev,
                                    blogerRoleIocne: newValue ? newValue.label : '',
                                }));
                            }}
                            onInputChange={(e, newValue) => setInputRole(newValue)}
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
                                    label="Role Icone"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: selectedIconRole?.Icon && (
                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                <selectedIconRole.Icon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
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
                                />
                            )}
                        />

                        <TextField
                            label="Role"
                            sx={{
                                width: 300,
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
                            size="small"
                            name="blogerRole"
                            value={blodFormData.blogerRole}
                            onChange={onChangeHandler}

                        />

                        <TextField
                            label="Blog Button"
                            sx={{
                                width: "100%",
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
                            size="small"
                            name="blogButton"
                            value={blodFormData.blogButton}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Blog Heading"
                            sx={{
                                width: "100%",
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
                            size="small"
                            name="blogHeading"
                            value={blodFormData.blogHeading}
                            onChange={onChangeHandler}
                        />


                    </div>

                    <TextField
                        label="Blog Description"
                        sx={{
                            width: "100%", my: 3,
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
                        size="small"
                        name="blogDescription"
                        value={blodFormData.blogDescription}
                        onChange={onChangeHandler}
                    />
                    <div className="flex items-center gap-2  sticky top-0 w-full mt-4">
                        <Checkbox
                            defaultChecked
                            sx={{ m: 0, p: 0 }}
                            size="small"
                        />
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>
                    <div className='button  flex justify-end w-full mt-5' >
                        {

                            <Button
                                onClick={blogMode === "UpdateBlogForm" ? updateBloges : postBloges}
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: loading ? "#6b6767" : "initial",
                                    backgroundImage: loading
                                        ? "none"
                                        : "linear-gradient(to right, #1e3a8a, #9333ea)",
                                    color: "white",
                                    minWidth: 200,
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: loading ? "#6b6767" : "initial",
                                        backgroundImage: loading
                                            ? "none"
                                            : "linear-gradient(to right, #1e40af, #7c3aed)",
                                    },
                                }}
                                variant="contained"
                            >
                                {loading ? (
                                    <CircularProgress size={23} sx={{ color: "#f3f6f7" }} />
                                ) : blogMode === "UpdateBlogForm" ? "Update" : "Submit"}
                            </Button>

                        }

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BlogPostForm