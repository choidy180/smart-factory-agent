import { ArrowRightIcon, ChartIcon, SearchIcon } from '@/components/icons/AppIcons';
import SparkLine from '@/components/realtime/SparkLine';
import {
  CardBody,
  MetricPill,
  MetricRail,
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
  SearchStripText
} from '@/components/realtime/reportPrimitives';
import type { Alarm } from '@/types/alarm';

interface SensorReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function SensorReportCard({ alarm, onAsk }: SensorReportCardProps) {
  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            <ChartIcon size={18} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <PanelTitle>설비 상태</PanelTitle>
            <PanelSubTitle>{alarm.reason}</PanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <PanelActionButton type="button" onClick={onAsk}>
          질문하기
          <ArrowRightIcon size={14} />
        </PanelActionButton>
      </PanelHeader>

      <CardBody>
        <SparkLine data={alarm.trend} />

        <MetricRail>
          {alarm.metrics.map((metric) => (
            <MetricPill key={metric.label} $tone={metric.tone}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </MetricPill>
          ))}
        </MetricRail>

        <SearchStripButton type="button" onClick={onAsk}>
          <SearchStripText>
            <SearchIcon size={16} />
            설비 상태를 Agent로 상세 조회하기
          </SearchStripText>
          <SearchStripBadge>검색</SearchStripBadge>
        </SearchStripButton>
      </CardBody>
    </ReportCard>
  );
}
