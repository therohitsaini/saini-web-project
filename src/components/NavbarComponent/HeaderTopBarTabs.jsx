import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HeaderCustomize from '../DashbordFormet/HeaderCustomize';
import HeaderTopLeft from './HeaderTopLeft';
import HeaderTopRight from './HeaderTopRight';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function HeaderTopBarTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example">
                    <Tab
                        sx={{
                            textTransform: 'none',
                            // bgcolor: value === 0 ? 'primary.light' : 'transparent',
                            // color: value === 0 ? 'white' : 'black',
                            // borderRadius: 1,
                        }}
                        label=" Email section Left" {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'none' }} label=" Email Section Left" {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'none' }} label=" Customer Support Right" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <HeaderCustomize />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <HeaderTopLeft />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <HeaderTopRight />
            </CustomTabPanel>
        </Box>
    );
}

export default HeaderTopBarTabs