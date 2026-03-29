import styled from 'styled-components';
import { MapIcon, SearchIcon } from '@/components/icons/AppIcons';
import EquipmentMap from '@/components/realtime/EquipmentMap';
import {
  CardBody,
  LegendDot,
  LegendItem,
  LegendRow,
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

interface MapReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function MapReportCard({ alarm, onAsk }: MapReportCardProps) {
  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            {/* 텍스트가 커진 만큼 아이콘 크기도 약간 증가 (18 -> 22) */}
            <MapIcon size={22} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <LargePanelTitle>설비 에러 위치</LargePanelTitle>
            <LargePanelSubTitle>{alarm.line}</LargePanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <LargeActionButton type="button" onClick={onAsk}>
          검색
          {/* 아이콘 크기 약간 증가 (14 -> 18) */}
          <SearchIcon size={18} /> 
        </LargeActionButton>
      </PanelHeader>

      <CardBody>
        <EquipmentMap points={alarm.mapNodes} />

        <LegendRow>
          <LargeLegendItem>
            <LegendDot $state="normal" /> 정상
          </LargeLegendItem>
          <LargeLegendItem>
            <LegendDot $state="warning" /> 주의
          </LargeLegendItem>
          <LargeLegendItem>
            <LegendDot $state="alert" /> 알람
          </LargeLegendItem>
        </LegendRow>
      </CardBody>
    </ReportCard>
  );
}

// --- Styled Components Overrides (글자 크기 강제 확대) ---

const LargePanelTitle = styled(PanelTitle)`
  font-size: 22px !important; /* 기존보다 큼직하게 */
  font-weight: 700 !important;
`;

const LargePanelSubTitle = styled(PanelSubTitle)`
  font-size: 18px !important;
`;

const LargeActionButton = styled(PanelActionButton)`
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 8px 16px !important; /* 글자가 커진 만큼 여백 추가 */
  gap: 6px !important;
`;

const LargeLegendItem = styled(LegendItem)`
  font-size: 16px !important;
  gap: 8px !important;
`;