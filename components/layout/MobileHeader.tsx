import styled from 'styled-components';
import { MenuIcon } from '@/components/icons/AppIcons';

interface MobileHeaderProps {
  title: string;
  onOpenMenu: () => void;
}

export default function MobileHeader({ title, onOpenMenu }: MobileHeaderProps) {
  return (
    <TopBar>
      <TopButton type="button" aria-label="메뉴 열기" onClick={onOpenMenu}>
        <MenuIcon />
      </TopButton>

      <TitleGroup>
        <Eyebrow>스마트 공정 설비 Agent</Eyebrow>
        <Title>{title}</Title>
      </TitleGroup>

      <StatusPill>
        <StatusDot />
        Live
      </StatusPill>
    </TopBar>
  );
}

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 35;
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 74px;
  padding: 14px 16px;
  background: rgba(244, 247, 243, 0.92);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(16px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const TopButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.panel};
  flex-shrink: 0;
`;

const TitleGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

const Eyebrow = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const Title = styled.div`
  margin-top: 3px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.panel};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`;

const StatusDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #7bf1b3;
  box-shadow: 0 0 0 4px rgba(123, 241, 179, 0.14);
  flex-shrink: 0;
`;
