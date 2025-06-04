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

function Navbar() {

    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)
    const [hoverCustomerSupport, setHoverCustomerSupport] = useState(false)
    const [facebookHover, setFacebookHover] = useState(false)
    const [twitterHover, setTwitterHover] = useState(false)
    const [instagramHover, setInstagramHover] = useState(false)
    const [linkdinHover, setLinkdinHover] = useState(false)
    const [pintHover, setPintHover] = useState(false)
    const [searchHover, setSearchHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    const [searchBarIsTrue, setSearchBarIsTrue] = useState(false)

    //[opacity-50 bg-transparent ]
    return (
        <Fragment>
            <NavSearchModalComp searchBarIsTrue={searchBarIsTrue} setSearchBarIsTrue={setSearchBarIsTrue} />
            <header className='header p-2 w-full px-20   flex flex-col fixed z-40'>
                <div className='contact-section grid grid-cols-3 inset-0   p-3'>

                    <div className='mail-section flex gap-2 items-center '>
                        <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>
                                <MailOutlineIcon sx={{ color: hoverEmailIsTure ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className='mail-section text-white  font-semibold'>
                            <h1 className='heading text-white text-[18px]'>Email Address</h1>
                            <Link className='text-[16px]' to={"#"} >email@company.com</Link>
                        </div>
                    </div>

                    <div className='social-icon-section flex gap-4 justify-center'>
                        <div className={`icon-fecebook h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${facebookHover ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setFacebookHover(true)} onMouseLeave={() => setFacebookHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${facebookHover ? "bg-red-500 " : "bg-white"}`}>
                                <FacebookIcon sx={{ color: facebookHover ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className={`icon-rwitter h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${twitterHover ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setTwitterHover(true)} onMouseLeave={() => setTwitterHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${twitterHover ? "bg-red-500 " : "bg-white"}`}>
                                <TwitterIcon sx={{ color: twitterHover ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className={`icon-instagram h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${instagramHover ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setInstagramHover(true)} onMouseLeave={() => setInstagramHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${instagramHover ? "bg-red-500 " : "bg-white"}`}>
                                <InstagramIcon sx={{ color: instagramHover ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${pintHover ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setPintHover(true)} onMouseLeave={() => setPintHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${pintHover ? "bg-red-500 " : "bg-white"}`}>
                                <PinterestIcon sx={{ color: pintHover ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className={`icon-linkdin h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${linkdinHover ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setLinkdinHover(true)} onMouseLeave={() => setLinkdinHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${linkdinHover ? "bg-red-500 " : "bg-white"}`}>
                                <LinkedInIcon sx={{ color: linkdinHover ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                    </div>

                    <div className='customer-sport-section flex gap-2 items-center justify-end'>
                        <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverCustomerSupport ? "bg-red-600/40" : "bg-white/50"}`}>
                            <div onMouseOver={() => setHoverCustomerSupport(true)} onMouseLeave={() => setHoverCustomerSupport(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverCustomerSupport ? "bg-red-500 " : "bg-white"}`}>
                                <CallIcon sx={{ color: hoverCustomerSupport ? "white" : "#db3125", fontSize: 23 }} />
                            </div>
                        </div>

                        <div className='mail-section  text-white  font-semibold '>
                            <h1 className='heading text-white text-[18px]'>Customer Support</h1>
                            <Link className='text-[16px]' to={"#"} >7097597570</Link>

                        </div>
                    </div>

                </div>
                <div className='bg-black/70'>
                    <nav className='navbar   flex items-center justify-between  p-3 py-5 '>
                        <div className='nav-logo h-10 w-50  '>
                            <img className='h-full w-full object-contain ' src="http://127.0.0.1:5500/corpex-html/assets/images/logo-light.png" alt="not found" />
                        </div>
                        <div className='un-order-list flex items-center gap-5'>
                            <ul className='text-white flex gap-5 font-semibold text-[17px]'>

                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >Home</Link> </li>
                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >About Us</Link> </li>
                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >Page</Link> </li>
                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >Service</Link> </li>
                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >Blog</Link> </li>
                                <li><Link to={"/home"} className='hover:text-orange-700 duration-700' >Contact</Link> </li>

                            </ul>
                            <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${searchHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                <div onClick={() => setSearchBarIsTrue(!searchBarIsTrue)} onMouseOver={() => setSearchHover(true)} onMouseLeave={() => setSearchHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl   ${searchHover ? "bg-red-500 " : "bg-white"}`}>
                                    <SearchIcon sx={{ color: searchHover ? "white" : "#db3125", fontSize: 23, }} />
                                </div>
                            </div>

                            <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${cartHover ? "bg-red-600/40" : "bg-white/50"}`}>
                                <div onMouseOver={() => setCartHover(true)} onMouseLeave={() => setCartHover(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl   ${cartHover ? "bg-red-500 " : "bg-white"}`}>
                                    <Badge color="secondary" sx={{ color: cartHover ? "white" : "#db3125", fontSize: 23 }} badgeContent={0}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </div>
                            </div>

                            <div className='nav-quate-btn  h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-white/20'>
                                <button class="relative inline-block h-full w-full font-semibold text-white bg-orange-600 overflow-hidden group rounded-l-3xl rounded-r-xl">
                                    <span class="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">Get a Ouate</span>
                                    <span class="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
                                </button>
                            </div>

                        </div>
                    </nav>
                </div>
                <div className='time-section grid grid-cols-2 bg-orange-700 p-3'>
                    <div className='hiring-section flex gap-2 text-white items-center'>
                        <CampaignIcon sx={{ color: "white", fontSize: 28 }} />
                        <h1 className='font-semibold text-[18px]'>Hiring:</h1>
                        <p className='font-sans'>Lorem ipsum is simply dummy text.</p>
                    </div>
                    <div className='time flex gap-1 text-white justify-end items-center'>
                        <AvTimerIcon sx={{ color: "white", fontSize: 23 }} />
                        <h1 className='font-semibold text-[17px]'> Opening Hours:</h1>
                        <p className='font-sans text-[16px] ml-2' >Mon-sat 9:00 am to 8:00 pm</p>


                    </div>

                </div>
            </header>



        </Fragment>
    )
}

export default Navbar