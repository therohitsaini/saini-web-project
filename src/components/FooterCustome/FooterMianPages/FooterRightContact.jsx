import React, { useState, useEffect, useMemo } from 'react'
import { Autocomplete, Box, Divider, InputAdornment, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GradientButton from '../../ReuseComponent/ReuseComponent';

function FooterRightContact({ userID, showSnackbar, showError }) {
   const [loading, setLoading] = useState(false)
   const [contactId, setContactId] = useState(null)
   const [successMessage, setSuccessMessage] = useState('')
   const [showSuccess, setShowSuccess] = useState(false)

   // Form state
   const [formData, setFormData] = useState({
      location: {
         icon: '',
         location: '',
         address: ''
      },
      call: {
         icon: '',
         call: '',
         contactNumber: ''
      },
      email: {
         icon: '',
         email: '',
         emailId: ''
      }
   })

   // Icon selection states
   const [locationIcon, setLocationIcon] = useState(null)
   const [callIcon, setCallIcon] = useState(null)
   const [emailIcon, setEmailIcon] = useState(null)

   // Input values for icon search
   const [locationInput, setLocationInput] = useState('')
   const [callInput, setCallInput] = useState('')
   const [emailInput, setEmailInput] = useState('')

   // Load existing data on component mount
   useEffect(() => {
      if (userID) {
         loadFooterRightContactData()
      }
   }, [userID])

   // API Functions
   const loadFooterRightContactData = async () => {
      if (!userID) return

      setLoading(true)
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-right-contact/get?userId=${userID}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'user-id': userID
               }
            }
         )
         const data = await response.json()
         console.log('Footer right contact data loaded:', data)

         if (data.success && data.data) {
            const contactData = data.data
            setContactId(contactData._id)

            // Set form data
            setFormData({
               location: {
                  icon: contactData.location?.icon || '',
                  location: contactData.location?.location || '',
                  address: contactData.location?.address || ''
               },
               call: {
                  icon: contactData.call?.icon || '',
                  call: contactData.call?.call || '',
                  contactNumber: contactData.call?.contactNumber || ''
               },
               email: {
                  icon: contactData.email?.icon || '',
                  email: contactData.email?.email || '',
                  emailId: contactData.email?.emailId || ''
               }
            })

            // Set selected icons
            setLocationIcon(allFaMdIconsList.find(icon => icon.label === contactData.location?.icon) || null)
            setCallIcon(allFaMdIconsList.find(icon => icon.label === contactData.call?.icon) || null)
            setEmailIcon(allFaMdIconsList.find(icon => icon.label === contactData.email?.icon) || null)
         }
      } catch (error) {
         console.error('Error loading footer right contact data:', error)
      } finally {
         setLoading(false)
      }
   }

   const saveFooterRightContactData = async (isUpdate = false) => {
      if (!userID) {
         alert('User ID is required!')
         return
      }

      setLoading(true)
      try {
         const payload = {
            location: {
               icon: formData.location.icon,
               location: formData.location.location,
               address: formData.location.address
            },
            call: {
               icon: formData.call.icon,
               call: formData.call.call,
               contactNumber: formData.call.contactNumber
            },
            email: {
               icon: formData.email.icon,
               email: formData.email.email,
               emailId: formData.email.emailId
            },
            userId: userID
         }

         const url = isUpdate
            ? `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-right-contact/update/${contactId}`
            : `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-right-contact/post`

         const method = isUpdate ? 'PUT' : 'POST'

         const response = await fetch(url, {
            method,
            headers: {
               'Content-Type': 'application/json',
               'user-id': userID
            },
            body: JSON.stringify(payload)
         })

         const data = await response.json()
         console.log('Save response:', data)

         if (response.ok) {
            const message = isUpdate ? 'Contact information updated successfully! 🎉' : 'Contact information created successfully! 🎉'
            setSuccessMessage(message)
            setShowSuccess(true)

            if (!isUpdate && data.data) {
               setContactId(data.data._id)
            }
            // Reload data to show updated values
            await loadFooterRightContactData()
         } else {
            alert(`Error: ${data.message || 'Something went wrong'}`)
         }
      } catch (error) {
         console.error('Error saving footer right contact:', error)
         alert('Error saving footer right contact')
      } finally {
         setLoading(false)
      }
   }

   const deleteFooterRightContact = async () => {
      if (!contactId || !userID) {
         alert('No contact data to delete!')
         return
      }

      const confirmDelete = window.confirm('Are you sure you want to delete this footer right contact?')
      if (!confirmDelete) return

      setLoading(true)
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-right-contact/delete/${contactId}`,
            {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'user-id': userID
               },
               body: JSON.stringify({ userId: userID })
            }
         )

         const data = await response.json()
         console.log('Delete response:', data)

         if (response.ok) {
            setSuccessMessage('Contact information deleted successfully! 🗑️')
            setShowSuccess(true)

            setContactId(null)
            setFormData({
               location: { icon: '', location: '', address: '' },
               call: { icon: '', call: '', contactNumber: '' },
               email: { icon: '', email: '', emailId: '' }
            })
            setLocationIcon(null)
            setCallIcon(null)
            setEmailIcon(null)
         } else {
            showError(`Error: ${data.message || 'Something went wrong'}`)
         }
      } catch (error) {
         console.error('Error deleting footer right contact:', error)
         alert('Error deleting footer right contact')
      } finally {
         setLoading(false)
      }
   }


   const handleInputChange = (section, field, value) => {
      setFormData(prev => ({
         ...prev,
         [section]: {
            ...prev[section],
            [field]: value
         }
      }))
   }

   const handleIconChange = (section, newValue) => {
      const iconLabel = newValue ? newValue.label : ''

      setFormData(prev => ({
         ...prev,
         [section]: {
            ...prev[section],
            icon: iconLabel
         }
      }))


      switch (section) {
         case 'location':
            setLocationIcon(newValue)
            break
         case 'call':
            setCallIcon(newValue)
            break
         case 'email':
            setEmailIcon(newValue)
            break
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      await saveFooterRightContactData(contactId ? true : false)
   }

   // Filtered icons for each section
   const filteredLocationIcons = useMemo(() => {
      const term = locationInput.trim().toLowerCase()
      if (!term) return allFaMdIconsList.slice(0, 50)
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100)
   }, [locationInput])

   const filteredCallIcons = useMemo(() => {
      const term = callInput.trim().toLowerCase()
      if (!term) return allFaMdIconsList.slice(0, 50)
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100)
   }, [callInput])

   const filteredEmailIcons = useMemo(() => {
      const term = emailInput.trim().toLowerCase()
      if (!term) return allFaMdIconsList.slice(0, 50)
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100)
   }, [emailInput])



   return (
      <div className='footer-right-contact w-full h-[100%] flex flex-col items-center justify-center'>
         <form onSubmit={handleSubmit} className='w-[700px] h-full flex flex-col border border-slate-500/20 p-5 rounded-md'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
               Footer  Contact
            </h1>
            <Divider sx={{ width: '100%', mb: 2 }} />

            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 1 }}>

                  {/* Location Section */}
                  <div className='flex items-center gap-2 w-full'>
                     <Autocomplete
                        fullWidth={true}
                        options={filteredLocationIcons}
                        value={locationIcon}
                        onChange={(e, newValue) => handleIconChange('location', newValue)}
                        onInputChange={(e, newValue) => setLocationInput(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        size='small'
                        renderOption={(props, option) => (
                           <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <option.Icon />
                              {option.label}
                           </Box>
                        )}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label="Location Icon"
                              variant="outlined"
                              fullWidth
                              InputProps={{
                                 ...params.InputProps,
                                 startAdornment: locationIcon?.Icon && (
                                    <InputAdornment position="start" sx={{ mr: 1 }}>
                                       <locationIcon.Icon />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        )}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={formData.location.location}
                        onChange={(e) => handleInputChange('location', 'location', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Address"
                        variant="outlined"
                        fullWidth
                        value={formData.location.address}
                        onChange={(e) => handleInputChange('location', 'address', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                  </div>

                  {/* Call Section */}
                  <div className='flex items-center gap-2 w-full'>
                     <Autocomplete
                        fullWidth={true}
                        options={filteredCallIcons}
                        value={callIcon}
                        onChange={(e, newValue) => handleIconChange('call', newValue)}
                        onInputChange={(e, newValue) => setCallInput(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        size='small'
                        renderOption={(props, option) => (
                           <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <option.Icon />
                              {option.label}
                           </Box>
                        )}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label="Call Icon"
                              variant="outlined"
                              fullWidth
                              InputProps={{
                                 ...params.InputProps,
                                 startAdornment: callIcon?.Icon && (
                                    <InputAdornment position="start" sx={{ mr: 1 }}>
                                       <callIcon.Icon />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        )}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Call"
                        variant="outlined"
                        fullWidth
                        value={formData.call.call}
                        onChange={(e) => handleInputChange('call', 'call', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Contact Number"
                        variant="outlined"
                        fullWidth
                        value={formData.call.contactNumber}
                        onChange={(e) => handleInputChange('call', 'contactNumber', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                  </div>

                  {/* Email Section */}
                  <div className='flex items-center gap-2 w-full'>
                     <Autocomplete
                        fullWidth={true}
                        options={filteredEmailIcons}
                        value={emailIcon}
                        onChange={(e, newValue) => handleIconChange('email', newValue)}
                        onInputChange={(e, newValue) => setEmailInput(newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value?.label}
                        size='small'
                        renderOption={(props, option) => (
                           <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <option.Icon />
                              {option.label}
                           </Box>
                        )}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label="Email Icon"
                              variant="outlined"
                              fullWidth
                              InputProps={{
                                 ...params.InputProps,
                                 startAdornment: emailIcon?.Icon && (
                                    <InputAdornment position="start" sx={{ mr: 1 }}>
                                       <emailIcon.Icon />
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        )}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={formData.email.email}
                        onChange={(e) => handleInputChange('email', 'email', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                     <TextField
                        size='small'
                        label="Email ID"
                        variant="outlined"
                        fullWidth
                        value={formData.email.emailId}
                        onChange={(e) => handleInputChange('email', 'emailId', e.target.value)}
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
                              fontSize: '14px',
                           },
                           '& label.Mui-focused': {
                              color: 'white',
                           }
                        }}
                     />
                  </div>
               </Box>

               {/* Action Buttons */}
               <Box sx={{ display: 'flex', gap: 2, mt: 2, width: "100%" }}>

                  <div>
                     {contactId && (
                        <Button
                           type="button"
                           variant="outlined"
                           color="error"
                           onClick={deleteFooterRightContact}
                           disabled={loading}
                           sx={{
                              px: 5
                           }}
                        >
                           Delete
                        </Button>
                     )}
                  </div>
                  <GradientButton
                     type="submit"
                     loading={loading}
                  // variant="contained"
                  // disabled={loading}
                  // sx={{
                  //    textTransform: 'none',
                  //    flex: 1,
                  //    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  //    '&:hover': {
                  //       background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  //    },
                  //    '&:disabled': {
                  //       background: 'linear-gradient(45deg, #BDBDBD 30%, #E0E0E0 90%)',
                  //    }
                  // }}
                  >
                     {loading ? 'Saving...' : (contactId ? 'Update Contact' : 'Save Contact')}
                  </GradientButton>
               </Box>
            </Box>
         </form>

         {/* Beautiful Success Message */}
         <Snackbar
            open={showSuccess}
            autoHideDuration={4000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         >
            <Alert
               onClose={() => setShowSuccess(false)}
               severity="success"
               icon={<CheckCircleIcon />}
               sx={{
                  width: '100%',
                  background: 'linear-gradient(135deg,rgb(54, 110, 59) 0%, #45a049 100%)',
                  color: 'white',
                  // fontWeight: 'bold',
                  fontSize: '12px',
                  borderRadius: '12px',
                  // boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                  // '& .MuiAlert-icon': {
                  //    color: 'white',
                  //    fontSize: '24px'
                  // },
                  '& .MuiAlert-message': {
                     color: 'white',
                     fontSize: '13px',
                     fontWeight: '300'
                  }
               }}
            >
               {successMessage}
            </Alert>
         </Snackbar>
      </div>
   )
}

export default FooterRightContact
