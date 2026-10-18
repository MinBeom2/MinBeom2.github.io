export const aiPractice = {
  "title": "AI와 개발하고 코드는 직접 읽습니다",
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

export const aiLearning = {
  "title": "코딩테스트 연습 관리",
  "intro": "코딩테스트를 오래 쉬었다가 다시 준비하면서, 풀이와 복습을 이어가기 위해 만든 Java 학습 저장소입니다. 문제는 직접 풀고 AI는 추천, 리뷰, 학습 기록과 복습 관리를 돕습니다.",
  "steps": [
    {
      "title": "직접 풀이",
      "description": "문제는 먼저 직접 풉니다. 요청하기 전에는 AI가 힌트나 풀이를 제시하지 않도록 규칙을 정했습니다."
    },
    {
      "title": "풀이 리뷰",
      "description": "AI와 풀이의 정확성, 시간과 공간 복잡도, Java 문법과 대안 풀이를 검토합니다. 리뷰 뒤에는 이해 확인 질문을 받습니다."
    },
    {
      "title": "기록과 복습",
      "description": "풀이 방식과 실수, 개념을 저장소에 기록하고 풀이를 마친 날을 기준으로 1일, 3일, 7일 뒤 복습을 관리합니다. 새 대화에서도 기록을 읽고 학습을 이어갑니다."
    }
  ],
  "linkLabel": "학습 규칙과 기록 보기",
  "repository": "https://github.com/MinBeom2/coding-test"
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
      "title": "즉시 알림",
      "note": "분석 완료 후"
    },
    {
      "priority": "P1, P2",
      "title": "오전 9시 요약",
      "note": "한국 시간 기준"
    }
  ],
  "learningSummary": "코딩테스트를 오래 쉬었다가 다시 준비하며 만든 Java 학습 저장소입니다.",
  "learningStages": [
    {
      "title": "직접 풀이",
      "note": "Java"
    },
    {
      "title": "AI 리뷰",
      "note": "이해 확인"
    },
    {
      "title": "기록",
      "note": "학습 저장소"
    }
  ],
  "scheduleOrigin": "풀이 완료일 기준 복습 일정",
  "reviewDays": [
    1,
    3,
    7
  ]
} as const
