import styled from 'styled-components';
import {
  BoardSummaryBadge,
  BoardSummaryRow,
  BoardSummaryText,
  RowActionText,
  RowPlainText,
  RowTitle,
  SectionEyebrow,
  SectionHeader,
  SectionTitle,
  SectionTitleGroup,
  SeverityTag,
  StatusBadge,
  StatusDot,
  TableColumn,
  TableHeaderRow,
  TableRows
} from '@/components/realtime/alarmListStyles';
import { SEVERITY_LABELS, TONE_CONFIG } from '@/components/realtime/realtime.constants';
import type { Alarm, AlarmBoardSummary } from '@/types/alarm';

interface AlarmListSectionProps {
  alarms: Alarm[];
  summary: AlarmBoardSummary;
  selectedId: string;
  onSelectAlarm: (alarmId: string) => void;
}

export default function AlarmListSection({
  alarms,
  summary,
  selectedId,
  onSelectAlarm
}: AlarmListSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitleGroup>
          <SectionEyebrow>Today&apos;s Alarm</SectionEyebrow>
          <SectionTitle>오늘의 알람 리스트</SectionTitle>
        </SectionTitleGroup>

        <BoardSummaryRow>
          <BoardSummaryBadge>전체 {summary.total}건</BoardSummaryBadge>
          <BoardSummaryText>
            HIGH {summary.high} · MEDIUM {summary.medium} · LOW {summary.low}
          </BoardSummaryText>
        </BoardSummaryRow>
      </SectionHeader>

      <DesktopTable>
        <ScrollableTableBody>
          {/* 헤더를 스크롤 영역 안으로 이동시키고, 완전히 동일한 그리드를 적용한 Custom Header 사용 */}
          <StyledHeaderRow>
            <TableColumn $width="118px">상태</TableColumn>
            <TableColumn $width="minmax(260px, 1.4fr)">알람 내용</TableColumn>
            <TableColumn $width="220px">발생 시각</TableColumn>
            <TableColumn $width="180px">설비</TableColumn>
            <TableColumn $width="96px">심각도</TableColumn>
            <TableColumn $width="minmax(180px, 1fr)">감지 항목</TableColumn>
            <TableColumn $width="70px">선택</TableColumn>
          </StyledHeaderRow>

          <TableRows>
            {alarms.map((alarm) => {
              const active = selectedId === alarm.id;

              return (
                <RowButton
                  key={alarm.id}
                  type="button"
                  aria-pressed={active}
                  $active={active}
                  $toneKey={alarm.severity}
                  onClick={() => onSelectAlarm(alarm.id)}
                >
                  <TableColumn $width="118px">
                    <StatusBadge $toneKey={alarm.severity}>
                      <StatusDot $toneKey={alarm.severity} />
                      {active ? '열람중' : SEVERITY_LABELS[alarm.severity]}
                    </StatusBadge>
                  </TableColumn>

                  <TableColumn $width="minmax(260px, 1.4fr)">
                    <RowTitle>{alarm.title}</RowTitle>
                  </TableColumn>

                  <TableColumn $width="220px">
                    <RowPlainText>{alarm.occurredAt}</RowPlainText>
                  </TableColumn>

                  <TableColumn $width="180px">
                    <RowPlainText>{alarm.equipment}</RowPlainText>
                  </TableColumn>

                  <TableColumn $width="96px">
                    <SeverityTag $toneKey={alarm.severity}>{alarm.severity}</SeverityTag>
                  </TableColumn>

                  <TableColumn $width="minmax(180px, 1fr)">
                    <RowPlainText>{alarm.reason}</RowPlainText>
                  </TableColumn>

                  <TableColumn $width="70px">
                    <RowActionText>{active ? '선택됨' : '보기'}</RowActionText>
                  </TableColumn>
                </RowButton>
              );
            })}
          </TableRows>
        </ScrollableTableBody>
      </DesktopTable>

      <MobileRail>
        {alarms.map((alarm) => {
          const active = selectedId === alarm.id;

          return (
            <MobileCard
              key={alarm.id}
              type="button"
              aria-pressed={active}
              $active={active}
              $toneKey={alarm.severity}
              onClick={() => onSelectAlarm(alarm.id)}
            >
              <MobileCardTop>
                <StatusBadge $toneKey={alarm.severity}>
                  <StatusDot $toneKey={alarm.severity} />
                  {alarm.severity}
                </StatusBadge>
                <MobileCardTime>{alarm.timeLabel}</MobileCardTime>
              </MobileCardTop>

              <MobileCardTitle>{alarm.title}</MobileCardTitle>
              <MobileCardText>{alarm.reason}</MobileCardText>

              <MobileCardBottom>
                <MobileCardLine>{alarm.equipment}</MobileCardLine>
                <MobileCardState $active={active}>
                  {active ? '열람중' : '선택'}
                </MobileCardState>
              </MobileCardBottom>
            </MobileCard>
          );
        })}
      </MobileRail>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding: 16px;
  border: 4px solid ${({ theme }) => theme.colors.sidebarBg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 20px rgba(15, 27, 18, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-width: 2px;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;

const DesktopTable = styled.div`
  display: block;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ScrollableTableBody = styled.div`
  max-height: 200px; 
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

/* 핵심: 헤더 컴포넌트를 강제로 덮어씌워서 RowButton과 그리드/패딩을 똑같이 맞춤 */
const StyledHeaderRow = styled(TableHeaderRow)`
  display: grid !important;
  grid-template-columns: 118px minmax(260px, 1.4fr) 220px 180px 96px minmax(180px, 1fr) 70px !important;
  gap: 12px !important;
  width: 100% !important;
  padding: 16px !important; /* RowButton과 패딩 일치 */
  margin: 0 !important;
  
  /* 스크롤 시 헤더가 상단에 고정되도록 처리 */
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const RowButton = styled.button<{ $active: boolean; $toneKey: Alarm['severity'] }>`
  display: grid;
  grid-template-columns:
    118px minmax(260px, 1.4fr) 220px 180px 96px minmax(180px, 1fr) 70px;
  gap: 12px;
  width: 100%;
  min-height: 80px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}; /* 기존 border-top을 border-bottom으로 변경해 깔끔하게 정렬 */
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceSoft : 'transparent')};
  text-align: left;
  transition: background 0.2s ease;

  & * {
    font-size: 18px !important;
  }

  ${({ $active, $toneKey }) =>
    $active
      ? `box-shadow: inset 4px 0 0 ${(TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).dot};`
      : ''}

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceSoft};
  }
`;

const MobileRail = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.border};
      border-radius: 3px;
    }
  }
`;

const MobileCard = styled.button<{ $active: boolean; $toneKey: Alarm['severity'] }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 85vw;
  flex-shrink: 0;
  scroll-snap-align: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 5px solid ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).dot};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceSoft : theme.colors.surface)};
  text-align: left;
`;

const MobileCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MobileCardTime = styled.span`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 16px;
  font-weight: 700;
`;

const MobileCardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
`;

const MobileCardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  line-height: 1.6;
`;

const MobileCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MobileCardLine = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  font-weight: 600;
`;

const MobileCardState = styled.span<{ $active: boolean }>`
  color: ${({ $active, theme }) => ($active ? theme.colors.accentStrong : theme.colors.textSoft)};
  font-size: 16px;
  font-weight: 800;
`;