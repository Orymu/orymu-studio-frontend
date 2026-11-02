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
        "src": "/work/maintana/1.avif",
        "thumbSrc": "/work/maintana/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/2.avif",
        "thumbSrc": "/work/maintana/2-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/3.avif",
        "thumbSrc": "/work/maintana/3-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/maintana/4.avif",
        "thumbSrc": "/work/maintana/4-thumb.avif",
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
        "src": "/work/drope/motion.webm",
        "poster": "/work/drope/1.avif",
        "width": 944,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/drope/1.avif",
        "thumbSrc": "/work/drope/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/drope/2.avif",
        "thumbSrc": "/work/drope/2-thumb.avif",
        "width": 1400,
        "height": 1069
      },
      {
        "type": "image",
        "src": "/work/drope/3.avif",
        "thumbSrc": "/work/drope/3-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/drope/4.avif",
        "thumbSrc": "/work/drope/4-thumb.avif",
        "width": 1400,
        "height": 1069
      },
      {
        "type": "image",
        "src": "/work/drope/5.avif",
        "thumbSrc": "/work/drope/5-thumb.avif",
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
        "src": "/work/arunika-wedding/1.avif",
        "thumbSrc": "/work/arunika-wedding/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/arunika-wedding/2.avif",
        "thumbSrc": "/work/arunika-wedding/2-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/arunika-wedding/3.avif",
        "thumbSrc": "/work/arunika-wedding/3-thumb.avif",
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
        "src": "/work/ils/motion.webm",
        "poster": "/work/ils/1.avif",
        "width": 914,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/ils/1.avif",
        "thumbSrc": "/work/ils/1-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/ils/2.avif",
        "thumbSrc": "/work/ils/2-thumb.avif",
        "width": 1400,
        "height": 1068
      },
      {
        "type": "image",
        "src": "/work/ils/3.avif",
        "thumbSrc": "/work/ils/3-thumb.avif",
        "width": 1400,
        "height": 1060
      },
      {
        "type": "image",
        "src": "/work/ils/4.avif",
        "thumbSrc": "/work/ils/4-thumb.avif",
        "width": 1400,
        "height": 1084
      },
      {
        "type": "image",
        "src": "/work/ils/5.avif",
        "thumbSrc": "/work/ils/5-thumb.avif",
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
        "src": "/work/sira-swiss/motion.webm",
        "poster": "/work/sira-swiss/1.avif",
        "width": 928,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/1.avif",
        "thumbSrc": "/work/sira-swiss/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/2.avif",
        "thumbSrc": "/work/sira-swiss/2-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/3.avif",
        "thumbSrc": "/work/sira-swiss/3-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/sira-swiss/4.avif",
        "thumbSrc": "/work/sira-swiss/4-thumb.avif",
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
        "src": "/work/niyyah/1.avif",
        "thumbSrc": "/work/niyyah/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/2.avif",
        "thumbSrc": "/work/niyyah/2-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/3.avif",
        "thumbSrc": "/work/niyyah/3-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/4.avif",
        "thumbSrc": "/work/niyyah/4-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/5.avif",
        "thumbSrc": "/work/niyyah/5-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/6.avif",
        "thumbSrc": "/work/niyyah/6-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/7.avif",
        "thumbSrc": "/work/niyyah/7-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/niyyah/8.avif",
        "thumbSrc": "/work/niyyah/8-thumb.avif",
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
        "src": "/work/kevly/1.avif",
        "thumbSrc": "/work/kevly/1-thumb.avif",
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
        "src": "/work/undangan-pernikahan-digital/motion.webm",
        "poster": "/work/undangan-pernikahan-digital/2.avif",
        "width": 928,
        "height": 720
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/1.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/1-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/2.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/2-thumb.avif",
        "width": 1400,
        "height": 1086
      },
      {
        "type": "image",
        "src": "/work/undangan-pernikahan-digital/3.avif",
        "thumbSrc": "/work/undangan-pernikahan-digital/3-thumb.avif",
        "width": 1400,
        "height": 1007
      }
    ]
  }
];
