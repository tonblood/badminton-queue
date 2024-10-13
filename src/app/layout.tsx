import type { Metadata } from "next";
import "./globals.css";
import { Prompt } from 'next/font/google'
import { Providers } from "./Provider";

// If loading a variable font, you don't need to specify the font weight
export const prompt = Prompt({
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-prompt',
  weight: ['100', '400', '600', '700']
})

export const metadata: Metadata = {
  title: "Badminton-Q",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.variable} antialiased `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
