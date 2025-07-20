import { ArrowRightAlt } from "@mui/icons-material";
import React, { useState } from "react";

import { HoverButton, Overlay, PostImage, posts } from "./BlogData";
import { allFaMdIconsList } from "../../NavbarComponent/HeaderTopLeft";



const BlogSection = ({ blogApiesData }) => {
    const falbackData = Array.isArray(blogApiesData) && blogApiesData.length > 0 ? blogApiesData : posts
    return (
        <section className="py-[50px] bg-white">
            <div className="container mx-auto">
                <div className="text-center ">
                    <div className='heading-secton-top flex flex-col items-center mb-10  '>
                        <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-2.5 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-1.5 px-3 bg-[#df442d] text-white font-bold' >Blog </span></div> </h1>
                        <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
                    {falbackData.map((post) => {
                        const imgSrc = post?.blogerImage?.startsWith("http")
                            ? post.blogerImage
                            : `${import.meta.env.VITE_BACK_END_URL.replace(
                                /\/$/,
                                ""
                            )}/${post.blogerImage?.replace(/^\/?/, "")}`;


                        const iconName = post?.goIcone;
                        const IconComponent = allFaMdIconsList[iconName]
                        console.log(post, IconComponent)
                        return (
                            <article
                                key={post.id}
                                className="bg-white p-6 shadow-lg overflow-hidden rounded-xl "
                            >
                                <div className="group">
                                    <PostImage >
                                        <a href="#">
                                            <img
                                                src={imgSrc}
                                                alt={post.blogHeading}
                                                className="w-full h-60 object-cover"
                                            />
                                        </a>
                                        <Overlay />

                                        <HoverButton
                                            href="#"
                                            className="bg-[rgb(232,117,99)] text-white px-4 py-2 rounded-full shadow-md hover:bg-[rgb(169,160,159)]"
                                        >

                                            <ArrowRightAlt />
                                        </HoverButton>
                                    </PostImage>


                                    <div className="relative w-full max-w-md group bg-blue-500 ">
                                        <div
                                            className="absolute bg-[#383a3a] group-hover:bg-[#e25741] duration-700"
                                            style={{
                                                clipPath:
                                                    "polygon(0px 0%, 100% 17%, 100% 82%, 0% 100%)",
                                                width: "12%",
                                                height: "67px",
                                                inset: "-25% auto -25% -11%",
                                                zIndex: 5,
                                            }}
                                        ></div>
                                        <div
                                            className="absolute bg-[#383a3a] group-hover:bg-[#e25741] duration-700"
                                            style={{
                                                clipPath:
                                                    "polygon(0px 17%, 100% 0%, 100% 100%, 0% 82%)",
                                                width: "12%",
                                                height: "67px",
                                                inset: "-25% -11% -25% auto",
                                                zIndex: 5,
                                            }}
                                        ></div>

                                        {/* <div className={`clip-banner bg-[#242427] text-white px-6 h-11 flex justify-between items-center text-sm relative z-20 duration-700 border border-blue-600     ${isHover ? "hover:bg-red-500" : ""}`}> */}
                                        <div className="clip-banner bg-[#242427] text-white px-6 h-11 flex justify-between items-center text-sm relative z-20 duration-700  group-hover:bg-[#de442c]">

                                            <span>{post.blogDatePicker}</span>
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0v.75H4.5v-.75z"
                                                    />
                                                </svg>
                                                {post.blogerRole}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Heading and description */}
                                <h5 className="text-xl font-semibold text-black hover:text-red-600 transition mt-4">
                                    <a href="#">{post.blogHeading}</a>
                                </h5>
                                <p className="mt-2 text-gray-600">{post.blogDescription}</p>

                                {/* CTA Button */}
                                <div className="nav-quate-btn mt-4 h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-black/40">
                                    <button className="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
                                        <span style={{
                                            fontFamily: "inherit"
                                        }} className="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold ">
                                            {post.blogButton || "Get Start"}
                                        </span>
                                        <span className="absolute top-0 right-0 w-0 h-full bg-black transition-all duration-700 group-hover:w-full z-0"></span>
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
