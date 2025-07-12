import styled from "styled-components";

export const posts = [
    {
        id: 1,
        blogHeading: "Developing Leaders & Performance Team",
        blogerImage:
            "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
        blogDatePicker: "10 Mar, 2023",
        goIcone: "",
        blogerRoleIocne: "",
        blogerRole: "Admin",
        blogDescription: "There are many variations of passages of Lorem Ipsum available",
        blogButton: "Get Start"
    },
    {
        id: 2,
        blogHeading: "That Should Include In Your Marketing Plan",
        blogerImage:
            "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
        blogDatePicker: "10 Mar, 2023",
        goIcone: "",
        blogerRoleIocne: "",
        blogerRole: "Admin",
        blogDescription: "There are many variations of passages of Lorem Ipsum available",
        blogButton: "Get Start"
    },
    {
        id: 3,
        blogHeading: "How To Manage Business Reputation",
        blogerImage:
            "https://i.pinimg.com/736x/fd/96/24/fd9624ae8ebf666a6661ff666fa06c45.jpg",
        blogDatePicker: "10 Mar, 2023",
        goIcone: "",
        blogerRoleIocne: "",
        blogerRole: "Admin",
        blogDescription: "There are many variations of passages of Lorem Ipsum available",
        blogButton: "Get Start"
    },
];

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(3, 10, 21, 0.7);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
`;

export const HoverButton = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -150%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 20;
`;

export const PostImage = styled.figure`
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover ${Overlay} {
    opacity: 1;
    visibility: visible;
  }

  &:hover ${HoverButton} {
    transform: translate(-50%, -50%);
    opacity: 1;
    visibility: visible;
  }

  img {
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;