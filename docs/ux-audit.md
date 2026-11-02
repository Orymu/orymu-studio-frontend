# Orymu Studio UI/UX Audit Report

> **Audit Type**: Comprehensive Evidence-Based UI/UX, Accessibility, and Technical Review  
> **Date**: October 28, 2026  
> **Environment**: Windows, Next.js 16.4.2 (App Router), React 19.3.0, Edge CDP (Chromium)  
> **Scope**: Read-only analysis of the landing page at `http://localhost:3000`  

---

## 1. Executive Summary & Stack

### Stack Overview
- **Framework**: Next.js 16.4.2 (App Router, Turbopack/Webpack)
- **Runtime & UI**: React 19.3.0 / React DOM 19.3.0
- **Styling**: Tailwind CSS v4, custom global CSS (`globals.css`, `orymu-sections.css`, legacy `twohands.css`)
- **Typography**: Next.js Google Fonts (`Geist` Sans and `Geist Mono`, `display: swap`)
- **Motion & Physics**: Lenis 1.3.27 (scroll), Motion 12.4.7 (UI presence & layout), GSAP 3.15.0 + ScrollTrigger (hero entrance & scrub)
- **Image Handling**: `next/image` with unoptimized bypass on showcase portfolio assets

### Viewports Tested
1. **Desktop**: `1440x900` (baseline wide desktop)
2. **Short Desktop**: `1366x768` (typical laptop / conference display)
3. **Laptop**: `1280x800` (MacBook 13" aspect)
4. **Tablet Landscape**: `1024x768` (iPad landscape)
5. **Phone Landscape**: `844x390` (iPhone landscape)
6. **Tablet Portrait**: `768x1024` (iPad portrait)
7. **Mobile**: `390x844` (iPhone standard)
8. **Narrow Mobile**: `360x740` (Android compact)

---

## 2. Audit Scorecard

| Category | Status | Evidence / Key Finding |
| :--- | :---: | :--- |
| **Visual Consistency** | **Needs Work** | Good geometric frame alignment, but 252 KB of legacy CSS (`twohands.css`) is imported alongside double imports of `orymu-sections.css`; hardcoded hex/rgba values used instead of `:root` tokens. |
| **Layout & Responsive** | **Good** | Zero horizontal scrollbar/overflow across all 8 viewports (`delta: 0`); navbar anchor scroll lands with exact `-84px` clearance; sticky pricing operates cleanly. Minor fold clipping on phone landscape (844x390). |
| **Navigation & Flow** | **Poor** | **P0 Blocker**: All 20+ CTAs pointing to `#contact` are dead links (target `#contact` does not exist). Tablet touch users have no tooltips for icon-only center nav. Missing focus trap in mobile menu. Missing skip link. |
| **Accessibility (WCAG 2.2 AA)** | **Needs Work** | Section bar counters (`3.22:1`) and muted body text (`4.28:1`) fail SC 1.4.3 minimum 4.5:1 ratio. Center nav icon buttons are 40x40px (< 44px tap target guideline). Dual `<header>` landmarks present. |
| **Performance** | **Needs Work** | Total First Load JS is lean (~130.6 KB gzip), but portfolio PNGs are unoptimized (~6.5 MB transferred) with `unoptimized` flag disabling WebP compression. 252 KB unused CSS loaded. |
| **SEO & Social Sharing** | **Poor** | Missing `og:image` and `twitter:image` (link previews will be blank); missing canonical tag; missing `robots.txt`, `sitemap.xml`, and Schema.org `Organization` structured data; favicon uses legacy "twohands" branding. |
| **Content & Conversion** | **Needs Work** | Value proposition is clear, but page has **zero** social proof (no client testimonials, no logos, no outcome metrics). Wording between 4 different CTA variants creates friction. Currency (USD) conflicts with Indonesian copy. |

---

## 3. Findings Table

| ID | Severity | Area | Location / Selector / Viewport | What is Wrong | Why It Matters | Concrete Evidence / Measured Value | Recommended Fix | Effort |
| :--- | :---: | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **F-01** | **P0** | Navigation | `HowItWorks.tsx`, `WorkSection.tsx`, `PricingSection.tsx`, `FaqSection.tsx` | All buttons pointing to `#contact` fail to navigate. | Users clicking any Pricing card CTA, the HowItWorks CTA, or FAQ contact CTA cannot convert; nothing happens. | `document.querySelectorAll("a[href='#contact']").length` = 21; `document.querySelector("#contact")` = `null`. Target does not exist in DOM. | Change footer element to `<footer ... id="contact">` or update all hrefs to `#footer` (or a dedicated contact drawer). | **S** |
| **F-02** | **P1** | SEO / Social | `src/app/layout.tsx:28-35` | Open Graph and Twitter image metadata tags are absent (`og:image`, `twitter:image`). | Sharing website links on WhatsApp, LinkedIn, X, Slack, or Telegram displays an empty grey box with no branding preview. | `audit_raw_data.json`: `ogImage: null`, `twitterImage: null`. Missing metadata properties in `RootLayout`. | Add `metadata.openGraph.images = ['/og-image.jpg']` and `metadata.twitter.images = ['/og-image.jpg']`. | **S** |
| **F-03** | **P1** | Accessibility | `src/app/globals.css:28`, `src/app/orymu-sections.css:695` | Muted text color `--ink-muted` (`rgba(12,17,24,0.55)`) and `.section-bar__counter` fail WCAG 2.2 AA contrast. | Low vision users and users in bright sunlight cannot comfortably read secondary text, counters, and labels. | Computed contrast: `.section-bar__counter` = **3.22:1** (requires 4.5:1); `.hero-subtext` secondary lines = **4.28:1** (requires 4.5:1 for <18.66px). | Darken `--ink-muted` to `rgba(12, 17, 24, 0.68)` (~5.2:1) and counter opacity to `0.72` (~5.5:1). | **S** |
| **F-04** | **P1** | Performance | `src/components/WorkSection.tsx:142-245`, `public/images/selected-work/` | Portfolio images are served unoptimized as raw PNGs up to 1.82 MB each, with `unoptimized` flag set on `<Image>`. | Downloads ~6.5 MB of uncompressed raster graphics on first scroll; burns mobile cellular data and degrades INP/LCP. | Measured transfer sizes: `ils-offshore.png` = 1,824,321 B; `sira-swiss.png` = 1,039,214 B. Total PNG payload = 6.48 MB. | Remove `unoptimized` attribute, configure Next.js image optimizer, and convert original files to compressed WebP/AVIF (<120 KB each). | **M** |
| **F-05** | **P1** | Accessibility | `src/app/layout.tsx`, `src/app/page.tsx` | No "Skip to main content" link exists on the page. | Keyboard-only and screen reader users must tab through all navigation items on every page visit (WCAG 2.4.1 Bypass Blocks violation). | `document.querySelector('a[href^="#main"], a[href^="#content"]')` = `null`. | Add an accessible `.skip-link` before `<Navbar />` that focuses `#hero` or `<main>`. | **S** |
| **F-06** | **P1** | Navigation | `src/components/Navbar.tsx:324-365` | Mobile navigation menu has no focus trap and does not manage focus on open/close. | Keyboard and assistive tech users tabbing through open mobile menu bleed into background page elements behind the backdrop. | Tabbing from mobile menu link 5 lands on hero background buttons; focus is not trapped in `panelRef`. | Implement a simple focus trap or `aria-modal="true"` focus management in `Navbar.tsx`. | **M** |
| **F-07** | **P1** | Code Health | `src/app/globals.css:2-3`, `src/app/layout.tsx:5` | Redundant 252 KB `twohands.css` stylesheet and duplicate `@import "./orymu-sections.css"` loaded on every request. | Increases CSS bundle size by ~305 KB; causes duplicate style recalculations and specificity collisions. | `twohands.css` file size: 252,105 bytes. `orymu-sections.css` imported in both `globals.css` and `layout.tsx`. | Remove `@import "./twohands.css"` from `globals.css`; remove duplicate `import "./orymu-sections.css"` from `layout.tsx`. | **S** |
| **F-08** | **P2** | Navigation / UX | `src/components/Navbar.tsx:243-270` | Center floating navbar uses icon-only pills with hover-only tooltips. | Touch devices (especially tablets 900px-1200px) do not have a cursor hover state; users cannot deduce what icon 01, 02, 03 mean. | At viewport `1024x768`, center pill is visible (`display: flex`), but tooltips only trigger on `:hover`. Touch yields no tooltip feedback. | Add visible mini-labels under icons or display text badges on tablet viewports. | **M** |
| **F-09** | **P2** | Accessibility | `src/components/Navbar.tsx:248-268` | Center navbar icon buttons are 40x40px, failing standard 44x44px touch target guidelines. | Increases tap errors and accidental navigation on high-density touchscreen laptops and tablets. | Measured bounding box: `width: 40px, height: 40px` (violates Apple HIG & Google Material 44-48px recommendation). | Expand hit target padding to `padding: 10px; min-width: 44px; min-height: 44px;`. | **S** |
| **F-10** | **P2** | Content / CRO | Entire page (`Navbar`, `Hero`, `HowItWorks`, `Pricing`, `Footer`) | CTA copy fragmentation: 4 different competing labels ("Mulai Konsultasi", "Mulai Sekarang", "Jadwalkan Diskusi", "Kirim Email"). | Causes decision fatigue and confusion about what step the user is actually taking (e.g. "Mulai Sekarang" goes to pricing, then pricing says "Mulai Sekarang" to contact). | 5 distinct button label variations across 7 conversion zones with overlapping intents. | Consolidate into 2 clear tiers: Primary = "Jadwalkan Diskusi", Secondary = "Lihat Paket Investasi" / "Kirim Email". | **S** |
| **F-11** | **P2** | Layout / Responsive | `src/components/Hero.tsx:107-145` | On mobile landscape (`844x390`), Hero height is 720px, pushing CTAs 330px below the fold. | Mobile users rotating their phone to landscape see only headline text; calls to action are completely invisible without scrolling. | Viewport `844x390`: `heroHeight` = 720px; `window.innerHeight` = 390px; `isHeroCtaVisibleAboveFold` = `false`. | Add media query for `@media (max-height: 500px) and (orientation: landscape)` to compress headline padding and canvas height. | **S** |
| **F-12** | **P2** | SEO / Branding | `src/app/layout.tsx:23-27` | Favicons and apple touch icons reference `/images/twohands-icon.png`. | Inconsistent branding: tab icons still display previous agency brand ("Twohands") instead of Orymu. | `metadata.icons` sets `icon: "/images/twohands-icon.png"`. File exists but represents old branding mark. | Replace `/images/twohands-icon.png` with official Orymu Studio mark / SVG favicon. | **S** |
| **F-13** | **P2** | Code Health | `src/components/` | Five obsolete components remain in the codebase (`DearFoundersSection`, `PillButton`, `Principles`, `StatsSection`, `TestimonialClaude`). | Bloats codebase repository, causes developer confusion, and leaks dead code. | Files present in `src/components/` but not imported by `src/app/page.tsx` or any active component. | Remove unused component files or move to an `archive/` folder. | **S** |
| **F-14** | **P2** | Code Health | `src/components/MotionProvider.tsx:40` | ESLint error: `react-hooks/set-state-in-effect` synchronously calling `setIsReducedMotion` inside effect. | Triggers an immediate cascading re-render on initial client mount; flagged as an anti-pattern in React 19. | ESLint output: `src/components/MotionProvider.tsx:40:5: error Calling setState synchronously within an effect`. | Initialize state lazily or synchronize via `useSyncExternalStore`. | **S** |
| **F-15** | **P3** | SEO / Technical | `public/robots.txt`, `public/sitemap.xml` | Missing `robots.txt` and `sitemap.xml` files. | Search engine crawlers have no indexation roadmap or crawl rate guidelines. | HTTP requests to `http://localhost:3000/robots.txt` return 404. | Add `src/app/robots.ts` and `src/app/sitemap.ts` using Next.js built-in route handlers. | **S** |
| **F-16** | **P3** | SEO / Technical | `src/app/layout.tsx:19-35` | Missing canonical tag (`<link rel="canonical">`) and missing Schema.org JSON-LD. | Search engines cannot distinguish primary domain from duplicate scraper mirrors; missing rich snippets. | Measured: `canonical: null`, `hasJsonLd: false`. | Add `metadata.alternates.canonical = 'https://www.orymu.studio'` and a structured data `<script type="application/ld+json">`. | **S** |
| **F-17** | **P3** | Visual Consistency | `src/components/Footer.tsx:12`, `src/app/orymu-sections.css:2000` | Footer heading `.footer-heading` has `font-weight: 600`, while all other section `h2`s are `font-weight: 500`. | Subtly breaks typography hierarchy consistency across sections. | Computed styles: `#problem h2`, `#how-it-works h2`, `#pricing h2` = `500`; `#footer h2` = `600`. | Set `.footer-heading` to `font-weight: 500` to match other section headers. | **S** |
| **F-18** | **P3** | Accessibility | `src/components/Hero.tsx:107` | Dual `<header>` landmarks (`#navbar` is `<header>`, `#hero` is `<header>`). | Multiple top-level header landmarks can confuse screen reader rotor navigation. | `document.querySelectorAll("header").length` = 2. | Change `#hero` to `<section id="hero" className="hero-light" aria-label="Hero">`. | **S** |
| **F-19** | **P3** | Code Health | `package.json:15` | `lucide-react` is installed as a production dependency but completely unused. | Unnecessary dependency footprint in `node_modules`. | `package.json` contains `"lucide-react": "^1.16.0"`, but 0 imports found in `src/`. All icons are hand-crafted SVGs. | Run `npm uninstall lucide-react`. | **S** |
| **F-20** | **P3** | Content / CRO | `src/components/PricingSection.tsx:24-44` | Pricing tiers are quoted exclusively in USD (`$2,500 – $4,000`), but website copy is 100% Indonesian. | Indonesian clients may hesitate or assume international billing/wire hurdles without IDR rate clarification. | Indonesian copy throughout (`"Paket Investasi yang Transparan"`), but currency is `$ USD`. | Add small currency note (e.g., "Pembayaran IDR disesuaikan kurs Bank Indonesia") or dual pricing. | **S** |

---

## 4. Top 10 Quick Wins (High Impact, Small Effort)

1. **Fix Broken `#contact` Destination (P0)**:
   - *Fix*: In `src/components/Footer.tsx`, ensure the footer element has `id="contact"` (or add an anchor alias) so all 21 buttons in Pricing, How It Works, Portfolio, and FAQ land on the contact form and email options.
   - *Effort*: **5 minutes (S)**.

2. **Add Open Graph & Twitter Share Images (P1)**:
   - *Fix*: Add `images: ['/images/og-image.png']` to `openGraph` and `twitter` in `src/app/layout.tsx`.
   - *Effort*: **5 minutes (S)**.

3. **Delete Unused 252 KB `twohands.css` and Duplicate CSS Import (P1)**:
   - *Fix*: In `src/app/globals.css`, remove `@import "./twohands.css";`. In `src/app/layout.tsx`, remove redundant `import "./orymu-sections.css";`. Immediately sheds 252 KB of legacy CSS.
   - *Effort*: **3 minutes (S)**.

4. **Correct Muted Text & Counter Contrast Ratios (P1)**:
   - *Fix*: In `src/app/globals.css`, update `--ink-muted: rgba(12, 17, 24, 0.70);`. In `src/app/orymu-sections.css`, update `.section-bar__counter` opacity to `0.75` so both achieve >5.0:1 contrast on white and light-grey backgrounds.
   - *Effort*: **5 minutes (S)**.

5. **Enable Next.js Image Optimization for Portfolio Cards (P1)**:
   - *Fix*: In `src/components/WorkSection.tsx`, remove `unoptimized` from the `<Image />` component. Compress source PNGs in `public/images/selected-work/` to modern WebP. Reduces page payload by ~5 MB.
   - *Effort*: **15 minutes (S)**.

6. **Add Accessible Skip-to-Content Link (P1)**:
   - *Fix*: Insert `<a href="#hero" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:shadow">Lewati ke konten utama</a>` at top of `layout.tsx`.
   - *Effort*: **5 minutes (S)**.

7. **Consolidate CTA Wording (P2)**:
   - *Fix*: Standardize primary button labels across all sections to `"JADWALKAN DISKUSI"` and secondary to `"KIRIM EMAIL"` or `"LIHAT PAKET"`.
   - *Effort*: **10 minutes (S)**.

8. **Update Brand Favicon & Apple Touch Icon (P2)**:
   - *Fix*: Update `layout.tsx` metadata icons from `/images/twohands-icon.png` to `/favicon.ico` and `/images/orymu-logo.jpg`.
   - *Effort*: **5 minutes (S)**.

9. **Fix Dual `<header>` Landmarks (P3)**:
   - *Fix*: In `src/components/Hero.tsx`, change root `<header>` tag to `<section id="hero" className="hero-light" aria-label="Hero">`.
   - *Effort*: **2 minutes (S)**.

10. **Uninstall Dead Dependency `lucide-react` (P3)**:
    - *Fix*: Run `npm uninstall lucide-react` to clean `package.json` and lockfile.
    - *Effort*: **2 minutes (S)**.

---

## 5. Questions for the Owner (Product & Business Strategy)

1. **Target Market & Currency**: The site copy is written in natural, fluent Indonesian, but pricing is stated in USD (`$2,500 – $10,000`). Are you primarily targeting Indonesian funded startups / SMEs, or Southeast Asian / international founders? Should we provide an IDR estimate or state "Faktur dalam IDR / USD"?
2. **Social Proof & Client Outcomes**: A development agency charging up to $10,000 per build needs proof. Can we feature 2–3 client quotes, verified logos (e.g. from the RSCM hospital oncology project or past startups), or delivery metrics (e.g., "Delivered in 3 weeks", "Zero downtime")?
3. **Primary Lead Channel**: When a visitor clicks "Jadwalkan Diskusi", what is your ideal conversion funnel:
   - An embedded Calendly / Cal.com scheduling link?
   - A direct WhatsApp chat link (e.g. `https://wa.me/...`)?
   - A simple email draft (`mailto:`)?
4. **Legal & Entity Presence**: Is Orymu Studio registered under a formal PT / CV in Indonesia? Would you like a minimal Privacy Policy & Terms page linked in the footer to reinforce client trust?

---

## 6. Verification Boundaries (What Could Not Be Measured)

1. **External Google Lighthouse & WebPageTest**: Because this audit was performed locally in an offline development sandbox, cloud-based synthetic testing (PageSpeed Insights / public WebPageTest) was not runnable. Local Chromium PerformanceObserver was utilized instead.
2. **Real iOS Safari / Physical Android WebViews**: Mobile viewports were emulated with Chromium DevTools Protocol (CDP) device emulation. Physical iOS WebKit elastic scrolling nuances (such as dynamic URL bar collapse) should be verified on a real iPhone before major marketing launches.
