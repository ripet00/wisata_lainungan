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
      <head>
        <meta name="google-site-verification" content="BGz6kL8pGq4aO9VO2RRVhKVI5liJvbmrIeEtINnTWkc" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
