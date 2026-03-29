import type { Alarm, AlarmMapNodeState, AlarmMetricTone, AlarmSeverity } from '@/types/alarm';

export const TONE_CONFIG: Record<
  AlarmSeverity,
  { dot: string; soft: string; strong: string; border: string }
> = {
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

export const METRIC_TONE_STYLE: Record<AlarmMetricTone, { bg: string; text: string }> = {
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

export const SEVERITY_LABELS: Record<AlarmSeverity, string> = {
  HIGH: '긴급',
  MEDIUM: '주의',
  LOW: '관찰'
};

export const PLANT_BLOCKS = [
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
] as const;

export const MAP_NODE_COLORS: Record<
  AlarmMapNodeState,
  { dot: string; glow: string; bg: string }
> = {
  normal: {
    dot: '#2f9e68',
    glow: 'rgba(47, 158, 104, 0.22)',
    bg: 'rgba(47, 158, 104, 0.1)'
  },
  warning: {
    dot: '#f0a63a',
    glow: 'rgba(240, 166, 58, 0.22)',
    bg: 'rgba(240, 166, 58, 0.12)'
  },
  alert: {
    dot: '#d54f6a',
    glow: 'rgba(213, 79, 106, 0.24)',
    bg: 'rgba(213, 79, 106, 0.12)'
  }
};

export function buildGuideSections(alarm: Alarm) {
  return [
    {
      title: '1. 고장 현상 정리',
      paragraphs: [
        `${alarm.equipment}에서 ${alarm.reason} 기준의 이상이 감지되었습니다.`,
        alarm.summary,
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
      bullets: alarm.rootCauses.map(
        (cause) => `${cause.title} (${cause.score}%) · ${cause.detail}`
      )
    }
  ];
}

export function buildReferenceParagraphs(alarm: Alarm) {
  return [
    `${alarm.references[0]?.title} / ${alarm.references[0]?.subtitle}`,
    `연관 설비: ${alarm.equipment} · 위치: ${alarm.location}`,
    `현재 알람은 ${alarm.reason} 신호를 기준으로 감지되었으며, 우선 조치 단계에서 ${alarm.rootCauses[0]?.title} 확인이 권장됩니다.`,
    `동일 계열 설비에서 누적된 유사 사례는 ${alarm.similarCases}건이며, 가장 빈번한 조치 항목은 ${alarm.immediateActions[0]}`,
    `현장 복구 시에는 ${alarm.guideSteps[0]?.title} 이후 ${alarm.guideSteps[1]?.title} 순으로 점검을 진행하는 절차가 권장됩니다.`
  ];
}
