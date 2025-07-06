import React from 'react'
import { Fragment } from 'react'
import { CheckCircle } from 'lucide-react';
import CheckIcon from '@mui/icons-material/Check';

const pricingPlans = [
    {
        heading: "Personal Pack",
        price: "25.00",
        duration: "/Month",
        color: "#df442d",
        listItem: [
            "Five Brand Monitors",
            "Full Social Profiles",
            "Basic Quota",
            "PDF Report",
            "Custom Service"
        ]
    },
    {
        heading: "Business Pack",
        price: "49.00",
        duration: "/Month",
        color: "#1e88e5",
        listItem: [
            "Five Brand Monitors",
            "Full Social Profiles",
            "Basic Quota",
            "PDF Report",
            "Custom Service"
        ]
    },
    {
        heading: "Standard Pack",
        price: "99.00",
        duration: "/Month",
        color: "#43a047",
        listItem: [
            "Five Brand Monitors",
            "Full Social Profiles",
            "Basic Quota",
            "PDF Report",
            "Custom Service"
        ]
    }
];



function PrincingSection({ princingGetApiesData }) {

    const plansToRender = Array.isArray(princingGetApiesData) && princingGetApiesData.length > 0
        ? princingGetApiesData
        : pricingPlans;


    return (
        <Fragment>
            <div className='w-full h-full relative'>
                <div className='main  bg-black/10 pb-20'>
                    <img className='h-[750px]   w-full object-cover' src='./src/assets/shape2.png' />
                    <div className='absolute top-0 w-full px-20 flex flex-col  '>
                        <div className='heading-secton-top flex flex-col items-center mb-10 mt-10 '>
                            <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Princing </span></div> </h1>
                            <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                        </div>
                        <div className='grid grid-cols-3 px-12 gap-10  '>
                            {
                                plansToRender?.map((item_, index_) => {
                                   
                                    return (
                                        < div key={index_} className={`main-princing  ${index_ === 1 ? "bg-black" : "bg-[#f7f5f5] "} relative px-5 `} >
                                            <div className={`${index_ === 1 ? "bg-white/30 " : "bg-amber-100/40"}  rounded-b-[50%]`}>
                                                <div className='  rounded-b-[50%] shadow-xl' >
                                                    <div className="max-w-sm mx-auto  overflow-hidden relative pt-6 pb-10    z-30">

                                                        <div className={`  ${index_ === 1 ? "bg-[#df442d]" : "bg-black"} text-white text-center py-2`}>
                                                            <h2 className="text-xl font-bold  inline-block px-4 py-1 rounded">
                                                                {item_.heading}
                                                            </h2>
                                                        </div>


                                                        {/* <ul className="mt-6 space-y-4 text-sm px-3">
                                                            {item_?.listItem?.map((item, index) => (
                                                                <li className="flex items-center gap-1">
                                                                    <div className={`check bg-black
                                                                   h-6 w-6 rounded-full flex justify-center items-center`} >
                                                                        <CheckIcon sx={{
                                                                            color: "white"
                                                                        }} />
                                                                    </div>
                                                                    <span className={` 
                                                            
                                                                  font-medium px-3 py-1 rounded `}>
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul> */}
                                                        <ul>
                                                            {item_.listItem.map((item, index) =>
                                                                item.split('\n').map((line, i) => (
                                                                    <ul className='flex  gap-4 my-2 mt-4 px-1'>
                                                                        <div className={`check bg-black shadow-md shadow-black/50  h-7 w-7 rounded-full flex justify-center items-center`} >
                                                                            <CheckIcon sx={{
                                                                                color: "white",
                                                                                m: 1
                                                                            }} />
                                                                        </div>

                                                                        <li key={`${index}-${i}`} className={`list font-light tracking-wide ${index_ === 1 ? "text-white" : "text-black"}`}>{line}</li>
                                                                    </ul>
                                                                ))
                                                            )}
                                                        </ul>

                                                        <div className="relative mt-12 flex justify-center items-center ">
                                                            <div className="relative w-36 h-36">

                                                                <div className="absolute inset-0 rounded-full border-2 border-[#df442d] animate-rotate-slow">

                                                                    <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

                                                                    <div className="absolute bottom-0 right-1/8 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
                                                                </div>

                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="w-28 h-28 rounded-full bg-[#df442d] flex flex-col items-center justify-center text-white font-bold text-lg">

                                                                        <span className='p-1 text-center' >${item_.price}</span>
                                                                        {/* <small className="text-sm font-normal">/Month</small> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className='border border-slate-500 h-70  w-70 absolute -mt-20  rounded-full rotate-y-90'></div> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center mt-6 mb-5">
                                                <div className='nav-quate-btn  h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-white/20'>
                                                    <button class="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
                                                        <span class="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">{"Get Start"}</span>
                                                        <span class="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
                                                    </button>
                                                </div>
                                                {/* <div className={`nav-quate-btn h-13 w-33 rounded-l-3xl rounded-r-xl p-1.5 pl-0 pr-2 group ${index_ == 1 ? 'bg-white' : 'bg-orange-500/20'} hover:bg-white/20`}>
                                                    <button
                                                        className={`relative inline-block h-full w-full font-semibold text-white ${index_ == 1 ? 'bg-white' : 'bg-[#de442c]'
                                                            } overflow-hidden group rounded-l-3xl rounded-r-xl`}
                                                    >
                                                        <span
                                                            className={`relative z-10 transition-colors duration-500 font-semibold ${index_ == 1 ? 'text-[#de442c]' : 'group-hover:text-[#db3125]'
                                                                }`}
                                                        >
                                                            {"Get Start"}
                                                        </span>

                                                        <span
                                                            className={`absolute top-0 right-0 w-0 h-full ${index_ == 1 ? 'bg-[#de442c]' : 'bg-white'
                                                                } transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0`}
                                                        />
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>

                                    )
                                })

                            }

                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default PrincingSection