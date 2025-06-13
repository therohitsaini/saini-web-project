import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { swiper_image } from "../JsonData/Swiper.json"



function SwipeComp() {

    return (
        <div className='swiper-main '>
            <div>
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

                    <div className=''>
                        {
                            swiper_image.map((img_, index) => {
                                return (
                                    <SwiperSlide  >
                                        <div className='h-screen w-full'>
                                            <img className=' h-full w-full object-cover' src={img_.img} />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </div>
                </Swiper>


            </div >

            <div className='info-section border  ' >
                <div className='info-card-section     bg-red-500  border border-red-500'>
                    jjjjjjjjjjjjjjjjjjjj
                </div>
            </div>
        </div>
    )
}

export default SwipeComp;