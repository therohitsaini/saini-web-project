import React from 'react'
import { Fragment } from 'react'
import { CheckCircle } from 'lucide-react';
import CheckIcon from '@mui/icons-material/Check';

const pricingPlans = [
    {
        title: "Personal Pack",
        price: "$25.00",
        duration: "/Month",
        color: "#df442d",
        features: [
            { label: "Five Brand Monitors", icon: "Check" },
            { label: " Full Social Profiles", icon: "SupportAgent" },
            { label: "Basic Quota", icon: "Storage" },
            { label: " PDF Report", icon: "Storage" },
            { label: " Custom Service", icon: "Storage" }


        ]
    },
    {
        title: "Business Pack",
        price: "$49.00",
        duration: "/Month",
        color: "#1e88e5",
        features: [
            { label: "Five Brand Monitors", icon: "Check" },
            { label: " Full Social Profiles", icon: "SupportAgent" },
            { label: "Basic Quota", icon: "Storage" },
            { label: " PDF Report", icon: "Storage" },
            { label: " Custom Service", icon: "Storage" }


        ]
    },
    {
        title: "Standard Pack",
        price: "$99.00",
        duration: "/Month",
        color: "#43a047",
        features: [
            { label: "Five Brand Monitors", icon: "Check" },
            { label: " Full Social Profiles", icon: "SupportAgent" },
            { label: "Basic Quota", icon: "Storage" },
            { label: " PDF Report", icon: "Storage" },
            { label: " Custom Service", icon: "Storage" }


        ]
    }
];



function PrincingSection() {


    const listItem = [
        "Five Brand Monitors",
        "Full Social Profiles",
        "Basic Quota",
        "PDF Report",
        "Custom Service",
    ]

    console.log(pricingPlans)


    return (
        <Fragment>
            <div className='w-full  relative'>
                <img className='h-[750px]  w-full object-cover' src='./src/assets/shape2.png' />
                <div className='absolute top-0 w-full px-20 flex flex-col  '>
                    <div className='title-secton-top flex flex-col items-center mb-10 '>
                        <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Princing </span></div> </h1>
                        <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                    </div>
                    <div className='grid grid-cols-3 px-12 gap-10  '>
                        {pricingPlans.map((item_, index_) => {
                            return (
                                < div key={index_} className={`main-princing  ${index_ === 1 ? "bg-black" : "bg-[#f7f5f5] "} relative px-5 `} >
                                    <div className='bg-white/30  rounded-b-[50%]'>
                                        <div className='  rounded-b-[50%] shadow-xl' >
                                            <div className="max-w-sm mx-auto  overflow-hidden relative pt-6 pb-10    z-30">

                                                <div className={`  ${index_ === 1 ? "bg-[#df442d]" : "bg-black"} text-white text-center py-2`}>
                                                    <h2 className="text-xl font-bold  inline-block px-4 py-1 rounded">
                                                        {item_.title}
                                                    </h2>
                                                </div>

                                                {/* Features */}
                                                <ul className="mt-6 space-y-4 text-sm px-3">
                                                    {item_?.features?.map((item, index) => (
                                                        <li  className="flex items-center gap-1">

                                                            <div className={`
                                                              bg-black
                                                                 check  h-6 w-6 rounded-full flex justify-center items-center`} >
                                                                <CheckIcon sx={{
                                                                    color: "white"
                                                                }} />
                                                            </div>
                                                            <span className={` 
                                                                // 
                                                                  font-medium px-3 py-1 rounded `}>
                                                                {item.label}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="relative mt-12 flex justify-center items-center ">
                                                    <div className="relative w-32 h-32">

                                                        <div className="absolute inset-0 rounded-full border-2 border-[#df442d] animate-rotate-slow">

                                                            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

                                                            <div className="absolute bottom-0 right-1/8 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
                                                        </div>

                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-24 h-24 rounded-full bg-[#df442d] flex flex-col items-center justify-center text-white font-bold text-lg">

                                                                <span>{item_.price}</span>
                                                                <small className="text-sm font-normal">/Month</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='border border-slate-500 h-70  w-70 absolute -mt-20  rounded-full rotate-y-90'></div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-6 mb-5">
                                        <button className="bg-[#df442d] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            )
                        })

                        }

                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default PrincingSection