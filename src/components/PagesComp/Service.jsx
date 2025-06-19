import React from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Icon } from "@iconify/react"
import { Fragment } from 'react'
import ServicedefaultData from "../JsonData/ServiceJson.json"


const Service = () => {




    return (
        <Fragment>
            <div className='service-main  '>
                <div className='title-secton-top flex flex-col items-center '>
                    <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Service </span></div> </h1>
                    <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                </div>
                <div className='service-card-section grid grid-cols-4 my-10 gap-5 px-20' >
                    {
                        ServicedefaultData?.ServiceDefultValue?.map((item_, index_) => {
                            return (
                                <div className="relative overflow-hidden group  ">

                                    <div className="w-full h-full bg-red-100 z-20 group-hover:bg-[#df442d] relative  duration-700">
                                        <div className='z-50 flex flex-col items-center gap-5 px-5'>
                                            <div className='icone-top-warraper  h-13 w-14 rounded-b-xl bg-red-200 px-0.5 pb-1 ' >
                                                <div className='icone-top-warraper h-full w-full  rounded-b-xl bg-white' >

                                                </div>
                                            </div>
                                            <h2 className=" text-back text-[18px] font-semibold z-50 text-center">
                                                {item_.serviceHeading}
                                            </h2>
                                            <h2 className=" text-back text-md z-50 text-center">
                                                {item_.ServiceDescription}
                                            </h2>
                                            <div className={`icon-main h-12 w-12 rounded-b-3xl z-50  flex justify-center items-end rounded-t-xl duration-700 bg-orange-600/40 group-hover:bg-white/20  mb-10`}>
                                                <div
                                                    className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm bg-[#de442c] text-white  group-hover:bg-white group-hover:text-orange-800`}>
                                                    <Icon fontSize={25} icon={"lets-icons:trophy-light"} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-white/30  transform rotate-45 translate-y-full -translate-x-full transition-all duration-700 ease-in-out group-hover:rotate-[120deg] group-hover:translate-x-30 group-hover:translate-y-0 z-10" />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>
        </Fragment>
    )
}

export default Service