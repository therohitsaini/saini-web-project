import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HeaderTopLeft from './HeaderTopLeft';
import HeaderTopRight from './HeaderTopRight';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../Store/ApisStore/ApisCollection';
import { useEffect } from 'react';
import HeaderTopBarCenterIcon from './HeaderTopBarCenterIcon';
import NavbarSettings, { NavbarListItem } from './HeaderNavbarCustomizer/NavbarComponents';
import NavbarLogo from './HeaderNavbarCustomizer/NavbarComponents';

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

export default function HeaderSideBarTabs() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const initialState = {
        item_ContactId: "",
        item_Title: "",
        item_Icone: "",
        item_IconeUrl: "",

    }

    const initialStateRight = {
        item_ContactIdRight: "",
        item_TitleRight: "",
        item_IconeRight: "",
        item_IconeUrlRight: ""
    }
    const [formData, setFormData] = useState(initialState);
    const [formDataRight, setFormDataRight] = useState(initialStateRight)

    console.log("formDataRight", formDataRight)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);

    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);

    useEffect(() => {

        if (headerToBarData?.headerData?.headerTopBar?.length > 0) {
            const topLeft = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopLeftBar"
            )?.item[0];

            const topRight = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopRightBar"
            )?.item[0];

            setFormData((pre) => ({

                pre,
                item_Title: topLeft?.item_Title || "",
                item_ContactId: topLeft?.item_ContactId || "",
                item_Icone: topLeft?.item_Icone || "",
                item_IconeUrl: topLeft?.item_IconeUrl || "",

            }))

            setFormDataRight((pre) => ({

                pre,
                item_TitleRight: topRight?.item_Title || "",
                item_ContactIdRight: topRight?.item_ContactId || "",
                item_IconeRight: topRight?.item_Icone || "",
                item_IconeUrlRight: topRight?.item_IconeUrl || "",

            }))
        }


    }, [headerToBarData])

    const submitHandler = async (section) => {
        let payload;

        if (section === "HeaderTopLeftBar") {

            payload = {
                section: section,
                item: [
                    {
                        item_ContactId: formData.item_ContactId,
                        item_Title: formData.item_Title,
                        item_Icone: formData.item_Icone,
                        item_IconeUrl: formData.item_IconeUrl,
                    }
                ]
            };
        } else if (section === "HeaderTopRightBar") {

            payload = {
                section: section,
                item: [
                    {
                        item_ContactId: formDataRight.item_ContactIdRight,
                        item_Title: formDataRight.item_TitleRight,
                        item_Icone: formDataRight.item_IconeRight,
                        item_IconeUrl: formDataRight.item_IconeUrlRight,
                    }
                ]
            };
        }


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/683e90debc43f5b825e98d4a`;
            const fetchData = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const responseJson = await fetchData.json();

            if (fetchData.ok) {
                alert("Succesfully")
            }
            // setFormData(initialState);
            console.log(responseJson);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='-mt-22 w-full  '>

            <Box
                sx={{ bgcolor: 'background.paper', display: 'flex', pt: 15, }}
            >
                <div className="pb-5" >
                    {/* <h1 className='bg-cyan-300' >Header Customize Manu</h1> */}
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 2, borderColor: 'divider', minWidth: 200, height: 400 }}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#f6f0f0"
                            }
                        }}
                    >
                        <Tab sx={{
                            textTransform: 'none',
                            bgcolor: value === 0 ? '#3105c2' : 'transparent',
                            color: value === 0 ? 'black' : 'white',
                            borderRadius: 1,

                        }}

                            label="Email Section" {...a11yProps(0)}
                        />

                        <Tab sx={{
                            bgcolor: value === 1 ? '#3105c2' : 'transparent',
                            color: value === 1 ? 'black' : 'white',
                            borderRadius: 1,
                            textTransform: 'none',
                        }} label="Center Iocne" {...a11yProps(1)} />

                        <Tab sx={{
                            textTransform: 'none',
                            bgcolor: value === 2 ? '#3105c2' : 'transparent',
                            color: value === 2 ? 'black' : 'white',
                            borderRadius: 1,
                        }} label="Support Section" {...a11yProps(2)} />

                        <Tab sx={{
                            textTransform: 'none',
                            bgcolor: value === 3 ? '#3105c2' : 'transparent',
                            opacity: 1,
                            color: value === 3 ? 'black' : 'white',
                            borderRadius: 1,
                        }} label="Site Logo" {...a11yProps(3)} />

                        <Tab sx={{
                            textTransform: 'none',
                        }} label=" Site Menu List" {...a11yProps(4)} />
                        <Tab sx={{ textTransform: 'none', }} label="Item Six" {...a11yProps(5)} />
                        <Tab sx={{ textTransform: 'none', }} label="Item Seven" {...a11yProps(6)} />

                    </Tabs>
                </div>

                <TabPanel sx={{ width: '100%' }} value={value} index={0}>
                    <HeaderTopLeft formData={formData} setFormData={setFormData} submitHandler={submitHandler} />
                </TabPanel>

                <TabPanel sx={{ width: '100%' }} value={value} index={1}>
                    <HeaderTopBarCenterIcon />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <HeaderTopRight formDataRight={formDataRight} setFormDataRight={setFormDataRight} submitHandler={submitHandler} />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <NavbarLogo />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <NavbarListItem />
                </TabPanel>

                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>

                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>

            </Box>
        </div>
    );
}
