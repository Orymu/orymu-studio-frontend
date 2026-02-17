# Orymu Studio Frontend

Frontend website Orymu Studio menggunakan Next.js App Router, TypeScript, dan Tailwind CSS v4.

## Overview

Project ini berisi landing page modular dengan section:

- Hero
- About
- Service
- Portfolio
- Pricing
- Footer

Semua section disusun per folder domain agar lebih mudah dirawat dan di-scale.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)
- Lenis (smooth scroll)
- shadcn/ui setup (komponen UI dasar)

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    features/
      index.ts
      home/
        index.ts
        home/
          Hero.tsx
          HeroNavbar.tsx
          HeroContent.tsx
          HeroBackground.tsx
          hero-types.ts
        about/
          About.tsx
          AboutHeader.tsx
          AboutProcessCard.tsx
          AboutCardVisual.tsx
          about-types.ts
        service/
          Service.tsx
          ServiceHeader.tsx
          ServiceTimeline.tsx
          service-types.ts
        portfolio/
          Portfolio.tsx
          PortfolioHeader.tsx
          PortfolioShowcaseCard.tsx
          PortfolioMetrics.tsx
          portfolio-types.ts
        pricing/
          Pricing.tsx
          PricingHeader.tsx
          PricingPlanCard.tsx
          PricingFeatureList.tsx
          pricing-types.ts
        footer/
          Footer.tsx
          FooterTopStrip.tsx
          FooterSocialLink.tsx
          FooterBrandMarquee.tsx
          FooterBottomBar.tsx
          footer-types.ts
    ui/
      button.tsx
  lib/
    utils/
      utils.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Install

```bash
pnpm install
```

### Run Dev Server

```bash
pnpm dev
```

Akses di `http://localhost:3000`.

## Available Scripts

```bash
pnpm dev         # run dev server (turbopack)
pnpm build       # static production build (out/)
pnpm start       # preview static output on port 3000
pnpm lint        # lint check
pnpm type-check  # TypeScript check
pnpm test        # run tests
pnpm test:watch  # run tests in watch mode
pnpm db:push     # prisma db push
pnpm db:studio   # prisma studio
pnpm db:seed     # seed database
```

## Styling and Design Tokens

Design token dikelola di `src/app/globals.css` menggunakan CSS variables (`--bg-*`, `--text-*`, `--border-*`) dan dipetakan ke Tailwind v4 `@theme inline`.

## Notes

- Path alias `@/*` diarahkan ke `src/*` (lihat `tsconfig.json`).
- Export section home terpusat di `src/components/features/home/index.ts`.
- Export global fitur ada di `src/components/features/index.ts`.

## Deployment

- CI/CD dan deployment ke DigitalOcean Droplet didokumentasikan di `docs/DEPLOYMENT.md`.
