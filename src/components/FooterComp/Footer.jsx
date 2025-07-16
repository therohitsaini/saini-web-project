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
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { allFaMdIconsMap } from '../NavbarComponent/HeaderTopLeft';

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

// Fallback data for block tag cloud when API data is not available
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




// Fallback data for contact info when API data is not available
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
const Footer = ({ footerData }) => {

    const [facebookHover, setFacebookHover] = useState(false)

    const backGroundColor_Image = footerData?.FooterBackground?.backgroundColor
    const footerHelpCenterForm = footerData?.FooterHelpCenter
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
    
    console.log("Transformed contact data:", contactInfoToRender);

    const images = [
        "../src/assets/image-1.png", "../src/assets/image-2.png", "../src/assets/image-3.png", "../src/assets/image-4.png", "../src/assets/image-5.png"
    ]

    return (
        <Fragment>
            <Box sx={{ width: "100%", }}>
                <div className='footer-container h-screen relative bg-[backGroundColor_Image] '>
                    {/* <img className='asets-img object-cover h-full w-full' src='../src/assets/footer-bg.jpg'></img> */}
                    <div className='footer-data h-full w-full absolute top-0 bg-black/60 px-25 flex flex-col justify-center gap-2'>
                        <div className='footer-branding  grid grid-cols-5   gap-5 py-10'>
                            {
                                images.map((imgUrl_, index) => {
                                    return (
                                        <div key={index} className='img-wrraper border border-slate-300  h-23 flex justify-center items-center' >
                                            <img className='object-cover' src={imgUrl_} />
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className='footer-help-center h-45  rounded-full bg-black/40 grid grid-cols-2 p-5 gap-4'>
                            <div className='box-1 bg-[#df442d]  rounded-l-[100px] rounded-r-[19px] flex items-center  p-2 py-3 pl-0'>
                                <div className='img-help h-25  w-full  relative   mr-6'>
                                    <img className='object-cover h-full w-full rounded-l-[100px] rounded-r-[19px]' src='../src/assets/businesswoman-looking-away-while-sitting-cafe_1048944-12388088.png' ></img>
                                    <div className='h-full w-full rounded-l-[100px] bg-black/60 absolute top-0 flex justify-center items-center rounded-r-[19px]'>
                                        <div className=' w-96 h-15  flex gap-5 items-center justify-center'>
                                            <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${facebookHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                                <div onMouseOver={() => setFacebookHover(true)} onMouseLeave={() => setFacebookHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${facebookHover ? "bg-red-500 " : "bg-white"}`}>
                                                    <HeadphonesIcon sx={{ color: facebookHover ? "white" : "#db3125", fontSize: 23 }} />
                                                </div>

                                            </div>
                                            <p className='flex flex-col'>
                                                <span className='w-full font-bold text-[#df442d]'>
                                                    {/* Have a Doubt We Can Help */}{footerHelpCenterForm?.leftSection.title
                                                    }
                                                </span>
                                                <span className='footer-text hover:text-[#df442d] w-full font-bold text-white '>
                                                    {/* Boot For Consultation */}{footerHelpCenterForm?.leftSection.subtitle
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='box-1 bg-[#df442d]  rounded-r-[100px] rounded-l-[19px] flex items-center p-2 pr-0 '>
                                <div className='img-help h-25  w-full  relative  ml-6 rounded-l-[19px]'>
                                    <img className='object-cover h-full w-full rounded-r-[100px] rounded-l-[19px]' src='https://img.freepik.com/premium-photo/morning-inspiration-close-up-image-pensive-young-woman-holding-coffee-cup-looking-away-while-sitting-her-working-place-rough-wooden-table_425904-13861.jpg?uid=R167309508&ga=GA1.1.1036802377.1749109170&semt=ais_hybrid&w=740' ></img>
                                    <div className='h-full w-full rounded-r-[100px] rounded-l-[19px] bg-black/60 absolute top-0 flex justify-center items-center'>
                                        <div className=' w-96 h-15 rounded-l-[19px]  flex gap-5 items-center justify-center'>

                                            <p className='flex flex-col'>
                                                <span className='w-full font-bold text-[#df442d]'>
                                                  {footerHelpCenterForm?.rightSection.title
                                                    }
                                                </span>
                                                <span className='w-full font-bold text-white hover:text-[#df442d] '>
                                                   {footerHelpCenterForm?.rightSection.subtitle
                                                    }
                                                </span>
                                            </p>
                                            <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${facebookHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                                <div onMouseOver={() => setFacebookHover(true)} onMouseLeave={() => setFacebookHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${facebookHover ? "bg-red-500 " : "bg-white"}`}>
                                                    <CloudIcon sx={{ color: facebookHover ? "white" : "#db3125", fontSize: 23 }} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='footer-main  w-full my-5 h-96 gap-5 grid grid-cols-4'>
                            <div className='footer-contact  '>
                                <img src={footerContact?.logo || '../src/assets/logo-light (1).png'} />
                                <p className='text-footer font-bold text-white my-3' > {footerContact?.description || "cozipress we talk destination we shine across your organization to fully understand....! ."} .</p>
                                <div className='flex gap-3'>
                                    {
                                        (footerContact?.icons || footerIcone)?.map((item_, index) => {
                                            // Use dynamic icon system for FooterContact icons
                                            if (footerContact?.icons) {
                                                const IconComponent = allFaMdIconsMap[item_.icon];
                                                return (
                                                    <div key={index} className={`icon-linkdin h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${facebookHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                                        <div onMouseOver={() => setFacebookHover(true)} onMouseLeave={() => setFacebookHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${facebookHover ? "bg-red-500 " : "bg-white"}`}>
                                                            {IconComponent ? (
                                                                <IconComponent size={20} className={`${facebookHover ? "text-white" : "text-red-700"}  duration-500`} />
                                                            ) : (
                                                                <Icon fontSize={20} className={`${facebookHover ? "text-white" : "text-red-700"}  duration-500`} icon={item_.icon} />
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
                                <div className='categories p-2 bg-black/50 text-white font-bold text-xl px-3 border-r-2 border-[#df442d] mb-2' >{ footerCategories?.categoryName || "Categories"}</div>
                                <div className='flex flex-col gap-3'>
                                    {/* Debug info */}
                                    <div style={{color: 'red', fontSize: '10px'}}>
                                        Debug: {(footerCategories?.listItem || fallbackCategories)?.length || 0} items
                                    </div>
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
            </Box>
        </Fragment>
    )
}

export default Footer