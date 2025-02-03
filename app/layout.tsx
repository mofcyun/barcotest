import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "베이직테크 Barco E2 Level 1 TEST",
  description: "베이직테크 Barco E2 Level 1 자격 시험",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
