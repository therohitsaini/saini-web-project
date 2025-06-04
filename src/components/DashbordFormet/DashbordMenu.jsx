import { Fragment, useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material';
import { Icon as IconifyIcon } from "@iconify/react";
import { menuItem } from '../JsData/menuItemData.json'
import { Link, useLocation } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UserTable from './UserTable';
import { AnimatedCard_, Sidebar } from '../../StyledComponents/StyledComp';
import { useSelector } from 'react-redux';
import WelcomeUserModal from '../../ModalComponent/WelcomeUserModal';
import UserTableNew from './UserTableNew';



function DashbordMenu() {

    const [menuWidth, setMenuWidth] = useState(true)
    const [menuBtnHover, setMenuBtnHover] = useState()
    const [componnet, setComponets] = useState()
    const [welcomePop, setWelcomePop] = useState()
    const [userInformation, setUserInformation] = useState("")


    // const userDetails = useSelector((state) => state.fullName.data.username)

    // useEffect(() => {
    //     if (userDetails) {
    //         localStorage.setItem("user-Name", userDetails);
    //     }
    // }, [userDetails]);

    // useEffect(() => {
    //     const getUser = localStorage.getItem("user-Name");
    //     setUserInformation(getUser);
    // }, []);


    // console.log("userDetails", userDetails)




    return (
        <Fragment>
            {/* <WelcomeUserModal userDetails={userDetails} /> */}
            <div className='flex bg-black'>

                <Sidebar menuWidth={menuWidth} className={`side-men      sticky top-0  h-screen shadow-sm shadow-black/30 `}>
                    <div className=' h-full z-10 duration-500 bg-black  w-full   px-3 border-r border-slate-50/20'>
                        <div className={`flex  items-center   gap-2 mb-10 h-17 border-b border-slate-50/20  ${menuWidth ? "justify-center" : ""} `}>

                            <img className='h-10 w-10 ml-2' src='../src/assets\dashboard.png' />
                            <p className={` text-white font-semibold text-xl   ${menuWidth ? " hidden " : ""} `} >Corpex</p>

                        </div>

                        <p className={` text-slate-600 font-semibold text-[14px]  ${menuWidth ? " hidden " : ""} `} >Main item</p>
                        {
                            menuItem?.map((item_, index) => {

                                return (
                                    <Link to={item_.routes} >
                                        <ul onClick={() => setComponets(item_.componnet)} key={index} className={`ul-list flex w-full border border-slate-100/30 hover:bg-slate-500/20 hover:scale-95 bg-slate-200/20 rounded-md   duration-900  items-center ${menuWidth ? "flex-col p-2 my-2 gap-1 " : "p-3 my-2 gap-2"}`}>
                                            <IconifyIcon className='text-white text-2xl duration-500' icon={item_.menuIcon} ></IconifyIcon>
                                            <li className={`text-slate-400  w-full font-semibold   ${menuWidth ? "text-[10px] flex justify-center" : "text-[16px]"}`}>{item_.menuTitle}</li>
                                        </ul>
                                    </Link>
                                )
                            })
                        }
                    </div>

                </Sidebar>

                <div className='main w-full'>
                    <header className='header  h-17 sticky top-0 bg-black px-10 border border-b-slate-50/20 z-30'>
                        <nav className='nav-bar bg-black w-full flex items-center justify-between  h-full '>
                            <icon className="icone-toggle text-white flex items-center gap-2 text-xl">
                                <p onClick={() => setMenuWidth(!menuWidth)} className='hover:bg-slate-200/20 duration-500 h-10 w-10 rounded-full flex items-center justify-center'><DehazeIcon sx={{ fontSize: 25 }} /></p>
                                <h1 className=''>DASHBORD</h1>
                            </icon>

                            <div className='nav-right flex items-center text-white gap-2'>

                                <p className='flex items-center gap-2'>
                                    {/* <Avatar sx={{ bgcolor: 'cyan' }}>N</Avatar> */}
                                    <Avatar sx={{ bgcolor: "", }} src="https://img.freepik.com/premium-vector/vector-businessman-avatar-circle_106427-379.jpg?uid=R167309508&ga=GA1.1.548591987.1746426012&semt=ais_hybrid&w=740" />
                                    <p className='text-slate-500 font-semibold flex '>
                                        {userInformation ? userInformation : "Johan Devil"}
                                        <ArrowDropDownIcon sx={{ color: "white" }} />
                                    </p>
                                </p>

                                <Button variant="contained" href="/home" sx={{

                                    '&.MuiButtonBase-root': {
                                        backgroundColor: '#edf3f3',
                                        color: 'black',
                                        transition: 'background-color 0.5s ease ,color 0.5s ease',
                                        '&:hover': {
                                            backgroundColor: '#09409a',
                                            color: "white",
                                        },
                                    },
                                }}>
                                    Visit Our Web Site
                                </Button>

                            </div>
                        </nav>
                    </header>
                    {/* <div className=' h-[1000px] w-full'> */}
                    {/* {componnet} */}
                    <UserTable />
                    {/* <UserTableNew /> */}
                    {/* </div> */}
                </div>

            </div>

        </Fragment>
    )
}

export default DashbordMenu






