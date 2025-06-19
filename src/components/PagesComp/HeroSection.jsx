import React, { Fragment, useState } from 'react'
import Navbar from '../NavbarComponent/Navbar'
import SwipeComp from '../SwiperCrowsal/SwiperComp'
import GroupsIcon from '@mui/icons-material/Groups';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Icon } from "@iconify/react"

function HeroSection({ info }) {

    const fallbackData = [
        {
            section: "Default Section",
            inFoItem: [
                {
                    inFoHeading: "Trusted Secvices",
                    inFoDescription: "We Have Trusted Customers",
                    inFoIcone: "mingcute:group-3-line"
                },
                {
                    inFoHeading: "24/7 Support",
                    inFoDescription: "9929306974",
                    inFoIcone: "ri:headphone-line"
                },
                {
                    inFoHeading: "Well Experienced",
                    inFoDescription: "10 Year Of Experience",
                    inFoIcone: "lets-icons:trophy-light"
                }
            ]
        }
    ];
    // console.log("info", info?.headerData.inFoData)
    const data = info?.headerData.inFoDat

    return (
        <Fragment>

            <div className='mb-25'>
                <SwipeComp info={info} />
                <div className='info-section  -mt-15 z-20 absolute  w-full' >
                    <div className='info-card-section   grid grid-cols-3 gap-5 px-20'>
                        {
                            (data?.length ? data : fallbackData).map((item_, index_) => {
                                // const Icon = item_.inFo_Icone;
                                return item_?.inFoItem?.map((item) => {
                                    return (
                                        <div key={index_} className='info-1 shadow-balck shadow-2xl bg-white h-30 relative ' >
                                            <img className=' object-cover h-full w-full' src='../src/assets/photorealistic-earth-planet_23-2151075927.avif' />
                                            <div className='data-container h-full w-full absolute  top-0 bg-white hover:bg-black/60 duration-1000 flex px-10 group'>
                                                <div className='service-info  flex flex-col justify-center gap-1 w-[60%] '>
                                                    <h1 className='info-text text-2xl font-semibold text-[#de442c]'>{item.inFoHeading}</h1>
                                                    <h1 className='info-text text-sm  font-stretch-10% text-slate-600 group-hover:text-white duration-700'>{item.inFoDescription}</h1>

                                                </div>
                                                <div className='service-info-icone  p-2 w-[40%] flex justify-center items-center'>

                                                    <div className={`icon-main h-12 w-12 rounded-b-3xl  flex justify-center items-end rounded-t-xl duration-700 bg-orange-600/40`}>
                                                        <div
                                                            className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm bg-[#de442c] text-white`}>
                                                            <Icon fontSize={20} icon={item.inFoIcone} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            })
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default HeroSection