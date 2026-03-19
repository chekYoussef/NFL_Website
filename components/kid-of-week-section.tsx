"use client";

import { useEffect, useRef, useState } from "react";

export function KidOfWeekSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Image block */}
          <div
            className={`relative flex-shrink-0 w-full md:w-64 lg:w-80 transition-all duration-900 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Blue angled background */}
            <div
              className="absolute -inset-3 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #0066CC 0%, #004499 100%)",
                transform: "rotate(-3deg)",
              }}
            />

            {/* Photo */}
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ border: "3px solid #0066CC" }}
            >
              <img
                src="kidoftheweek.png"
                alt="Kid of the Week"
                className="w-full object-cover"
                style={{ height: "320px", objectPosition: "center top" }}
              />
            </div>

            {/* USA badge */}
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-10"
              style={{ background: "#FFD700" }}
            >
              <span
                className="font-black text-lg"
                style={{
                  color: "#001433",
                  fontFamily: "'Anton', 'Impact', sans-serif",
                }}
              >
                USA
              </span>
            </div>
          </div>

          {/* Text block */}
          <div
            className={`flex-1 transition-all duration-900 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h2
              className="text-4xl md:text-5xl font-black mb-5"
              style={{
                color: "#FF6B35",
                fontFamily: "'Anton', 'Impact', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              KID OF THE WEEK
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed mb-8"
              style={{ color: "#001433", fontWeight: 600 }}
            >
              &ldquo;I REALLY LIKE SPECIAL OLYMPICS BECAUSE IT GIVES ME A PLACE
              WHERE I CAN BE INCREDIBLE!&rdquo; SALLY, A SPECIAL OLYMPICS
              ATHLETE TRAINS SO DILIGENTLY IN GYMNASTICS AND CLEARLY HAS FOUND
              GREAT SUCCESS AND A COMMUNITY THAT HELPS HER TO EXCEL! THE SPECIAL
              OLYMPICS PUTS CHILDREN AND ADULTS WITH INTELLECTUAL DISABILITIES
              FROM ALL AROUND THE WORLD AT THE FOREFRONT.
            </p>

            <button
              className="px-8 py-3 rounded-lg font-bold text-white text-sm tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              style={{
                background: "#00A878",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
