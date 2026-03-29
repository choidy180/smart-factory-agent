import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface ReportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MessageRole = 'user' | 'agent';

type ChartType = 'bar' | 'hbar' | 'ratio';

interface ChartData {
  label: string;
  value: number; // 퍼센트 또는 상대적 수치 (0~100)
  displayValue: string;
  color?: string; // 커스텀 색상이 필요할 때 사용 (특히 ratio 타입)
}

interface ReportPayload {
  text: string;
  chartType?: ChartType;
  chart?: ChartData[];
}

interface Message {
  id: string;
  role: MessageRole;
  text: string;
  chartType?: ChartType;
  chartData?: ChartData[];
}

// 💡 다양한 추천 질문 추가
const PREDEFINED_PROMPTS = [
  '지난 한달간 KR3 Case발포 무작업 실적 리포트 생성해줘',
  '최근 1주일 주요 설비 알람 통계 보여줘',
  '오늘 발생한 알람 심각도별 비율 분석해줘',
  '이번 주 공정별 에너지 소비량 비교해줘'
];

// 💡 질문에 따른 다양한 그래프 타입(bar, hbar, ratio)과 데이터 매핑
const MOCK_REPORTS: Record<string, ReportPayload> = {
  '지난 한달간 KR3 Case발포 무작업 실적 리포트 생성해줘': {
    text: '요청하신 **KR3 Case 발포 공정의 최근 1개월 무작업 실적**입니다. \n\n총 무작업 시간은 42시간이며, 3주차에 설비 정기 점검으로 인해 무작업 시간이 피크(18시간)에 달했으나, 4주차부터 다시 안정화 추세를 보이고 있습니다.',
    chartType: 'bar',
    chart: [
      { label: '1주차', value: 30, displayValue: '8h' },
      { label: '2주차', value: 45, displayValue: '12h' },
      { label: '3주차', value: 80, displayValue: '18h' },
      { label: '4주차', value: 20, displayValue: '4h' },
    ]
  },
  '최근 1주일 주요 설비 알람 통계 보여줘': {
    text: '최근 1주일간 발생한 **주요 설비별 알람 발생 통계**입니다.\n\nMixer 설비에서 가장 많은 알람이 발생하였으며, 주로 온도 센서 경고였습니다. 해당 설비의 집중 모니터링을 권장합니다.',
    chartType: 'hbar',
    chart: [
      { label: 'Mixer', value: 90, displayValue: '45건' },
      { label: 'Conveyor', value: 40, displayValue: '20건' },
      { label: 'Heater', value: 60, displayValue: '30건' },
      { label: 'Packer', value: 10, displayValue: '5건' },
    ]
  },
  '오늘 발생한 알람 심각도별 비율 분석해줘': {
    text: '오늘 발생한 **전체 알람의 심각도(Severity)별 비율**입니다.\n\n현재 LOW 등급의 경미한 알람이 대다수(65%)를 차지하고 있으나, 즉각적인 조치가 필요한 CRITICAL 알람도 10% 발생했습니다. 상세 내역을 확인해 보시겠습니까?',
    chartType: 'ratio',
    chart: [
      { label: 'CRITICAL', value: 10, displayValue: '10%', color: '#ef4444' },
      { label: 'HIGH', value: 25, displayValue: '25%', color: '#f97316' },
      { label: 'LOW', value: 65, displayValue: '65%', color: '#3b82f6' }
    ]
  },
  '이번 주 공정별 에너지 소비량 비교해줘': {
    text: '이번 주 **주요 공정별 전력 소비량(kWh)** 비교 차트입니다.\n\n건조(Drying) 공정에서 가장 많은 에너지가 소비되었으며, 이는 겨울철 외기 온도 하락에 따른 히터 가동률 증가가 원인으로 분석됩니다.',
    chartType: 'hbar',
    chart: [
      { label: '건조', value: 95, displayValue: '2,400kWh' },
      { label: '성형', value: 60, displayValue: '1,520kWh' },
      { label: '포장', value: 35, displayValue: '880kWh' },
      { label: '조립', value: 20, displayValue: '510kWh' },
    ]
  }
};

export default function ReportChatModal({ isOpen, onClose }: ReportChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'agent',
      text: '안녕하세요! 설비 Agent입니다. 어떤 리포트가 필요하신가요?\n아래의 추천 질문을 클릭하거나 직접 요청해 주세요.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handlePromptClick = (prompt: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const report = MOCK_REPORTS[prompt] || {
        text: '해당 리포트에 대한 데이터를 현재 불러올 수 없습니다. 다른 기간이나 설비로 다시 시도해주세요.',
        chartType: undefined,
        chart: undefined
      };

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        text: report.text,
        chartType: report.chartType,
        chartData: report.chart
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // 💡 차트 타입에 따라 다른 형태의 그래프 렌더링
  const renderChart = (type: ChartType, data: ChartData[]) => {
    if (type === 'bar') {
      return (
        <VBarContainer>
          {data.map((d, i) => (
            <VBarGroup key={i}>
              <VBarTrack>
                <VBarFill style={{ height: `${d.value}%` }} />
                <VBarValue>{d.displayValue}</VBarValue>
              </VBarTrack>
              <VBarLabel>{d.label}</VBarLabel>
            </VBarGroup>
          ))}
        </VBarContainer>
      );
    }
    
    if (type === 'hbar') {
      return (
        <HBarContainer>
          {data.map((d, i) => (
            <HBarGroup key={i}>
              <HBarLabel>{d.label}</HBarLabel>
              <HBarTrack>
                <HBarFill style={{ width: `${d.value}%`, background: d.color }} />
              </HBarTrack>
              <HBarValue>{d.displayValue}</HBarValue>
            </HBarGroup>
          ))}
        </HBarContainer>
      );
    }

    if (type === 'ratio') {
      return (
        <RatioContainer>
          <RatioTrack>
            {data.map((d, i) => (
              <RatioFill key={i} style={{ width: `${d.value}%`, background: d.color }}>
                {d.value > 15 && <RatioValue>{d.displayValue}</RatioValue>}
              </RatioFill>
            ))}
          </RatioTrack>
          <RatioLegend>
            {data.map((d, i) => (
              <LegendItem key={i}>
                <LegendDot style={{ background: d.color }} />
                {d.label}
              </LegendItem>
            ))}
          </RatioLegend>
        </RatioContainer>
      );
    }

    return null;
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>📊 AI 리포트 어시스턴트</HeaderTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <ChatArea>
          {messages.map((msg) => (
            <MessageRow key={msg.id} $isUser={msg.role === 'user'}>
              {!msg.chartData ? (
                <Bubble $isUser={msg.role === 'user'}>{msg.text}</Bubble>
              ) : (
                <ReportCard>
                  <ReportText>{msg.text}</ReportText>
                  {msg.chartType && msg.chartData && renderChart(msg.chartType, msg.chartData)}
                </ReportCard>
              )}
            </MessageRow>
          ))}
          {isTyping && (
            <MessageRow $isUser={false}>
              <TypingIndicator>
                <Dot />
                <Dot />
                <Dot />
                <TypingText>리포트 데이터를 분석중입니다...</TypingText>
              </TypingIndicator>
            </MessageRow>
          )}
          <div ref={messagesEndRef} />
        </ChatArea>

        <PromptArea>
          <PromptTitle>💡 추천 리포트 질문</PromptTitle>
          <PromptList>
            {PREDEFINED_PROMPTS.map((prompt, idx) => (
              <PromptChip key={idx} onClick={() => handlePromptClick(prompt)}>
                {prompt}
              </PromptChip>
            ))}
          </PromptList>
        </PromptArea>
      </ModalContainer>
    </Overlay>
  );
}

// --- Styled Components (Animations & Layout) ---

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const barGrowV = keyframes`
  from { height: 0; }
`;

const barGrowH = keyframes`
  from { width: 0; }
`;

const blink = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 15, 20, 0.6);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px; /* 창 넓이 살짝 증가 */
  height: 85vh;     /* 창 높이 증가 */
  max-height: 900px;
  background: ${({ theme }) => theme.colors?.surface || '#ffffff'};
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: ${slideUp} 0.3s ease-out;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px; /* 패딩 증가 */
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#eaeaea'};
  background: ${({ theme }) => theme.colors?.surfaceSoft || '#f8f9fa'};
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px; /* 타이틀 글자 크기 증가 */
  font-weight: 800;
  color: #111111;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 30px; /* 닫기 버튼 크기 증가 */
  color: #666666;
  cursor: pointer;
  &:hover { color: #111111; }
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 28px; /* 패딩 증가 */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#fafafa'};
`;

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  animation: ${fadeIn} 0.3s ease-out;
`;

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 18px 22px; /* 패딩 증가 */
  border-radius: 24px;
  border-bottom-right-radius: ${({ $isUser }) => ($isUser ? '6px' : '24px')};
  border-bottom-left-radius: ${({ $isUser }) => (!$isUser ? '6px' : '24px')};
  background: ${({ $isUser }) => ($isUser ? '#2b6cb0' : '#ffffff')};
  color: ${({ $isUser }) => ($isUser ? '#ffffff' : '#333333')};
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  font-size: 18px; /* 대화 내용 글자 크기 증가 */
  font-weight: 500;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ReportCard = styled.div`
  width: 100%;
  max-width: 540px; /* 카드 넓이 증가 */
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
`;

const ReportText = styled.p`
  margin: 0 0 28px 0;
  font-size: 18px; /* 리포트 본문 크기 증가 */
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
`;

/* --- 1. 수직 바 (VBar) 스타일 --- */
const VBarContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
`;

const VBarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: 100%;
  justify-content: flex-end;
`;

const VBarTrack = styled.div`
  position: relative;
  width: 48px; /* 넓이 증가 */
  height: 140px; /* 높이 증가 */
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
`;

const VBarFill = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
  border-radius: 8px;
  animation: ${barGrowV} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`;

const VBarValue = styled.span`
  position: absolute;
  top: -28px;
  width: 100%;
  text-align: center;
  font-size: 16px; /* 폰트 증가 */
  font-weight: 800;
  color: #444;
`;

const VBarLabel = styled.span`
  font-size: 16px; /* 폰트 증가 */
  font-weight: 700;
  color: #666;
`;

/* --- 2. 수평 바 (HBar) 스타일 --- */
const HBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
`;

const HBarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HBarLabel = styled.div`
  width: 80px;
  font-size: 16px;
  font-weight: 700;
  color: #555;
  text-align: right;
`;

const HBarTrack = styled.div`
  flex: 1;
  height: 28px;
  background: #f0f0f0;
  border-radius: 6px;
`;

const HBarFill = styled.div`
  height: 100%;
  background: ${({ style }) => style?.background || 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)'};
  border-radius: 6px;
  animation: ${barGrowH} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
`;

const HBarValue = styled.div`
  width: 60px;
  font-size: 16px;
  font-weight: 800;
  color: #444;
`;

/* --- 3. 비율 바 (Ratio) 스타일 --- */
const RatioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
`;

const RatioTrack = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  background: #f0f0f0;
`;

const RatioFill = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${barGrowH} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  transition: width 0.3s ease;
`;

const RatioValue = styled.span`
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
`;

const RatioLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
`;

const LegendDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;

/* --- 기타 컴포넌트 --- */
const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: #ffffff;
  border-radius: 20px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: ${blink} 1.4s infinite both;
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const TypingText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #777;
`;

const PromptArea = styled.div`
  padding: 24px 28px;
  background: ${({ theme }) => theme.colors?.surface || '#ffffff'};
  border-top: 1px solid ${({ theme }) => theme.colors?.border || '#eaeaea'};
`;

const PromptTitle = styled.div`
  font-size: 18px; /* 크기 증가 */
  font-weight: 800;
  color: #666666;
  margin-bottom: 16px;
`;

const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PromptChip = styled.button`
  text-align: left;
  padding: 16px 20px; /* 패딩 증가 */
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#eaeaea'};
  background: transparent;
  font-size: 18px; /* 질문 글자 크기 확 증가! */
  font-weight: 700;
  color: #333333;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f4f8;
    border-color: #2b6cb0;
    color: #2b6cb0;
    transform: translateX(4px); /* Hover시 살짝 우측으로 밀리는 디테일 추가 */
  }
`;