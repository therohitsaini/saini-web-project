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
import { allFaMdIcons_ } from './HeaderTopLeft';

const headerTopBarDefualt = [
    {
        section: "HeaderTopLeftBar",
        item: [
            {
                item_Title: "Gmail Address",
                item_ContactId: "email@gmail.com",
                item_Icone: "ic:outline-email",
                item_IconeUrl: "",
              

            }
        ],

    },
    {
        section: "HeaderTopBarCenterIcon",
        item: [
            {
                item_Title: "",
                item_Icone: "ri:facebook-fill",
                item_IconeUrl: ""

            },
            {
                item_Title: "Customer Support",
                item_Icone: "iconoir:instagram",
                item_IconeUrl: "",

            }, {
                item_Title: "Customer Support",
                item_Icone: "mingcute:twitter-line",
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
                item_Icone: "tdesign:call-1",
                item_IconeUrl: "",

            }
        ],

    },
]

function Navbar({ headerData }) {

    const [searchHover, setSearchHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    const [searchBarIsTrue, setSearchBarIsTrue] = useState(false)


    const sectionData = headerData.headerTopBar?.find(sec => sec.section === "HeaderCartIcone");
    const sectionDataSearch = headerData.headerTopBar?.find(sec => sec.section === "HeaderSerchIcone");


    // console.log("headerData", headerData)

    return (
        <Fragment>
            <NavSearchModalComp searchBarIsTrue={searchBarIsTrue} setSearchBarIsTrue={setSearchBarIsTrue} />
            <header className='header p-2 w-full px-20   flex flex-col   z-50'>
                <div className="w-full    grid grid-cols-3   ">


                    <div className=" w-full">
                        {
                            (headerData.headerTopBar ? headerData.headerTopBar : headerTopBarDefualt)?.find(sec => sec.section === "HeaderTopLeftBar")
                                ?.item.map((item, index) => {
                                    // const isTrue = item?.item_ShowOnWebsite
                                    console.log("headerTopBarDefualt__________T", headerTopBarDefualt)
                                    return (
                                        // isTrue && (
                                            <HeaderTopBarComp key={index} headerData={item} />
                                        // )
                                    )
                                })
                        }

                    </div>

                    {/* <div className="w-full">
                        {
                            (
                                (() => {
                                    // Get section from backend
                                    const backendSection = headerData?.headerTopBar?.find(sec => sec.section === "HeaderTopLeftBar");
                                    const backendItems = backendSection?.item?.filter(item => item?.item_ShowOnWebsite);

                                    // If backend has at least one valid item => use it
                                    if (backendItems && backendItems.length > 0) {
                                        return backendItems.map((item, index) => (
                                            <HeaderTopBarComp key={`left-backend-${index}`} headerData={item} />
                                        ));
                                    }

                                    // Else: fallback to default section
                                    const defaultSection = headerTopBarDefualt?.find(sec => sec.section === "HeaderTopLeftBar");
                                    const defaultItems = defaultSection?.item?.filter(item => item?.item_ShowOnWebsite);

                                    return defaultItems?.map((item, index) => (
                                        <HeaderTopBarComp key={`left-default-${index}`} headerData={item} />
                                    ));
                                })()
                            )
                        }
                    </div> */}


                    <div className="w-full flex justify-center items-center gap-4">
                        {
                            (headerData.headerTopBar ? headerData.headerTopBar : headerTopBarDefualt)
                                ?.find(sec => sec.section === "HeaderTopBarCenterIcon")
                                ?.item.map((item, index) => (
                                    <HeaderTopBarCenterIcone item={item} />
                                ))}
                    </div>


                    <div className="w-full pl-55">
                        {
                            (headerData.headerTopBar ? headerData.headerTopBar : headerTopBarDefualt)?.find(sec => sec.section === "HeaderTopRightBar")
                                ?.item.map((item, index) => (
                                    <HeaderTopBarCompRightContent key={index} item_={item} />

                                ))
                        }
                    </div>

                </div>

                <div className='bg-black/70'>
                    <nav className='navbar   flex items-center justify-between  p-3 py-5 '>
                        <div className='nav-logo h-10 w-50  '>
                            <img className='h-full w-full object-contain ' src="../src/assets/logo-light (1).png" alt="not found" />
                        </div>
                        <div className='un-order-list flex items-center gap-5'>
                            {
                                (headerData.headerTopBar)?.find((sec) => sec.section === "NavManuItem")?.item.map((item_, index) => {
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
                                    const IconComponent = allFaMdIcons_[iconName];

                                    return (
                                        <div key={index} className={`icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 ${searchHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                            <div
                                                // onClick={() => setSearchBarIsTrue(!searchBarIsTrue)}
                                                onMouseOver={() => setSearchHover(true)}
                                                onMouseLeave={() => setSearchHover(false)}
                                                className={`icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl ${searchHover ? "bg-red-500" : "bg-white"}`}
                                            >
                                                {IconComponent ? (
                                                    <IconComponent
                                                        color={searchHover ? "white" : "red"} size={18}
                                                    />
                                                ) : (
                                                    <span></span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}



                            {
                                sectionData?.item?.map((item_, index) => {
                                    const iconName = item_?.item_Icone;
                                    const IconComponent = allFaMdIcons_[iconName];


                                    return (
                                        <div key={index} className={`icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 ${cartHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                            <div
                                                // onClick={() => setSearchBarIsTrue(!searchBarIsTrue)}
                                                onMouseOver={() => setCartHover(true)}
                                                onMouseLeave={() => setCartHover(false)}
                                                className={`icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl ${cartHover ? "bg-red-500" : "bg-white"}`}
                                            >
                                                {IconComponent ? (
                                                    <IconComponent
                                                        color={cartHover ? "white" : "red"} size={18}
                                                    />
                                                ) : (
                                                    <span>Get Start</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                            {
                                (headerData.headerTopBar)?.find((sec) => sec.section === "navButton")?.item.map((item_, _) => {
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
                        (headerData.headerTopBar)?.find((sec) => sec.section === "HeaderButtomHirring")?.item.map((item_, index_) => {
                            const iconName = item_?.item_Icone;
                            const IconComponent = allFaMdIcons_[iconName];

                            console.log("item_.item_Paragraph", item_)
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
                        (headerData.headerTopBar)?.find((sec) => sec.section === "HeaderButtomBar")?.item.map((item_, index_) => {
                            const iconName = item_?.item_Icone;
                            const IconComponent = allFaMdIcons_[iconName];
                            console.log("item_", IconComponent)
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