import { Autocomplete, Avatar, Divider, IconButton, TextField, Tooltip, InputAdornment, Checkbox } from '@mui/material'
import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft'
import { useMemo } from 'react'
import GradientButton from '../../ReuseComponent/ReuseComponent'
import { showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable'
import { ToastContainer } from 'react-toastify'

function FooterContact({ userID, footerBackgroundData }) {
   const [imagePreview, setImagePreview] = useState(null)
   const [uploadedFile, setUploadedFile] = useState(null)
   const [existingImage, setExistingImage] = useState(null)
   const [description, setDescription] = useState('')
   const [iconFields, setIconFields] = useState([
      {
         _id: null,
         item_Center_Name: "",
         item_Center_Icone: "",
         item_Center_Icone_Path: "",
         selectedIconObj: null
      }
   ])
   console.log(iconFields)
   const [loading, setLoading] = useState(false)
   const [contactId, setContactId] = useState(null)
   const [inputValue, setInputValue] = useState('')

   // Background logic
   const getBackgroundStyle = () => {
      if (footerBackgroundData?.backgroundImage) {
         // If image exists, use it
         const imageUrl = footerBackgroundData.backgroundImage.startsWith('http')
            ? footerBackgroundData.backgroundImage
            : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${footerBackgroundData.backgroundImage.replace(/^\/?/, '')}`;
         return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
         };
      } else if (footerBackgroundData?.backgroundColor) {
         // If color exists, use it
         return {
            backgroundColor: footerBackgroundData.backgroundColor
         };
      } else {
         // Default fallback
         return {
            backgroundImage: 'url(../src/assets/footer-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
         };
      }
   };

   // Mock icons data - replace with your actual icons


   const filteredIcons = useMemo(() => {
      const term = inputValue.trim().toLowerCase();
      if (!term) return allFaMdIconsList.slice(0, 50);
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100);
   }, [inputValue]);

   // Load existing data on component mount
   useEffect(() => {
      if (userID) {
         loadFooterContactData()
      }
   }, [userID])

   // API Functions
   const loadFooterContactData = async () => {
      if (!userID) return

      setLoading(true)
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-contact/get?userId=${userID}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'user-id': userID
               }
            }
         )
         const data = await response.json()
         console.log('Footer contact data loaded:', data)

         if (data.success && data.data) {
            const contactData = data.data
            setContactId(contactData._id)
            setDescription(contactData.description || '')

            // Set image preview with proper URL construction
            if (contactData.logo) {
               const imageUrl = contactData.logo.startsWith('http')
                  ? contactData.logo
                  : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${contactData.logo.replace(/^\/?/, '')}`;
               setImagePreview(imageUrl);
               setExistingImage(contactData.logo); // Store the original path for backend
            } else {
               setImagePreview(null);
               setExistingImage(null);
            }

            if (contactData.icons && Array.isArray(contactData.icons)) {
               const mappedIcons = contactData.icons.map(icon => {
                  // Find the icon object from allFaMdIconsList
                  const foundIcon = allFaMdIconsList.find(iconObj => iconObj.label === icon.icon);
                  console.log(`Looking for icon: ${icon.icon}, found:`, foundIcon);

                  return {
                     _id: icon._id || null,
                     item_Center_Name: icon.iconName || '',
                     item_Center_Icone: icon.icon || '',
                     item_Center_Icone_Path: icon.iconUrl || '',
                     selectedIconObj: foundIcon || null
                  };
               });

               console.log("Mapped icons:", mappedIcons);
               setIconFields(mappedIcons.length > 0 ? mappedIcons : [{
                  _id: null,
                  item_Center_Name: "",
                  item_Center_Icone: "",
                  item_Center_Icone_Path: "",
                  selectedIconObj: null
               }]);
            }
         }
      } catch (error) {
         console.error('Error loading footer contact data:', error)
      } finally {
         setLoading(false)
      }
   }

   const saveFooterContactData = async (isUpdate = false) => {
      if (!userID) {
         alert('User ID is required!')
         return
      }

      setLoading(true)
      try {
         const formData = new FormData()
         formData.append('description', description)
         formData.append('userId', userID)

         // Add icons data
         const iconsData = iconFields.map(field => ({
            iconName: field.item_Center_Name,
            icon: field.item_Center_Icone,
            iconUrl: field.item_Center_Icone_Path
         }))
         formData.append('icons', JSON.stringify(iconsData))

         // Add logo file if uploaded, otherwise keep existing image
         if (uploadedFile) {
            formData.append('logo', uploadedFile)
         } else if (existingImage) {
            formData.append('existingLogo', existingImage)
         }

         const url = isUpdate
            ? `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-contact/update/${contactId}`
            : `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-contact/post`

         const method = isUpdate ? 'PUT' : 'POST'

         const response = await fetch(url, {
            method,
            headers: {
               'user-id': userID
            },
            body: formData
         })

         const data = await response.json()
         console.log('Save response:', data)

         if (response.ok) {
            showSuccessToast(isUpdate ? 'Footer contact updated successfully!' : 'Footer contact created successfully!')
            if (!isUpdate && data.data) {
               setContactId(data.data._id)
            }
            // Reload data to show updated values
            await loadFooterContactData()
         } else {
            alert(`Error: ${data.message || 'Something went wrong'}`)
         }
      } catch (error) {
         console.error('Error saving footer contact:', error)
         alert('Error saving footer contact')
      } finally {
         setLoading(false)
      }
   }

   const deleteFooterContact = async () => {
      if (!contactId || !userID) {
         alert('No contact data to delete!')
         return
      }

      const confirmDelete = window.confirm('Are you sure you want to delete this footer contact?')
      if (!confirmDelete) return

      setLoading(true)
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-contact/delete/${contactId}`,
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
            showSuccessToast('Footer contact deleted successfully!')
            // Reset form
            setContactId(null)
            setDescription('')
            setImagePreview(null)
            setUploadedFile(null)
            setExistingImage(null)
            setIconFields([{
               item_Center_Name: "",
               item_Center_Icone: "",
               item_Center_Icone_Path: "",
               selectedIconObj: null
            }])
         } else {
            alert(`Error: ${data.message || 'Something went wrong'}`)
         }
      } catch (error) {
         console.error('Error deleting footer contact:', error)
         alert('Error deleting footer contact')
      } finally {
         setLoading(false)
      }
   }

   const deleteIcon = async (contactId, iconId) => {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-contact/${contactId}/icon/${iconId}`,
            {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
                  'user-id': userID
               },
               body: JSON.stringify({ userId: userID })
            }
         );

         const data = await response.json();

         if (response.ok) {
            showSuccessToast('Icon deleted successfully!');
            // Reload your data or update state
            await loadFooterContactData();
         } else {
            alert(`Error: ${data.message || 'Something went wrong'}`);
         }
      } catch (error) {
         console.error('Error deleting icon:', error);
         alert('Error deleting icon');
      }
   };

   // Form handlers
   const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
         setUploadedFile(file)
         setImagePreview(URL.createObjectURL(file))
      }
   }

   const handleChange = (index, e) => {
      const { name, value } = e.target
      const updatedFields = [...iconFields]
      updatedFields[index][name] = value
      setIconFields(updatedFields)
   }

   const addField = () => {
      setIconFields([...iconFields, {
         _id: null,
         item_Center_Name: "",
         item_Center_Icone: "",
         item_Center_Icone_Path: "",
         selectedIconObj: null
      }])
   }

   const removeField = (index) => {
      if (iconFields.length > 1) {
         const updatedFields = iconFields.filter((_, i) => i !== index)
         setIconFields(updatedFields)
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      await saveFooterContactData(contactId ? true : false)
   }

   // if (loading) {
   //    return <div className="flex justify-center items-center h-64">Loading footer contact data...</div>
   // }

   return (
      <div
         className='footer-contact w-full h-[100%] flex flex-col items-center justify-center sticky top-0 gap-5'
      // style={}
      >
         <ToastContainer />
         <div className='w-[700px] h-full flex flex-col border border-slate-500/20 p-4 rounded-md mt-20 gap-4 my-2'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
               Footer Visit
            </h1>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
               {/* <Avatar
                  src={imagePreview}
                  sx={{
                     width: 200,
                     height: 56,
                     mr: 2,
                     backgroundColor: imagePreview ? 'transparent' : '#f0f0f0'
                  }}
               /> */}
               <div className='w-[200px] h-10   p-2'>
                  <img src={imagePreview} className='object-cover' alt='not found' />
               </div>
               <Button
                  sx={{ textTransform: "none", px: 10, fontVariant: "all-small-caps", }}
                  component="label"
                  variant="outlined"
               >
                  Upload Logo
                  <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
               </Button>
            </Box>
            <TextField
               label="Footer Contact Description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               multiline
               rows={3}
               sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                     fontSize: '12px',
                     '& textarea': {
                        fontSize: '14px',
                     },
                     '&:hover fieldset': {
                        borderColor: 'blue',
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'blue',
                     },
                  },
               }}
               size="small"
            />
         </div>
         <form onSubmit={handleSubmit} className='w-[700px] h-full sticky top-0 flex flex-col border border-slate-500/20 p-4 rounded-md'>

            {/* <Divider sx={{ width: '100%', mb: 1 }} /> */}

            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
               {/* Logo Upload */}


               {/* Description */}


               {/* Icons Section */}
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Social Media Icons</h3>
                  <Button
                     type="button"
                     variant="outlined"
                     startIcon={<AddIcon />}
                     onClick={addField}
                     size="small"
                  >
                     Add Icon
                  </Button>
               </div>
               <div className='flex flex-col gap-2'>
                  {iconFields?.map((field, index) => (
                     <div
                        key={index}
                        className="border border-slate-400/20 rounded-md p-5 w-full relative"
                     >
                        <div className="flex flex-col md:flex-row gap-3">
                           <TextField
                              label={`Title ${index + 1}`}
                              size="small"
                              variant="outlined"
                              name="item_Center_Name"
                              value={field.item_Center_Name}
                              onChange={(e) => handleChange(index, e)}
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
                              }}
                           />

                           <Autocomplete
                              fullWidth
                              options={filteredIcons}
                              value={field.selectedIconObj || null}
                              onChange={(e, newValue) => {
                                 const updatedFields = [...iconFields]
                                 updatedFields[index].item_Center_Icone = newValue ? newValue.label : ''
                                 updatedFields[index].selectedIconObj = newValue || null
                                 setIconFields(updatedFields)
                              }}
                              size="small"
                              onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                              getOptionLabel={(option) => option.label}
                              isOptionEqualToValue={(option, value) => option.label === value?.label}
                              renderOption={(props, option) => (
                                 <Box
                                    component="li"
                                    {...props}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                 >
                                    {option.Icon && <option.Icon />}
                                    {option.label}
                                 </Box>
                              )}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    label="Search Icon"
                                    variant="outlined"
                                    InputProps={{
                                       ...params.InputProps,
                                       startAdornment: field.selectedIconObj?.Icon && (
                                          <InputAdornment position="start" sx={{ mr: 1 }}>
                                             <field.selectedIconObj.Icon />
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
                                    }}
                                 />
                              )}
                           />

                           <TextField
                              label={`URL ${index + 1}`}
                              size="small"
                              variant="outlined"
                              name="item_Center_Icone_Path"
                              value={field.item_Center_Icone_Path}
                              onChange={(e) => handleChange(index, e)}
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
                              }}
                           />

                           <Tooltip title="Delete">
                              <IconButton
                                 onClick={() => {
                                    if (field._id && contactId) {
                                       // If icon has an ID and contact exists, delete from server
                                       deleteIcon(contactId, field._id);
                                    } else {
                                       // If no ID, just remove from local state
                                       removeField(index);
                                    }
                                 }}
                                 color="error"
                                 disabled={iconFields.length === 1}
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </Tooltip>
                        </div>
                     </div>
                  ))}
               </div>
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

               <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: "end" }}>
                  {contactId && (
                     <Button
                        type="button"
                        variant="outlined"
                        sx={{ textTransform: "none", px: 5, fontVariant: "all-small-caps", }}
                        color="error"
                        onClick={deleteFooterContact}
                        disabled={loading}
                     >
                        Delete
                     </Button>
                  )}
                  <GradientButton
                     type="submit"
                     // variant="contained"
                     loading={loading}
                     sx={{
                        textTransform: 'none',
                        minWidth: '200px',
                        backgroundImage: loading
                           ? 'none'
                           : 'linear-gradient(to right, #1e3a8a, #9333ea)',
                        backgroundColor: loading ? '#c2c2c2' : undefined,
                        color: 'white',
                        '&:hover': {
                           backgroundImage: loading
                              ? 'none'
                              : 'linear-gradient(to right, #1e40af, #7c3aed)',
                           backgroundColor: loading ? '#c2c2c2' : undefined,
                        },
                     }}
                  >
                     {loading ? 'Saving...' : (contactId ? 'Update Contact' : 'Save Contact')}
                  </GradientButton>


               </Box>
            </Box>
         </form>
      </div>
   )
}

export default FooterContact