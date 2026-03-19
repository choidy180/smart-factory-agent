import SectionPreviewPage from '@/components/shared/SectionPreviewPage';

export default function SettingsPage() {
  return (
    <SectionPreviewPage
      eyebrow="운영 관리"
      title="설정 · 알람 매니저"
      description="알람 등급, 알림 채널, Agent 템플릿 같은 운영 설정을 한 곳에서 다루는 페이지입니다. 메뉴 연결용 기본 화면까지 정리했습니다."
      highlights={[
        '알람 룰 관리',
        '알림 대상 및 채널 설정',
        'Agent 프롬프트 템플릿 관리'
      ]}
    />
  );
}
