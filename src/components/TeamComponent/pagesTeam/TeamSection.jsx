import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CardStyled, Content, Overlay } from './TeamAnimation/Team';

const teamMembers = [
  {
    name: 'Robert Nikola',
    role: 'Executive',
    image: 'https://i.pinimg.com/736x/66/98/6a/66986a4cd7e89b01846a5a4dd04baeb9.jpg',
  },
  {
    name: 'Albert Fion',
    role: 'Executive',
    image: 'https://i.pinimg.com/736x/d6/73/1f/d6731f4c2cc28f51d9d0f82b5c569d01.jpg',
  },
  {
    name: 'Smith Wello',
    role: 'Executive',
    image: 'https://i.pinimg.com/736x/f5/80/18/f580189bf15bc44196430638ec458eb2.jpg',
  },
  {
    name: 'Rose Tailor',
    role: 'Executive',
    image: 'https://i.pinimg.com/736x/c9/0a/2a/c90a2a52662404efd47a69ebdbe81619.jpg',
  },
];



const TeamSection = () => {
  return (
    <section
      className="relative py-10  bg-cover bg-center"
      style={{ backgroundImage: "url(https://plus.unsplash.com/premium_photo-1747949065380-72eb5f00750c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwZW1wbG95JTIwYmclMjBpbWd8ZW58MHx8MHx8fDA%3D)" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      {/* <div className="relative container mx-auto px-4 z-10">
                <div className="text-center mb-12 text-white">
                    <h2 className="text-4xl font-bold">
                        Our <span className="text-orange-400">Team</span>
                    </h2>
                    <p className="mt-2 text-gray-300">
                        There are many variations of passages of Lorem Ipsum available
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <CardStyled key={index} className="shadow-lg bg-white">
                            <div className="relative h-[450px] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                                <Overlay />
                            </div>

                            <Content className="team-content">
                                <h4 className="team-name text-white bg-orange-500 px-4 py-2 mb-3 text-xl font-semibold rounded">
                                    {member.name}
                                </h4>
                                <span className="team-role text-white bg-indigo-500 px-3 py-1 text-sm rounded mb-3">
                                    {member.role}
                                </span>
                                <div className="flex gap-3">
                                    {['facebook', 'twitter', 'instagram', 'pinterest'].map((icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="social-icon text-orange-500 bg-white bg-opacity-40 hover:bg-orange-600 hover:text-white w-9 h-9 flex items-center justify-center rounded-t-2xl rounded-b-md transition relative"
                                        >
                                            <i className={`fab fa-${icon}`} />
                                        </a>
                                    ))}
                                </div>
                            </Content>
                        </CardStyled>
                    ))}
                </div>
            </div> */}
      <div className="relative container mx-auto px-4 z-10 ">
        <div className='heading-secton-top flex flex-col items-center mb-15  '>
          <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2 text-white'>Our <div className='bg-orange-600/30 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Team </span></div> </h1>
          <p className='paraghraph font-light text-slate-300' >There are many variations of passages of Lorem Ipsum available</p>
        </div>

        {teamMembers.length > 4 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index} >
                <CardStyled className="shadow-lg bg-white">
                  <div className="relative h-[450px] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <Overlay />
                  </div>

                  <Content className="team-content">
                    <h4 className="team-name text-white bg-orange-500 px-4 py-2 mb-3 text-xl font-semibold rounded">
                      {member.name}
                    </h4>
                    <span className="team-role text-white bg-indigo-500 px-3 py-1 text-sm rounded mb-3">
                      {member.role}
                    </span>
                    <div className="flex gap-3">
                      {['facebook', 'twitter', 'instagram', 'pinterest'].map((icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="social-icon text-orange-500 bg-white bg-opacity-40 hover:bg-orange-600 hover:text-white w-9 h-9 flex items-center justify-center rounded-t-2xl rounded-b-md transition relative"
                        >
                          <i className={`fab fa-${icon}`} />
                        </a>
                      ))}
                    </div>
                  </Content>
                </CardStyled>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-20">
            {teamMembers.map((member, index) => (
              <CardStyled key={index} className="shadow-lg bg-white">
                <div className="relative h-[450px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <Overlay />
                </div>

                <Content className="team-content">
                  <h4 className="team-name text-white bg-orange-500 px-4 py-2 mb-3 text-xl font-semibold rounded">
                    {member.name}
                  </h4>
                  <span className="team-role text-white bg-indigo-500 px-3 py-1 text-sm rounded mb-3">
                    {member.role}
                  </span>
                  <div className="flex gap-3">
                    {['facebook', 'twitter', 'instagram', 'pinterest'].map((icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="social-icon text-orange-500 bg-white bg-opacity-40 hover:bg-orange-600 hover:text-white w-9 h-9 flex items-center justify-center rounded-t-2xl rounded-b-md transition relative"
                      >
                        <i className={`fab fa-${icon}`} />
                      </a>
                    ))}
                  </div>
                </Content>
              </CardStyled>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default TeamSection;
