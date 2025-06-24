// FadeInWrapper.jsx
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

const AnimatedDiv = styled.div`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: scale(${(props) => (props.show ? 1 : 0.95)});
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const FadeInWrapper = ({ children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(t);
    }, []);

    return <AnimatedDiv show={show}>{children}</AnimatedDiv>;
};

export default FadeInWrapper;
