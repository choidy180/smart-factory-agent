import styled from 'styled-components';

interface SparkLineProps {
  data: number[];
}

export default function SparkLine({ data }: SparkLineProps) {
  const width = 640;
  const height = 210;
  const padding = 18;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);

      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;
  const lastPoint = data[data.length - 1];
  const lastX = width - padding;
  const lastY = height - padding - ((lastPoint - min) / range) * (height - padding * 2);

  return (
    <ChartSvg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <line x1={padding} y1={34} x2={width - padding} y2={34} />
      <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} />
      <line x1={padding} y1={height - 34} x2={width - padding} y2={height - 34} />
      <polygon points={areaPoints} />
      <polyline points={points} />
      <circle cx={lastX} cy={lastY} r="5.5" />
    </ChartSvg>
  );
}

const ChartSvg = styled.svg`
  width: 100%;
  height: 210px;

  line {
    stroke: rgba(20, 33, 23, 0.09);
    stroke-width: 1;
  }

  polygon {
    fill: rgba(47, 158, 104, 0.12);
  }

  polyline {
    fill: none;
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  circle {
    fill: ${({ theme }) => theme.colors.accentStrong};
    stroke: #ffffff;
    stroke-width: 4;
  }
`;
