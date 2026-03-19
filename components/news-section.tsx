"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "NFL COACHING REVAMP",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80",
  },
  {
    id: 2,
    title: "RECORD SETTING PARTICIPATION",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
  },
  {
    id: 3,
    title: "NFL PLAYER MEET AND GREET",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500&q=80",
  },
  {
    id: 5,
    title: "COMMUNITY OUTREACH EVENT",
    image:
      "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=500&q=80",
  },
];

const VISIBLE = 3;

export function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const maxIndex = newsItems.length - VISIBLE;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const prev = () => setCurrentIndex((p) => Math.max(0, p - 1));
  const next = () => setCurrentIndex((p) => Math.min(maxIndex, p + 1));

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20"
      style={{ background: "#ec8118" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className={`text-4xl md:text-5xl font-black text-white text-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "'Anton', 'Impact', sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          CURRENT NEWS
        </h2>

        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / VISIBLE + 1.8)
                }%)`,
              }}
            >
              {newsItems.map((item, index) => {
                const isCentered = index === currentIndex + 1;
                return (
                  <div
                    key={item.id}
                    className="flex-shrink-0 transition-all duration-500"
                    style={{
                      width: `calc(${100 / VISIBLE}% - 14px)`,
                      minWidth: 220,
                      transform: isCentered ? "scale(1.07)" : "scale(1)",
                      zIndex: isCentered ? 10 : 1,
                    }}
                  >
                    <div className="group cursor-pointer rounded-xl overflow-hidden shadow-xl relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ height: 200 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3
                          className="text-white font-black text-sm text-center leading-tight"
                          style={{
                            fontFamily: "'Anton', 'Impact', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-7">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? 24 : 10,
                  height: 10,
                  background:
                    i === currentIndex ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
