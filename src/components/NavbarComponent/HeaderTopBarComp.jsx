import React, { useState } from 'react'
import { Fragment } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { allFaMdIcons_ } from './HeaderTopLeft';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export const HeaderTopBarComp = ({ headerData }) => {
    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)

    const iconName = headerData?.item_Icone;
    const IconComponent = allFaMdIcons_[iconName];
    // console.log("IconComponent", IconComponent)
    return (
        <Fragment >
            <div className='contact-section grid grid-cols-3 inset-0   p-3   w-full'>
                <div className='mail-section flex gap-2 items-center w-70'>

                    <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
                        <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>

                            {IconComponent ? (
                                <IconComponent color={hoverEmailIsTure ? "white" : "red"} size={20} />
                            ) : (
                                <span>?</span>
                            )}

                        </div>
                    </div>

                    <div className='mail-section text-white  font-semibold'>
                        <h1 className='heading text-white text-[18px]'>{headerData?.item_Title}</h1>
                        <Link className='text-[16px]' to={"#"} >{headerData?.item_ContactId}</Link>
                    </div>
                </div>


            </div>
        </Fragment>
    )
}





export const HeaderTopBarCompRightContent = ({ headerData }) => {
    const [hoverEmailIsTure, setHoverEmailIsTure] = useState(false)
    const allFaMdIcons_ = {
        ...MdIcons,
        ...FaIcons,
    };

    const iconName = headerData?.item_Icone;
    const IconComponent = allFaMdIcons_[iconName];
    console.log("IconComponent_____", headerData)
    return (
        <Fragment >
            <div className='contact-section grid grid-cols-3 inset-0   p-3   w-full'>
                <div className='mail-section flex gap-2 items-center w-70'>

                    <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 ${hoverEmailIsTure ? "bg-red-600/40" : "bg-white/50"}`}>
                        <div onMouseOver={() => setHoverEmailIsTure(true)} onMouseLeave={() => setHoverEmailIsTure(false)} className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm ${hoverEmailIsTure ? "bg-red-500 " : "bg-white"}`}>
                            {/* <Icon color={hoverEmailIsTure ? "white" : "red"} icon={headerData?.item_Icone} /> */}
                            {IconComponent ? (
                                <IconComponent color={hoverEmailIsTure ? "white" : "red"} size={20} />
                            ) : (
                                <span>?</span>
                            )}
                        </div>
                    </div>


                    <div className='mail-section text-white  font-semibold'>
                        <h1 className='heading text-white text-[18px]'>{headerData?.item_Title}</h1>
                        <Link className='text-[16px]' to={"#"} >{headerData?.item_ContactId}</Link>
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
                <Icon fontSize={18} color={hoverEmailIsTure ? "white" : "red"} icon={item?.item_Icone} />
            </div>
        </div>
    )

}