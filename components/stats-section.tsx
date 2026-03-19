"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setDisplay(parseFloat((value * ease).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, animated, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : display.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 1400, label: "Organizations", suffix: "", prefix: "", decimals: 0 },
  {
    value: 27.8,
    label: "Total Kids Helped",
    suffix: " MIL",
    prefix: "",
    decimals: 1,
  },
  {
    value: 364,
    label: "To Youth Health and Wellness since 2007",
    suffix: " MIL",
    prefix: "$",
    decimals: 0,
  },
];

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20"
      style={{ background: "#f4f4f4" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div
          className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ background: "#4DBBF0" }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left — text */}
            <div
              className="p-8 md:p-12"
              style={{
                transitionDelay: "100ms",
              }}
            >
              <h2
                className="font-black mb-5"
                style={{
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    color: "#FFD700",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  }}
                >
                  OUR{" "}
                </span>
                <span
                  style={{
                    color: "#001433",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  }}
                >
                  STATS
                </span>
              </h2>

              <h3
                className="font-bold text-lg md:text-xl mb-4"
                style={{ color: "#001433" }}
              >
                Why Wouldn&apos;t We do our best to support youth health and
                wellness?
              </h3>

              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#003366" }}
              >
                From teaching kids how to form healthy relationships to
                partnering with multiple organizations with the mission of
                getting kids active for 60 minutes everyday, the NFL has been
                putting youth at the forefront of their off-the-field efforts.
                Working in conjunction with 15 different organizations dedicated
                to youth well-being the NFL has put over $364 million to
                ensuring the next generation is equipped with the tools to
                thrive.
              </p>
            </div>

            {/* Right — stats */}
            <div className="p-8 md:p-12 flex flex-col justify-center gap-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="transition-all duration-700"
                  style={{
                    transitionDelay: `${i * 180 + 300}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  }}
                >
                  <div
                    className="font-black leading-none mb-1"
                    style={{
                      fontFamily: "'Anton', 'Impact', sans-serif",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      color: "#001433",
                    }}
                  >
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div
                    className="text-sm md:text-base"
                    style={{ color: "#003366", fontWeight: 500 }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
