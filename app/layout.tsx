import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppContextProvider } from '@/components/providers/app-context-provider';

const font = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lyrics App',
  description: 'Find lyrics for you music',
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
          <AppContextProvider>
          {children}
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
