// @ts-nocheck
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import {
  AlertIcon,
  CloseIcon,
  FactoryIcon,
  ImprovementIcon,
  MenuIcon,
  RootCauseIcon,
  SettingsIcon,
  ShieldIcon,
  SparkIcon
} from '@/components/icons/AppIcons';
import { navigationItems, navigationSections } from '@/data/navigation';

const iconMap = {
  alert: AlertIcon,
  rootCause: RootCauseIcon,
  improvement: ImprovementIcon,
  shield: ShieldIcon,
  settings: SettingsIcon
};

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentItem = useMemo(() => {
    return navigationItems.find((item) => item.href === pathname) ?? navigationItems[0];
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <Shell>
      <DesktopSidebar>
        <SidebarBrand href="/realtime-alerts">
          <BrandMark>
            <FactoryIcon size={22} />
          </BrandMark>
          <BrandTextGroup>
            <BrandTitle>설비 Agent</BrandTitle>
            <BrandCaption>Smart Factory Monitor</BrandCaption>
          </BrandTextGroup>
        </SidebarBrand>

        <SidebarScroll>
          {navigationSections.map((section) => (
            <SidebarSection key={section.title}>
              <SidebarSectionTitle>{section.title}</SidebarSectionTitle>

              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <SidebarItemLink
                      key={item.href}
                      href={item.href}
                      $active={pathname === item.href}
                    >
                      <SidebarIconWrap $active={pathname === item.href}>
                        <Icon size={18} />
                      </SidebarIconWrap>
                      <span>{item.label}</span>
                    </SidebarItemLink>
                  );
                })}
              </SidebarMenu>
            </SidebarSection>
          ))}
        </SidebarScroll>

        <SidebarFootCard>
          <SidebarFootTitle>
            <SparkIcon size={16} />
            Agent 상태
          </SidebarFootTitle>
          <SidebarFootText>
            현재 모든 알람은 실시간 스트림 기반으로 시뮬레이션되고 있습니다.
          </SidebarFootText>
          <SidebarStatusRow>
            <SidebarStatusDot />
            응답 준비 완료
          </SidebarStatusRow>
        </SidebarFootCard>
      </DesktopSidebar>

      <MobileTopBar>
        <MobileTopButton
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </MobileTopButton>

        <MobileTopTitleGroup>
          <MobileTopEyebrow>스마트 공정 설비 Agent</MobileTopEyebrow>
          <MobileTopTitle>{currentItem.label}</MobileTopTitle>
        </MobileTopTitleGroup>

        <MobileStatusPill>
          <SidebarStatusDot />
          Live
        </MobileStatusPill>
      </MobileTopBar>

      <MainArea>
        <ContentFrame $fullBleed={pathname === '/realtime-alerts'}>{children}</ContentFrame>
      </MainArea>

      <DrawerBackdrop
        $open={mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <MobileDrawer $open={mobileOpen} aria-hidden={!mobileOpen}>
        <MobileDrawerHeader>
          <SidebarBrand href="/realtime-alerts">
            <BrandMark>
              <FactoryIcon size={22} />
            </BrandMark>
            <BrandTextGroup>
              <BrandTitle>설비 Agent</BrandTitle>
              <BrandCaption>Smart Factory Monitor</BrandCaption>
            </BrandTextGroup>
          </SidebarBrand>

          <MobileTopButton
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon />
          </MobileTopButton>
        </MobileDrawerHeader>

        <SidebarScroll>
          {navigationSections.map((section) => (
            <SidebarSection key={section.title}>
              <SidebarSectionTitle>{section.title}</SidebarSectionTitle>

              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <SidebarItemLink
                      key={item.href}
                      href={item.href}
                      $active={pathname === item.href}
                    >
                      <SidebarIconWrap $active={pathname === item.href}>
                        <Icon size={18} />
                      </SidebarIconWrap>
                      <span>{item.label}</span>
                    </SidebarItemLink>
                  );
                })}
              </SidebarMenu>
            </SidebarSection>
          ))}
        </SidebarScroll>

        <DrawerFooter>
          <SidebarStatusRow>
            <SidebarStatusDot />
            알람 스트림 연결 중
          </SidebarStatusRow>
        </DrawerFooter>
      </MobileDrawer>
    </Shell>
  );
}

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const DesktopSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
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

const SidebarBrand = styled(Link)`
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
  color: ${({ theme }) => theme.colors.sidebarText};
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
  font-size: 12px;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const SidebarScroll = styled.div`
  flex: 1;
  margin-top: 34px;
  overflow-y: auto;
`;

const SidebarSection = styled.section`
  & + & {
    margin-top: 24px;
  }
`;

const SidebarSectionTitle = styled.p`
  margin: 0 0 10px;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SidebarItemLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.14)' : 'transparent')};
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(2px);
  }
`;

const SidebarIconWrap = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: ${({ $active, theme }) => (
    $active ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)'
  )};
  color: ${({ theme }) => theme.colors.sidebarText};
`;

const SidebarFootCard = styled.div`
  margin-top: 18px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
`;

const SidebarFootTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
`;

const SidebarFootText = styled.p`
  margin: 10px 0 14px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const SidebarStatusRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
`;

const SidebarStatusDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #7bf1b3;
  box-shadow: 0 0 0 4px rgba(123, 241, 179, 0.14);
  flex-shrink: 0;
`;

const MainArea = styled.main`
  min-height: 100vh;
  padding-left: ${({ theme }) => theme.sizes.sidebar};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 0;
    padding-top: 86px;
  }
`;

const ContentFrame = styled.div`
  width: 100%;
  max-width: ${({ $fullBleed, theme }) => (
    $fullBleed ? 'none' : theme.sizes.desktopContentMax
  )};
  margin: 0 auto;
  padding: ${({ $fullBleed }) => ($fullBleed ? '0' : '28px')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ $fullBleed }) => ($fullBleed ? '0' : '18px 16px 28px')};
    max-width: none;
  }
`;

const MobileTopBar = styled.header`
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

const MobileTopButton = styled.button`
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

const MobileTopTitleGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

const MobileTopEyebrow = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const MobileTopTitle = styled.div`
  margin-top: 3px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileStatusPill = styled.div`
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

const DrawerBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 39;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  background: ${({ theme }) => theme.colors.overlay};

  @media (min-width: 1025px) {
    display: none;
  }
`;

const MobileDrawer = styled.aside`
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

const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const DrawerFooter = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;
