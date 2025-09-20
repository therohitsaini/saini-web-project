import { Box, height, width } from '@mui/system'
import React, { useState } from 'react'
import { Fragment } from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CloudIcon from '@mui/icons-material/Cloud';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Icone, { ButtonComponent, ContactComponent, FooterArrow } from '../IconeComp/Icone';
import { Icon } from '@iconify/react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { allFaMdIconsMap } from '../NavbarComponent/HeaderTopLeft';
import { Link } from 'react-router-dom';
import Image1 from "../../assets/image-1.png"
import Image2 from "../../assets/image-2.png"
import Image3 from "../../assets/image-3.png"
import Image4 from "../../assets/image-4.png"
import Image5 from "../../assets/image-5.png"
// import WebLogo from "../src/assets/logo-light(1).png"
import defaultLogo from '../../assets/logo-light (1).png';



export const footerIcone = [
    {
        icone: "bxl:instagram",
    },
    {
        icone: "ei:sc-facebook",
    },
    {
        icone: "simple-line-icons:social-twitter",
    },
    {
        icone: "akar-icons:linkedin-v2-fill",
    },
    {
        icone: "entypo-social:pinterest"
    }

]
// Fallback data for categories when API data is not available
const fallbackCategories = [
    "Business",
    "Uncategorized",
    "Marketing",
    "Project",
    "Technology"
]

const fallbackBlockTagCloud = [
    "Accessory",
    "Business",
    "Great",
    "Marketing",
    "Product",
    "Quality",
    "Skills",
    "Technology",
    "Terminology",
    "Travel"
]




const fallbackContactInfo = [
    {
        icone: "MdEditLocation",
        heading: "Location",
        paragraph: "32 Race, Beverly Hills, California, Us"
    },
    {
        icone: "MdCall",
        heading: "Phone",
        paragraph: "9929306874"
    },
    {
        icone: "MdEmail",
        heading: "Email",
        paragraph: "email@company.com"
    }
]

// Fallback data for footer help center when API data is not available
const fallbackHelpCenterData = {
    leftSection: {
        title: "Have a Doubt We Can Help",
        subtitle: "Boot For Consultation",
        icone: "MdHeadphones",
        image: "https://img.freepik.com/premium-photo/morning-inspiration-close-up-image-pensive-young-woman-holding-coffee-cup-looking-away-while-sitting-her-working-place-rough-wooden-table_425904-13861.jpg?uid=R167309508&ga=GA1.1.1036802377.1749109170&semt=ais_hybrid&w=740"

    },
    rightSection: {
        title: "Need Support?",
        subtitle: "Get Professional Help",
        icone: "MdCloud",
        image: "https://img.freepik.com/premium-photo/morning-inspiration-close-up-image-pensive-young-woman-holding-coffee-cup-looking-away-while-sitting-her-working-place-rough-wooden-table_425904-13861.jpg?uid=R167309508&ga=GA1.1.1036802377.1749109170&semt=ais_hybrid&w=740"
    }
}

// Add this new component after the existing imports
const ChevronButton = () => {
    return (
        <div className="relative inline-block">
            {/* Main red button with shadow/glow effect */}
            <div className="relative bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full px-6 py-3 shadow-lg">
                {/* Inner shadow/glow effect */}
                <div className="absolute inset-0 bg-red-400 rounded-full opacity-30 blur-sm"></div>

                {/* Main content */}
                <div className="relative flex items-center justify-center space-x-1">
                    {/* First chevron */}
                    <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>

                    {/* Second chevron */}
                    <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const defaultFooterCopyRightApi = {
    copyrightText: "Copyright © 2023 Corpex | Powered Corpex",
    poweredByText: "Corpex",
    section: "copyright",
    paymentIcons: [
        {
            id: 1,
            name: "Payment 1",
            icon: "FaCcApplePay",
            url: "",
            isActive: true,
        },
        {
            id: 1752921912261,
            name: "visa",
            icon: "FaCcVisa",
            url: "",
            isActive: true,
        },
    ],
};


const Footer = ({ footerData, footerCopyRightApies }) => {

    const [iconHover, setIconHover] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [right, setRight] = useState(null)

    const footerBackground = footerData?.FooterBackground
    const footerHelpCenterForm = footerData?.FooterHelpCenter || fallbackHelpCenterData
    const footerMain = footerData?.data?.footerMain
    const footerContact = footerData?.FooterContact

    const footerCategories = footerData?.FooterCategories?.[0]
    const footerBlockTagCloud = footerData?.FooterTags?.[0]

    const footerContactUs = footerData.FooterRightContact


    const transformContactData = (contactData) => {
        if (!contactData) return fallbackContactInfo;

        const transformed = [];

        if (contactData.call) {
            transformed.push({
                icone: contactData.call.icon || "MdCall",
                heading: contactData.call.call || "Call",
                paragraph: contactData.call.contactNumber || "9929306874"
            });
        }

        if (contactData.email) {
            transformed.push({
                icone: contactData.email.icon || "MdEmail",
                heading: contactData.email.email || "Email",
                paragraph: contactData.email.emailId || "email@gmail.com"
            });
        }

        if (contactData.location) {
            transformed.push({
                icone: contactData.location.icon || "MdEditLocation",
                heading: contactData.location.location || "Location",
                paragraph: contactData.location.address || "32 Race, Beverly Hills, California, Us"
            });
        }

        return transformed.length > 0 ? transformed : fallbackContactInfo;
    };

    const contactInfoToRender = transformContactData(footerContactUs);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        return `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${imagePath.replace(/^\/?/, '')}`;
    };



    const footerTopBar = footerData?.FooterTopBar || fallbackHelpCenterData;
    const footerSponsors = footerData?.FooterSponsors;

    /**
     * Sponsors image here 
     */

    const fallbackSponsorImages = [
        Image1, Image2, Image3, Image4, Image5
    ];




    const getSponsorImages = () => {
        if (footerSponsors) {

            const sponsorImages = [
                footerSponsors.sponsorsOne,
                footerSponsors.sponsorsTwo,
                footerSponsors.sponsorsThree,
                footerSponsors.sponsorsFour,
                footerSponsors.sponsorsFive
            ].filter(img => img && img.trim() !== '');

            if (sponsorImages.length > 0) {
                return sponsorImages.map(img => getImageUrl(img));
            }
        }
        return fallbackSponsorImages;
    };

    const sponsorImagesToDisplay = getSponsorImages();

    const getBackgroundStyle = () => {
        const color = footerBackground?.backgroundColor;
        const image = footerBackground?.backgroundImage;


        const getFullImageUrl = (img) => {
            if (!img) return null;
            return img.startsWith('http')
                ? img
                : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${img.replace(/^\/?/, '')}`;
        };


        if (color && color !== "#ffffff" && color !== "transparent") {
            return {
                backgroundColor: color,
            };
        }


        if (image) {
            return {
                backgroundImage: `url(${getFullImageUrl(image)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            };
        }


        return {
            backgroundImage: 'url(/src/assets/footer-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };
    };



    const data = footerCopyRightApies || defaultFooterCopyRightApi;


    return (
        <Fragment>
            <Box sx={{ width: "100%", }}>
                <div className='footer-container h-screen relative' style={getBackgroundStyle()}>
                    <div className='footer-data h-full w-full absolute top-0 bg-black/60 px-25 flex flex-col justify-center gap-2'>
                        <div className='footer-branding  grid grid-cols-5   gap-5 py-10'>
                            {
                                sponsorImagesToDisplay.map((imgUrl_, index) => {
                                    return (
                                        <div key={index} className='img-wrraper border border-slate-300  h-23 flex justify-center items-center' >
                                            <img className='object-cover' src={imgUrl_} />
                                        </div>
                                    )
                                })
                            }

                        </div>

                        {/* Example usage of the chevron buttons */}
                        <div className='flex justify-center items-center gap-4 py-4'>
                            {/* <ChevronButton />
                            <TabChevronButton /> */}
                        </div>

                        <div className='footer-help-center h-45  rounded-full bg-black/40 grid grid-cols-2 p-5 gap-4'>
                            {/* Left Section */}
                            <div className='box-1 bg-[#df442d]  rounded-l-[100px] rounded-r-[19px] flex items-center  p-2 py-3 pl-0'>
                                <div className='img-help h-25  w-full  relative   mr-6'>
                                    <img
                                        className='object-cover h-full w-full rounded-l-[100px] rounded-r-[19px]'
                                        src={footerTopBar.leftSection.image ? getImageUrl(footerTopBar.leftSection.image) : fallbackHelpCenterData.leftSection.image}
                                        alt="Help Center Left"
                                    />
                                    <div className='h-full w-full rounded-l-[100px] bg-black/60 absolute top-0 flex justify-center items-center rounded-r-[19px]'>
                                        <div className=' w-96 h-15  flex gap-5 items-center justify-center'>
                                            <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${iconHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                                <div onMouseOver={() => setIconHover(true)} onMouseLeave={() => setIconHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${iconHover ? "bg-red-500 " : "bg-white"}`}>
                                                    {allFaMdIconsMap[footerTopBar.leftSection.icone] ?
                                                        React.createElement(allFaMdIconsMap[footerTopBar.leftSection.icone], { style: { color: iconHover ? "white" : "#db3125", fontSize: 23 } }) :
                                                        <HeadphonesIcon sx={{ color: iconHover ? "white" : "#db3125", fontSize: 23 }} />
                                                    }
                                                </div>
                                            </div>
                                            <p className='flex flex-col'>
                                                <span className='w-full font-bold text-[#df442d]'>
                                                    {footerTopBar.leftSection.title || fallbackHelpCenterData.leftSection.title}
                                                </span>
                                                <span className='footer-text hover:text-[#df442d] w-full font-bold text-white '>
                                                    {footerTopBar.leftSection.subTitle || fallbackHelpCenterData.leftSection.subtitle}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right Section */}
                            <div className='box-1 bg-[#df442d]  rounded-r-[100px] rounded-l-[19px] flex items-center p-2 pr-0 '>
                                <div className='img-help h-25  w-full  relative  ml-6 rounded-l-[19px]'>
                                    <img
                                        className='object-cover h-full w-full rounded-r-[100px] rounded-l-[19px]'
                                        src={footerTopBar.rightSection.image ? getImageUrl(footerTopBar.rightSection.image) : fallbackHelpCenterData.rightSection.image}
                                        alt="Help Center Right"
                                    />
                                    <div className='h-full w-full rounded-r-[100px] rounded-l-[19px] bg-black/60 absolute top-0 flex justify-center items-center'>
                                        <div className=' w-96 h-15 rounded-l-[19px]  flex gap-5 items-center justify-center'>
                                            <p className='flex flex-col'>
                                                <span className='w-full font-bold text-[#df442d]'>
                                                    {footerTopBar.rightSection.title || fallbackHelpCenterData.rightSection.title}
                                                </span>
                                                <span className='w-full font-bold text-white hover:text-[#df442d] '>
                                                    {footerTopBar.rightSection.subTitle || fallbackHelpCenterData.rightSection.subtitle}
                                                </span>
                                            </p>
                                            <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${right ? "bg-red-600/40" : "bg-white/50"}`}>
                                                <div onMouseOver={() => setRight(true)} onMouseLeave={() => setRight(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${right ? "bg-red-500 " : "bg-white"}`}>
                                                    {allFaMdIconsMap[footerTopBar.rightSection.icone] ?
                                                        React.createElement(allFaMdIconsMap[footerTopBar.rightSection.icone], { style: { color: right ? "white" : "#db3125", fontSize: 23 } }) :
                                                        <CloudIcon sx={{ color: right ? "white" : "#db3125", fontSize: 23 }} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='footer-main  w-full my-5 h-96 gap-5 grid grid-cols-4'>
                            <div className='footer-contact  '>
                                <img src={footerContact?.logo ? getImageUrl(footerContact.logo) : defaultLogo} />
                                <p className='text-footer font-bold text-white my-3' > {footerContact?.description || "cozipress we talk destination we shine across your organization to fully understand....! ."} .</p>
                                <div className='flex gap-3'>
                                    {
                                        (footerContact?.icons || footerIcone)?.map((item_, index) => {

                                            if (footerContact?.icons) {
                                                const IconComponent = allFaMdIconsMap[item_.icon];
                                                return (
                                                    <div key={index} className={`icon-linkdin h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoveredIndex ? "bg-red-600/40" : "bg-white/50"}`}>
                                                        <div onMouseOver={() => setHoveredIndex(true)} onMouseLeave={() => setHoveredIndex(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoveredIndex ? "bg-red-500 " : "bg-white"}`}>
                                                            {IconComponent ? (
                                                                <IconComponent size={20} className={`${hoveredIndex ? "text-white" : "text-red-700"}  duration-500`} />
                                                            ) : (
                                                                <Icon fontSize={20} className={`${hoveredIndex ? "text-white" : "text-red-700"}  duration-500`} icon={item_.icon} />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                // Fallback to original Icone component
                                                return (
                                                    <Icone key={index} item_={item_.icone} />
                                                );
                                            }
                                        }) || []
                                    }
                                </div>

                            </div>

                            <div className='categories-main '>
                                <div className='categories p-2 bg-black/50 text-white font-bold text-xl px-3 border-r-2 border-[#df442d] mb-2' >{footerCategories?.categoryName || "Categories"}</div>
                                <div className='flex flex-col gap-3'>
                                    {/* Debug info */}
                                    {/* <div style={{ color: 'red', fontSize: '10px' }}>
                                        Debug: {(footerCategories?.listItem || fallbackCategories)?.length || 0} items
                                    </div> */}
                                    {
                                        (footerCategories?.listItem || fallbackCategories)?.map((categoryItem, index) => (
                                            <FooterArrow
                                                key={index}
                                                listItem_={categoryItem}
                                                KeyboardDoubleArrowRightIcon={KeyboardDoubleArrowRightIcon}
                                            />
                                        )) || []
                                    }
                                </div>
                            </div>
                            <div className='block-tag-cloud ' >
                                <div className='block p-2 bg-black/50 text-white font-bold text-xl px-3 border-r-2 border-[#df442d] mb-2' > {footerBlockTagCloud?.FooterTagesName || "Block Tag Cloud"}</div>
                                <div className='button-wrraper flex flex-wrap gap-2'>
                                    {/* Debug info */}
                                    {/* <div style={{color: 'red', fontSize: '10px', width: '100%'}}>
                                        Debug: {(footerBlockTagCloud?.listItem || fallbackBlockTagCloud)?.length || 0} items
                                    </div> */}
                                    {
                                        (footerBlockTagCloud?.listItem || fallbackBlockTagCloud)?.map((tagItem, index) => (
                                            <ButtonComponent key={index} item_={tagItem} />
                                        )) || []
                                    }

                                </div>
                            </div>
                            <div className='contact flex flex-col gap-3'>
                                <div className='block  p-2 bg-black/50 text-white font-bold text-xl px-3 border-r-2 border-[#df442d] mb-2' >Contact Us</div>
                                {
                                    contactInfoToRender?.map((item_, index) => <ContactComponent key={index} Icone_Contact={item_.icone} heading={item_.heading} paragraph={item_.paragraph} />) || []
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyRIgth  h-20 w-full bg-black  flex items-center justify-between px-20 text-white'>
                    <div className="flex justify-between  items-center gap-2 w-full">
                        {/* Copyright Text */}
                        <div className="flex items-center gap-2 text-white font-semibold">
                            <span>
                                {
                                    // Show text before "|"
                                    data?.copyrightText?.split('|')[0]?.trim()
                                }
                            </span>
                            <span>| Powered By</span>
                            <span className="text-orange-600 underline">
                                <Link to="#">
                                    {data?.poweredByText || defaultFooterCopyRightApi.poweredByText}
                                </Link>
                            </span>
                        </div>

                        {/* Payment Icons */}
                        <div className="flex gap-3 mt-1">
                            {(data?.paymentIcons || defaultFooterCopyRightApi.paymentIcons).map((item) => {
                                if (!item.isActive || !item.icon) return null;

                                const IconComponent = allFaMdIconsMap[item.icon];
                                return (
                                    <div key={item.id} title={item.name}>
                                        {IconComponent && (
                                            <IconComponent className="text-white text-2xl" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>
            </Box>
        </Fragment>
    )
}

export default Footer