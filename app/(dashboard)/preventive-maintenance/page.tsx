import SectionPreviewPage from '@/components/shared/SectionPreviewPage';

export default function PreventiveMaintenancePage() {
  return (
    <SectionPreviewPage
      eyebrow="사전 보전"
      title="보전계획 수립"
      description="알람 추세와 유사 사례를 바탕으로 예방 보전 일정을 짜는 화면입니다. 현재는 카드 배치와 정보 구조를 우선 구현했습니다."
      highlights={[
        '설비별 리스크 우선순위',
        '다음 점검 권장 시점',
        '작업 준비물 요약'
      ]}
    />
  );
}
