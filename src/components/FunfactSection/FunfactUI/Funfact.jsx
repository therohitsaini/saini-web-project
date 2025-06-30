// Funfact.js
import React from 'react';
import CounterBox from '../CounterBox';

const defualtData = [
    { projectCount: 100, aboutProject: 'Our Visionary Speakers' },
    { projectCount: 120, aboutProject: 'International Sponsors' },
    { projectCount: 150, aboutProject: 'Our Satisfied Client' },
    { projectCount: 125, aboutProject: 'Our Satisfied Client' },



];

function Funfact({ funfactData }) {

    return (
        <div className='funfact-section-main h-auto min-h-[400px] w-full relative bg-black flex flex-wrap gap-10 justify-center items-center py-16'>
            <div className='absolute inset-0 bg-black/80 z-10'></div>
            <div className='relative z-20 grid grid-cols-4 gap-10 w-full px-30'>
                {
                    (funfactData ? funfactData : defualtData)?.map((item, index) => {
                        console.log("item___T", item)
                        return (
                            <CounterBox key={index} countTo={item.projectCount} label={item.aboutProject} />
                        )
                    })}
            </div>
        </div>
    );
}

export default Funfact;
