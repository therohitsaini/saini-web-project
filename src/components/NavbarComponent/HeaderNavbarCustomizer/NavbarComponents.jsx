import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Autocomplete, Box, Divider, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import { Fragment } from 'react';


import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { allFaMdIconsList } from '../HeaderTopLeft';

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

export default function NavbarLogo({ setFile, setText, handleSubmitLogo, file }) {

    console.log("setText", file)
    return (
        <div className='w-[100%] justify-center items-center h-[530px] flex flex-col' >
            <div className='flex flex-col w-[500px] gap-4  p-5  border border-slate-400/20 rounded-md  ' >
                <h1 className='w-96  font-bold '> Change Site logo </h1>
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
                        onChange={(e) => setFile(e.target.files[0])}
                        multiple
                    />
                </Button>

                <TextField
                    label="Site Logo"
                    size="small"
                    name='logo'
                    // value={text.logo}
                    // onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                >

                </TextField>

                <Button
                    onClick={() => handleSubmitLogo("Logo")}
                    sx={{
                        // my: 2,
                        textTransform: "none"
                    }} variant='outlined'>Submit</Button>
            </div>
        </div>
    );
}

// < ------------- Navbar List Item --------------------  >

export const NavbarListItem = ({ submitHandler, iconFields, setIconFields }) => {
    // Handle changes for individual fields
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...iconFields];
        updatedFields[index][name] = value;
        setIconFields(updatedFields);
    };

    const addNewField = () => {
        const newField = { menuItem: '', menuItemRoute: '' };
        setIconFields((prevFields) => [...(Array.isArray(prevFields) ? prevFields : []), newField]);
    };


    const removeField = async (index, id) => {

        const userIDMain = localStorage.getItem("user-ID")
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/delete-header/list-item/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: id, pageId: userIDMain })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                alert("Succfully ")
                setRefresh(prev => !prev);
                const updatedFields = iconFields.filter((_, i) => i !== index);
                setIconFields(updatedFields);
            }

        } catch (error) {
            console.error(error);
        }

    };
    console.log("iconFields", iconFields)
    return (
        <Fragment>
            <form className="flex justify-center flex-col items-center min-h-[530px]">
                <div className="flex flex-col gap-4 w-full max-w-2xl bg-[#1f1e1f] shadow-black shadow-xl p-5 rounded-md">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold text-white">Site Menu Items</h1>
                        <Button
                            onClick={() => submitHandler("NavManuItem")}
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                        >
                            Save Changes
                        </Button>
                    </div>

                    {iconFields && iconFields.map((field, index) => (
                        <div
                            key={index}
                            className="border border-slate-400/20 rounded-md p-4 w-full relative"
                        >
                            <div className="flex justify-between gap-4 items-center">
                                <TextField
                                    label="Menu Name"
                                    size="small"
                                    variant="outlined"
                                    name="menuItem"
                                    value={field.menuItem}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                                <TextField
                                    label="URL"
                                    size="small"
                                    variant="outlined"
                                    name="menuItemRoute"
                                    value={field.menuItemRoute}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={() => removeField(index, field.id)}
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


// <---------------- ---------------------------------Navbar Search section ------------------  ------------------------->  //

// export const NavBarSearchSection = ({
//     selectedIcon,
//     setSelectedIcon,
//     allFaMdIcons,
//     // headerButtomLeft,
//     // setHeaderButtomLeft,
//     submitHandler,
//     filteredIcons,
//     setInputValue,
//     inputValue,
//     setSearchIcone,
//     searchIcone
// }) => {

//     useEffect(() => {
//         if (searchIcone?.item_SearchIcone) {
//             const foundIcon = allFaMdIconsList.find(i => i.label === searchIcone.item_SearchIcone);
//             if (foundIcon) {
//                 setSearchIcone(foundIcon);
//             }
//         }
//     }, [searchIcone?.item_SearchIcone, allFaMdIcons]);
//     // console.log("headerButtom_____", headerButtomLeft)
//     console.log("searchIcone___", searchIcone)

//     return (
//         <Fragment>
//             <div className='nav-serach-section w-full h-[530px] flex justify-center items-center'>
//                 <from className="nav-serach-form flex flex-col gap-4 border border-slate-500/20  p-5 w-[500px] rounded-md bg-[#1f1e1f] shadow-black shadow-xl ">
//                     <h1>Navbar Search Icone</h1>
//                     <Divider />

//                     <Autocomplete
//                         options={filteredIcons}
//                         value={selectedIcon}
//                         onChange={(e, newValue) => {
//                             setSelectedIcon(newValue);
//                             setSearchIcone(prev => ({
//                                 ...prev,
//                                 item_SearchIcone: newValue ? newValue.label : ""
//                             }));
//                         }}
//                         size='small'
//                         inputValue={inputValue}
//                         onInputChange={(e, newInputValue) => setInputValue(newInputValue)}

//                         getOptionLabel={(option) => option.label}
//                         isOptionEqualToValue={(option, value) => option.label === value?.label}
//                         renderOption={(props, option) => (
//                             <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <option.Icon />
//                                 {option.label}
//                             </Box>
//                         )}
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Icone"
//                                 variant="outlined"
//                                 fullWidth
//                                 InputProps={{
//                                     ...params.InputProps,
//                                     startAdornment: selectedIcon?.Icon && (
//                                         <InputAdornment position="start" sx={{ mr: 1 }}>
//                                             <selectedIcon.Icon />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         )}
//                     />

//                     <Button sx={{
//                         my: 2,
//                         textTransform: "none"
//                     }} variant='outlined'
//                         onClick={() => submitHandler("HeaderSerchIcone")}
//                     >Save Changes</Button>
//                 </from>

//             </div>
//         </Fragment>
//     )
// }

export const NavBarSearchSection = ({
    selectedIcon,
    setSelectedIcon,
    allFaMdIcons,
    submitHandler,
    filteredIcons,
    setInputValue,
    inputValue,
    setSearchIcone,
    searchIcone
}) => {

    // useEffect(() => {
    //     if (searchIcone?.item_SearchIcone && Array.isArray(allFaMdIcons)) {
    //         const foundIcon = allFaMdIcons.find(i => i.label === searchIcone.item_SearchIcone);
    //         if (foundIcon) {
    //             setSearchIcone({
    //                 ...foundIcon,
    //                 item_SearchIcone: foundIcon.label
    //             });
    //         }
    //     }
    // }, [searchIcone?.item_SearchIcone, allFaMdIcons]);


    useEffect(() => {
        if (searchIcone?.item_SearchIcone) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === searchIcone?.item_SearchIcone);
            if (foundIcon) setSelectedIcon(foundIcon);
        }
    }, [searchIcone?.item_SearchIcone]);

    return (
        <Fragment>
            <div className='nav-serach-section w-full h-[530px] flex justify-center items-center'>
                <form className="nav-serach-form flex flex-col gap-4 border border-slate-500/20 p-5 w-[500px] rounded-md bg-[#1f1e1f] shadow-black shadow-xl">
                    <h1>Navbar Search Icon</h1>
                    <Divider />

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setSearchIcone({
                                ...newValue,
                                item_SearchIcone: newValue ? newValue.label : ""
                            });
                        }}
                        size='small'
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {option.Icon && <option.Icon />}
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Icon"
                                variant="outlined"
                                fullWidth
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

                    <Button
                        sx={{ my: 2, textTransform: "none" }}
                        variant='outlined'
                        onClick={() => submitHandler("HeaderSerchIcone", searchIcone)} // ✅ payload added
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};


// <-------------------------------------------------Navbar Cart section ------------------  ------------------------->  //

export const CartSection = ({ selectedIcon, setSelectedIcon, allFaMdIcons, submitHandler, cartIcone, setCartIcone, allFaMdIconsList, filteredIcons, setInputValue, inputValue }) => {


    useEffect(() => {
        if (cartIcone?.item_CartIcone) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === cartIcone?.item_CartIcone);
            if (foundIcon) setSelectedIcon(foundIcon);
        }
    }, [cartIcone?.item_CartIcone]);

    return (
        <Fragment>
            <div className='nav-serach-section w-full h-[530px] flex justify-center items-center'>
                <from className="nav-serach-form flex flex-col gap-4 border border-slate-500/20  p-5 w-[500px] rounded-md bg-[#1f1e1f] shadow-black shadow-xl ">
                    <h1>Navbar Cart Icone</h1>
                    <Divider />
                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setCartIcone(prev => ({
                                ...prev,
                                item_CartIcone: newValue ? newValue.label : ""
                            }));
                        }}
                        size='small'
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Icone"
                                variant="outlined"
                                fullWidth
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
                    <Button sx={{
                        my: 2,
                        textTransform: "none"
                    }}
                        onClick={() => submitHandler("HeaderCartIcone")}
                        variant='outlined'>Save Changes</Button>
                </from>

            </div>
        </Fragment>
    )
}

// <---------------- ---------------------------------Navbar Button/Profile------------------  ------------------------->  //

export const NavButton_Profile = ({ headerButton, setHeaderButton, submitHandler }) => {
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

    const onChnageButton = (event) => {
        const { name, value } = event.target
        setHeaderButton((pre) => ({
            ...pre,
            [name]: value
        }))

    }

    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[530px] flex flex-col' >
                <div className='flex flex-col w-[500px]  p-5 gap-4 border border-slate-400/20 rounded-md  bg-[#1f1e1f] shadow-black shadow-xl' >
                    <h1 className='w-96  font-bold '> Create Profile / Button  </h1>

                    <Divider
                        sx={{
                            mb: "2"
                        }} />

                    <Button
                        disableElevation
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            textTransform: "none"
                        }}
                    >
                        Upload profile
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                    {/* OR */}
                    {/* <p className='my-4 relative'>
                        <Divider />
                        <span className="w-full flex justify-center absolute -top-3" ><sapn className="bg-[#1f1e1f] " >OR</sapn></span>
                    </p> */}
                    <TextField
                        label="Button"
                        size="small"
                        name='buttonText'
                        value={headerButton.buttonText}
                        onChange={onChnageButton}
                        variant="outlined"
                    >

                    </TextField>

                    <Button sx={{
                        my: 2,
                        textTransform: "none"
                    }}
                        onClick={() => submitHandler("navButton")}
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

// <---------------- --------------------------------- Header Buttom Bar  ------------------  ------------------------->  //

export const HeaderButtomBar = ({ setHeaderButtom, headerButtom, selectedIcon, setSelectedIcon, allFaMdIconsList, submitHandler, filteredIcons, setInputValue, inputValue }) => {

    const buttomBarOnchange = (e) => {
        const { name, value } = e.target
        setHeaderButtom((prev) => ({
            ...prev, [name]: value
        }))
    }

    useEffect(() => {

        if (headerButtom?.item_Icone) {
            const foundIcon = allFaMdIconsList.find(i => i.label === headerButtom.item_Icone);
            if (foundIcon) {
                setSelectedIcon(foundIcon);
            }
        }
    }, [headerButtom?.item_Icone]);
    console.log("headerButtom_____Icone", headerButtom)

    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[530px] flex flex-col' >
                <div className='flex flex-col w-[550px] gap-4 p-5   border border-slate-400/20 rounded-md  ' >
                    <h1 className='w-96  font-bold '> Set Title/ Opening Hour : </h1>
                    <Divider />

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}

                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setHeaderButtom(prev => ({
                                ...prev,
                                item_Icone: newValue ? newValue.label : ""
                            }));
                        }}
                        size='small'
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Icone"
                                variant="outlined"
                                fullWidth
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

                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        name='item_Title'
                        value={headerButtom?.item_Title}
                        onChange={buttomBarOnchange}
                    >

                    </TextField>
                    <TextField
                        // label="Open Time"
                        type='time'
                        size="small"
                        name='openingTime'
                        value={headerButtom?.openingTime}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <TextField
                        // label="Closeing Timeing"
                        size="small"
                        type='time'
                        name="closeTimnig"
                        value={headerButtom?.closeTimnig}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <Button sx={{

                        textTransform: "none"
                    }}
                        onClick={() => submitHandler("HeaderButtomBar")}
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

// <---------------- --------------------------------- Header Buttom left section  ------------------  ------------------------->  //


export const HeaderButtomLeft = ({ setSelectedIcon, selectedIcon, allFaMdIconsList, setHeaderButtomLeft, headerButtomLeft, submitHandler, filteredIcons, setInputValue, inputValue }) => {

    const buttomBarOnchange = (e) => {
        const { name, value } = e.target
        setHeaderButtomLeft((prev) => ({
            ...prev, [name]: value
        }))
    }
    console.log("Icone", headerButtomLeft)

    useEffect(() => {
        if (headerButtomLeft?.item_Icone && allFaMdIconsList?.length) {
            const foundIcon = allFaMdIconsList.find(i => i.label === headerButtomLeft.item_Icone);
            if (foundIcon) {
                setSelectedIcon(foundIcon);
            }
        }
    }, [headerButtomLeft?.item_Icone,]);



    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[530px] flex flex-col' >
                <div className='flex flex-col w-[530px] gap-4 p-5   border border-slate-400/20 rounded-md  ' >
                    <h1 className='w-96  font-bold '>Header Bottom - Left Contact Info</h1>
                    <Divider />

                    <Autocomplete
                        options={filteredIcons}
                        value={selectedIcon}
                        onChange={(e, newValue) => {
                            setSelectedIcon(newValue);
                            setHeaderButtomLeft(prev => ({
                                ...prev,
                                item_Icone: newValue ? newValue.label : ""
                            }));
                        }}
                        size='small'
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <option.Icon />
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Icone"
                                variant="outlined"
                                fullWidth
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
                    <TextField
                        label="Title"
                        size="small"
                        name='item_Title'
                        value={headerButtomLeft?.item_Title}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <TextField
                        label="Dscriptions"
                        size="small"
                        name="item_Paragraph"
                        value={headerButtomLeft?.item_Paragraph}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <Button sx={{

                        textTransform: "none"
                    }}
                        onClick={() => submitHandler("HeaderButtomHirring")}
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}