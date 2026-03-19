export const mockAlarms = [
  {
    id: 'alarm-case-extruder-01',
    title: 'Case발포 취출기 상하 동작 이상 감지',
    equipment: 'Case발포 취출기',
    line: '라인 02 · 셀 A',
    occurredAt: '2026년 2월 3일 14:12',
    timeLabel: '14:12',
    severity: 'HIGH',
    reason: 'PIE 진동센서 이상감지',
    summary: '상하 스트로크 반복 구간에서 진동 값이 기준 대비 28% 상승했고, 2회 연속 모터 응답 지연이 확인되었습니다.',
    aiSummary: '타이밍 벨트 장력 저하와 서보 모터 커플링 유격 가능성이 가장 높습니다.',
    status: '즉시 현장 확인 필요',
    eta: '12분',
    healthScore: 37,
    confidence: 91,
    similarCases: 8,
    location: 'Y/D/C/S/D/S/C/ZD',
    trend: [
      26, 31, 38, 49, 62, 77, 83, 86, 82, 88, 84, 79, 85, 87, 81, 76, 69, 52, 41, 36
    ],
    metrics: [
      {
        label: 'PIE 진동',
        value: '+28%',
        tone: 'critical'
      },
      {
        label: '모터 응답',
        value: '-14%',
        tone: 'warning'
      },
      {
        label: '온도',
        value: '63℃',
        tone: 'info'
      },
      {
        label: 'Health',
        value: '37 / 100',
        tone: 'critical'
      }
    ],
    mapNodes: [
      {
        label: '투입',
        x: 12,
        y: 28,
        state: 'normal'
      },
      {
        label: '가이드',
        x: 27,
        y: 52,
        state: 'normal'
      },
      {
        label: '상하축',
        x: 56,
        y: 34,
        state: 'warning'
      },
      {
        label: '취출기',
        x: 74,
        y: 58,
        state: 'alert'
      },
      {
        label: '배출',
        x: 89,
        y: 41,
        state: 'normal'
      }
    ],
    rootCauses: [
      {
        title: '타이밍 벨트 장력 저하',
        score: 91,
        detail: '상하 반복 주기에서 진동 피크가 연속적으로 높아지는 패턴이 일치합니다.'
      },
      {
        title: '서보 모터 커플링 유격',
        score: 84,
        detail: '모터 응답 딜레이와 미세한 속도 편차가 함께 발생했습니다.'
      },
      {
        title: 'PIE 센서 고정 불량',
        score: 71,
        detail: '센서 자체의 노이즈 가능성도 있으나 현재는 3순위로 판단됩니다.'
      }
    ],
    immediateActions: [
      '취출기 상부 가이드 레일과 벨트 장력 상태를 우선 확인합니다.',
      '라인 속도를 10~15% 감속해 추가 충격 확산을 방지합니다.',
      '서보 모터 커넥터 체결 및 진동센서 고정 볼트를 재점검합니다.'
    ],
    guideSteps: [
      {
        title: '반복 속도 감속',
        detail: '라인 속도를 15% 줄여 이상 진동이 확대되지 않도록 먼저 안정화합니다.'
      },
      {
        title: '벨트 장력 확인',
        detail: '타이밍 벨트의 처짐과 편마모 여부를 체크하고 기준값과 비교합니다.'
      },
      {
        title: '서보 축 유격 확인',
        detail: '모터와 축 연결부의 백래시를 확인하고 필요 시 커플링을 교체합니다.'
      }
    ],
    references: [
      {
        title: '서보 모터 교환 사례',
        subtitle: 'Y/D/C/S/D/S/C/ZD',
        category: '유사 케이스',
        summary: '취출기 상하축 떨림이 커플링 마모에서 시작된 사례입니다.'
      },
      {
        title: '상하축 타이밍 벨트 장력 조정 가이드',
        subtitle: '점검 매뉴얼',
        category: '가이드',
        summary: '벨트 장력 측정 포인트와 감속 운전 조건을 요약합니다.'
      },
      {
        title: 'PIE 진동센서 재고정 체크포인트',
        subtitle: '설비 표준',
        category: '표준 작업',
        summary: '센서 브라켓 체결 순서와 허용 오차 범위를 포함합니다.'
      }
    ],
    history: [
      {
        date: '2024년 11월 5일',
        title: '서보 진동 상승',
        summary: '커플링 유격으로 인해 상하축 진동이 일시적으로 상승했던 이력이 있습니다.'
      },
      {
        date: '2024년 9월 26일',
        title: '타이밍 벨트 편마모',
        summary: '벨트 장력 저하와 편마모가 함께 확인되어 교체 조치가 이뤄졌습니다.'
      },
      {
        date: '2024년 7월 10일',
        title: '서보 모터 과부하 알림',
        summary: '냉각팬 오염으로 인해 부하가 증가한 사례로, 현재 패턴과 일부 유사성이 있습니다.'
      }
    ],
    prompts: [
      '상하 스트로크 이상과 가장 관련 깊은 부품을 다시 정리해줘',
      '현재 알람 기준으로 현장 점검 순서를 간단히 알려줘',
      '이와 유사한 과거 고장 이력 3건을 요약해줘'
    ]
  },
  {
    id: 'alarm-case-conveyor-02',
    title: 'Case발포 취출기 이송구간 속도 편차 이상',
    equipment: 'Case발포 취출기',
    line: '라인 02 · 셀 B',
    occurredAt: '2026년 2월 3일 14:27',
    timeLabel: '14:27',
    severity: 'MEDIUM',
    reason: '모터 속도 피드백 이상감지',
    summary: '이송 컨베이어의 피드백 속도가 기준보다 8~11% 흔들리며 제품 간 간격 편차가 증가하고 있습니다.',
    aiSummary: '컨베이어 모터 엔코더 오염과 벨트 장력 편차를 우선 확인하는 편이 좋습니다.',
    status: '생산 품질 영향 주의',
    eta: '25분',
    healthScore: 62,
    confidence: 83,
    similarCases: 5,
    location: '라인 02 / 이송 컨베이어',
    trend: [
      42, 45, 49, 53, 58, 61, 65, 69, 64, 63, 66, 61, 60, 58, 57, 55, 54, 52, 50, 48
    ],
    metrics: [
      {
        label: '속도 편차',
        value: '11%',
        tone: 'warning'
      },
      {
        label: '엔코더 잡음',
        value: '+7%',
        tone: 'warning'
      },
      {
        label: '장력 편차',
        value: '중간',
        tone: 'info'
      },
      {
        label: 'Health',
        value: '62 / 100',
        tone: 'warning'
      }
    ],
    mapNodes: [
      {
        label: '공급',
        x: 10,
        y: 36,
        state: 'normal'
      },
      {
        label: '검사',
        x: 33,
        y: 29,
        state: 'normal'
      },
      {
        label: '이송',
        x: 56,
        y: 47,
        state: 'alert'
      },
      {
        label: '배출',
        x: 84,
        y: 62,
        state: 'normal'
      }
    ],
    rootCauses: [
      {
        title: '컨베이어 벨트 장력 편차',
        score: 83,
        detail: '속도 리플이 일정 주기로 반복돼 벨트 장력 영향 가능성이 큽니다.'
      },
      {
        title: '엔코더 오염',
        score: 78,
        detail: '피드백 노이즈가 구간별로 튀는 패턴이 확인됩니다.'
      },
      {
        title: '감속기 윤활 저하',
        score: 63,
        detail: '장시간 운전 후 편차가 커지는 경향이 있어 후보에 포함됩니다.'
      }
    ],
    immediateActions: [
      '속도 피드백 파형을 5분 이상 추적하여 반복 주기를 확인합니다.',
      '벨트 장력과 풀리 정렬 상태를 점검합니다.',
      '엔코더 센서 표면 오염 여부를 확인하고 청소합니다.'
    ],
    guideSteps: [
      {
        title: '속도 기준값 재확인',
        detail: '정상품과 비교해 기준 속도 및 간격 허용치를 재확인합니다.'
      },
      {
        title: '벨트 정렬 점검',
        detail: '풀리와 가이드 롤러의 정렬 상태, 편마모를 확인합니다.'
      },
      {
        title: '엔코더 청소 및 재측정',
        detail: '오염 제거 후 피드백 값이 안정되는지 재측정합니다.'
      }
    ],
    references: [
      {
        title: '컨베이어 엔코더 노이즈 사례',
        subtitle: '품질 편차 이슈',
        category: '유사 케이스',
        summary: '엔코더 표면 오염으로 제품 간격 불량이 발생했던 사례입니다.'
      },
      {
        title: '벨트 장력 점검 체크리스트',
        subtitle: '정기 점검표',
        category: '체크리스트',
        summary: '장력 기준값과 허용 오차를 한 번에 확인할 수 있습니다.'
      },
      {
        title: '이송 컨베이어 재정렬 가이드',
        subtitle: '정비 매뉴얼',
        category: '가이드',
        summary: '가이드 롤러와 풀리 재정렬 순서를 담고 있습니다.'
      }
    ],
    history: [
      {
        date: '2024년 12월 1일',
        title: '이송부 간격 편차',
        summary: '벨트 처짐으로 제품 간격이 벌어져 속도 보정이 필요했던 사례입니다.'
      },
      {
        date: '2024년 8월 13일',
        title: '엔코더 오염',
        summary: '오염 제거 후 속도 피드백이 정상 범위로 복귀했습니다.'
      },
      {
        date: '2024년 6월 2일',
        title: '감속기 윤활 경고',
        summary: '윤활 부족으로 구간별 속도 편차가 커졌던 기록입니다.'
      }
    ],
    prompts: [
      '속도 편차가 품질에 미치는 영향을 한 줄로 정리해줘',
      '컨베이어 점검 순서를 5단계로 알려줘',
      '벨트와 엔코더 중 무엇을 먼저 봐야 할지 정리해줘'
    ]
  },
  {
    id: 'alarm-servo-ripple-03',
    title: 'Servo 구동축 전류 리플 증가',
    equipment: 'Servo 구동 모듈',
    line: '라인 01 · 셀 C',
    occurredAt: '2026년 2월 3일 13:58',
    timeLabel: '13:58',
    severity: 'MEDIUM',
    reason: '전류 파형 리플 증가',
    summary: '구동축 전류 파형이 기준치보다 넓어지며 반복 구간에서 잔떨림이 동반되고 있습니다.',
    aiSummary: '베어링 마찰 증가 또는 구동축 정렬 불량 가능성이 보입니다.',
    status: '점검 예약 권장',
    eta: '40분',
    healthScore: 68,
    confidence: 79,
    similarCases: 4,
    location: '라인 01 / Servo 구동부',
    trend: [
      31, 32, 34, 37, 39, 43, 47, 52, 57, 61, 59, 58, 56, 54, 51, 47, 44, 41, 39, 36
    ],
    metrics: [
      {
        label: '전류 리플',
        value: '+16%',
        tone: 'warning'
      },
      {
        label: '축 정렬',
        value: '주의',
        tone: 'warning'
      },
      {
        label: '온도',
        value: '58℃',
        tone: 'info'
      },
      {
        label: 'Health',
        value: '68 / 100',
        tone: 'info'
      }
    ],
    mapNodes: [
      {
        label: '입력',
        x: 16,
        y: 42,
        state: 'normal'
      },
      {
        label: 'Servo',
        x: 52,
        y: 48,
        state: 'alert'
      },
      {
        label: '출력',
        x: 82,
        y: 36,
        state: 'normal'
      }
    ],
    rootCauses: [
      {
        title: '구동축 정렬 불량',
        score: 79,
        detail: '전류 리플 증가와 미세 떨림이 동시 발생하는 전형적인 패턴입니다.'
      },
      {
        title: '베어링 마찰 증가',
        score: 74,
        detail: '온도 상승이 크지 않아 2순위로 판단되지만 후보에서 제외되지는 않습니다.'
      },
      {
        title: '인버터 파라미터 편차',
        score: 58,
        detail: '설정값 변동 가능성이 낮지만 최근 업데이트 이력은 확인이 필요합니다.'
      }
    ],
    immediateActions: [
      '구동축 정렬 게이지 측정값을 확인합니다.',
      '베어링 소음과 진동을 함께 점검합니다.',
      '인버터 파라미터 변경 이력이 있는지 확인합니다.'
    ],
    guideSteps: [
      {
        title: '정렬 상태 측정',
        detail: '레이저 정렬 장비로 오프셋과 각도 편차를 확인합니다.'
      },
      {
        title: '베어링 상태 진단',
        detail: '소음, 온도, 회전 저항을 함께 체크해 마찰 증가 여부를 판단합니다.'
      },
      {
        title: '설정값 비교',
        detail: '최근 백업값과 현재 인버터 파라미터를 비교합니다.'
      }
    ],
    references: [
      {
        title: 'Servo 축 정렬 불량 사례',
        subtitle: '진동 이슈',
        category: '유사 케이스',
        summary: '축 정렬 오프셋이 전류 리플 증가로 이어진 사례입니다.'
      },
      {
        title: '베어링 마찰 점검 가이드',
        subtitle: '정비 가이드',
        category: '가이드',
        summary: '마찰 증가 초기 신호와 점검 순서를 담고 있습니다.'
      },
      {
        title: '인버터 파라미터 검증 절차',
        subtitle: '표준 문서',
        category: '표준 작업',
        summary: '설정값 확인 및 롤백 절차를 정리했습니다.'
      }
    ],
    history: [
      {
        date: '2024년 10월 4일',
        title: '축 정렬 조정',
        summary: '정렬 오프셋 0.6mm 조정 후 리플이 정상화된 기록입니다.'
      },
      {
        date: '2024년 8월 22일',
        title: '베어링 윤활 부족',
        summary: '윤활 부족으로 마찰이 증가했던 사례입니다.'
      },
      {
        date: '2024년 3월 17일',
        title: '인버터 파라미터 변경',
        summary: '속도 응답 튜닝 변경 후 리플이 증가했다가 복원한 이력이 있습니다.'
      }
    ],
    prompts: [
      '전류 리플 증가 시 점검해야 할 부품만 추려줘',
      '축 정렬 불량과 베어링 마찰을 구분하는 방법을 알려줘',
      '이 알람을 예방 보전 과제로 바꾸면 어떤 항목이 필요할까'
    ]
  },
  {
    id: 'alarm-air-pressure-04',
    title: 'Pneumatic 압력 드리프트 감지',
    equipment: '에어 매니폴드',
    line: '라인 03 · 셀 D',
    occurredAt: '2026년 2월 3일 13:21',
    timeLabel: '13:21',
    severity: 'LOW',
    reason: '압력 유지 편차 증가',
    summary: '에어 매니폴드 압력이 장시간 운전 시 천천히 떨어지며 실린더 응답 편차가 미세하게 늘고 있습니다.',
    aiSummary: '레귤레이터 편차 또는 미세 누설 가능성을 점검하면 좋습니다.',
    status: '정기 점검 시 확인',
    eta: '90분',
    healthScore: 81,
    confidence: 72,
    similarCases: 3,
    location: '라인 03 / 에어 매니폴드',
    trend: [
      78, 77, 76, 77, 76, 75, 74, 75, 74, 73, 72, 72, 71, 71, 70, 69, 69, 68, 68, 67
    ],
    metrics: [
      {
        label: '압력 편차',
        value: '3.8%',
        tone: 'info'
      },
      {
        label: '실린더 응답',
        value: '-4%',
        tone: 'info'
      },
      {
        label: '누설 가능성',
        value: '중간',
        tone: 'warning'
      },
      {
        label: 'Health',
        value: '81 / 100',
        tone: 'info'
      }
    ],
    mapNodes: [
      {
        label: '레귤레이터',
        x: 18,
        y: 43,
        state: 'warning'
      },
      {
        label: '매니폴드',
        x: 53,
        y: 51,
        state: 'alert'
      },
      {
        label: '실린더',
        x: 81,
        y: 34,
        state: 'normal'
      }
    ],
    rootCauses: [
      {
        title: '미세 누설',
        score: 72,
        detail: '장시간 운전 후 압력이 천천히 떨어지는 패턴이 일치합니다.'
      },
      {
        title: '레귤레이터 편차',
        score: 69,
        detail: '조정 다이얼의 편차 또는 노후화 영향 가능성이 있습니다.'
      },
      {
        title: '필터 막힘',
        score: 54,
        detail: '응답 저하가 크지 않아 우선순위는 낮지만 점검 가치가 있습니다.'
      }
    ],
    immediateActions: [
      '레귤레이터 설정값과 실제 압력 값을 비교합니다.',
      '누설음 여부와 연결부 체결 상태를 확인합니다.',
      '정기 점검 시 필터 상태를 함께 점검합니다.'
    ],
    guideSteps: [
      {
        title: '압력 기준값 확인',
        detail: '라인 기준 압력과 현재 값을 비교해 편차를 재측정합니다.'
      },
      {
        title: '연결부 누설 점검',
        detail: '연결부와 밸브 주변에 미세 누설 흔적이 있는지 확인합니다.'
      },
      {
        title: '필터 청결도 점검',
        detail: '필터 오염과 수분 축적 여부를 확인합니다.'
      }
    ],
    references: [
      {
        title: '매니폴드 미세 누설 사례',
        subtitle: '에어 응답 지연',
        category: '유사 케이스',
        summary: '실린더 응답 지연이 연결부 누설에서 시작된 사례입니다.'
      },
      {
        title: '레귤레이터 점검 포인트',
        subtitle: '표준 점검표',
        category: '체크리스트',
        summary: '압력 설정과 응답 안정성을 빠르게 점검하는 체크포인트입니다.'
      },
      {
        title: '필터 교체 기준',
        subtitle: '정비 기준서',
        category: '표준 작업',
        summary: '필터 교체 주기와 교체 후 점검 항목을 정리했습니다.'
      }
    ],
    history: [
      {
        date: '2024년 12월 19일',
        title: '매니폴드 압력 저하',
        summary: '연결부 체결 보완 후 압력 드리프트가 해소되었습니다.'
      },
      {
        date: '2024년 7월 29일',
        title: '레귤레이터 재조정',
        summary: '설정값 편차를 교정하고 응답 편차가 개선되었습니다.'
      },
      {
        date: '2024년 4월 7일',
        title: '필터 오염 경고',
        summary: '필터 내부 수분 축적으로 응답 지연이 발생한 사례입니다.'
      }
    ],
    prompts: [
      '압력 드리프트가 바로 위험한 상황인지 판단해줘',
      '레귤레이터와 누설 중 어떤 쪽이 더 의심되는지 알려줘',
      '정기 점검 시 확인해야 할 항목만 체크리스트로 정리해줘'
    ]
  }
];
