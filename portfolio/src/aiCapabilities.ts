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
