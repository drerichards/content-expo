import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { AppFrame } from "@/shared/ui/frame/AppFrame";
import { AppSideNavigation } from "@/interface/navigation/AppSideNavigation";
import { AppTopNavigation } from "@/interface/navigation/AppTopNavigation";
import { SearchControlsProvider } from "@/interface/search/context/SearchControlsContext";
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
  description: "Learning engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`app ${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <SearchControlsProvider>
            <AppFrame
              top={<AppTopNavigation />}
              side={<AppSideNavigation />}
              main={children}
            />
          </SearchControlsProvider>
        </Providers>
      </body>
    </html>
  );
}
