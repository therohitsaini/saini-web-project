
import React, { useState, useEffect } from 'react';
import { Divider, TextField, Button, Chip, Box, Checkbox } from '@mui/material';
import { showSuccessToast } from '../../FunfactSection/FunfactUI/FuncfactCustom/FunfactTable';
import { ToastContainer } from 'react-toastify';

function FooterTages({ userID }) {
   const [FooterTagesName, setFooterTagesName] = useState('');
   const [inputItem, setInputItem] = useState('');
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(false);
   const [getCategoryDataApies, setGetCategoryDataApies] = useState([])
   const [tagsId, setTagsId] = useState()



   const loadCategoryData = async (userID) => {
      try {
         const url = `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-tags-get/${userID}`;
         const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
         })
         const result = await response.json()

         if (response.ok) {
            setGetCategoryDataApies(result.data)

            // Set FooterTagesName as a string so it appears in the TextField
            if (result.data && result.data[0]) {
               const categoryData = result.data[0];
               setFooterTagesName(categoryData.FooterTagesName || '');
               setItems(categoryData.listItem || []);
               setTagsId(categoryData._id)
               console.log('Data loaded into form:', {
                  FooterTagesName: categoryData.FooterTagesName,
                  items: categoryData.listItem
               });
            }
         }
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      loadCategoryData(userID)
   }, [])



   const handleAddItem = () => {
      const trimmed = inputItem.trim();
      if (trimmed && !items.includes(trimmed)) {
         setItems([...items, trimmed]);
         setInputItem('');
      }
   };

   const handleDeleteItem = (index) => {
      setItems(items.filter((_, i) => i !== index));
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!userID) {
         alert("User ID is required!");
         return;
      }

      if (!FooterTagesName || !FooterTagesName.trim()) {
         alert("Category name is required!");
         return;
      }

      const payload = {
         FooterTagesName: FooterTagesName.trim(),
         listItem: items,
         userId: userID
      };
      console.log("Submitting payload:", payload);

      const url = tagsId
         ? `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-tags-update/${tagsId}`
         : `${import.meta.env.VITE_BACK_END_URL}api-footer/api-footer-tags/post`;

      const method = tagsId ? 'PUT' : 'POST';

      try {
         const res = await fetch(url, {
            method,
            headers: {
               'Content-Type': 'application/json',
               'user-id': userID
            },
            body: JSON.stringify(payload),
         });

         const data = await res.json();
         console.log('Submit response:', data);

         if (res.ok) {
            showSuccessToast(tagsId ? 'Category updated successfully!' : 'Category created!');
            if (!tagsId) {
               loadCategoryData()
            }
         } else {
            alert(`Error: ${data.message || 'Something went wrong'}`);
         }
      } catch (error) {
         console.error('Request error:', error);
         alert('Server error');
      }
   };

   if (loading) {
      return <div>Loading category data...</div>;
   }

   return (
      <form
         onSubmit={handleSubmit}
         className="form-category border border-slate-400/20 p-5 w-[600px] flex flex-col gap-3 rounded-md"
      >
         <ToastContainer />
         <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
               {tagsId ? 'Edit Footer Tags' : 'Add Footer Tags'}
            </h1>
            <Button
               type="button" variant="outlined" onClick={handleAddItem}
               sx={{
                  textTransform: 'none',
               }}
            >
               + Add Item
            </Button>
         </div>
         <Divider sx={{ mb: 1 }} />




         <TextField
            label="Category Name"
            value={FooterTagesName}
            onChange={(e) => setFooterTagesName(e.target.value)}
            size="small"
            required
            sx={{
               width: '100%',
               '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  '& input': { fontSize: '14px' },
                  '&:hover fieldset': { borderColor: 'blue' },
                  '&.Mui-focused fieldset': { borderColor: 'blue' },
               },
            }}
         />

         <TextField
            label="Add Item"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddItem();
               }
            }}
            size="small"
            sx={{
               width: '100%',
               '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  '& input': { fontSize: '14px' },
                  '&:hover fieldset': { borderColor: 'blue' },
                  '&.Mui-focused fieldset': { borderColor: 'blue' },
               },
            }}
         />


         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {items.map((item, index) => (
               <Chip
                  key={index}
                  label={item}
                  onDelete={() => handleDeleteItem(index)}
                  color="primary"
                  size="small"
               />
            ))}
         </Box>

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
         <div className='flex justify-end'>
            <Button type="submit" variant="contained"
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
               {tagsId ? 'Update Category' : 'Save Category'}
            </Button>
         </div>
      </form>
   );
}

export default FooterTages;