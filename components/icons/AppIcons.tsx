// @ts-nocheck
'use client';

function IconBase({
  size = 20,
  strokeWidth = 1.8,
  children,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </IconBase>
  );
}

export function FactoryIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 20V9l5 3V9l5 3V4l6 4v12" />
      <path d="M4 20h16" />
      <path d="M8 20v-4" />
      <path d="M12 20v-4" />
      <path d="M16 20v-4" />
    </IconBase>
  );
}

export function AlertIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l9 16H3l9-16z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconBase>
  );
}

export function RootCauseIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.3 7.4l2.9 7.1" />
      <path d="M15.7 7.4l-2.9 7.1" />
      <path d="M8.5 6h7" />
    </IconBase>
  );
}

export function ImprovementIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.6 14.4A6 6 0 1115.4 14.4c-.8.7-1.4 1.4-1.7 2.6h-3.4c-.3-1.2-.9-1.9-1.7-2.6z" />
    </IconBase>
  );
}

export function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6l7-3z" />
      <path d="M9.5 12.5l1.7 1.7 3.8-4" />
    </IconBase>
  );
}

export function SettingsIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1 1 0 00.2 1.1l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1 1 0 00-1.1-.2 1 1 0 00-.6.9V20a2 2 0 01-4 0v-.1a1 1 0 00-.6-.9 1 1 0 00-1.1.2l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1 1 0 00.2-1.1 1 1 0 00-.9-.6H4a2 2 0 010-4h.1a1 1 0 00.9-.6 1 1 0 00-.2-1.1l-.1-.1a2 2 0 012.8-2.8l.1.1a1 1 0 001.1.2 1 1 0 00.6-.9V4a2 2 0 014 0v.1a1 1 0 00.6.9 1 1 0 001.1-.2l.1-.1a2 2 0 012.8 2.8l-.1.1a1 1 0 00-.2 1.1 1 1 0 00.9.6H20a2 2 0 010 4h-.1a1 1 0 00-.5.9z" />
    </IconBase>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.2 16.2L20 20" />
    </IconBase>
  );
}

export function SparkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
    </IconBase>
  );
}

export function MapIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </IconBase>
  );
}

export function ChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 19h16" />
      <path d="M6 16l4-5 3 2 5-7" />
      <path d="M18 6h-3" />
      <path d="M18 6v3" />
    </IconBase>
  );
}

export function HistoryIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12a9 9 0 109-9" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}

export function DocumentIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8 3h7l4 4v14H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M15 3v5h5" />
      <path d="M10 12h6" />
      <path d="M10 16h6" />
    </IconBase>
  );
}

export function ArrowRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function BoltIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M13 2L5 13h5l-1 9 8-11h-5l1-9z" />
    </IconBase>
  );
}
