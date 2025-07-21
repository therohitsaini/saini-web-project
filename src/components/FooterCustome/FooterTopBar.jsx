import { Avatar, Button, Divider, TextField, CircularProgress, Autocomplete, Box, InputAdornment, Checkbox } from '@mui/material'
import React, { useState, useEffect, useMemo } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import GradientButton from '../ReuseComponent/ReuseComponent';
import { allFaMdIconsList } from '../NavbarComponent/HeaderTopLeft';
import { showErrorToast, showSuccessToast } from '../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import { ToastContainer } from 'react-toastify';
// import CheckBox from '@mui/icons-material/CheckBox';

function FooterTopBar({ showSnackbar, showError }) {
   const [footerTopBarForm, setFooterTopBarForm] = useState({
      leftSection: {
         title: "",
         subTitle: "",
         icone: "",
         image: null,
         existingImage: null
      },
      rightSection: {
         title: "",
         subTitle: "",
         icone: "",
         image: null,
         existingImage: null
      }
   });

   const [imagePreview, setImagePreview] = useState({
      left: null,
      right: null
   });

   const [loading, setLoading] = useState(false);
   const [userId, setUserId] = useState(null);

   // Icon selection states for left section
   const [selectedIconLeft, setSelectedIconLeft] = useState(null);
   const [inputValueLeft, setInputValueLeft] = useState('');

   // Icon selection states for right section
   const [selectedIconRight, setSelectedIconRight] = useState(null);
   const [inputValueRight, setInputValueRight] = useState('');

   useEffect(() => {
      const id = localStorage.getItem("user-ID");
      if (id) {
         setUserId(id);
         getExistingFooterTopBar(id);
      }

      // Debug: Log some available icons
      console.log("Available icons (first 10):", allFaMdIconsList.slice(0, 10).map(i => i.label));
   }, []);

   const getExistingFooterTopBar = async (id) => {
      try {
         const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/get-footer-top-bar/${id}`;
         const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
         });
         const data = await response.json();

         if (response.ok && data.data) {
            console.log("Footer Top Bar Data received:", data.data);
            console.log("Left Section Image:", data.data.leftSection?.image);
            console.log("Right Section Image:", data.data.rightSection?.image);
            setFooterTopBarForm({
               leftSection: {
                  title: data.data.leftSection?.title || "",
                  subTitle: data.data.leftSection?.subTitle || "",
                  icone: data.data.leftSection?.icone || "",
                  image: null,
                  existingImage: data.data.leftSection?.image && data.data.leftSection.image.trim() !== '' ? data.data.leftSection.image : null
               },
               rightSection: {
                  title: data.data.rightSection?.title || "",
                  subTitle: data.data.rightSection?.subTitle || "",
                  icone: data.data.rightSection?.icone || "",
                  image: null,
                  existingImage: data.data.rightSection?.image && data.data.rightSection.image.trim() !== '' ? data.data.rightSection.image : null
               }
            });

            // Set image previews
            setImagePreview({
               left: data.data.leftSection?.image && data.data.leftSection.image.trim() !== ''
                  ? `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${data.data.leftSection.image.replace(/^\/?/, '')}`
                  : null,
               right: data.data.rightSection?.image && data.data.rightSection.image.trim() !== ''
                  ? `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${data.data.rightSection.image.replace(/^\/?/, '')}`
                  : null
            });

            // Set icon selections
            if (data.data.leftSection?.icone) {
               console.log("Left Section Icon from API:", data.data.leftSection.icone);
               const foundIconLeft = allFaMdIconsList.find((i) => i.label === data.data.leftSection.icone);
               console.log("Found Left Icon:", foundIconLeft);
               if (foundIconLeft) {
                  setSelectedIconLeft(foundIconLeft);
                  setInputValueLeft(foundIconLeft.label);
               }
            }
            if (data.data.rightSection?.icone) {
               console.log("Right Section Icon from API:", data.data.rightSection.icone);
               const foundIconRight = allFaMdIconsList.find((i) => i.label === data.data.rightSection.icone);
               console.log("Found Right Icon:", foundIconRight);
               if (foundIconRight) {
                  setSelectedIconRight(foundIconRight);
                  setInputValueRight(foundIconRight.label);
               }
            }
         }
      } catch (error) {
         console.log("Error fetching footer top bar:", error);
      }
   };

   const handleFileChange = (e, section) => {
      const file = e.target.files[0];
      if (!file) return;

      setImagePreview(prev => ({
         ...prev,
         [section]: URL.createObjectURL(file)
      }));

      setFooterTopBarForm((prev) => ({
         ...prev,
         [section === 'left' ? 'leftSection' : 'rightSection']: {
            ...prev[section === 'left' ? 'leftSection' : 'rightSection'],
            image: file
         }
      }));
   };

   const onChangeSection = (e, section) => {
      const { name, value } = e.target;
      setFooterTopBarForm((prev) => ({
         ...prev,
         [section]: {
            ...prev[section],
            [name]: value,
         },
      }));
   };

   // Filtered icons for left section
   const filteredIconsLeft = useMemo(() => {
      const term = inputValueLeft.trim().toLowerCase();
      if (!term) return allFaMdIconsList.slice(0, 50);
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100);
   }, [inputValueLeft]);

   const filteredIconsRight = useMemo(() => {
      const term = inputValueRight.trim().toLowerCase();
      if (!term) return allFaMdIconsList.slice(0, 50);
      return allFaMdIconsList
         .filter((icon) => icon.label.toLowerCase().includes(term))
         .slice(0, 100);
   }, [inputValueRight]);

   const postFooterTopBarData = async () => {
      if (!userId) {
         alert("User ID not found. Please login again.");
         return;
      }
      setLoading(true);
      try {
         const formData = new FormData();
         formData.append("leftTitle", footerTopBarForm.leftSection.title);
         formData.append("leftSubTitle", footerTopBarForm.leftSection.subTitle);
         formData.append("leftIcone", footerTopBarForm.leftSection.icone);

         // Handle left section image
         if (footerTopBarForm.leftSection.image) {
            // New image uploaded
            formData.append("leftImage", footerTopBarForm.leftSection.image);
         } else if (footerTopBarForm.leftSection.existingImage) {
            // Keep existing image
            formData.append("leftExistingImage", footerTopBarForm.leftSection.existingImage);
         }

         formData.append("rightTitle", footerTopBarForm.rightSection.title);
         formData.append("rightSubTitle", footerTopBarForm.rightSection.subTitle);
         formData.append("rightIcone", footerTopBarForm.rightSection.icone);

         // Handle right section image
         if (footerTopBarForm.rightSection.image) {
            // New image uploaded
            formData.append("rightImage", footerTopBarForm.rightSection.image);
         } else if (footerTopBarForm.rightSection.existingImage) {
            // Keep existing image
            formData.append("rightExistingImage", footerTopBarForm.rightSection.existingImage);
         }

         // console.log("Sending Footer Top Bar Data:");
         // console.log("Left Image:", footerTopBarForm.leftSection.image);
         // console.log("Left Existing Image:", footerTopBarForm.leftSection.existingImage);
         // console.log("Right Image:", footerTopBarForm.rightSection.image);
         // console.log("Right Existing Image:", footerTopBarForm.rightSection.existingImage);

         const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-top-bar/${userId}`;
         const response = await fetch(url, {
            method: 'POST',
            body: formData
         });
         const result = await response.json();

         if (response.ok) {
            showSuccessToast(result.message || "Footer top bar updated successfully!");
            getExistingFooterTopBar(userId);
         } else {
            showErrorToast(result.message || "Failed to update footer top bar");
         }

      } catch (error) {
         console.error("Upload Error:", error);
         showError("An error occurred while saving footer top bar");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='main h-full w-full flex justify-center items-center flex-col px-30'>
         <ToastContainer />
         <div className='form-main gap-3 w-full border border-slate-500/20 p-5 rounded-md' >
            <div className='p-5 w-full flex gap-5'>
               {/* Left Section Form */}
               <form className='border border-slate-500/20 w-full h-full rounded-md p-3 flex flex-col gap-3'>
                  <h1 className='text-lg font-semibold text-gray-700'>Footer Top Left</h1>
                  <Divider sx={{ mb: 1 }} />
                  <div className='button-input flex gap-2 items-center'>
                     <Avatar sx={{ height: 56, width: 56 }} src={imagePreview.left} />
                     <Button
                        sx={{ p: 1, px: 5 }}
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        size='small'
                     >
                        Upload Image
                        <input
                           type="file"
                           hidden
                           accept="image/*"
                           onChange={(e) => handleFileChange(e, 'left')}
                        />
                     </Button>
                  </div>
                  <TextField
                     label="Title"
                     size="small"
                     name="title"
                     value={footerTopBarForm.leftSection.title}
                     onChange={(e) => onChangeSection(e, 'leftSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'blue' }
                     }}
                     variant="outlined"
                  />
                  <TextField
                     label="Sub Title"
                     size="small"
                     name="subTitle"
                     value={footerTopBarForm.leftSection.subTitle}
                     onChange={(e) => onChangeSection(e, 'leftSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'blue' }
                     }}
                     variant="outlined"
                  />

                  {/* Icon Autocomplete for Left Section */}
                  <Autocomplete
                     value={selectedIconLeft}
                     onChange={(event, newValue) => {
                        setSelectedIconLeft(newValue);
                        setFooterTopBarForm(prev => ({
                           ...prev,
                           leftSection: {
                              ...prev.leftSection,
                              icone: newValue?.label || ''
                           }
                        }));
                     }}
                     inputValue={inputValueLeft}
                     onInputChange={(event, newInputValue) => {
                        setInputValueLeft(newInputValue);
                     }}
                     options={filteredIconsLeft}
                     getOptionLabel={(option) => option.label}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           label="Select Icon"
                           size="small"
                           InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                 <>
                                    {selectedIconLeft && (
                                       <InputAdornment position="start">
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                             <selectedIconLeft.Icon style={{ fontSize: '20px', color: '#666' }} />
                                          </Box>
                                       </InputAdornment>
                                    )}
                                    {params.InputProps.startAdornment}
                                 </>
                              ),
                           }}
                           sx={{
                              width: "100%",
                              '& .MuiOutlinedInput-root': {
                                 fontSize: '12px',
                                 '& input': { fontSize: '14px' },
                                 '&:hover fieldset': { borderColor: 'blue' },
                                 '&.Mui-focused fieldset': { borderColor: 'blue' },
                              },
                              '& label': { color: 'gray', fontSize: '14px' },
                              '& label.Mui-focused': { color: 'blue' }
                           }}
                           variant="outlined"
                        />
                     )}
                     renderOption={(props, option) => (
                        <Box component="li" {...props}>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <option.Icon style={{ fontSize: '16px' }} />
                              <span>{option.label}</span>
                           </Box>
                        </Box>
                     )}
                     noOptionsText="No icons found"
                     loading={false}
                  />
               </form>

               {/* Right Section Form */}
               <form className='border border-slate-500/20 w-full h-full rounded-md p-3 flex flex-col gap-3'>
                  <h1 className='text-lg font-semibold text-gray-700'>Footer Top Right</h1>
                  <Divider sx={{ mb: 1 }} />
                  <div className='button-input flex gap-2 items-center'>
                     <Avatar sx={{ height: 56, width: 56 }} src={imagePreview.right} />
                     <Button
                        sx={{ p: 1, px: 5 }}
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        size='small'
                     >
                        Upload Image
                        <input
                           type="file"
                           hidden
                           accept="image/*"
                           onChange={(e) => handleFileChange(e, 'right')}
                        />
                     </Button>
                  </div>
                  <TextField
                     label="Title"
                     size="small"
                     name="title"
                     value={footerTopBarForm.rightSection.title}
                     onChange={(e) => onChangeSection(e, 'rightSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'blue' }
                     }}
                     variant="outlined"
                  />
                  <TextField
                     label="Sub Title"
                     size="small"
                     name="subTitle"
                     value={footerTopBarForm.rightSection.subTitle}
                     onChange={(e) => onChangeSection(e, 'rightSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'blue' }
                     }}
                     variant="outlined"
                  />

                  {/* Icon Autocomplete for Right Section */}
                  <Autocomplete
                     value={selectedIconRight}
                     onChange={(event, newValue) => {
                        setSelectedIconRight(newValue);
                        setFooterTopBarForm(prev => ({
                           ...prev,
                           rightSection: {
                              ...prev.rightSection,
                              icone: newValue?.label || ''
                           }
                        }));
                     }}
                     inputValue={inputValueRight}
                     onInputChange={(event, newInputValue) => {
                        setInputValueRight(newInputValue);
                     }}
                     options={filteredIconsRight}
                     getOptionLabel={(option) => option.label}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           label="Select Icon"
                           size="small"
                           InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                 <>
                                    {selectedIconRight && (
                                       <InputAdornment position="start">
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                             <selectedIconRight.Icon style={{ fontSize: '20px', color: '#666' }} />
                                          </Box>
                                       </InputAdornment>
                                    )}
                                    {params.InputProps.startAdornment}
                                 </>
                              ),
                           }}
                           sx={{
                              width: "100%",
                              '& .MuiOutlinedInput-root': {
                                 fontSize: '12px',
                                 '& input': { fontSize: '14px' },
                                 '&:hover fieldset': { borderColor: 'blue' },
                                 '&.Mui-focused fieldset': { borderColor: 'blue' },
                              },
                              '& label': { color: 'gray', fontSize: '14px' },
                              '& label.Mui-focused': { color: 'blue' }
                           }}
                           variant="outlined"
                        />
                     )}
                     renderOption={(props, option) => (
                        <Box component="li" {...props}>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <option.Icon style={{ fontSize: '16px' }} />
                              <span>{option.label}</span>
                           </Box>
                        </Box>
                     )}
                     noOptionsText="No icons found"
                     loading={false}
                  />
               </form>
            </div>

            <div className="flex items-center gap-2  sticky top-0 w-full px-5 ">
               <Checkbox
                  defaultChecked
                  sx={{ m: 0, p: 0 }}
                  size="small"
               />
               <p className="text-[14px] text-slate-500 font-sans">
                  If you want to show this on the website
               </p>
            </div>

            <div className='w-full flex justify-end mt-4'>
               <Button
                  onClick={postFooterTopBarData}
                  disabled={loading}
                  sx={{
                     textTransform: 'none',
                     px: 5,
                     backgroundColor: loading ? "#6b6767" : "initial",
                     backgroundImage: loading
                        ? "none"
                        : "linear-gradient(to right, #1e3a8a, #9333ea)",
                     color: "white",
                     "&:hover": {
                        backgroundColor: loading ? "#6b6767" : "initial",
                        backgroundImage: loading
                           ? "none"
                           : "linear-gradient(to right, #1e40af, #7c3aed)",
                     },
                  }}
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: "#f3f6f7" }} /> : <SaveIcon />}
               >
                  {loading ? 'Saving...' : 'Save All Changes'}
               </Button>
            </div>
         </div>
      </div>
   );
}

export default FooterTopBar;