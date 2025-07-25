import { allFaMdIconsMap } from '../../NavbarComponent/HeaderTopLeft';
import img from "../../../assets/feature.png"
import fallbackImage from '../../../assets/feature.png';

export const features = [
    {
        side: 'left',
        icon: 'FaMapMarked',
        title: 'Digital Branding',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'left',
        icon: 'FaCodeBranch',
        title: 'Marketing Solutions',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'left',
        icon: 'MdBusiness',
        title: 'Business Analytics',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'left',
        icon: 'MdOutlineCreateNewFolder',
        title: 'Creating Solutions',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'right',
        icon: 'MdCloudSync',
        title: 'Cloud Storage',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'right',
        icon: 'MdAnimation',
        title: 'Machine Learning',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'right',
        icon: 'FaUikit',
        title: 'UX/UI Design',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
    {
        side: 'right',
        icon: 'FaAppStore',
        title: 'App Development',
        listIconeRight: 'MdKeyboardDoubleArrowRight',
    },
];

function FeatureSection({ featureHeadlineApies, featureListItemApies }) {

    const featuresToUse = featureListItemApies && featureListItemApies.length > 0 ? featureListItemApies : features;

    const totalItems = featuresToUse.length;
    const leftCount = Math.ceil(totalItems / 2);
    const rightCount = totalItems - leftCount;

    const leftFeatures = featuresToUse.slice(0, leftCount);
    const rightFeatures = featuresToUse.slice(leftCount);

    // const imageBG = featureHeadlineApies[0]?.setionImage  || "../src/assets/feature.png"
    // const imgSrc = imageBG?.startsWith('http')
    //     ? imageBG
    //     : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${imageBG?.replace(/^\/?/, '')}`;
    const sectionImage = featureHeadlineApies[0]?.setionImage;

    const imgSrc = sectionImage
        ? (sectionImage.startsWith('http')
            ? sectionImage
            : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${sectionImage.replace(/^\/?/, '')}`)
        : fallbackImage;




    return (
        <section className="py-16 px-10 bg-black/10">
            <div className="container mx-auto px-4">

                <div className="w-full flex flex-col justify-center items-center mb-12">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        {
                            featureHeadlineApies[0]?.sectionTitle ?
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
                        {featureHeadlineApies[0]?.setionDescriptions || "There are many variations of passages of Lorem Ipsum available"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    <ul className="space-y-8 flex flex-col  h-[400px] px-5">
                        {
                            leftFeatures.map((feature, index) => {

                                const isBackendData = featureListItemApies && featureListItemApies.length > 0;
                                const title = isBackendData ? feature.listTitle : feature.title;
                                const leftIcon = isBackendData ? feature.listIconeLeft : feature.icon;
                                const rightIcon = isBackendData ? feature.listIconeRight : feature.listIconeRight
                                const bgImage = isBackendData ? feature.backGroundImage : 'https://media.istockphoto.com/id/1136542562/photo/abstract-lights.jpg?b=1&s=612x612&w=0&k=20&c=VzNUPz7Ci6-YFa05W-wJ7TxR2b3qmJyyH6K33QzA4eU=';
                                // console.log()
                                const LeftIconComponent = leftIcon ? allFaMdIconsMap[leftIcon] : null;
                                const RightIconComponent = rightIcon ? allFaMdIconsMap[rightIcon] : null;

                                return (
                                    <div key={index} className='info-1 shadow-black/10 bg-white h-18 relative'>
                                        <img
                                            className='object-cover h-full w-full'
                                            src={bgImage?.startsWith('http') ? bgImage : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${bgImage?.replace(/^\/?/, '')}`}

                                        />
                                        <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-5 group'>
                                            {/* Left Icon */}
                                            <div className='service-info-icone p-2 w-[20%] flex justify-start items-center'>
                                                {
                                                    LeftIconComponent && (
                                                        <div className='icon-main  rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 '>
                                                            <div className='icone-cover duration-700  flex justify-center items-center rounded-t-lg rounded-b-2xl text-slate-500'>
                                                                <LeftIconComponent size={29} />
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                            <div className='service-info flex flex-col justify-center gap-1 w-[60%] '>
                                                <h1 className='info-text text-lg font-semibold text-black group-hover:text-white duration-700'>{title}</h1>
                                            </div>


                                            <div className='service-info-icone p-2 w-[20%] flex justify-end items-center'>
                                                {/* {
                                                    RightIconComponent && (
                                                        <div className='icon-main h-7 w-7   rounded-r-2xl flex justify-center items-end rounded-t-lg duration-700 bg-orange-600/40'>
                                                            <div className='icone-cover duration-700 h-6 w-6 flex justify-center items-center rounded-t-lg rounded-r-2xl shadow-black/20 shadow-sm bg-[#de442c] text-white'>
                                                                <RightIconComponent size={14} />
                                                            </div>
                                                        </div>
                                                    )} */}
                                                {
                                                    RightIconComponent && (
                                                        <div className='  rounded-r-2xl rounded-l-md p-0.5 bg-orange-600/40'>
                                                            <div className='  rounded-r-2xl rounded-l-md my-0.5 h-9 w-10 ml-1 bg-[#de442c] flex justify-center items-center'>
                                                                <RightIconComponent size={24} color='white' />
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
                            src={imgSrc}
                            alt="Feature"
                            className="mx-auto max-h-[400px]"
                        />

                    </div>


                    <ul className="space-y-8 flex flex-col  h-[400px] px-5">
                        {
                            rightFeatures.map((feature, index) => {
                                // Handle backend data structure
                                const isBackendData = featureListItemApies && featureListItemApies.length > 0;
                                const title = isBackendData ? feature.listTitle : feature.title;
                                const leftIcon = isBackendData ? feature.listIconeLeft : feature.icon;
                                const rightIcon = isBackendData ? feature.listIconeRight : feature.listIconeRight
                                const bgImage = isBackendData ? feature.backGroundImage : "https://media.istockphoto.com/id/1136542562/photo/abstract-lights.jpg?b=1&s=612x612&w=0&k=20&c=VzNUPz7Ci6-YFa05W-wJ7TxR2b3qmJyyH6K33QzA4eU= ";

                                // Get icon components
                                const LeftIconComponent = leftIcon ? allFaMdIconsMap[leftIcon] : null;
                                const RightIconComponent = rightIcon ? allFaMdIconsMap[rightIcon] : null;
                                console.log("feature", feature)
                                return (
                                    <div key={index} className='info-1 shadow-black/10  bg-white/20  h-18 relative '>
                                        {/* <img
                                            className='object-cover h-full w-full'
                                            src={bgImage?.startsWith('http') ? bgImage : '../src/assets/photorealistic-earth-planet_23-2151075927.avif'}
                                           
                                        /> */}
                                        <img
                                            className='object-cover h-full w-full'
                                            src={bgImage?.startsWith('http') ? bgImage : `${import.meta.env.VITE_BACK_END_URL.replace(/\/$/, '')}/${bgImage?.replace(/^\/?/, '')}`}
                                            alt="background"
                                        />

                                        <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-5 group'>
                                            {/* Left Icon */}
                                            <div className='service-info-icone p-2 w-[20%] flex justify-start items-center'>
                                                {LeftIconComponent && (
                                                    <div className='icon-main  rounded-b-2xl flex justify-center items-end rounded-t-lg duration-700 '>
                                                        <div className='icone-cover duration-700  flex justify-center items-center rounded-t-lg rounded-b-2xl text-slate-500'>
                                                            <LeftIconComponent size={29} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Center Text */}
                                            <div className='service-info flex flex-col justify-center gap-1 w-[60%] '>
                                                <h1 className='info-text text-lg font-semibold text-black group-hover:text-white duration-700'>{title}</h1>
                                            </div>

                                            {/* Right Icon */}
                                            <div className='service-info-icone p-2 w-[20%] flex justify-end items-center'>
                                                {RightIconComponent && (
                                                    <div className='  rounded-r-2xl rounded-l-md p-0.5 bg-orange-600/40'>
                                                        <div className='  rounded-r-2xl rounded-l-md my-0.5 h-9 w-10 ml-1 bg-[#de442c] flex justify-center items-center'>
                                                            <RightIconComponent size={24} color='white' />
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