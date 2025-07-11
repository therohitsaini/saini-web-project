import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CardStyled, Content, Overlay } from './TeamAnimation/Team';
import { teamMembers } from '../TeamFalbakcData/Falbakc';
import { allFaMdIconsList } from '../../NavbarComponent/HeaderTopLeft';
import { Link } from 'react-router-dom';


const TeamSection = ({ teamApiesDataUi, teamHeading }) => {


  const teamHeading_ = teamHeading?.[0] || "";
  const headingText = teamHeading_.teamHeading || "";
  const words = headingText.split(" ");
  const firstWord = words[0] || "";
  const lastWord = words[words.length - 1] || "";

  const TeamData = Array.isArray(teamApiesDataUi) && teamApiesDataUi.length > 0
    ? teamApiesDataUi
    : teamMembers;

  const imgSrc = teamHeading_?.teamBgImage?.startsWith('http')
    ? teamHeading_?.teamBgImage
    : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${teamHeading_?.teamBgImage?.replace(/^\/?/, '')}`;
  console.log("teamMembers", imgSrc)
  return (

    <section
      className="relative py-10  bg-cover bg-center"
      style={{
        backgroundImage: `url(${imgSrc}), url('https://plus.unsplash.com/premium_photo-1747949065380-72eb5f00750c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwZW1wbG95JTIwYmclMjBpbWd8ZW58MHx8MHx8fDA%3D')`
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative container mx-auto px-4 z-10 ">
        <div className='heading-secton-top flex flex-col items-center mb-15  '>
          <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2 text-white'>{firstWord || "Our"} <div className='bg-orange-600/30 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >{lastWord || "Team"} </span></div> </h1>
          <p className='paraghraph font-light text-slate-300 w-[700px] text-center' > {teamHeading_.teamDescription}</p>
        </div>

        {
          TeamData.length > 4 ? (
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
              {
                TeamData?.map((member, index) => (
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
                        <h4 className="team-name text-white  bg-[#df442d] px-4 py-2 mb-3 text-xl font-semibold rounded">
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
          )
            :
            (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-20">
                {TeamData?.map((item_, index) => {

                  const imgSrc = item_?.image?.startsWith('http')
                    ? item_.image
                    : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${item_.image?.replace(/^\/?/, '')}`;


                  const iconName = item_?.Icone;
                  const IconComponent = allFaMdIconsList.find(icon => icon.label === iconName)?.Icon;
                  console.log("item_", item_)
                  return (
                    <CardStyled key={index} className="shadow-lg bg-white">
                      <div className="relative h-[450px] overflow-hidden">
                        <img
                          src={imgSrc || item_.image}
                          alt={item_.name}
                          className="w-full h-full object-cover"
                        />
                        <Overlay />
                      </div>

                      <Content className="team-content">
                        <h4 className="team-name text-white  bg-[#e9523b] px-4 py-2 mb-3 text-xl font-semibold ">
                          {item_.name}
                        </h4>
                        <span className="team-role text-white bg-black px-3 py-1 text-sm  mb-5">
                          {item_.role}
                        </span>

                        <div className="flex gap-3">
                          {item_.item_Icone?.map((iconLabel, i) => {
                            const Icon = allFaMdIconsList.find(ic => ic.label === iconLabel)?.Icon;
                            const url = item_.urls?.[i] || '#';
                            if (!Icon) return null;
                            return (
                              <div className='social-icon w-9 pt-2 rounded-t-xl rounded-b-2xl bg-amber-50/20 flex justify-center hover:bg-red-500/30 duration-700'>
                                <Link
                                  key={i}
                                  href={url}
                                  className=" text-[#de442c] bg-white bg-opacity-40 hover:bg-red-500/50 hover:text-white w-8 h-8 flex items-center justify-center  rounded-t-[10px] rounded-b-2xl transition relative duration-700"
                                  target="_blank" rel="noreferrer"
                                >
                                  {Icon && <Icon size={18} />}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </Content>
                    </CardStyled>
                  );
                })}

              </div>
            )}
      </div>

    </section>
  );
};

export default TeamSection;
