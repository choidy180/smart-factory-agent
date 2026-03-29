import SectionPreviewPage from '@/components/shared/SectionPreviewPage';

export default function ImprovementIdeationPage() {
  return (
    <SectionPreviewPage
      eyebrow="현장 개선"
      title="개선 Ideation"
      description="반복되는 설비 이슈를 개선 과제로 정리하는 페이지입니다. 개선안, 예상 효과, 우선순위를 카드 중심으로 확장할 수 있도록 설계했습니다."
      highlights={[
        '개선 후보 큐레이션',
        '예상 효과 비교',
        '현장 실행 체크리스트'
      ]}
    />
  );
}
