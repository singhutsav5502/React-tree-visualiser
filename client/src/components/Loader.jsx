import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({isDark}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updatePosition);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
        };
    }, []);

    return (
        <div className="loader" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
            <svg
                version="1.1"
                id="loader-1"
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 50 50"
                style={{ enableBackgroud: 'new 0 0 50 50' }}
            >
                <path
                    fill={isDark?'#fff':'#000'}
                    d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                >
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};

export default Loader;
