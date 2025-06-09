
import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Autocomplete,
    Divider,
} from '@mui/material';
import { City, Country, State } from 'country-state-city';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Icon } from '@iconify/react';


const RoleUpdateModal = ({ id, dataByRole, setDataByRole, isTrue, setIsTrue, }) => {

    const [country_, setCountry_] = useState([])
    const [state_, setState_] = useState([])
    const [distric_, setDistric_] = useState([])
    const [seletedCountryList, setSelectedCountryList] = useState(null)
    const [selectedState, setSelectedState] = useState(null)
    const [districList, setDistricList] = useState(null)
    const [imagePicker, setImagePicker] = useState({})


    console.log("imagePicker", imagePicker)
    const [formValues, setFormValues] = useState({
        fullname: '',
        username: '',
        email: '',
        contactnumber: '',
        dateofbirth: '',
        gender: '',
        marriedStatus: '',
        country: "",
        workExperience: "",
        occupation: "",
        companyName: "",
        linkdinUrl: "",
        twiterUrl: "",
        instagramUrl: ""

    });
    // console.log("formValues",dataByRole )

    const handleClose = () => setIsTrue(false);

    useEffect(() => {
        setFormValues({
            fullname: '',
            username: '',
            email: '',
            contactnumber: '',
            dateofbirth: '',
            gender: '',
            marriedStatus: '',
            country: "",
            workExperience: "",
            occupation: "",
            companyName: "",
            linkdinUrl: "",
            twiterUrl: "",
            instagramUrl: ""
        });

        if (id && /^[a-f\d]{24}$/i.test(id)) {
            getRoleDataByID(id);
        }
    }, [id]);

    useEffect(() => {
        if (dataByRole) {
            setFormValues({
                fullname: dataByRole.fullname || '',
                username: dataByRole.username || '',
                email: dataByRole.email || '',
                contactnumber: dataByRole.contactnumber || '',
                dateofbirth: dataByRole.dateofbirth || '',
                gender: dataByRole.gender || '',
                marriedStatus: dataByRole.marriedStatus || '',
                country: dataByRole.country || "",
                workExperience: dataByRole.workExperience || "",
                occupation: dataByRole.occupation || "",
                companyName: dataByRole.companyName || " ",
                linkdinUrl: dataByRole.linkdinUrl || "",
                twiterUrl: dataByRole.twiterUrl || "",
                instagramUrl: dataByRole.instagramUrl || ""
            });
        }
    }, [dataByRole]);

    const handlePermissionUpdate = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/update-role-info/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });
            const result = await response.json();
            setIsTrue(!isTrue);
            handleClose();
            alert('User Updated Successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const getRoleDataByID = async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin/get-role-data/${id}`;
            const fetchData = await fetch(url);
            const response = await fetchData.json();
            setDataByRole(response.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (field) => (e) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const marriedStatusOptions = [{ label: 'Married' }, { label: 'Unmarried' }];
    const genderOptions = [
        { label: 'Male' },
        { label: 'Female' },
        { label: 'Other' },
    ];

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

    const userProfilePictureHandler = async (event) => {
        event.preventDefault()

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}all/update/profile-picture-role/${id}`;
            const formData = new FormData()
            formData.append("image", imagePicker)
            const profileData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: formData
            })
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
            console.log(error)
        }
    }



    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 20,
                    py: 3,
                    flexDirection: 'column',
                    borderRadius: 2,
                }}
            >
                <div className="modal-update flex flex-col gap-2 w-full">
                    <Typography sx={{ width: '100%', fontSize: 23, mb: 2 }}>
                        Personal Information
                    </Typography>

                    <div className="w-full flex items-center gap-10">
                        <label htmlFor="open-img__">
                            <div className="profile-img h-20 w-20 rounded-full">
                                <img
                                    className="rounded-full h-full w-full object-cover"
                                    src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?uid=R167309508&ga=GA1.1.1036802377.1749109170&semt=ais_hybrid&w=740"
                                    alt="User"
                                />
                                <input type="file" onChange={(e) => setImagePicker(e.target.files[0])} hidden id="open-img__" />
                            </div>
                        </label>
                        <Button variant="outlined"
                            onClick={userProfilePictureHandler}
                        >
                            Change Picture
                        </Button>

                        <Button sx={{ color: 'red' }}>Remove Picture</Button>
                    </div>

                    <Divider sx={{ my: 2 }} />

                    <div className='p-5 bg-cyan-200/10 rounded-md'>
                        <div className="flex gap-2 w-full mb-3">
                            <label className="w-full">
                                <label className="text-sm text-slate-400">Full Name</label>

                                <TextField
                                    sx={{ width: '100%' }}
                                    id="fullname"
                                    size="small"
                                    value={formValues.fullname}
                                    onChange={handleChange('fullname')}
                                    variant="outlined"
                                />

                            </label>
                            <label className="w-full">
                                <label className="text-sm text-slate-400">Username</label>

                                <TextField
                                    sx={{ width: '100%' }}
                                    id="username"
                                    size="small"
                                    value={formValues.username}
                                    onChange={handleChange('username')}
                                    variant="outlined"

                                />
                            </label>

                            <label className="w-full">
                                <label className="text-sm text-slate-400">Email Address</label>

                                <TextField
                                    sx={{ width: '100%' }}
                                    id="email"
                                    size="small"
                                    value={formValues.email}
                                    onChange={handleChange('email')}
                                    variant="outlined"
                                />

                            </label>
                        </div>

                        <div className="flex gap-2 ">
                            <label className="w-full">
                                <label className="text-sm text-slate-400">Contact Number</label>

                                <TextField
                                    sx={{ width: '100%' }}
                                    id="contactnumber"
                                    size="small"
                                    value={formValues.contactnumber}
                                    onChange={handleChange('contactnumber')}
                                    variant="outlined"
                                />

                            </label>

                            <label className="w-full">
                                <label className="text-sm text-slate-400">Date Of Birth</label>

                                <TextField
                                    sx={{ width: '100%' }}
                                    id="dateofbirth"
                                    type="date"
                                    size="small"
                                    value={formValues.dateofbirth}
                                    onChange={handleChange('dateofbirth')}
                                    variant="outlined"
                                />

                            </label>

                            <label className="w-full">
                                <label className="text-sm text-slate-400">Gender</label>
                                <Autocomplete
                                    disablePortal
                                    options={genderOptions}
                                    value={
                                        genderOptions.find((opt) => opt.label === formValues.gender) ||
                                        null
                                    }
                                    onChange={(e, newValue) =>
                                        setFormValues((prev) => ({
                                            ...prev,
                                            gender: newValue?.label || '',
                                        }))
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                    size="small"
                                />
                            </label>

                            <label className="w-full">
                                <label className="text-sm text-slate-400">Married Status</label>
                                <Autocomplete
                                    disablePortal
                                    options={marriedStatusOptions}
                                    value={
                                        marriedStatusOptions.find(
                                            (opt) => opt.label === formValues.marriedStatus
                                        ) || null
                                    }
                                    onChange={(e, newValue) =>
                                        setFormValues((prev) => ({
                                            ...prev,
                                            marriedStatus: newValue?.label || '',
                                        }))
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                    size="small"
                                />
                            </label>
                        </div>
                    </div>

                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ width: '100%', fontSize: 20, mb: 1 }}>
                        Location & Address
                    </Typography>
                    <div className='flex  gap-3 w-full p-5 bg-cyan-200/10 rounded-md  items-center'>
                        <ul className='w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold '>Country</label>
                            <select onChange={(e) => countryOnchange(country_.find((c) => c.isoCode === e.target.value))} defaultValue={dataByRole?.country} className='border border-slate-400/40  p-2.5 rounded-sm  text-white w-full outline-cyan-400'>
                                <option>{dataByRole ? dataByRole?.country : "Select Country"}</option>

                                {
                                    country_.map((country_Data) => <option className='bg-black' key={country_Data.isoCode} value={country_Data.isoCode}>{country_Data.name}</option>)
                                }

                            </select>

                        </ul>

                        <ul className=' w-full flex flex-col '>
                            <label className='text-sm font-sans text-slate-400 font-semibold mb-0.5'>State</label>
                            <select disabled={!seletedCountryList} onChange={(e) => stateOnchangeHandler(state_.find((s) => s.isoCode === e.target.value))} className='border border-slate-400/40  rounded-sm p-2.5   text-white overflow-hidden outline-cyan-400'>
                                <option className=' overflow-hidden w-[10px]' >{dataByRole ? dataByRole?.state : "Select State"}</option>

                                {
                                    state_.map((state_Data) => <option className=' overflow-hidden bg-black' key={state_Data.isoCode} value={state_Data.isoCode}>{state_Data.name}</option>)
                                }

                            </select>
                            {/* <TextField size='small' inputRef={state} defaultValue={data?.state} sx={{ width: "100%" }} ></TextField> */}
                        </ul>

                        <ul className='flex flex-col w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>City</label>
                            <select
                                onChange={(e) => setDistricList(e.target.value)}
                                //  onChange={(e) => stateOnchangeHandler(state_.find((s) => c.isoCode === e.target.value))}
                                className='border border-slate-400/40  rounded-sm p-2.5   text-white  '>
                                <option className=''>{dataByRole ? dataByRole?.city : "Select City"}</option>

                                {
                                    distric_.map((dis_Data) => <option className='bg-black' key={dis_Data.isoCode} value={dis_Data.isoCode}>{dis_Data.name}</option>)

                                }

                            </select>
                        </ul>
                        <ul className='flex flex-col w-full'>
                            <label className='text-sm font-sans text-slate-400 font-semibold'>ZipCode</label>
                            <input defaultValue={dataByRole?.zipCode} type='number' className='border border-slate-400/40  rounded-sm p-2  text-white'></input>

                        </ul>
                    </div>
                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ width: '100%', fontSize: 20, }}>
                        Professional Info
                    </Typography>

                    <div className='flex w-full gap-2  p-5 bg-cyan-200/10 rounded-md' >
                        <label className="w-full">
                            <label className="text-sm text-slate-400">Occupation</label>

                            <TextField
                                sx={{ width: '100%' }}
                                id="occupation"
                                type="text"
                                size="small"
                                value={formValues.occupation}
                                onChange={handleChange('occupation')}
                                variant="outlined"
                            />

                        </label>
                        <label className="w-full ">
                            <label className="text-sm text-slate-400">Company Name</label>

                            <TextField
                                sx={{ width: '100%' }}
                                id="companyName"
                                type="text"
                                size="small"
                                value={formValues.companyName}
                                onChange={handleChange('companyName')}
                                variant="outlined"
                            />

                        </label>

                        <label className="w-full">
                            <label className="text-sm text-slate-400">Work Experience</label>

                            <TextField
                                sx={{ width: '100%' }}
                                id="workExperience"
                                type="text"
                                size="small"
                                value={formValues.workExperience}
                                onChange={handleChange('workExperience')}
                                variant="outlined"
                            />

                        </label>

                    </div>

                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ width: '100%', fontSize: 20, }}>
                        Social Links
                    </Typography>
                    <div className='social-account  grid grid-cols-3 gap-2'>
                        <div className='bg-cyan-200/10 rounded-md'>

                            <Box sx={{
                                padding: 2,
                                // height: "120px",
                                borderRadius: "5px",
                                display: 'flex',
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <span className='icone-link ' >
                                    <LinkedInIcon fontSize='large' sx={{ color: "#0065F8", width: 40, height: 40 }} />
                                </span>

                                <label className='flex flex-col'>
                                    <label className="text-sm text-slate-400">URL</label>
                                    <TextField
                                        id="outlined-basic"
                                        size='small'
                                        variant="outlined"
                                        value={formValues.linkdinUrl}
                                        onChange={handleChange('linkdinUrl')}
                                    />
                                </label>

                            </Box>
                        </div>
                        <div className='bg-cyan-200/10 rounded-md'>

                            <Box sx={{
                                padding: 2,

                                borderRadius: "5px",
                                display: 'flex',
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <span className='icone-link ' >
                                    <TwitterIcon fontSize='large' sx={{ color: "#afb2b7", width: 40, height: 40 }} />
                                </span>

                                <label className='flex flex-col'>
                                    <label className="text-sm text-slate-400">URL</label>
                                    <TextField id="outlined-basic" size='small' variant="outlined"
                                        value={formValues.twiterUrl}
                                        onChange={handleChange('twiterUrl')}
                                    />
                                </label>

                            </Box>
                        </div>
                        <div className='bg-cyan-200/10 rounded-md'>

                            <Box sx={{
                                padding: 2,
                                borderRadius: "5px",
                                display: 'flex',
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <span className='icone-link ' >

                                    <Icon style={{ width: 35, height: 35 }} icon={"skill-icons:instagram"}></Icon>

                                </span>


                                <label className='flex flex-col'>
                                    <label className="text-sm text-slate-400">URL</label>
                                    <TextField id="outlined-basic" size='small' variant="outlined"
                                        value={formValues.instagramUrl}
                                        onChange={handleChange('instagramUrl')}
                                    />
                                </label>

                            </Box>
                        </div>

                    </div>


                    <div className="w-full flex justify-end">
                        <Button
                            onClick={handlePermissionUpdate}
                            variant="contained"
                            sx={{ mt: 2, width: '200px' }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Box>
        </Box >
    );
};

export default RoleUpdateModal;
