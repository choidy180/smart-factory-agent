import Link from 'next/link';
import styled from 'styled-components';
import { navigationSections } from '@/data/navigation';
import { navigationIconMap } from '@/components/layout/navigationIconMap';

interface NavigationMenuProps {
  currentPath: string;
  onNavigate?: () => void;
}

function isActivePath(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function NavigationMenu({ currentPath, onNavigate }: NavigationMenuProps) {
  return (
    <Sections>
      {navigationSections.map((section) => (
        <Section key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>

          <MenuList>
            {section.items.map((item) => {
              const Icon = navigationIconMap[item.icon];
              const active = isActivePath(currentPath, item.href);

              return (
                <MenuLink key={item.href} href={item.href} $active={active} onClick={onNavigate}>
                  <MenuIconWrap $active={active}>
                    <Icon size={18} />
                  </MenuIconWrap>
                  <span>{item.label}</span>
                </MenuLink>
              );
            })}
          </MenuList>
        </Section>
      ))}
    </Sections>
  );
}

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.section``;

const SectionTitle = styled.p`
  margin: 0 0 10px;
  padding: 0 10px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`;

const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuLink = styled(Link)<{ $active: boolean }>`
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

const MenuIconWrap = styled.span<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)'};
  color: ${({ theme }) => theme.colors.sidebarText};
`;
