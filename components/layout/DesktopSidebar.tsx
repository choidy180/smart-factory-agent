import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SparkIcon } from '@/components/icons/AppIcons';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { BrandIcon } from '@/components/layout/navigationIconMap';

// 방금 분리해서 만든 모달 컴포넌트를 import 해주세요. 
// (경로는 실제 파일 위치에 맞게 수정 필요)
import ReportChatModal from './ReportChatModal'; 

interface DesktopSidebarProps {
  currentPath: string;
}

export default function DesktopSidebar({ currentPath }: DesktopSidebarProps) {
  // 모달 열림/닫힘 상태 관리
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <>
      <Sidebar>
        <BrandLink href="/realtime-alerts">
          <BrandMark>
            <BrandIcon size={22} />
          </BrandMark>
          <BrandTextGroup>
            <BrandTitle>설비 Agent</BrandTitle>
            <BrandCaption>Smart Factory Monitor</BrandCaption>
          </BrandTextGroup>
        </BrandLink>

        <ScrollArea>
          <NavigationMenu currentPath={currentPath} />
        </ScrollArea>

        {/* 새로 추가된 리포트 보기 버튼 */}
        <ReportButton onClick={() => setIsReportModalOpen(true)}>
          📊 스마트 리포트 생성하기
        </ReportButton>

        <StatusCard>
          <StatusTitle>
            <SparkIcon size={20} />
            Agent 상태
          </StatusTitle>
          <StatusText>현재 모든 알람은 실시간 스트림 기반으로 시뮬레이션되고 있습니다.</StatusText>
          <StatusRow>
            <StatusDot />
            응답 준비 완료
          </StatusRow>
        </StatusCard>
      </Sidebar>

      {/* 포털/오버레이 형태로 렌더링 될 챗봇 모달 */}
      <ReportChatModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </>
  );
}

// --- 기존 스타일드 컴포넌트 유지 ---

const Sidebar = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.sidebar};
  height: 100vh;
  padding: 28px 22px 22px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.sidebarBg} 0%,
    ${({ theme }) => theme.colors.sidebarBgSecondary} 100%
  );
  color: ${({ theme }) => theme.colors.sidebarText};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const BrandMark = styled.div`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
`;

const BrandTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const BrandTitle = styled.strong`
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
`;

const BrandCaption = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const ScrollArea = styled.div`
  flex: 1;
  margin-top: 34px;
  overflow-y: auto;
`;

// 새로 추가된 버튼 스타일
const ReportButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: auto; /* 하단으로 밀착 */
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.radius.md};
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusCard = styled.div`
  margin-top: 16px; /* 위쪽 여백 조절 */
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
`;

const StatusTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
`;

const StatusText = styled.p`
  margin: 10px 0 14px;
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const StatusRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const StatusDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #7bf1b3;
  box-shadow: 0 0 0 4px rgba(123, 241, 179, 0.14);
  flex-shrink: 0;
`;