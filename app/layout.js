import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Bloom",
  description: "Bloom where you are planted",
  image: "/lotus.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Open Graph (OG) Metadata for Social Media */}
        <meta property="og:title" content="Bloom" />
        <meta property="og:description" content="Bloom where you are planted" />
        <meta
          property="og:image"
          content="https://www.bloomwithin.site/lotus.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bloomwithin.site" />
        <meta property="og:site_name" content="Bloom" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bloom" />
        <meta
          name="twitter:description"
          content="Bloom where you are planted"
        />
        <meta
          name="twitter:image"
          content="https://www.bloomwithin.site/lotus.png"
        />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
