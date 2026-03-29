import { HistoryIcon, SearchIcon } from '@/components/icons/AppIcons';
import {
  CardBody,
  HistorySummaryCard,
  HistorySummaryLabel,
  HistorySummaryText,
  PanelActionButton,
  PanelHeader,
  PanelIconWrap,
  PanelSubTitle,
  PanelTitle,
  PanelTitleGroup,
  PanelTitleTextGroup,
  ReportCard,
  SearchStripBadge,
  SearchStripButton,
  SearchStripText,
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineDot,
  TimelineItem,
  TimelineText,
  TimelineTitle
} from '@/components/realtime/reportPrimitives';
import type { Alarm } from '@/types/alarm';

interface HistoryReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function HistoryReportCard({ alarm, onAsk }: HistoryReportCardProps) {
  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            <HistoryIcon size={18} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <PanelTitle>고장 이력</PanelTitle>
            <PanelSubTitle>유사 패턴 재발 기록 및 조치 결과</PanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <PanelActionButton type="button" onClick={onAsk}>
          검색
          <SearchIcon size={14} />
        </PanelActionButton>
      </PanelHeader>

      <CardBody>
        <Timeline>
          {alarm.history.map((item) => (
            <TimelineItem key={item.date}>
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineText>{item.summary}</TimelineText>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <HistorySummaryCard>
          <HistorySummaryLabel>유사 사례 요약</HistorySummaryLabel>
          <HistorySummaryText>
            최근 {alarm.similarCases}건의 유사 사례 중 가장 높은 상관도를 가진 패턴은 {alarm.rootCauses[0]?.title}
            이며, 현장 점검 시작점을 해당 부품 기준으로 잡는 것이 유리합니다.
          </HistorySummaryText>
        </HistorySummaryCard>

        <SearchStripButton type="button" onClick={onAsk}>
          <SearchStripText>
            <SearchIcon size={16} />
            고장 이력을 Agent를 통해 상세 조회하기
          </SearchStripText>
          <SearchStripBadge>검색</SearchStripBadge>
        </SearchStripButton>
      </CardBody>
    </ReportCard>
  );
}
