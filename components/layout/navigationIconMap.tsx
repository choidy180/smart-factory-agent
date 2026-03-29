import type { ComponentType } from 'react';
import {
  AlertIcon,
  FactoryIcon,
  ImprovementIcon,
  RootCauseIcon,
  SettingsIcon,
  ShieldIcon
} from '@/components/icons/AppIcons';
import type { AppIconProps } from '@/components/icons/AppIcons';
import type { NavigationIconKey } from '@/types/navigation';

export const navigationIconMap: Record<NavigationIconKey, ComponentType<AppIconProps>> = {
  alert: AlertIcon,
  rootCause: RootCauseIcon,
  improvement: ImprovementIcon,
  shield: ShieldIcon,
  settings: SettingsIcon
};

export const BrandIcon = FactoryIcon;
