"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Each word slams in individually — broadcast title card style
const TITLE_WORDS = [
  { text: "WHY", color: "#ffffff", delay: 0.7 },
  { text: "WOULDN'T", color: "#ffffff", delay: 0.95 },
  { text: "WE?", color: "#FFD700", delay: 1.2 },
];

export function HeroSection() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Broadcast intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100); // bars open
    const t2 = setTimeout(() => setPhase(2), 500); // bg + players appear
    const t3 = setTimeout(() => setPhase(3), 2200); // full color, details
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    const m = (e: MouseEvent) => {
      const w = window.innerWidth,
        h = window.innerHeight;
      setMouse({ x: e.clientX / w - 0.5, y: e.clientY / h - 0.5 });
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const show2 = phase >= 2;
  const show3 = phase >= 3;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 580, background: "#001a33" }}
    >
      {/* ── DOT BACKGROUND — Ken Burns slow zoom ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `scale(${show2 ? 1.08 : 1.0}) translateY(${
            scrollY * 0.12
          }px) translate(${mouse.x * -8}px, ${mouse.y * -5}px)`,
          transition: show2
            ? "transform 14s cubic-bezier(0.25,0.1,0.1,1), opacity 0.8s ease"
            : "transform 0.6s ease, opacity 0.8s ease",
          willChange: "transform, opacity",
          opacity: show2 ? 1 : 0,
        }}
      >
        <Image
          src="/hero-bg1.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* ── Gradient overlays for depth + readability ── */}
      {/* Left dark wash — title area */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,15,40,0.82) 0%, rgba(0,15,40,0.55) 40%, rgba(0,10,30,0.1) 65%, transparent 80%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,10,25,0.7) 0%, transparent 45%)",
        }}
      />
      {/* Top fade behind nav */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,10,25,0.5) 0%, transparent 18%)",
        }}
      />

      {/* ── PLAYERS — slide in from right, mix-blend-mode kills black bg ── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          right: "-2%",
          bottom: 0,
          width: "clamp(380px, 58vw, 900px)",
          height: "95%",
          transform: `translateX(${
            show2 ? `${mouse.x * -18}px` : "120px"
          }) translateY(${scrollY * 0.18}px)`,
          opacity: show2 ? 1 : 0,
          transition: show2
            ? "opacity 0.9s ease 0.4s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s"
            : "none",
        }}
      >
        {/* Glow bloom behind players — matches the green/teal bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 55% 75%, rgba(0,180,100,0.22) 0%, rgba(0,80,160,0.12) 40%, transparent 70%)",
            opacity: show3 ? 1 : 0,
            transition: "opacity 2s ease 0.8s",
          }}
        />

        <Image
          src="/hero-players1.png"
          alt="NFL youth players"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "bottom right",
            // This is the key: screen blend kills the black background naturally
            mixBlendMode: "screen",
            // Boost brightness so they pop against the dark left side
            filter: `brightness(1.15) contrast(1.05) saturate(1.1)`,
            transform: `translateX(${mouse.x * 8}px) translateY(${
              mouse.y * 4
            }px)`,
            transition: "transform 0.35s ease",
          }}
        />
      </div>

      {/* ── Yellow vertical stripe accent — left edge ── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-5 pointer-events-none"
        style={{
          width: 4,
          background:
            "linear-gradient(to bottom, transparent 10%, #FFD700 35%, #FFD700 75%, transparent 90%)",
          opacity: show3 ? 1 : 0,
          transition: "opacity 0.6s ease 2s",
        }}
      />

      {/* ── SCAN LINE SWEEP ── */}
      <div
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.95) 50%, transparent 100%)",
          boxShadow: "0 0 30px 6px rgba(255,215,0,0.35)",
          top: show2 ? "100%" : "0%",
          transition: show2 ? "top 1s cubic-bezier(0.4,0,0.2,1) 0.2s" : "none",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        className="absolute inset-0 z-15 flex flex-col justify-end"
        style={{
          paddingBottom: "clamp(3rem, 8vh, 5.5rem)",
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          paddingTop: 80,
        }}
      >
        {/* Eyebrow tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            opacity: show3 ? 1 : 0,
            transform: show3 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease 1.6s, transform 0.6s ease 1.6s",
          }}
        >
          <div
            style={{
              width: 28,
              height: 2.5,
              background: "#FFD700",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              color: "#FFD700",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.42em",
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
            }}
          >
            NFL Youth &amp; Community
          </span>
        </div>

        {/* TITLE — each word slams up individually */}
        <div style={{ marginBottom: "1.6rem" }}>
          {TITLE_WORDS.map((word, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 1 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                  fontSize: "clamp(4rem, 10.5vw, 9rem)",
                  color: word.color,
                  lineHeight: 0.94,
                  letterSpacing: "0.02em",
                  textShadow: "3px 5px 35px rgba(0,0,0,0.55)",
                  transform: show2 ? "translateY(0)" : "translateY(108%)",
                  transition: show2
                    ? `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${word.delay}s`
                    : "none",
                  paddingBottom: "0.06em",
                  // Yellow gets a subtle glow
                  ...(word.color === "#FFD700"
                    ? { filter: "drop-shadow(0 0 20px rgba(255,215,0,0.4))" }
                    : {}),
                }}
              >
                {word.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "clamp(1.5rem, 4vw, 3.5rem)",
            flexWrap: "wrap",
            opacity: show3 ? 1 : 0,
            transform: show3 ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.7s ease 2s, transform 0.7s ease 2s",
          }}
        >
          {/* Divider + copy */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              maxWidth: 300,
            }}
          >
            <div
              style={{
                width: 2,
                minHeight: 48,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 2,
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.58)",
                fontSize: "clamp(0.78rem, 1.3vw, 0.9rem)",
                lineHeight: 1.75,
                margin: 0,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Uniting communities. Empowering the next generation — on and off
              the field.
            </p>
          </div>

          {/* CTA — wipe fill button */}
          <button
            className="group"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "13px 34px",
              border: "2px solid #FFD700",
              background: "transparent",
              color: "#FFD700",
              fontFamily: "'Anton', 'Impact', sans-serif",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              flexShrink: 0,
              transition: "color 0.32s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#001a14";
              (
                e.currentTarget.querySelector(".fill") as HTMLElement
              ).style.transform = "translateX(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#FFD700";
              (
                e.currentTarget.querySelector(".fill") as HTMLElement
              ).style.transform = "translateX(-101%)";
            }}
          >
            <span
              className="fill"
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFD700",
                transform: "translateX(-101%)",
                transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>LEARN MORE</span>
          </button>
        </div>
      </div>

      {/* ── LETTERBOX BARS (open on load) ── */}
      <div
        className="absolute left-0 right-0 top-0 bg-black z-30 pointer-events-none"
        style={{
          height: phase === 0 ? "50%" : "0%",
          transition: "height 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-black z-30 pointer-events-none"
        style={{
          height: phase === 0 ? "50%" : "0%",
          transition: "height 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── SCROLL CUE ── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vh, 2.5rem)",
          right: "clamp(1.5rem, 4vw, 3rem)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: show3 ? 0.5 : 0,
          transition: "opacity 0.6s ease 2.5s",
        }}
      >
        <span
          style={{
            color: "#FFD700",
            fontSize: 8,
            letterSpacing: "0.4em",
            fontFamily: "system-ui, sans-serif",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 38,
            background: "linear-gradient(to bottom, #FFD700, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
