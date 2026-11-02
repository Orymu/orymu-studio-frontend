export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  thumbSrc?: string;
  width: number;
  height: number;
  poster?: string;
}

export interface Project {
  slug: string;
  title: string;
  category?: string;
  subtitle?: string;
  overview?: string;
  scope?: string[];
  href?: string;
  isNew?: boolean;
  featured?: boolean;
  placeholder?: boolean;
  media: ProjectMedia[];
}

export type ProjectItem = Project;

export const projects: Project[] = [
  {
    "slug": "maintana",
    "title": "MAINTANA",
    "category": "Dashboard",
    "subtitle": "Sistem Manajemen Aset & Pemeliharaan Terpadu",
    "overview": "Platform web untuk mengelola jadwal pemeliharaan armada dan fasilitas operasional, memantau status aset secara real-time, dan mengurangi downtime operasional.",
    "scope": [
      "DASHBOARD",
      "WEB APP",
      "UI/UX",
      "FRONTEND"
    ],
    "featured": true,
    "placeholder": true,
    "media": [
      {
        "type": "image",
        "src": "/work/maintana/maintana-fleet-dashboard.avif",
        "thumbSrc": "/work/maintana/maintana-fleet-dashboard-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/maintana-asset-tracking.avif",
        "thumbSrc": "/work/maintana/maintana-asset-tracking-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/maintana-maintenance-schedule.avif",
        "thumbSrc": "/work/maintana/maintana-maintenance-schedule-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/maintana-inventory-records.avif",
        "thumbSrc": "/work/maintana/maintana-inventory-records-thumb.avif",
        "width": 1400,
        "height": 1086
      }
    ]
  },
  {
    "slug": "drope",
    "title": "Drope",
    "category": "Web App",
    "subtitle": "Sistem Pemesanan & Alur Layanan Logistik Cepat",
    "overview": "Aplikasi web modern yang menyederhanakan alur pemesanan drop-off dan pickup logistik, pelacakan resi instan, serta integrasi manajemen kurir.",
    "scope": [
      "WEB APP",
      "BOOKING",
      "UI/UX",
      "FRONTEND"
    ],
    "featured": true,
    "placeholder": true,
    "media": [
      {
        "type": "video",
        "src": "/work/drope/drope-logistics-motion.webm",
        "poster": "/work/drope/drope-booking-interface.avif",
        "width": 944,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/drope/drope-booking-interface.avif",
        "thumbSrc": "/work/drope/drope-booking-interface-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/drope/drope-dispatch-tracking.avif",
        "thumbSrc": "/work/drope/drope-dispatch-tracking-thumb.avif",
        "width": 1400,
        "height": 1069
      },
      {
        "type": "image",
        "src": "/work/drope/drope-order-management.avif",
        "thumbSrc": "/work/drope/drope-order-management-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/drope/drope-courier-mobile.avif",
        "thumbSrc": "/work/drope/drope-courier-mobile-thumb.avif",
        "width": 1400,
        "height": 1069
      },
      {
        "type": "image",
        "src": "/work/drope/drope-delivery-analytics.avif",
        "thumbSrc": "/work/drope/drope-delivery-analytics-thumb.avif",
        "width": 1400,
        "height": 1084
      }
    ]
  },
  {
    "slug": "arunika-wedding",
    "title": "Arunika Wedding",
    "category": "Mobile App",
    "subtitle": "Marketplace Vendor & Perencana Pernikahan Digital",
    "overview": "Aplikasi mobile terpadu untuk calon pengantin mencari, membandingkan, dan memesan vendor pernikahan lengkap dengan fitur penjadwalan dan manajemen anggaran.",
    "scope": [
      "MOBILE APP",
      "MARKETPLACE",
      "UI/UX",
      "PROTOTYPE"
    ],
    "featured": true,
    "placeholder": true,
    "media": [
      {
        "type": "image",
        "src": "/work/arunika-wedding/arunika-wedding-catalog.avif",
        "thumbSrc": "/work/arunika-wedding/arunika-wedding-catalog-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/arunika-wedding/arunika-wedding-vendor-detail.avif",
        "thumbSrc": "/work/arunika-wedding/arunika-wedding-vendor-detail-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/arunika-wedding/arunika-wedding-budget-planner.avif",
        "thumbSrc": "/work/arunika-wedding/arunika-wedding-budget-planner-thumb.avif",
        "width": 1400,
        "height": 1086
      }
    ]
  },
  {
    "slug": "ils",
    "title": "ILS",
    "category": "Landing Page",
    "subtitle": "Profil Perusahaan & Ekosistem Layanan Terintegrasi",
    "overview": "Situs web profil perusahaan yang menampilkan kapabilitas industri, jaringan distribusi, serta portofolio layanan dengan struktur navigasi yang cepat dan terukur.",
    "scope": [
      "LANDING PAGE",
      "COMPANY PROFILE",
      "UI/UX",
      "FRONTEND"
    ],
    "featured": false,
    "placeholder": true,
    "media": [
      {
        "type": "video",
        "src": "/work/ils/ils-industrial-motion.webm",
        "poster": "/work/ils/ils-company-profile-hero.avif",
        "width": 914,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/ils/ils-company-profile-hero.avif",
        "thumbSrc": "/work/ils/ils-company-profile-hero-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/ils/ils-distribution-network.avif",
        "thumbSrc": "/work/ils/ils-distribution-network-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/ils/ils-offshore-logistics.avif",
        "thumbSrc": "/work/ils/ils-offshore-logistics-thumb.avif",
        "width": 1400,
        "height": 1060
      },
      {
        "type": "image",
        "src": "/work/ils/ils-integrated-services.avif",
        "thumbSrc": "/work/ils/ils-integrated-services-thumb.avif",
        "width": 1400,
        "height": 1084
      },
      {
        "type": "image",
        "src": "/work/ils/ils-global-presence.avif",
        "thumbSrc": "/work/ils/ils-global-presence-thumb.avif",
        "width": 1400,
        "height": 1104
      }
    ]
  },
  {
    "slug": "sira-swiss",
    "title": "Sira Swiss",
    "category": "Landing Page",
    "subtitle": "Situs Kampanye & Komunikasi Lembaga Nirlaba",
    "overview": "Halaman arahan interaktif untuk inisiatif sosial dan keberlanjutan di Swiss, dirancang untuk menyampaikan dampak program serta mempermudah partisipasi publik.",
    "scope": [
      "LANDING PAGE",
      "NON-PROFIT",
      "UI/UX",
      "FRONTEND"
    ],
    "featured": false,
    "placeholder": true,
    "media": [
      {
        "type": "video",
        "src": "/work/sira-swiss/sira-swiss-campaign-motion.webm",
        "poster": "/work/sira-swiss/sira-swiss-sustainability-hero.avif",
        "width": 928,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/sira-swiss-sustainability-hero.avif",
        "thumbSrc": "/work/sira-swiss/sira-swiss-sustainability-hero-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/sira-swiss-impact-programs.avif",
        "thumbSrc": "/work/sira-swiss/sira-swiss-impact-programs-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/sira-swiss-public-advocacy.avif",
        "thumbSrc": "/work/sira-swiss/sira-swiss-public-advocacy-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/sira-swiss-engagement-flow.avif",
        "thumbSrc": "/work/sira-swiss/sira-swiss-engagement-flow-thumb.avif",
        "width": 1400,
        "height": 1086
      }
    ]
  },
  {
    "slug": "niyyah",
    "title": "Niyyah",
    "category": "Mobile App",
    "subtitle": "Aplikasi Pelacak Kebiasaan & Pengingat Ibadah Harian",
    "overview": "Aplikasi mobile pelacak rutinitas harian dengan antarmuka yang tenang, dilengkapi analitik perkembangan kebiasaan dan pengingat waktu ibadah yang presisi.",
    "scope": [
      "MOBILE APP",
      "HABIT TRACKER",
      "UI/UX",
      "PROTOTYPE"
    ],
    "featured": false,
    "placeholder": true,
    "media": [
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-habit-tracker-home.avif",
        "thumbSrc": "/work/niyyah/niyyah-habit-tracker-home-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-prayer-schedule.avif",
        "thumbSrc": "/work/niyyah/niyyah-prayer-schedule-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-streak-analytics.avif",
        "thumbSrc": "/work/niyyah/niyyah-streak-analytics-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-routine-builder.avif",
        "thumbSrc": "/work/niyyah/niyyah-routine-builder-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-milestones-achieved.avif",
        "thumbSrc": "/work/niyyah/niyyah-milestones-achieved-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-mindful-journal.avif",
        "thumbSrc": "/work/niyyah/niyyah-mindful-journal-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-appearance-modes.avif",
        "thumbSrc": "/work/niyyah/niyyah-appearance-modes-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/niyyah-monthly-summary.avif",
        "thumbSrc": "/work/niyyah/niyyah-monthly-summary-thumb.avif",
        "width": 1400,
        "height": 1086
      }
    ]
  },
  {
    "slug": "kevly",
    "title": "Kevly",
    "category": "Mobile App",
    "subtitle": "Aplikasi Manajemen Keuangan Pribadi & Pembayaran Digital",
    "overview": "Antarmuka mobile fintech untuk pencatatan transaksi harian, visualisasi arus kas otomatis, dan pembayaran digital yang aman.",
    "scope": [
      "MOBILE APP",
      "FINTECH",
      "UI/UX",
      "PROTOTYPE"
    ],
    "featured": false,
    "placeholder": true,
    "media": [
      {
        "type": "image",
        "src": "/work/kevly/kevly-wallet-dashboard.avif",
        "thumbSrc": "/work/kevly/kevly-wallet-dashboard-thumb.avif",
        "width": 1400,
        "height": 1086
      }
    ]
  },
  {
    "slug": "undangan-pernikahan-digital",
    "title": "Undangan Pernikahan Digital",
    "category": "Landing Page",
    "subtitle": "Situs Undangan Pernikahan Interaktif & RSVP Online",
    "overview": "Landing page undangan pernikahan digital dengan tipografi editorial yang halus, fitur RSVP langsung, panduan lokasi acara, dan buku tamu virtual.",
    "scope": [
      "LANDING PAGE",
      "INVITATION",
      "UI/UX",
      "FRONTEND"
    ],
    "featured": false,
    "placeholder": true,
    "media": [
      {
        "type": "video",
        "src": "/work/undangan-pernikahan-digital/undangan-pernikahan-motion.webm",
        "poster": "/work/undangan-pernikahan-digital/undangan-pernikahan-schedule-venue.avif",
        "width": 928,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/undangan-pernikahan-hero.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/undangan-pernikahan-hero-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/undangan-pernikahan-schedule-venue.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/undangan-pernikahan-schedule-venue-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/undangan-pernikahan-rsvp-guestbook.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/undangan-pernikahan-rsvp-guestbook-thumb.avif",
        "width": 1400,
        "height": 1007
      }
    ]
  }
];
