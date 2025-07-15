import { Box, Button, Checkbox, Divider, Avatar, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';

function FooterSponsors({ showSnackbar, showError }) {
   const [loading, setLoading] = useState(false);
   const [sponsors, setSponsors] = useState({
      sponsorsOne: null,
      sponsorsTwo: null,
      sponsorsThree: null,
      sponsorsFour: null,
      sponsorsFive: null,
   });

   const [preview, setPreview] = useState({
      sponsorsOne: null,
      sponsorsTwo: null,
      sponsorsThree: null,
      sponsorsFour: null,
      sponsorsFive: null,
   });

   const [showOnWebsite, setShowOnWebsite] = useState(true);
   const [sponsorsId, setSponsorsId] = useState(null);
   const [userID, setUserID] = useState(null);


   useEffect(() => {
      const userIDFromStorage = localStorage.getItem('user-ID');
      setUserID(userIDFromStorage);
   }, []);

      // Load existing data on component mount
   // useEffect(() => {
   //    if (userID) {
   //       loadSponsorsData();
   //    }
   // }, [userID]);

   // API Functions
   const loadSponsorsData = async () => {
      if (!userID) return;

      setLoading(true);
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-sponsors/get?userId=${userID}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
                  'user-id': userID
               }
            }
         );
         const data = await response.json();
         console.log('Sponsors data loaded:', data);

         if (data.success && data.data) {
            const sponsorsData = data.data;
            setSponsorsId(sponsorsData._id);
            setShowOnWebsite(sponsorsData.showOnWebsite !== false);

            // Set preview images from existing data
            const previewData = {};
            Object.keys(sponsorsData).forEach(key => {
               if (sponsorsData[key] && typeof sponsorsData[key] === 'string' && key !== '_id' && key !== 'userId' && key !== 'showOnWebsite') {
                  previewData[key] = `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${sponsorsData[key].replace(/^\/?/, '')}`;
               }
            });
            setPreview(prev => ({ ...prev, ...previewData }));
         }
      } catch (error) {
         console.error('Error loading sponsors data:', error);
         showError('Error loading sponsors data');
      } finally {
         setLoading(false);
      }
   };

   const saveSponsorsData = async (isUpdate = false) => {
      if (!userID) {
         showError('User ID is required!');
         return;
      }

      // Check if any files are selected
      const hasFiles = Object.values(sponsors).some(file => file !== null);
      if (!hasFiles) {
         showError('Please select at least one sponsor image to upload.');
         return;
      }

      setLoading(true);
      try {
         const formData = new FormData();
         formData.append('userId', userID);
         formData.append('showOnWebsite', showOnWebsite);

         // Only append files that have been selected
         Object.keys(sponsors).forEach(key => {
            if (sponsors[key]) {
               formData.append(key, sponsors[key]);
               console.log(`Appending file: ${key}`, sponsors[key]);
            }
         });

         // Debug: Log FormData contents
         console.log('FormData contents:');
         for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
         }

         // Try different API endpoint structures
         let url;
         if (isUpdate) {
            // Update endpoints
            const updateEndpoints = [
               `${import.meta.env.VITE_BACK_END_URL}api-sponsors/update/${sponsorsId}`,
               `${import.meta.env.VITE_BACK_END_URL}api-sponsors/${sponsorsId}`,
               `${import.meta.env.VITE_BACK_END_URL}admin-api/sponsors/update/${sponsorsId}`,
               `${import.meta.env.VITE_BACK_END_URL}api-footer/sponsors/update/${sponsorsId}`,
            ];
            url = updateEndpoints[0]; // Use first one, can be changed
         } else {
            // POST endpoints - try these in order (most common first)
            const postEndpoints = [
               `${import.meta.env.VITE_BACK_END_URL}api-footer/api-sponsors/post`,  // Most likely based on your other components
               `${import.meta.env.VITE_BACK_END_URL}api-sponsors/post`,
               `${import.meta.env.VITE_BACK_END_URL}api-sponsors/create`,
               `${import.meta.env.VITE_BACK_END_URL}api-sponsors`,
               `${import.meta.env.VITE_BACK_END_URL}admin-api/sponsors/post`,
               `${import.meta.env.VITE_BACK_END_URL}api-footer/sponsors/post`,
            ];
            url = postEndpoints[0]; // Use first one, can be changed
         }

         const method = isUpdate ? 'PUT' : 'POST';

         console.log('=== SAVE REQUEST DEBUG ===');
         console.log('URL:', url);
         console.log('Method:', method);
         console.log('UserID:', userID);
         console.log('Is Update:', isUpdate);
         console.log('Sponsors ID:', sponsorsId);

         const response = await fetch(url, {
            method,
            headers: {
               'user-id': userID
            },
            body: formData
         });

         console.log('=== RESPONSE DEBUG ===');
         console.log('Response status:', response.status);
         console.log('Response status text:', response.statusText);
         console.log('Response headers:', response.headers);

         const data = await response.json();
         console.log('Response data:', data);

         if (response.ok) {
            showSnackbar(isUpdate ? 'Sponsors updated successfully!' : 'Sponsors created successfully!');
            if (!isUpdate && data.data) {
               setSponsorsId(data.data._id);
            }
            // Clear the form after successful save
            setSponsors({
               sponsorsOne: null,
               sponsorsTwo: null,
               sponsorsThree: null,
               sponsorsFour: null,
               sponsorsFive: null,
            });
            // Reload data to show updated previews
            await loadSponsorsData();
         } else {
            console.error('API Error Response:', data);
            showError(`Error: ${data.message || 'Something went wrong'}`);
         }
      } catch (error) {
         console.error('=== FETCH ERROR ===');
         console.error('Error type:', error.name);
         console.error('Error message:', error.message);
         console.error('Full error:', error);
         showError('Error saving sponsors');
      } finally {
         setLoading(false);
      }
   };

   const deleteSponsorsData = async () => {
      if (!sponsorsId || !userID) {
         showError('No sponsors data to delete!');
         return;
      }

      const confirmDelete = window.confirm('Are you sure you want to delete all sponsors?');
      if (!confirmDelete) return;

      setLoading(true);
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACK_END_URL}api-sponsors/delete/${sponsorsId}`,
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
         console.log('Delete response:', data);

         if (response.ok) {
            showSnackbar('Sponsors deleted successfully!');
            // Reset form
            setSponsorsId(null);
            setSponsors({
               sponsorsOne: null,
               sponsorsTwo: null,
               sponsorsThree: null,
               sponsorsFour: null,
               sponsorsFive: null,
            });
            setPreview({
               sponsorsOne: null,
               sponsorsTwo: null,
               sponsorsThree: null,
               sponsorsFour: null,
               sponsorsFive: null,
            });
            setShowOnWebsite(true);
         } else {
            showError(`Error: ${data.message || 'Something went wrong'}`);
         }
      } catch (error) {
         console.error('Error deleting sponsors:', error);
         showError('Error deleting sponsors');
      } finally {
         setLoading(false);
      }
   };

   const handleSingleImageUpload = (e, field) => {
      const file = e.target.files[0];
      if (file) {
         setSponsors(prev => ({
            ...prev,
            [field]: file,
         }));

         const previewUrl = URL.createObjectURL(file);
         setPreview(prev => ({
            ...prev,
            [field]: previewUrl,
         }));
      }
   };

   const checkBackendConfig = () => {
      console.log('=== BACKEND CONFIGURATION ===');
      console.log('VITE_BACK_END_URL:', import.meta.env.VITE_BACK_END_URL);
      console.log('Full URL example:', `${import.meta.env.VITE_BACK_END_URL}api-sponsors/post`);
      
      if (!import.meta.env.VITE_BACK_END_URL) {
         showError('VITE_BACK_END_URL is not configured!');
         return false;
      }
      
      if (!import.meta.env.VITE_BACK_END_URL.endsWith('/')) {
         console.warn('VITE_BACK_END_URL should end with /');
      }
      
      return true;
   };

   const testBackendConnection = async () => {
      // First check configuration
      if (!checkBackendConfig()) {
         return;
      }
      
      try {
         console.log('=== TESTING BACKEND CONNECTION ===');
         
         // Try multiple endpoints to find the correct one
         const testEndpoints = [
            `${import.meta.env.VITE_BACK_END_URL}api-footer/api-sponsors/get`,  // Most likely based on your other components
            `${import.meta.env.VITE_BACK_END_URL}api-sponsors/get`,
            `${import.meta.env.VITE_BACK_END_URL}api-sponsors`,
            `${import.meta.env.VITE_BACK_END_URL}api/sponsors`,
            `${import.meta.env.VITE_BACK_END_URL}admin-api/sponsors`,
            `${import.meta.env.VITE_BACK_END_URL}api-footer/sponsors`,
         ];
         
         for (let i = 0; i < testEndpoints.length; i++) {
            const testUrl = testEndpoints[i];
            console.log(`Testing endpoint ${i + 1}:`, testUrl);
            
            try {
               const response = await fetch(testUrl, {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json'
                  }
               });
               
               console.log(`Endpoint ${i + 1} status:`, response.status);
               
               if (response.ok) {
                  const data = await response.json();
                  console.log(`Endpoint ${i + 1} data:`, data);
                  showSnackbar(`Backend connection successful! Endpoint: ${testUrl}`);
                  return; // Found working endpoint
               }
            } catch (endpointError) {
               console.log(`Endpoint ${i + 1} failed:`, endpointError.message);
            }
         }
         
         showError('All endpoints failed. Check your backend configuration.');
         
      } catch (error) {
         console.error('Backend test error:', error);
         showError('Backend connection error');
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await saveSponsorsData(sponsorsId ? true : false);
   };

   const renderUploadButton = (label, field) => (
      <Button
         component="label"
         variant="contained"
         startIcon={
            preview[field] ? (
               <Avatar
                  src={preview[field]}
                  alt="Preview"
                  sx={{ width: 24, height: 24 }}
               />
            ) : (
               <UploadFileIcon />
            )
         }
         sx={{
            textTransform: 'none',
            px: 5,
            width: '100%',
            justifyContent: 'flex-start',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
               background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
            }
         }}
      >
         {preview[field] ? 'Change Image' : label}
         <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleSingleImageUpload(e, field)}
         />
      </Button>
   );

   return (
      <div className="footer-sponsors h-[100%] w-[100%]">
       

         <div className="footer-sponsors-container flex justify-center items-center h-[100%] w-[100%]">
            <form onSubmit={handleSubmit} className="footer-sponsors-form border border-slate-400/20 rounded-md p-5 flex justify-center items-center gap-2 flex-col w-[50%] relative">
               <div className="flex justify-start items-center w-full">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                     Add Sponsors
                  </h1>
               </div>

               <Divider sx={{ width: '100%', mb: 2 }} />

               {renderUploadButton('Upload Sponsor One', 'sponsorsOne')}
               {renderUploadButton('Upload Sponsor Two', 'sponsorsTwo')}
               {renderUploadButton('Upload Sponsor Three', 'sponsorsThree')}
               {renderUploadButton('Upload Sponsor Four', 'sponsorsFour')}
               {renderUploadButton('Upload Sponsor Five', 'sponsorsFive')}

               <div className="flex items-center gap-2 w-full mt-4">
                  <Checkbox
                     checked={showOnWebsite}
                     onChange={(e) => setShowOnWebsite(e.target.checked)}
                     sx={{ m: 0, p: 0 }}
                     size="small"
                     color="default"
                  />
                  <p className="text-[14px] text-slate-500 font-sans">
                     If you want to show this on the website
                  </p>
               </div>

               <div className="flex justify-end items-center w-full gap-2">
                  <Button
                     type="button"
                     onClick={checkBackendConfig}
                     variant="outlined"
                     size="small"
                     sx={{ textTransform: 'none' }}
                  >
                     Check Config
                  </Button>
                  
                  <Button
                     type="button"
                     onClick={testBackendConnection}
                     variant="outlined"
                     size="small"
                     sx={{ textTransform: 'none' }}
                  >
                     Test Backend
                  </Button>
                  
                  {sponsorsId && (
                     <Button
                        type="button"
                        onClick={deleteSponsorsData}
                        variant="outlined"
                        color="error"
                        disabled={loading}
                        sx={{ textTransform: 'none' }}
                     >
                        Delete
                     </Button>
                  )}
                  <Button
                     type="submit"
                     disabled={loading}
                     variant="contained"
                     startIcon={loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <SaveIcon />}
                     sx={{
                        textTransform: 'none',
                        px: 5,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                           background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                        },
                        '&:disabled': {
                           background: 'linear-gradient(45deg, #BDBDBD 30%, #E0E0E0 90%)',
                        }
                     }}
                  >
                     {loading ? 'Saving...' : (sponsorsId ? 'Update Sponsors' : 'Save Sponsors')}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default FooterSponsors;
