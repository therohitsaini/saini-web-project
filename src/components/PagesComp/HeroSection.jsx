import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../NavbarComponent/Navbar'
import SwipeComp from '../SwiperCrowsal/SwiperComp'
import { Icon } from "@iconify/react"
import { allFaMdIconsMap } from '../NavbarComponent/HeaderTopLeft'

function HeroSection({ info }) {
    const [inFoData, setInFoData] = useState([])

    const fallbackData = [
        {
            inFoHeading: "Trusted Services",
            inFoDescription: "We Have Trusted Customers",
            inFoIcone: "MdGroup"
        },
        {
            inFoHeading: "24/7 Support",
            inFoDescription: "9929306974",
            inFoIcone: "MdOutlineHeadphonesBattery"
        },
        {
            inFoHeading: "Well Experienced",
            inFoDescription: "10 Years of Experience",
            inFoIcone: "FaTrophy"
        }
    ];

    const getInfoData = async (id) => {

        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/get/info/${id}`;
            const fatchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const jsonResponse = await fatchData.json();


            if (fatchData.ok && Array.isArray(jsonResponse.data) && jsonResponse.data.length > 0) {
                setInFoData(jsonResponse.data);
            } else {

                setInFoData(fallbackData);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            // Fallback if fetch fails
            setInFoData(fallbackData);
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("user-ID")
        getInfoData(id);
    }, []);

   

    return (
        <Fragment>
            <div className='mb-25'>
                <SwipeComp info={info} />
                <div className='info-section -mt-15 z-20 absolute w-full'>
                    <div className='info-card-section grid grid-cols-3 gap-5 px-20'>
                        {
                            inFoData.map((item_, index_) => {
                                const iconName = item_?.inFoIcone;
                                const IconComponent = allFaMdIconsMap[iconName];
                                return (
                                    <div key={index_} className='info-1 shadow-black/30 shadow-xl bg-white h-30 relative'>
                                        <img className='object-cover h-full w-full' src='../src/assets/photorealistic-earth-planet_23-2151075927.avif' alt="background" />
                                        <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-10 group'>
                                            <div className='service-info flex flex-col justify-center gap-1 w-[60%]'>
                                                <h1 className='info-text text-2xl font-semibold text-[#de442c]'>{item_.inFoHeading}</h1>
                                                <h1 className='info-text text-sm font-stretch-10% text-slate-600 group-hover:text-white duration-700'>{item_.inFoDescription}</h1>
                                            </div>
                                            <div className='service-info-icone p-2 w-[40%] flex justify-center items-center'>
                                                <div className='icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 bg-orange-600/40'>
                                                    <div className='icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                        {/* <Icon fontSize={20} icon={item_.inFoIcone} /> */}
                                                        {
                                                            IconComponent ? <IconComponent size={18} /> : ""
                                                        }

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
    );
}

export default HeroSection;
