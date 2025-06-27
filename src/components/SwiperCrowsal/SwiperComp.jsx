
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled, { keyframes } from 'styled-components';
import SwiperJsonData from '../JsonData/Swiper.json';
import { allFaMdIcons_ } from '../NavbarComponent/HeaderTopLeft';


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
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  color: white;
  line-height: 1.2;
  animation: ${({ animate }) => (animate ? fadeInUp : 'none')} 1s ease;
`;



const fadeInLeftToRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const ButtonWrraper = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${({ animate }) => (animate ? fadeInLeftToRight : 'none')} 1s ease ;
`;

const LastWord = styled.span`
  color: #de442c;
`;


function SwipeComp({ info }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animateText, setAnimateText] = useState(true);


    const validInfo = Array.isArray(info)
        ? info.filter(item => item?.heroImgUrl?.trim())
        : [];


    const slides = validInfo.length > 0 ? validInfo : SwiperJsonData?.swiper_image;

    const handleSlideChange = (swiper) => {
        setAnimateText(false);
        setTimeout(() => setAnimateText(true), 10);
        setActiveIndex(swiper.activeIndex);
    };

    const iconName = info?.heroImgUrl;
    const IconComponent = allFaMdIcons_[iconName];
    return (
        <div className='swiper-main h-[800px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                {
                    slides.map((item_, index) => {
                        const titleWords = item_?.heroSlideTitle?.trim()?.split(' ') || [];
                        const lastWord = titleWords.pop();
                        const firstPart = titleWords.join(' ');
                        // console.log("item__", item_.)
                        const iconName = item_?.heroPlay_Button;
                        const IconComponent = allFaMdIcons_[iconName];

                        const imgSrc = item_?.heroImgUrl?.startsWith('http')
                            ? item_.heroImgUrl
                            : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${item_.heroImgUrl?.replace(/^\/?/, '')}`;

                        return (
                            <SwiperSlide key={index}>
                                <div className='h-[800px] w-full relative'>
                                    <SlideImage className='h-full w-full object-cover' src={imgSrc} alt="Hero" />

                                    <div className='absolute inset-0 flex justify-center items-center z-20 bg-black/40'>
                                        <div className='hero-text flex flex-col items-center gap-3'>
                                            {IconComponent ? (
                                                <div className='hero-icone flex justify-center w-full mt-30'>
                                                    <div className="h-15 w-15 border border-white flex justify-center items-center rounded-full">
                                                        <div className="h-10 w-10 border border-white flex justify-center items-center rounded-full bg-white text-red-600">
                                                            <IconComponent size={20} />

                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ""}

                                            <h1 className='text-white text-xl font-bold text-center border-t-2 border-white'>
                                                {item_.heroSlideSubTitle}
                                            </h1>

                                            {activeIndex === index && (
                                                <Title animate={animateText}>
                                                    {firstPart} <br />
                                                    <LastWord>{lastWord}</LastWord>
                                                </Title>
                                            )}

                                            <ButtonWrraper animate={true}>
                                                {item_?.heroButton_One && (
                                                    <div className="nav-quate-btn h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/10 p-1.5 pl-0 pr-2 group hover:bg-white/20">
                                                        <button className="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
                                                            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">
                                                                {item_.heroButton_One}
                                                            </span>
                                                            <span className="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
                                                        </button>
                                                    </div>
                                                )}

                                                {item_?.heroButton_Two && (
                                                    <div className="nav-quate-btn h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-white/20">
                                                        <button className="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
                                                            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">
                                                                {item_.heroButton_Two}
                                                            </span>
                                                            <span className="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
                                                        </button>
                                                    </div>
                                                )}
                                            </ButtonWrraper>
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

export default SwipeComp







// function SwipeComp({ info }) {
//     const HeroCrowsel = info.headerData?.HeroSection;
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [animateText, setAnimateText] = useState(true);

//     const handleSlideChange = (swiper) => {
//         setAnimateText(false);
//         setTimeout(() => setAnimateText(true), 10);
//         setActiveIndex(swiper.activeIndex);
//     };

//      console.log("json",SwiperJsonData.swiper_image)

//     return (
//         <div className='swiper-main h-[800px]'>
//             <Swiper
//                 spaceBetween={30}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 4000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{ clickable: true }}
//                 navigation={true}
//                 modules={[Autoplay, Pagination, Navigation]}
//                 className="mySwiper"
//                 onSlideChange={handleSlideChange}
//                 style={{
//                     "--swiper-pagination-color": "#db3125",
//                     "--swiper-navigation-color": "#db3125",
//                 }}
//             >
//                 {
//                     // (HeroCrowsel ? HeroCrowsel : SwiperJsonData.swiper_image)
//                     (info ? info : SwiperJsonData?.swiper_image)?.map((item_, index) => {
//                         const titleWords = item_.heroSlideTitle.trim().split(' ');
//                         const lastWord = titleWords.pop();
//                         const firstPart = titleWords.join(' ');


//                         return (
//                             <SwiperSlide key={index}>
//                                 <div className='h-[800px] w-full relative '>
//                                     {/* {item_?.heroImgUrl && (
//                                         <SlideImage src={`${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}${item_.heroImgUrl}`} alt="Hero" />
//                                     )} */}
//                                     <SlideImage src={item_.heroImgUrl} alt="Hero" />

//                                     <div className='absolute inset-0 flex justify-center items-center z-20 bg-black/40'>
//                                         <div className='hero-text flex flex-col items-center gap-3'>
//                                             <div className='hero-icone flex justify-center w-full mt-30'>
//                                                 <div className="h-15 w-15 border border-white flex justify-center items-center rounded-full">
//                                                     <div className="h-10 w-10 border border-white flex justify-center items-center rounded-full bg-white text-red-600">
//                                                         <PlayArrowIcon />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <h1 className='text-white text-xl font-bold text-center border-t-2 border-white'>
//                                                 {item_.heroSlideSubTitle}
//                                             </h1>

//                                             {activeIndex === index && (
//                                                 <Title animate={animateText}>
//                                                     {firstPart} <br />
//                                                     <LastWord>{lastWord}</LastWord>
//                                                 </Title>
//                                             )}

//                                             <ButtonWrraper className="btn-wrraper" animate={true}>

//                                                 {item_?.heroButton_One && (
//                                                     <div className="nav-quate-btn h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/10 p-1.5 pl-0 pr-2 group hover:bg-white/20">
//                                                         <button className="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
//                                                             <span className="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">
//                                                                 {item_.heroButton_One}
//                                                             </span>
//                                                             <span className="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
//                                                         </button>
//                                                     </div>
//                                                 )}

//                                                 {item_?.heroButton_Two && (
//                                                     <div className="nav-quate-btn h-13 w-33 rounded-l-3xl rounded-r-xl bg-orange-500/20 p-1.5 pl-0 pr-2 group hover:bg-white/20">
//                                                         <button className="relative inline-block h-full w-full font-semibold text-white bg-[#de442c] overflow-hidden group rounded-l-3xl rounded-r-xl">
//                                                             <span className="relative z-10 transition-colors duration-500 group-hover:text-[#db3125] font-semibold">
//                                                                 {item_.heroButton_Two}
//                                                             </span>
//                                                             <span className="absolute top-0 right-0 w-0 h-full bg-white transition-all duration-700 group-hover:w-full group-hover:left-auto group-hover:right-0 z-0"></span>
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </ButtonWrraper>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </SwiperSlide>
//                         );
//                     })}
//             </Swiper>
//         </div>
//     );
// }

// export default SwipeComp;
