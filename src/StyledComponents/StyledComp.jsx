import styled, { keyframes } from "styled-components";



const Animation = keyframes`   // 
0% {
  transform: translateY(50px);
  opacity: 0;
}
100% {
  transform: translateY(0);
  opacity: 1;
}
`

export const AnimatedCard = styled.div`
animation: ${Animation} 0.8s ease-out
`


const SideMenuWidth = keyframes`   
0% {
width: 10%;
}
100% {
width: 40%;
}
`


export const AnimatedCard_ = styled.div`
animation: ${SideMenuWidth} 1s ease-out
`

export const Sidebar = styled.div`


  width: ${(props) => (props.menuWidth ? "7% " : "25%")};
  transition: width 1s ease;
  padding: 1px;
  overflow: hidden;
  color: white;

  left: 0;
  top: 0;
`;