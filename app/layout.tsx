import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppContextProvider } from "@/components/providers/app-context-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bisaric.com"),

  title: {
    template: "%s | Bisaric",
    default: "Bisaric",
  },
  authors: {
    name: "BISARIC",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Created with a vision to create a community-driven platform where users could not only access lyrics but also engage with them in meaningful ways. What started as a passion project has now evolved into a thrivingˀ ecosystem of music enthusiasts, artists, and lyric aficionados.",
  openGraph: {
    title: "Bisaric",
    description:
      "Created with a vision to create a community-driven platform where users could not only access lyrics but also engage with them in meaningful ways. What started as a passion project has now evolved into a thrivingˀ ecosystem of music enthusiasts, artists, and lyric aficionados.",
    url: "https://www.bisaric.com",
    siteName: "Bisaric",
    type: "website",
  },
  keywords: ["nepali lyrics", "lyrics of nepali songs", "nepali songs", "new nepali songs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
      <NextTopLoader
  color="#2299DD"
  initialPosition={0.08}
  crawlSpeed={200}
  height={3}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
  showAtBottom={false}
/>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
            <Toaster richColors />
          <AppContextProvider>{children}</AppContextProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-CBNDLKKS18" />
      </body>
    </html>
  );
}
