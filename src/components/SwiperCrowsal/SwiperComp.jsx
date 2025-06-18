// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import { swiper_image } from "../JsonData/Swiper.json"



// function SwipeComp() {

//     return (
//         <div className='swiper-main  h-[800px] '>
//             <div>
//                 <Swiper
//                     spaceBetween={30}
//                     centeredSlides={true}
//                     autoplay={{
//                         delay: 3500,
//                         disableOnInteraction: false,
//                     }}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     navigation={true}
//                     modules={[Autoplay, Pagination, Navigation]}
//                     className="mySwiper"
//                     style={{
//                         "--swiper-pagination-color": "#db3125",
//                         "--swiper-navigation-color": "#db3125",

//                     }}
//                 >

//                     <div className=''>
//                         {
//                             swiper_image.map((img_, index) => {
//                                 return (
//                                     <SwiperSlide  >
//                                         <div className='h-[800px] w-full relative'>
//                                             <img className=' h-full w-full object-cover' src={img_.img} />
//                                             <h1 className=' absolute z-40'>{img_.text}</h1>
//                                         </div>


//                                     </SwiperSlide>
//                                 )
//                             })
//                         }
//                     </div>
//                 </Swiper>


//             </div >


//         </div>
//     )
// }

// export default SwipeComp;

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { swiper_image } from "../JsonData/Swiper.json";

function SwipeComp() {
    return (
        <div className='swiper-main h-[800px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                style={{
                    "--swiper-pagination-color": "#db3125",
                    "--swiper-navigation-color": "#db3125",
                }}
            >
                {
                    swiper_image.map((img_, index) => (
                        <SwiperSlide key={index}>
                            <div className='h-[800px] w-full relative'>
                                <img className='h-full w-full object-cover' src={img_.img} alt={`Slide ${index}`} />

                                {/* Centered Text Overlay */}
                                <div className='absolute inset-0 flex justify-center items-center z-20 bg-black/40'>
                                    <h1 className='text-white text-4xl font-bold'>{img_.text}</h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default SwipeComp;
