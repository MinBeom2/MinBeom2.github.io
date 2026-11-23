export type ProjectId = 'ait' | 'onework' | 'nyamnyam' | 'steamfolder'
export type SourceLink = { label: string; url: string }

export type Project = {
  id: ProjectId
  name: string
  subtitle: string
  description: string
  period: string
  status?: string
  team: string
  role: string
  teamDivision?: { role: string; description: string }[]
  tags: string[]
  highlight: { text: string; context?: string; anchor: string }
  introduction: {
    context: string
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

export const chatHistoryBenchmark = {
  name: '채팅 이력',
  condition: '채팅 5만 건 / 최신 50건 / Vuser 50',
  before: '1,804.71',
  after: '131.59',
  tpsBefore: '27.49',
  tpsAfter: '389.85',
  note: '기존 ID 커서와 정렬을 유지하고 작성자 조인을 분리한 전후를 비교했습니다.',
}

export const projects: Project[] = [
  {
    id: 'nyamnyam',
    name: '냠냠취미',
    subtitle: '숏폼으로 취미를 탐색하고 첫 활동까지',
    description: '숏폼 수집 배치, API 요청 제한, 커뮤니티와 신고 백엔드를 맡았습니다. Redis 장애 대응 정책을 나누고 실제 Redis로 동시 요청을 검증했습니다.',
    period: '2026.10.13 – 11.18',
    team: 'SSAFY 7인 팀',
    role: '숏폼 수집, 요청 제한, 커뮤니티와 신고 백엔드',
    tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'Redis'],
    highlight: {
      text: 'AI 추천 동시 요청 100건 중 한도인 10건 통과',
      context: '실제 Redis를 사용한 테스트',
      anchor: 'rate-limit',
    },
    introduction: {
      context: '취미를 아직 정하지 못한 사용자가 숏폼으로 먼저 탐색하고, 관심이 생기면 비용·시간·난이도와 첫 활동을 확인할 수 있도록 만들었습니다.',
      features: [
        { title: '숏폼 탐색과 추천', description: '영상에 남긴 반응으로 관심 취미를 추천하고 주차별 활동을 안내합니다.' },
        { title: '커뮤니티', description: '게시판에서 활동 경험을 나누고 게시글과 댓글을 신고할 수 있습니다.' },
      ],
    },
    contributions: [
      { title: '숏폼 수집 배치', description: 'YouTube 검색, 영상 필터링과 LLM 판별부터 후보 저장과 목요일 반영까지 맡았습니다. 일일 할당량 상한은 9,000단위로 두었습니다.' },
      { title: 'API 요청 제한', description: 'Redis와 Bucket4j로 API 7개 그룹의 제한 횟수를 관리하고, 한도 초과 시 429와 Retry-After를 반환했습니다.' },
      { title: '커뮤니티와 신고', description: '게시글·댓글·좋아요·이미지 업로드 API와 신고 화면 연동, AI 1차 검토와 Mattermost 처리 버튼을 구현했습니다.' },
    ],
    repositories: [{ label: '프로젝트', url: 'https://github.com/MinBeom2/NyamNyamHobby' }],
  },
  {
    id: 'steamfolder',
    name: 'SteamFolder',
    subtitle: '내 게임 라이브러리를 정리하고 공유하기',
    description: '개인 프로젝트로 Steam 연동, 게임 폴더와 공개 쇼케이스의 API 및 화면을 개발했습니다. Steam 업적 응답의 예외를 분류하고 회귀 테스트를 작성했습니다.',
    period: '2026.08.21 ~',
    status: '로컬 개발 중',
    team: '개인 프로젝트',
    role: 'Steam 연동과 게임 폴더·쇼케이스 풀스택',
    tags: ['React', 'TypeScript', 'Spring Boot', 'JPA', 'Redis'],
    highlight: {
      text: 'Steam 업적 조회 예외를 분리하고 회귀 테스트 추가',
      context: '2026.10.05 전체 테스트 272개 통과',
      anchor: 'steam-achievements',
    },
    introduction: {
      context: '함께 게임할 사람에게 보유 목록을 보여주려면 Steam 라이브러리까지 여러 단계를 거쳐야 했습니다. 원하는 게임만 묶어서 링크로 공유할 수 있게 만들었습니다.',
      features: [
        { title: '라이브러리 정리', description: 'Steam 계정을 연결하고 최대 5단계 폴더에 게임을 배치합니다.' },
        { title: '공개 쇼케이스', description: '정리한 목록을 링크로 공유하고 좋아요와 랭킹을 확인합니다.' },
      ],
    },
    contributions: [
      { title: 'Steam 연동', description: 'Steam OpenID 로그인, JWT 재발급과 보유 게임 동기화를 맡았습니다.' },
      { title: '폴더와 공유 화면', description: '계층형 폴더와 게임 배치 구조, React 화면, 공개 쇼케이스를 설계하고 개발했습니다.' },
      { title: '서버 안정성', description: '좋아요 동시 갱신, API 요청 제한과 피드백 분석 복구를 구현하고 테스트했습니다.' },
    ],
    repositories: [
      { label: '백엔드', url: 'https://github.com/MinBeom2/SteamFolder' },
      { label: '프론트엔드', url: 'https://github.com/MinBeom2/SteamFolder-front' },
    ],
  },
  {
    id: 'onework',
    name: 'ONEWORK',
    subtitle: '디지털 트윈에 설비별 실시간 영상 연결',
    description: '설비별 CCTV 송출과 중계, 카메라 API를 담당했습니다. RTSP 영상을 MediaMTX로 받아 브라우저의 WebRTC 뷰어로 연결했습니다.',
    period: '2026.08.18 – 09.28',
    team: 'SSAFY 6인 팀',
    role: '설비별 CCTV 송출·중계와 카메라 API',
    teamDivision: [
      { role: '영상 관제 (본인)', description: '영상 송출과 중계, 카메라 API, 배포와 녹화 설정을 담당했습니다.' },
      { role: '이상 탐지와 인프라', description: '설비 이상 탐지 엔진, 분산 처리 인프라와 3D 디지털 트윈을 담당했습니다.' },
      { role: '공정 품질과 MES', description: 'SPC 관리도 기반 품질 분석과 MES 연동을 담당했습니다.' },
      { role: '전류 모델', description: '전류 신호 기반 탐지 모델을 실험했습니다.' },
      { role: '디자인', description: 'Figma로 서비스 화면을 디자인했습니다.' },
      { role: '영상 제작', description: '프로젝트가 끝난 뒤 AI를 활용해 소개 영상을 제작했습니다.' },
    ],
    tags: ['Spring Boot', 'MediaMTX', 'WebRTC'],
    highlight: {
      text: '설비 ID로 해당 카메라 스트림을 조회하고 예외 응답 테스트',
      anchor: 'camera-api',
    },
    introduction: {
      context: '센서 분석 결과를 보는 중에 실제 설비 상태도 확인할 수 있도록 디지털 트윈에 CCTV 영상을 연결했습니다.',
      features: [
        { title: '설비·품질 관제', description: '설비 진동과 공정 데이터를 살피고 3D 화면에서 설비 상태를 확인합니다.' },
        { title: '카메라 재생', description: '디지털 트윈에서 설비를 선택해 해당 카메라 영상을 띄웁니다.' },
      ],
    },
    contributions: [
      { title: '영상과 카메라 API', description: 'RTSP 송출 스크립트와 MediaMTX 설정을 작성하고 설비 ID를 WHEP 스트림 주소와 연결했습니다.' },
      { title: '실행과 녹화', description: 'Docker Compose와 배포 구성을 연결하고 fMP4 녹화 경로와 보관 설정을 잡았습니다.' },
      { title: 'WebGL 연동', description: '설비의 CCTV 버튼을 브라우저 영상 창과 연결하고 배포 주소에서 API 호스트를 계산하도록 수정했습니다.' },
    ],
    repositories: [{ label: '프로젝트', url: 'https://github.com/MinBeom2/OneWork' }],
  },
  {
    id: 'ait',
    name: 'Ait',
    subtitle: 'AI 모의 면접과 화상 스터디를 한곳에',
    description: '스터디와 채팅, 커뮤니티, 알림 백엔드를 담당했습니다. 프로젝트 종료 후 채팅 이력의 조회 방식을 바꾸고 개인 환경에서 응답 시간을 비교했습니다.',
    period: '2026.07.06 – 08.10',
    team: 'SSAFY 6인 팀',
    role: '스터디와 채팅, 커뮤니티, 알림 백엔드',
    teamDivision: [
      { role: '백엔드 3명', description: '서버와 API 개발을 나눠 맡았습니다.' },
      { role: '프론트엔드 2명', description: 'React 화면과 API 연동을 담당했습니다.' },
      { role: 'AI 1명', description: '자료 기반 면접 질문 생성과 답변 평가를 담당했습니다.' },
    ],
    tags: ['Spring Boot', 'JPA', 'WebSocket', 'SSE'],
    highlight: {
      text: `채팅 조회 평균 ${chatHistoryBenchmark.before} → ${chatHistoryBenchmark.after} ms`,
      context: '프로젝트 종료 후 개인 검증',
      anchor: 'chat-history',
    },
    introduction: {
      context: '스터디 모집부터 화상 연습과 평가까지 여러 곳에 흩어진 면접 준비 과정을 한 서비스에 모았습니다.',
      features: [
        { title: '자료 기반 면접', description: '이력서, 자기소개서와 GitHub 자료로 질문을 만들고 답변에 피드백을 제공합니다.' },
        { title: '그룹 스터디', description: '스터디 모집, 일정과 채팅을 관리하고 화상으로 면접을 연습합니다.' },
      ],
    },
    contributions: [
      { title: '스터디와 그룹 채팅', description: '가입 승인과 거절, 일정 관리, 실시간 채팅과 이력 조회 API를 만들었습니다.' },
      { title: '커뮤니티와 알림', description: '게시글, 댓글, 좋아요·스크랩과 알림 목록·읽음 처리·SSE 전송을 맡았습니다.' },
      { title: '종료 후 검증', description: '채팅·댓글 조회에 부하를 주고, 좋아요 동시 갱신을 재현해 별도로 개선했습니다.' },
    ],
    repositories: [{ label: '프로젝트', url: 'https://github.com/MinBeom2/Ait' }],
  },
]

export const benchmarks = [
  chatHistoryBenchmark,
  { name: '댓글 조회', condition: '댓글 6만 건 / Vuser 50', before: '613.27', after: '134.69', tpsBefore: '28.90', tpsAfter: '368.13', note: '댓글은 복합 인덱스 적용 전후를 비교했습니다. 보관된 자료에는 DDL과 실행 계획이 없어 정렬 비용만의 효과로 단정하지 않습니다.' },
  { name: '알림 비동기 처리', condition: 'Vuser 148 / 500ms 지연 가정', before: '1,402.93', after: '856.72', tpsBefore: '103.86', tpsAfter: '183.93', note: '알림은 HTTP API 응답만 측정했습니다. 알림 완료 시간과 실제 선택된 Executor는 확인하지 못했습니다.' },
]

export const skillGroups = [
  { title: '백엔드와 데이터', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / QueryDSL', 'MySQL', 'Redis'] },
  { title: '실시간 연결과 실행 환경', items: ['STOMP / WebSocket', 'SSE', 'MediaMTX / WebRTC', 'Docker Compose', 'nGrinder', 'Git'] },
  { title: '화면 구현', items: ['React', 'TypeScript', 'Vite'] },
]
