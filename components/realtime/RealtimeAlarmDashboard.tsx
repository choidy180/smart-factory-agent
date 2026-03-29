'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AlertIcon } from '@/components/icons/AppIcons';
import AlarmListSection from '@/components/realtime/AlarmListSection';
import AlarmReportContent from '@/components/realtime/AlarmReportContent';
import SearchAssistantSheet from '@/components/realtime/SearchAssistantSheet';
import { mockAlarms } from '@/data/mockAlarms';
import type { AlarmBoardSummary } from '@/types/alarm';

export default function RealtimeAlarmDashboard() {
  const [selectedId, setSelectedId] = useState(mockAlarms[0]?.id ?? '');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContext, setSheetContext] = useState('전체 보고서');

  const selectedAlarm = useMemo(() => {
    return mockAlarms.find((alarm) => alarm.id === selectedId) ?? mockAlarms[0] ?? null;
  }, [selectedId]);

  const summary = useMemo<AlarmBoardSummary>(() => {
    return mockAlarms.reduce(
      (accumulator, alarm) => {
        accumulator.total += 1;

        if (alarm.severity === 'HIGH') {
          accumulator.high += 1;
        }

        if (alarm.severity === 'MEDIUM') {
          accumulator.medium += 1;
        }

        if (alarm.severity === 'LOW') {
          accumulator.low += 1;
        }

        return accumulator;
      },
      {
        total: 0,
        high: 0,
        medium: 0,
        low: 0
      }
    );
  }, []);

  const openSheet = (sectionLabel: string) => {
    setSheetContext(sectionLabel);
    setSheetOpen(true);
  };

  return (
    <>
      <Page>
        <AlarmListSection
          alarms={mockAlarms}
          summary={summary}
          selectedId={selectedAlarm?.id ?? ''}
          onSelectAlarm={setSelectedId}
        />

        {selectedAlarm ? (
          <AlarmReportContent alarm={selectedAlarm} onAsk={openSheet} />
        ) : (
          <EmptyState>
            <EmptyIconWrap>
              <AlertIcon size={24} />
            </EmptyIconWrap>
            <EmptyTitle>알람을 선택하면 아래에 대응 보고서가 열립니다.</EmptyTitle>
            <EmptyText>
              상단 Today&apos;s Alarm 리스트에서 원하는 알람을 선택하면, 바로 아래에 보고서형 섹션이 표시됩니다.
            </EmptyText>
          </EmptyState>
        )}
      </Page>

      {selectedAlarm ? (
        <SearchAssistantSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          alarm={selectedAlarm}
          sectionLabel={sheetContext}
        />
      ) : null}
    </>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
  }
`;

const EmptyState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 48px 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.panel};
  text-align: center;
`;

const EmptyIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
`;

const EmptyTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
`;

const EmptyText = styled.p`
  margin: 0;
  max-width: 640px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;
