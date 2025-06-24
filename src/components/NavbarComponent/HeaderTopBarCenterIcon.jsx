// import { useState } from 'react';
// import IconifyPicker from '@zunicornshift/mui-iconify-picker';
// import { TextField, Button, IconButton, Tooltip, Box, Autocomplete } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useEffect } from 'react';

// function HeaderTopBarCenterIcon({ setIconeCenter, iconeCenter, submitHandler, allFaMdIcons, selectedIcon, setSelectedIcon }) {

//     // Handle input changes
//     const handleChange = (index, event) => {
//         const { name, value } = event.target;
//         const updatedFields = [...iconeCenter];
//         updatedFields[index][name] = value;
//         setIconeCenter(updatedFields);
//     };

//     // Add new field set
//     const addNewField = () => {

//         const inistialState = {
//             item_Center_Name: "",
//             item_Center_Icone: "",
//             item_Center_Icone_Path: "",
//         }

//         setIconeCenter([...iconeCenter, inistialState]);
//     };

//     // Remove a field set
//     const removeField = (index) => {
//         const updatedFields = iconeCenter.filter((_, i) => i !== index);
//         setIconeCenter(updatedFields);
//     };

//     useEffect(() => {
//         if (iconeCenter?.item_Center_Icone) {
//             const foundIcon = allFaMdIcons.find(i => i.label === iconeCenter.item_IconeRight);
//             if (foundIcon) {
//                 setSelectedIcon(foundIcon);
//             }
//         }
//     }, [iconeCenter?.item_Center_Icone]);


//     console.log("iconeCenter", iconeCenter)

//     return (
//         <form className='flex justify-center flex-col items-center  min-h-[550px]'>

//             <div className="flex flex-col gap-4  px-5 ">

//                 <Box sx={{
//                     display: "flex"
//                 }}>
//                     <h1 className='flex justify-start w-full'>Header To Bar Center Icone</h1>
//                     <Button
//                         onClick={() => submitHandler("HeaderTopBarCenterIcon")}
//                         variant="outlined"
//                         sx={{
//                             textTransform: 'none',
//                             width: "40%"
//                         }}
//                     >
//                         Save Changes
//                     </Button>
//                 </Box>

//                 {
//                     iconeCenter?.map((field, index) => (
//                         <div
//                             key={index}
//                             className="border border-slate-400/20 rounded-md p-5 w-[100%] relative"
//                         >
//                             <div className="flex justify-between gap-2 mb-3">
//                                 <TextField
//                                     label={`Title ${index + 1}`}
//                                     size="small"
//                                     variant="outlined"
//                                     name="item_Center_Name"
//                                     value={field.item_Center_Name}
//                                     onChange={(e) => handleChange(index, e)}
//                                     fullWidth
//                                 />
//                                 {/* <TextField
//                                     label={`Icon ${index + 1}`}
//                                     size="small"
//                                     variant="outlined"
//                                     name="item_Center_Icone"
//                                     value={field.item_Center_Icone}
//                                     onChange={(e) => handleChange(index, e)}
//                                     fullWidth
//                                 /> */}
//                                 <Autocomplete
//                                     fullWidth
//                                     options={allFaMdIcons}
//                                     value={selectedIcon}
//                                     onChange={(e, newValue) => {
//                                         if (newValue) setSelectedIcon(newValue);
//                                         setIconeCenter(prev => ({
//                                             ...prev,
//                                             item_Center_Icone: newValue ? newValue.label : ""
//                                         }));
//                                     }}
//                                     size='small'
//                                     getOptionLabel={(option) => option.label}
//                                     isOptionEqualToValue={(option, value) => option.label === value?.label}
//                                     renderOption={(props, option) => (
//                                         <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             {option.Icon && <option.Icon />}
//                                             {option.label}
//                                         </Box>
//                                     )}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             {...params}
//                                             label="Search Icon"
//                                             variant="outlined"
//                                             fullWidth
//                                             InputProps={{
//                                                 ...params.InputProps,
//                                                 startAdornment: selectedIcon?.Icon && (
//                                                     <InputAdornment position="start" sx={{ mr: 1 }}>
//                                                         <selectedIcon.Icon />
//                                                     </InputAdornment>
//                                                 ),
//                                             }}
//                                         />
//                                     )}
//                                 />

//                                 <TextField
//                                     label={`URL ${index + 1}`}
//                                     size="small"
//                                     variant="outlined"
//                                     name="item_Center_Icone_Path"
//                                     value={field.item_Center_Icone_Path}
//                                     onChange={(e) => handleChange(index, e)}
//                                     fullWidth
//                                 />
//                                 <Tooltip title="Delete">
//                                     <IconButton
//                                         onClick={() => removeField(index)}
//                                         color="error"
//                                         disabled={iconeCenter.length === 1}
//                                     >
//                                         <DeleteIcon />
//                                     </IconButton >
//                                 </Tooltip>
//                             </div>
//                         </div>
//                     ))}

//                 <div className='button-wrraper flex justify-end'>
//                     <Button
//                         onClick={addNewField}
//                         variant="contained"
//                         className="w-fit"
//                     >
//                         + Add More
//                     </Button>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default HeaderTopBarCenterIcon;



import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    IconButton,
    Tooltip,
    Box,
    Autocomplete,
    InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function HeaderTopBarCenterIcon({
    setIconeCenter,
    iconeCenter,
    submitHandler,
    allFaMdIcons,
    selectedIcon,
    setSelectedIcon,
}) {
    // Handle input changes
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...iconeCenter];
        updatedFields[index][name] = value;
        setIconeCenter(updatedFields);
    };

    // Add new field set
    const addNewField = () => {
        const initialState = {
            item_Center_Name: '',
            item_Center_Icone: '',
            item_Center_Icone_Path: '',
        };
        setIconeCenter([...iconeCenter, initialState]);
    };

    // Remove a field set
    const removeField = (index) => {
        const updatedFields = iconeCenter.filter((_, i) => i !== index);
        setIconeCenter(updatedFields);
    };

    // Ensure iconeCenter is always an array
    const iconFields = Array.isArray(iconeCenter) ? iconeCenter : [];

    return (
        <form className="flex justify-center flex-col items-center min-h-[550px]">
            <div className="flex flex-col gap-4 px-5 w-full max-w-4xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className="text-lg font-semibold">Header Top Bar Center Icon</h1>
                    <Button
                        onClick={() => submitHandler('HeaderTopBarCenterIcon')}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Save Changes
                    </Button>
                </Box>

                {iconFields.map((field, index) => (
                    <div
                        key={index}
                        className="border border-slate-400/20 rounded-md p-5 w-full relative bg-[#1f1e1f]"
                    >
                        <div className="flex flex-col md:flex-row gap-3">
                            {/* Title Input */}
                            <TextField
                                label={`Title ${index + 1}`}
                                size="small"
                                variant="outlined"
                                name="item_Center_Name"
                                value={field.item_Center_Name}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
                            />

                            {/* Icon Picker */}
                            <Autocomplete
                                fullWidth
                                options={allFaMdIcons}
                                value={
                                    allFaMdIcons.find((icon) => icon.label === field.item_Center_Icone) || null
                                }
                                onChange={(e, newValue) => {
                                    const updatedFields = [...iconeCenter];
                                    updatedFields[index].item_Center_Icone = newValue ? newValue.label : '';
                                    setIconeCenter(updatedFields);
                                    setSelectedIcon(newValue || null);
                                }}
                                size="small"
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value?.label}
                                renderOption={(props, option) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                    >
                                        {option.Icon && <option.Icon />}
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Icon"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: selectedIcon?.Icon && (
                                                <InputAdornment position="start" sx={{ mr: 1 }}>
                                                    <selectedIcon.Icon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                            {/* URL Input */}
                            <TextField
                                label={`URL ${index + 1}`}
                                size="small"
                                variant="outlined"
                                name="item_Center_Icone_Path"
                                value={field.item_Center_Icone_Path}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
                            />

                            {/* Delete Button */}
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

                {/* Add More Button */}
                <div className="flex justify-end">
                    <Button onClick={addNewField} variant="contained" className="w-fit">
                        + Add More
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default HeaderTopBarCenterIcon;
