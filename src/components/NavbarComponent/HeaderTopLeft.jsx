
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState, useEffect, useMemo, Fragment } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';


// for icone 
export const allFaMdIconsMap = {
    ...MdIcons,
    ...FaIcons,
};


export const allFaMdIconsList = Object.entries(allFaMdIconsMap).map(([name, Icon]) => ({
    label: name,
    Icon,
}));

// end
function HeaderTopLeft({ formData, setFormData, submitHandler }) {
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
        if (!term) return allFaMdIconsList.slice(0, 50); // default first 50
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
            <div className="header-left-form-main h-[530px] flex items-center">
                <form className="form flex justify-center items-center h-[420px] w-full">
                    <div className="border border-slate-400/20 rounded-md p-5 flex flex-col gap-4 w-[80%]">
                        <Typography component="span">Top Bar Email Section</Typography>
                        <Divider />

                        <TextField
                            label="Title"
                            size="small"
                            variant="outlined"
                            name="item_Title"
                            value={formData?.item_Title}
                            onChange={onChangeHandler}
                        />

                        <TextField
                            label="Contact"
                            size="small"
                            variant="outlined"
                            name="item_ContactId"
                            value={formData?.item_ContactId}
                            onChange={onChangeHandler}
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
                            />
                            <p className="text-[14px] text-slate-500">
                                If you want to show this on the website
                            </p>
                        </div>

                        <Button
                            sx={{ textTransform: 'none' }}
                            onClick={() => submitHandler('HeaderTopLeftBar')}
                            variant="contained"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default HeaderTopLeft;
