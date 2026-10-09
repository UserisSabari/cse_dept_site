'use client';

import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ColoredSection from './ColoredSection';

function HeroSection() {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.readyState >= 2) {
            setIsVideoLoaded(true);
        }

        const handleLoaded = () => setIsVideoLoaded(true);
        video.addEventListener('loadeddata', handleLoaded);
        video.addEventListener('canplay', handleLoaded);
        video.addEventListener('playing', handleLoaded);

        video.play().catch(() => {
            // Autoplay with audio might be blocked, but video is muted
        });

        return () => {
            video.removeEventListener('loadeddata', handleLoaded);
            video.removeEventListener('canplay', handleLoaded);
            video.removeEventListener('playing', handleLoaded);
        };
    }, []);

    return (
        <ColoredSection color="WHITE">
            <div className="relative h-screen overflow-hidden">
                <div
                    className="flex gap-2 content absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white z-10"
                    data-aos="fade-right"
                >
                    <div className="lg:w-3 lg:h-3 w-2 h-2 mt-3 bg-white"></div>
                    <div>
                        <h1 className="lg:text-4xl font-bold text-[20px]">
                            COMPUTER SCIENCE AND ENGINEERING
                        </h1>
                        <p className="font-bold lg:text-[18px] text-[10px]">
                            GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM,
                            PALAKKAD
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden relative w-full h-screen">
                    <img
                        src="/bg.png"
                        alt="Background"
                        className={`w-full h-full object-cover absolute top-0 z-[-2] transition-opacity duration-700 ${
                            isVideoLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <video
                        ref={videoRef}
                        id="backgroundVideo"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsVideoLoaded(true)}
                        onCanPlay={() => setIsVideoLoaded(true)}
                        onPlaying={() => setIsVideoLoaded(true)}
                        className={`w-full h-full object-cover absolute top-0 z-[-1] transition-opacity duration-700 ${
                            isVideoLoaded ? 'opacity-100' : 'opacity-90'
                        }`}
                    >
                        <source src="/frontVid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </ColoredSection>
    );
}

export default HeroSection;
