import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, Button, TextField, Autocomplete, Divider } from '@mui/material';

const RoleUpdateModal = ({ id, dataByRole, setDataByRole, isTrue, setIsTrue }) => {

    const handleClose = () => setOpen(false);
    console.log("ID", id)

    const [formValues, setFormValues] = useState({
        fullname: '',
        username: '',
        email: '',
        contactnumber: "",
        dateofbirth: "",
        gender: "",
        marriedStatus: ""

    });

    console.log("formValues", formValues)

    useEffect(() => {   // main point for clear data before open form


        setFormValues({
            fullname: '',
            username: '',
            email: '',
            contactnumber: '',
            dateofbirth: "",
            gender: "",
            marriedStatus: ""
        });


        if (id && /^[a-f\d]{24}$/i.test(id)) {
            getRoleDataByID(id);
        }

    }, []);


    useEffect(() => {
        if (dataByRole) {
            setFormValues({

                fullname: dataByRole.fullname || '',
                username: dataByRole.username || '',
                email: dataByRole.email || '',
                contactnumber: dataByRole.contactnumber || '',
                dateofbirth: dataByRole.dateofbirth || '',
                gender: dataByRole.gender || '',
                marriedStatus: dataByRole.marriedStatus || ""


            });
        }
    }, [dataByRole]);

    const handlePermissionUpdate = async (e) => {
        e.preventDefault();
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}admin/update-role-info/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            });
            const result = await response.json();
            setIsTrue(!isTrue)
            console.log(result);
            handleClose();
            alert("User Update Succefully")

        } catch (error) {
            console.log(error);
        }
    };

    const getRoleDataByID = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/get-role-data/${id}`;
            const fetchData = await fetch(url);
            const response = await fetchData.json();
            console.log(response);
            setDataByRole(response.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (field) => (e) => {
        setFormValues({ ...formValues, [field]: e.target.value });
    };

    const marriedStatus = [
        { label: "Married" },
        { label: "Unmarried" }
    ]
    const gender = [
        { label: "Male" },
        { label: "Female" },
        { label: "Other" },

    ]

    return (
        <Box
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" ,}}
        >
            <Box
                sx={{
                    width: '100%',
                    // bgcolor: '#121010',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 20,
                    py: 3,
                    flexDirection: 'column',
                    borderRadius: 2
                }}
            >
                <div className="modal-update flex flex-col gap-2 w-full">
                    <Typography sx={{ width: '100%', fontSize: 23, mb: 2 }} component="h1">
                        Personal information
                    </Typography>

                    <div className='w-full flex  items-center gap-10 '>
                        <label for="open-img" >
                            <div className='profile-img   h-20 w-20 rounded-full  '>
                                <img className='rounded-full h-full w-full object-cover' src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}></img>
                                <input type='file' hidden id='open-img'
                                // onChange={(e) => setImage(e.target.files[0])}
                                ></input>
                                {/* */}
                            </div>
                        </label>
                        <Button
                            // onClick={ProfileUpdateHander}
                            // disabled={Object.keys(img).length === 0}
                            variant="outlined"
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                color: 'primary.main',
                                borderColor: 'primary.main',
                                zIndex: 1,
                                fontFamily: "revert-layer",
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: '0%',
                                    backgroundColor: 'primary.main',
                                    zIndex: -1,
                                    transition: 'width 0.4s ease',

                                },
                                '&:hover::before': {
                                    width: '100%',

                                },
                                '&:hover': {
                                    color: 'black', // text color on hover
                                    borderColor: 'primary.main',

                                },
                            }}
                        >
                            Change Picture
                            {/* <input
                                                    ref={uploadFile}
                                                    type="file"
                                                    onChange={(event) => uploadFileOnchange(event)}
                                                    hidden
                                                /> */}
                        </Button>
                        <Button sx={{ color: "red" }}  >Remove Picture</Button>


                    </div>
                    <Divider sx={{ marginY: "5px" }} />

                    <div className='flex  gap-2 w-full mb-3'>
                        <label className='w-full'>
                            <label className='full-name text-sm text-slate-400'>Full Name</label>
                            <TextField
                                sx={{ width: "100%" }}
                                id="fullname"
                                size="small"
                                // value={formValues.fullname}
                                defaultValue={formValues.fullname}
                                onChange={handleChange('fullname')}
                                variant="outlined"

                            />
                        </label>
                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Username</label>
                            <TextField
                                sx={{ width: "100%" }}
                                id="username"
                                size="small"
                                value={formValues.username}
                                onChange={handleChange('username')}
                                variant="outlined"

                            />
                        </label>

                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Email Address</label>
                            <TextField
                                sx={{ width: "100%", }}
                                id="email"
                                size="small"
                                value={formValues.email}
                                onChange={handleChange('email')}
                                variant="outlined"

                            />
                        </label>
                    </div>

                    <div className='flex  gap-2'>

                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Contact Number</label>
                            <TextField
                                sx={{ width: "100%" }}
                                id="contactnumber"
                                size="small"
                                value={formValues.contactnumber}
                                onChange={handleChange('contactnumber')}
                                variant="outlined"
                            />
                        </label>

                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Date Of Birth</label>
                            <TextField
                                sx={{ width: "100%" }}
                                id="dateofbirth"
                                type='date'
                                size="small"
                                value={formValues.dateofbirth}
                                onChange={handleChange('dateofbirth')}
                                variant="outlined"

                            />
                        </label>

                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Gender</label>
                            <Autocomplete
                                disablePortal
                                options={gender}
                                value={gender.find(opt => opt.label === formValues.gender) || null}
                                onChange={(event, value) => handleChange(

                                )}
                                sx={{ width: "100%", }}
                                size='small'
                                renderInput={(params) => <TextField {...params} />}
                            />
                            {/* <Autocomplete
                                disablePortal
                                options={gender}
                                // getOptionLabel={(option) => option.label}
                                value={gender.find(opt => opt.label === formValues.gender) || null}
                                onChange={(e, newValue) =>
                                    setFormValues(prev => ({ ...prev, gender: newValue?.label || "" }))
                                }
                                renderInput={(params) => <TextField {...params} placeholder="Gender" />}
                                size="small"
                                sx={{ width: "100%" }}
                            /> */}
                        </label>

                        <label className='w-full'>
                            <label className='user-name text-sm text-slate-400'>Married Status</label>

                            <Autocomplete
                                disablePortal
                                options={marriedStatus}
                                value={formValues.marriedStatus}
                                onChange={(event, value) => setFormValues("marriedStatus")}
                                sx={{
                                    width: "100%",
                                }}
                                size='small'
                                renderInput={(params) => <TextField {...params} />}
                            />
                            {/* <Autocomplete
                                disablePortal
                                options={marriedStatus}
                                // getOptionLabel={(option) => option.label}
                                value={marriedStatus.find(opt => opt.label === formValues.marriedStatus) || null}
                                onChange={(e, newValue) =>
                                    setFormValues(prev => ({ ...prev, marriedStatus: newValue?.label || "" }))
                                }
                                renderInput={(params) => <TextField {...params} />}
                                size="small"
                                sx={{ width: "100%" }}
                            /> */}

                        </label>

                    </div>

                    <Divider sx={{ marginY: "4px" }} />

                    <div>

                        <Typography sx={{ width: '100%', fontSize: 20, mb: 2 }} component="h1">
                            Location & Address
                        </Typography>

                        <div className='flex  gap-2 w-full mb-3'>
                            <label className='w-full'>
                                <label className='full-name text-sm text-slate-400'>Full Name</label>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="fullname"
                                    size="small"
                                    value={formValues.fullname}
                                    onChange={handleChange('fullname')}
                                    variant="outlined"

                                />
                            </label>
                            <label className='w-full'>
                                <label className='user-name text-sm text-slate-400'>Username</label>
                                <TextField
                                    sx={{ width: "100%" }}
                                    id="username"
                                    size="small"
                                    value={formValues.username}
                                    onChange={handleChange('username')}
                                    variant="outlined"

                                />
                            </label>

                            <label className='w-full'>
                                <label className='user-name text-sm text-slate-400'>Email Address</label>
                                <TextField
                                    sx={{ width: "100%", }}
                                    id="email"
                                    size="small"
                                    value={formValues.email}
                                    onChange={handleChange('email')}
                                    variant="outlined"

                                />
                            </label>
                        </div>

                    </div>

                    <div className='w-full flex justify-end'>
                        <Button
                            onClick={handlePermissionUpdate}
                            variant="contained"
                            sx={{
                                mt: 2, width: "200px"
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default RoleUpdateModal;
