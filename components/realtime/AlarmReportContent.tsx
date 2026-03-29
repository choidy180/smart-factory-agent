import styled from 'styled-components';
import {
  ArrowRightIcon,
  SearchIcon
} from '@/components/icons/AppIcons';
import DetailReportCard from '@/components/realtime/cards/DetailReportCard';
import GuideReportCard from '@/components/realtime/cards/GuideReportCard';
import HistoryReportCard from '@/components/realtime/cards/HistoryReportCard';
import MapReportCard from '@/components/realtime/cards/MapReportCard';
import ReferenceReportCard from '@/components/realtime/cards/ReferenceReportCard';
import SensorReportCard from '@/components/realtime/cards/SensorReportCard';
import { GridSlot, ReportGrid, SeverityTag, StatusDot } from '@/components/realtime/reportPrimitives';
import { TONE_CONFIG } from '@/components/realtime/realtime.constants';
import type { Alarm } from '@/types/alarm';

interface AlarmReportContentProps {
  alarm: Alarm;
  onAsk: (sectionLabel: string) => void;
}

export default function AlarmReportContent({ alarm, onAsk }: AlarmReportContentProps) {
  const tone = TONE_CONFIG[alarm.severity] ?? TONE_CONFIG.MEDIUM;

  return (
    <Content>
      <HeroCard $border={tone.border} $background={tone.soft}>
        <HeroText>
          <HeroEyebrow>
            <StatusDot $toneKey={alarm.severity} />
            선택된 알람 보고서
          </HeroEyebrow>
          <HeroTitle>{alarm.title}</HeroTitle>
          <HeroSummary>{alarm.summary}</HeroSummary>

          <HeroFacts>
            <HeroFact>
              <span>설비</span>
              <strong>{alarm.equipment}</strong>
            </HeroFact>
            <HeroFact>
              <span>발생 시각</span>
              <strong>{alarm.occurredAt}</strong>
            </HeroFact>
            <HeroFact>
              <span>감지 항목</span>
              <strong>{alarm.reason}</strong>
            </HeroFact>
            <HeroFact>
              <span>상태</span>
              <strong>{alarm.status}</strong>
            </HeroFact>
          </HeroFacts>
        </HeroText>

        <HeroAside>
          {/* 외부 컴포넌트인 SeverityTag의 글자 크기를 키우기 위해 스타일을 덮어씌웁니다 */}
          <LargeSeverityTag $toneKey={alarm.severity}>{alarm.severity}</LargeSeverityTag>

          <HeroActions>
            <HeroActionButton type="button" onClick={() => onAsk('전체 보고서')}>
              전체 질문하기
              <ArrowRightIcon size={18} />
            </HeroActionButton>
            <HeroActionButton type="button" onClick={() => onAsk('알람 상세')}>
              상세 검색
              <SearchIcon size={18} />
            </HeroActionButton>
          </HeroActions>

          <ChipRow>
            <Chip>{alarm.line}</Chip>
            <Chip>ETA {alarm.eta}</Chip>
            <Chip>유사 사례 {alarm.similarCases}건</Chip>
            <Chip>Confidence {alarm.confidence}%</Chip>
          </ChipRow>
        </HeroAside>
      </HeroCard>

      <MetaStrip>
        <MetaText>
          <StatusDot $toneKey={alarm.severity} />
          {alarm.title}
        </MetaText>

        <ChipRow>
          <Chip>{alarm.equipment}</Chip>
          <Chip>{alarm.occurredAt}</Chip>
          <Chip>{alarm.reason}</Chip>
          <Chip>{alarm.location}</Chip>
        </ChipRow>
      </MetaStrip>

      <ReportGrid>
        <GridSlot $desktopColumn="1" $desktopRow="1">
          <MapReportCard alarm={alarm} onAsk={() => onAsk('설비 에러 위치')} />
        </GridSlot>
        
        <GridSlot $desktopColumn="2" $desktopRow="1">
          <SensorReportCard alarm={alarm} onAsk={() => onAsk('설비 상태')} />
        </GridSlot>
        
        {/* 모바일에서 맨 위로 올라오도록 새로 만든 GuideSlot 적용 */}
        <GuideSlot $desktopColumn="3" $desktopRow="1 / span 2">
          <GuideReportCard alarm={alarm} onAsk={() => onAsk('조치 가이드')} />
        </GuideSlot>

        <GridSlot $desktopColumn="4" $desktopRow="1 / span 2">
          <ReferenceReportCard alarm={alarm} onAsk={() => onAsk('상세 레퍼런스')} />
        </GridSlot>

        <GridSlot $desktopColumn="1" $desktopRow="2">
          <DetailReportCard alarm={alarm} onAsk={() => onAsk('알람 상세')} />
        </GridSlot>

        <GridSlot $desktopColumn="2" $desktopRow="2">
          <HistoryReportCard alarm={alarm} onAsk={() => onAsk('고장 이력')} />
        </GridSlot>
      </ReportGrid>
    </Content>
  );
}

// --- Styled Components ---

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeroCard = styled.section<{ $border: string; $background: string }>`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: 18px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ $border }) => $border};
  background: linear-gradient(135deg, ${({ $background }) => $background} 0%, #ffffff 62%);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 18px;
  }
`;

const HeroText = styled.div`
  min-width: 0;
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 800;
`;

const HeroTitle = styled.h1`
  margin: 14px 0 10px;
  font-size: clamp(30px, 4vw, 42px);
  line-height: 1.18;
`;

const HeroSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 20px;
  line-height: 1.8;
`;

const HeroFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HeroFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.7);

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 18px;
    font-weight: 700;
  }

  strong {
    font-size: 18px;
    line-height: 1.5;
  }
`;

const HeroAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LargeSeverityTag = styled(SeverityTag)`
  font-size: 18px !important;
  padding: 6px 14px !important;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeroActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.panel};
  font-size: 16px;
  font-weight: 700;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const MetaStrip = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.panel};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MetaText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
  font-size: 20px;
  font-weight: 700;
`;

/* 핵심: 모바일 뷰에서 '조치 가이드'를 맨 위로 올리기 위한 오버라이드 컴포넌트 추가 */
const GuideSlot = styled(GridSlot)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: -1;
  }
`;