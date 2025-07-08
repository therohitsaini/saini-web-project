import { Alert, Autocomplete, Button, CircularProgress, Divider, Snackbar, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnfirmInfoDiolog from '../../ModalComponent/ConnfirmInfoDiolog'
import { FETCH_PROFILE_HEADER, sendUserDetailHeader } from '../../Store/SignInModalRedux/action'
import { Country, State, City } from 'country-state-city';
import { getAllStates, getStatesOfCountry } from 'country-state-city/lib/state'
import { useSnackbar } from '../Snakbar/Snakbar'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';




const AccountDashbord = ({ data, setData, user_ID, userProfilePic, setProfileRefress, profileRefress, setLoading, loading }) => {

    const [snackBar, setSnackBar] = useState("")
    const [updateProfilePicture, setUploadProfilePicture] = useState("")
    const [isDilogTrue, setIsDilogeTrue] = useState(false)
    const [error, setError] = useState("")
    const [genderValue, setGenderValue] = useState("");
    const [img, setImage] = useState({})
    const [country_, setCountry_] = useState([])
    const [state_, setState_] = useState([])
    const [distric_, setDistric_] = useState([])
    const [seletedCountryList, setSelectedCountryList] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [districList, setDistricList] = useState(null)
    const [isHover, setIsHover] = useState(false)


    const fullname = useRef("")
    const email = useRef("")
    const username = useRef("")
    const contactnumber = useRef("")
    const gender = useRef("")
    const dateofbirth = useRef("")
    const zipCode = useRef("")
    const state = useRef("")
    const country = useRef("")
    const uploadFile = useRef("")


    const snackbar = useSnackbar();
    if (!snackbar) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    const { showSnackbar, showError } = snackbar;


    const updateUserProfleHandler = async (event) => {
        event.preventDefault()
        setIsDilogeTrue(false)
        setLoading(true)
        const object = {

            fullname: fullname.current.value,
            email: email.current.value,
            username: username.current.value,
            contactnumber: contactnumber.current.value,
            gender: gender.current.value,
            dateofbirth: dateofbirth.current.value,
            country: seletedCountryList?.name,
            state: selectedState?.name,
            city: districList,
            zipCode: zipCode.current.value

        }

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/update/profile/${user_ID}`
            const fetchDataUpdate = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object)
            })
            const response = await fetchDataUpdate.json()
            console.log("response", response)
            if (!fetchDataUpdate.ok) {
                setError(JSON.stringify(response.massage))

            }

            if (fetchDataUpdate.ok) {
                setSnackBar(response.massage)
                showSnackbar(response.massage);
                setProfileRefress(prev => !prev);
                setLoading(false)
            }
        } catch (error) {
            console.log("somthing went wrong!", error)

        }

    }

    useEffect(() => {

        if (!img || !img.name) return;
        const ProfileUpdateHander = async (event) => {
            try {
                const url = `${import.meta.env.VITE_BACK_END_URL}all/update/profile-picture/${user_ID}`;
                const formData = new FormData();
                formData.append("image", img);

                const profileData = await fetch(url, {
                    method: "PUT",
                    body: formData,
                });

                const responseText = await profileData.text();
                if (profileData.ok) {
                    setProfileRefress(prev => !prev);
                }
                try {
                    const response = JSON.parse(responseText);
                    showSnackbar(response.massage);
                } catch (e) {
                    console.error("Failed to parse JSON:", responseText);
                }

            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        ProfileUpdateHander()
    }, [img])

    useEffect(() => {
        const countries = Country.getAllCountries()
        setCountry_(countries);
    }, [])

    const countryOnchange = (country_Data) => {
        setSelectedCountryList(country_Data)
        setState_(State.getStatesOfCountry(country_Data.isoCode))
        setDistric_([])
    }

    const stateOnchangeHandler = (state_Data) => {
        setSelectedState(state_Data);
        const cities = City.getCitiesOfState(seletedCountryList.isoCode, state_Data.isoCode);
        setDistric_(cities)
    };

    const handleClose = () => {
        setSnackBar(false)
        setError(false)
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    return (
        <Fragment>
            <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>

                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackBar}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert
                    onClose={handleClose}

                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
            < ConnfirmInfoDiolog isDilogTrue={isDilogTrue} setIsDilogeTrue={setIsDilogeTrue} updateUserProfleHandler={updateUserProfleHandler} />
            <div className='w-full  mt-5 '>
                <h1 className='heading text-white  text-3xl px-10'>Profile Details</h1>

                <div className='profile-main   flex  gap-7  py-10 px-10  w-full '>
                    <div className='min-w-80 flex flex-col items-center gap-5  h-96 p-5 rounded-md  border border-slate-500/20 ' >
                        <div className=' border border-cyan-700  rounded-full p-1 border-dashed'>
                            <label onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} for="open-img" className='mt-10 rounded-full relative  '>
                                <div className='profile-img   h-30 w-30 rounded-full  '>
                                    <img className='rounded-full h-full w-full object-cover' src={userProfilePic ? userProfilePic : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}></img>
                                    <input type='file' hidden id='open-img' onChange={(e) => setImage(e.target.files[0])}></input>

                                </div>
                                {
                                    isHover &&
                                    <div className=' absolute   top-0 rounded-full h-30 w-30  bg-black/70 flex justify-center items-center duration-900'>
                                        <div className=' p-2 rounded-full'>   <AddAPhotoIcon size="10px" /></div>
                                    </div>}
                            </label>
                        </div>

                        <div className='profile-desable  w-full flex items-center justify-between mt-5'>
                            <div className='warraper-heading-p '>
                                <h1>
                                    Banned
                                </h1>
                                <p className='text-[12px] text-slate-400'>
                                    Apply disable account
                                </p>

                            </div>
                            <div>
                                <Switch {...label} defaultChecked />
                            </div>
                        </div>
                        <div className='profile-desable  w-full flex items-center justify-between'>
                            <div className='warraper-heading-p '>
                                <h1>
                                    Email verified
                                </h1>
                                <p className='text-[12px] text-slate-400'>

                                    Email verified
                                    Disabling this will automatically send the user a verification email
                                </p>

                            </div>
                            <div>
                                <Switch {...label} defaultChecked />
                            </div>
                        </div>
                    </div>

                    <div className='profile-form-main flex flex-col gap-5 w-full p-5 rounded-md  border border-slate-500/20 '>
                        <div className='flex  gap-5 '>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Full Name</label>
                                <TextField inputRef={fullname} size='small' type='text' sx={{ width: "100%" }} defaultValue={data?.fullname}></TextField>
                            </ul>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Username</label>
                                <TextField inputRef={username} size='small' type='text' defaultValue={data?.username} sx={{ width: "100%" }} ></TextField>
                            </ul>
                        </div>
                        <div className='flex  gap-3 w-full'>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Email Address</label>
                                <TextField inputRef={email} size='small' type='email' defaultValue={data?.email} sx={{ width: "100%", color: "#847f7f" }} ></TextField>
                            </ul>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Contact Number</label>
                                <TextField inputRef={contactnumber} size='small' type='number' defaultValue={data?.contactnumber} sx={{ width: "100%", }} ></TextField>
                            </ul>

                        </div>
                        <Divider />
                        <span>Additional Information </span>

                        <div className='flex  gap-3 '>

                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Gender</label>


                                <select ref={gender} className='w-[100%] p-2.5 rounded-sm bg-[#131312] border border-slate-400/40 outline-cyan-400'>
                                    <option >{data?.gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Male">Female</option>
                                    <option value="Male">Other</option>

                                </select>
                            </ul>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>Date Of Birth</label>
                                <TextField InputLabelProps={{ shrink: true }} inputRef={dateofbirth} type='date' size='small' defaultValue={data?.dateofbirth} sx={{ width: "100%" }} ></TextField>
                            </ul>
                        </div>

                        <div className='flex  gap-3 w-full  items-center'>
                            <ul className='w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold '>Country</label>
                                <select onChange={(e) => countryOnchange(country_.find((c) => c.isoCode === e.target.value))} defaultValue={data?.country} className='border border-slate-400/40  p-2.5 rounded-sm bg-[#131312] text-white w-full outline-cyan-400'>
                                    <option>{data ? data?.country : "Select Country"}</option>

                                    {
                                        country_.map((country_Data) => <option key={country_Data.isoCode} value={country_Data.isoCode}>{country_Data.name}</option>)
                                    }

                                </select>
                            </ul>

                            <ul className=' w-full flex flex-col '>
                                <label className='text-sm font-sans text-slate-400 font-semibold mb-0.5'>State</label>
                                <select disabled={!seletedCountryList} onChange={(e) => stateOnchangeHandler(state_.find((s) => s.isoCode === e.target.value))} className='border border-slate-400/40  rounded-sm p-2.5  bg-[#131312] text-white overflow-hidden outline-cyan-400'>
                                    <option className=' overflow-hidden w-[10px]' >{data ? data?.state : "Select State"}</option>

                                    {
                                        state_.map((state_Data) => <option className=' overflow-hidden' key={state_Data.isoCode} value={state_Data.isoCode}>{state_Data.name}</option>)
                                    }

                                </select>
                            </ul>



                        </div>
                        <div className='flex  gap-3 w-full  items-center'>
                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>City</label>
                                <select
                                    onChange={(e) => setDistricList(e.target.value)}
                                    className='border border-slate-400/40  rounded-sm p-2.5  bg-[#131312] text-white  '>
                                    <option className=''>{data ? data?.city : "Select City"}</option>

                                    {
                                        distric_.map((dis_Data) => <option key={dis_Data.isoCode} value={dis_Data.isoCode}>{dis_Data.name}</option>)

                                    }

                                </select>
                            </ul>

                            <ul className='flex flex-col w-full'>
                                <label className='text-sm font-sans text-slate-400 font-semibold'>ZipCode</label>
                                <input ref={zipCode} defaultValue={data?.zipCode} type='number' className='border border-slate-400/40  rounded-sm p-2  bg-[#131312] text-white'></input>
                                {/* <TextField size='small' inputRef={country} defaultValue={data?.country} sx={{ width: "100%" }} ></TextField> */}
                            </ul>
                        </div>
                        <div className='flex justify-end'>
                            <Button
                               
                                onClick={() => setIsDilogeTrue(true)}
                                variant="outlined"
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: 'primary.main',
                                    borderColor: 'primary.main',
                                    zIndex: 1,
                                    textTransform:"none",
                                    fontFamily: "revert-layer",
                                    transition: 'color 0.4s ease, border-color 0.4s ease',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 400,
                                    px: 5,
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
                                        color: 'black',
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={23} sx={{ color: '#0b9ad2' }} />
                                ) : (
                                    ' Save Changes'
                                )}

                            </Button>
                        </div>
                    </div>
                </div>


            </div>
        </Fragment >
    )
}

export default AccountDashbord

// import {
//     Alert,
//     Button,
//     Divider,
//     Snackbar,
//     TextField
// } from '@mui/material';
// import React, { useEffect, useRef, useState } from 'react';
// import { Fragment } from 'react';
// import { Country, State, City } from 'country-state-city';
// import ConnfirmInfoDiolog from '../../ModalComponent/ConnfirmInfoDiolog';

// const AccountDashbord = ({ data, setData, user_ID, userProfilePic, setProfileRefress, profileRefress }) => {
//     const [snackBar, setSnackBar] = useState("");
//     const [isDilogTrue, setIsDilogeTrue] = useState(false);
//     const [error, setError] = useState("");
//     const [img, setImage] = useState({});
//     const [previewImage, setPreviewImage] = useState(null); // ✅ NEW
//     const [country_, setCountry_] = useState([]);
//     const [state_, setState_] = useState([]);
//     const [distric_, setDistric_] = useState([]);
//     const [seletedCountryList, setSelectedCountryList] = useState(null);
//     const [selectedState, setSelectedState] = useState(null);
//     const [districList, setDistricList] = useState(null);

//     const fullname = useRef("");
//     const email = useRef("");
//     const username = useRef("");
//     const contactnumber = useRef("");
//     const gender = useRef("");
//     const dateofbirth = useRef("");
//     const zipCode = useRef("");

//     const updateUserProfleHandler = async (event) => {
//         event.preventDefault();
//         setIsDilogeTrue(false);

//         const object = {
//             fullname: fullname.current.value,
//             email: email.current.value,
//             username: username.current.value,
//             contactnumber: contactnumber.current.value,
//             gender: gender.current.value,
//             dateofbirth: dateofbirth.current.value,
//             country: seletedCountryList?.name,
//             state: selectedState?.name,
//             city: districList,
//             zipCode: zipCode.current.value,
//         };

//         try {
//             const url = `${import.meta.env.VITE_BACK_END_URL}all/update/profile/${user_ID}`;
//             const fetchDataUpdate = await fetch(url, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(object),
//             });
//             const response = await fetchDataUpdate.json();

//             if (!fetchDataUpdate.ok) {
//                 setError(JSON.stringify(response.massage));
//             }

//             if (fetchDataUpdate.ok) {
//                 setSnackBar(response.massage);
//                 setProfileRefress(prev => !prev);
//             }
//         } catch (error) {
//             console.log("Something went wrong!", error);
//         }
//     };

//     const ProfileUpdateHander = async (event) => {
//         event.preventDefault();
//         try {
//             const url = `${import.meta.env.VITE_BACK_END_URL}all/update/profile-picture/${user_ID}`;
//             const formData = new FormData();
//             formData.append("image", img);

//             const profileData = await fetch(url, {
//                 method: "PUT",
//                 body: formData,
//             });

//             const responseText = await profileData.text();
//             if (profileData.ok) {
//                 setProfileRefress(prev => !prev);
//             }
//             try {
//                 const response = JSON.parse(responseText);
//                 alert(response.massage);
//             } catch (e) {
//                 console.error("Failed to parse JSON:", responseText);
//             }

//         } catch (error) {
//             console.error("Fetch error:", error);
//         }
//     };

//     useEffect(() => {
//         const countries = Country.getAllCountries();
//         setCountry_(countries);
//     }, []);

//     const countryOnchange = (country_Data) => {
//         setSelectedCountryList(country_Data);
//         setState_(State.getStatesOfCountry(country_Data.isoCode));
//         setDistric_([]);
//     };

//     const stateOnchangeHandler = (state_Data) => {
//         setSelectedState(state_Data);
//         const cities = City.getCitiesOfState(seletedCountryList.isoCode, state_Data.isoCode);
//         setDistric_(cities);
//     };

//     const handleClose = () => {
//         setSnackBar(false);
//         setError(false);
//     };

//     return (
//         <Fragment>
//             <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
//                 <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
//                     {snackBar}
//                 </Alert>
//             </Snackbar>
//             <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
//                 <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
//                     {error}
//                 </Alert>
//             </Snackbar>

//             <ConnfirmInfoDiolog isDilogTrue={isDilogTrue} setIsDilogeTrue={setIsDilogeTrue} updateUserProfleHandler={updateUserProfleHandler} />

//             <div className='w-full'>
//                 <h1 className='heading text-white text-3xl'>Profile Details</h1>

//                 <div className='profile-main flex gap-7 py-10 px-10 w-full'>
//                     {/* Profile Picture Section */}
//                     <div className='min-w-96 flex flex-col items-center gap-5 border border-slate-600/20 h-96 p-5 rounded-md'>
//                         <Button
//                             onClick={ProfileUpdateHander}
//                             variant="outlined"
//                             sx={{
//                                 position: 'relative',
//                                 overflow: 'hidden',
//                                 color: 'primary.main',
//                                 borderColor: 'primary.main',
//                                 zIndex: 1,
//                                 fontFamily: "revert-layer",
//                                 fontSize: "10px",
//                                 '&::before': {
//                                     content: '""',
//                                     position: 'absolute',
//                                     left: 0,
//                                     top: 0,
//                                     height: '100%',
//                                     width: '0%',
//                                     backgroundColor: 'primary.main',
//                                     zIndex: -1,
//                                     transition: 'width 0.4s ease',
//                                 },
//                                 '&:hover::before': {
//                                     width: '100%',
//                                 },
//                                 '&:hover': {
//                                     color: 'black',
//                                     borderColor: 'primary.main',
//                                 },
//                             }}
//                         >
//                             Change Picture
//                         </Button>

//                         <label htmlFor="open-img">
//                             <div className='profile-img h-30 w-30 rounded-full'>
//                                 <img
//                                     className='rounded-full h-full w-full object-cover'
//                                     src={
//                                         previewImage
//                                             ? previewImage
//                                             : userProfilePic
//                                                 ? userProfilePic
//                                                 : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//                                     }
//                                     alt="profile"
//                                 />
//                                 <input
//                                     type='file'
//                                     hidden
//                                     id='open-img'
//                                     onChange={(e) => {
//                                         const file = e.target.files[0];
//                                         if (file) {
//                                             setImage(file);
//                                             setPreviewImage(URL.createObjectURL(file));
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </label>
//                     </div>

//                     {/* Profile Info Form */}
//                     <div className='border border-slate-600/20 flex flex-col gap-5 w-full p-5 rounded-md'>
//                         <div className='flex gap-5'>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Full Name</label>
//                                 <TextField inputRef={fullname} size='small' type='text' defaultValue={data?.fullname} sx={{ width: "100%" }} />
//                             </ul>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Username</label>
//                                 <TextField inputRef={username} size='small' type='text' defaultValue={data?.username} sx={{ width: "100%" }} />
//                             </ul>
//                         </div>

//                         <div className='flex gap-3 w-full'>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Email Address</label>
//                                 <TextField inputRef={email} size='small' type='email' defaultValue={data?.email} sx={{ width: "100%" }} />
//                             </ul>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Contact Number</label>
//                                 <TextField inputRef={contactnumber} size='small' type='number' defaultValue={data?.contactnumber} sx={{ width: "100%" }} />
//                             </ul>
//                         </div>

//                         <Divider />
//                         <span>Additional Information</span>

//                         <div className='flex gap-3'>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Gender</label>
//                                 <select ref={gender} className='w-full p-2.5 rounded-sm bg-[#131312] border border-slate-400/40 outline-cyan-400'>
//                                     <option>{data?.gender}</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </ul>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Date Of Birth</label>
//                                 <TextField
//                                     InputLabelProps={{ shrink: true }}
//                                     inputRef={dateofbirth}
//                                     type='date'
//                                     size='small'
//                                     defaultValue={data?.dateofbirth}
//                                     sx={{ width: "100%" }}
//                                 />
//                             </ul>
//                         </div>

//                         {/* Location Section */}
//                         <div className='flex gap-3 w-full items-center'>
//                             <ul className='w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>Country</label>
//                                 <select
//                                     onChange={(e) => countryOnchange(country_.find((c) => c.isoCode === e.target.value))}
//                                     defaultValue={data?.country}
//                                     className='border border-slate-400/40 p-2.5 rounded-sm bg-[#131312] text-white w-full outline-cyan-400'
//                                 >
//                                     <option>{data?.country || "Select Country"}</option>
//                                     {country_.map((country_Data) => (
//                                         <option key={country_Data.isoCode} value={country_Data.isoCode}>
//                                             {country_Data.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </ul>

//                             <ul className='w-full flex flex-col'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold mb-0.5'>State</label>
//                                 <select
//                                     disabled={!seletedCountryList}
//                                     onChange={(e) => stateOnchangeHandler(state_.find((s) => s.isoCode === e.target.value))}
//                                     className='border border-slate-400/40 rounded-sm p-2.5 bg-[#131312] text-white overflow-hidden outline-cyan-400'
//                                 >
//                                     <option>{data?.state || "Select State"}</option>
//                                     {state_.map((state_Data) => (
//                                         <option key={state_Data.isoCode} value={state_Data.isoCode}>
//                                             {state_Data.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </ul>
//                         </div>

//                         <div className='flex gap-3 w-full items-center'>
//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>City</label>
//                                 <select
//                                     onChange={(e) => setDistricList(e.target.value)}
//                                     className='border border-slate-400/40 rounded-sm p-2.5 bg-[#131312] text-white'
//                                 >
//                                     <option>{data?.city || "Select City"}</option>
//                                     {distric_.map((dis_Data) => (
//                                         <option key={dis_Data.name} value={dis_Data.name}>
//                                             {dis_Data.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </ul>

//                             <ul className='flex flex-col w-full'>
//                                 <label className='text-sm font-sans text-slate-400 font-semibold'>ZipCode</label>
//                                 <input
//                                     ref={zipCode}
//                                     defaultValue={data?.zipCode}
//                                     type='number'
//                                     className='border border-slate-400/40 rounded-sm p-2 bg-[#131312] text-white'
//                                 />
//                             </ul>
//                         </div>

//                         <Button
//                             onClick={() => setIsDilogeTrue(true)}
//                             variant="outlined"
//                             sx={{
//                                 position: 'relative',
//                                 overflow: 'hidden',
//                                 color: 'primary.main',
//                                 borderColor: 'primary.main',
//                                 zIndex: 1,
//                                 fontFamily: "Roboto, sans-serif",
//                                 fontWeight: 400,
//                                 '&::before': {
//                                     content: '""',
//                                     position: 'absolute',
//                                     left: 0,
//                                     top: 0,
//                                     height: '100%',
//                                     width: '0%',
//                                     backgroundColor: 'primary.main',
//                                     zIndex: -1,
//                                     transition: 'width 0.4s ease',
//                                 },
//                                 '&:hover::before': {
//                                     width: '100%',
//                                 },
//                                 '&:hover': {
//                                     color: 'black',
//                                     borderColor: 'primary.main',
//                                 },
//                             }}
//                         >
//                             Save Changes
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default AccountDashbord;
