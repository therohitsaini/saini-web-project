import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    Grid,
    Avatar,
    Autocomplete,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft';



const TeamMemberSubmitForm = ({ setTeamMemberForm, teamMemberForm, submitTeamMember, loader, setTeamMode }) => {


    const [selectedIcons, setSelectedIcons] = useState([null, null, null, null]);
    const [inputValues, setInputValues] = useState(['', '', '', '']);

  
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTeamMemberForm((prev) => ({
                ...prev,
                image: file, // <-- this is the key
            }));
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setTeamMemberForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredIcons = (input = '') => {
        const term = input.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    };

    const onIconChange = (index, newIcon) => {
        const updatedIcons = [...teamMemberForm.item_Icone];
        updatedIcons[index] = newIcon?.label || '';

        const updatedSelectedIcons = [...selectedIcons];
        updatedSelectedIcons[index] = newIcon;

        setSelectedIcons(updatedSelectedIcons);
        setTeamMemberForm((prev) => ({
            ...prev,
            item_Icone: updatedIcons,
        }));
    };

    const onIconInputChange = (index, value) => {
        const updatedInputs = [...inputValues];
        updatedInputs[index] = value;
        setInputValues(updatedInputs);
    };


    return (
        <div className='main h-[100%] w-full flex items-center justify-center flex-col gap-10'>
            <div className='w-full px-5 '>
                <Button
                    onClick={() => setTeamMode("Table")}
                    variant='outlined'
                    sx={{
                        px: 5
                    }}
                >Back</Button>
            </div>
            <Box

                // onSubmit={handleSubmit}
                sx={{ mx: 'auto', p: 4, border: '1px solid #393636', borderRadius: 2 }}
            >
                <Typography variant="h5" >
                    Custom Form
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={teamMemberForm.image ? URL.createObjectURL(teamMemberForm.image) : ''} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                        Upload Image
                        <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                    </Button>
                </Box>

                <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            sx={{ width: 300 }}
                            size="small"
                            name="name"
                            value={teamMemberForm.name}
                            onChange={onChangeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Role"
                            sx={{ width: 300 }}
                            size="small"
                            name="role"
                            value={teamMemberForm.role}
                            onChange={onChangeHandler}
                        />
                    </Grid>
                </Grid>

                {[0, 1, 2, 3].map((i) => (
                    <Grid container spacing={2} mb={2} key={i}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size="small"
                                options={filteredIcons(inputValues[i])}
                                value={selectedIcons[i]}
                                onChange={(e, newValue) => onIconChange(i, newValue)}
                                inputValue={inputValues[i]}
                                onInputChange={(e, newInputValue) => onIconInputChange(i, newInputValue)}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value?.label}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <option.Icon size={18} />
                                        {option.label}
                                    </Box>
                                )}
                                renderInput={(params) => {
                                    const SelectedIcon = selectedIcons[i]?.Icon;
                                    return (
                                        <TextField
                                            {...params}
                                            label={`Search Icon ${i + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: SelectedIcon ? (
                                                    <InputAdornment position="start" sx={{ mr: 1 }}>
                                                        <SelectedIcon size={18} />
                                                    </InputAdornment>
                                                ) : null,
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
                                                width: 300
                                            }}
                                        />
                                    );
                                }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={`URL ${i + 1}`}
                                sx={{ width: 300 }}
                                size="small"
                                value={teamMemberForm.urls[i]}
                                onChange={(e) => {
                                    const updatedUrls = [...teamMemberForm.urls];
                                    updatedUrls[i] = e.target.value;
                                    setTeamMemberForm((prev) => ({
                                        ...prev,
                                        urls: updatedUrls,
                                    }));
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}

                <Button
                    onClick={submitTeamMember}
                    sx={{
                        backgroundColor: loader ? "#5fb1c866" : "#1193d5ff",
                        "&:hover": {
                            backgroundColor: loader ? "transparent" : "#0d7cb6",
                        },
                        boxShadow: "none",
                    }}


                    variant="contained" fullWidth>


                    {loader ?
                        (
                            <CircularProgress size={23} />
                        ) : (
                            "Submit"
                        )
                    }

                </Button>
            </Box>
        </div>
    );
};

export default TeamMemberSubmitForm;
