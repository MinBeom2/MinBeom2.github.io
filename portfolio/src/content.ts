export type ProjectId = 'ait' | 'onework' | 'steamfolder'

export type Project = {
  id: ProjectId
  name: string
  subtitle: string
  overview: string
  description: string
  period: string
  team: string
  role: string
  tags: string[]
  summary: string[]
  problem: string
  contributions: { title: string; description: string }[]
  links: { label: string; url: string }[]
}

export const profile = {
  name: '김민범',
  role: '백엔드 개발자',
  email: 'alsqja104@gmail.com',
  github: 'https://github.com/MinBeom2',
  notion: 'https://app.notion.com/p/3eb5498d25a981fea38fca23f2123292',
  troubleshooting: 'https://app.notion.com/p/3eb5498d25a980f5b79de6a29503bada',
}

export const projects: Project[] = [
  {
    id: 'ait',
    name: 'Ait',
    subtitle: 'AI 모의 면접과 화상 스터디를 한곳에',
    overview: 'AI 모의 면접과 화상 스터디를 함께 이용하는 면접 준비 플랫폼입니다.',
    description: '이력서, 자기소개서, GitHub 자료를 활용한 면접 준비 플랫폼. 스터디 운영, 커뮤니티와 알림 백엔드를 담당했습니다.',
    period: '2026.07.06 – 08.10',
    team: 'SSAFY 6인 팀',
    role: '스터디, 커뮤니티, 알림 백엔드',
    tags: ['Spring Boot', 'JPA', 'WebSocket', 'SSE', 'nGrinder'],
    summary: ['JWT와 그룹 멤버 권한을 검증하는 실시간 채팅', '부하 테스트로 조회 병목을 분석하고 개선'],
    problem: '면접 준비에 필요한 모집, 일정, 대화와 피드백을 하나의 흐름으로 연결하는 서비스입니다. 제 담당 범위에서는 스터디 운영과 커뮤니티, 알림이 함께 동작하도록 API와 실시간 연결을 구현했습니다.',
    contributions: [
      { title: '스터디 운영과 그룹 채팅', description: '스터디 그룹 조회와 생성, 신청 승인과 거절, 일정 API를 구현했습니다. STOMP/WebSocket 연결에서 JWT를 검증하고, 메시지 저장 전 그룹 멤버 여부를 확인했습니다. 채팅 이력은 메시지 ID 커서와 Slice로 조회합니다.' },
      { title: '커뮤니티와 알림', description: '게시글, 댓글, 좋아요, 스크랩, 알림 목록과 읽음 처리 API를 담당했습니다. Vercel 배포 후 알림 수신 문제에 대응해 8초 heartbeat와 emitter 정리를 추가했습니다. 이후 알림 수신을 확인했습니다. 연결 중단의 단일 원인은 확정하지 않았고, 개선 폭도 수치로 측정하지 않았습니다.' },
      { title: '데이터 조회와 부하 검증', description: 'nGrinder로 알림, 게시글 목록, 채팅 이력과 댓글 조회를 검증했습니다. SQL 실행 계획, 정렬 인덱스와 연관 조회를 살피며 커서 조회, 제한된 Count, 조인 분리와 배치 조회를 적용했습니다.' },
    ],
    links: [
      { label: '프로젝트 저장소', url: 'https://lab.ssafy.com/s15-webmobile1-sub1/S15P11D202' },
      { label: 'Notion 프로젝트 기록', url: 'https://app.notion.com/p/4d05498d25a982a68e0d81996850b529' },
      { label: 'Notion 성능 검증 기록', url: profile.troubleshooting },
    ],
  },
  {
    id: 'onework',
    name: 'ONEWORK',
    subtitle: '예지보전과 품질 관제에 필요한 영상 연결',
    overview: '설비 상태와 카메라 영상을 함께 확인하는 스마트 팩토리 관제 플랫폼입니다.',
    description: '스마트 팩토리 관제 플랫폼의 MediaMTX 중심 백엔드. RTSP 영상 송출, 카메라 API와 실행과 녹화 설정을 구현했습니다.',
    period: '2026.08.18 – 09.28',
    team: 'SSAFY 6인 팀',
    role: 'MediaMTX 중심 백엔드',
    tags: ['Spring Boot', 'MediaMTX', 'WebRTC', 'Docker'],
    summary: ['RTSP → MediaMTX → WebRTC WHEP 영상 흐름 구성', '카메라 API, 녹화 설정과 설비별 스트림 매핑'],
    problem: '설비의 상태와 카메라 영상을 브라우저 및 Unity 디지털 트윈에서 함께 확인하는 프로젝트입니다. 영상이 관제 화면에 전달되도록 송출 경로와 카메라 관리 API를 구성했습니다.',
    contributions: [
      { title: '영상 송출과 카메라 API', description: '웹캠이나 CCTV의 RTSP 영상을 MediaMTX로 받아 WebRTC WHEP로 전달하는 흐름을 구성했습니다. 송출 스크립트, MediaMTX 설정과 Spring Boot 카메라 API를 구현했습니다.' },
      { title: '실행, 녹화와 설비 매핑', description: 'Docker Compose 실행과 배포 연결, 녹화 경로와 보관 설정, 원격 송출 스크립트를 보완했습니다. 설비 ID와 카메라 스트림을 매핑해 관제 화면에서 해당 영상을 조회하도록 연결했습니다.' },
      { title: 'Unity WebGL 연동', description: '배포본이 localhost로 카메라 API를 요청하던 문제를 페이지 주소에서 API 호스트를 계산하도록 수정했습니다. 이후 HTTPS 화면에서 HTTP API와 WHEP 요청이 차단되는 통합 문제는 남아 있습니다.' },
    ],
    links: [
      { label: '프로젝트 저장소', url: 'https://lab.ssafy.com/s15-bigdata-dist-sub1/S15P21D202' },
      { label: 'Notion 프로젝트 정리', url: profile.notion },
    ],
  },
  {
    id: 'steamfolder',
    name: 'SteamFolder',
    subtitle: '내 게임 라이브러리를 정리하고 공유하기',
    overview: '보유한 Steam 게임을 폴더로 정리하고 링크로 공유하는 서비스입니다.',
    description: '보유 게임을 폴더로 정리하고 쇼케이스 링크로 공유하는 개인 서비스. 프론트엔드와 백엔드를 함께 개발하고 있습니다.',
    period: '로컬 개발 중',
    team: '개인 프로젝트',
    role: '프론트엔드와 백엔드 전체 개발',
    tags: ['React', 'TypeScript', 'Spring Boot', 'Redis'],
    summary: ['Steam 인증과 게임 동기화부터 폴더 화면까지 구현', '최대 5단계 폴더와 쇼케이스 공유'],
    problem: '함께 게임할 사람에게 보유 게임을 보여주려면 Steam 라이브러리 화면까지 여러 단계를 거쳐야 했습니다. 원하는 기준으로 게임을 정리하고, 링크 하나로 보여줄 수 있는 서비스를 만들고 있습니다.',
    contributions: [
      { title: '인증과 라이브러리 동기화', description: 'Steam OpenID 로그인, JWT 재발급과 보유 게임 동기화를 구현했습니다. 동기화 요청에는 쿨다운을 적용하고, Redis 기반 API 속도 제한을 추가했습니다.' },
      { title: '폴더와 데스크톱 화면', description: '최대 5단계 계층형 폴더, 2D 그리드 게임 배치와 공개 쇼케이스를 구현했습니다. React와 TypeScript로 데스크톱 형태의 폴더, 게임, 공유 화면을 개발했습니다.' },
      { title: '공유와 상호작용', description: '쇼케이스 좋아요와 랭킹, 커서 기반 목록 조회를 구현했습니다. 프론트엔드와 백엔드 두 저장소가 하나의 서비스를 구성합니다.' },
    ],
    links: [
      { label: '백엔드 GitHub', url: 'https://github.com/MinBeom2/SteamFolder' },
      { label: '프론트엔드 GitHub', url: 'https://github.com/MinBeom2/SteamFolder-front' },
      { label: 'Notion 프로젝트 정리', url: profile.notion },
    ],
  },
]

export const benchmarks = [
  { name: '알림 비동기 처리', condition: 'Vuser 150 / 외부 호출 0.5초 지연 가정', before: '1,402', after: '856', tps: '103 → 183' },
  { name: '게시글 목록', condition: '게시글 7만 건 / Vuser 50', before: '26,010', after: '463.55', tps: '3.1 → 114.3' },
  { name: '채팅 이력', condition: '채팅 5만 건 / Vuser 50', before: '1,804.71', after: '131.59', tps: '27.5 → 389.9' },
  { name: '댓글 조회', condition: '댓글 6만 건 / Vuser 50', before: '613', after: '134', tps: '28.9 → 368.1' },
]

export const skillGroups = [
  { title: '백엔드와 데이터', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / QueryDSL', 'MySQL', 'Redis'] },
  { title: '실시간 연결과 실행 환경', items: ['STOMP / WebSocket', 'SSE', 'MediaMTX / WebRTC', 'Docker Compose', 'nGrinder', 'Git'] },
  { title: '화면 구현', items: ['React', 'TypeScript', 'Vite'] },
]
