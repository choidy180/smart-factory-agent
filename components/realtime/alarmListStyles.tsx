import styled from 'styled-components';
import { SeverityTag, StatusBadge, StatusDot } from '@/components/realtime/reportPrimitives';

export { StatusBadge, StatusDot, SeverityTag };

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SectionEyebrow = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
`;

export const BoardSummaryRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const BoardSummaryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
`;

export const BoardSummaryText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 18px;
  font-weight: 700;
`;

export const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns:
    118px minmax(260px, 1.4fr) 140px 180px 96px minmax(180px, 1fr) 70px;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.02em;
`;

export const TableRows = styled.div``;

export const TableColumn = styled.div<{ $width: string }>`
  min-width: 0;
`;

export const RowTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const RowPlainText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.5;
`;

export const RowActionText = styled.div`
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 13px;
  font-weight: 700;
`;
