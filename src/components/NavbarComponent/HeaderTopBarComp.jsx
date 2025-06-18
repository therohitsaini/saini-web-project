import React, { useState } from 'react'
import { Fragment } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export const HeaderTopBarComp = ({ data }) => {
    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)
    console.log("data", data)
    return (
        <Fragment >
            <div className='contact-section grid grid-cols-3 inset-0   p-3   w-full'>
                <div className='mail-section flex gap-2 items-center w-70'>

                    <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
                        <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>
                            <Icon  color={hoverEmailIsTure ? "white" : "red"} icon={data?.item_Icone} />
                        </div>
                    </div>

                    <div className='mail-section text-white  font-semibold'>
                        <h1 className='heading text-white text-[18px]'>{data?.item_Title}</h1>
                        <Link className='text-[16px]' to={"#"} >{data?.item_ContactId}</Link>
                    </div>
                </div>



            </div>
        </Fragment>
    )
}

export const HeaderTopBarCompRightContent = ({ data }) => {
    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)
    console.log("data", data)
    return (
        <Fragment >
            <div className='contact-section grid grid-cols-3 inset-0   p-3   w-full'>
                <div className='mail-section flex gap-2 items-center w-70'>

                    <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
                        <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>
                            <Icon color={hoverEmailIsTure ? "white" : "red"} icon={data?.item_Icone} />
                        </div>
                    </div>


                    <div className='mail-section text-white  font-semibold'>
                        <h1 className='heading text-white text-[18px]'>{data?.item_Title}</h1>
                        <Link className='text-[16px]' to={"#"} >{data?.item_ContactId}</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export const HeaderTopBarCenterIcone = ({ item }) => {
    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)
    return (
        <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
            <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>
                <Icon color='red' icon={item?.item_Icone} />
            </div>
        </div>
    )

}