

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

function FeatureSection() {
    const leftFeatures = features.filter(f => f.side === 'left');
    const rightFeatures = features.filter(f => f.side === 'right');

    return (
        <section className="py-16 px-10 bg-white">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">
                        Our <span className="text-blue-600">Feature</span>
                    </h2>
                    <p className="text-gray-600 mt-2">
                        There are many variations of passages of Lorem Ipsum available
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    <ul className="space-y-8">
                        {
                            leftFeatures.map((feature, index) => (
                                <div key={index} className='info-1 shadow-black/10 shadow-xl bg-white h-20 relative'>
                                    <img className='object-cover h-full w-full' src='../src/assets/photorealistic-earth-planet_23-2151075927.avif' alt="background" />
                                    <div className='data-container h-full w-full absolute top-0 bg-white hover:bg-black/40 duration-1000 flex px-10 group'>
                                    </div>
                                </div>
                            ))}
                    </ul>


                    <div className="hidden md:block text-center h-[400px]">
                        <img
                            src="http://127.0.0.1:5500/corpex-html/assets/images/feature.png"
                            alt="Feature"
                            className="mx-auto max-h-[400px] "
                        />
                    </div>


                    <ul className="space-y-8">
                        {rightFeatures.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition"
                            >
                                <div className="flex items-center gap-4">
                                    <i className={`fa ${feature.icon} text-blue-600 text-xl`}></i>
                                    <h5 className="font-semibold">{feature.title}</h5>
                                </div>
                                <a href="#" className="text-blue-600 hover:text-blue-800">
                                    <i className="fa fa-angles-right"></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
export default FeatureSection