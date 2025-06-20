

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import { swiper_image } from "../JsonData/Swiper.json";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import styled, { keyframes } from 'styled-components';

// // 🔄 Fade in + scale animation for image
// const fadeInImage = keyframes`
//   from {
//     opacity: 0;
//     transform: scale(1.1);
//   }
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

// // ⬆️ Fade and move up animation for text
// const fadeInUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const SlideImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   animation: ${fadeInImage} 1.2s ease-out forwards;
// `;

// const Title = styled.h1`
//   font-size: 3.5rem;
//   font-weight: bold;
//   text-align: center;
//   color: white;
//   animation: ${fadeInUp} 5s ease-in-out infinite;
// `;

// const LastLetter = styled.span`
//   color: red;
// `;


// function SwipeComp({ info }) {

//     const HeroCrowsel = info.headerData.HeroSection
//     // console.log("HeroCrowsel", info.headerData.HeroSection)

//     return (
//         <div className='swiper-main h-[800px]'>
//             <Swiper
//                 spaceBetween={30}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 4000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 navigation={true}
//                 modules={[Autoplay, Pagination, Navigation]}
//                 className="mySwiper"
//                 style={{
//                     "--swiper-pagination-color": "#db3125",
//                     "--swiper-navigation-color": "#db3125",
//                 }}
//             >
//                 {HeroCrowsel?.map((item_, index) => {
//                     const titleWords = item_.heroSlideTitle.trim().split(' ');
//                     const lastWord = titleWords.pop();
//                     const firstPart = titleWords.join(' ');

//                     return (
//                         <SwiperSlide key={index}>
//                             <div className='h-[800px] w-full relative'>
//                                 <img className='h-full w-full object-cover' src={item_.heroImgUrl} alt={`Slide ${index}`} />

//                                 {/* Centered Text Overlay */}
//                                 <div className='absolute inset-0 flex justify-center items-center z-20 bg-black/40'>
//                                     <div className='hero-text flex flex-col items-center gap-3'>
//                                         <div className='hero-icone flex justify-center w-full mt-15'>
//                                             <div className="h-15 w-15 border border-white flex justify-center items-center rounded-full">
//                                                 <div className="h-10 w-10 border border-white flex justify-center items-center rounded-full bg-white text-red-600">
//                                                     <PlayArrowIcon />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <h1 className='text-white text-xl font-bold text-center border-t-2 border-white'>
//                                             {item_.heroSlideSubTitle}
//                                         </h1>


//                                         <Title className='text-white text-6xl font-bold text-center leading-tight'>
//                                             {firstPart} <p className='text-orange-700'>  {lastWord}</p>
//                                         </Title>
//                                     </div>
//                                 </div>
//                             </div>
//                         </SwiperSlide>
//                     );
//                 })}

//             </Swiper>
//         </div>
//     );
// }

// export default SwipeComp;



import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled, { keyframes } from 'styled-components';


const fadeInImage = keyframes`
  from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeInImage} 1.2s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  line-height: 1.2;
  animation: ${({ animate }) => (animate ? fadeInUp : 'none')} 1s ease;
`;

const LastWord = styled.span`
  color: #db3125;
`;

function SwipeComp({ info }) {
    const HeroCrowsel = info.headerData.HeroSection;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animateText, setAnimateText] = useState(true);

    const handleSlideChange = (swiper) => {
        setAnimateText(false);
        setTimeout(() => setAnimateText(true), 10); // re-trigger animation
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <div className='swiper-main h-[800px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
                style={{
                    "--swiper-pagination-color": "#db3125",
                    "--swiper-navigation-color": "#db3125",
                }}
            >
                {HeroCrowsel?.map((item_, index) => {
                    const titleWords = item_.heroSlideTitle.trim().split(' ');
                    const lastWord = titleWords.pop();
                    const firstPart = titleWords.join(' ');

                    return (
                        <SwiperSlide key={index}>
                            <div className='h-[800px] w-full relative '>
                                <SlideImage src={item_.heroImgUrl} alt={`Slide ${index}`} />

                                <div className='absolute inset-0 flex justify-center items-center z-20 bg-black/40'>
                                    <div className='hero-text flex flex-col items-center gap-3'>
                                        <div className='hero-icone flex justify-center w-full mt-15'>
                                            <div className="h-15 w-15 border border-white flex justify-center items-center rounded-full">
                                                <div className="h-10 w-10 border border-white flex justify-center items-center rounded-full bg-white text-red-600">
                                                    <PlayArrowIcon />
                                                </div>
                                            </div>
                                        </div>

                                        <h1 className='text-white text-xl font-bold text-center border-t-2 border-white'>
                                            {item_.heroSlideSubTitle}
                                        </h1>

                                        {activeIndex === index && (
                                            <Title animate={animateText}>
                                                {firstPart} <br />
                                                <LastWord>{lastWord}</LastWord>
                                            </Title>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default SwipeComp;
