import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import AppShell from '@/components/layout/AppShell';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: '스마트 공정 설비 Agent',
  description: '스마트 공정 설비 모니터링 및 실시간 알람 대응 대시보드'
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
