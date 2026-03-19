# 스마트 공정 설비 Agent

Next.js **15.3.2** App Router와 **styled-components**, **TypeScript(.tsx / .ts)** 기준으로 구성한 스마트 공정 설비 모니터링 대시보드입니다.

## 포함된 화면

- 실시간 알람 대응
- 문제 원인 분석
- 개선 Ideation
- 보전계획 수립
- 설정 · 알람 매니저

## 이번 수정 반영 내용

- `.jsx / .js` 파일을 `.tsx / .ts`로 전환
- `next: 15.3.2`, `react: ^19.0.0`, `react-dom: ^19.0.0` 기준으로 package 설정 변경
- Today’s Alarm 클릭 시 **선택된 알람 보고서가 즉시 교체**되도록 정리
- 선택된 알람의 제목/요약/핵심 정보가 상단 보고서 헤더에 크게 반영되도록 수정
- 각 섹션의 **검색 / 질문하기** 버튼 클릭 시 하단 검색 UI가 열리도록 정리
- 검색 UI는 **아래에서 상승**, 엔터 입력 시 **3초 로딩 후 자동 종료**
- 검색 시트는 `portal` 방식으로 렌더링되도록 변경해 UI 겹침 영향을 줄임
- 실시간 알람 대응 페이지는 `ssr: false` 동적 로딩으로 바꿔 클라이언트 상호작용 위주로 동작하도록 정리

## 실행 방법

```bash
npm install
npm run dev
```

기본 진입 시 `/realtime-alerts`로 이동합니다.
"# smart-factory-agent" 
