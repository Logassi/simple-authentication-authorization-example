"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const slides = [
    {
      image: "/images/hero1.jpg",
      title: "After-Dark Happenings",
      subtitle: "Discover nightlife events near you.",
      button: "Explore Now",
    },
    {
      image: "/images/hero2.png",
      title: "Rave Revivals",
      subtitle: "Experience music like never before.",
      button: "Find Out More",
    },
    {
      image: "/images/hero3.jpg",
      title: "Dusk or Dawn",
      subtitle: "We've got just the thing.",
      button: "Join Events",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative mx-auto max-w-screen-xl h-[500px] overflow-hidden rounded-lg shadow-lg mt-4">
      {/* Slides */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-in-out"
        key={slides[currentImageIndex].image}
      >
        <img
          src={slides[currentImageIndex].image}
          alt={slides[currentImageIndex].title}
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white space-y-4">
          <h2 className="text-4xl font-bold">
            {slides[currentImageIndex].title}
          </h2>
          <p className="text-lg">{slides[currentImageIndex].subtitle}</p>
          <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-all">
            {slides[currentImageIndex].button}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300"
        onClick={handleNext}
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full ${
              currentImageIndex === index ? "bg-orange-500" : "bg-gray-400"
            } focus:outline-none`}
          ></button>
        ))}
      </div>
    </div>
  );
}
