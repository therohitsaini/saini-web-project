
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled, { keyframes } from "styled-components";

import "swiper/css";
import "swiper/css/pagination";

// Sample data
const testimonials = [
    {
        heading: "Our Awesome Clients Review For Inspiration",
        userProfile: "https://plus.unsplash.com/premium_photo-1661688791119-418b28a3ca60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fHww",
        userName: "Mike Williams",
        occupationRole: "Marketing Manager",
        paragraph:
            "It is a long established fact that a reader will be distracted by the readable paragraph of a page when looking at its layout",
    },
    {
        heading: "Our Awesome Clients Review For Inspiration",
        userProfile: "https://media.istockphoto.com/id/2194848329/photo/mid-adult-businessman-with-beard-and-glasses-wearing-blue-shirt-listening-and-concentrating.webp?a=1&b=1&s=612x612&w=0&k=20&c=JCwp0PO_9P9zkL-N85zUw1fRyThnsoxePTyq-uGHgHM=",
        userName: "Sarah Johnson",
        occupationRole: "Product Designer",
        paragraph:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        heading: "Our Awesome Clients Review For Inspiration",
        userProfile: "https://media.istockphoto.com/id/2165154407/photo/two-professional-women-collaborating-on-a-project-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=JFiiqnspsBaecS8U4Ot-uy_RkwPn3ZVswbf0EhbKl7k=",
        userName: "Alex Smith",
        occupationRole: "CEO, Startup Inc.",
        paragraph:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    },
    {
        heading: "Our Awesome Clients Review For Inspiration",
        userProfile: "https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9mZmljZSUyMHdvcmtlcnxlbnwwfHwwfHx8MA%3D%3D",
        userName: "Alex Smith",
        occupationRole: "CEO, Startup Inc.",
        paragraph:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    },
];

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedSlide = styled.div`
  animation: ${fadeUp} 0.8s ease-out;
`;



export default function TestimonialSection({ testimonialApiesDataUI }) {
    const dataToUse = Array.isArray(testimonialApiesDataUI) && testimonialApiesDataUI.length > 0
        ? testimonialApiesDataUI
        : testimonials;
    return (
        <Fragment>
            <div className="w-full bg-gray-100 py-12 relative overflow-hidden">
                <img
                    className="h-[800px] w-full object-cover absolute top-0 left-0 z-0"
                    src="../src/assets/tesiminal.png"
                    alt="Background"
                />

                <div className="relative z-10 px-6 md:px-20">
                    <div className="text-center">
                        <h1 className="heading font-bold text-3xl my-3 flex justify-center items-center gap-2">
                            Our
                            <div className="bg-red-600/40 p-3 px-3 rounded-l-[100px] rounded-r-[30px]">
                                <span className="rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white">
                                    Testimonial
                                </span>
                            </div>
                        </h1>
                        <p className="text-slate-600 font-light">
                            There are many variations of passages of Lorem Ipsum available
                        </p>
                    </div>

                    <Swiper
                        spaceBetween={30}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper mt-10"
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                            1024: { slidesPerView: 1 },
                        }}
                    >
                        {/* {
                            (testimonialApiesDataUI ? testimonialApiesDataUI : testimonials)?.map((item, idx) => (

                                <SwiperSlide key={idx}>

                                    <AnimatedSlide className="flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden h-[500px]  backdrop-blur mt-5">
                                        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                                            <div className="border border-red-500 border-dotted rounded-full p-9">
                                                <div className="h-96 w-96 rounded-full p-7 bg-[#f2b4aa] overflow-hidden">
                                                    <img
                                                        className="h-full w-full rounded-full object-cover"
                                                        src="../src/assets/image-1.jpg"
                                                        alt="Client"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                                            <h2 className="text-3xl font-bold mb-6">
                                                Our Awesome Clients Review{" "}
                                                <span className="text-[#df442d]">For Inspiration</span>
                                            </h2>
                                            <div className="bg-white w-full max-w-[500px] py-5 px-6 rounded-md shadow-md">
                                                <p className="text-gray-700 italic mb-4">
                                                    "{item.paragraph}"
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src="../src/assets/image-1.jpg"
                                                        className="w-16 h-16 object-cover rounded-full border-2 border-orange-500"
                                                        alt="User"
                                                    />
                                                    <div>
                                                        <h6 className="font-semibold text-lg">{item.userName}</h6>
                                                        <span className="text-sm text-gray-500">
                                                            {item.occupationRole}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedSlide>
                                </SwiperSlide>

                            ))
                        } */}
                        {
                            dataToUse?.map((item, idx) => {
                                const heading = item?.heading?.trim() || '';
                                const words = heading.split(' ');
                                const lastTwoWords = words.slice(-2).join(' ');
                                const firstPart = words.slice(0, -2).join(' ');

                                const imgSrc = item?.userProfile?.startsWith('http')
                                    ? item.userProfile
                                    : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${item.userProfile?.replace(/^\/?/, '')}`;

                                return (
                                    <SwiperSlide key={idx}>
                                        <AnimatedSlide className="flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden h-[500px]  backdrop-blur mt-5">
                                            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                                                <div className="border border-red-500 border-dotted rounded-full p-9">
                                                    <div className="h-96 w-96 rounded-full p-7 bg-[#f2b4aa] overflow-hidden">
                                                        <img
                                                            className="h-full w-full rounded-full object-cover"
                                                            src={imgSrc}
                                                            alt="Client"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                                                <h2 className="text-3xl font-bold mb-6">
                                                    {firstPart}{" "}
                                                    <span className="text-[#df442d]">{lastTwoWords}</span>
                                                </h2>
                                                <div className="bg-white w-full max-w-[500px] py-5 px-6 rounded-md shadow-md">
                                                    <p className="text-gray-700 italic mb-4">"{item.paragraph}"</p>
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={imgSrc}
                                                            className="w-16 h-16 object-cover rounded-full border-2 border-orange-500"
                                                            alt="User"
                                                        />
                                                        <div>
                                                            <h6 className="font-semibold text-lg">{item.userName}</h6>
                                                            <span className="text-sm text-gray-500">
                                                                {item.occupationRole}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedSlide>
                                    </SwiperSlide>
                                );
                            })
                        }

                    </Swiper>
                </div>
            </div>
        </Fragment>
    );
}
