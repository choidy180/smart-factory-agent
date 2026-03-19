// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import {
  ArrowRightIcon,
  CloseIcon,
  SearchIcon,
  SparkIcon
} from '@/components/icons/AppIcons';

export default function SearchAssistantSheet({
  open,
  onClose,
  alarm,
  sectionLabel = '전체 보고서'
}) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !mounted) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, open]);

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setQuery('');

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      return undefined;
    }

    const focusTimer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 180);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuery();
  };

  const handleTextareaKeyDown = (event) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitQuery();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (loading) {
      return;
    }

    setQuery(suggestion);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  if (!open || !mounted) {
    return null;
  }

  const sheetContent = (
    <Backdrop
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Handle />
        <PanelHeader>
          <PanelTitleWrap>
            <PanelEyebrow>
              <SparkIcon size={16} />
              {sectionLabel}
            </PanelEyebrow>
            <PanelTitle id="agent-sheet-title">
              검색 또는 질문 내용을 입력하세요
            </PanelTitle>
            <PanelDescription>
              아래에서 올라오는 검색 UI입니다. 현재 검색 기능은 연결되어 있지 않으며, 엔터를 누르면 3초 동안 로딩 후 자동으로 닫힙니다.
            </PanelDescription>
          </PanelTitleWrap>

          <CloseButton
            type="button"
            aria-label="닫기"
            onClick={onClose}
            disabled={loading}
          >
            <CloseIcon />
          </CloseButton>
        </PanelHeader>

        <AlarmContextCard>
          <AlarmContextEyebrow>선택된 알람</AlarmContextEyebrow>
          <AlarmContextTitle>{alarm.title}</AlarmContextTitle>
          <AlarmContextMeta>
            <span>{alarm.equipment}</span>
            <Dot />
            <span>{alarm.occurredAt}</span>
            <Dot />
            <span>{alarm.reason}</span>
          </AlarmContextMeta>
        </AlarmContextCard>

        <SuggestionTitle>바로 물어보기</SuggestionTitle>
        <SuggestionList>
          {alarm.prompts.map((prompt) => (
            <SuggestionChip
              key={prompt}
              type="button"
              onClick={() => handleSuggestionClick(prompt)}
              disabled={loading}
            >
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

              <SubmitButton
                type="submit"
                disabled={!query.trim() || loading}
              >
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
    </Backdrop>
  );

  return createPortal(sheetContent, document.body);
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
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(12px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const Panel = styled.div`
  width: min(820px, 100%);
  max-height: min(88vh, 860px);
  overflow-y: auto;
  padding: 18px 20px 22px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 32px 80px rgba(15, 27, 18, 0.22);
  animation: ${sheetUp} 0.28s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-height: 92vh;
    padding: 14px 14px 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Handle = styled.div`
  width: 54px;
  height: 6px;
  margin: 0 auto 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.borderStrong};
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const PanelTitleWrap = styled.div`
  flex: 1;
`;

const PanelEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 12px;
  font-weight: 700;
`;

const PanelTitle = styled.h2`
  margin: 18px 0 8px;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.2;
`;

const PanelDescription = styled.p`
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
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const AlarmContextCard = styled.div`
  margin-top: 22px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: linear-gradient(
    135deg,
    rgba(47, 158, 104, 0.1) 0%,
    rgba(47, 158, 104, 0.02) 100%
  );
  border: 1px solid rgba(47, 158, 104, 0.18);
`;

const AlarmContextEyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentStrong};
`;

const AlarmContextTitle = styled.h3`
  margin: 10px 0 8px;
  font-size: 20px;
  line-height: 1.4;
`;

const AlarmContextMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.textSoft};
`;

const SuggestionTitle = styled.h4`
  margin: 24px 0 12px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const SuggestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SuggestionChip = styled.button`
  padding: 12px 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.shadows.panel};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};

  &:hover {
    transform: translateY(-1px);
    box-shadow:
      inset 0 0 0 1px ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.shadows.card};
  }
`;

const Form = styled.form`
  margin-top: 18px;
`;

const InputShell = styled.div`
  padding: 18px;
  border-radius: 26px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.96) 0%,
    rgba(246, 250, 247, 0.98) 100%
  );
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.shadows.card};
  border: 1px solid
    ${({ $loading, theme }) => (
      $loading ? 'rgba(47, 158, 104, 0.28)' : 'rgba(255, 255, 255, 0.4)'
    )};
`;

const InputTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputIconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
`;

const InputTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 146px;
  margin-top: 14px;
  padding: 4px 0 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  line-height: 1.7;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSoft};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 120px;
    font-size: 16px;
  }
`;

const InputFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputHint = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.6;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 136px;
  min-height: 52px;
  padding: 0 18px;
  border-radius: 18px;
  background: ${({ disabled, theme }) => (
    disabled ? theme.colors.neutralSoft : theme.colors.text
  )};
  color: ${({ disabled, theme }) => (
    disabled ? theme.colors.textSoft : theme.colors.surface
  )};
  font-size: 15px;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:not(:disabled):hover {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const LoadingDots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  span {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: currentColor;
    animation: ${dots} 1.2s infinite ease-in-out;
  }

  span:nth-child(2) {
    animation-delay: 0.16s;
  }

  span:nth-child(3) {
    animation-delay: 0.32s;
  }
`;
