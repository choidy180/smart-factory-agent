// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  AlertIcon,
  ArrowRightIcon,
  BoltIcon,
  ChartIcon,
  DocumentIcon,
  HistoryIcon,
  MapIcon,
  SearchIcon,
  SparkIcon
} from '@/components/icons/AppIcons';
import SearchAssistantSheet from '@/components/realtime/SearchAssistantSheet';
import { mockAlarms } from '@/data/mockAlarms';

const TONE_CONFIG = {
  HIGH: {
    dot: '#d54f6a',
    soft: '#ffe8ee',
    strong: '#af2f49',
    border: 'rgba(213, 79, 106, 0.24)'
  },
  MEDIUM: {
    dot: '#f0a63a',
    soft: '#fff2de',
    strong: '#b97712',
    border: 'rgba(240, 166, 58, 0.24)'
  },
  LOW: {
    dot: '#5d86ff',
    soft: '#edf2ff',
    strong: '#3d63d6',
    border: 'rgba(93, 134, 255, 0.24)'
  }
};

const METRIC_TONE_STYLE = {
  critical: {
    bg: '#ffe8ee',
    text: '#af2f49'
  },
  warning: {
    bg: '#fff2de',
    text: '#b97712'
  },
  info: {
    bg: '#edf2ff',
    text: '#3d63d6'
  }
};

const plantBlocks = [
  {
    label: '적재',
    left: '6%',
    top: '16%',
    width: '15%',
    height: '24%'
  },
  {
    label: '정렬',
    left: '24%',
    top: '12%',
    width: '16%',
    height: '20%'
  },
  {
    label: '가이드',
    left: '26%',
    top: '44%',
    width: '18%',
    height: '26%'
  },
  {
    label: '상하축',
    left: '46%',
    top: '12%',
    width: '18%',
    height: '24%'
  },
  {
    label: '서보',
    left: '48%',
    top: '46%',
    width: '16%',
    height: '24%'
  },
  {
    label: '취출',
    left: '68%',
    top: '22%',
    width: '18%',
    height: '28%'
  },
  {
    label: '배출',
    left: '78%',
    top: '58%',
    width: '14%',
    height: '18%'
  }
];

const severityLabels = {
  HIGH: '긴급',
  MEDIUM: '주의',
  LOW: '관찰'
};

export default function RealtimeAlarmDashboard() {
  const [selectedId, setSelectedId] = useState(mockAlarms[0]?.id ?? null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContext, setSheetContext] = useState('전체 보고서');

  const selectedAlarm = useMemo(() => {
    return mockAlarms.find((alarm) => alarm.id === selectedId) ?? mockAlarms[0] ?? null;
  }, [selectedId]);

  const summary = useMemo(() => {
    const high = mockAlarms.filter((alarm) => alarm.severity === 'HIGH').length;
    const medium = mockAlarms.filter((alarm) => alarm.severity === 'MEDIUM').length;
    const low = mockAlarms.filter((alarm) => alarm.severity === 'LOW').length;

    return {
      total: mockAlarms.length,
      high,
      medium,
      low
    };
  }, []);

  const handleAlarmClick = (alarmId) => {
    setSelectedId(alarmId);
  };

  const openSheet = (sectionLabel) => {
    setSheetContext(sectionLabel);
    setSheetOpen(true);
  };

  return (
    <>
      <Page>
        <AlarmSection>
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

          <DesktopAlarmTable>
            <AlarmTableHead>
              <TableColStatus>상태</TableColStatus>
              <TableColTitle>알람 내용</TableColTitle>
              <TableColTime>발생 시각</TableColTime>
              <TableColEquipment>설비</TableColEquipment>
              <TableColSeverity>심각도</TableColSeverity>
              <TableColReason>감지 항목</TableColReason>
              <TableColAction>선택</TableColAction>
            </AlarmTableHead>

            <AlarmRows>
              {mockAlarms.map((alarm) => {
                const active = alarm.id === selectedId;

                return (
                  <AlarmRowButton
                    key={alarm.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleAlarmClick(alarm.id)}
                    $active={active}
                    $toneKey={alarm.severity}
                  >
                    <TableColStatus>
                      <StatusBadge $toneKey={alarm.severity}>
                        <StatusDot $toneKey={alarm.severity} />
                        {active ? '열람중' : severityLabels[alarm.severity]}
                      </StatusBadge>
                    </TableColStatus>

                    <TableColTitle>
                      <RowTitle>{alarm.title}</RowTitle>
                    </TableColTitle>

                    <TableColTime>
                      <RowPlainText>{alarm.occurredAt}</RowPlainText>
                    </TableColTime>

                    <TableColEquipment>
                      <RowPlainText>{alarm.equipment}</RowPlainText>
                    </TableColEquipment>

                    <TableColSeverity>
                      <SeverityTag $toneKey={alarm.severity}>{alarm.severity}</SeverityTag>
                    </TableColSeverity>

                    <TableColReason>
                      <RowPlainText>{alarm.reason}</RowPlainText>
                    </TableColReason>

                    <TableColAction>
                      <RowActionText>{active ? '선택됨' : '보기'}</RowActionText>
                    </TableColAction>
                  </AlarmRowButton>
                );
              })}
            </AlarmRows>
          </DesktopAlarmTable>

          <MobileAlarmRail>
            {mockAlarms.map((alarm) => {
              const active = alarm.id === selectedId;

              return (
                <MobileAlarmCard
                  key={alarm.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleAlarmClick(alarm.id)}
                  $active={active}
                  $toneKey={alarm.severity}
                >
                  <MobileAlarmTop>
                    <StatusBadge $toneKey={alarm.severity}>
                      <StatusDot $toneKey={alarm.severity} />
                      {alarm.severity}
                    </StatusBadge>
                    <MobileAlarmTime>{alarm.timeLabel}</MobileAlarmTime>
                  </MobileAlarmTop>

                  <MobileAlarmTitle>{alarm.title}</MobileAlarmTitle>
                  <MobileAlarmText>{alarm.reason}</MobileAlarmText>

                  <MobileAlarmBottom>
                    <MobileAlarmLine>{alarm.equipment}</MobileAlarmLine>
                    <MobileAlarmState $active={active}>
                      {active ? '열람중' : '선택'}
                    </MobileAlarmState>
                  </MobileAlarmBottom>
                </MobileAlarmCard>
              );
            })}
          </MobileAlarmRail>
        </AlarmSection>

        {selectedAlarm ? (
          <ReportContent key={selectedAlarm.id}>
            <ReportHeroCard $toneKey={selectedAlarm.severity}>
              <ReportHeroText>
                <ReportHeroEyebrow>
                  <StatusDot $toneKey={selectedAlarm.severity} />
                  선택된 알람 보고서
                </ReportHeroEyebrow>
                <ReportHeroTitle>{selectedAlarm.title}</ReportHeroTitle>
                <ReportHeroSummary>{selectedAlarm.summary}</ReportHeroSummary>

                <ReportHeroFactRow>
                  <ReportHeroFact>
                    <span>설비</span>
                    <strong>{selectedAlarm.equipment}</strong>
                  </ReportHeroFact>
                  <ReportHeroFact>
                    <span>발생 시각</span>
                    <strong>{selectedAlarm.occurredAt}</strong>
                  </ReportHeroFact>
                  <ReportHeroFact>
                    <span>감지 항목</span>
                    <strong>{selectedAlarm.reason}</strong>
                  </ReportHeroFact>
                  <ReportHeroFact>
                    <span>상태</span>
                    <strong>{selectedAlarm.status}</strong>
                  </ReportHeroFact>
                </ReportHeroFactRow>
              </ReportHeroText>

              <ReportHeroAside>
                <SeverityTag $toneKey={selectedAlarm.severity}>{selectedAlarm.severity}</SeverityTag>

                <ReportHeroActionRow>
                  <ReportHeroActionButton
                    type="button"
                    onClick={() => openSheet('전체 보고서')}
                  >
                    전체 질문하기
                    <ArrowRightIcon size={15} />
                  </ReportHeroActionButton>
                  <ReportHeroActionButton
                    type="button"
                    onClick={() => openSheet('알람 상세')}
                  >
                    상세 검색
                    <SearchIcon size={15} />
                  </ReportHeroActionButton>
                </ReportHeroActionRow>

                <SelectedChipRow>
                  <SelectedChip>{selectedAlarm.line}</SelectedChip>
                  <SelectedChip>ETA {selectedAlarm.eta}</SelectedChip>
                  <SelectedChip>유사 사례 {selectedAlarm.similarCases}건</SelectedChip>
                  <SelectedChip>Confidence {selectedAlarm.confidence}%</SelectedChip>
                </SelectedChipRow>
              </ReportHeroAside>
            </ReportHeroCard>

            <ReportMetaStrip>
              <ReportMetaText>
                <StatusDot $toneKey={selectedAlarm.severity} />
                {selectedAlarm.title}
              </ReportMetaText>

              <SelectedChipRow>
                <SelectedChip>{selectedAlarm.equipment}</SelectedChip>
                <SelectedChip>{selectedAlarm.occurredAt}</SelectedChip>
                <SelectedChip>{selectedAlarm.reason}</SelectedChip>
                <SelectedChip>{selectedAlarm.location}</SelectedChip>
              </SelectedChipRow>
            </ReportMetaStrip>

            <DesktopReportGrid>
              <MapReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('설비 에러 위치')}
              />
              <SensorReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('설비 상태')}
              />
              <GuideReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('조치 가이드')}
              />
              <ReferenceReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('상세 레퍼런스')}
              />
              <DetailReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('알람 상세')}
              />
              <HistoryReportCard
                alarm={selectedAlarm}
                onAsk={() => openSheet('고장 이력')}
              />
            </DesktopReportGrid>

            <MobileReportStack>
              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <MapIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>설비 에러 위치</PanelTitle>
                      <PanelSubTitle>{selectedAlarm.line}</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('설비 에러 위치')}
                  >
                    검색
                    <SearchIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <EquipmentMap points={selectedAlarm.mapNodes} compact />
                <LegendRow>
                  <LegendItem>
                    <LegendDot $state="normal" />
                    정상
                  </LegendItem>
                  <LegendItem>
                    <LegendDot $state="warning" />
                    주의
                  </LegendItem>
                  <LegendItem>
                    <LegendDot $state="alert" />
                    알람
                  </LegendItem>
                </LegendRow>
              </MobilePanel>

              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <ChartIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>설비 상태</PanelTitle>
                      <PanelSubTitle>{selectedAlarm.reason}</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('설비 상태')}
                  >
                    질문하기
                    <ArrowRightIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <ChartWrap>
                  <SparkLine data={selectedAlarm.trend} />
                </ChartWrap>

                <MetricRail>
                  {selectedAlarm.metrics.map((metric) => (
                    <MetricPill key={metric.label} $tone={metric.tone}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </MetricPill>
                  ))}
                </MetricRail>

                <SearchStripButton
                  type="button"
                  onClick={() => openSheet('설비 상태')}
                >
                  <SearchStripText>
                    <SearchIcon size={16} />
                    설비 상태를 Agent로 상세 조회하세요
                  </SearchStripText>
                  <SearchStripBadge>검색</SearchStripBadge>
                </SearchStripButton>
              </MobilePanel>

              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <BoltIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>조치 가이드</PanelTitle>
                      <PanelSubTitle>현장 복구 순서 요약</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('조치 가이드')}
                  >
                    질문하기
                    <ArrowRightIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <GuideSectionList>
                  {selectedAlarm.guideSteps.map((step, index) => (
                    <GuideStepCard key={step.title}>
                      <GuideStepIndex>{index + 1}</GuideStepIndex>
                      <GuideStepBody>
                        <GuideStepTitle>{step.title}</GuideStepTitle>
                        <GuideStepText>{step.detail}</GuideStepText>
                      </GuideStepBody>
                    </GuideStepCard>
                  ))}
                </GuideSectionList>
              </MobilePanel>

              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <AlertIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>알람 상세</PanelTitle>
                      <PanelSubTitle>원인 후보와 즉시 조치</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('알람 상세')}
                  >
                    질문하기
                    <ArrowRightIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <InfoFactGrid>
                  <InfoFact>
                    <span>설비명</span>
                    <strong>{selectedAlarm.equipment}</strong>
                  </InfoFact>
                  <InfoFact>
                    <span>상태</span>
                    <strong>{selectedAlarm.status}</strong>
                  </InfoFact>
                  <InfoFact>
                    <span>ETA</span>
                    <strong>{selectedAlarm.eta}</strong>
                  </InfoFact>
                  <InfoFact>
                    <span>유사 사례</span>
                    <strong>{selectedAlarm.similarCases}건</strong>
                  </InfoFact>
                </InfoFactGrid>

                <TextBlock>{selectedAlarm.summary}</TextBlock>

                <CauseList>
                  {selectedAlarm.rootCauses.map((cause) => (
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
              </MobilePanel>

              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <HistoryIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>고장 이력</PanelTitle>
                      <PanelSubTitle>유사 사례와 과거 조치</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('고장 이력')}
                  >
                    검색
                    <SearchIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <Timeline>
                  {selectedAlarm.history.map((item) => (
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

                <SearchStripButton
                  type="button"
                  onClick={() => openSheet('고장 이력')}
                >
                  <SearchStripText>
                    <SearchIcon size={16} />
                    고장 이력을 Agent로 다시 질문하기
                  </SearchStripText>
                  <SearchStripBadge>검색</SearchStripBadge>
                </SearchStripButton>
              </MobilePanel>

              <MobilePanel>
                <PanelHeader>
                  <PanelTitleGroup>
                    <PanelIcon>
                      <DocumentIcon size={16} />
                    </PanelIcon>
                    <div>
                      <PanelTitle>상세 레퍼런스</PanelTitle>
                      <PanelSubTitle>유사 문서와 점검 기준</PanelSubTitle>
                    </div>
                  </PanelTitleGroup>

                  <InlineActionButton
                    type="button"
                    onClick={() => openSheet('상세 레퍼런스')}
                  >
                    검색
                    <SearchIcon size={14} />
                  </InlineActionButton>
                </PanelHeader>

                <ReferenceHeroCard>
                  <ReferenceHeroLabel>{selectedAlarm.references[0].category}</ReferenceHeroLabel>
                  <ReferenceHeroTitle>{selectedAlarm.references[0].title}</ReferenceHeroTitle>
                  <ReferenceHeroSubTitle>{selectedAlarm.references[0].subtitle}</ReferenceHeroSubTitle>
                </ReferenceHeroCard>

                <ReferenceList>
                  {selectedAlarm.references.map((reference) => (
                    <ReferenceListItem key={reference.title}>
                      <ReferenceBullet />
                      <ReferenceTextGroup>
                        <ReferenceListTitle>{reference.title}</ReferenceListTitle>
                        <ReferenceListText>{reference.summary}</ReferenceListText>
                      </ReferenceTextGroup>
                    </ReferenceListItem>
                  ))}
                </ReferenceList>
              </MobilePanel>
            </MobileReportStack>
          </ReportContent>
        ) : (
          <EmptyState>
            <EmptyIconWrap>
              <AlertIcon size={24} />
            </EmptyIconWrap>
            <EmptyTitle>알람을 선택하면 아래에 대응 보고서가 열립니다.</EmptyTitle>
            <EmptyText>
              상단 Today&apos;s Alarm 리스트에서 원하는 알람을 선택하면, 바로 아래에 이미지와 같은
              보고서형 섹션이 표시됩니다.
            </EmptyText>
          </EmptyState>
        )}
      </Page>

      <SearchAssistantSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        alarm={selectedAlarm ?? mockAlarms[0]}
        sectionLabel={sheetContext}
      />
    </>
  );
}


function MapReportCard({ alarm, onAsk }) {
  return (
    <DesktopPanel style={{ gridColumn: '1', gridRow: '1' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <MapIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>설비 에러 위치</PanelTitle>
            <PanelSubTitle>{alarm.line}</PanelSubTitle>
          </div>
        </PanelTitleGroup>

        <InlineActionButton
          type="button"
          onClick={onAsk}
        >
          검색
          <SearchIcon size={14} />
        </InlineActionButton>
      </PanelHeader>

      <EquipmentMap points={alarm.mapNodes} />

      <LegendRow>
        <LegendItem>
          <LegendDot $state="normal" />
          정상
        </LegendItem>
        <LegendItem>
          <LegendDot $state="warning" />
          주의
        </LegendItem>
        <LegendItem>
          <LegendDot $state="alert" />
          알람
        </LegendItem>
      </LegendRow>
    </DesktopPanel>
  );
}

function SensorReportCard({ alarm, onAsk }) {
  return (
    <DesktopPanel style={{ gridColumn: '2', gridRow: '1' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <ChartIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>설비 상태</PanelTitle>
            <PanelSubTitle>{alarm.reason}</PanelSubTitle>
          </div>
        </PanelTitleGroup>
      </PanelHeader>

      <ChartWrap>
        <SparkLine data={alarm.trend} />
      </ChartWrap>

      <MetricRail>
        {alarm.metrics.map((metric) => (
          <MetricPill key={metric.label} $tone={metric.tone}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </MetricPill>
        ))}
      </MetricRail>

      <SearchStripButton
        type="button"
        onClick={onAsk}
      >
        <SearchStripText>
          <SearchIcon size={16} />
          설비 상태를 Agent로 상세 조회하기
        </SearchStripText>
        <SearchStripBadge>검색</SearchStripBadge>
      </SearchStripButton>
    </DesktopPanel>
  );
}

function GuideReportCard({ alarm, onAsk }) {
  const guideSections = buildGuideSections(alarm);

  return (
    <DesktopPanel style={{ gridColumn: '3', gridRow: '1 / span 2' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <BoltIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>조치 가이드</PanelTitle>
            <PanelSubTitle>복구 순서 · 우선 점검 항목 · 참고 메모</PanelSubTitle>
          </div>
        </PanelTitleGroup>

        <InlineActionButton
          type="button"
          onClick={onAsk}
        >
          질문하기
          <ArrowRightIcon size={14} />
        </InlineActionButton>
      </PanelHeader>

      <ScrollBody>
        <GuideLeadCard>
          <GuideLeadLabel>초기 판단</GuideLeadLabel>
          <GuideLeadText>{alarm.aiSummary}</GuideLeadText>
        </GuideLeadCard>

        <GuideDocument>
          {guideSections.map((section) => (
            <GuideDocumentSection key={section.title}>
              <GuideDocumentTitle>{section.title}</GuideDocumentTitle>

              {section.paragraphs?.map((paragraph) => (
                <GuideParagraph key={paragraph}>{paragraph}</GuideParagraph>
              ))}

              {section.bullets?.length ? (
                <GuideBulletList>
                  {section.bullets.map((item) => (
                    <GuideBulletItem key={item}>{item}</GuideBulletItem>
                  ))}
                </GuideBulletList>
              ) : null}

              {section.steps?.length ? (
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
            </GuideDocumentSection>
          ))}
        </GuideDocument>
      </ScrollBody>
    </DesktopPanel>
  );
}

function ReferenceReportCard({ alarm, onAsk }) {
  const paragraphs = buildReferenceParagraphs(alarm);

  return (
    <DesktopPanel style={{ gridColumn: '4', gridRow: '1 / span 2' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <DocumentIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>상세 레퍼런스</PanelTitle>
            <PanelSubTitle>표준 문서 · 유사 케이스 · 점검 매뉴얼</PanelSubTitle>
          </div>
        </PanelTitleGroup>

        <InlineActionButton
          type="button"
          onClick={onAsk}
        >
          검색
          <SearchIcon size={14} />
        </InlineActionButton>
      </PanelHeader>

      <ReferenceHeroCard>
        <ReferenceHeroGlow />
        <ReferenceHeroLabel>{alarm.references[0].category}</ReferenceHeroLabel>
        <ReferenceHeroTitle>{alarm.references[0].title}</ReferenceHeroTitle>
        <ReferenceHeroSubTitle>{alarm.references[0].subtitle}</ReferenceHeroSubTitle>
      </ReferenceHeroCard>

      <ScrollBody>
        <ReferencePaper>
          {paragraphs.map((paragraph, index) => (
            <ReferenceParagraph key={`${paragraph}-${index}`}>{paragraph}</ReferenceParagraph>
          ))}
        </ReferencePaper>

        <ReferenceList>
          {alarm.references.slice(1).map((reference) => (
            <ReferenceListItem key={reference.title}>
              <ReferenceBullet />
              <ReferenceTextGroup>
                <ReferenceListTitle>{reference.title}</ReferenceListTitle>
                <ReferenceListText>{reference.summary}</ReferenceListText>
              </ReferenceTextGroup>
            </ReferenceListItem>
          ))}
        </ReferenceList>
      </ScrollBody>
    </DesktopPanel>
  );
}

function DetailReportCard({ alarm, onAsk }) {
  return (
    <DesktopPanel style={{ gridColumn: '1', gridRow: '2' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <AlertIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>알람 상세</PanelTitle>
            <PanelSubTitle>고장 현상 상세 내용 · 원인 후보 · 즉시 조치</PanelSubTitle>
          </div>
        </PanelTitleGroup>

        <InlineActionButton
          type="button"
          onClick={onAsk}
        >
          질문하기
          <ArrowRightIcon size={14} />
        </InlineActionButton>
      </PanelHeader>

      <ScrollBody>
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
      </ScrollBody>
    </DesktopPanel>
  );
}

function HistoryReportCard({ alarm, onAsk }) {
  return (
    <DesktopPanel style={{ gridColumn: '2', gridRow: '2' }}>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIcon>
            <HistoryIcon size={18} />
          </PanelIcon>
          <div>
            <PanelTitle>고장 이력</PanelTitle>
            <PanelSubTitle>유사 패턴 재발 기록 및 조치 결과</PanelSubTitle>
          </div>
        </PanelTitleGroup>
      </PanelHeader>

      <ScrollBody>
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
            최근 {alarm.similarCases}건의 유사 사례 중 가장 높은 상관도를 가진 패턴은
            {` ${alarm.rootCauses[0].title}`}이며, 현장 점검 시작점을 해당 부품 기준으로 잡는 것이
            유리합니다.
          </HistorySummaryText>
        </HistorySummaryCard>
      </ScrollBody>

      <SearchStripButton
        type="button"
        onClick={onAsk}
      >
        <SearchStripText>
          <SearchIcon size={16} />
          고장 이력을 Agent를 통해 상세 조회하기
        </SearchStripText>
        <SearchStripBadge>검색</SearchStripBadge>
      </SearchStripButton>
    </DesktopPanel>
  );
}

function EquipmentMap({ points, compact = false }) {
  const focusPoint = points.find((point) => point.state === 'alert') ?? points[0];

  return (
    <MapSurface $compact={compact}>
      <MapGridOverlay />

      {plantBlocks.map((block) => (
        <MachineBlock
          key={block.label}
          $compact={compact}
          style={{
            left: block.left,
            top: block.top,
            width: block.width,
            height: block.height
          }}
        >
          {block.label}
        </MachineBlock>
      ))}

      {points.map((point) => (
        <MapPoint
          key={point.label}
          $state={point.state}
          $compact={compact}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`
          }}
        >
          <span />
          {!compact ? <MapPointLabel>{point.label}</MapPointLabel> : null}
        </MapPoint>
      ))}

      <FocusPulse
        style={{
          left: `${focusPoint.x}%`,
          top: `${focusPoint.y}%`
        }}
      />
    </MapSurface>
  );
}

function SparkLine({ data }) {
  const width = 640;
  const height = 210;
  const padding = 18;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;
  const lastPoint = data[data.length - 1];
  const lastX = width - padding;
  const lastY = height - padding - ((lastPoint - min) / range) * (height - padding * 2);

  return (
    <ChartSvg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1={padding} y1={34} x2={width - padding} y2={34} />
      <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} />
      <line x1={padding} y1={height - 34} x2={width - padding} y2={height - 34} />
      <polygon points={areaPoints} />
      <polyline points={points} />
      <circle cx={lastX} cy={lastY} r="5.5" />
    </ChartSvg>
  );
}

function buildGuideSections(alarm) {
  return [
    {
      title: '1. 고장 현상 정리',
      paragraphs: [
        `${alarm.equipment}에서 ${alarm.reason} 기준의 이상이 감지되었습니다.`,
        `${alarm.summary}`,
        `Agent 1차 판단 결과는 다음과 같습니다. ${alarm.aiSummary}`
      ]
    },
    {
      title: '2. 즉시 조치 우선순위',
      bullets: alarm.immediateActions
    },
    {
      title: '3. 현장 복구 순서',
      steps: alarm.guideSteps
    },
    {
      title: '4. 우선 확인 원인 후보',
      bullets: alarm.rootCauses.map((cause) => {
        return `${cause.title} (${cause.score}%) · ${cause.detail}`;
      })
    }
  ];
}

function buildReferenceParagraphs(alarm) {
  return [
    `${alarm.references[0].title} / ${alarm.references[0].subtitle}`,
    `연관 설비: ${alarm.equipment} · 위치: ${alarm.location}`,
    `현재 알람은 ${alarm.reason} 신호를 기준으로 감지되었으며, 우선 조치 단계에서 ${alarm.rootCauses[0].title} 확인이 권장됩니다.`,
    `동일 계열 설비에서 누적된 유사 사례는 ${alarm.similarCases}건이며, 가장 빈번한 조치 항목은 ${alarm.immediateActions[0]}`,
    `현장 복구 시에는 ${alarm.guideSteps[0].title} 이후 ${alarm.guideSteps[1].title} 순으로 점검을 진행하는 절차가 권장됩니다.`
  ];
}

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
  }

  70% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
`;

const toneBadgeStyle = css`
  ${({ $toneKey }) => {
    const tone = TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM;

    return css`
      background: ${tone.soft};
      color: ${tone.strong};
      border-color: ${tone.border};
    `;
  }}
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 10px 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
    padding: 12px 12px 22px;
  }
`;

const PageHeader = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 18px;
  padding: 28px;
  border-radius: 0 0 28px 28px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceSoft} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 22px 18px;
    border-radius: ${({ theme }) => theme.radius.xl};
  }
`;

const HeaderCopy = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeaderEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const HeaderTitle = styled.h1`
  margin: 16px 0 10px;
  font-size: clamp(30px, 4vw, 42px);
  line-height: 1.1;
`;

const HeaderDescription = styled.p`
  margin: 0;
  max-width: 880px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 15px;
  line-height: 1.7;
`;

const HeaderMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HeaderMetric = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-height: 124px;
  padding: 20px 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.9);
  box-shadow: ${({ theme }) => theme.shadows.panel};
`;

const HeaderMetricLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeaderMetricValue = styled.div`
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const HeaderMetricHint = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;

const AlarmSection = styled.section`
  padding: 10px 12px 12px;
  border: 4px solid ${({ theme }) => theme.colors.sidebarBg};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 20px rgba(15, 27, 18, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
    border-width: 2px;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SectionEyebrow = styled.div`
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: none;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
`;

const SectionNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;

const BoardSummaryRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const BoardSummaryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 800;
`;

const BoardSummaryText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const ReportContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReportHeroCard = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: 18px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).border};
  background: linear-gradient(
    135deg,
    ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).soft} 0%,
    #ffffff 62%
  );
  box-shadow: ${({ theme }) => theme.shadows.panel};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 16px;
  }
`;

const ReportHeroText = styled.div`
  min-width: 0;
`;

const ReportHeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const ReportHeroTitle = styled.h2`
  margin: 14px 0 8px;
  font-size: clamp(24px, 2.4vw, 32px);
  line-height: 1.18;
`;

const ReportHeroSummary = styled.p`
  margin: 0;
  max-width: 980px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 15px;
  line-height: 1.75;
`;

const ReportHeroFactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ReportHeroFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 78px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid ${({ theme }) => theme.colors.border};

  span {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  strong {
    font-size: 15px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ReportHeroAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const ReportHeroActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ReportHeroActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.92);
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadows.panel};
`;

const ReportMetaStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 4px 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ReportMetaText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 800;
`;

const SelectedChipRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`;

const SelectedChip = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const DesktopAlarmTable = styled.div`
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const AlarmTableHead = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(300px, 2.2fr) 180px 170px 118px 1.2fr 88px;
  gap: 10px;
  padding: 8px 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const AlarmRows = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const AlarmRowButton = styled.button`
  display: grid;
  grid-template-columns: 112px minmax(300px, 2.2fr) 180px 170px 118px 1.2fr 88px;
  gap: 10px;
  align-items: center;
  padding: 12px 10px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceSoft};
  }

  ${({ $active, $toneKey }) => {
    if (!$active) {
      return '';
    }

    const tone = TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM;

    return css`
      background: linear-gradient(90deg, ${tone.soft} 0%, #ffffff 84%);
      box-shadow: inset 4px 0 0 ${tone.dot};
    `;
  }}
`;

const TableCell = styled.div`
  min-width: 0;
`;

const TableColStatus = styled(TableCell)``;
const TableColTitle = styled(TableCell)``;
const TableColTime = styled(TableCell)``;
const TableColEquipment = styled(TableCell)``;
const TableColSeverity = styled(TableCell)``;
const TableColReason = styled(TableCell)``;
const TableColAction = styled(TableCell)`
  display: flex;
  justify-content: flex-end;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  ${toneBadgeStyle}
`;

const StatusDot = styled.span`
  display: inline-flex;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: ${({ $toneKey }) => (TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM).dot};
  flex-shrink: 0;
`;

const RowTitle = styled.div`
  font-size: 15px;
  font-weight: 800;
  line-height: 1.35;
`;

const RowSummary = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.55;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowPlainText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

const RowSubText = styled.div`
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 12px;
`;

const SeverityTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 800;
  ${toneBadgeStyle}
`;

const RowActionText = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 8px 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 700;
`;

const MobileAlarmRail = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 2px;
  }
`;

const MobileAlarmCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 270px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  text-align: left;
  box-shadow: ${({ theme }) => theme.shadows.panel};

  ${({ $active, $toneKey }) => {
    if (!$active) {
      return '';
    }

    const tone = TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM;

    return css`
      border-color: ${tone.border};
      background: linear-gradient(135deg, ${tone.soft} 0%, #ffffff 88%);
    `;
  }}
`;

const MobileAlarmTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const MobileAlarmTime = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const MobileAlarmTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;

const MobileAlarmText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;

const MobileAlarmBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MobileAlarmLine = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 12px;
`;

const MobileAlarmState = styled.div`
  color: ${({ $active, theme }) => (
    $active ? theme.colors.accentStrong : theme.colors.textMuted
  )};
  font-size: 13px;
  font-weight: 700;
`;

const SelectionBanner = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.95fr);
  gap: 18px;
  padding: 22px 24px;
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  background: ${({ $toneKey }) => {
    const tone = TONE_CONFIG[$toneKey] ?? TONE_CONFIG.MEDIUM;

    return `linear-gradient(135deg, ${tone.soft} 0%, #ffffff 56%, #f9fbf8 100%)`;
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 18px 16px;
  }
`;

const SelectionCopy = styled.div`
  min-width: 0;
`;

const SelectionEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const SelectionTitle = styled.h3`
  margin: 10px 0 8px;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.16;
`;

const SelectionSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 15px;
  line-height: 1.7;
`;

const SelectionMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`;

const SelectionMetaChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 9px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const SelectionAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SelectionMetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SelectionMetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 98px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SelectionMetricLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const SelectionMetricValue = styled.div`
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
`;

const SelectionActionRow = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const LightActionButton = styled.button`
  ${buttonBase}
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.text};
`;

const PrimaryActionButton = styled.button`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  box-shadow: 0 14px 26px rgba(47, 158, 104, 0.22);
`;

const ResetSelectionButton = styled.button`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 700;
`;

const DesktopReportGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(260px, 1.1fr) minmax(260px, 1.1fr) minmax(420px, 1.65fr) minmax(250px, 0.78fr);
  grid-template-rows: 324px 396px;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopPanel = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 8px 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 20px rgba(15, 27, 18, 0.08);
`;

const MobileReportStack = styled.section`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;

const MobilePanel = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 18px rgba(15, 27, 18, 0.08);
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const PanelTitleGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

const PanelIcon = styled.div`
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  background: transparent;
  color: ${({ theme }) => theme.colors.accentStrong};
  flex-shrink: 0;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
`;

const PanelSubTitle = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
  line-height: 1.45;
`;

const PanelPill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 800;
  ${toneBadgeStyle}
`;

const InlineActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
`;

const ScrollBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding-right: 6px;
`;

const ChartWrap = styled.div`
  position: relative;
  min-height: 178px;
  border-radius: 8px;
  background: linear-gradient(180deg, #fbfcfb 0%, #f5f8f5 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;

  line {
    stroke: rgba(20, 33, 23, 0.08);
    stroke-width: 1;
  }

  polygon {
    fill: rgba(47, 158, 104, 0.12);
  }

  polyline {
    fill: none;
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 3;
  }

  circle {
    fill: ${({ theme }) => theme.colors.warning};
  }
`;

const MetricRail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

const MetricPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  padding: 11px 12px;
  border-radius: 14px;
  background: ${({ $tone }) => METRIC_TONE_STYLE[$tone].bg};
  color: ${({ $tone }) => METRIC_TONE_STYLE[$tone].text};
  font-size: 13px;
  font-weight: 700;

  span {
    min-width: 0;
  }

  strong {
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
  }
`;

const SearchStripButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin-top: 14px;
  padding: 12px 12px 12px 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SearchStripText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
`;

const SearchStripBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  background: #f3d4dc;
  color: #b2556b;
  font-size: 12px;
  font-weight: 800;
`;

const GuideLeadCard = styled.div`
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GuideLeadLabel = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const GuideLeadText = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const GuideDocument = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 16px;
  padding-right: 2px;
`;

const GuideDocumentSection = styled.section`
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const GuideDocumentTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.35;
`;

const GuideParagraph = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.72;
  color: ${({ theme }) => theme.colors.text};

  & + & {
    margin-top: 8px;
  }
`;

const GuideBulletList = styled.ul`
  margin: 10px 0 0;
  padding-left: 18px;
`;

const GuideBulletItem = styled.li`
  font-size: 14px;
  line-height: 1.72;
  color: ${({ theme }) => theme.colors.text};

  & + & {
    margin-top: 8px;
  }
`;

const GuideSectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

const GuideStepCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GuideStepIndex = styled.div`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
`;

const GuideStepBody = styled.div`
  min-width: 0;
`;

const GuideStepTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
`;

const GuideStepText = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.6;
`;

const ReferenceHeroCard = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 180px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(135deg, #d7e6dd 0%, #eff5f1 55%, #fdfefe 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReferenceHeroGlow = styled.div`
  position: absolute;
  right: -36px;
  top: -42px;
  width: 140px;
  height: 140px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(47, 158, 104, 0.24) 0%, rgba(47, 158, 104, 0) 70%);
`;

const ReferenceHeroLabel = styled.div`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 800;
`;

const ReferenceHeroTitle = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 18px;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const ReferenceHeroSubTitle = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  font-weight: 600;
`;

const ReferencePaper = styled.div`
  margin-top: 14px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fcfdfc;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReferenceParagraph = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.74;
  color: ${({ theme }) => theme.colors.text};

  & + & {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
  }
`;

const ReferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
`;

const ReferenceListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const ReferenceBullet = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  margin-top: 8px;
  flex-shrink: 0;
`;

const ReferenceTextGroup = styled.div`
  min-width: 0;
`;

const ReferenceListTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
`;

const ReferenceListText = styled.div`
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.58;
`;

const InfoFactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InfoFact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  strong {
    font-size: 14px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TextBlock = styled.p`
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 1.72;
  color: ${({ theme }) => theme.colors.text};
`;

const BlockTitle = styled.h4`
  margin: 18px 0 10px;
  font-size: 15px;
  line-height: 1.35;
`;

const CauseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CauseItem = styled.div`
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CauseTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const CauseTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
`;

const CauseScore = styled.div`
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
`;

const CauseTrack = styled.div`
  height: 8px;
  margin-top: 10px;
  border-radius: 999px;
  background: rgba(20, 33, 23, 0.08);
  overflow: hidden;
`;

const CauseTrackFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2f9e68 0%, #7bc9a0 100%);
`;

const CauseText = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.58;
`;

const ActionChecklist = styled.ul`
  margin: 0;
  padding-left: 18px;
`;

const ActionChecklistItem = styled.li`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};

  & + & {
    margin-top: 8px;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const TimelineDot = styled.span`
  position: relative;
  width: 12px;
  height: 12px;
  margin-top: 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 0 6px rgba(47, 158, 104, 0.12);
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  min-width: 0;
`;

const TimelineDate = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const TimelineTitle = styled.div`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;

const TimelineText = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  line-height: 1.62;
`;

const HistorySummaryCard = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const HistorySummaryLabel = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const HistorySummaryText = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.68;
  color: ${({ theme }) => theme.colors.text};
`;

const MapSurface = styled.div`
  position: relative;
  overflow: hidden;
  min-height: ${({ $compact }) => ($compact ? '220px' : '208px')};
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(180deg, #202628 0%, #30383b 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const MapGridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 42px 42px;
  opacity: 0.38;
`;

const MachineBlock = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $compact }) => ($compact ? '8px' : '10px')};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ $compact }) => ($compact ? '10px' : '12px')};
  font-weight: 700;
  backdrop-filter: blur(6px);
`;

const MapPoint = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;

  span {
    display: block;
    width: ${({ $compact }) => ($compact ? '12px' : '14px')};
    height: ${({ $compact }) => ($compact ? '12px' : '14px')};
    border-radius: 999px;
    border: 2px solid white;
    background: ${({ $state }) => {
      if ($state === 'alert') {
        return '#ef476f';
      }

      if ($state === 'warning') {
        return '#f4b740';
      }

      return '#53c487';
    }};
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.12);
  }
`;

const MapPointLabel = styled.div`
  margin-top: 7px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.38);
  color: white;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  transform: translateX(-40%);
`;

const FocusPulse = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid rgba(239, 71, 111, 0.7);
  transform: translate(-50%, -50%);
  animation: ${pulse} 1.8s infinite;
`;

const LegendRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
`;

const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ $state }) => {
    if ($state === 'alert') {
      return '#ef476f';
    }

    if ($state === 'warning') {
      return '#f4b740';
    }

    return '#53c487';
  }};
`;

const EmptyState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 260px;
  padding: 34px 24px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
`;

const EmptyIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
`;

const EmptyTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  line-height: 1.25;
`;

const EmptyText = styled.p`
  margin: 0;
  max-width: 740px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 15px;
  line-height: 1.7;
`;
