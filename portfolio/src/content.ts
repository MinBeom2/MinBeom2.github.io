export type ProjectId = 'ait' | 'onework' | 'steamfolder'
export type SourceLink = { label: string; url: string }

export type Project = {
  id: ProjectId
  name: string
  subtitle: string
  overview: string
  description: string
  period: string
  team: string
  role: string
  roleSummary: string
  teamDivision: { role: string; description: string }[]
  tags: string[]
  summary: string[]
  introduction: {
    goal: string
    background: string
    features: { title: string; description: string }[]
  }
  contributions: { title: string; description: string }[]
  repositories: SourceLink[]
}

export const profile = {
  name: '김민범',
  role: '백엔드 개발자',
  email: 'alsqja104@gmail.com',
  github: 'https://github.com/MinBeom2',
}

export const projects: Project[] = [
  {
    id: 'ait',
    name: 'Ait',
    subtitle: 'AI 모의 면접과 화상 스터디를 한곳에',
    overview: 'AI 모의 면접과 화상 스터디를 함께 이용하는 면접 준비 플랫폼',
    description: '이력서, 자기소개서, GitHub 자료를 활용한 면접 준비 플랫폼. 스터디 운영, 커뮤니티와 알림 백엔드를 담당했습니다.',
    period: '2026.07.06 – 08.10',
    team: 'SSAFY 6인 팀',
    role: '스터디 관리, 커뮤니티, 알림 백엔드',
    roleSummary: '백엔드 3명 중 한 명으로 스터디 운영, 커뮤니티와 알림을 담당했습니다. 그룹 가입부터 일정 관리와 실시간 대화까지 이어지는 API를 구현했습니다.',
    teamDivision: [
      { role: '백엔드 3명', description: '서버와 API 개발을 나눠 맡았습니다. 저는 스터디, 채팅, 커뮤니티와 알림을 구현했습니다.' },
      { role: '프론트엔드 2명', description: 'React 기반 서비스 화면과 API 연동을 담당했습니다.' },
      { role: 'AI 1명', description: '자료 기반 면접 질문 생성과 답변 평가 등 AI 기능을 담당했습니다.' },
    ],
    tags: ['Spring Boot', 'JPA', 'WebSocket', 'SSE', 'nGrinder'],
    summary: ['JWT와 그룹 멤버 권한을 검증하는 실시간 채팅', '부하 테스트로 조회 병목을 분석하고 개선'],
    introduction: {
      goal: '이력서, 자기소개서와 GitHub 자료를 반영한 AI 모의 면접과 화상 스터디를 한곳에서 제공하는 것을 목표로 했습니다.',
      background: '스터디 모집, 면접 연습, 평가와 소통이 따로 이루어져 면접 준비의 흐름이 나뉘는 문제에 주목했습니다. 개발자의 GitHub 자료까지 반영한 질문과 반복 연습을 함께 지원하는 서비스를 기획했습니다.',
      features: [
        { title: '자료 기반 AI 모의 면접', description: '이력서, 자기소개서와 GitHub 자료로 질문을 생성하고 답변에 따라 꼬리 질문과 피드백을 제공합니다.' },
        { title: '화상 스터디와 상호 평가', description: '스터디원과 화상으로 면접을 연습하고 서로의 답변을 평가합니다.' },
        { title: '스터디 운영과 그룹 채팅', description: '스터디 모집과 가입, 일정을 관리하고 그룹별로 대화합니다.' },
        { title: '커뮤니티와 알림', description: '면접 준비 경험을 게시글과 댓글로 공유하고 서비스 내 소식을 알림으로 받습니다.' },
      ],
    },
    contributions: [
      { title: '스터디 운영과 채팅', description: '그룹 생성, 가입 승인과 거절, 일정 API를 구현했습니다. STOMP/WebSocket 연결의 JWT 인증과 메시지 전송 전 멤버 권한 확인을 나누고 채팅 이력에 ID 커서와 Slice 조회를 적용했습니다.' },
      { title: '커뮤니티와 실시간 알림', description: '게시글, 댓글, 좋아요와 스크랩 API를 개발했습니다. 알림 목록과 읽음 처리, SSE 전송을 구현하고 배포 후 수신 문제에 대응해 8초 heartbeat와 연결 정리를 추가했습니다.' },
      { title: '조회 성능과 데이터 정합성 검증', description: 'nGrinder로 채팅 이력과 댓글 조회의 변경 전후 응답 시간을 비교했습니다. 프로젝트 종료 후에는 좋아요 수의 갱신 유실을 막도록 비관적 락을 적용했습니다. 요청 100건을 32개 스레드로 실행해 최종 좋아요 수가 100인지 확인했습니다.' },
    ],
    repositories: [{ label: '프로젝트', url: 'https://github.com/MinBeom2/Ait' }],
  },
  {
    id: 'onework',
    name: 'ONEWORK',
    subtitle: '예지보전과 품질 관제에 필요한 영상 연결',
    overview: '설비 상태와 카메라 영상을 함께 확인하는 스마트 팩토리 관제 플랫폼',
    description: '스마트 팩토리 관제 플랫폼의 MediaMTX 중심 백엔드. RTSP 영상 송출, 카메라 API와 실행과 녹화 설정을 구현했습니다.',
    period: '2026.08.18 – 09.28',
    team: 'SSAFY 6인 팀',
    role: 'MediaMTX 중심 백엔드',
    roleSummary: '카메라 영상을 관제 화면으로 전달하는 백엔드를 맡았습니다. RTSP 송출부터 MediaMTX 중계, 카메라 조회 API와 녹화 설정까지 구현했습니다.',
    teamDivision: [
      { role: '영상 관제 (본인)', description: '영상 송출과 중계, 카메라 API, 실행과 녹화 설정을 담당했습니다.' },
      { role: '다른 팀원', description: '설비 데이터 처리와 분석, 3D 디지털 트윈과 서비스 화면을 분담했습니다.' },
    ],
    tags: ['Spring Boot', 'MediaMTX', 'WebRTC', 'Docker'],
    summary: ['RTSP 영상을 MediaMTX로 중계하고 WebRTC WHEP로 전달', '카메라 API, 녹화 설정과 설비별 스트림 매핑'],
    introduction: {
      goal: '설비 이상과 공정 품질을 한곳에서 살펴보는 스마트 팩토리 관제 플랫폼을 목표로 했습니다.',
      background: '예지보전과 품질 관제를 함께 다루면서 센서 데이터의 분석 결과와 실제 설비 상태를 함께 확인해야 했습니다. 이를 위해 3D 디지털 트윈과 카메라 영상을 함께 보는 관제 환경이 필요했습니다.',
      features: [
        { title: '설비 이상 감지', description: '설비의 진동 데이터를 분석해 이상 징후를 확인합니다.' },
        { title: '품질 원인 분석', description: '공정 데이터를 분석해 품질 문제의 원인을 살펴봅니다.' },
        { title: '3D 디지털 트윈', description: '공장과 설비를 3D 화면에 표현하고 설비별 상태를 확인합니다.' },
        { title: '카메라 영상 관제', description: '설비별 카메라 영상 중계와 조회, 녹화 설정을 구현했습니다. HTTPS 환경의 영상 연동은 미해결 상태입니다.' },
      ],
    },
    contributions: [
      { title: '영상 송출과 카메라 API', description: '웹캠과 CCTV의 RTSP 영상을 MediaMTX로 받아 WebRTC WHEP로 전달하도록 구성했습니다. 송출 스크립트와 Spring Boot 카메라 API를 작성하고 설비 ID별 스트림을 연결했습니다.' },
      { title: '실행과 녹화 설정', description: 'Docker Compose 실행과 배포 구성을 연결했습니다. fMP4 녹화 경로, 보관 설정과 배포 볼륨을 구성하고 원격 설비 송출 스크립트를 보완했습니다.' },
      { title: 'Unity WebGL 연동', description: '설비 CCTV 버튼과 브라우저 영상 창을 연결했습니다. 배포본이 localhost로 API를 요청하던 문제는 페이지 주소에서 API 호스트를 계산하도록 수정했습니다.' },
    ],
    repositories: [{ label: '프로젝트', url: 'https://github.com/MinBeom2/OneWork' }],
  },
  {
    id: 'steamfolder',
    name: 'SteamFolder',
    subtitle: '내 게임 라이브러리를 정리하고 공유하기',
    overview: '보유한 Steam 게임을 폴더로 정리하고 링크로 공유하는 서비스',
    description: '보유 게임을 폴더로 정리하고 쇼케이스 링크로 공유하는 개인 서비스. 프론트엔드와 백엔드를 함께 개발하고 있습니다.',
    period: '2026.08.21 ~ 진행 중',
    team: '개인 프로젝트',
    role: '프론트엔드와 백엔드 전체 개발',
    roleSummary: '보유 게임을 정리하고 공유하고 싶다는 경험에서 시작한 개인 프로젝트입니다. 기능 기획부터 데이터 구조, API와 React 화면까지 직접 개발하고 있습니다.',
    teamDivision: [
      { role: '기획과 설계 (본인)', description: '게임 분류와 공유 흐름, 폴더 구조와 API를 설계했습니다.' },
      { role: '백엔드 (본인)', description: 'Steam 인증과 동기화, 폴더, 쇼케이스와 요청 제한 API를 개발했습니다.' },
      { role: '프론트엔드 (본인)', description: 'React와 TypeScript로 게임 배치, 폴더 탐색과 공유 화면을 구현했습니다.' },
    ],
    tags: ['React', 'TypeScript', 'Spring Boot', 'Redis'],
    summary: ['Steam 인증과 게임 동기화부터 폴더 화면까지 구현', '최대 5단계 폴더와 쇼케이스 공유'],
    introduction: {
      goal: '보유한 Steam 게임을 원하는 기준으로 정리하고 링크 하나로 다른 사람에게 보여줄 수 있는 서비스를 만들고 있습니다.',
      background: '함께 게임할 사람에게 보유 게임을 보여주려면 Steam 라이브러리 화면까지 여러 단계를 거쳐야 했습니다. 원하는 기준으로 목록을 묶어 공유하고 싶어 폴더와 쇼케이스 기능을 만들기 시작했습니다.',
      features: [
        { title: 'Steam 계정 연동', description: 'Steam으로 로그인하고 보유한 게임 목록을 동기화합니다.' },
        { title: '폴더로 게임 정리', description: '최대 5단계 폴더와 데스크톱 형태의 화면에서 게임을 배치하고 분류합니다.' },
        { title: '쇼케이스 링크 공유', description: '정리한 게임 목록을 쇼케이스로 공개하고 링크 하나로 공유합니다.' },
        { title: '좋아요와 랭킹', description: '공유한 쇼케이스에 좋아요를 남기고 랭킹을 확인합니다.' },
      ],
    },
    contributions: [
      { title: 'Steam 인증과 게임 동기화', description: 'Steam OpenID 로그인, JWT 재발급과 보유 게임 동기화를 구현했습니다. 동기화 요청에 쿨다운을 적용하고 Redis로 사용자별 API 요청 수를 제한했습니다.' },
      { title: '게임 분류와 화면 구현', description: '최대 5단계 폴더에서 순환 참조와 깊이 초과를 막았습니다. 게임을 2D 그리드에 배치하는 데이터 구조와 데스크톱 형태의 React 화면을 함께 구현했습니다.' },
      { title: '쇼케이스 공유와 상호작용', description: '게임 목록을 링크로 공유하는 공개 쇼케이스와 좋아요, 랭킹을 구현했습니다. 목록 조회에는 ID 커서를 사용했습니다.' },
    ],
    repositories: [
      { label: '백엔드', url: 'https://github.com/MinBeom2/SteamFolder' },
      { label: '프론트엔드', url: 'https://github.com/MinBeom2/SteamFolder-front' },
    ],
  },
]

export const benchmarks = [
  { name: '알림 비동기 처리', condition: 'Vuser 148 / 500ms 지연 가정', before: '1,402.93', after: '856.72', tpsBefore: '103.86', tpsAfter: '183.93', note: '알림은 HTTP API 응답만 측정했습니다. 알림 완료 시간과 실제 선택된 Executor는 확인하지 못했습니다.' },
  { name: '채팅 이력', condition: '채팅 5만 건 / 최신 50건 / Vuser 50', before: '1,804.71', after: '131.59', tpsBefore: '27.49', tpsAfter: '389.85', note: '기존 ID 커서와 정렬을 유지하고 작성자 조인을 분리한 전후를 비교했습니다.' },
  { name: '댓글 조회', condition: '댓글 6만 건 / Vuser 50', before: '613.27', after: '134.69', tpsBefore: '28.90', tpsAfter: '368.13', note: '댓글은 복합 인덱스 적용 전후를 비교했습니다. 보관된 자료에는 DDL과 실행 계획이 없어 정렬 비용만의 효과로 단정하지 않습니다.' },
]

export const skillGroups = [
  { title: '백엔드와 데이터', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / QueryDSL', 'MySQL', 'Redis'] },
  { title: '실시간 연결과 실행 환경', items: ['STOMP / WebSocket', 'SSE', 'MediaMTX / WebRTC', 'Docker Compose', 'nGrinder', 'Git'] },
  { title: '화면 구현', items: ['React', 'TypeScript', 'Vite'] },
]
