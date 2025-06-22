// Funfact.js
import React from 'react';
import CounterBox from '../CounterBox';

const data = [
    { countTo: 70, label: 'Our Visionary Speakers' },
    { countTo: 120, label: 'International Sponsors' },
    { countTo: 15, label: 'Our Satisfied Client' },
    { countTo: 15, label: 'Our Satisfied Client' },
 


];

function Funfact() {
    return (
        <div className='funfact-section-main h-auto min-h-[400px] w-full relative bg-black flex flex-wrap gap-10 justify-center items-center py-16'>
            <div className='absolute inset-0 bg-black/80 z-10'></div>
            <div className='relative z-20 grid grid-cols-4 gap-10 w-full px-30'>
                {data.map((item, index) => (
                    <CounterBox key={index} countTo={item.countTo} label={item.label} />
                ))}
            </div>
        </div>
    );
}

export default Funfact;
