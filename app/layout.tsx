import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: '스마트 공정 설비 Agent',
  description: '스마트 공정 설비 모니터링 및 실시간 알람 대응 대시보드'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
