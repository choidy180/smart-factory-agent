import { ArrowRightIcon, BoltIcon } from '@/components/icons/AppIcons';
import { buildGuideSections } from '@/components/realtime/realtime.constants';
import {
  CardBody,
  GuideBulletItem,
  GuideBulletList,
  GuideLeadCard,
  GuideLeadLabel,
  GuideLeadText,
  GuideParagraph,
  GuideSection,
  GuideSectionList,
  GuideSectionTitle,
  GuideStepBody,
  GuideStepCard,
  GuideStepIndex,
  GuideStepText,
  GuideStepTitle,
  PanelActionButton,
  PanelHeader,
  PanelIconWrap,
  PanelSubTitle,
  PanelTitle,
  PanelTitleGroup,
  PanelTitleTextGroup,
  ReportCard
} from '@/components/realtime/reportPrimitives';
import type { Alarm } from '@/types/alarm';

interface GuideReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function GuideReportCard({ alarm, onAsk }: GuideReportCardProps) {
  const guideSections = buildGuideSections(alarm);

  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            <BoltIcon size={18} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <PanelTitle>조치 가이드</PanelTitle>
            <PanelSubTitle>복구 순서 · 우선 점검 항목 · 참고 메모</PanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <PanelActionButton type="button" onClick={onAsk}>
          질문하기
          <ArrowRightIcon size={14} />
        </PanelActionButton>
      </PanelHeader>

      <CardBody>
        <GuideLeadCard>
          <GuideLeadLabel>초기 판단</GuideLeadLabel>
          <GuideLeadText>{alarm.aiSummary}</GuideLeadText>
        </GuideLeadCard>

        {guideSections.map((section) => (
          <GuideSection key={section.title}>
            <GuideSectionTitle>{section.title}</GuideSectionTitle>

            {section.paragraphs?.map((paragraph) => (
              <GuideParagraph key={paragraph}>{paragraph}</GuideParagraph>
            ))}

            {section.bullets ? (
              <GuideBulletList>
                {section.bullets.map((item) => (
                  <GuideBulletItem key={item}>{item}</GuideBulletItem>
                ))}
              </GuideBulletList>
            ) : null}

            {section.steps ? (
              <GuideSectionList>
                {section.steps.map((step, index) => (
                  <GuideStepCard key={step.title}>
                    <GuideStepIndex>{index + 1}</GuideStepIndex>
                    <GuideStepBody>
                      <GuideStepTitle>{step.title}</GuideStepTitle>
                      <GuideStepText>{step.detail}</GuideStepText>
                    </GuideStepBody>
                  </GuideStepCard>
                ))}
              </GuideSectionList>
            ) : null}
          </GuideSection>
        ))}
      </CardBody>
    </ReportCard>
  );
}
