import React, { useState, useEffect } from 'react';
import banner1 from '../asset/banner/1.png';
import banner2 from '../asset/banner/2.png';
import banner3 from '../asset/banner/3.png';
import banner4 from '../asset/banner/4.png';

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            url: banner1,
            alt: "Quiz Banner 1"
        },
        {
            url: banner2,
            alt: "Quiz Banner 2"
        },
        {
            url: banner3,
            alt: "Quiz Banner 3"
        },
        {
            url: banner4,
            alt: "Quiz Banner 4"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-10">
            <div className="relative w-full h-[140px] overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-[140px] object-cover flex-shrink-0"
                        />
                    ))}
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;