import { Button } from '@mui/material';
import React, { useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FadeInWrapper from '../../StyledComponents/FadeInWrapper';

const portfolioData = [
    {
        id: 1,
        categories: ['design', 'marketing'],
        title: 'Business Consulting',
        subtitle: 'Free Consulting',
        image: 'https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?uid=R167309508&ga=GA1.1.364351455.1750148139&semt=ais_hybrid&w=740'
    },
    {
        id: 2,
        categories: ['development', 'support', 'marketing'],
        title: 'Winning Work',
        subtitle: 'Development Strategy',
        image: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/image-1.jpg'

    },
    {
        id: 3,
        categories: ['support', 'design'],
        title: 'Winning Work',
        subtitle: 'Development Strategy',
        image: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/image-2.jpg'

    },
    {
        id: 4,
        categories: ['marketing', 'development', 'support'],
        title: 'Winning Work',
        subtitle: 'Development Strategy',
        image: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/image-3.jpg'

    },
    {
        id: 5,
        categories: ['design', 'development'],
        title: 'Winning Work',
        subtitle: 'Development Strategy',
        image: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/image-4.jpg'

    },
    {
        id: 6,
        categories: ['support', 'marketing'],
        title: 'Winning Work',
        subtitle: 'Development Strategy',
        image: 'http://127.0.0.1:5500/corpex-html/assets/images/portfolio/image-6.jpg'

    },
];

const categories = ['all', 'design', 'development', 'marketing', 'support'];

export default function PortfolioSection() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredItems = portfolioData.filter(item =>
        activeFilter === 'all' || item.categories.includes(activeFilter)
    );

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold">
                        Our <span className="text-[#df442d]">Portfolio</span>
                    </h2>
                    <p className="mt-2 text-gray-600">
                        There are many variations of passages of Lorem Ipsum available
                    </p>
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
                                fontVariant:"all-small-caps"
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
                    {filteredItems.map((item) => (
                        <FadeInWrapper key={item.id + activeFilter}>
                            <div
                                className="relative bg-white shadow-lg rounded-lg overflow-hidden group transition-transform duration-300"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-[linear-gradient(to_bottom,_black,_#df442d)]"></div>

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[500px] object-cover"
                                />

                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 overflow-hidden">
                                    <div className="absolute bottom-[-130px] group-hover:bottom-0 left-0 right-0 px-4 py-5 transition-all duration-500 text-white bg-black flex flex-col items-center gap-2">
                                        <p className="text-md">{item.subtitle}</p>
                                        <h4 className="text-lg font-semibold border border-red-500 bg-[#de442c] p-1 px-4 rounded-md">{item.title}</h4>
                                    </div>

                                    <div className="absolute top-1/2 left-[-140px] transform -translate-y-1/2 transition-all duration-500 group-hover:left-1/2 group-hover:transform group-hover:-translate-x-1/2">
                                        <div className="icon-main h-12 w-12 rounded-b-3xl flex justify-center items-end rounded-t-xl duration-700 bg-orange-100/20">
                                            <button className="icone-cover duration-700 h-10 w-10 flex justify-center items-center rounded-t-xl rounded-b-3xl shadow-black/20 shadow-sm bg-[#de442c]">
                                                <KeyboardDoubleArrowRightIcon sx={{ color: "white" }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
