import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { getBackgroundFromCookie } from "@/lib/cookies";

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
  metadataBase: new URL("https://www.bloomwithin.site"),
  openGraph: {
    title: "Bloom",
    description: "Bloom where you are planted",
    url: "https://www.bloomwithin.site",
    siteName: "Bloom",
    images: [
      {
        url: "/bloom-og.PNG",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloom",
    description: "Bloom where you are planted",
    images: ["/bloom-og.PNG"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }) {
  const initialBackground = getBackgroundFromCookie();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider initialBackground={initialBackground}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
