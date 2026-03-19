"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 180, 1);
  const isScrolled = scrollY > 60;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isScrolled
          ? `rgba(0, 12, 8, ${0.55 + scrollProgress * 0.3})`
          : "transparent",
        backdropFilter: isScrolled ? "blur(18px) saturate(160%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(160%)" : "none",
        borderBottom: isScrolled
          ? `1px solid rgba(0, 204, 163, ${0.08 + scrollProgress * 0.08})`
          : "none",
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Teal top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(170, 223, 213, 0.6) 50%, transparent)",
          opacity: scrollProgress,
          transition: "opacity 0.5s ease",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            {/* Real NFL logo — white version via CSS invert since source is black */}
            <div
              style={{
                transition: "filter 0.3s ease",
              }}
            >
              <Image
                src="WWW logo caps-01.png"
                alt="NFL"
                width={100}
                height={100}
                style={{ objectFit: "contain", display: "block" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {["HOME", "OUR MISSION", "OUR INITIATIVES"].map((label, i) => (
              <Link
                key={i}
                href={
                  label === "HOME"
                    ? "/"
                    : `/${label.toLowerCase().replace(/ /g, "-")}`
                }
                className="group relative"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.75)")
                }
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{
                    height: 1.5,
                    background: "#00CCA3",
                    display: "block",
                  }}
                />
              </Link>
            ))}

            <button
              style={{
                color: "rgba(255,255,255,0.5)",
                transition: "color 0.25s ease",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#00CCA3")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.5)")
              }
            >
              <Search style={{ width: 17, height: 17 }} strokeWidth={1.8} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{
              color: "rgba(255,255,255,0.8)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X style={{ width: 22, height: 22 }} strokeWidth={1.8} />
            ) : (
              <Menu style={{ width: 22, height: 22 }} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          style={{
            maxHeight: isMobileMenuOpen ? 220 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            className="flex flex-col gap-5 py-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {["HOME", "OUR MISSION", "OUR INITIATIVES"].map((label, i) => (
              <Link
                key={i}
                href={
                  label === "HOME"
                    ? "/"
                    : `/${label.toLowerCase().replace(/ /g, "-")}`
                }
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
