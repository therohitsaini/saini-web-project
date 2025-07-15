import {
   Autocomplete,
   Avatar,
   Box,
   Button,
   Divider,
   InputAdornment,
   TextField,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { allFaMdIconsList } from '../NavbarComponent/HeaderTopLeft';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CloudIcon from '@mui/icons-material/Cloud';

function FooterTopBar({ showSnackbar, showError }) {
   const [footerHelpCenterForm, setFooterHelpCenterForm] = useState({
      leftSection: {
         image: null,
         title: '',
         subtitle: '',
         icon: '',
         show: true,
      },
      rightSection: {
         image: null,
         title: '',
         subtitle: '',
         icon: '',
         show: true,
      },
   });

   const [helpCenterImagePreview, setHelpCenterImagePreview] = useState({
      left: null,
      right: null,
   });

   const [loading, setLoading] = useState(false);
   const [isEditMode, setIsEditMode] = useState(false);
   const [existingDataId, setExistingDataId] = useState(null);
   const [userId, setUserId] = useState(null);

   useEffect(() => {
      const userId = localStorage.getItem('user-ID')
      setUserId(userId);
   }, []);


   const iconOptions = [
      { label: 'HeadphonesIcon', Icon: HeadphonesIcon },
      { label: 'CloudIcon', Icon: CloudIcon },
   ];



   const loadFooterHelpCenterData = async (userId) => {


      setLoading(true);
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-footer/get/FooterHelpCenter/${"685efa2843641b31b1b13d1f"}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );
         const data = await response.json();

         if (response.ok) {
            console.log("data", data.data);
            const { leftSection, rightSection } = data.data;
            setFooterHelpCenterForm({
               leftSection: {
                  image: leftSection.image || "",
                  title: leftSection.title || "",
                  subtitle: leftSection.subtitle || "",
                  icon: leftSection.icon || "",
                  show: leftSection.show || true,
               },
               rightSection: {
                  image: rightSection.image || "",
                  title: rightSection.title || "",
                  subtitle: rightSection.subtitle || "",
                  icon: rightSection.icon || "",
                  show: rightSection.show || true,
               }
            })

            // if (data?.success && data?.data) {
            //    setFooterHelpCenterForm(data.data);
            //    // setIsEditMode(true);
            //    setExistingDataId(data._id || null);

            //    if (data.data.leftSection?.image) {
            //       setHelpCenterImagePreview((prev) => ({
            //          ...prev,
            //          left: data.data.leftSection.image,
            //       }));
            //    }

            //    if (data.data.rightSection?.image) {
            //       setHelpCenterImagePreview((prev) => ({
            //          ...prev,
            //          right: data.data.rightSection.image,
            //       }));
            //    }

            //    showSnackbar('Existing data loaded successfully!');
            // } else {
            //    console.warn("No data found or data invalid:", data);
            //    setIsEditMode(false);
            //    setExistingDataId(null);
            // }
         } else {
            console.error("Failed to fetch footer help center data. Status:", response.status);
            setIsEditMode(false);
            setExistingDataId(null);
            showError("Failed to load data from server.");
         }
      } catch (error) {
         console.error("Error loading help center data:", error);
         setIsEditMode(false);
         setExistingDataId(null);
         showError("An error occurred while loading the data.");
      } finally {
         setLoading(false);
      }
   };

   // Call once on mount
   useEffect(() => {
      loadFooterHelpCenterData();
   }, []);


   const handleHelpCenterImageUpload = (e, section) => {
      const file = e.target.files[0];
      if (file) {
         const previewUrl = URL.createObjectURL(file);
         setHelpCenterImagePreview((prev) => ({ ...prev, [section]: previewUrl }));
         setFooterHelpCenterForm((prev) => ({
            ...prev,
            [section]: {
               ...prev[section],
               image: file,
            },
         }));
      }
   };

   const onHelpCenterChangeHandler = (e, section, field) => {
      const { value } = e.target;
      setFooterHelpCenterForm((prev) => ({
         ...prev,
         [section]: {
            ...prev[section],
            [field]: value,
         },
      }));
   };

   const submitHelpCenterHandler = async () => {
      if (loading) return;
      setLoading(true);

      const endpoint = isEditMode
         ? `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-section/update/${existingDataId}`
         : `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-section/create`;

      try {
         const response = await fetch(endpoint, {
            method: isEditMode ? 'PUT' : 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: footerHelpCenterForm }),
         });

         const result = await response.json();

         if (response.ok) {
            showSnackbar(result.message || 'Saved successfully!');
            if (!isEditMode && result.data?._id) {
               setIsEditMode(true);
               setExistingDataId(result.data._id);
            }
         } else {
            showError(result?.message || 'Error saving footer help center data');
         }
      } catch (err) {
         console.error(err);
         showError('Error saving footer help center data');
      } finally {
         setLoading(false);
      }
   };

   const resetForm = () => {
      if (loading) return;

      setFooterHelpCenterForm({
         leftSection: { image: null, title: '', subtitle: '', icon: '', show: true },
         rightSection: { image: null, title: '', subtitle: '', icon: '', show: true },
      });

      setHelpCenterImagePreview({ left: null, right: null });
      setIsEditMode(false);
      setExistingDataId(null);
      showSnackbar('Form reset to default values');
   };

   const renderSection = (side) => {
      const section = footerHelpCenterForm[side];
      return (
         <div className='border border-slate-400/20 rounded-md p-4'>
            <h3 className='text-xl font-bold text-white mb-4'>
               {side === 'leftSection' ? 'Left Section' : 'Right Section'}
            </h3>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <Avatar src={helpCenterImagePreview[side === 'leftSection' ? 'left' : 'right']} sx={{ width: 56, height: 56, mr: 2 }} />
               <Button
                  component="label"
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  sx={{ textTransform: 'none', px: 5, fontVariant: 'all-small-caps' }}
               >
                  Upload Image
                  <input type="file" hidden onChange={(e) => handleHelpCenterImageUpload(e, side === 'leftSection' ? 'left' : 'right')} />
               </Button>
            </Box>

            <TextField
               label="Title"
               fullWidth
               size="small"
               value={section.title}
               onChange={(e) => onHelpCenterChangeHandler(e, side, 'title')}
               sx={{ mb: 2 }}
            />

            <TextField
               label="Subtitle"
               fullWidth
               size="small"
               value={section.subtitle}
               onChange={(e) => onHelpCenterChangeHandler(e, side, 'subtitle')}
               sx={{ mb: 2 }}
            />

            <Autocomplete
               options={iconOptions}
               value={iconOptions.find((opt) => opt.label === section.icon) || null}
               onChange={(e, newValue) =>
                  setFooterHelpCenterForm((prev) => ({
                     ...prev,
                     [side]: {
                        ...prev[side],
                        icon: newValue?.label || '',
                     },
                  }))
               }
               getOptionLabel={(option) => option.label}
               isOptionEqualToValue={(opt, val) => opt.label === val?.label}
               renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <option.Icon /> {option.label}
                  </Box>
               )}
               renderInput={(params) => (
                  <TextField
                     {...params}
                     label="Icon"
                     fullWidth
                     InputProps={{
                        ...params.InputProps,
                        startAdornment: section.icon && (
                           <InputAdornment position="start">
                              {React.createElement(
                                 iconOptions.find((opt) => opt.label === section.icon)?.Icon || HeadphonesIcon
                              )}
                           </InputAdornment>
                        ),
                     }}
                  />
               )}
            />
         </div>
      );
   };

   return (
      <div className="footer-top-bar h-full w-full text-white flex flex-col justify-center items-center gap-8 p-8">
         <form className="footer-help-center-form flex flex-col gap-5 border border-slate-400/20 rounded-md p-5 w-[80%]">
            <div className="flex justify-between items-center">
               <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Footer Help Center
               </h1>
               <div className="flex gap-2">
                  <Button onClick={resetForm} variant="outlined" sx={{ textTransform: 'none', color: 'white', borderColor: 'white' }}>
                     Reset Form
                  </Button>
                  <div
                     className={`px-3 py-1 rounded-full text-sm font-medium ${isEditMode ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                        }`}
                  >
                     {isEditMode ? 'Edit Mode' : 'Create Mode'}
                  </div>
               </div>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-6">
               {renderSection('leftSection')}
               {renderSection('rightSection')}
            </div>

            <div className="button flex justify-end mt-5">
               <Button
                  onClick={submitHelpCenterHandler}
                  disabled={loading}
                  variant="contained"
                  sx={{
                     textTransform: 'none',
                     width: 200,
                     background: isEditMode
                        ? 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)'
                        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  }}
               >
                  {loading ? 'Saving...' : isEditMode ? 'Update Help Center' : 'Save Help Center'}
               </Button>
            </div>
         </form>
      </div>
   );
}

export default FooterTopBar;
