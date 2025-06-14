import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Divider, IconButton, TextField, Tooltip } from '@mui/material'
import { Fragment } from 'react';


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
            <div className='flex flex-col w-97  p-5  border border-slate-400/20 rounded-md  bg-[#1f1e1f] shadow-black shadow-xl' >
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
                <div className="flex flex-col gap-4 w-full max-w-2xl bg-[#1f1e1f]  shadow-black shadow-xl p-5 rounded-md">
                    <div className="flex justify-between items-center  ">
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
                                className="border border-slate-400/20 rounded-md p-4 w-full relative "
                            >
                                <div className="flex justify-between gap-4  items-center ">
                                    <TextField
                                        label={`Menu Name `}
                                        size="small"
                                        variant="outlined"
                                        name="menuItem"
                                        value={field.menuItem}
                                        onChange={(e) => handleChange(index, e)}
                                        fullWidth
                                    />
                                    <TextField
                                        label={`Url `}
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

// <---------------- ---------------------------------Navbar Search section ------------------  ------------------------->  //

export const NavBarSearchSection = () => {
    return (
        <Fragment>
            <div className='nav-serach-section w-full h-[400px] flex justify-center items-center'>
                <from className="nav-serach-form flex flex-col gap-4 border border-slate-500/20  p-5 w-96 rounded-md bg-[#1f1e1f] shadow-black shadow-xl ">
                    <h1>Navbar Search Icone</h1>
                    <Divider />
                    <TextField
                        label="Search Icone"
                        size="small"
                        variant="outlined"
                    >

                    </TextField>

                    <Button sx={{
                        my: 2,
                        textTransform: "none"
                    }} variant='outlined'>Save Changes</Button>
                </from>

            </div>
        </Fragment>
    )
}

// <---------------- ---------------------------------Navbar Cart section ------------------  ------------------------->  //

export const CartSection = () => {
    return (
        <Fragment>
            <div className='nav-serach-section w-full h-[400px] flex justify-center items-center'>
                <from className="nav-serach-form flex flex-col gap-4 border border-slate-500/20  p-5 w-96 rounded-md bg-[#1f1e1f] shadow-black shadow-xl ">
                    <h1>Navbar Cart Icone</h1>
                    <Divider />
                    <TextField
                        label="Cart Icone"
                        size="small"
                        variant="outlined"
                    >
                    </TextField>

                    <Button sx={{
                        my: 2,
                        textTransform: "none"
                    }} variant='outlined'>Save Changes</Button>
                </from>

            </div>
        </Fragment>
    )
}

// <---------------- ---------------------------------Navbar Button/Profile------------------  ------------------------->  //

export const NavButton_Profile = () => {
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
    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[400px] flex flex-col' >
                <div className='flex flex-col w-97  p-5 gap-4 border border-slate-400/20 rounded-md  bg-[#1f1e1f] shadow-black shadow-xl' >
                    <h1 className='w-96  font-bold '> Create Profile / Button  </h1>

                    <Divider
                        sx={{
                            mb: "2"
                        }} />

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
                        variant="outlined"
                    >

                    </TextField>

                    <Button sx={{
                        my: 2,
                        textTransform: "none"
                    }}
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

// <---------------- --------------------------------- Header Buttom Bar  ------------------  ------------------------->  //

export const HeaderButtomBar = ({ setHeaderButtom, headerButtom, submitHandler }) => {

    const buttomBarOnchange = (e) => {
        const { name, value } = e.target
        setHeaderButtom((prev) => ({
            ...prev, [name]: value
        }))
    }

    console.log("headerButtom", headerButtom)

    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[400px] flex flex-col' >
                <div className='flex flex-col w-[500px] gap-4 p-5   border border-slate-400/20 rounded-md  bg-[#1f1e1f] shadow-black shadow-xl' >
                    <h1 className='w-96  font-bold '> Set Title/ Opening Hour : </h1>
                    <Divider />

                    <TextField
                        label="Icone"
                        size="small"
                        variant="outlined"
                        name='hirringTitle'
                    // value={headerButtom?.hirringTitle}
                    // onChange={buttomBarOnchange}
                    >
                    </TextField>
                    <TextField
                        label="Title"
                        size="small"
                        variant="outlined"
                        name='hirringTitle'
                        value={headerButtom?.hirringTitle}
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
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

// <---------------- --------------------------------- Header Buttom left section  ------------------  ------------------------->  //


export const HeaderButtomLeft = () => {

    const buttomBarOnchange = (e) => {
        // const { name, value } = e.target
        // setHeaderButtom((prev) => ({
        //     ...prev, [name]: value
        // }))
    }
    return (
        <Fragment>
            <div className='w-[100%] justify-center items-center h-[400px] flex flex-col' >
                <div className='flex flex-col w-97 gap-4 p-5   border border-slate-400/20 rounded-md  bg-[#1f1e1f] shadow-black shadow-xl' >
                    <h1 className='w-96  font-bold '>Header Bottom - Left Contact Info</h1>
                    <Divider />

                    <TextField
                        label="Icone"
                        size="small"
                        variant="outlined"
                        name='hirringTitle'
                        // value={headerButtom?.hirringTitle}
                        onChange={buttomBarOnchange}
                    >

                    </TextField>
                    <TextField
                        label="Title"
                        size="small"
                        name='openingTime'
                        // value={headerButtom?.openingTime}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <TextField
                        label="Dscriptions"
                        size="small"
                        name="closeTimnig"
                        // value={headerButtom?.closeTimnig}
                        onChange={buttomBarOnchange}
                        variant="outlined"
                    >
                    </TextField>

                    <Button sx={{

                        textTransform: "none"
                    }}
                        variant='outlined'>
                        Submit
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}