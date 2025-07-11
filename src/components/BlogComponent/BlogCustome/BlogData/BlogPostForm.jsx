import { Avatar, Box, Button, Checkbox, CircularProgress, Divider, TextareaAutosize, TextField } from '@mui/material'
import { Fragment } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';



function BlogPostForm({ blodFormData, loading, setBlogFormData, postBloges, setBlogMode }) {

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
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


    return (
        <Fragment>
            <div className='main-blog-form h-[100%] w-full flex flex-col gap-5  justify-center items-center'>
                <div className='w-full px-5 '>
                    <Button
                        onClick={() => setBlogMode("Table")}
                        variant='outlined'
                        sx={{
                            px: 5
                        }}
                    >Back</Button>
                </div>
                <div className='input-wrraperr border border-slate-400/20 p-5 rounded-md'>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={blodFormData.blogerImage ? URL.createObjectURL(blodFormData.blogerImage) : ''} sx={{ width: 56, height: 56, mr: 2 }} />
                        <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                            Upload Image
                            <input type="file" hidden onChange={handleImageUpload} accept="blogerImage/*" />
                        </Button>
                    </Box>
                    <div className='grid grid-cols-2 gap-5'>
                        <TextField
                            label="Share Iocne"
                            sx={{ width: 300 }}
                            size="small"
                            name="goIcone"
                            value={blodFormData.goIcone}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Date"
                            type="date"
                            name="blogDatePicker"
                            value={blodFormData.blogDatePicker}
                            onChange={onChangeHandler}
                            size="small"
                            sx={{ width: 300 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Icone"
                            sx={{ width: 300 }}
                            size="small"
                            name="blogerRoleIocne"
                            value={blodFormData.blogerRoleIocne}
                            onChange={onChangeHandler}
                        />

                        <TextField
                            label="Role"
                            sx={{ width: 300 }}
                            size="small"
                            name="blogerRole"
                            value={blodFormData.blogerRole}
                            onChange={onChangeHandler}
                        />

                        <TextField
                            label="Blog Button"
                            sx={{ width: "100%", }}
                            size="small"
                            name="blogButton"
                            value={blodFormData.blogButton}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            label="Blog Heading"
                            sx={{ width: "100%", }}
                            size="small"
                            name="blogHeading"
                            value={blodFormData.blogHeading}
                            onChange={onChangeHandler}
                        />


                    </div>

                    <TextField
                        label="Blog Description"
                        sx={{ width: "100%", my: 2 }}
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
                        <Button
                            onClick={postBloges}
                            sx={{
                                backgroundColor: loading ? "#5fb1c866" : "#1193d5ff",
                                "&:hover": {
                                    backgroundColor: loading ? "transparent" : "#0d7cb6",
                                },
                                backgroundImage: "linear-gradient(to right, #1e3a8a, #9333ea)",
                                color: "white",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(to right, #1e40af, #7c3aed)",
                                },
                                minWidth: 200,
                                boxShadow: "none",
                            }}


                            variant="contained" >


                            {loading ?
                                (
                                    <CircularProgress size={23} />
                                ) : (
                                    "Submit"
                                )
                            }

                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BlogPostForm