import { Avatar, Button, Divider, TextField } from '@mui/material'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GradientButton from '../ReuseComponent/ReuseComponent';
import { useEffect } from 'react';

function FooterTopBar() {
   const [footerTopBarForm, setFooterTopBarForm] = useState({
      leftSection: {
         title: "",
         subTitle: "",
         icone: "",
         image: ""
      },
      rightSection: {
         title: "",
         subTitle: "",
         icone: "",
         image: ""
      }
   });

   const [imagePreview, setImagePreview] = useState({
      left: null,
      right: null
   });
   const [id, setId] = useState(null)

   useEffect(() => {
      const id = localStorage.getItem("user-ID")
      setId(id)
   }, [])

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

   const onChangeLeftSection = (e, section) => {
      const { name, value } = e.target;
      setFooterTopBarForm((prev) => ({
         ...prev,
         [section]: {
            ...prev[section],
            [name]: value,
         },
      }));
   };

   const postFooterTopBarData = async () => {
      try {
         const formData = new FormData();
         formData.append("leftTitle", footerTopBarForm.leftSection.title);
         formData.append("leftSubTitle", footerTopBarForm.leftSection.subTitle);
         formData.append("leftImage", footerTopBarForm.leftSection.image);

         formData.append("rightTitle", footerTopBarForm.rightSection.title);
         formData.append("rightSubTitle", footerTopBarForm.rightSection.subTitle);
         formData.append("rightImage", footerTopBarForm.rightSection.image);

         const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/footer-top-bar/${id}`;
         const response = await fetch(url, {
            method: 'POST',
            body: formData
         });
         const result = await response.json()
         console.log(result)

         if (!response.ok) {
            alert(result.message);
         }

      } catch (error) {
         console.error("Upload Error:", error);
      }
   };

   return (
      <div className='main h-full w-full flex justify-center items-center flex-col px-30'>
         <div className='form-main  gap-3 w-full border border-slate-500/20 p-5 '>
            <div className=' p-5 w-full flex  gap-5'>
               <form className='border border-slate-500/20 w-full h-full rounded-md p-3 flex flex-col gap-3'>
                  <h1>Footer Top Left</h1>
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
                     onChange={(e) => onChangeLeftSection(e, 'leftSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'white' }
                     }}
                     variant="outlined"
                  />
                  <TextField
                     label="Sub Title"
                     size="small"
                     name="subTitle"
                     value={footerTopBarForm.leftSection.subTitle}
                     onChange={(e) => onChangeLeftSection(e, 'leftSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'white' }
                     }}
                     variant="outlined"
                  />
               </form>

               {/* Right Section Form */}
               <form className='border border-slate-500/20 w-full h-full rounded-md p-3 flex flex-col gap-3'>
                  <h1>Footer Top Right</h1>
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
                     onChange={(e) => onChangeLeftSection(e, 'rightSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'white' }
                     }}
                     variant="outlined"
                  />
                  <TextField
                     label="Sub Title"
                     size="small"
                     name="subTitle"
                     value={footerTopBarForm.rightSection.subTitle}
                     onChange={(e) => onChangeLeftSection(e, 'rightSection')}
                     sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                           fontSize: '12px',
                           '& input': { fontSize: '14px' },
                           '&:hover fieldset': { borderColor: 'blue' },
                           '&.Mui-focused fieldset': { borderColor: 'blue' },
                        },
                        '& label': { color: 'gray', fontSize: '14px' },
                        '& label.Mui-focused': { color: 'white' }
                     }}
                     variant="outlined"
                  />
               </form>
            </div>

            {/* Single Save Button for Both Forms */}
            <div className='w-full flex justify-end mt-4'>
               <GradientButton onClick={postFooterTopBarData}>
                  Save All Changes
               </GradientButton>
            </div>
         </div>
      </div>
   );
}

export default FooterTopBar;
