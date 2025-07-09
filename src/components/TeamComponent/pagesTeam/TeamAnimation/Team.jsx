import styled, { keyframes } from 'styled-components';


const revealText = keyframes`
  0% { transform: translateX(-200%); opacity: 0; }
  100% { transform: translateX(0%); opacity: 1; }
`;

const revealSub = keyframes`
  0% { transform: translateX(200%); opacity: 0; }
  100% { transform: translateX(0%); opacity: 1; }
`;

const fadeInSocial = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// === STYLED COMPONENTS ===
export const CardStyled = styled.div`
  position: relative;
  overflow: hidden;
 
  transition: all 0.5s ease;

  &:hover .team-content {
    visibility: visible;
  }

  &:hover .team-name {
    animation: ${revealText} 0.6s forwards;
  }

  &:hover .team-role {
    animation: ${revealSub} 0.6s forwards;
  }

  &:hover .social-icon:nth-child(1) {
    animation: ${fadeInSocial} 0.2s forwards;
  }

  &:hover .social-icon:nth-child(2) {
    animation: ${fadeInSocial} 0.4s forwards;
  }

  &:hover .social-icon:nth-child(3) {
    animation: ${fadeInSocial} 0.6s forwards;
  }

  &:hover .social-icon:nth-child(4) {
    animation: ${fadeInSocial} 0.8s forwards;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(255, 103, 51, 0.8),
    rgba(75, 0, 130, 0.8)
  );
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 1;

  ${CardStyled}:hover & {
    opacity: 1;
  }
`;

export const Content = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  text-align: center;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;
