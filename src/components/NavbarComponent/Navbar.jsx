import { Fragment, useState } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavSearchModalComp from '../../ModalComponent/NavSearchModalComp';
import SwipeComp from '../SwiperCrowsal/SwiperComp';
import CampaignIcon from '@mui/icons-material/Campaign';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Icone from '../IconeComp/Icone';
import { footerIcone } from '../FooterComp/Footer';
import { HeaderTopBarComp, HeaderTopBarCenterIcone, HeaderTopBarCompRightContent } from './HeaderTopBarComp';
import { Icon } from '@iconify/react/dist/iconify.js';
import { allFaMdIconsMap } from './HeaderTopLeft';
import defaultLogo from '../../assets/logo-light (1).png';


const headerTopBarDefualt = [
    {
        section: "HeaderTopLeftBar",
        item: [
            {
                item_Title: "Gmail Address",
                item_ContactId: "email@gmail.com",
                item_Icone: "MdEmail",
                item_IconeUrl: "",
                item_ShowOnWebsite: true

            }
        ],

    },
    {
        section: "HeaderTopBarCenterIcon",
        item: [
            {
                item_Title: "",
                item_Icone: "FaFacebookF",
                item_IconeUrl: ""

            },
            {
                item_Title: "Customer Support",
                item_Icone: "FaInstagram",
                item_IconeUrl: "",

            },
            {
                item_Title: "Customer Support",
                item_Icone: "FaTwitter",
                item_IconeUrl: "",

            },
            {
                item_Title: "Customer Support",
                item_Icone: "FaLinkedinIn",
                item_IconeUrl: "",

            }

        ],

    },
    {
        section: "HeaderTopRightBar",
        item: [
            {
                item_Title: "Customer Support",
                item_ContactId: "9929306874",
                item_Icone: "MdCall",
                item_IconeUrl: "",

            }
        ],



    },
    {
        section: "NavManuItem",
        item: [
            {
                item_Title: "Home",
                item_IconeUrl: "/home",

            },
            {
                item_Title: "About Us",
                item_IconeUrl: "/home",

            }, {
                item_Title: "Page",
                item_IconeUrl: "/home",

            }, {
                item_Title: "Service",
                item_IconeUrl: "/home",

            }, {
                item_Title: "Blog",
                item_IconeUrl: "/home",

            }
        ]
    },
    {
        section: "HeaderSerchIcone",
        item: [
            {

                item_Icone: "MdOutlineSearch",
                item_IconeUrl: "",

            }
        ],
    },
    {
        section: "HeaderCartIcone",
        item: [
            {
                item_Icone: "MdOutlineShoppingCart",
                item_IconeUrl: "",

            }
        ],
    },
    {
        section: "navButton",
        item: [
            {
                item_Title: "Get Started",

            }
        ],
    },
    {
        section: "HeaderButtomHirring",
        item: [
            {
                item_Title: "Get Hirring",
                item_Icone: "FaSpeakerDeck",
                item_IconeUrl: "lorem ipsum is dummy text",

            }
        ],
    },
    {
        section: "HeaderButtomBar",
        item: [
            {
                item_Title: "Opening Time",
                item_ContactId: "10:00",
                item_Icone: "MdOutlineWatchLater",
                item_IconeUrl: "6:00",

            }
        ],
    },
    {
        section: "Logo",
        item: [
            {


                item_IconeUrl: "http://127.0.0.1:5500/corpex-html/assets/images/logo-light.png",

            }
        ],
    },
]

function Navbar({ headerData }) {

    const [searchHover, setSearchHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    const [searchBarIsTrue, setSearchBarIsTrue] = useState(false)
    const emailSection = headerData.headerTopBar?.find(sec => sec.section === "HeaderTopLeftBar") || headerTopBarDefualt.find(sec => sec.section === "HeaderTopLeftBar")
    const iconeCenterSection = headerData.headerTopBar?.find(sec => sec.section === "HeaderTopBarCenterIcon") || headerTopBarDefualt.find(sec => sec.section === "HeaderTopBarCenterIcon")
    const supportSection = headerData.headerTopBar?.find(sec => sec.section === "HeaderTopRightBar") || headerTopBarDefualt.find(sec => sec.section === "HeaderTopRightBar")
    const menuSection = headerData.headerTopBar?.find(sec => sec.section === "NavManuItem") || headerTopBarDefualt.find(sec => sec.section === "NavManuItem")
    const sectionData = headerData.headerTopBar?.find(sec => sec.section === "HeaderCartIcone") || headerTopBarDefualt.find(sec => sec.section === "HeaderCartIcone")
    const sectionDataSearch = headerData.headerTopBar?.find(sec => sec.section === "HeaderSerchIcone") || headerTopBarDefualt.find(sec => sec.section === "HeaderSerchIcone");
    const navButton = headerData.headerTopBar?.find(sec => sec.section === "navButton") || headerTopBarDefualt.find(sec => sec.section === "navButton");
    const bottomHeaderLeft = headerData.headerTopBar?.find(sec => sec.section === "HeaderButtomHirring") || headerTopBarDefualt.find(sec => sec.section === "HeaderButtomHirring");
    const bottomHeaderRight = headerData.headerTopBar?.find(sec => sec.section === "HeaderButtomBar") || headerTopBarDefualt.find(sec => sec.section === "HeaderButtomBar");
    const HeaderLogo = headerData.headerTopBar?.find(sec => sec.section === "Logo") || headerTopBarDefualt.find(sec => sec.section === "Logo");



    // console.log("headerData", HeaderLogo.item)

    return (
        <Fragment>
            <NavSearchModalComp searchBarIsTrue={searchBarIsTrue} setSearchBarIsTrue={setSearchBarIsTrue} />
            <header className='header p-2 w-full px-20   flex flex-col   z-50'>
                <div className="w-full    grid grid-cols-3   ">


                    <div className=" w-full">
                        {

                            emailSection?.item.map((item, index) => {
                                const isTrue = item?.item_ShowOnWebsite
                                return (
                                    isTrue && (
                                        <HeaderTopBarComp key={index} headerData={item} />
                                    )
                                )
                            })
                        }

                    </div>

                    <div className="w-full flex justify-center items-center gap-4">
                        {

                            iconeCenterSection?.item.map((item, index) => (
                                <HeaderTopBarCenterIcone item={item} />
                            ))}
                    </div>


                    <div className="w-full pl-55">
                        {
                            supportSection?.item.map((item, index) => (
                                <HeaderTopBarCompRightContent key={index} item_={item} />
                            ))
                        }
                    </div>

                </div>

                <div className='bg-black/70'>
                    <nav className='navbar   flex items-center justify-between  p-3 py-5 '>
                        <div className='nav-logo h-10 w-50'>
                            {
                                HeaderLogo?.item.length > 0 ? HeaderLogo.item.map((logo, index) => {
                                    let imgSrc;

                                    // If URL is absolute
                                    if (logo?.item_IconeUrl?.startsWith('http')) {
                                        imgSrc = logo.item_IconeUrl;

                                        // If it's a relative path from backend
                                    } else if (logo?.item_IconeUrl) {
                                        imgSrc = `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${logo.item_IconeUrl?.replace(/^\/?/, '')}`;

                                        // If no usable path, use local fallback image
                                    } else {
                                        imgSrc = defaultLogo;
                                    }

                                    return (
                                        <img
                                            key={index}
                                            className="h-full w-full object-cover"
                                            src={imgSrc}
                                            alt="Logo"
                                        />
                                    );
                                }) : (
                                    // fallback if HeaderLogo.item is empty
                                    <img
                                        className="h-full w-full object-cover"
                                        src={defaultLogo}
                                        alt="Default Logo"
                                    />
                                )
                            }
                        </div>

                        <div className='un-order-list flex items-center gap-5'>
                            {
                                menuSection?.item.map((item_, index) => {
                                    return (
                                        <ul key={index} className='text-white flex gap-5 font-semibold text-[17px]'>
                                            <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >{item_ ? item_.item_Title : "HOME"}</Link> </li>
                                        </ul>
                                    )
                                })
                            }


                            {
                                sectionDataSearch?.item?.map((item_, index) => {
                                    const iconName = item_?.item_Icone;
                                    const IconComponent = allFaMdIconsMap[iconName];

                                    return (
                                        <div key={index} className={`icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 ${searchHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                            <div
                                                onClick={() => setSearchBarIsTrue(!searchBarIsTrue)}
                                                onMouseOver={() => setSearchHover(true)}
                                                onMouseLeave={() => setSearchHover(false)}
                                                className={`icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl ${searchHover ? "bg-red-500" : "bg-white"}`}
                                            >
                                                {IconComponent && <IconComponent color={searchHover ? "white" : "red"} size={18} />}
                                            </div>
                                        </div>
                                    );
                                })
                            }


                            {
                                sectionData?.item?.map((item_, index) => {
                                    const iconName = item_?.item_Icone;
                                    const IconComponent = allFaMdIconsMap[iconName];


                                    return (
                                        <div key={index} className={`icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 ${cartHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                            <div
                                                // onClick={() => setSearchBarIsTrue(!searchBarIsTrue)}
                                                onMouseOver={() => setCartHover(true)}
                                                onMouseLeave={() => setCartHover(false)}
                                                className={`icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl ${cartHover ? "bg-red-500" : "bg-white"}`}
                                            >
                                                {
                                                    IconComponent && (
                                                        <IconComponent
                                                            color={cartHover ? "white" : "red"} size={18}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    );
                                })}

                            {
                                navButton?.item.map((item_, _) => {
                                    return (
                                        <div className='nav-quate-btn  h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-white/20'>
                                            <button class="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
                                                <span class="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">{item_.item_Title || "Get Start"}</span>
                                                <span class="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
                                            </button>
                                        </div>
                                    )
                                })

                            }


                        </div>
                    </nav>
                </div>
                <div className='time-section grid grid-cols-2 bg-[#de442c] p-3'>

                    {
                        bottomHeaderLeft?.item.map((item_, index_) => {
                            const iconName = item_?.item_Icone;
                            const IconComponent = allFaMdIconsMap[iconName];

                            return (
                                < div key={index_} className='hiring-section flex gap-2 text-white items-center'>
                                    {IconComponent ? (
                                        <IconComponent
                                            color="white" size={18}
                                        />
                                    ) : (
                                        <span>?</span>
                                    )}
                                    <h1 className='font-semibold text-[18px]'>{item_.item_Title}:</h1>
                                    <p className='font-sans'>{item_.item_IconeUrl}</p>
                                </div>
                            )
                        })

                    }
                    {
                        bottomHeaderRight?.item.map((item_, index_) => {
                            const iconName = item_?.item_Icone;
                            const IconComponent = allFaMdIconsMap[iconName];

                            return (
                                < div key={index_} className='time flex gap-1 text-white justify-end items-center'>
                                    {IconComponent ? (
                                        <IconComponent
                                            color="white" size={18}
                                        />
                                    ) : (
                                        <span>?</span>
                                    )}
                                    <h1 className='font-semibold text-[17px]'> {item_.item_Title} :</h1>
                                    <p className='font-sans text-[16px] ml-2' >Mon-sat {item_.item_ContactId} am to {item_.item_IconeUrl} pm</p>


                                </div>
                            )
                        })

                    }



                </div>
            </header >
        </Fragment >
    )
}

export default Navbar