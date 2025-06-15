import { Alert, Autocomplete, Button, Divider, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnfirmInfoDiolog from '../../ModalComponent/ConnfirmInfoDiolog'
import { FETCH_PROFILE_HEADER, sendUserDetailHeader } from '../../Store/SignInModalRedux/action'
import { Country, State, City } from 'country-state-city';
import { getAllStates, getStatesOfCountry } from 'country-state-city/lib/state'




const AccountDashbord = ({ data, setData, user_ID, userProfilePic, setProfileRefress ,profileRefress}) => {

    // const userDetails = useSelector((state) => state.fullName.data)
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

    // console.log("seletedCountryList", seletedCountryList)
    // console.log("districList", districList)

    // console.log("allState", City.getAllCities())
    console.log("userData_", img)


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


    const updateUserProfleHandler = async (event) => {
        event.preventDefault()
        setIsDilogeTrue(false)


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
                setProfileRefress(prev => !prev);
            }
        } catch (error) {
            console.log("somthing went wrong!", error)

        }

    }


    const ProfileUpdateHander = async (event) => {
        event.preventDefault();
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
                alert(response.massage);
            } catch (e) {
                console.error("Failed to parse JSON:", responseText);
            }

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

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
            <div className='w-full  flex justify-center  '>
                <div className='profile-main   flex flex-col gap-7  py-10 px-10  w-[700px]'>


                    <h1 className='heading text-white  text-3xl'>Profile Details</h1>

                    <div className='w-full flex  items-center gap-10'>
                        <label for="open-img" >
                            <div className='profile-img   h-20 w-20 rounded-full  '>
                                <img className='rounded-full h-full w-full object-cover' src={userProfilePic ? userProfilePic : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}></img>
                                <input type='file' hidden id='open-img' onChange={(e) => setImage(e.target.files[0])}></input>
                                {/* */}
                            </div>
                        </label>
                        <Button
                            onClick={ProfileUpdateHander}
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
                    {/* <input type="file" onChange={(event) => setUploadProfilePicture(event.target.files[0])}></input> */}

                    <div className='flex  gap-3 '>
                        <ul>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Full Name</label>
                            <TextField inputRef={fullname} size='small' type='text' sx={{ width: "300px" }} defaultValue={data?.fullname}></TextField>
                        </ul>
                        <ul>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Username</label>
                            <TextField inputRef={username} size='small' type='text' defaultValue={data?.username} sx={{ width: "300px" }} ></TextField>
                        </ul>
                    </div>
                    <div className='flex  gap-3'>
                        <ul>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Email Address</label>
                            <TextField inputRef={email} size='small' type='email' defaultValue={data?.email} sx={{ width: "300px", color: "#847f7f" }} ></TextField>
                        </ul>
                        <ul>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Contact Number</label>
                            <TextField inputRef={contactnumber} size='small' type='number' defaultValue={data?.contactnumber} sx={{ width: "300px", }} ></TextField>
                        </ul>

                    </div>
                    <Divider />
                    <span>Additional Information </span>

                    <div className='flex  gap-3 '>

                        <ul className='flex flex-col'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Gender</label>

                          
                            <select ref={gender} className='w-[300px] p-2.5 rounded-sm bg-[#131312] border border-slate-400/40 outline-cyan-400'>
                                <option >{data?.gender}</option>
                                <option value="Male">Male</option>
                                <option value="Male">Female</option>
                                <option value="Male">Other</option>

                            </select>
                        </ul>
                        <ul className='flex flex-col w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>Date Of Birth</label>
                            <TextField InputLabelProps={{ shrink: true }} inputRef={dateofbirth} type='date' size='small' defaultValue={data?.dateofbirth} sx={{ width: "300px" }} ></TextField>
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
                            {/* <TextField size='small' inputRef={city} defaultValue={data?.city} sx={{ width: "100%" }} ></TextField> */}
                        </ul>

                        <ul className=' w-full flex flex-col '>
                            <label className='text-sm font-sans text-slate-400 font-semibold mb-0.5'>State</label>
                            <select disabled={!seletedCountryList} onChange={(e) => stateOnchangeHandler(state_.find((s) => s.isoCode === e.target.value))} className='border border-slate-400/40  rounded-sm p-2.5  bg-[#131312] text-white overflow-hidden outline-cyan-400'>
                                <option className=' overflow-hidden w-[10px]' >{data ? data?.state : "Select State"}</option>

                                {
                                    state_.map((state_Data) => <option className=' overflow-hidden' key={state_Data.isoCode} value={state_Data.isoCode}>{state_Data.name}</option>)
                                }

                            </select>
                            {/* <TextField size='small' inputRef={state} defaultValue={data?.state} sx={{ width: "100%" }} ></TextField> */}
                        </ul>



                    </div>
                    <div className='flex  gap-3 w-full  items-center'>
                        <ul className='flex flex-col w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>City</label>
                            <select
                                onChange={(e) => setDistricList(e.target.value)}
                                //  onChange={(e) => stateOnchangeHandler(state_.find((s) => c.isoCode === e.target.value))}
                                className='border border-slate-400/40  rounded-sm p-2.5  bg-[#131312] text-white  '>
                                <option className=''>{data ? data?.city : "Select City"}</option>

                                {
                                    distric_.map((dis_Data) => <option key={dis_Data.isoCode} value={dis_Data.isoCode}>{dis_Data.name}</option>)

                                }

                            </select>
                            {/* <TextField size='small' inputRef={country} defaultValue={data?.country} sx={{ width: "100%" }} ></TextField> */}
                        </ul>

                        <ul className='flex flex-col w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>ZipCode</label>
                            <input ref={zipCode} defaultValue={data?.zipCode} type='number' className='border border-slate-400/40  rounded-sm p-2  bg-[#131312] text-white'></input>
                            {/* <TextField size='small' inputRef={country} defaultValue={data?.country} sx={{ width: "100%" }} ></TextField> */}
                        </ul>
                    </div>
                    <Button
                        //  onClick={(e) => updateUserProfleHandler(e)}
                        onClick={() => setIsDilogeTrue(true)}
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            zIndex: 1,
                            fontFamily: "revert-layer",
                            transition: 'color 0.4s ease, border-color 0.4s ease',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 400,
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
                        Save Changes
                    </Button>

                </div>


            </div>
        </Fragment >
    )
}

export default AccountDashbord