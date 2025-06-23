// CounterBox.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';


const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

//----------------------------------------Animated Buttom Box  Start --------------------------------------
const slide = keyframes`
  0% { left: 0; }
  100% { left: 200px; }
`;

const BoxContainer = styled.div`
  
  height: 4px;
  background-color: #e2560a; // orange-500
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const SlidingBox = styled.div`
  width: 100px;
  height: 4px;
  background-color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  animation: ${slide} 2s linear infinite alternate;
`;

//----------------------------------------Animated Buttom Box End  --------------------------------------


const AnimatedContainer = styled.div`
  animation: ${fadeInUp} 0.8s ease-out both;
`;

const RotatingWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  animation: ${rotate} 10s linear infinite;
`;

const Dot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isWhite }) => (isWhite ? 'white' : '#e2560a;')};
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: translate(-50%, -50%);
`;

const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: center;
  white-space: nowrap;
`;

const CounterBox = ({ countTo, label, whiteDots = 6 }) => {
    const [count, setCount] = useState(0);
    const totalDots = 24;
    const radius = 70;
    const center = 80;

    useEffect(() => {
        let current = 0;
        const duration = 2000;
        const increment = countTo / (duration / 30);
        const interval = setInterval(() => {
            current += increment;
            if (current >= countTo) {
                setCount(countTo);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, 30);
        return () => clearInterval(interval);
    }, [countTo]);

    const dots = Array.from({ length: totalDots }, (_, i) => {
        const angle = (360 / totalDots) * i;
        const radian = (angle * Math.PI) / 180;
        const x = center + radius * Math.cos(radian);
        const y = center + radius * Math.sin(radian);
        const isWhite = i < whiteDots;
        return <Dot key={i} top={y} left={x} isWhite={isWhite} />;
    });

    return (
        <AnimatedContainer>
            <div className='flex flex-col justify-center w-50  gap-3'>
                <div className='relative z-20 flex justify-center'>
                    <RotatingWrapper>{dots}</RotatingWrapper>
                    <CenterText>
                        {count}+<br />

                    </CenterText>
                </div>
                <span className="text-2xl font-bold text-white text-center ">{label}</span>
                <BoxContainer>
                    <SlidingBox />
                </BoxContainer>
            </div>
        </AnimatedContainer>
    );
};

export default CounterBox;
