import React, { Fragment, useState } from 'react'
import Navbar from '../NavbarComponent/Navbar'
import SwipeComp from '../SwiperCrowsal/SwiperComp'
import GroupsIcon from '@mui/icons-material/Groups';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function HeroSection() {
    const infoData = [
        {
            inFo_title: "Trusted Secvices",
            inFo_paragraph: "We Have Trusted Customers",
            inFo_Icone: GroupsIcon
        },
           {
            inFo_title: "24/7 Support",
            inFo_paragraph: "7097597570",
            inFo_Icone: HeadphonesIcon
        },
           {
            inFo_title: "Well Experienced",
            inFo_paragraph: "10 Year Of Experience",
            inFo_Icone: EmojiEventsIcon
        }
    ]

    return (
        <Fragment>

            <div className='mb-25'>
                <SwipeComp />
                <div className='info-section  -mt-15 z-20 absolute  w-full' >
                    <div className='info-card-section   grid grid-cols-3 gap-5 px-20'>
                        {
                            infoData.map((item_, index_) => {
                                const Icon = item_.inFo_Icone;
                                return (
                                    <div key={index_} className='info-1 shadow-balck shadow-2xl bg-white h-30 relative ' >
                                        <img className=' object-cover h-full w-full' src='../src/assets/photorealistic-earth-planet_23-2151075927.avif' />
                                        <div className='data-container h-full w-full absolute  top-0 bg-white hover:bg-black/60 duration-1000 flex px-10 group'>
                                            <div className='service-info  flex flex-col justify-center gap-1 w-[60%] '>
                                                <h1 className='info-text text-2xl font-semibold text-[#de442c]'>{item_.inFo_title}</h1>
                                                <h1 className='info-text text-sm  font-stretch-10% text-slate-600 group-hover:text-white duration-700'>{item_.inFo_paragraph}</h1>

                                            </div>
                                            <div className='service-info-icone  p-2 w-[40%] flex justify-center items-center'>

                                                <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 bg-orange-600/40`}>
                                                    <div
                                                        className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm bg-[#de442c] text-white`}>
                                                        {/* <Icon color={hoverEmailIsTure ? "white" : "red"} icon={data?.item_Icone} /> */}
                                                        <Icon />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default HeroSection