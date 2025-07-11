import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";


const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(3, 10, 21, 0.7);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
`;

const HoverButton = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -150%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 20;
`;

const PostImage = styled.figure`
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover ${Overlay} {
    opacity: 1;
    visibility: visible;
  }

  &:hover ${HoverButton} {
    transform: translate(-50%, -50%);
    opacity: 1;
    visibility: visible;
  }
`;

const BlogSection = () => {

    const posts = [
        {
            id: 1,
            title: "Developing Leaders & Performance Team",
            image:
                "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
        {
            id: 2,
            title: "That Should Include In Your Marketing Plan",
            image:
                "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
        {
            id: 3,
            title: "How To Manage Business Reputation",
            image:
                "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
    ];

    return (
        <section className="py-[100px] bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">
                        Our <span className="text-blue-500">Blog</span>
                    </h2>
                    <p className="text-gray-600">
                        There are many variations of passages of Lorem Ipsum available
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white p-6 shadow-lg overflow-hidden rounded-xl"
                        >
                            <PostImage>
                                <a href="#">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </a>
                                <Overlay />
                                <HoverButton
                                    href="#"
                                    className="bg-[rgb(232,117,99)] text-white px-4 py-2 rounded-full shadow-md hover:bg-[rgb(232,117,99)]"
                                >
                                    <ArrowRightAlt />
                                </HoverButton>
                            </PostImage>

                            <div className="">
                                <div className="relative w-full max-w-md group bg-blue-500">
                                    <div
                                        className="absolute bg-[#383a3a] group-hover:bg-[rgb(232,117,99)] duration-700"
                                        style={{
                                            clipPath: "polygon(0px 0%, 100% 17%, 100% 82%, 0% 100%)",
                                            width: "12%",
                                            height: "67px",
                                            inset: "-25% auto -25% -11%",
                                            zIndex: 5,
                                        }}
                                    ></div>

                                    <div
                                        className="absolute bg-[#383a3a] group-hover:bg-[rgb(232,117,99)] duration-700"
                                        style={{
                                            clipPath: "polygon(0px 17%, 100% 0%, 100% 100%, 0% 82%)",
                                            width: "12%",
                                            height: "67px",
                                            inset: "-25% -11% -25% auto",
                                            zIndex: 5,
                                        }}
                                    ></div>

                                    <div className="clip-banner bg-[#242427] hover:bg-[#de442c] text-white px-6 h-11 flex justify-between items-center text-sm relative z-20 duration-700">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0v.75H4.5v-.75z"
                                                />
                                            </svg>
                                            Admin
                                        </span>
                                    </div>
                                </div>

                                <h5 className="text-xl font-semibold text-black hover:text-pink-600 transition  mt-4">
                                    <a href="#">{post.title}</a>
                                </h5>
                                <p className="mt-2 text-gray-600">
                                    There are many variations of passages of Lorem Ipsum available
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
