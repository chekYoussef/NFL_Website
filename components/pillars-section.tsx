"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, UserCheck } from "lucide-react";

const pillars = [
  {
    Icon: Users,
    title: "COMMUNITY",
    color: "#E91E8C",
    delay: 0,
  },
  {
    Icon: Heart,
    title: "HEALTH & WELLNESS",
    color: "#E91E8C",
    delay: 150,
  },
  {
    Icon: UserCheck,
    title: "YOUTH",
    color: "#E91E8C",
    delay: 300,
  },
];

export function PillarsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            color: "#001433",
            fontFamily: "'Anton', 'Impact', sans-serif",
            letterSpacing: "0.03em",
          }}
        >
          WHAT WE&apos;RE BUILT ON
        </h2>

        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {pillars.map(({ Icon, title, color, delay }, index) => (
            <div
              key={title}
              className={`flex flex-col items-center transition-all duration-700 cursor-pointer`}
              style={{
                transitionDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon above the column */}
              <div
                className="mb-3 transition-transform duration-300"
                style={{
                  color,
                  transform:
                    hoveredIndex === index
                      ? "scale(1.2) translateY(-4px)"
                      : "scale(1)",
                }}
              >
                <Icon strokeWidth={2} style={{ width: 44, height: 44 }} />
              </div>

              {/* Column bar */}
              <div
                className="relative w-16 md:w-20 mb-5"
                style={{ height: 180 }}
              >
                {/* Background track */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-xl"
                  style={{ background: "#f0f0f0", height: "100%" }}
                />
                {/* Filled bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-xl transition-all duration-1000 ease-out"
                  style={{
                    background: `linear-gradient(to top, ${color}, #f06ab0)`,
                    height: isVisible ? "100%" : "0%",
                    transitionDelay: `${delay + 200}ms`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 -4px 20px ${color}60`
                        : "none",
                  }}
                />
              </div>

              {/* Label */}
              <h3
                className="text-center font-black text-sm md:text-base transition-all duration-300"
                style={{
                  color: "#001433",
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  letterSpacing: "0.06em",
                  transform:
                    hoveredIndex === index ? "scale(1.08)" : "scale(1)",
                }}
              >
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
