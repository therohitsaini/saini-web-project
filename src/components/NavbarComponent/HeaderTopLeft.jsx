import {
    Autocomplete,
    Box,
    Checkbox,
    Divider,
    InputAdornment,
    TextField,
} from '@mui/material';
import React, { useState, useEffect, useMemo, Fragment } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import GradientButton from '../ReuseComponent/ReuseComponent';

// Combine icon sets
export const allFaMdIconsMap = {
    ...MdIcons,
    ...FaIcons,
};

export const allFaMdIconsList = Object.entries(allFaMdIconsMap).map(([name, Icon]) => ({
    label: name,
    Icon,
}));

function HeaderTopLeft({ formData, setFormData, submitHandler, setLoading, loading }) {
    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIconsList.find((i) => i.label === formData?.item_Icone) || null
    );
    const [inputValue, setInputValue] = useState('');

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredIcons = useMemo(() => {
        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50);
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100);
    }, [inputValue]);

    useEffect(() => {
        if (formData?.item_Icone) {
            const foundIcon = allFaMdIconsList.find((i) => i.label === formData?.item_Icone);
            if (foundIcon) setSelectedIcon(foundIcon);
        }
    }, [formData?.item_Icone]);

    return (
        <Fragment>
            <div className="header-left-form-main relative w-full min-h-[530px] flex items-center justify-center ">
                {/* Optional Background Layer */}
                <div className="
                absolute
                //  inset-0 opacity-30 bg-[url('/bg.jpg')] bg-cover bg-center blur-sm z-0
                " />

                {/* Content Form Card */}
                <form className="form relative z-10 flex justify-center items-center h-[420px] w-full ">
                    <div className="border border-slate-400/20 rounded-md p-5 flex flex-col gap-4 w-[80%] 
                    
                     ">

                        <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold">
                            Top Bar Email Section
                        </div>

                        <Divider sx={{ mb: 1 }} />

                        <TextField
                            label="Title"
                            size="small"
                            variant="outlined"
                            name="item_Title"
                            value={formData?.item_Title}
                            onChange={onChangeHandler}
                            sx={textFieldStyles}
                        />

                        <TextField
                            label="Contact"
                            size="small"
                            variant="outlined"
                            name="item_ContactId"
                            value={formData?.item_ContactId}
                            onChange={onChangeHandler}
                            sx={textFieldStyles}
                        />

                        <Autocomplete
                            size="small"
                            options={filteredIcons}
                            value={selectedIcon}
                            onChange={(e, newValue) => {
                                setSelectedIcon(newValue);
                                setFormData((prev) => ({
                                    ...prev,
                                    item_Icone: newValue ? newValue.label : '',
                                }));
                            }}
                            inputValue={inputValue}
                            onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.label === value?.label}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <option.Icon size={18} />
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Icon"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: selectedIcon?.Icon && (
                                            <InputAdornment position="start" sx={{ mr: 1 }}>
                                                <selectedIcon.Icon size={18} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={textFieldStyles}
                                />
                            )}
                        />

                        <TextField
                            label="URL"
                            size="small"
                            variant="outlined"
                            name="item_IconeUrl"
                            value={formData?.item_IconeUrl}
                            onChange={onChangeHandler}
                            sx={textFieldStyles}
                        />

                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={formData?.item_ShowOnWebsite || false}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        item_ShowOnWebsite: e.target.checked,
                                    }))
                                }
                                sx={{ m: 0, p: 0 }}
                                size="small"
                                color="default"
                            />
                            <p className="text-[14px] text-slate-300">
                                If you want to show this on the website
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <GradientButton
                                loading={loading}
                                onClick={() => submitHandler('HeaderTopLeftBar')}
                            >
                                Save Changes
                            </GradientButton>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default HeaderTopLeft;

// Styling for all MUI TextFields
const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        fontSize: '12px',
        '& input': {
            fontSize: '14px',
            color: 'white',
        },
        '& fieldset': {
            borderColor: 'gray',
        },
        '&:hover fieldset': {
            borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue',
        },
    },
    '& label': {
        color: 'gray',
        fontSize: '14px',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
};
