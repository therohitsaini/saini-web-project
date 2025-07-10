import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(59, 130, 246, 0.7); /* --sr-color equivalent */
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.65s;
`;

const HoverButton = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateY(-200%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.65s;
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
    transform: translate(-50%, -50%) translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;

<style>
 
</style>


const BlogSection = () => {
    const posts = [
        {
            id: 1,
            title: "Developing Leaders & Performance Team",
            image: "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
        {
            id: 2,
            title: "That Should Include In Your Marketing Plan",
            image: "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
        {
            id: 3,
            title: "How To Manage Business Reputation",
            image: "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
            date: "10 Mar, 2023",
        },
    ];

    return (
        <>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-20">
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
                                            className="w-full transition-transform duration-500 hover:scale-110 shadow-lg h-70 object-cover "
                                        />
                                    </a>
                                    <Overlay />
                                    <HoverButton href="#" className="main-btn">
                                        <i className="fab fa-share"></i>
                                    </HoverButton>
                                </PostImage>
                                <div className="mt-5">
                                    <div class="relative w-full max-w-md">
                                        <div class="clip-banner bg-black text-white px-6 py-3 flex justify-between items-center text-sm">
                                            <span>10 Mar, 2023</span>
                                            <span class="flex items-center gap-1">

                                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0v.75H4.5v-.75z" />
                                                </svg>
                                                Admin
                                            </span>
                                        </div>
                                    </div>

                                    <h5 className="text-xl font-semibold text-blue-700 hover:text-pink-600 transition underline decoration-dotted">
                                        <a href="#">{post.title}</a>
                                    </h5>
                                    <p className="mt-2 text-gray-600">
                                        There are many variations of passages of Lorem Ipsum available
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-block mt-4 text-white font-medium bg-pink-400 rounded-[40px_20px_20px_40px] px-5 h-[50px] leading-[50px] relative overflow-hidden hover:text-pink-500 hover:bg-blue-300 transition"
                                    >
                                        Read More
                                        <span className="absolute inset-[6px_8px_6px_1px] bg-pink-500 rounded-[40px_20px_20px_40px] z-[-1] transition-all"></span>
                                        <span className="absolute left-full inset-[6px_8px_6px_1px] bg-blue-500 rounded-[40px_20px_20px_40px] z-[-1] opacity-0 transition-all group-hover:left-0 group-hover:opacity-100"></span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="relative w-64 h-64 bg-blue-500 overflow-hidden">
                    <div
                        className="absolute bg-pink-400"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
                            inset: '20px',
                        }}
                    ></div>
                </div>
            </section>
        </>
    );
};

export default BlogSection;
