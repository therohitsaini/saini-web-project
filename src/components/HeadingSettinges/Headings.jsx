import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useState } from 'react';




export const tabsData = [
   {
      value: 0,
      label: "Email Section"
   },
   {
      value: 1,
      label: "Center Icone"
   },
   {
      value: 2,
      label: "Support Section"
   },
   {
      value: 3,
      label: "Site Logo"
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
         // style={{width: "50%" , fl}}
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
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Fragment>

         <Box
            sx={{ bgcolor: 'background.paper', display: 'flex', borderRadius: 2, height: "100vh" }}
         >
            <div className="pb-5" >
               {/* <h1 className='bg-cyan-300' >Header Customize Manu</h1> */}
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
                           <Tab sx={{
                              textTransform: 'none',
                              bgcolor: value === tabs.value ? '#3105c2' : 'transparent',
                              color: value === tabs.value ? 'black' : 'white',
                              borderRadius: 1,

                           }}

                              label={tabs.label} {...a11yProps(tabs.value)}
                           />
                        )
                     })
                  }


               </Tabs>
            </div>
            <div className='w-[100%] flex justify-center items-center border border-gray-500'>
               <TabPanel sx={{ width: '100%' }} value={value} index={0}>
                  0
               </TabPanel>

               <TabPanel sx={{ width: '100%' }} value={value} index={1}>
                  one
               </TabPanel>

               <TabPanel value={value} index={2}>
                  two
               </TabPanel>

               <TabPanel value={value} index={3}>
                  three
               </TabPanel>
            </div>
         </Box>
      </Fragment>
   )
}

export default Headings