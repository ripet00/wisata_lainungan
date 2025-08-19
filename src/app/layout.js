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
        <meta name="google-site-verification" content="WxSQSUIDzBYTXGXSkHoMSXRBux2J7fBkTqppYXwvw_M" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
