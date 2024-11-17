import type { Metadata } from "next";
import "./globals.css";
import { Prompt } from 'next/font/google'
import { Providers } from "./Provider";

const prompt_font = Prompt({
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`${prompt_font.variable} antialiased `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
