"use client";
import { DiveIntoCommunity } from "@/components/ui/dive-into-community";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { YouthInitiativesScroll } from "@/components/ui/youth-initiatives-scroll";
import { Footer } from "@/components/footer";

// ─── Scroll reveal hook ───────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Youth Initiatives ────────────────────────────────────────────
const youthTop = [
  {
    label: "PLAY 60",
    img: "group_of_kids_running_at_school_recess Frame.png",
  },
  {
    label: "GEN YOUTH",
    img: "GENYOUth-What-We-Do-Nutrition-Phsical-Activity-images Frame.png",
  },
  { label: "CHARACTER PLAYS", img: "/seahawks-768x512 Frame.png" },
];
const youthBottom = [
  {
    label: "NFL FOUNDATION",
    img: "0-0-0-4f290166f62d3c064ca5e5f393066825 Frame.png",
  },
  { label: "INSPIRE CHANGE", img: "/gue40keslxajaqtpt86j Frame.png" },
  { label: "LATINO YOUTH HONORS", img: "/NFL-Youth-Honors Frame.png" },
  { label: "NFL FLAG", img: "/news2.png" },
];

// ─── Partnerships ─────────────────────────────────────────────────
const partners = [
  { label: "SPECIAL OLYMPICS", img: "news1.png" },
  { label: "BIG BROTHERS BIG SISTERS", img: "BigS.png" },
  {
    label: "HARLEM GLOBETROTTERS CHILDREN'S ZONE",
    img: "Promise-Academy-Middle-School-scholars-graduation-HCZ-Armory-June-2023-1200x801 Frame.png",
  },
  { label: "SMASH", img: "sz0gfsyd7tlvxjdzlvdq Frame copy.png" },
  { label: "BOYS AND GIRLS CLUB", img: "news3.png" },
];

// ─── Reusable reveal wrapper ──────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function InitiativesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
        {/* ══ HERO ════════════════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            background: "#0a0a0f", // ← same dark bg as the scroll section
            overflow: "hidden",
            paddingTop: "6rem", // clears the fixed nav
            paddingBottom: "3rem",
          }}
        >
          {/* Dot pattern — faint, sits top-right only, fades out downward */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url('hero-bg1.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              opacity: 0.25, // ← very subtle, not dominant
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: 1200,
              margin: "0 auto",
              padding: "2rem 2rem 1rem",
            }}
          >
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  color: "#ffffff",
                  lineHeight: 0.95,
                  margin: 0,
                  letterSpacing: "0.02em",
                  textShadow: "2px 4px 30px rgba(0,0,0,0.5)",
                }}
              >
                Our Initiatives
              </h1>
              <p
                style={{
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  color: "#FFD700",
                  letterSpacing: "0.12em",
                  marginTop: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                Youth Health and Wellness
              </p>
            </div>
          </div>

          {/* Yellow left accent bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background:
                "linear-gradient(to bottom, transparent, #FFD700 30%, #FFD700 70%, transparent)",
              zIndex: 10,
            }}
          />
        </section>

        {/* ══ OUR YOUTH INITIATIVES ═══════════════════════════════════ */}
        <YouthInitiativesScroll />

        {/* ══ OUR PARTNERSHIPS ════════════════════════════════════════ */}
        <section style={{ padding: "3rem 1rem 4rem", background: "#f8fafc" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#002244",
                  textAlign: "center",
                  letterSpacing: "0.04em",
                  marginBottom: "2rem",
                }}
              >
                OUR PARTNERSHIPS
              </h2>
            </Reveal>

            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {partners.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    style={{
                      cursor: "pointer",
                      width: 160,
                      textAlign: "center",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-4px)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(0)")
                    }
                  >
                    <div
                      style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                        border: "2px solid #e2e8f0",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.label}
                        style={{
                          width: "100%",
                          height: 100,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#334155",
                        marginTop: 8,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        lineHeight: 1.4,
                      }}
                    >
                      {p.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DIVE INTO OUR COMMUNITY ══════════════════════════════════
            Replaces the old static section header + InitiativeCard loop  */}
        <DiveIntoCommunity />

        {/* ══ FOOTER CTA STRIP ════════════════════════════════════════ */}
        <section
          style={{
            padding: "4rem 1rem",
            background: "#002244",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h3
              style={{
                fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#FFD700",
                letterSpacing: "0.04em",
                margin: "0 0 1rem",
              }}
            >
              GET INVOLVED
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                maxWidth: 500,
                margin: "0 auto 2rem",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              Join the NFL in empowering the next generation of players,
              leaders, and community champions.
            </p>
            <Link href="/our-mission">
              <button
                style={{
                  padding: "14px 40px",
                  background: "#FFD700",
                  color: "#001a14",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "'Anton', 'Impact', sans-serif",
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 20px rgba(255,215,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.05)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 8px 30px rgba(255,215,0,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(255,215,0,0.3)";
                }}
              >
                OUR MISSION
              </button>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
