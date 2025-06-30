import React from 'react'
import { Fragment } from 'react'
import { CheckCircle } from 'lucide-react';
import CheckIcon from '@mui/icons-material/Check';


function PrincingSection() {


    const listItem = [
        "Five Brand Monitors",
        "Full Social Profiles",
        "Basic Quota",
        "PDF Report",
        "Custom Service",
    ]


    return (
        <Fragment>
            <div className='grid grid-cols-3'>
                <div className='main-princing bg-[#ebe5e5] relative' >
                    <div className="max-w-sm mx-auto bg-[#f3f3f3] rounded-b-[50%] shadow-xl overflow-hidden relative py-6 px-4   z-30">
                        {/* Top Header */}
                        <div className="bg-black text-white text-center py-2">
                            <h2 className="text-xl font-bold bg-[#df442d] inline-block px-4 py-1 rounded">
                                Personal Pack
                            </h2>
                        </div>

                        {/* Features */}
                        <ul className="mt-6 space-y-4 text-sm">
                            {listItem.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {/* <CheckCircle className="text-black fill-black" size={18} /> */}
                                    <div className='check bg-black h-7 w-7 rounded-full flex justify-center items-center' >
                                        <CheckIcon sx={{
                                            color: "white"
                                        }} />
                                    </div>
                                    <span className="bg-[#df442d] text-white px-3 py-1 rounded font-medium">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>



                        <div className="relative mt-12 flex justify-center items-center ">
                            <div className="relative w-32 h-32">

                                <div className="absolute inset-0 rounded-full border-2 border-[#df442d] animate-rotate-slow">
                                    {/* Top Dot */}
                                    <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>

                                    <div className="absolute bottom-0 right-1/8 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
                                </div>

                                {/* Fixed Center Content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-[#df442d] flex flex-col items-center justify-center text-white font-bold text-lg">
                                        <span>$25.00</span>
                                        <small className="text-sm font-normal">/Month</small>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-center mt-6">
                            <button className="bg-[#df442d] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md">
                                Buy Now
                            </button>
                        </div>
                        {/* <div className='border border-slate-500 h-70  w-70 absolute -mt-20  rounded-full rotate-y-90'></div> */}

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default PrincingSection