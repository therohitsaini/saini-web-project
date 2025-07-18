import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HeaderTopLeft, { allFaMdIconsMap } from './HeaderTopLeft';
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
import { useMemo } from 'react';
import { useSnackbar } from '../Snakbar/Snakbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const [userIDMain, setUserIDMain] = useState()
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
    const [loading, setLoading] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [file, setFile] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        setUserIDMain(userID)

    }, [dispatch])


    useEffect(() => {
        const userID = localStorage.getItem("user-ID")
        dispatch(getHeaderData(userID));
    }, [dispatch]);

    const headerToBarData = useSelector((state) => state.getHeaderDataReducer_);

    const snackbar = useSnackbar();
    if (!snackbar) {
        console.warn("Snackbar context is missing.");
        return null; // or render fallback UI
    }   
    const { showSnackbar } = snackbar;


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

            const mapCenterIcone = topCenter?.map((icone) => ({
                item_Center_Name: icone?.item_Title || "",
                item_Center_Icone_Path: icone?.item_IconeUrl || "",
                item_Center_Icone: icone?.item_Icone || ""
            }))
            setIconeCenter(mapCenterIcone)


            const navBarListItem = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "NavManuItem"
            )?.item;

            const mappedMenuItems = navBarListItem?.map(data => ({
                id: data._id || data.id,
                menuItem: data.item_Title || '',
                menuItemRoute: data.item_IconeUrl || '',
            }));
            // console.log("LIISTID", headerToBarData.headerData.headerTopBar)
            // console.log("mappedMenuItems", mappedMenuItems)

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
            )?.item[0];


            setCartIcone((pre) => ({
                ...pre,
                item_CartIcone: navCartIcone?.item_Icone || ""

            }))


            const navButton = headerToBarData.headerData.headerTopBar.find(
                (section) => section.section === "navButton"
            )?.item[0];

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
                item_Icone: headerBottomRight?.item_Icone || "",
                item_Title: headerBottomRight?.item_Title || "",
                openingTime: headerBottomRight?.item_ContactId || "",
                closeTimnig: headerBottomRight?.item_IconeUrl || ""

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

        setLoading(true)

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/${userIDMain}`;
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
                setLoading(false)
            } else {
                toast.error(responseJson.message || 'Failed to update data!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating data!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        }
    };


    // LOGO API 




    const submitHandler_ = async (section) => {
        const id = localStorage.getItem("user-ID");
        const formData = new FormData();

        formData.append("section", section);

        if (section === "Logo") {
            if (file) {
                formData.append("imageLogo", file);
            }
        }

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/logo/logo/${id}`;

            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || 'Logo uploaded successfully!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(result.message || 'Failed to upload logo!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            console.error("Submit error:", err);
            toast.error('An error occurred while uploading logo!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };




    const allFaMdIconsList = Object.entries(allFaMdIconsMap).map(([name, Icon]) => ({
        label: name,
        Icon,
    }));

    const [selectedIcon, setSelectedIcon] = useState(
        allFaMdIconsList.find((i) => i.label === formData?.item_Icone) || null
    );

    const [inputValue, setInputValue] = useState('');
    const filteredIcons = useMemo(() => {
        const term = inputValue.trim().toLowerCase();
        if (!term) return allFaMdIconsList.slice(0, 50); // default first 50
        return allFaMdIconsList
            .filter((icon) => icon.label.toLowerCase().includes(term))
            .slice(0, 100); // limit to 100 max
    }, [inputValue]);


    const deleteListItem = async (data = {}) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {

            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/delete-dyanamic-data/`;
            const fetchData = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data.id, pageId: userIDMain })
            });
            const response = await fetchData.json();

            if (fetchData.ok) {
                setRefresh(prev => !prev);
            }

        } catch (error) {
            console.error(error);
        }
    }

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
                    <HeaderTopLeft

                        formData={formData}
                        setFormData={setFormData}
                        submitHandler={submitHandler}
                        loading={loading}
                        setLoading={setLoading}
                    />


                </TabPanel>

                <TabPanel sx={{ width: '100%' }} value={value} index={1}>
                    <HeaderTopBarCenterIcon

                        setIconeCenter={setIconeCenter}
                        iconeCenter={iconeCenter}
                        submitHandler={submitHandler}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIconsList={allFaMdIconsList}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        loading={loading}

                    />
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <HeaderTopRight

                        formDataRight={formDataRight}
                        setFormDataRight={setFormDataRight}
                        submitHandler={submitHandler}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIconsList={allFaMdIconsList}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        loading={loading}

                    />
                </TabPanel>

                <TabPanel value={value} index={3}>
                    <NavbarLogo
                        setFile={setFile}
                        setText={setText}
                        handleSubmitLogo={submitHandler_}
                        file={file}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={value} index={4}>
                    <NavbarListItem
                        submitHandler={submitHandler}
                        setIconFields={setIconFields}
                        iconFields={iconFields}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={value} index={5}>
                    <NavBarSearchSection
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        searchIcone={searchIcone}
                        setSearchIcone={setSearchIcone}
                        submitHandler={submitHandler}
                        allFaMdIconsList={allFaMdIconsList}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        loading={loading}

                    />
                </TabPanel>

                <TabPanel value={value} index={6}>
                    <CartSection

                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIconsList={allFaMdIconsList}
                        submitHandler={submitHandler}
                        cartIcone={cartIcone}
                        setCartIcone={setCartIcone}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={value} index={7}>
                    <NavButton_Profile
                        submitHandler={submitHandler}
                        headerButton={headerButton}
                        setHeaderButton={setHeaderButton}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={value} index={8}>
                    <HeaderButtomLeft

                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIconsList={allFaMdIconsList}
                        setHeaderButtomLeft={setHeaderButtomLeft}
                        headerButtomLeft={headerButtomLeft}
                        submitHandler={submitHandler}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        loading={loading}

                    />
                </TabPanel>

                <TabPanel value={value} index={9}>
                    <HeaderButtomBar
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        allFaMdIconsList={allFaMdIconsList}
                        setHeaderButtom={setHeaderButtom}
                        headerButtom={headerButtom}
                        submitHandler={submitHandler}
                        filteredIcons={filteredIcons}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        loading={loading}
                    />

                </TabPanel>

            </Box>
            <ToastContainer />
        </div>
    );
}
