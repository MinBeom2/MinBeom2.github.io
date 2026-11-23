export const aiFeedback = {
  title: '피드백 AI 분석과 실패 복구',
  decision: 'n8n에서 분석하던 흐름을 백엔드로 옮겨 실패 상태, 시도 횟수와 원인을 DB에 남겼습니다. 중단된 분석과 미전송 P0 알림은 복구 스케줄러가 다시 처리합니다. n8n은 Notion 동기화에 사용합니다.',
  stages: [
    { title: '피드백 저장', note: 'MySQL' },
    { title: 'AI 분석', note: '커밋 후 비동기' },
    { title: '분석이 끊기면 복구', note: '스케줄러 재시도' },
  ],
  priorities: [
    { name: 'P0', description: '분석이 끝나면 Discord로 즉시 알립니다.' },
    { name: 'P1, P2', description: '매일 오전 9시(한국 시간)에 모아 Discord로 알립니다.' },
  ],
  timeline: [
    {
      date: '9/10',
      dateTime: '2026-09-10',
      title: '피드백 제출 API',
      description: '로그인 사용자가 버그, 기능 제안, 일반 의견 중 하나를 골라 10~3,000자의 피드백을 남깁니다.',
    },
    {
      date: '9/18',
      dateTime: '2026-09-18',
      title: '서버 상태 알림',
      description: 'Actuator로 서버 상태를 1분마다 확인하고 장애가 난 구성 요소를 Discord로 알립니다.',
    },
    {
      date: '9/26',
      dateTime: '2026-09-26',
      title: 'n8n 기반 초기 분류',
      description: '저장 커밋 후 n8n에서 비동기로 분석하고, 중요도에 따라 알림 시점을 나눴습니다.',
    },
    {
      date: '9/28',
      dateTime: '2026-09-28',
      title: 'OpenAI 호출을 백엔드로 이동',
      description: '중요도와 요약을 JSON 스키마로 받고, 실패 원인과 시도 횟수를 기록했습니다.',
    },
    {
      date: '10/3',
      dateTime: '2026-10-03',
      title: 'Notion 동기화',
      description: 'n8n이 인증된 내부 API에서 피드백을 가져와 Notion에 기록하고 결과를 백엔드에 알립니다.',
    },
  ],
  note: '로컬 개발 단계에서 구현했습니다. 실제 피드백 처리 건수와 분류 정확도는 측정하지 않았습니다.',
} as const
