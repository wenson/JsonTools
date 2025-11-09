import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JSONProvider } from "@/contexts/json-context";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Parser Tool - 功能完整的在线 JSON 解析工具",
  description: "一个功能完整、隐私安全、高性能的在线 JSON 解析工具。支持格式化、复制、去转义、折叠展开等功能。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <JSONProvider>
          {children}
          <Toaster />
        </JSONProvider>
      </body>
    </html>
  );
}
