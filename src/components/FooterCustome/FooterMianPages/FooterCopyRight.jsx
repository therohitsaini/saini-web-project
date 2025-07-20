import React, { useState, useEffect, useMemo } from 'react'
import {
    TextField,
    Button,
    Divider,
    IconButton,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    Autocomplete,
    InputAdornment,
    Checkbox
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { Fragment } from 'react'
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft'
import { showErrorToast, showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable'
import { ToastContainer } from 'react-toastify'

function FooterCopyRight({ showSuccessToast, showErrorToast }) {
    const [copyrightForm, setCopyrightForm] = useState({
        copyrightText: '',
        poweredByText: ''
    })

    const [paymentIcons, setPaymentIcons] = useState([
        { name: '', icon: '', url: '', isActive: true },

    ])

    const [loading, setLoading] = useState(false)
    const [id, setId] = useState()
    const [inputValues, setInputValues] = useState({})
    const [selectedIcons, setSelectedIcons] = useState({})

    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setId(userID)
        if (userID) {
            getFooterData(userID)
        }
    }, [])

    // Initialize selected icons and input values for existing icons
    useEffect(() => {
        const initialSelectedIcons = {}
        const initialInputValues = {}

        paymentIcons.forEach(icon => {
            if (icon.icon) {
                const foundIcon = allFaMdIconsList.find(i => i.label === icon.icon)
                if (foundIcon) {
                    initialSelectedIcons[icon.id] = foundIcon
                    initialInputValues[icon.id] = icon.icon
                }
            }
        })

        setSelectedIcons(initialSelectedIcons)
        setInputValues(initialInputValues)
    }, [paymentIcons])

    const getFooterData = async (userId) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-get-footer-data/${userId}`
            const response = await fetch(url, { method: "GET" })
            const json = await response.json()

            if (response.ok && json.data) {
                const footerData = json.data.find(item => item.section === 'copyright')
                if (footerData) {
                    setCopyrightForm({
                        copyrightText: footerData.copyrightText || '',
                        poweredByText: footerData.poweredByText || ''
                    })
                    if (footerData.paymentIcons) {
                        setPaymentIcons(footerData.paymentIcons)
                    }
                    return footerData // Return the footer data for delete operations
                }
            }
            return null
        } catch (error) {
            console.error("Error fetching footer data:", error)
            return null
        }
    }

    const handleCopyrightChange = (e) => {
        const { name, value } = e.target
        setCopyrightForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addPaymentIcon = () => {
        const newIcon = {
            id: Date.now(),
            name: ``,
            icon: '',
            url: '',
            isActive: true
        }
        setPaymentIcons(prev => [...prev, newIcon])
    }

    // Simple delete icon by ID function
    const deleteIconById = async (iconId) => {
        console.log('deleteIconById called with iconId:', iconId)
        console.log('Current user ID:', id)

        try {
            // Direct API call to delete icon by ID
            const deleteUrl = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-delete-icon-by-id/${id}/${iconId}`
            console.log('Making DELETE request to:', deleteUrl)

            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            const result = await response.json()

            if (response.ok) {
                showSuccessToast(result.message || `Icon ${iconId} deleted successfully!`)
                // Remove from local state
                setPaymentIcons(prev => prev.filter(icon => icon.id !== iconId))
                // Clean up related state
                setSelectedIcons(prev => {
                    const newState = { ...prev }
                    delete newState[iconId]
                    return newState
                })
                setInputValues(prev => {
                    const newState = { ...prev }
                    delete newState[iconId]
                    return newState
                })
            } else {
                showErrorToast(result.message || `Failed to delete icon ${iconId}`)
            }
        } catch (error) {
            console.error(`Error deleting icon ${iconId}:`, error)
            showErrorToast(`An error occurred while deleting icon ${iconId}`)
            // Fallback: remove from local state
            setPaymentIcons(prev => prev.filter(icon => icon.id !== iconId))
            setSelectedIcons(prev => {
                const newState = { ...prev }
                delete newState[iconId]
                return newState
            })
            setInputValues(prev => {
                const newState = { ...prev }
                delete newState[iconId]
                return newState
            })
        }
    }

    // Keep the original function for backward compatibility
    const removePaymentIcon = async (iconId) => {
        console.log('removePaymentIcon called with iconId:', iconId)

        // For testing - you can uncomment this to test without API
        // alert(`Delete icon with ID: ${iconId}`)
        // setPaymentIcons(prev => prev.filter(icon => icon.id !== iconId))
        // return

        await deleteIconById(iconId)
    }

    const updatePaymentIcon = (iconId, field, value) => {
        setPaymentIcons(prev => prev.map(icon =>
            icon.id === iconId ? { ...icon, [field]: value } : icon
        ))
    }

    const handleIconChange = (iconId, newValue) => {
        setSelectedIcons(prev => ({
            ...prev,
            [iconId]: newValue
        }))
        updatePaymentIcon(iconId, 'icon', newValue ? newValue.label : '')
    }

    const handleInputChange = (iconId, newInputValue) => {
        setInputValues(prev => ({
            ...prev,
            [iconId]: newInputValue
        }))
    }

    const getFilteredIcons = (iconId) => {
        const inputValue = inputValues[iconId] || ''
        const term = inputValue.trim().toLowerCase()
        if (!term) return allFaMdIconsList.slice(0, 50)
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100)
    }

    const deleteEntireFooter = async () => {
        if (!window.confirm("Are you sure you want to delete the entire footer section? This action cannot be undone.")) {
            return
        }

        try {
            const footerData = await getFooterData(id)
            if (footerData && footerData._id) {
                const deleteUrl = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-delete-footer/${id}/${footerData._id}`
                const response = await fetch(deleteUrl, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })

                const result = await response.json()

                if (response.ok) {
                    showErrorToast(result.message || "Footer section deleted successfully!")
                    // Reset form to default state
                    setCopyrightForm({
                        copyrightText: '',
                        poweredByText: ''
                    })
                    setPaymentIcons([{ name: '', icon: '', url: '', isActive: true }])
                    setSelectedIcons({})
                    setInputValues({})
                } else {
                    showErrorToast(result.message || "Failed to delete footer section")
                }
            } else {
                showErrorToast("No footer data found to delete")
            }
        } catch (error) {
            console.error("Error deleting footer section:", error)
            showErrorToast("An error occurred while deleting footer section")
        }
    }

    const deleteMultipleIcons = async (iconIds) => {
        if (!window.confirm(`Are you sure you want to delete ${iconIds.length} payment icon(s)?`)) {
            return
        }

        try {
            const footerData = await getFooterData(id)
            if (footerData && footerData._id) {
                const deleteUrl = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-delete-footer-icons/${id}/${footerData._id}`
                const response = await fetch(deleteUrl, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ iconIds })
                })

                const result = await response.json()

                if (response.ok) {
                    showSuccessToast(result.message || `${iconIds.length} payment icon(s) deleted successfully!`)
                    // Remove deleted icons from local state
                    setPaymentIcons(prev => prev.filter(icon => !iconIds.includes(icon.id)))
                    // Clean up state for deleted icons
                    setSelectedIcons(prev => {
                        const newState = { ...prev }
                        iconIds.forEach(id => delete newState[id])
                        return newState
                    })
                    setInputValues(prev => {
                        const newState = { ...prev }
                        iconIds.forEach(id => delete newState[id])
                        return newState
                    })
                } else {
                    showErrorToast(result.message || "Failed to delete payment icons")
                }
            } else {
                showErrorToast("No footer data found")
            }
        } catch (error) {
            console.error("Error deleting payment icons:", error)
            showErrorToast("An error occurred while deleting payment icons")
        }
    }

    const submitHandler = async () => {
        setLoading(true)
        try {
            const formData = {
                section: 'copyright',
                copyrightText: copyrightForm.copyrightText,
                poweredByText: copyrightForm.poweredByText,
                paymentIcons: paymentIcons,
                userId: id
            }

            const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-create-update-footer/${id}`

            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (response.ok) {
                showSuccessToast(result.message || "Footer copyright updated successfully!")
            } else {
                showErrorToast(result.message || "Failed to update footer copyright")
            }
        } catch (err) {
            console.error(err)
            showErrorToast("An error occurred while updating footer copyright")
        } finally {
            setLoading(false)
        }
    }

    // Helper function to get icon component by name
    const getIconComponent = (iconName) => {
        const iconData = allFaMdIconsList.find(icon => icon.label === iconName)
        return iconData ? iconData.Icon : null
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className='form-container w-full h-full flex flex-col items-center justify-center gap-6 p-4'>
                <form className='form-main border border-slate-500/20 rounded-md w-full max-w-4xl flex flex-col gap-4 p-6 sticky top-0'>
                    <div className='w-full'>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ">
                            Footer Copyright Settings
                        </h1>
                        <Divider sx={{ my: 1 }} />
                    </div>

                    {/* Copyright Text Section */}
                    <div className='flex flex-col gap-4'>
                        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                            Copyright Information
                        </Typography>

                        <TextField
                            label="Copyright Text"
                            size="small"
                            variant="outlined"
                            name="copyrightText"
                            value={copyrightForm.copyrightText}
                            onChange={handleCopyrightChange}
                            multiline
                            rows={2}
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                                '& label': {
                                    color: 'gray',
                                },
                                '& label': {
                                    color: 'gray',
                                    fontSize: '12px',
                                },
                                '& label.Mui-focused': {
                                    color: 'white',
                                }
                            }}
                        />

                        <TextField
                            label="Powered By Text"
                            size="small"
                            variant="outlined"
                            name="poweredByText"
                            value={copyrightForm.poweredByText}
                            onChange={handleCopyrightChange}
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                                '& label': {
                                    color: 'gray',
                                },
                                '& label.Mui-focused': {
                                    color: 'white',
                                }
                            }}
                        />
                    </div>

                    {/* Payment Icons Section */}
                    <div className='space-y-4'>
                        <div className='flex justify-between items-center'>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                Payment Method Icons
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addPaymentIcon}
                                sx={{
                                    color: 'white',
                                    borderColor: 'blue',
                                    '&:hover': {
                                        borderColor: 'lightblue',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                    },
                                    textTransform: 'none',
                                }}
                            >
                                ADD ICON
                            </Button>
                        </div>

                        <div className='space-y-3'>
                            {paymentIcons.map((icon, index) => {
                                const IconComponent = getIconComponent(icon.icon)
                                const selectedIcon = selectedIcons[icon.id] || null
                                const inputValue = inputValues[icon.id] || ''

                                return (
                                    <div key={icon.id} className='border border-slate-500/20 rounded-md p-4'>
                                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full'>

                                            <TextField
                                                label={`Title`}
                                                size="small"
                                                variant="outlined"
                                                value={icon.name}
                                                onChange={(e) => updatePaymentIcon(icon.id, 'name', e.target.value)}

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
                                                    '& label': {
                                                        color: 'gray',
                                                        fontSize: '12px',
                                                    },
                                                    '& label.Mui-focused': {
                                                        color: 'white',
                                                    },
                                                    width: '100%',
                                                }}
                                            />

                                            {/* Icon Selection */}
                                            <Autocomplete
                                                size="small"
                                                options={getFilteredIcons(icon.id)}
                                                value={selectedIcon}
                                                onChange={(e, newValue) => handleIconChange(icon.id, newValue)}
                                                inputValue={inputValue}
                                                onInputChange={(e, newInputValue) => handleInputChange(icon.id, newInputValue)}
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
                                                            '& label': {
                                                                color: 'gray',
                                                                fontSize: '12px',
                                                            },
                                                            '& label.Mui-focused': {
                                                                color: 'white',
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />

                                            {/* URL Field */}
                                            <TextField
                                                label={`URL ${index + 1}`}
                                                size="small"
                                                variant="outlined"
                                                value={icon.url || ''}
                                                onChange={(e) => updatePaymentIcon(icon.id, 'url', e.target.value)}
                                                placeholder="https://example.com"
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
                                                    '& label': {
                                                        color: 'gray',
                                                        fontSize: '12px',
                                                    },
                                                    '& label.Mui-focused': {
                                                        color: 'white',
                                                    }
                                                }}
                                            />

                                            {/* Delete Button */}
                                            {/* <div className='flex justify-end'>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        console.log('Delete button clicked for icon ID:', icon.id)
                                                        removePaymentIcon(icon.id)
                                                    }}
                                                    sx={{ 
                                                        color: 'red',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </div> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Preview Section */}

                    <div className="flex items-center gap-2  sticky top-0 w-full ">
                        <Checkbox
                            name='showOnWebsite'
                            defaultChecked
                            sx={{ m: 0, p: 0 }}
                            size="small"
                        />
                        <p className="text-[14px] text-slate-500 font-sans">
                            If you want to show this on the website
                        </p>
                    </div>
                    {/* Action Buttons */}
                    <div className='button w-full flex justify-end gap-2 items-center'>
                        <div className='flex gap-2'>
                            <Button
                                onClick={deleteEntireFooter}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    minWidth: "150px",
                                    backgroundColor: "#dc2626",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "#b91c1c",
                                    }
                                }}
                            >
                                DELETE
                            </Button>
                        </div>

                        <div className='flex gap-2'>
                            <Button
                                onClick={submitHandler}
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    textTransform: "none",
                                    minWidth: "200px",
                                    backgroundImage: "linear-gradient(to right, #1e3a8a, #9333ea)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundImage: "linear-gradient(to right, #1e40af, #7c3aed)",
                                    },
                                    "&:disabled": {
                                        backgroundImage: "linear-gradient(to right, #6b7280, #9ca3af)",
                                    }
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={23} sx={{ color: "#ffffff" }} />
                                ) : (
                                    "Update Footer Copyright"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default FooterCopyRight
