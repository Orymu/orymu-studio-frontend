import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div
      className="content-frame"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        textAlign: "center",
        padding: "80px 24px",
        backgroundColor: "var(--light-1, #f6f6f6)",
        color: "var(--ink, #0c1118)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          color: "var(--card-muted, #6b7080)",
          letterSpacing: "0.08em",
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 500,
          color: "var(--ink, #0c1118)",
          marginTop: "12px",
          marginBottom: "16px",
        }}
      >
        Halaman Tidak Ditemukan
      </h1>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "16px",
          color: "rgba(12, 17, 24, 0.65)",
          maxWidth: "480px",
          marginBottom: "32px",
        }}
      >
        Proyek atau halaman yang Anda cari tidak tersedia atau tautan sudah berpindah.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="dark" href="/work">
          Lihat Semua Karya
        </Button>
        <Button variant="light" href="/">
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
