"use client";

import { useEffect, useRef, useState } from "react";

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = [
    { text: "To ", highlight: false },
    { text: "unite", highlight: true },
    {
      text: " everyday players, share the NFL's success with its ",
      highlight: false,
    },
    { text: "community", highlight: true },
    { text: ", and ", highlight: false },
    { text: "uplift", highlight: true },
    { text: " the next generation players.", highlight: false },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p
          className={`text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "system-ui, 'Segoe UI', sans-serif",
            color: "#001433",
          }}
        >
          {words.map((w, i) =>
            w.highlight ? (
              <span
                key={i}
                className="relative inline-block"
                style={{ color: "#00A878" }}
              >
                {w.text}
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded-full"
                  style={{ background: "#00A878", opacity: 0.6 }}
                />
              </span>
            ) : (
              <span key={i}>{w.text}</span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
