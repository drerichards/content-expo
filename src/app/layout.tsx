// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { AppContainer } from "@/shared/app/AppContainer";

import "@/shared/styles/tokens.css";
import "@/shared/styles/rules.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kernel",
  description: "Kernel learning engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`app ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppContainer>{children}</AppContainer>
        </Providers>
      </body>
    </html>
  );
}
