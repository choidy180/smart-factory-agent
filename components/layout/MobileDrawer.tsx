import Link from 'next/link';
import styled from 'styled-components';
import { CloseIcon } from '@/components/icons/AppIcons';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { BrandIcon } from '@/components/layout/navigationIconMap';

interface MobileDrawerProps {
  open: boolean;
  currentPath: string;
  onClose: () => void;
}

export default function MobileDrawer({ open, currentPath, onClose }: MobileDrawerProps) {
  return (
    <Drawer $open={open} aria-hidden={!open}>
      <Header>
        <BrandLink href="/realtime-alerts" onClick={onClose}>
          <BrandMark>
            <BrandIcon size={22} />
          </BrandMark>
          <BrandTextGroup>
            <BrandTitle>설비 Agent</BrandTitle>
            <BrandCaption>Smart Factory Monitor</BrandCaption>
          </BrandTextGroup>
        </BrandLink>

        <CloseButton type="button" aria-label="메뉴 닫기" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </Header>

      <ScrollArea>
        <NavigationMenu currentPath={currentPath} onNavigate={onClose} />
      </ScrollArea>

      <Footer>
        <StatusRow>
          <StatusDot />
          알람 스트림 연결 중
        </StatusRow>
      </Footer>
    </Drawer>
  );
}

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: min(88vw, 320px);
  height: 100vh;
  padding: 20px 18px 24px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.sidebarBg} 0%,
    ${({ theme }) => theme.colors.sidebarBgSecondary} 100%
  );
  color: ${({ theme }) => theme.colors.sidebarText};
  transform: translateX(${({ $open }) => ($open ? '0' : '-104%')});
  transition: transform 0.25s ease;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors.sidebarText};
  flex-shrink: 0;
`;

const ScrollArea = styled.div`
  flex: 1;
  margin-top: 34px;
  overflow-y: auto;
`;

const Footer = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;

const StatusRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
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
