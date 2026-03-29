import styled, { css } from 'styled-components';
import type { AlarmMapNodeState, AlarmMetricTone, AlarmSeverity } from '@/types/alarm';
import {
  MAP_NODE_COLORS,
  METRIC_TONE_STYLE,
  TONE_CONFIG
} from '@/components/realtime/realtime.constants';

const toneSurfaceStyle = css<{ $toneKey: AlarmSeverity }>`
  ${({ $toneKey }) => {
    const tone = TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM;

    return css`
      background: ${tone.soft};
      color: ${tone.strong};
      border-color: ${tone.border};
    `;
  }}
`;

export const StatusDot = styled.span<{ $toneKey: AlarmSeverity }>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).dot};
  box-shadow: 0 0 0 4px
    ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).border};
  flex-shrink: 0;
`;

export const StatusBadge = styled.div<{ $toneKey: AlarmSeverity }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  ${toneSurfaceStyle}
`;

export const SeverityTag = styled.span<{ $toneKey: AlarmSeverity }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  ${toneSurfaceStyle}
`;

export const ReportGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const GridSlot = styled.div<{ $desktopColumn: string; $desktopRow?: string }>`
  grid-column: ${({ $desktopColumn }) => $desktopColumn};
  grid-row: ${({ $desktopRow = 'auto' }) => $desktopRow};
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: auto;
    grid-row: auto;
  }
`;

export const ReportCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.panel};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 18px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const PanelTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const PanelIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  flex-shrink: 0;
`;

export const PanelTitleTextGroup = styled.div`
  min-width: 0;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
`;

export const PanelSubTitle = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 18px;
  line-height: 1.5;
`;

export const PanelActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px 16px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LegendDot = styled.span<{ $state: AlarmMapNodeState }>`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${({ $state }) => MAP_NODE_COLORS[$state].dot};
  box-shadow: 0 0 0 4px ${({ $state }) => MAP_NODE_COLORS[$state].glow};
`;

export const MetricRail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const MetricPill = styled.div<{ $tone: AlarmMetricTone }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $tone }) => METRIC_TONE_STYLE[$tone].bg};
  color: ${({ $tone }) => METRIC_TONE_STYLE[$tone].text};

  span {
    font-size: 20px;
    font-weight: 700;
  }

  strong {
    font-size: 24px;
    line-height: 1;
  }
`;

export const SearchStripButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

export const SearchStripText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
`;

export const SearchStripBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 800;
`;

export const GuideLeadCard = styled.div`
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
`;

export const GuideLeadLabel = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

export const GuideLeadText = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const GuideSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const GuideSectionTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
`;

export const GuideParagraph = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export const GuideBulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const GuideBulletItem = styled.li`
  line-height: 1.7;
`;

export const GuideSectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const GuideStepCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceSoft};
`;

export const GuideStepIndex = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
`;

export const GuideStepBody = styled.div`
  min-width: 0;
`;

export const GuideStepTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const GuideStepText = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export const InfoFactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const InfoFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceSoft};

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 20px;
    font-weight: 700;
  }

  strong {
    font-size: 20px;
    line-height: 1.5;
  }
`;

export const TextBlock = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

export const BlockTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
`;

export const CauseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CauseItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CauseTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CauseTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const CauseScore = styled.div`
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 18px;
  font-weight: 800;
`;

export const CauseTrack = styled.div`
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  overflow: hidden;
`;

export const CauseTrackFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2f9e68 0%, #7acf9f 100%);
`;

export const CauseText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export const ActionChecklist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ActionChecklistItem = styled.li`
  line-height: 1.7;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 12px;
`;

export const TimelineDot = styled.span`
  width: 11px;
  height: 11px;
  margin-top: 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 0 4px rgba(47, 158, 104, 0.14);
  flex-shrink: 0;
`;

export const TimelineContent = styled.div`
  min-width: 0;
`;

export const TimelineDate = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 18px;
  font-weight: 700;
`;

export const TimelineTitle = styled.div`
  margin-top: 4px;
  font-size: 20px;
  font-weight: 700;
`;

export const TimelineText = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export const HistorySummaryCard = styled.div`
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
`;

export const HistorySummaryLabel = styled.div`
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

export const HistorySummaryText = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export const ReferenceHeroCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surfaceSoft} 0%,
    ${({ theme }) => theme.colors.accentSoft} 100%
  );
`;

export const ReferenceHeroLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(47, 158, 104, 0.14);
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 800;
`;

export const ReferenceHeroTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  line-height: 1.4;
`;

export const ReferenceHeroSubTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export const ReferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ReferenceListItem = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReferenceBullet = styled.span`
  width: 8px;
  height: 8px;
  margin-top: 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

export const ReferenceTextGroup = styled.div`
  min-width: 0;
`;

export const ReferenceListTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const ReferenceListText = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;
