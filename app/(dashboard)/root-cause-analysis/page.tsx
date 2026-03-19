import SectionPreviewPage from '@/components/shared/SectionPreviewPage';

export default function RootCauseAnalysisPage() {
  return (
    <SectionPreviewPage
      eyebrow="원인 구조화"
      title="문제 원인 분석"
      description="실시간 알람과 고장이력을 연결해 원인 후보를 점수화하는 화면입니다. 현재는 구조와 카드 흐름만 먼저 잡아둔 상태입니다."
      highlights={[
        '알람별 원인 후보 랭킹',
        '센서 패턴 비교 카드',
        '유사 고장 시퀀스 묶음'
      ]}
    />
  );
}
