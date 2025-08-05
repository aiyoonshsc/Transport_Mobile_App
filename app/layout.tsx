import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "운송관리 - 대한민국 운수회사 통합 관리 플랫폼",
  description: "지입번호·차량·차주 정보를 한곳에서 관리하고, 실시간 위치 추적과 스마트 배차로 운영 효율을 극대화하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}