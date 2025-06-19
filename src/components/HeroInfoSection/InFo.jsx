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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getHeaderData } from '../../Store/ApisStore/ApisCollection';

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
    const [value, setValue] = useState(0);
    const [inFoService, setInFoService] = useState(
        { inFoHeading: "", inFoDescription: "", inFoIcone: "" }
    )

    const [inFoSupport, setInFoSupport] = useState(
        { inFoHeading: "", inFoDescription: "", inFoIcone: "" }
    )

    const [inFoExprince, setInFoExprince] = useState(
        { inFoHeading: "", inFoDescription: "", inFoIcone: "" }
    )


    const dispatch = useDispatch()
    const inFoDataRedux = useSelector((state) => state.getHeaderDataReducer_);

    useEffect(() => {
        dispatch(getHeaderData());
    }, [dispatch]);
    // console.log("inFO", inFoData)

    useEffect(() => {
        if (inFoDataRedux?.headerData?.inFoData?.length > 0) {
            const serviceLeft = inFoDataRedux.headerData.inFoData.find((section) => section.section === "ServiceInFo")?.inFoItem[0]
            const suppoortCenter = inFoDataRedux.headerData.inFoData.find((section) => section.section === "InFoSupport")?.inFoItem[0]
            const ExprinceRight = inFoDataRedux.headerData.inFoData.find((section) => section.section === "InFoExperiens")?.inFoItem[0]



            setInFoService((pre) => ({
                pre,
                inFoHeading: serviceLeft.inFoHeading || "",
                inFoDescription: serviceLeft.inFoDescription || "",
                inFoIcone: serviceLeft.inFoIcone || ""

            }))

            setInFoSupport((pre) => ({
                pre,
                inFoHeading: suppoortCenter.inFoHeading || "",
                inFoDescription: suppoortCenter.inFoDescription || "",
                inFoIcone: suppoortCenter.inFoIcone || ""

            }))

            setInFoExprince((pre) => ({
                pre,
                inFoHeading: ExprinceRight.inFoHeading || "",
                inFoDescription: ExprinceRight.inFoDescription || "",
                inFoIcone: ExprinceRight.inFoIcone || ""

            }))

        }


    }, [inFoDataRedux])




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


    const infoHandler = async (section) => {
        let payload;


        if (section === "ServiceInFo") {

            payload = {
                section: section,
                inFoItem: [
                    {
                        inFoHeading: inFoService.inFoHeading,
                        inFoDescription: inFoService.inFoDescription,
                        inFoIcone: inFoService.inFoIcone
                    }
                ]
            }
        }

        else if (section === "InFoSupport") {

            payload = {
                section: section,
                inFoItem: [
                    {
                        inFoHeading: inFoSupport.inFoHeading,
                        inFoDescription: inFoSupport.inFoDescription,
                        inFoIcone: inFoSupport.inFoIcone
                    }
                ]
            }
        }
        else if (section === "InFoExperiens") {

            payload = {
                section: section,
                inFoItem: [
                    {
                        inFoHeading: inFoExprince.inFoHeading,
                        inFoDescription: inFoExprince.inFoDescription,
                        inFoIcone: inFoExprince.inFoIcone
                    }
                ]
            }
        }


        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/update-info/683e90debc43f5b825e98d4a`;
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
            console.log("Internal Error", error)
        }

    }



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
                    <ServiceInFo setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} inFoService={inFoService} setInFoService={setInFoService} infoHandler={infoHandler} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InFoSupport setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} inFoSupport={inFoSupport} setInFoSupport={setInFoSupport} infoHandler={infoHandler} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <InFoExperiens setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} allFaMdIcons={allFaMdIcons} inFoExprince={inFoExprince} setInFoExprince={setInFoExprince} infoHandler={infoHandler} />
                </TabPanel>

            </div>
        </Box>
    );
}
