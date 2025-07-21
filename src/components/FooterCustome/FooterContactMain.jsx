import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FooterContact from './FooterMianPages/FooterContact';
import { useEffect, useState } from 'react';
import FooterCategory from './FooterMianPages/FooterCategory';
import FooterTages from './FooterMianPages/FooterTages';
import FooterRightContact from './FooterMianPages/FooterRightContact';

export const tabsData = [
   {
      value: 0,
      label: "Footer Test Visit"
   },
   {
      value: 1,
      label: "Footer Categories Visit"
   },
   {
      value: 2,
      label: "Footer Tags Visit"
   },
   {
      value: 3,
      label: "Footer Contact Viist"
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
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
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

export default function FooterContactMain({ showSnackbar, showError }) {
   const [value, setValue] = React.useState(0);

   const [userID, setUserID] = useState('');
   useEffect(() => {
      const userID = localStorage.getItem("user-ID");
      setUserID(userID);
   }, [userID]);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      //  <div className='w-full h-[100%] border border-red-500 flex justify-center items-center'>
      <Box
         sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 224, width: '100%' }}
      >
         <div className=' flex justify-center items-center sticky top-40 '>
            <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               className='
                        bg-[#1f2937]'
               sx={{
                  // borderRight: 1,
                  borderColor: 'divider',
                  minWidth: 220, height: 350,
                  display: 'flex',
                  py: 3,
                  borderRadius: 1,



               }}
            >
               {
                  tabsData?.map((tabs) => {
                     return (
                        <Tab sx={{
                           textTransform: 'none',
                           bgcolor: value === tabs.value ? '#6366f1' : 'transparent',
                           color: value === tabs.value ? 'black' : 'white',
                           borderRadius: 1,
                           p: 3

                        }}

                           label={tabs.label} {...a11yProps(tabs.value)}
                        />
                     )
                  })
               }

            </Tabs>
         </div>
         <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <TabPanel value={value} index={0}>
               <FooterContact
                  userID={userID}
                  showError={showError}
                  showSnackbar={showSnackbar}
               />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <FooterCategory userID={userID} showError={showError} showSnackbar={showSnackbar} />
            </TabPanel>
            <TabPanel value={value} index={2}>
               <FooterTages userID={userID} showError={showError} showSnackbar={showSnackbar} />
            </TabPanel>
            <TabPanel value={value} index={3}>
               <FooterRightContact userID={userID} showSnackbar={showSnackbar} showError={showError} />
            </TabPanel>

         </Box>
      </Box>
      // </div>
   );
}
