import { AlertIcon, ArrowRightIcon } from '@/components/icons/AppIcons';
import {
  ActionChecklist,
  ActionChecklistItem,
  BlockTitle,
  CardBody,
  CauseItem,
  CauseList,
  CauseScore,
  CauseText,
  CauseTitle,
  CauseTop,
  CauseTrack,
  CauseTrackFill,
  InfoFact,
  InfoFactGrid,
  PanelActionButton,
  PanelHeader,
  PanelIconWrap,
  PanelSubTitle,
  PanelTitle,
  PanelTitleGroup,
  PanelTitleTextGroup,
  ReportCard,
  TextBlock
} from '@/components/realtime/reportPrimitives';
import type { Alarm } from '@/types/alarm';

interface DetailReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function DetailReportCard({ alarm, onAsk }: DetailReportCardProps) {
  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            <AlertIcon size={18} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <PanelTitle>알람 상세</PanelTitle>
            <PanelSubTitle>고장 현상 상세 내용 · 원인 후보 · 즉시 조치</PanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <PanelActionButton type="button" onClick={onAsk}>
          질문하기
          <ArrowRightIcon size={14} />
        </PanelActionButton>
      </PanelHeader>

      <CardBody>
        <InfoFactGrid>
          <InfoFact>
            <span>설비명</span>
            <strong>{alarm.equipment}</strong>
          </InfoFact>
          <InfoFact>
            <span>발생 시각</span>
            <strong>{alarm.occurredAt}</strong>
          </InfoFact>
          <InfoFact>
            <span>상태</span>
            <strong>{alarm.status}</strong>
          </InfoFact>
          <InfoFact>
            <span>위치</span>
            <strong>{alarm.location}</strong>
          </InfoFact>
        </InfoFactGrid>

        <TextBlock>{alarm.summary}</TextBlock>

        <BlockTitle>원인 후보 (AI 추정)</BlockTitle>
        <CauseList>
          {alarm.rootCauses.map((cause) => (
            <CauseItem key={cause.title}>
              <CauseTop>
                <CauseTitle>{cause.title}</CauseTitle>
                <CauseScore>{cause.score}%</CauseScore>
              </CauseTop>
              <CauseTrack>
                <CauseTrackFill style={{ width: `${cause.score}%` }} />
              </CauseTrack>
              <CauseText>{cause.detail}</CauseText>
            </CauseItem>
          ))}
        </CauseList>

        <BlockTitle>즉시 조치</BlockTitle>
        <ActionChecklist>
          {alarm.immediateActions.map((item) => (
            <ActionChecklistItem key={item}>{item}</ActionChecklistItem>
          ))}
        </ActionChecklist>
      </CardBody>
    </ReportCard>
  );
}
