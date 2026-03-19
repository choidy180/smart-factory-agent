'use client';

import dynamic from 'next/dynamic';

const RealtimeAlarmDashboard = dynamic(
  () => import('@/components/realtime/RealtimeAlarmDashboard'),
  {
    ssr: false,
    loading: () => null
  }
);

export default function RealtimeAlertsPage() {
  return <RealtimeAlarmDashboard />;
}
