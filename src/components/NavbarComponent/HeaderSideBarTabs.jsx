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
import { CartSection, HeaderButtomBar, HeaderButtomLeft, NavbarListItem, NavBarSearchSection, NavButton_Profile } from './HeaderNavbarCustomizer/NavbarComponents';
import NavbarLogo from './HeaderNavbarCustomizer/NavbarComponents';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';


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
    {
        value: 4,
        label: "Site Menu List"
    },
    {
        value: 5,
        label: "Site Search"
    },
    {
        value: 6,
        label: "Site Cart"
    },
    {
        value: 7,
        label: "Site Button"
    },
    {
        value: 8,
        label: "Herring Section"
    },
    {
        value: 9,
        label: "Opening Hour"
    }
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

export default function HeaderSideBarTabs() {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const initialState = {
        item_ContactId: "",
        item_Title: "",
        item_Icone: "",
        item_IconeUrl: "",
        item_ShowOnWebsite: true

    }

    const initialStateRight = {
        item_ContactIdRight: "",
        item_TitleRight: "",
        item_IconeRight: "",
        item_IconeUrlRight: ""
    }
    const [formData, setFormData] = useState(initialState);
    const [formDataRight, setFormDataRight] = useState(initialStateRight)
    const [iconFields, setIconFields] = useState([
        {
            menuItem: '',
            menuItemRoute: ''
        }
    ]);

    const [iconeCenter, setIconeCenter] = useState(
        [{
            item_Center_Name: "",
            item_Center_Icone: "",
            item_Center_Icone_Path: "",
        }]
    )

    const [headerButtom, setHeaderButtom] = useState(
        {
            item_Icone: "",
            item_Title: "",
            openingTime: "",
            closeTimnig: ""
        }
    )

    const [headerButtomLeft, setHeaderButtomLeft] = useState(
        {
            item_Icone: "",
            item_Title: "",
            item_Paragraph: ""
        }
    )

    const [searchIcone, setSearchIcone] = useState(
        { item_SearchIcone: "" }
    )
    const [cartIcone, setCartIcone] = useState(
        { item_CartIcone: "" }
    )

    const [headerButton, setHeaderButton] = useState({
        buttonText: ""
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);

    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);


    useEffect(() => {

        if (headerToBarData?.headerData?.headerTopBar?.length > 0) {
            const topLeft = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopLeftBar"
            )?.item[0];

            const topRight = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopRightBar"
            )?.item[0];

            const topCenter = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderTopBarCenterIcon"
            )?.item;




            setFormData((pre) => ({

                ...pre,
                item_Title: topLeft?.item_Title || "",
                item_ContactId: topLeft?.item_ContactId || "",
                item_Icone: topLeft?.item_Icone || "",
                item_IconeUrl: topLeft?.item_IconeUrl || "",

            }))

            setFormDataRight((pre) => ({

                ...pre,
                item_TitleRight: topRight?.item_Title || "",
                item_ContactIdRight: topRight?.item_ContactId || "",
                item_IconeRight: topRight?.item_Icone || "",
                item_IconeUrlRight: topRight?.item_IconeUrl || "",

            }))

            const mapCenterIcone = topCenter.map((icone) => ({
                item_Center_Name: icone.item_Title || "",
                item_Center_Icone_Path: icone.item_IconeUrl || "",
                item_Center_Icone: icone.item_Icone || ""
            }))
            setIconeCenter(mapCenterIcone)


            const navBarListItem = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "NavManuItem"
            )?.item;

            const mappedMenuItems = navBarListItem?.map(data => ({
                menuItem: data.item_Title || '',
                menuItemRoute: data.item_IconeUrl || '',
            }));

            setIconFields(mappedMenuItems)


            const navSearchIcone = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderSerchIcone"
            )?.item[0];

            setSearchIcone((pre) => ({
                ...pre,
                item_SearchIcone: navSearchIcone?.item_Icone || ""

            }))

            const navCartIcone = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderCartIcone"
            )?.item;


            setCartIcone((pre) => ({
                ...pre,
                item_CartIcone: navCartIcone?.item_Icone || ""

            }))


            const navButton = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "navButton"
            )?.item;

            setHeaderButton((pre) => ({
                ...pre,
                buttonText: navButton?.item_Title || ""
            }))

            const headerBottomLeft = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderButtomHirring"
            )?.item[0];

            setHeaderButtomLeft((pre) => ({
                ...pre,
                item_Icone: headerBottomLeft?.item_Icone || "",
                item_Title: headerBottomLeft?.item_Title || "",
                item_Paragraph: headerBottomLeft?.item_IconeUrl || ""
            }))

            const headerBottomRight = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "HeaderButtomBar"
            )?.item[0];

            setHeaderButtom((pre) => ({
                ...pre,
                item_Icone: headerBottomRight.item_Icone || "",
                item_Title: headerBottomRight.item_Title || "",
                openingTime: headerBottomRight.item_ContactId || "",
                closeTimnig: headerBottomRight.item_IconeUrl || ""

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
                        item_ShowOnWebsite: formData.item_ShowOnWebsite
                    }
                ]
            };
        }
        else if (section === "HeaderTopBarCenterIcon") {
            payload = {
                section: section,
                item: iconeCenter?.map(field => ({
                    item_Title: field.item_Center_Name,
                    item_IconeUrl: field.item_Center_Icone_Path,
                    item_Icone: field.item_Center_Icone
                }))
            }
        }
        else if (section === "HeaderTopRightBar") {

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
        } else if (section === "NavManuItem") {
            payload = {
                section: section,
                item: iconFields.map(field => ({
                    item_Title: field.menuItem,
                    item_IconeUrl: field.menuItemRoute
                }))
            };
        }
        else if (section === "HeaderSerchIcone") {
            payload = {
                section: section,
                item: [
                    {
                        item_Icone: searchIcone.item_SearchIcone
                    }
                ]
            };
        }
        else if (section === "HeaderCartIcone") {
            payload = {
                section: section,
                item: [
                    {
                        item_Icone: cartIcone.item_CartIcone
                    }
                ]
            };
        }
        else if (section === "navButton") {
            payload = {
                section: section,
                item: [
                    {
                        item_Title: headerButton.buttonText
                    }
                ]
            };
        }
        else if (section === "HeaderButtomHirring") {
            payload = {
                section: section,
                item: [
                    {
                        item_Icone: headerButtomLeft.item_Icone,
                        item_Title: headerButtomLeft.item_Title,
                        item_IconeUrl: headerButtomLeft.item_Paragraph

                    }
                ]
            };
        }
        else if (section === "HeaderButtomBar") {
            payload = {
                section: section,
                item: [
                    {
                        item_Icone: headerButtom.item_Icone,
                        item_Title: headerButtom.item_Title,
                        item_ContactId: headerButtom.openingTime,
                        item_IconeUrl: headerButtom.closeTimnig

                    }
                ]
            };
        }

        //HeaderButtomHirring {
        //     item_Icone: "",
        //     item_Title: "",
        //     item_Paragraph: ""
        // }

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

        } catch (error) {
            console.log(error);
        }
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
    );


    return (
        <div className=' w-full  '>

            <Box
                sx={{ bgcolor: 'background.paper', display: 'flex', }}
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
                            top: 120,

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

                <TabPanel sx={{ width: '100%' }} value={value} index={0}>
                    <HeaderTopLeft formData={formData} setFormData={setFormData} submitHandler={submitHandler} />
                </TabPanel>

                <TabPanel sx={{ width: '100%' }} value={value} index={1}>
                    <HeaderTopBarCenterIcon

                        setIconeCenter={setIconeCenter}
                        iconeCenter={iconeCenter}
                        submitHandler={submitHandler}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}

                    />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <HeaderTopRight

                        formDataRight={formDataRight}
                        setFormDataRight={setFormDataRight}
                        submitHandler={submitHandler}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}

                    />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <NavbarLogo />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <NavbarListItem submitHandler={submitHandler} setIconFields={setIconFields} iconFields={iconFields} />
                </TabPanel>

                <TabPanel value={value} index={5}>
                    <NavBarSearchSection

                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}
                        searchIcone={searchIcone}
                        setSearchIcone={setSearchIcone}
                        submitHandler={submitHandler}

                    />
                </TabPanel>

                <TabPanel value={value} index={6}>
                    <CartSection

                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}
                        submitHandler={submitHandler}
                        cartIcone={cartIcone}
                        setCartIcone={setCartIcone}
                    />
                </TabPanel>

                <TabPanel value={value} index={7}>
                    <NavButton_Profile
                        submitHandler={submitHandler}
                        headerButton={headerButton}
                        setHeaderButton={setHeaderButton}
                    />
                </TabPanel>

                <TabPanel value={value} index={8}>
                    <HeaderButtomLeft

                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}
                        setHeaderButtomLeft={setHeaderButtomLeft}
                        headerButtomLeft={headerButtomLeft}
                        submitHandler={submitHandler}

                    />
                </TabPanel>

                <TabPanel value={value} index={9}>
                    <HeaderButtomBar
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIcons={allFaMdIcons}
                        setHeaderButtom={setHeaderButtom}
                        headerButtom={headerButtom}
                        submitHandler={submitHandler} />
                </TabPanel>

            </Box>
        </div>
    );
}
