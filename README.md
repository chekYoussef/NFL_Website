# NFL_Website
# Why Wouldn't We? — NFL Youth & Community Initiative

A modern, cinematic web experience built for the NFL's youth health and wellness initiative. The site communicates the NFL's commitment to empowering the next generation of players, leaders, and community champions.

---

## Overview

**Why Wouldn't We?** is a Next.js website that showcases the NFL's youth and community programs through immersive scroll-driven animations, cinematic hero sections, and bold editorial design. The site covers the NFL's partnerships, initiatives, and the stories behind them.

---

## Pages

### Home (`/`)
- Cinematic hero with dot-pattern background, cutout player image, and scroll-driven parallax
- Mission statement section
- Kid of the Week spotlight
- Current News carousel
- What We're Built On — pillars section (Community, Health & Wellness, Youth)
- Our Stats — animated counters with organizational impact data

### Our Mission (`/our-mission`)
- Deep dive into the NFL's off-field mission
- Partnership highlights and community focus

### Our Initiatives (`/our-initiatives`)
- Sticky scroll hero — featured initiative image shrinks into a full grid reveal
- Youth Initiatives grid (Play 60, GEN Youth, Character Plays, NFL Foundation, Inspire Change, Latino Youth Honors, NFL Flag)
- Partnerships section (Special Olympics, Big Brothers Big Sisters, Harlem Globetrotters, SMASH, Boys & Girls Club)
- Dive Into Our Community — scroll-driven 3D card sequence with one card per initiative

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility styling |
| [Vercel Analytics](https://vercel.com/analytics) | Usage analytics |
| `next/font` | Oswald + Open Sans via Google Fonts |
| `next/image` | Optimized image delivery |

---

## Key Features

### Cinematic Animations
- **Scroll-driven 3D card rotation** — community initiative cards rotate from `rotateY(±55deg)` into flat position as they enter the viewport, driven by a `requestAnimationFrame` loop that writes directly to DOM refs (zero React re-renders on scroll)
- **Sticky scroll sequence** — featured initiative image physically shrinks from 70% viewport into its grid slot position as you scroll, with staggered grid item reveals
- **Letterbox cinematic intro** — hero section opens with film-style bars, a gold scan line sweep, and staggered title word reveals
- **Ken Burns effect** — slow 14-second zoom on the hero background image

### Performance
- All scroll animations write directly to `element.style` via refs — no `setState` on scroll events
- `willChange: "transform, opacity"` promotes animated elements to GPU layers
- One `requestAnimationFrame` loop per animated section
- `IntersectionObserver` for one-shot entrance animations

### Design System
- **Colors**: Navy `#002244`, Gold `#FFD700`, Red `#D50A0A`, Teal `#00CCA3`, Orange `#FF6B35`
- **Typography**: Anton / Impact for display headings, system-ui for body
- **NFL logo**: Real shield `.webp` with CSS `invert(1)` for white-on-dark rendering

---

## Project Structure

```
app/
├── layout.tsx                  # Root layout with fonts and analytics
├── page.tsx                    # Home page
├── our-mission/
│   └── page.tsx                # Mission page
└── our-initiatives/
    └── page.tsx                # Initiatives page

components/
├── navigation.tsx              # Fixed transparent nav, dark on scroll
├── footer.tsx                  # Site footer with social links
├── hero-section.tsx            # Home cinematic hero
├── mission-section.tsx         # Mission statement
├── kid-of-week-section.tsx     # Kid of the Week spotlight
├── news-section.tsx            # News carousel with pixel-accurate sliding
├── pillars-section.tsx         # Community pillars with animated bars
├── stats-section.tsx           # Animated number counters
└── ui/
    ├── youth-initiatives-scroll.tsx   # Sticky scroll grid reveal
    └── dive-into-community.tsx        # 3D scroll card sequence

public/
├── hero-bg.png                 # Halftone dot pattern background
├── hero-players.png            # NFL youth player cutout
├── nfl-logo.webp               # NFL shield logo
└── [initiative images]         # Program and partner photos
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment

No environment variables required. Vercel Analytics activates automatically on Vercel deployments.

---

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com). Push to your connected GitHub repository and Vercel will handle the build automatically.

```bash
# Or deploy via Vercel CLI
npx vercel
```

---

## Initiatives Covered

| Initiative | Focus |
|---|---|
| NFL Play 60 | Youth physical activity — 60 minutes daily |
| GENYOUth | School nutrition and wellness programs |
| Character Plays | Mental health and relationship building |
| NFL Foundation | Community investment and grants |
| Inspire Change | Social justice and opportunity |
| Latino Youth Honors | Recognition of Latino student athletes |
| NFL Flag | Youth flag football across all 50 states |
| Special Olympics | Inclusive athletics for all abilities |
| Big Brothers Big Sisters | One-to-one youth mentorship |
| Harlem Globetrotters | Education and community engagement |
| SMASH | STEM access for underrepresented students |
| Boys & Girls Club | After-school programs and mentorship |

---

## Credits

Built as part of an NFL community outreach project. All NFL marks, logos, and related content are property of the National Football League.
