

import { allFaMdIconsMap } from '../../NavbarComponent/HeaderTopLeft';

export const features = [
    {
        side: 'left',
        icon: 'fa-bullhorn',
        title: 'Digital Branding',
    },
    {
        side: 'left',
        icon: 'fa-lightbulb',
        title: 'Marketing Solutions',
    },
    {
        side: 'left',
        icon: 'fa-chart-pie',
        title: 'Business Analytics',
    },
    {
        side: 'left',
        icon: 'fa-wand-magic-sparkles',
        title: 'Creating Solutions',
    },
    {
        side: 'right',
        icon: 'fa-cloud',
        title: 'Cloud Storage',
    },
    {
        side: 'right',
        icon: 'fa-gear',
        title: 'Machine Learning',
    },
    {
        side: 'right',
        icon: 'fa-paintbrush',
        title: 'UX/UI Design',
    },
    {
        side: 'right',
        icon: 'fa-android',
        title: 'App Development',
    },
];

function FeatureSection({ featureHeadlineApies, featureListItemApies }) {
    
    // Use backend data if available, otherwise use fallback
    const featuresToUse = featureListItemApies && featureListItemApies.length > 0 ? featureListItemApies : features;
    
    // Distribute items evenly: if 3 items, 2 left + 1 right
    const totalItems = featuresToUse.length;
    const leftCount = Math.ceil(totalItems / 2);
    const rightCount = totalItems - leftCount;
    
    const leftFeatures = featuresToUse.slice(0, leftCount);
    const rightFeatures = featuresToUse.slice(leftCount);
    
    const imageBG = featureHeadlineApies[0]?.setionImage;
    const imgSrc = imageBG?.startsWith('http')
        ? imageBG
        : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${imageBG?.replace(/^\/?/, '')}`;

    console.log("featureListItemApies", featureListItemApies)
    console.log("leftFeatures", leftFeatures)
    console.log("rightFeatures", rightFeatures)

    return (
        <section className="py-16 px-10 bg-black/10">
            <div className="container mx-auto px-4">

                <div className="w-full flex flex-col justify-center items-center mb-12">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        {featureHeadlineApies[0]?.sectionTitle ?
                            featureHeadlineApies[0].sectionTitle.split(' ').map((word, index) => {
                                // Style the second word (index 1) as the highlighted button
                                if (index === 1) {
                                    return (
                                        <div key={index} className="bg-red-600/40 p-3 px-3 rounded-l-[100px] rounded-r-[30px]">
                                            <span className="rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white">
                                                {word}
                                            </span>
                                        </div>
                                    );
                                } else {
                                    return <span key={index}>{word}</span>;
                                }
                            })
                            :
                            <>
                                Our
                                <div className="bg-red-600/40 p-3 px-3 rounded-l-[100px] rounded-r-[30px]">
                                    <span className="rounded-l-[100px] rounded-r-[30px] p-2 px-3 bg-[#df442d] text-white">
                                        Feature
                                    </span>
                                </div>
                            </>
                        }
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {featureHeadlineApies[0]?.setionDescriptions || "There are many variations"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    <ul className="space-y-8 flex flex-col justify-center h-[400px]">
                        {
                            leftFeatures.map((feature, index) => {
                                // Handle backend data structure
                                const isBackendData = featureListItemApies && featureListItemApies.length > 0;
                                const title = isBackendData ? feature.listTitle : feature.title;
                                const leftIcon = isBackendData ? feature.listIconeLeft : feature.icon;
                                const rightIcon = isBackendData ? feature.listIconeRight : null;
                                const bgImage = isBackendData ? feature.backGroundImage : '../src/assets/photorealistic-earth-planet_23-2151075927.avif';
                                
                                // Get icon components
                                const LeftIconComponent = leftIcon ? allFaMdIconsMap[leftIcon] : null;
                                const RightIconComponent = rightIcon ? allFaMdIconsMap[rightIcon] : null;
                                
                                return (
                                    <div key={index} className='info-1 shadow-black/10 shadow-xl bg-white h-20 relative'>
                                        <img 
                                            className='object-cover h-full w-full' 
                                            src={bgImage?.startsWith('http') ? bgImage : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${bgImage?.replace(/^\/?/, '')}`} 
                                            alt="background" 
                                        />
                                        <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-10 group'>
                                            {/* Left Icon */}
                                            <div className='service-info-icone p-2 w-[20%] flex justify-start items-center'>
                                                {LeftIconComponent && (
                                                    <div className='icon-main h-8 w-8 rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 bg-orange-600/40'>
                                                        <div className='icone-cover duration-700 h-6 w-6 flex justify-center items-center rounded-t-lg rounded-b-2xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                            <LeftIconComponent size={14} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Center Text */}
                                            <div className='service-info flex flex-col justify-center gap-1 w-[60%] text-center'>
                                                <h1 className='info-text text-lg font-semibold text-[#de442c] group-hover:text-white duration-700'>{title}</h1>
                                            </div>
                                            
                                            {/* Right Icon */}
                                            <div className='service-info-icone p-2 w-[20%] flex justify-end items-center'>
                                                {RightIconComponent && (
                                                    <div className='icon-main h-8 w-8 rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 bg-orange-600/40'>
                                                        <div className='icone-cover duration-700 h-6 w-6 flex justify-center items-center rounded-t-lg rounded-b-2xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                            <RightIconComponent size={14} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </ul>


                    <div className="center-img hidden md:block text-center h-[400px]">
                        <img
                            src={
                                imgSrc

                                || "http://127.0.0.1:5500/corpex-html/assets/images/feature.png"
                            }
                            alt="Feature"
                            className="mx-auto max-h-[400px]"
                        />

                    </div>


                    <ul className="space-y-8 flex flex-col justify-center h-[400px]">
                        {rightFeatures.map((feature, index) => {
                            // Handle backend data structure
                            const isBackendData = featureListItemApies && featureListItemApies.length > 0;
                            const title = isBackendData ? feature.listTitle : feature.title;
                            const leftIcon = isBackendData ? feature.listIconeLeft : feature.icon;
                            const rightIcon = isBackendData ? feature.listIconeRight : null;
                            const bgImage = isBackendData ? feature.backGroundImage : null;
                            
                            // Get icon components
                            const LeftIconComponent = leftIcon ? allFaMdIconsMap[leftIcon] : null;
                            const RightIconComponent = rightIcon ? allFaMdIconsMap[rightIcon] : null;
                            
                            return (
                                <div key={index} className='info-1 shadow-black/10 shadow-xl bg-white h-15 relative'>
                                    <img 
                                        className='object-cover h-full w-full' 
                                        src={bgImage?.startsWith('http') ? bgImage : '../src/assets/photorealistic-earth-planet_23-2151075927.avif'} 
                                        alt="background" 
                                    />
                                    <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-10 group'>
                                        {/* Left Icon */}
                                        <div className='service-info-icone p-2 w-[20%] flex justify-start items-center'>
                                            {LeftIconComponent && (
                                                <div className='icon-main h-8 w-8 rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 bg-orange-600/40'>
                                                    <div className='icone-cover duration-700 h-6 w-6 flex justify-center items-center rounded-t-lg rounded-b-2xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                        <LeftIconComponent size={14} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Center Text */}
                                        <div className='service-info flex flex-col justify-center gap-1 w-[60%] text-center'>
                                            <h1 className='info-text text-lg font-semibold text-[#de442c] group-hover:text-white duration-700'>{title}</h1>
                                        </div>
                                        
                                        {/* Right Icon */}
                                        <div className='service-info-icone p-2 w-[20%] flex justify-end items-center'>
                                            {RightIconComponent && (
                                                <div className='icon-main h-8 w-8 rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 bg-orange-600/40'>
                                                    <div className='icone-cover duration-700 h-6 w-6 flex justify-center items-center rounded-t-lg rounded-b-2xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                        <RightIconComponent size={14} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
export default FeatureSection