



// import { useState, useEffect } from 'react';
// import {
//     TextField,
//     Button,
//     IconButton,
//     Tooltip,
//     Box,
//     Autocomplete,
//     InputAdornment,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// function HeaderTopBarCenterIcon({
//     setIconeCenter,
//     iconeCenter,
//     submitHandler,
//     allFaMdIcons,
//     selectedIcon,
//     setSelectedIcon,
//     filteredIcons,
//     setInputValue,
//     allFaMdIconsList

// }) {
//     // Handle input changes
//     const handleChange = (index, event) => {
//         const { name, value } = event.target;
//         const updatedFields = [...iconeCenter];
//         updatedFields[index][name] = value;
//         setIconeCenter(updatedFields);
//     };

//     // Add new field set
//     const addNewField = () => {
//         const initialState = {
//             item_Center_Name: '',
//             item_Center_Icone: '',
//             item_Center_Icone_Path: '',
//         };
//         setIconeCenter([...iconeCenter, initialState]);
//     };


//     const removeField = (index) => {
//         const updatedFields = iconeCenter.filter((_, i) => i !== index);
//         setIconeCenter(updatedFields);
//     };


//     const iconFields = Array.isArray(iconeCenter) ? iconeCenter : [];


//     useEffect(() => {
//         if (iconeCenter?.length && allFaMdIconsList?.length) {
//             const updated = iconeCenter.map((item) => {
//                 const iconObj = allFaMdIconsList.find((i) => i.label === item.item_Center_Icone);
//                 return {
//                     ...item,
//                     selectedIconObj: iconObj || null,
//                 };
//             });
//             setIconeCenter(updated);
//         }
//     }, [iconeCenter?.length, allFaMdIconsList]);

//     return (
//         <form className="flex justify-center flex-col items-center min-h-[550px]">
//             <div className="flex flex-col gap-4 px-5 w-full max-w-4xl">
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h1 className="text-lg font-semibold">Header Top Bar Center Icon</h1>
//                     <Button
//                         onClick={() => submitHandler('HeaderTopBarCenterIcon')}
//                         variant="outlined"
//                         sx={{ textTransform: 'none' }}
//                     >
//                         Save Changes
//                     </Button>
//                 </Box>

//                 {iconFields.map((field, index) => (
//                     <div
//                         key={index}
//                         className="border border-slate-400/20 rounded-md p-5 w-full relative bg-[#1f1e1f]"
//                     >
//                         <div className="flex flex-col md:flex-row gap-3">
//                             {/* Title Input */}
//                             <TextField
//                                 label={`Title ${index + 1}`}
//                                 size="small"
//                                 variant="outlined"
//                                 name="item_Center_Name"
//                                 value={field.item_Center_Name}
//                                 onChange={(e) => handleChange(index, e)}
//                                 fullWidth
//                             />

//                             <Autocomplete
//                                 fullWidth
//                                 options={filteredIcons}
//                                 value={field.selectedIconObj || null}
//                                 onChange={(e, newValue) => {
//                                     const updatedFields = [...iconeCenter];
//                                     updatedFields[index].item_Center_Icone = newValue ? newValue.label : '';
//                                     updatedFields[index].selectedIconObj = newValue || null;
//                                     setIconeCenter(updatedFields);
//                                 }}
//                                 size="small"
//                                 onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
//                                 getOptionLabel={(option) => option.label}
//                                 isOptionEqualToValue={(option, value) => option.label === value?.label}
//                                 renderOption={(props, option) => (
//                                     <Box
//                                         component="li"
//                                         {...props}
//                                         sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                                     >
//                                         {option.Icon && <option.Icon />}
//                                         {option.label}
//                                     </Box>
//                                 )}
//                                 renderInput={(params) => (
//                                     <TextField
//                                         {...params}
//                                         label="Search Icon"
//                                         variant="outlined"
//                                         InputProps={{
//                                             ...params.InputProps,
//                                             startAdornment: field.selectedIconObj?.Icon && (
//                                                 <InputAdornment position="start" sx={{ mr: 1 }}>
//                                                     <field.selectedIconObj.Icon />
//                                                 </InputAdornment>
//                                             ),
//                                         }}
//                                     />
//                                 )}
//                             />


//                             {/* URL Input */}
//                             <TextField
//                                 label={`URL ${index + 1}`}
//                                 size="small"
//                                 variant="outlined"
//                                 name="item_Center_Icone_Path"
//                                 value={field.item_Center_Icone_Path}
//                                 onChange={(e) => handleChange(index, e)}
//                                 fullWidth
//                             />

//                             {/* Delete Button */}
//                             <Tooltip title="Delete">
//                                 <IconButton
//                                     onClick={() => removeField(index)}
//                                     color="error"
//                                     disabled={iconFields.length === 1}
//                                 >
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Add More Button */}
//                 <div className="flex justify-end">
//                     <Button onClick={addNewField} variant="contained" className="w-fit">
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
    Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function HeaderTopBarCenterIcon({
    setIconeCenter,
    iconeCenter,
    submitHandler,
    allFaMdIcons,
    selectedIcon,
    setSelectedIcon,
    filteredIcons,
    setInputValue,
    allFaMdIconsList
}) {
    const initialState = {
        item_Center_Name: '',
        item_Center_Icone: '',
        item_Center_Icone_Path: '',
    };


    useEffect(() => {
        if (!Array.isArray(iconeCenter) || iconeCenter.length === 0) {
            setIconeCenter([initialState]);
        }
    }, []);


    useEffect(() => {
        if (iconeCenter?.length && allFaMdIconsList?.length) {
            const updated = iconeCenter.map((item) => {
                const iconObj = allFaMdIconsList.find((i) => i.label === item.item_Center_Icone);
                return {
                    ...item,
                    selectedIconObj: iconObj || null,
                };
            });
            setIconeCenter(updated);
        }
    }, [iconeCenter?.length, allFaMdIconsList]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...iconeCenter];
        updatedFields[index][name] = value;
        setIconeCenter(updatedFields);
    };

    const addNewField = () => {
        setIconeCenter((prev) =>
            Array.isArray(prev) ? [...prev, initialState] : [initialState]
        );
    };

    const removeField = (index) => {
        const updatedFields = iconeCenter.filter((_, i) => i !== index);
        setIconeCenter(updatedFields);
    };

    const iconFields = Array.isArray(iconeCenter) ? iconeCenter : [];

    return (
        <form className="flex justify-center flex-col items-center min-h-[650px] border border-slate-600/20 rounded-md">
            <div className="flex flex-col gap-4 px-5 w-full max-w-4xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className="text-lg font-semibold sticky top-0">Header Top Bar Center Icon</h1>
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
                        className="border border-slate-400/20 rounded-md p-5 w-full relative "
                    >
                        <div className="flex flex-col md:flex-row gap-3">
                            <TextField
                                label={`Title ${index + 1}`}
                                size="small"
                                variant="outlined"
                                name="item_Center_Name"
                                value={field.item_Center_Name}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
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

                            <Autocomplete
                                fullWidth
                                options={filteredIcons}
                                value={field.selectedIconObj || null}
                                onChange={(e, newValue) => {
                                    const updatedFields = [...iconeCenter];
                                    updatedFields[index].item_Center_Icone = newValue ? newValue.label : '';
                                    updatedFields[index].selectedIconObj = newValue || null;
                                    setIconeCenter(updatedFields);
                                }}
                                size="small"
                                onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
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
                                            startAdornment: field.selectedIconObj?.Icon && (
                                                <InputAdornment position="start" sx={{ mr: 1 }}>
                                                    <field.selectedIconObj.Icon />
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
                                label={`URL ${index + 1}`}
                                size="small"
                                variant="outlined"
                                name="item_Center_Icone_Path"
                                value={field.item_Center_Icone_Path}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
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
                <div className="flex items-center gap-2  sticky top-0">
                    <Checkbox
                        defaultChecked
                        // checked={formData?.item_ShowOnWebsite || false}
                        // onChange={(e) =>
                        //     setIconeCenter((prev) => ({
                        //         ...prev,
                        //         item_ShowOnWebsite: e.target.checked,
                        //     }))
                        // }
                        sx={{ m: 0, p: 0 }}
                        size="small"
                    />
                    <p className="text-[14px] text-slate-500 font-sans">
                        If you want to show this on the website
                    </p>
                </div>
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
