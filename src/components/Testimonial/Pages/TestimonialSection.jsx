
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled, { keyframes } from "styled-components";

import "swiper/css";
import "swiper/css/pagination";

// Sample data
const testimonials = [
    {
        name: "Mike Williams",
        role: "Marketing Manager",
        content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    },
    {
        name: "Sarah Johnson",
        role: "Product Designer",
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        name: "Alex Smith",
        role: "CEO, Startup Inc.",
        content:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    },
    {
        name: "Alex Smith",
        role: "CEO, Startup Inc.",
        content:
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

export default function TestimonialSection() {
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
                        {testimonials.map((item, idx) => (
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
                                                "{item.content}"
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src="../src/assets/image-1.jpg"
                                                    className="w-16 h-16 object-cover rounded-full border-2 border-orange-500"
                                                    alt="User"
                                                />
                                                <div>
                                                    <h6 className="font-semibold text-lg">{item.name}</h6>
                                                    <span className="text-sm text-gray-500">
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSlide>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Fragment>
    );
}
