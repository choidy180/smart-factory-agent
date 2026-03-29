'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import MobileHeader from '@/components/layout/MobileHeader';
import { navigationItems } from '@/data/navigation';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentItem = useMemo(() => {
    return navigationItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ?? navigationItems[0];
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useLockBodyScroll(mobileOpen);

  const isFullBleed = pathname === '/realtime-alerts';

  return (
    <Shell>
      <DesktopSidebar currentPath={pathname} />
      <MobileHeader title={currentItem.label} onOpenMenu={() => setMobileOpen(true)} />

      <MainArea>
        <ContentFrame $fullBleed={isFullBleed}>{children}</ContentFrame>
      </MainArea>

      <DrawerBackdrop $open={mobileOpen} onClick={() => setMobileOpen(false)} aria-hidden={!mobileOpen} />
      <MobileDrawer open={mobileOpen} currentPath={pathname} onClose={() => setMobileOpen(false)} />
    </Shell>
  );
}

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainArea = styled.main`
  min-height: 100vh;
  padding-left: ${({ theme }) => theme.sizes.sidebar};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 0;
    padding-top: 86px;
  }
`;

const ContentFrame = styled.div<{ $fullBleed: boolean }>`
  width: 100%;
  max-width: ${({ $fullBleed, theme }) => ($fullBleed ? 'none' : theme.sizes.desktopContentMax)};
  margin: 0 auto;
  padding: ${({ $fullBleed }) => ($fullBleed ? '0' : '28px')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
    padding: ${({ $fullBleed }) => ($fullBleed ? '0' : '18px 16px 28px')};
  }
`;

const DrawerBackdrop = styled.button<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 39;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  background: ${({ theme }) => theme.colors.overlay};

  @media (min-width: 1025px) {
    display: none;
  }
`;
