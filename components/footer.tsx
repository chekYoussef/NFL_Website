"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#001433" }}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logos */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div>
              <Image
                src="WWW logo caps-03.png"
                alt="NFL"
                width={150}
                height={150}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 md:gap-10">
            {[
              { label: "HOME", href: "/" },
              { label: "OUR MISSION", href: "/our-mission" },
              { label: "OUR INITIATIVES", href: "/our-initiatives" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "#FFD700")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.65)")
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                icon: <Facebook className="w-5 h-5" />,
              },
              {
                href: "https://twitter.com",
                label: "Twitter / X",
                icon: <Twitter className="w-5 h-5" />,
              },
              {
                href: "https://tiktok.com",
                label: "TikTok",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                ),
              },
              {
                href: "https://instagram.com",
                label: "Instagram",
                icon: <Instagram className="w-5 h-5" />,
              },
              {
                href: "https://youtube.com",
                label: "YouTube",
                icon: <Youtube className="w-5 h-5" />,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  display: "flex",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FFD700";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="mt-10 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 12,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            &copy; 2025 NFL Why Wouldn&apos;t We? All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
