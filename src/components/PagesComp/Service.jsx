import React from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Icon } from "@iconify/react"
import { Fragment } from 'react'

const Service = () => {
    return (
        <Fragment>
            <div className='service-main  '>
                <div className='title-secton-top flex flex-col items-center '>
                    <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Service </span></div> </h1>
                    <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                </div>
                <div className='service-card-section grid grid-cols-4 my-10 px-20' >

                    <div class="relative bg-red-100  group py-5  rounded-2xl overflow-hidden shadow-lg transition-all duration-700 transform hover:-translate-y-3 hover:rotate-[1deg]">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#df442d] via-[#df442d] to-red-500 scale-y-0 origin-top transition-transform duration-800 group-hover:scale-y-100 z-0"></div>
                        <div class="relative z-10 p-6 flex flex-col gap-2.5 items-center text-center transition-colors duration-500 group-hover:text-white">
                            <div class="text-[#df442d] group-hover:text-white mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25L8.25 12.5m0 0L3 10.125l9-4.125 9 4.125-5.25 2.375m-8.25 0l4.5 2.125m0 0V21m0-6.25l4.5-2.125" />
                                </svg> */}
                                <Icon fontSize={40} icon="line-md:file" />
                            </div>
                            <h2 class="text-xl font-bold mb-2 tracking-wide">Banking & Marketing</h2>
                            <p class="text-sm leading-relaxed">
                                There are many variations of passages of Lorem Ipsum available
                            </p>

                            <div className=' bg-red-600/40 px-2 p-1 pr-0 rounded-r-[100px] rounded-[40px] group-hover:bg-white/20'>
                                <div className=' bg-[#df442d] px-1.5 p-1.5 rounded-r-[100px] rounded-[40px] flex justify-center items-center group-hover:bg-white group-hover:text-red-600 text-white duration-700'>
                                    <KeyboardDoubleArrowRightIcon />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>


            </div>
        </Fragment>
    )
}

export default Service