export type NavigationIconKey =
  | 'alert'
  | 'rootCause'
  | 'improvement'
  | 'shield'
  | 'settings';

export interface NavigationItem {
  href: string;
  label: string;
  icon: NavigationIconKey;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}
