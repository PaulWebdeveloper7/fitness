// components/Hero.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const slides = [
  {
    title: "Welcome to Fitness Hub",
    imageUrl: "/hero02.svg",
    desc: "The first fitness app designed to improve your fitness, practice mindfulness, and prepare for new adventures with tailored workouts and meditations.",
  },
  {
    title: "Take Your First Step Toward Yoga",
    imageUrl: "/hero05.svg",
    desc: "Begin your journey into yoga with guided sessions and a supportive community.",
  },
  {
    title: "Train Your Muscles",
    imageUrl: "/hero03.svg",
    desc: "Enhance your strength and endurance with focused muscle training programs.",
  },
  {
    title: "Join Zumba Classes",
    imageUrl: "/hero5.jpg",
    desc: "Dance your way to fitness with our energizing Zumba classes.",
  },
  {
    title: "Unlock Your Full Potential with Yoga Live Sessions",
    imageUrl: "/hero6.png",
    desc: "Experience live yoga sessions that help you unlock your full potential and achieve inner balance.",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter()

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 9000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, []);
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out w-screen"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-screen flex-shrink-0 flex justify-center items-center "
          >
            <div className="relative w-screen flex justify-center bg-black h-screen items-center">
            <Image src={slide.imageUrl} alt={slide.text} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white flex-col gap-4 ">
                <h2 className="text-5xl font-extrabold text-center">
                  {slide.title}
                </h2>
                <p className=" p-10 ">{slide.desc}</p>
                <button
                  type="button"
                  className=" m-5  px-20 bg-white text-black py-5 text-2xl"
                  onClick={() => {
                    router.push("/sign-up");
                  }}
                >
                  Get Started
                </button>
                <div className=" text-sm flex gap-4 ">
                  <h3>Already have an account?</h3>
                  <p className="underline" onClick={()=>{router.push('/sign-in')}}>Sign in</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2  px-4 py-2 rounded-full shadow-md text-2xl font-extrabold "
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className=" font-extrabold absolute top-1/2 right-2 transform -translate-y-1/2  px-4 py-2  rounded-full shadow-md text-2xl"
      >
        ›
      </button>
    </div>
  );
};

export default HeroCarousel;
