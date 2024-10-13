import type { Metadata } from "next";
import "./globals.css";
import { Prompt } from 'next/font/google'
import { Providers } from "./Provider";

<<<<<<< HEAD
const prompt_font = Prompt({
=======
export const prompt_font = Prompt({
>>>>>>> 98a880cc7fa3c1996d87d11bd81b7274ae124852
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
        className={`${prompt_font.variable} antialiased `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
