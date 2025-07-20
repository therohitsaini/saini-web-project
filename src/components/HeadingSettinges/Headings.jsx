import { Box, Tab, Tabs, Typography, Snackbar, Alert } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useState } from 'react';
import ServiceHeading from './Pages/ServiceHeading';
import PortFolioHeading from './Pages/PortFolioHeading';
import PrincingHeading from './Pages/PrincingHeading';
import TestiminialHeadings from './Pages/TestiminialHeadings';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export const tabsData = [
   {
      value: 0,
      label: "Service  Heading"
   },
   {
      value: 1,
      label: "Portfolio  Heading"
   },
   {
      value: 2,
      label: "Pricing  Heading"
   },
   {
      value: 3,
      label: "Testimonial  Heading"
   },
]

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
         className='w-[100%] '
      >
         {value === index && (
            <Box sx={{ p: 3, width: "100%" }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
   };
}

function Headings() {
   const [value, setValue] = useState(0);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
   });
   const [serviceHeading, setServiceHeading] = useState({
      title: '',
      Descriptions: '',
      item_ShowOnWebsite: ''
   })
   const [portfolioHeading, setPortfolioHeading] = useState({
      title: '',
      Descriptions: '',
      item_ShowOnWebsite: ''
   })

   const [princingHeading, setPrincingHeading] = useState({
      title: '',
      Descriptions: '',
      item_ShowOnWebsite: ''
   })
   const [testimonialHeading, setTestimonialHeading] = useState({
      title: '',
      Descriptions: '',
      item_ShowOnWebsite: ''
   })
   const [id, setId] = useState("")
   const [serviceHeadingApiData, setServiceHeadingApiData] = useState([])
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      const _id = localStorage.getItem("user-ID")
      setId(_id)
   }, [])

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const showSnackbar = (message, severity = 'success') => {
      setSnackbar({
         open: true,
         message,
         severity
      });
   };

 

   useEffect(() => {
      if (serviceHeadingApiData?.data?.length > 0) {
         serviceHeadingApiData.data.forEach((sectionBlock) => {
            const item = sectionBlock?.item?.[0];

            if (!item) return; // Skip if item is missing

            switch (sectionBlock.section) {
               case "ServiceHeading":
                  setServiceHeading({
                     title: item.item_Title || '',
                     Descriptions: item.item_Description || '',
                     item_ShowOnWebsite: item.item_ShowOnWebsite || ''
                  });
                  break;

               case "PortFolioHeading":
                  setPortfolioHeading({
                     title: item.item_Title || '',
                     Descriptions: item.item_Description || '',
                     item_ShowOnWebsite: item.item_ShowOnWebsite || ''
                  });
                  break;

               case "PrincingHeading":
                  setPrincingHeading({
                     title: item.item_Title || '',
                     Descriptions: item.item_Description || '',
                     item_ShowOnWebsite: item.item_ShowOnWebsite || ''
                  });
                  break;

               case "TestimonialHeading":
                  setTestimonialHeading({
                     title: item.item_Title || '',
                     Descriptions: item.item_Description || '',
                     item_ShowOnWebsite: item.item_ShowOnWebsite || ''
                  });
                  break;

               default:
                  // Unrecognized section — optionally log or ignore
                  console.warn(`Unknown section: ${sectionBlock.section}`);
                  break;
            }
         });
      }
   }, [serviceHeadingApiData]);



   console.log("serviceHeadingApiData____", serviceHeadingApiData)

   const submitHandler = async (section) => {
      let payload;
      if (section === "ServiceHeading") {
         payload = {
            section: section,
            item: [
               {
                  item_Title: serviceHeading.title,
                  item_Description: serviceHeading.Descriptions,
                  item_ShowOnWebsite: serviceHeading.item_ShowOnWebsite
               }
            ]
         }
      }
      else if (section === "PortFolioHeading") {
         payload = {
            section: section,
            item: [
               {
                  item_Title: portfolioHeading.title,
                  item_Description: portfolioHeading.Descriptions,
                  item_ShowOnWebsite: portfolioHeading.item_ShowOnWebsite
               }
            ]
         }
      }
      else if (section === "PrincingHeading") {
         payload = {
            section: section,
            item: [
               {
                  item_Title: princingHeading.title,
                  item_Description: princingHeading.Descriptions,
                  item_ShowOnWebsite: princingHeading.item_ShowOnWebsite
               }
            ]
         }
      }
      else if (section === "TestimonialHeading") {
         payload = {
            section: section,
            item: [
               {
                  item_Title: testimonialHeading.title,
                  item_Description: testimonialHeading.Descriptions,
                  item_ShowOnWebsite: testimonialHeading.item_ShowOnWebsite
               }
            ]
         }
      }
      setLoading(true)

      try {
         const url = `${import.meta.env.VITE_BACK_END_URL}api-heading/api-headingtop-api/${id}`;
         const fetchData = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
         });

         const responseJson = await fetchData.json();
         console.log("responseJson", responseJson)
         if (fetchData.ok) {
            toast.success(responseJson.message || 'Data updated successfully!', {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
         } else {
            toast.error(responseJson.message || 'Failed to update data!', {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "red",
            });
         }

      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }



   const getServiceHeading = async (id) => {
      try {
         const url = `${import.meta.env.VITE_BACK_END_URL}api-heading/api-get-heading-top/${id}`;
         const fetchData = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },

         })
         const responseJson = await fetchData.json();
         console.log("responseJson", responseJson)
         if (fetchData.ok) {
            setServiceHeadingApiData(responseJson)
         }
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getServiceHeading(id)
   }, [id])



   return (
      <Fragment>
         <Box
            sx={{ bgcolor: 'background.paper', display: 'flex', borderRadius: 2, height: "100%", }}
         >
            <div className="pb-5" >
               <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                     borderRight: 2,
                     borderColor: 'divider',
                     minWidth: 200, height: 400,
                     position: 'sticky',
                     top: 150,
                     display: "flex",

                  }}
                  TabIndicatorProps={{
                     style: {
                        backgroundColor: "#f6f0f0"
                     }
                  }}
               >
                  {
                     tabsData?.map((tabs) => {
                        return (
                           <Tab
                              key={tabs.value}
                              sx={{
                                 textTransform: 'none',
                                 bgcolor: value === tabs.value ? '#3105c2' : 'transparent',
                                 color: value === tabs.value ? 'black' : 'white',
                                 borderRadius: 1,
                              }}
                              label={tabs.label}
                              {...a11yProps(tabs.value)}
                           />
                        )
                     })
                  }
               </Tabs>
            </div>
            <div className='w-[100%] h-[80vh] flex justify-center items-center '>
               <TabPanel sx={{ width: '90%' }} value={value} index={0}>
                  <ServiceHeading
                     submitHandler={submitHandler}
                     serviceHeading={serviceHeading}
                     setServiceHeading={setServiceHeading}
                     loading={loading}
                  />
               </TabPanel>

               <TabPanel sx={{ width: '100%' }} value={value} index={1}>
                  <PortFolioHeading
                     portfolioHeading={portfolioHeading}
                     setPortfolioHeading={setPortfolioHeading}
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>

               <TabPanel sx={{ width: '100%' }} value={value} index={2}>
                  <PrincingHeading
                     princingHeading={princingHeading}
                     setPrincingHeading={setPrincingHeading}
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>

               <TabPanel sx={{ width: '100%' }} value={value} index={3}>
                  <TestiminialHeadings
                     testimonialHeading={testimonialHeading}
                     setTestimonialHeading={setTestimonialHeading}
                     submitHandler={submitHandler}
                     loading={loading}
                  />
               </TabPanel>
            </div>
         </Box>

         <ToastContainer />

      </Fragment>
   )
}

export default Headings