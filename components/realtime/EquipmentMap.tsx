import styled, { keyframes } from 'styled-components';
import type { AlarmMapNode } from '@/types/alarm';
import {
  MAP_NODE_COLORS,
  PLANT_BLOCKS
} from '@/components/realtime/realtime.constants';

interface EquipmentMapProps {
  points: AlarmMapNode[];
}

export default function EquipmentMap({ points }: EquipmentMapProps) {
  const focusPoint = points.find((point) => point.state === 'alert') ?? points[0];

  return (
    <MapSurface>
      <GridOverlay />

      {PLANT_BLOCKS.map((block) => (
        <MachineBlock
          key={block.label}
          style={{
            left: block.left,
            top: block.top,
            width: block.width,
            height: block.height
          }}
        >
          {block.label}
        </MachineBlock>
      ))}

      {points.map((point) => (
        <MapPoint key={point.label} $state={point.state} style={{ left: `${point.x}%`, top: `${point.y}%` }}>
          <MapPointRing />
          <MapPointLabel>{point.label}</MapPointLabel>
        </MapPoint>
      ))}

      {focusPoint ? <FocusPulse style={{ left: `${focusPoint.x}%`, top: `${focusPoint.y}%` }} /> : null}
    </MapSurface>
  );
}

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
  }

  70% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
`;

const MapSurface = styled.div`
  position: relative;
  min-height: 260px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.surfaceSoft} 0%,
    ${({ theme }) => theme.colors.backgroundAlt} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 220px;
  }
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(20, 33, 23, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(20, 33, 23, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  opacity: 0.5;
`;

const MachineBlock = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.76);
  color: ${({ theme }) => theme.colors.textMuted};
  /* 글자 크기 확대 (12px -> 16px) */
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(15, 27, 18, 0.08);
`;

const MapPoint = styled.div<{ $state: AlarmMapNode['state'] }>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px; /* 간격 살짝 넓힘 (10px -> 12px) */
  transform: translate(-50%, -50%);
  color: ${({ $state }) => MAP_NODE_COLORS[$state].dot};
`;

const MapPointRing = styled.span`
  /* 포인트(점) 크기 확대 (14px -> 18px) */
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 9px currentColor; /* 퍼지는 그림자도 확대 (7px -> 9px) */
  opacity: 0.85;
`;

const MapPointLabel = styled.span`
  display: inline-flex;
  align-items: center;
  /* 글자 크기가 커진 만큼 라벨 박스 높이와 패딩 확대 */
  min-height: 36px; /* 30px -> 36px */
  padding: 0 14px;  /* 10px -> 14px */
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.text};
  /* 글자 크기 확대 (12px -> 16px) */
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const FocusPulse = styled.span`
  position: absolute;
  /* 애니메이션 링 크기 확대 (18px -> 24px) */
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.colors.critical};
  transform: translate(-50%, -50%);
  animation: ${pulse} 1.8s ease-out infinite;
`;