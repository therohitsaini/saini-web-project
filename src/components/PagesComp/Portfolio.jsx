import { Button } from '@mui/material';
import React, { useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FadeInWrapper from '../../StyledComponents/FadeInWrapper';
import { allFaMdIconsList } from '../NavbarComponent/HeaderTopLeft';

const portfolioData = [
    {
        id: 1,
        categories: ['design', 'marketing'],
        title: 'Business Consulting',
        subTitle: 'Free Consulting',
        userImage: 'https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?uid=R167309508&ga=GA1.1.364351455.1750148139&semt=ais_hybrid&w=740',
        Icone: "FaLightbulb"
    },
    {
        id: 2,
        categories: ['development', 'support', 'marketing'],
        title: 'Winning Work',
        subTitle: 'Development Strategy',
        // userImage: 'https://www.freepik.com/free-photo/smiling-businessman-working-his-office-businessperson-professional-environment_22063511.htm#from_element=cross_selling__photo'
        userImage: 'https://image.shutterstock.com/image-photo/group-colleagues-engaging-discussion-during-260nw-2461746317.jpg'

    },
    {
        id: 3,
        categories: ['support', 'design'],
        title: 'Winning Work',
        subTitle: 'Development Strategy',
        userImage: 'https://i.pinimg.com/736x/18/56/6a/18566ae109b69b079d38e7884b2976df.jpg'

    },
    {
        id: 4,
        categories: ['marketing', 'development', 'support'],
        title: 'Winning Work',
        subTitle: 'Development Strategy',
        userImage: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/userImage-3.jpg'

    },
    {
        id: 5,
        categories: ['design', 'development'],
        title: 'Winning Work',
        subTitle: 'Development Strategy',
        userImage: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/userImage-4.jpg'

    },
    {
        id: 6,
        categories: ['support', 'marketing'],
        title: 'Winning Work',
        subTitle: 'Development Strategy',
        userImage: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/userImage-6.jpg'

    },
];

const categories = ['all', 'design', 'development', 'marketing', 'support'];

export default function PortfolioSection({ portFolioData }) {
    const [activeFilter, setActiveFilter] = useState('all');

    // const filteredItems = portFolioData ? portFolioData : portfolioData.filter(item =>
    //     activeFilter === 'all' || item.categories.includes(activeFilter)
    // );
    const baseData = Array.isArray(portFolioData) && portFolioData.length > 0
        ? portFolioData
        : portfolioData;

    const filteredItems = baseData.filter(item =>
        activeFilter === 'all' || item.categories.includes(activeFilter)
    );

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                {/* <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold">
                        Our <span className="text-[#df442d]">Portfolio</span>
                    </h2>
                    <p className="mt-2 text-gray-600">
                        There are many variations of passages of Lorem Ipsum available
                    </p>
                </div> */}
                <div className='title-secton-top flex flex-col items-center mb-10'>
                    <h1 className='heading font-bold text-3xl my-3 flex items-center gap-2'>Our <div className='bg-red-600/40 pl-0 p-3 px-3 rounded-l-[100px] rounded-r-[30px]' > <span className='rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white' >Portfolio </span></div> </h1>
                    <p className='paraghraph font-light text-slate-600' >There are many variations of passages of Lorem Ipsum available</p>
                </div>

                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            sx={{
                                bgcolor: activeFilter === cat ? '#df442d' : 'transparent',
                                color: activeFilter === cat ? 'white' : 'text.primary',
                                textTransform: 'capitalize',
                                px: 2,
                                py: 1,
                                borderBottomLeftRadius: '30px',
                                borderBottomRightRadius: '30px',
                                borderTopLeftRadius: '6px',
                                borderTopRightRadius: '6px',
                                fontSize: '15px',
                                fontVariant: "all-small-caps"
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
                    {filteredItems && filteredItems.map((item_) => {
                        const imgSrc = item_?.userImage?.startsWith('http')
                            ? item_.userImage
                            : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${item_.userImage?.replace(/^\/?/, '')}`;
                        const iconeName = item_?.Icone;
                        const IconeComponent = allFaMdIconsList[iconeName];

                        return (
                            <FadeInWrapper key={item_.id}>
                                <div
                                    className="relative bg-white shadow-lg rounded-lg overflow-hidden group transition-transform duration-300"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-[linear-gradient(to_bottom,_black,_#df442d)]"></div>

                                    <img
                                        src={imgSrc}
                                        alt={item_.title}
                                        className="w-full h-[500px] object-cover"
                                    />

                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 overflow-hidden">
                                        <div className="absolute bottom-[-130px] group-hover:bottom-0 left-0 right-0 px-4 py-5 transition-all duration-500 text-white bg-black flex flex-col items-center gap-2">
                                            <p className="text-md">{item_.subTitle}</p>
                                            <h4 className="text-lg font-semibold border border-red-500 bg-[#de442c] p-1 px-4 rounded-md">{item_.title}</h4>
                                        </div>

                                        <div className="absolute top-1/2 left-[-140px] transform -translate-y-1/2 transition-all duration-500 group-hover:left-1/2 group-hover:transform group-hover:-translate-x-1/2">
                                            {/* {IconeComponent && */}
                                            <div className="icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 bg-orange-100/20">
                                                <button className="icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl shadow-black/20 shadow-sm bg-[#de442c]">
                                                    <KeyboardDoubleArrowRightIcon sx={{ color: "white" }} />

                                                    {/* <IconeComponent color="white" size={24} /> */}

                                                </button>
                                            </div>
                                            {/* } */}
                                        </div>
                                    </div>
                                </div>
                            </FadeInWrapper>)
                    })}
                </div>
            </div>
        </section>
    );
}
