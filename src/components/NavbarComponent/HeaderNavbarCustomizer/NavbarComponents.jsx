import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Divider, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { Fragment } from 'react';
import { useState } from 'react';
import IconifyPicker from '@zunicornshift/mui-iconify-picker';

import DeleteIcon from '@mui/icons-material/Delete';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function NavbarLogo() {
    return (
        <div className='w-[100%] justify-center items-center h-[400px] flex flex-col' >
            <div className='flex flex-col w-97  p-5  border border-slate-400/20 rounded-md  bg-[#1f1e1f]' >
                <h1 className='w-96 mb-4 font-bold '> Change Site logo </h1>
                <Divider />

                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        textTransform: "none"
                    }}
                >
                    Upload Site Logo
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
                {/* OR */}
                <p className='my-4 relative'>
                    <Divider />
                    <span className="w-full flex justify-center absolute -top-3" ><sapn className="bg-[#1f1e1f] " >OR</sapn></span>
                </p>
                <TextField
                    label="Site Logo"
                    size="small"
                    variant="outlined"
                >

                </TextField>

                <Button sx={{
                    my: 2,
                    textTransform: "none"
                }} variant='outlined'>Submit</Button>
            </div>
        </div>
    );
}



// <-------------------------- ------------- Navbar List Item --------------------  --------------->



export const NavbarListItem = ({ submitHandler, iconFields, setIconFields }) => {


    // Handle changes for individual fields
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...iconFields];
        updatedFields[index][name] = value;
        setIconFields(updatedFields);
    };

    // Add a new field set
    const addNewField = () => {
        const newField = { menuItem: '', menuItemRoute: '' };
        setIconFields([...iconFields, newField]);
    };

    // Remove a specific field set
    const removeField = (index) => {
        const updatedFields = iconFields.filter((_, i) => i !== index);
        setIconFields(updatedFields);
    };



    return (
        <Fragment>
            <form className="flex justify-center flex-col items-center">
                <div className="flex flex-col gap-4 w-full max-w-2xl">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">Site Menu Items</h1>
                        <Button
                            onClick={() => submitHandler("NavManuItem")}
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                        >
                            Save Changes
                        </Button>
                    </div>

                    {
                        iconFields && iconFields?.map((field, index) => (
                            <div
                                key={index}
                                className="border border-slate-400/20 rounded-md p-5 w-full relative"
                            >
                                <div className="flex justify-between gap-4 mb-3">
                                    <TextField
                                        label={`Menu ${index + 1}`}
                                        size="small"
                                        variant="outlined"
                                        name="menuItem"
                                        value={field.menuItem}
                                        onChange={(e) => handleChange(index, e)}
                                        fullWidth
                                    />
                                    <TextField
                                        label={`Route ${index + 1}`}
                                        size="small"
                                        variant="outlined"
                                        name="menuItemRoute"
                                        value={field.menuItemRoute}
                                        onChange={(e) => handleChange(index, e)}
                                        fullWidth
                                    />
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => removeField(index)}
                                            color="error"
                                            disabled={iconFields.length === 1}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}

                    <div className="flex justify-end">
                        <Button
                            onClick={addNewField}
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                        >
                            + Add More
                        </Button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};




