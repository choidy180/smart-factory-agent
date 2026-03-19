export const navigationSections = [
  {
    title: '실시간 대응',
    items: [
      {
        href: '/realtime-alerts',
        label: '실시간 알람 대응',
        icon: 'alert'
      },
      {
        href: '/root-cause-analysis',
        label: '문제 원인 분석',
        icon: 'rootCause'
      },
      {
        href: '/improvement-ideation',
        label: '개선 Ideation',
        icon: 'improvement'
      },
      {
        href: '/preventive-maintenance',
        label: '보전계획 수립',
        icon: 'shield'
      }
    ]
  },
  {
    title: '운영 관리',
    items: [
      {
        href: '/settings',
        label: '설정 · 알람 매니저',
        icon: 'settings'
      }
    ]
  }
];

export const navigationItems = navigationSections.flatMap((section) => section.items);
