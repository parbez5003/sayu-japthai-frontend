import React, { useState, useEffect, useCallback } from 'react';

// css import 
import "./Banner.css"
import BannerImages from './BannerImages';

export default function Banner() {


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);



    const getNextIndex = useCallback(
        (currentIndex) => (currentIndex + 1) % BannerImages.length,
        []
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => getNextIndex(prevIndex));
                setIsFadingOut(false);
                setIsFadingIn(true);
            }, 500);
        }, 7000);

        return () => clearInterval(intervalId);
    }, [getNextIndex]);

    useEffect(() => {
        if (isFadingIn) {
            const fadeTimeout = setTimeout(() => {
                setIsFadingIn(false);
            }, 1000);

            return () => clearTimeout(fadeTimeout);
        }
    }, [isFadingIn]);

    const scrollOffset = 300;

    const handleExploreClick = () => {
        const windowHeight = window.innerHeight;
        const targetPosition = windowHeight / 2 + scrollOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    };



    return (
        <>   <div className="overflow-hidden flex justify-center items-center  ">
            <div className="carousel w-full object-cover">
                {BannerImages?.map((image, index) => (
                    <div key={index} className={`carousel-item relative w-full flex justify-center items-center flex-1 overflow-hidden ${index === currentImageIndex ? 'visible' : 'hidden'}`}>
                        <div className={`image-wrapper ${isFadingOut && index === currentImageIndex ? 'fade-out' : ''} ${isFadingIn && index === currentImageIndex ? 'fade-in' : ''}`}>
                            <img
                                src={image}
                                className={`w-full object-cover md:h-full md:w-full h-60 opacity-60 ${index === currentImageIndex ? 'zoom-in' : ''}`}
                                alt={`Image ${index}`}
                            />
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
