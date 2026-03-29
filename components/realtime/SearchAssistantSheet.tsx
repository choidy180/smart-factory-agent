'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import {
  ArrowRightIcon,
  CloseIcon,
  SearchIcon,
  SparkIcon
} from '@/components/icons/AppIcons';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { Alarm } from '@/types/alarm';

interface SearchAssistantSheetProps {
  open: boolean;
  onClose: () => void;
  alarm: Alarm;
  sectionLabel?: string;
}

export default function SearchAssistantSheet({
  open,
  onClose,
  alarm,
  sectionLabel = '전체 보고서'
}: SearchAssistantSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useLockBodyScroll(mounted && open);

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setQuery('');

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    const focusTimer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 180);

    const handleKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && !loading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [loading, onClose, open]);

  const submitQuery = () => {
    if (!query.trim() || loading) {
      return;
    }

    setLoading(true);

    timerRef.current = setTimeout(() => {
      setLoading(false);
      setQuery('');
      onClose();
      timerRef.current = null;
    }, 3000);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuery();
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitQuery();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (loading) {
      return;
    }

    setQuery(suggestion);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <Backdrop
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <Panel role="dialog" aria-modal="true" aria-labelledby="assistant-sheet-title" onClick={(event) => event.stopPropagation()}>
        <Handle />

        <Header>
          <TitleGroup>
            <Eyebrow>
              <SparkIcon size={20} />
              {sectionLabel}
            </Eyebrow>
            <Title id="assistant-sheet-title">검색 또는 질문 내용을 입력하세요</Title>
            <Description>
              아래에서 올라오는 검색 UI입니다. 현재 검색 기능은 연결되어 있지 않으며, 엔터를 누르면 3초 동안 로딩 후 자동으로 닫힙니다.
            </Description>
          </TitleGroup>

          <CloseButton type="button" aria-label="닫기" onClick={onClose} disabled={loading}>
            <CloseIcon />
          </CloseButton>
        </Header>

        <ContextCard>
          <ContextEyebrow>선택된 알람</ContextEyebrow>
          <ContextTitle>{alarm.title}</ContextTitle>
          <ContextMeta>
            <span>{alarm.equipment}</span>
            <MetaDot />
            <span>{alarm.occurredAt}</span>
            <MetaDot />
            <span>{alarm.reason}</span>
          </ContextMeta>
        </ContextCard>

        <SuggestionTitle>바로 물어보기</SuggestionTitle>
        <SuggestionList>
          {alarm.prompts.map((prompt) => (
            <SuggestionChip key={prompt} type="button" onClick={() => handleSuggestionClick(prompt)} disabled={loading}>
              {prompt}
            </SuggestionChip>
          ))}
        </SuggestionList>

        <Form onSubmit={handleSubmit}>
          <InputShell $loading={loading}>
            <InputTopRow>
              <InputIconWrap>
                <SearchIcon size={18} />
              </InputIconWrap>
              <InputTitle>Agent에게 상황 설명하기</InputTitle>
            </InputTopRow>

            <Textarea
              ref={textareaRef}
              placeholder={`예) ${sectionLabel} 기준으로 가장 먼저 확인해야 할 점검 항목을 알려줘`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleTextareaKeyDown}
              enterKeyHint="search"
              aria-label="검색 또는 질문 입력"
              disabled={loading}
            />

            <InputFooter>
              <InputHint>
                {loading
                  ? '설비 상태를 정리하는 중입니다...'
                  : '엔터를 누르면 3초 로딩 애니메이션 후 시트가 자동으로 닫힙니다.'}
              </InputHint>

              <SubmitButton type="submit" disabled={!query.trim() || loading}>
                {loading ? (
                  <>
                    <LoadingDots>
                      <span />
                      <span />
                      <span />
                    </LoadingDots>
                    분석 중
                  </>
                ) : (
                  <>
                    전송
                    <ArrowRightIcon size={16} />
                  </>
                )}
              </SubmitButton>
            </InputFooter>
          </InputShell>
        </Form>
      </Panel>
    </Backdrop>,
    document.body
  );
}

const dots = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0.55);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const sheetUp = keyframes`
  from {
    transform: translateY(28px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 24px;
  background: rgba(11, 18, 13, 0.52);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const Panel = styled.div`
  width: min(880px, 100%);
  max-height: min(88vh, 860px);
  padding: 20px 20px 24px;
  border-radius: 28px 28px 0 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 -24px 64px rgba(15, 27, 18, 0.2);
  overflow-y: auto;
  animation: ${sheetUp} 0.24s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-height: 88vh;
    padding: 18px 16px 24px;
  }
`;

const Handle = styled.div`
  width: 68px;
  height: 5px;
  margin: 0 auto 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.borderStrong};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const TitleGroup = styled.div`
  min-width: 0;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 18px;
  font-weight: 800;
`;

const Title = styled.h2`
  margin: 16px 0 8px;
  font-size: clamp(24px, 3vw, 30px);
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`;

const ContextCard = styled.div`
  margin-top: 20px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceSoft};
`;

const ContextEyebrow = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const ContextTitle = styled.h3`
  margin: 10px 0 8px;
  font-size: 20px;
  line-height: 1.4;
`;

const ContextMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  font-weight: 600;
`;

const MetaDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.textSoft};
`;

const SuggestionTitle = styled.h4`
  margin: 22px 0 12px;
  font-size: 20px;
`;

const SuggestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SuggestionChip = styled.button`
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Form = styled.form`
  margin-top: 20px;
`;

const InputShell = styled.div<{ $loading: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme, $loading }) => ($loading ? theme.shadows.hover : theme.shadows.panel)};
`;

const InputTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
`;

const InputTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Textarea = styled.textarea`
  min-height: 150px;
  padding: 0;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  line-height: 1.8;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

const InputFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputHint = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 18px;
  line-height: 1.6;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 124px;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const LoadingDots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
    animation: ${dots} 1s ease-in-out infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.15s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`;
