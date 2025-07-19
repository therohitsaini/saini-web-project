import React from 'react'
import { Icon } from "@iconify/react"
import { Fragment } from 'react'
import ServicedefaultData from "../JsonData/ServiceJson.json"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { allFaMdIconsMap } from '../NavbarComponent/HeaderTopLeft';
import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";



const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled.div`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? "translateY(0)" : "translateY(60px)")};
  animation: ${({ inView }) => (inView ? fadeInUp : "none")} 0.6s ease forwards;
  transition: opacity 0.5s, transform 0.5s;
`;


const Service = ({ serviceCard, sectionHeadingApies }) => {
    const iconName = serviceCard?.iconeTop;
    const IconComponent = allFaMdIconsMap[iconName];


    const sectionRef = useRef();
    const [inView, setInView] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentY = window.scrollY;
                const isScrollingDown = currentY > lastScrollY.current;

                if (entry.isIntersecting && isScrollingDown) {
                    setInView(true);
                }

                lastScrollY.current = currentY;
            },
            { threshold: 0.2 }
        );

        const element = sectionRef.current;
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);
    // Ensure sectionHeadingApies is defined before calling .find()
   



    console.log("sectionHeadingApies", sectionHeadingApies.data)

    // Find the ServiceHeading section data
    const serviceHeadingData = sectionHeadingApies?.data?.find(section => section.section === "ServiceHeading");
    const serviceHeadingItem = serviceHeadingData?.item?.[0];

    return (
        <Fragment>
            <SectionWrapper ref={sectionRef} inView={inView} className='service-main  '>
                <div className='title-secton-top flex flex-col items-center '>
                    <div className="text-center">
                        <h1 className="heading font-bold text-3xl my-3 flex justify-center items-center gap-2">
                            {serviceHeadingItem?.item_Title?.split(' ')[0] || 'Our'}
                            <div className="bg-red-600/40 p-3 px-3 rounded-l-[100px] rounded-r-[30px]">
                                <span className="rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white">
                                    {serviceHeadingItem?.item_Title?.split(' ').slice(1).join(' ') || 'Service'}
                                </span>
                            </div>
                        </h1>
                    </div>
                    <p className='paraghraph font-light text-slate-600'>
                        {serviceHeadingItem?.item_Description || 'There are many variations of passages of Lorem Ipsum available'}
                    </p>
                </div>
                <div className='service-card-section grid grid-cols-4 my-10 gap-5 px-20 ' >
                    {
                        (serviceCard?.length ? serviceCard : ServicedefaultData?.ServiceDefultValue)?.map((item_, index_) => {
                            const iconName = item_?.iconeTop;
                            const IconComponent = allFaMdIconsMap[iconName];

                            return (
                                <div key={item_._id || index_} className="relative overflow-hidden group  ">

                                    <div className="w-full h-full bg-red-100 z-20 group-hover:bg-[#de442c] relative  duration-700">
                                        <div className='z-50 flex flex-col items-center gap-5 px-5'>
                                            <div className='icone-top-warraper  h-13 w-14 rounded-b-xl bg-red-200 px-0.5 pb-1 ' >
                                                <div className='icone-top-warraper h-full w-full  rounded-b-xl bg-white flex justify-center items-center' >

                                                    {IconComponent ? (
                                                        <IconComponent color="red" size={23} />
                                                    ) : (
                                                        <span>?</span>
                                                    )}
                                                </div>
                                            </div>
                                            <h2 className=" text-back text-[18px] font-semibold z-50 text-center mt-5">
                                                {item_.serviceHeading}
                                            </h2>
                                            <h2 className=" text-back text-md z-50 text-center mb-5 ">
                                                {item_.ServiceDescription}
                                            </h2>
                                            <div className={`icon-main h-12 w-12 rounded-b-3xl z-50  flex justify-center items-end rounded-t-xl duration-700 bg-orange-600/40 group-hover:bg-white/20  mb-10`}>
                                                <div
                                                    className={`icone-cover   duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl  shadow-black/20 shadow-sm bg-[#de442c] text-white  group-hover:bg-white group-hover:text-orange-800`}>
                                                    <KeyboardDoubleArrowRightIcon fontSize='15px' />
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


            </SectionWrapper>
        </Fragment>
    )
}

export default Service


// ServiceSection.jsx
/* import styled from "styled-components";

const ServiceCard = styled.div`
  position: relative;
  overflow: hidden;
  transition: all 0.65s ease;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    inset: -16%;
    background-color: #FAEFED;
    transform: rotate(-54deg) translateY(61%);
    transition: 0.3s;
    z-index: -1;
  }
  &:hover:before,
  &:focus-within:before {
    transform: rotate(54deg) translateY(61%);
    opacity: 0.1;
  }
`;

const ServiceIcon = styled.div`
  font-size: 22px;
  border-radius: 0 0 20px 20px;
  color: rgb(var(--pr-color));
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 60px;
  margin-bottom: 20px;

  i {
    transform: translateY(-18px);
  }

  &:after {
    content: '';
    border-radius: 0 0 15px 15px;
    background-color: #FAEFED;
    position: absolute;
    inset: -100% 1px 6px 1px;
    z-index: -1;
    transition: 0.65s;
  }

  &:before {
    content: '';
    border-radius: 0 0 15px 15px;
    background-color: white;
    position: absolute;
    inset: -100% 3px 12px 3px;
    transition: 0.65s;
  }
`;

const ServiceSection = () => {
    const services = [
        { icon: "fa-file", title: "Banking & Marketing" },
        { icon: "fa-id-badge", title: "Finance & Insurance" },
        { icon: "fa-chart-area", title: "Transportation" },
        { icon: "fa-handshake", title: "Defence Security" },
        { icon: "fa-chart-simple", title: "Resource Industry" },
        { icon: "fa-suitcase-medical", title: "Health Science" },
        { icon: "fa-headphones", title: "Customer Service" },
        { icon: "fa-rotate", title: "Other Services" },
    ];

    return (
        <section className="py-[100px] bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <h2 className="text-[35px] font-bold text-primary">
                        Our{" "}
                        <span className="inline-block relative px-4 py-2 bg-primary/40 text-white rounded-[40px_20px_20px_40px] z-10">
                            Service
                            <span className="absolute inset-[6px_8px_6px_1px] bg-primary rounded-[40px_20px_20px_40px] -z-10"></span>
                        </span>
                    </h2>
                    <p className="text-gray-600 mt-2">There are many variations of passages of Lorem Ipsum available</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            className="bg-white p-6 text-center shadow-md hover:bg-primary transition-all duration-500 group"
                        >
                            <ServiceIcon>
                                <i className={`fa ${service.icon}`}></i>
                            </ServiceIcon>
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-secondary group-hover:text-white">
                                    <a href="#" className="no-underline">{service.title}</a>
                                </h4>
                                <p className="text-gray-600 mt-2 group-hover:text-white">
                                    There are many variations of passages of Lorem Ipsum available
                                </p>
                                <a
                                    href="#"
                                    className="inline-block mt-4 px-4 py-2 bg-white/40 text-primary rounded-[20px_40px_40px_20px] relative overflow-hidden group-hover:bg-white transition-colors"
                                >
                                    <i className="fa fa-angle-double-right"></i>
                                </a>
                            </div>
                        </ServiceCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceSection; */
