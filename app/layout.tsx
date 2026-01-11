import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: "Melody AI — Tìm bài hát từ trí nhớ của bạn",
  description: "Ứng dụng AI giúp bạn tìm bài hát từ đoạn lời nhớ, mô tả hoặc giai điệu",
  keywords: ["music", "AI", "song finder", "lyrics", "karaoke", "nhạc", "tìm bài hát"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050507",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
