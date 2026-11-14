export const aiPractice = {
  "title": "AI와 개발합니다",
  "intro": "요구사항을 정리하고 설계 대안을 비교할 때 AI를 활용합니다. 구현 과정에서는 코드의 흐름, 구현 방식, 변경 파일을 직접 살핍니다.",
  "reviews": [
    {
      "title": "코드의 흐름",
      "description": "AI가 작성한 코드는 직접 읽습니다. 전체 처리 흐름을 먼저 파악하고 세부 로직의 역할과 의도를 짚어봅니다."
    },
    {
      "title": "구현 방식",
      "description": "더 단순한 방법이 있는지 검토합니다. 불필요하게 복잡하거나 돌아가는 구현은 수정하도록 요청하고 최종 방향은 직접 결정합니다."
    },
    {
      "title": "변경 파일",
      "description": "커밋 전에 변경 파일과 스테이징 목록을 확인합니다. 비밀정보 파일이 포함되거나 요청 범위 밖의 변경이 섞이지 않았는지 살핍니다."
    }
  ],
  "linkLabel": "SteamFolder의 AI 연동 사례 보기"
} as const

export const aiFeedback = {
  "title": "피드백 분류와 알림 자동화",
  "intro": "사용자 피드백을 MySQL에 먼저 저장합니다. 저장 커밋이 완료되면 AI 분석을 비동기로 실행해 중요도를 P0, P1, P2로 분류합니다.",
  "priorities": [
    {
      "name": "P0",
      "description": "분석이 끝나면 Discord Webhook으로 바로 알립니다."
    },
    {
      "name": "P1, P2",
      "description": "매일 오전 9시(한국 시간)에 모아 Discord Webhook으로 전달합니다."
    }
  ],
  "timelineTitle": "만든 순서",
  "timeline": [
    {
      "date": "9/10",
      "dateTime": "2026-09-10",
      "title": "피드백 제출 API",
      "description": "로그인한 사용자가 버그, 기능 제안, 일반 의견 중 하나를 골라 10자 이상 3,000자 이하의 피드백을 남기는 API를 만들었습니다."
    },
    {
      "date": "9/18",
      "dateTime": "2026-09-18",
      "title": "서버 상태 알림",
      "description": "Actuator로 서버 상태를 1분마다 확인하고, 상태가 나빠지면 문제가 생긴 구성 요소를 Discord로 알리도록 했습니다."
    },
    {
      "date": "9/26",
      "dateTime": "2026-09-26",
      "title": "AI 중요도 분류와 알림",
      "description": "저장이 커밋된 뒤 비동기로 분석해 P0, P1, P2로 나눴습니다. 처리 중에 멈춘 분석과 보내지 못한 P0 알림은 복구 스케줄러가 다시 처리합니다. 이때는 분석을 n8n 워크플로에서 실행했습니다."
    },
    {
      "date": "9/28",
      "dateTime": "2026-09-28",
      "title": "OpenAI 직접 호출",
      "description": "분석 호출을 백엔드로 옮겼습니다. 응답은 중요도와 요약만 담은 JSON 스키마로 받고, 피드백 안의 지시문은 따르지 않도록 지시했습니다. 실패하면 시도 횟수와 원인을 함께 저장합니다."
    },
    {
      "date": "10/3",
      "dateTime": "2026-10-03",
      "title": "n8n으로 Notion 동기화",
      "description": "n8n이 토큰으로 인증된 내부 API에서 동기화할 피드백을 가져가 Notion에 기록하고, 처리 결과를 백엔드에 알리도록 했습니다."
    }
  ],
  "decisionTitle": "분석은 백엔드에서, 외부 도구 연결은 n8n에서",
  "decision": "처음에는 n8n에서 분석을 실행했습니다. 그러자 분석이 실패했을 때 백엔드에서 실패를 추적하고 다시 시도하기 어려웠습니다. 그래서 OpenAI 호출을 백엔드로 옮겨 분석 상태, 시도 횟수, 실패 원인을 피드백과 함께 저장했습니다. n8n은 Notion 동기화처럼 외부 도구를 연결하는 데 쓰기로 했습니다. 새 도구를 붙일 때 백엔드를 크게 바꾸지 않고 워크플로를 추가해 넓혀 갈 수 있기 때문입니다.",
  "note": "로컬 개발 단계의 구현입니다. 실제 사용자 피드백 처리 건수와 AI 분류 정확도는 아직 측정하지 않았습니다.",
  "evidenceLabel": "피드백 AI 분류와 알림",
  "evidence": "FeedbackService.java, FeedbackAnalysisEventListener.java, FeedbackAnalysisService.java, FeedbackDailySummaryScheduler.java에서 저장, 커밋 후 비동기 분석, 중요도별 알림 흐름을 확인할 수 있습니다."
} as const

export const aiPresentation = {
  "reviewLabels": [
    "흐름 이해",
    "구현 방식 판단",
    "변경 파일 확인"
  ],
  "feedbackSummary": "피드백을 AI로 분류하고 중요도에 맞춰 Discord로 알립니다.",
  "feedbackStages": [
    {
      "title": "피드백 저장",
      "note": "MySQL"
    },
    {
      "title": "AI 분류",
      "note": "커밋 후 비동기"
    }
  ],
  "branches": [
    {
      "priority": "P0",
      "title": "즉시 알림"
    },
    {
      "priority": "P1, P2",
      "title": "오전 9시"
    }
  ]
} as const
