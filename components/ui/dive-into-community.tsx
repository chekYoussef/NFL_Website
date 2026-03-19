"use client";

import { useEffect, useRef, useState } from "react";

const initiatives = [
  {
    id: "play60",
    logo: "NFL PLAY:60",
    logoColor: "#D50A0A",
    bg: "linear-gradient(135deg, #002244 0%, #003d7a 100%)",
    accentColor: "#D50A0A",
    tagline: "GET ACTIVE. GET MOVING.",
    description:
      "Our youth health and wellness platform that empowers youth to get physically active. Encouraging healthy lifestyles and motivating the next generation of youth.",
    img: "/group_of_kids_running_at_school_recess Frame.png",
    number: "01",
  },
  {
    id: "genyouth",
    logo: "GENYOUth",
    logoColor: "#FFD700",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    accentColor: "#FFD700",
    tagline: "EMPOWERING EVERY KID.",
    description:
      "Enables kids while addressing food and physical activity nutrition and wellness. Addressing nearly 30 million kids eligible for school lunch programs.",
    img: "/GENYOUth-What-We-Do-Nutrition-Phsical-Activity-images Frame.png",
    number: "02",
  },
  {
    id: "character",
    logo: "CHARACTER PLAYS",
    logoColor: "#ffffff",
    bg: "linear-gradient(135deg, #D50A0A 0%, #a00808 100%)",
    accentColor: "#FFD700",
    tagline: "BUILD CHARACTER. BUILD FUTURES.",
    description:
      "Equips students with tools and knowledge to build relationships and protect their mental health. Partnering with every player to empower students to make good choices.",
    img: "/seahawks-768x512 2.png",
    number: "03",
  },
  {
    id: "inspire",
    logo: "INSPIRE CHANGE",
    logoColor: "#ffffff",
    bg: "linear-gradient(135deg, #00704a 0%, #004d33 100%)",
    accentColor: "#FFD700",
    tagline: "CHANGE STARTS HERE.",
    description:
      "NFL social justice initiative creating positive community change. Inspiring development, programs, and resources toward advancement and community-building.",
    img: "gue40keslxajaqtpt86j Frame.png",
    number: "04",
  },
  {
    id: "flag",
    logo: "NFL FLAG",
    logoColor: "#FFD700",
    bg: "linear-gradient(135deg, #002244 0%, #001533 100%)",
    accentColor: "#D50A0A",
    tagline: "PLAY EVERYWHERE.",
    description:
      "Longest-running flag football program in all 50 states. Devoted to developing youth athletes and installing a lifelong passion for flag football.",
    img: "/NFL-Youth-Honors Frame.png",
    number: "05",
  },
  {
    id: "specialolympics",
    logo: "Special Olympics",
    logoColor: "#ffffff",
    bg: "linear-gradient(135deg, #EE1C25 0%, #aa1219 100%)",
    accentColor: "#ffffff",
    tagline: "INCLUSION FOR ALL.",
    description:
      "Bringing inclusion to athletes with all levels of ability. Giving people with intellectual disabilities the opportunity to play on the same team.",
    img: "/news1.png",
    number: "06",
  },
  {
    id: "bigs",
    logo: "Big Brothers Big Sisters",
    logoColor: "#ffffff",
    bg: "linear-gradient(135deg, #003087 0%, #001f5c 100%)",
    accentColor: "#FFD700",
    tagline: "MENTOR. INSPIRE. GROW.",
    description:
      "Creating conditions for young people to reach their full potential through one-to-one mentorship connecting NFL athletes with youth across the country.",
    img: "/BigS.png",
    number: "07",
  },
  {
    id: "smash",
    logo: "SMASH",
    logoColor: "#FF6B35",
    bg: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
    accentColor: "#FF6B35",
    tagline: "STEM FOR EVERY STUDENT.",
    description:
      "Providing opportunities to underrepresented communities to access top STEM programs. Intensive courses in science, mathematics, engineering and technology.",
    img: "Promise-Academy-Middle-School-scholars-graduation-HCZ-Armory-June-2023-1200x801 Frame.png",
    number: "08",
  },
  {
    id: "boysgirlsclub",
    logo: "Boys & Girls Club",
    logoColor: "#FFD700",
    bg: "linear-gradient(135deg, #FF6B35 0%, #cc4a1a 100%)",
    accentColor: "#FFD700",
    tagline: "EVERY CHILD. EVERY FUTURE.",
    description:
      "Providing comprehensive programs for underserved young people. Students gain access to activities, programs, and mentorship that fundamentally change their lives.",
    img: "/boys and girls club Frame.png",
    number: "09",
  },
];

// ─── Easing functions ─────────────────────────────────────────────
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// ─── Card component ───────────────────────────────────────────────
function CommunityCard({
  item,
  index,
}: {
  item: (typeof initiatives)[0];
  index: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null); // perspective wrapper
  const cardRef = useRef<HTMLDivElement>(null); // the card itself
  const imgRef = useRef<HTMLImageElement>(null);
  const clipRef = useRef<HTMLDivElement>(null); // image clip wrapper
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null); // fake shadow el underneath

  const fromLeft = index % 2 === 0;
  const hasShimmered = useRef(false);
  const hasContentShown = useRef<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    // ── RAF loop — reads scroll, writes DOM, never touches React state ──
    let raf: number;

    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const wh = window.innerHeight;

      // raw progress: 0 when card bottom hits viewport bottom, 1 when card top at center
      const raw = (wh - rect.top) / (wh + rect.height);
      // remap to animation window [0.0 → 0.65]
      const p = clamp((raw - 0.0) / 0.65, 0, 1);
      const pE = easeOutExpo(p);
      const pQ = easeOutQuart(p);

      // ── Card 3D transform ──────────────────────────────────────
      const rotY = fromLeft ? (1 - pE) * -52 : (1 - pE) * 52;
      const transZ = (1 - pE) * -160;
      const transX = fromLeft ? (1 - pQ) * -70 : (1 - pQ) * 70;
      const transY = (1 - pQ) * 36;
      const opa = clamp(p * 2.5, 0, 1);

      card.style.transform = `translateX(${transX}px) translateY(${transY}px) translateZ(${transZ}px) rotateY(${rotY}deg)`;
      card.style.opacity = String(opa);

      // ── Image parallax inside card ─────────────────────────────
      if (imgRef.current) {
        const imgX = fromLeft ? (1 - pE) * -28 : (1 - pE) * 28;
        const imgS = 1 + (1 - p) * 0.07;
        imgRef.current.style.transform = `translateX(${imgX}px) scale(${imgS})`;
      }

      // ── Clip-path wipe on image panel ─────────────────────────
      if (clipRef.current) {
        const cp = clamp(
          easeOutQuart(clamp((p - 0.05) / 0.5, 0, 1)) * 100,
          0,
          100
        );
        clipRef.current.style.clipPath = fromLeft
          ? `inset(0 ${100 - cp}% 0 0)`
          : `inset(0 0 0 ${100 - cp}%)`;
      }

      // ── Ambient glow opacity ───────────────────────────────────
      if (glowRef.current) {
        glowRef.current.style.opacity = String(pE);
      }

      // ── One-shot shimmer at p > 0.4 ──────────────────────────
      if (!hasShimmered.current && p > 0.4 && shimmerRef.current) {
        hasShimmered.current = true;
        shimmerRef.current.style.transition = "transform 1s ease 0s";
        shimmerRef.current.style.transform = "translateX(220%)";
      }

      // ── Staggered content reveals (one-shot CSS class toggles) ─
      const thresholds = [0.38, 0.44, 0.5, 0.55, 0.6];
      thresholds.forEach((thresh, i) => {
        if (!hasContentShown.current[i] && p > thresh) {
          hasContentShown.current[i] = true;
          const el = contentRefs.current[i];
          if (el) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fromLeft]);

  // Helper to assign to contentRefs array
  const setRef = (i: number) => (el: HTMLElement | null) => {
    contentRefs.current[i] = el;
  };

  const transitionBase =
    "opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      ref={wrapRef}
      style={{
        padding: "1.2rem 0",
        display: "flex",
        justifyContent: fromLeft ? "flex-start" : "flex-end",
        perspective: 1100,
        perspectiveOrigin: fromLeft ? "15% 50%" : "85% 50%",
      }}
    >
      {/* ── Card shell — all transforms written by RAF, not React ── */}
      <div
        ref={cardRef}
        style={{
          width: "min(880px, 95vw)",
          borderRadius: 18,
          overflow: "hidden",
          background: item.bg,
          display: "flex",
          flexDirection: fromLeft ? "row" : "row-reverse",
          minHeight: 268,
          position: "relative",
          opacity: 0,
          willChange: "transform, opacity",
          // Only transition box-shadow — transforms handled by RAF
          transition: "box-shadow 0.4s ease",
          boxShadow:
            "0 16px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 28px 90px rgba(0,0,0,0.42), 0 8px 30px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 16px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)";
        }}
      >
        {/* Shimmer */}
        <div
          ref={shimmerRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "55%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
            transform: "translateX(-110%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        {/* Number watermark */}
        <div
          style={{
            position: "absolute",
            top: -8,
            right: 20,
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: "clamp(5rem, 13vw, 10rem)",
            color: "rgba(255,255,255,0.05)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {item.number}
        </div>

        {/* ── Image panel ── */}
        <div
          ref={clipRef}
          style={{
            width: "44%",
            minWidth: 180,
            flexShrink: 0,
            overflow: "hidden",
            position: "relative",
            clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          }}
        >
          <img
            ref={imgRef}
            src={item.img}
            alt={item.logo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              willChange: "transform",
            }}
          />
          {/* Gradient bleed */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: fromLeft
                ? "linear-gradient(to right, transparent 40%, rgba(0,0,0,0.52) 100%)"
                : "linear-gradient(to left,  transparent 40%, rgba(0,0,0,0.52) 100%)",
            }}
          />
          {/* Glowing accent edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              [fromLeft ? "right" : "left"]: 0,
              width: 4,
              background: item.accentColor,
              boxShadow: `0 0 22px 3px ${item.accentColor}55`,
            }}
          />
        </div>

        {/* ── Text panel ── */}
        <div
          style={{
            flex: 1,
            padding: "clamp(1.4rem, 3vw, 2.2rem)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {/* Tagline */}
          <p
            ref={setRef(0) as React.RefCallback<HTMLParagraphElement>}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.42em",
              color: item.accentColor,
              margin: 0,
              textTransform: "uppercase",
              opacity: 0,
              transform: "translateY(14px)",
              transition: transitionBase,
            }}
          >
            {item.tagline}
          </p>

          {/* Logo */}
          <div style={{ overflow: "hidden" }}>
            <h3
              ref={setRef(1) as React.RefCallback<HTMLHeadingElement>}
              style={{
                fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize: "clamp(1.3rem, 2.8vw, 2.1rem)",
                color: item.logoColor,
                margin: 0,
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                opacity: 0,
                transform: "translateY(100%)",
                transition:
                  "opacity 0.5s ease 0.06s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.06s",
              }}
            >
              {item.logo}
            </h3>
          </div>

          {/* Divider — width driven by a separate element we toggle a class on */}
          <div
            ref={setRef(2) as React.RefCallback<HTMLDivElement>}
            style={{
              height: 3,
              borderRadius: 2,
              background: item.accentColor,
              opacity: 0,
              width: 44,
              transition: "opacity 0.4s ease 0.1s",
              transform: "none",
            }}
          />

          {/* Description */}
          <p
            ref={setRef(3) as React.RefCallback<HTMLParagraphElement>}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(0.78rem, 1.5vw, 0.88rem)",
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.78,
              margin: 0,
              opacity: 0,
              transform: "translateY(10px)",
              transition: transitionBase,
            }}
          >
            {item.description}
          </p>

          {/* CTA */}
          <div
            ref={setRef(4) as React.RefCallback<HTMLDivElement>}
            style={{
              marginTop: "0.2rem",
              opacity: 0,
              transform: "translateY(8px)",
              transition: transitionBase,
            }}
          >
            <button
              style={{
                padding: "9px 24px",
                background: "transparent",
                border: `2px solid ${item.accentColor}`,
                color: item.accentColor,
                borderRadius: 4,
                fontFamily: "system-ui, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition:
                  "background 0.22s ease, color 0.22s ease, transform 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget;
                b.style.background = item.accentColor;
                b.style.color =
                  item.accentColor === "#FFD700" ? "#001a14" : "#fff";
                b.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget;
                b.style.background = "transparent";
                b.style.color = item.accentColor;
                b.style.transform = "scale(1)";
              }}
            >
              LEARN MORE <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>

        {/* Ambient glow */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(ellipse at ${
              fromLeft ? "75%" : "25%"
            } 50%, ${item.accentColor}14 0%, transparent 65%)`,
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────
export function DiveIntoCommunity() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!titleVisible) return;
    if (barRef.current) barRef.current.style.width = "80px";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCount(i);
      if (i >= initiatives.length) clearInterval(t);
    }, 110);
    return () => clearInterval(t);
  }, [titleVisible]);

  return (
    <section
      style={{
        background: "#0d1117",
        paddingBottom: "7rem",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        ref={titleRef}
        style={{
          textAlign: "center",
          padding: "5rem 1.5rem 4rem",
          position: "relative",
        }}
      >
        {/* Ghost watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: "clamp(5rem, 18vw, 14rem)",
            color: "rgba(255,255,255,0.02)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "0.06em",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          COMMUNITY
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: "1rem",
            }}
          >
            <div style={{ width: 40, height: 1.5, background: "#D50A0A" }} />
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.45em",
                color: "#D50A0A",
                textTransform: "uppercase",
              }}
            >
              What We Stand For
            </span>
            <div style={{ width: 40, height: 1.5, background: "#D50A0A" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Anton', 'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              color: "#ffffff",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              margin: "0 0 1.2rem",
            }}
          >
            DIVE INTO OUR <span style={{ color: "#D50A0A" }}>COMMUNITY</span>
          </h2>

          {/* Animated gold bar — width driven via ref, not state */}
          <div
            ref={barRef}
            style={{
              width: 0,
              height: 4,
              background: "linear-gradient(90deg, #FFD700, #FF6B35)",
              borderRadius: 2,
              margin: "0 auto 1.5rem",
              transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
              boxShadow: "0 0 20px rgba(255,215,0,0.4)",
            }}
          />

          {/* Counter pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 100,
              padding: "8px 22px",
            }}
          >
            <span
              style={{
                fontFamily: "'Anton', 'Impact', sans-serif",
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                color: "#FFD700",
                lineHeight: 1,
              }}
            >
              {String(count).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
              }}
            >
              Initiatives
            </span>
          </div>

          <p
            style={{
              fontFamily: "system-ui",
              color: "rgba(255,255,255,0.35)",
              fontSize: "clamp(0.82rem, 1.6vw, 0.95rem)",
              maxWidth: 440,
              margin: "1.2rem auto 0",
              lineHeight: 1.75,
            }}
          >
            Scroll to explore every initiative driving real change in
            communities across the country.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 1.2rem" }}>
        {initiatives.map((item, index) => (
          <CommunityCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
