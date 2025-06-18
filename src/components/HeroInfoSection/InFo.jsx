import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ServiceInFo from './InfoPages/ServiceInFo';
import InFoSupport from './InfoPages/InFoSupport';
import InFoExperiens from './InfoPages/InFoExperiens';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useState } from 'react';

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

export default function InFo() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const allFaMdIcons_ = [
        ...Object.entries(MdIcons),
        ...Object.entries(FaIcons),

    ]

    const allFaMdIcons = allFaMdIcons_.map(([name, Icon]) => ({
        label: name,
        Icon
    }))

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIcons.find((i) => i.label === '')
    )

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}
        >
            <div className='tabs-main h-full  flex items-center'>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', minWidth: 150 }}
                >
                    <Tab
                        sx={{
                            textTransform: 'none',
                            bgcolor: value === 0 ? '#3105c2' : 'transparent',
                            color: value === 0 ? 'black' : 'white',
                            borderRadius: 1,
                        }}
                        label="Service" {...a11yProps(0)} />
                    <Tab
                        sx={{
                            textTransform: 'none',
                            bgcolor: value === 1 ? '#3105c2' : 'transparent',
                            color: value === 1 ? 'black' : 'white',
                            borderRadius: 1,

                        }}
                        label="Support" {...a11yProps(1)} />
                    <Tab

                        sx={{
                            textTransform: 'none',
                            bgcolor: value === 2 ? '#3105c2' : 'transparent',
                            color: value === 2 ? 'black' : 'white',
                            borderRadius: 1,

                        }}

                        label="Experienced" {...a11yProps(2)} />

                </Tabs>
            </div>
            <div className='tabs-contanier  w-full' >
                <TabPanel value={value} index={0}>
                    <ServiceInFo setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InFoSupport setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <InFoExperiens setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} />
                </TabPanel>


            </div>
        </Box>
    );
}
