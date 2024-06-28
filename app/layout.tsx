import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppContextProvider } from "@/components/providers/app-context-provider";
import { GoogleAnalytics } from '@next/third-parties/google'

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bisaric.com"),

  title: {
    template: "%s | BISARIC",
    default: "BISARIC",
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
    title: "Bishal Moktan",
    description:
      "Created with a vision to create a community-driven platform where users could not only access lyrics but also engage with them in meaningful ways. What started as a passion project has now evolved into a thrivingˀ ecosystem of music enthusiasts, artists, and lyric aficionados.",
    url: "https://www.bisaric.com",
    siteName: "Bishal Moktan",
    images: "/og.png",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AppContextProvider>{children}</AppContextProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-CBNDLKKS18" />
      </body>
    </html>
  );
}
