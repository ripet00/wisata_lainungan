import "./globals.css";

export const metadata = {
  title: "Wisata Lainungan",
  description: "Wisata Desa Lainungan, Kabupaten Sidrap",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
