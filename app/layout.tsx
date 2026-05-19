import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "开卷 Unfold",
  description: "AI narrative game creation editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
