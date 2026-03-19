// @ts-nocheck
'use client';

import styled from 'styled-components';
import { ArrowRightIcon, SparkIcon } from '@/components/icons/AppIcons';

export default function SectionPreviewPage({
  eyebrow,
  title,
  description,
  highlights
}) {
  return (
    <Wrapper>
      <HeroCard>
        <Eyebrow>
          <SparkIcon size={16} />
          {eyebrow}
        </Eyebrow>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </HeroCard>

      <CardGrid>
        {highlights.map((item, index) => (
          <PreviewCard key={item}>
            <PreviewIndex>0{index + 1}</PreviewIndex>
            <PreviewTitle>{item}</PreviewTitle>
            <PreviewText>
              이 영역은 후속 기능이 들어갈 수 있도록 카드 구조와 반응형 레이아웃만 먼저 준비해 두었습니다.
            </PreviewText>
            <PreviewAction>
              상세 설계 확장 예정
              <ArrowRightIcon size={16} />
            </PreviewAction>
          </PreviewCard>
        ))}
      </CardGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeroCard = styled.section`
  padding: 34px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.accentSoft} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(47, 158, 104, 0.12);
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 20px 0 10px;
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.12;
`;

const Description = styled.p`
  margin: 0;
  max-width: 760px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  line-height: 1.7;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PreviewCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 26px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.panel};
`;

const PreviewIndex = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const PreviewTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  line-height: 1.3;
`;

const PreviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const PreviewAction = styled.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentStrong};
`;
