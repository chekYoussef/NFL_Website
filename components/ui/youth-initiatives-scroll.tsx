"use client";

import { useEffect, useRef, useState } from "react";

// ── The featured initiative (fullscreen hero shot) ─────────────────
const FEATURED = {
  label: "NFL FLAG",
  img: "/GENYOUth-Flag-in-School-Athlete-041824.jpg",
  color: "#D50A0A",
  tagline: "LONGEST-RUNNING YOUTH FOOTBALL PROGRAM",
};

// ── All initiatives shown in the grid after reveal ─────────────────
const GRID_ITEMS = [
  {
    label: "PLAY 60",
    img: "/group_of_kids_running_at_school_recess Frame.png",
    color: "#D50A0A",
  },
  {
    label: "GEN YOUTH",
    img: "GENYOUth-What-We-Do-Nutrition-Phsical-Activity-images Frame.png",
    color: "#FFD700",
  },
  {
    label: "CHARACTER PLAYS",
    img: "seahawks-768x512 Frame.png",
    color: "#002244",
  },
  {
    label: "NFL FOUNDATION",
    img: "0-0-0-4f290166f62d3c064ca5e5f393066825 Frame.png",
    color: "#00A878",
  },
  {
    label: "INSPIRE CHANGE",
    img: "/gue40keslxajaqtpt86j Frame.png",
    color: "#FFD700",
  },
  {
    label: "LATINO YOUTH",
    img: "NFL-Youth-Honors Frame.png",
    color: "#FF6B35",
  },
  { label: "NFL FLAG", img: "news2.png", color: "#D50A0A" },
];

// ── Easing ─────────────────────────────────────────────────────────
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function YouthInitiativesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroLabelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const glowOverlay = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  // tracks whether the entrance animation has completed
  const heroEnteredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── One-shot entrance: hero fades + scales in when section enters viewport ──
  useEffect(() => {
    if (!mounted) return;
    const heroImg = heroImgRef.current;
    const heroLbl = heroLabelRef.current;
    if (!heroImg) return;

    // Start hidden and slightly scaled down
    heroImg.style.opacity = "0";
    heroImg.style.transform = "scale(0.94)";
    // Use longhands to avoid shorthand/longhand conflict
    heroImg.style.transitionProperty = "opacity, transform";
    heroImg.style.transitionDuration = "1.1s, 1.3s";
    heroImg.style.transitionTimingFunction = "ease, cubic-bezier(0.16,1,0.3,1)";

    if (heroLbl) {
      heroLbl.style.opacity = "0";
      heroLbl.style.transform = "translateY(20px)";
      heroLbl.style.transitionProperty = "opacity, transform";
      heroLbl.style.transitionDuration = "0.9s, 0.9s";
      heroLbl.style.transitionTimingFunction =
        "ease, cubic-bezier(0.16,1,0.3,1)";
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (heroImgRef.current) {
              heroImgRef.current.style.opacity = "1";
              heroImgRef.current.style.transform = "scale(1)";
            }
            if (heroLabelRef.current) {
              // Small extra delay so label appears after image
              setTimeout(() => {
                if (heroLabelRef.current) {
                  heroLabelRef.current.style.opacity = "1";
                  heroLabelRef.current.style.transform = "translateY(0)";
                }
              }, 400);
            }
            // Mark entrance complete after transition finishes
            setTimeout(() => {
              heroEnteredRef.current = true;
              // Remove transition longhands so RAF takes clean control
              if (heroImgRef.current) {
                heroImgRef.current.style.transitionProperty = "";
                heroImgRef.current.style.transitionDuration = "";
                heroImgRef.current.style.transitionTimingFunction = "";
                heroImgRef.current.style.transform = "";
              }
            }, 1400);
          }, 200);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [mounted]);

  // ── RAF scroll loop ───────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const heroImg = heroImgRef.current;
    const heroLbl = heroLabelRef.current;
    const grid = gridRef.current;
    const heading = headingRef.current;
    const glow = glowOverlay.current;
    if (!section || !sticky || !heroImg || !grid || !heading) return;

    let raf: number;
    let glowFired = false;

    const getFeaturedSlot = () => {
      const lastItem = gridItemRefs.current[6];
      return lastItem?.getBoundingClientRect() ?? null;
    };

    const tick = () => {
      const sectionRect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const wh = window.innerHeight;
      const ww = window.innerWidth;

      const scrolled = -sectionRect.top;
      const maxScroll = sectionH - wh;
      const raw = clamp(scrolled / maxScroll, 0, 1);

      // Don't drive transforms until entrance animation has completed
      if (!heroEnteredRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // ── Phase 1 (0 → 0.55): hero shrinks into grid slot ──────────
      const phase1 = clamp(raw / 0.55, 0, 1);
      const p1e = easeOutExpo(phase1);

      const slot = getFeaturedSlot();
      if (slot) {
        const stickyRect = sticky.getBoundingClientRect();
        const targetW = slot.width;
        const targetH = slot.height;
        const targetX = slot.left - stickyRect.left;
        const targetY = slot.top - stickyRect.top;

        const startW = ww * 0.7;
        const startH = wh * 0.7;

        heroImg.style.width = `${lerp(startW, targetW, p1e)}px`;
        heroImg.style.height = `${lerp(startH, targetH, p1e)}px`;
        heroImg.style.left = `${lerp(ww * 0.15, targetX, p1e)}px`;
        heroImg.style.top = `${lerp(wh * 0.15, targetY, p1e)}px`;
        heroImg.style.borderRadius = `${lerp(12, 10, p1e)}px`;
        heroImg.style.zIndex = phase1 < 1 ? "20" : "1";
        heroImg.style.opacity = "1";
      }

      // Hero label fades out
      if (heroLbl) {
        const lp = clamp(1 - phase1 * 3, 0, 1);
        heroLbl.style.opacity = String(lp);
        heroLbl.style.transform = `translateY(${(1 - lp) * 20}px)`;
      }

      // Grid items stagger in
      gridItemRefs.current.forEach((el, i) => {
        if (!el || i === 6) return;
        const delay = 0.25 + i * 0.06;
        const win = 0.25;
        const ip = clamp((raw - delay) / win, 0, 1);
        const ipe = easeOutQuart(ip);
        el.style.opacity = String(ipe);
        el.style.transform = `scale(${lerp(0.85, 1, ipe)}) translateY(${lerp(
          16,
          0,
          ipe
        )}px)`;
      });

      // NFL FLAG slot — show when hero has landed
      const flagSlot = gridItemRefs.current[6];
      if (flagSlot) {
        flagSlot.style.opacity = phase1 >= 0.98 ? "1" : "0";
      }

      // Heading reveal
      const hp = clamp(raw / 0.18, 0, 1);
      heading.style.opacity = String(easeOutQuart(hp));
      heading.style.transform = `translateY(${lerp(
        -20,
        0,
        easeOutQuart(hp)
      )}px)`;

      // ── Phase 2 (0.72 → 1.0): glow + fade out ────────────────────
      const phase2 = clamp((raw - 0.72) / 0.28, 0, 1);

      if (phase2 > 0 && !glowFired && glow) {
        glowFired = true;
        glow.style.animation = "gridGlowPulse 1.2s ease-out forwards";
      }

      sticky.style.opacity =
        phase2 > 0.6
          ? String(lerp(1, 0, clamp((phase2 - 0.6) / 0.4, 0, 1)))
          : "1";

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  return (
    <>
      <style>{`
        @keyframes gridGlowPulse {
          0%   { opacity: 0; transform: scale(0.96); }
          35%  { opacity: 1; transform: scale(1.01); }
          70%  { opacity: 0.6; }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes heroLabelBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ position: "relative", height: "380vh", background: "#0a0a0f" }}
      >
        {/* ── Sticky viewport ── */}
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            background: "#0a0a0f",
          }}
        >
          {/* Section heading */}
          <div
            ref={headingRef}
            style={{
              position: "absolute",
              top: 60,
              left: 10,
              right: 20,
              zIndex: 10,
              padding: "2rem clamp(1rem, 4vw, 3rem) 0",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 4,
                  height: 36,
                  background: "#FFD700",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.4em",
                    color: "#FFD700",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  NFL Community
                </p>
                <h2
                  style={{
                    fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: "0.03em",
                  }}
                >
                  OUR YOUTH{" "}
                  <span style={{ color: "#D50A0A" }}>INITIATIVES</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Hero image — starts hidden, entrance drives it in, then RAF takes over */}
          <div
            ref={heroImgRef}
            style={{
              position: "absolute",
              top: "15%",
              left: "15%",
              width: "70%",
              height: "70%",
              overflow: "hidden",
              zIndex: 20,
              borderRadius: 12,
              opacity: 0, // entrance starts hidden
              willChange: "width, height, top, left, opacity",
            }}
          >
            <img
              src={FEATURED.img}
              alt={FEATURED.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: FEATURED.color,
              }}
            />
          </div>

          {/* Hero label — starts hidden */}
          <div
            ref={heroLabelRef}
            style={{
              position: "absolute",
              bottom: "clamp(3rem, 8vh, 6rem)",
              left: "clamp(1.5rem, 5vw, 4rem)",
              zIndex: 25,
              pointerEvents: "none",
              opacity: 0, // entrance starts hidden
            }}
          >
            <p
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.45em",
                color: FEATURED.color,
                margin: "0 0 0.5rem",
                textTransform: "uppercase",
              }}
            >
              {FEATURED.tagline}
            </p>
            <h3
              style={{
                fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize: "clamp(3rem, 9vw, 7rem)",
                color: "#ffffff",
                margin: 0,
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                textShadow: "0 4px 40px rgba(0,0,0,0.6)",
              }}
            >
              {FEATURED.label}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: "1.5rem",
                animation: "heroLabelBlink 2s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 32,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
              <span
                style={{
                  fontFamily: "system-ui",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding:
                "clamp(5rem, 10vh, 7rem) clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem)",
              zIndex: 1,
            }}
          >
            <div style={{ width: "100%", maxWidth: 1100 }}>
              {/* Top row — 3 items */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "clamp(8px, 1.5vw, 16px)",
                  marginBottom: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                {GRID_ITEMS.slice(0, 3).map((item, i) => (
                  <div
                    key={item.label}
                    ref={(el) => {
                      gridItemRefs.current[i] = el;
                    }}
                    style={{
                      opacity: 0,
                      transform: "scale(0.85) translateY(16px)",
                      willChange: "opacity, transform",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        border: `2px solid ${item.color}33`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        transition:
                          "border-color 0.3s ease, box-shadow 0.3s ease",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          item.color;
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.boxShadow = `0 8px 32px ${item.color}44`;
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.borderColor = `${item.color}33`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 4px 20px rgba(0,0,0,0.4)";
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.label}
                        style={{
                          width: "100%",
                          height: "clamp(140px, 20vw, 200px)",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: item.color,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        textAlign: "center",
                        marginTop: 6,
                        color: "rgba(255,255,255,0.65)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom row — 4 items */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                {GRID_ITEMS.slice(3).map((item, i) => (
                  <div
                    key={item.label}
                    ref={(el) => {
                      gridItemRefs.current[i + 3] = el;
                    }}
                    style={{
                      opacity: 0,
                      transform: "scale(0.85) translateY(16px)",
                      willChange: "opacity, transform",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        border: `2px solid ${item.color}33`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        transition:
                          "border-color 0.3s ease, box-shadow 0.3s ease",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          item.color;
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.boxShadow = `0 8px 32px ${item.color}44`;
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.borderColor = `${item.color}33`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 4px 20px rgba(0,0,0,0.4)";
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.label}
                        style={{
                          width: "100%",
                          height: "clamp(110px, 16vw, 165px)",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: item.color,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        textAlign: "center",
                        marginTop: 6,
                        color: "rgba(255,255,255,0.65)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
