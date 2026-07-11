"use client";

// TODO: For future implementation - rename this file to HeroSection.jsx and move it to src/components/ to avoid unintended Next.js App Router route creation (/HomePage).

import React, { useEffect, useState, useRef } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { motion } from "framer-motion";
import ColoredSection from "../../../components/ColoredSection";

const HIGHLIGHT_TIMEOUT_MS = 3000;
const AUTO_OPEN_TIMEOUT_MS = 3000;

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const notificationRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(true);
  
  // TODO: isHover state kept for future implementation
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHighlighting(false);
    }, HIGHLIGHT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!hasAutoOpened) {
      setIsVisible(true);
      setHasAutoOpened(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, AUTO_OPEN_TIMEOUT_MS);
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <ColoredSection color="WHITE">
      <div className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex gap-2 content absolute bottom-0 left-0 w-full p-8 lg:p-12 text-white"
        >
          <div className="lg:w-3 lg:h-3 w-2 h-2 mt-3 bg-white"></div>
          <div>
            <h1 className="lg:text-4xl font-bold text-[20px]">
              COMPUTER SCIENCE AND ENGINEERING
            </h1>
            <p className="font-bold lg:text-[18px] text-[10px]">
              GOVERNMENT ENGINEERING COLLEGE, SREEKRISHNAPURAM, PALAKKAD
            </p>
          </div>
        </motion.div>

        <div className="overflow-hidden relative w-full h-screen">
          <img
            src="/placeholder-image.jpeg"  // Replace with your placeholder image path
            alt=""
            aria-hidden="true"
            className={`w-full h-full object-cover absolute top-0 z-[-2] transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <video
            src="frontVid.mp4"  // Replace with your video path
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover absolute top-0 z-[-1] transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <motion.button
            ref={notificationRef}
            onClick={handleClick}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }}
            aria-expanded={isVisible}
            aria-label="Toggle notifications"
            className={`absolute bottom-48 right-0 mt-48 box-content px-3 py-2 w-12 rounded-sm cursor-pointer transition-all duration-500 ${
              isHighlighting ? "animate-pulse scale-110" : ""
            }`}
            style={{
              background: isHighlighting ? "rgba(255, 255, 255, 0.30)" : "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MdOutlineNotifications style={{ color: "#FFFFFF" }} size={26} aria-hidden="true" />
          </motion.button>

          {isVisible && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.10)",
                backdropFilter: "blur(30px)",
              }}
              className="text-white h-24 bottom-48 absolute mt-48 right-5 box-content px-3 py-2 rounded-sm cursor-pointer"
            >
              <div className="flex gap-3 mb-3">
                <h2 className="text-[20px]">NOTIFICATION</h2>
                <MdOutlineNotifications
                  style={{ color: "#FFFFFF" }}
                  size={26}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p>SERIES EXAM STARTS IN DECEMBER</p>
                <p>20 2023 FOR S3 AND S5 STUDENTS</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ColoredSection>
  );
}

export default Home;
