// Funfact.js
import React from 'react';
import CounterBox from '../CounterBox';
import styled, { keyframes } from "styled-components";
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionWrapper = styled.div`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? "translateY(0)" : "translateY(60px)")};
  animation: ${({ inView }) => (inView ? fadeInUp : "none")} 0.6s ease forwards;
  transition: opacity 0.5s, transform 0.5s;
`;

const defualtData = [
    { projectCount: 100, aboutProject: 'Our Visionary Speakers' },
    { projectCount: 120, aboutProject: 'International Sponsors' },
    { projectCount: 150, aboutProject: 'Our Satisfied Client' },
    { projectCount: 125, aboutProject: 'Our Satisfied Client' },



];

function Funfact({ funfactData }) {

    const sectionRef = useRef();
    const [inView, setInView] = useState(false);
    const lastScrollY = useRef(0);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentY = window.scrollY;
                const isScrollingDown = currentY > lastScrollY.current;

                if (entry.isIntersecting && isScrollingDown) {
                    setInView(true);
                }

                lastScrollY.current = currentY;
            },
            { threshold: 0.2 }
        );

        const element = sectionRef.current;
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <SectionWrapper ref={sectionRef} inView={inView} className='funfact-section-main h-auto min-h-[400px] w-full relative bg-black flex flex-wrap gap-10 justify-center items-center py-16'>
            <div className='absolute inset-0 bg-black/80 z-10'></div>
            <div className='relative z-20 grid grid-cols-4 gap-10 w-full px-30'>
                {
                    (funfactData && funfactData.length > 0 ? funfactData : defualtData)
                        ?.map((item, index) => {

                            return (
                                <CounterBox key={index} countTo={item.projectCount} label={item.aboutProject} />
                            )
                        })}
            </div>
        </SectionWrapper>
    );
}

export default Funfact;
