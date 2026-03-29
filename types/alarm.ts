export type AlarmSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
export type AlarmMetricTone = 'critical' | 'warning' | 'info';
export type AlarmMapNodeState = 'normal' | 'warning' | 'alert';

export interface AlarmMetric {
  label: string;
  value: string;
  tone: AlarmMetricTone;
}

export interface AlarmMapNode {
  label: string;
  x: number;
  y: number;
  state: AlarmMapNodeState;
}

export interface AlarmCause {
  title: string;
  score: number;
  detail: string;
}

export interface AlarmGuideStep {
  title: string;
  detail: string;
}

export interface AlarmReference {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
}

export interface AlarmHistoryItem {
  date: string;
  title: string;
  summary: string;
}

export interface Alarm {
  id: string;
  title: string;
  equipment: string;
  line: string;
  occurredAt: string;
  timeLabel: string;
  severity: AlarmSeverity;
  reason: string;
  summary: string;
  aiSummary: string;
  status: string;
  eta: string;
  healthScore: number;
  confidence: number;
  similarCases: number;
  location: string;
  trend: number[];
  metrics: AlarmMetric[];
  mapNodes: AlarmMapNode[];
  rootCauses: AlarmCause[];
  immediateActions: string[];
  guideSteps: AlarmGuideStep[];
  references: AlarmReference[];
  history: AlarmHistoryItem[];
  prompts: string[];
}

export interface AlarmBoardSummary {
  total: number;
  high: number;
  medium: number;
  low: number;
}
