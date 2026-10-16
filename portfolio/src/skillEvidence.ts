import type { ProjectId } from './content'

export type SkillLevel = '상중' | '중' | '중하' | '하'
export type SkillEvidence = {
  id: string
  name: string
  logo?: string
  mark?: string
  sampleLevel: SkillLevel
  summary: string
  evidence: string
  projects: { id: ProjectId; name: string; section: string }[]
}

const ait = { id: 'ait', name: 'Ait', section: 'technology' } as const
const onework = { id: 'onework', name: 'ONEWORK', section: 'technology' } as const
const steam = { id: 'steamfolder', name: 'SteamFolder', section: 'technology' } as const

// Levels are illustrative design data, pending the owner's self-assessment.
export const skillCategories: { id: string; title: string; skills: SkillEvidence[] }[] = [
  {
    id: 'backend', title: '백엔드와 데이터', skills: [
      { id: 'java', name: 'Java', logo: 'java.svg', sampleLevel: '상중', summary: 'API의 조회, 검증, 예외 처리 로직 작성', evidence: 'Ait의 스터디와 채팅 서비스와 SteamFolder의 폴더 서비스에서 요청을 검증하고 비즈니스 로직을 구현했습니다.', projects: [ait, steam] },
      { id: 'spring', name: 'Spring Boot', logo: 'spring.svg', sampleLevel: '상중', summary: '스터디, 커뮤니티, 카메라 관리 API 구현', evidence: 'Ait의 스터디, 커뮤니티, 알림, ONEWORK의 카메라 관리, SteamFolder의 인증과 폴더 API를 구현했습니다.', projects: [ait, onework, steam] },
      { id: 'security', name: 'Spring Security', logo: 'spring.svg', sampleLevel: '중', summary: 'JWT 인증 필터와 보안 설정 구성', evidence: 'SteamFolder에 JWT 인증 필터와 SecurityFilterChain을 구성하고, stateless 인증 흐름을 적용했습니다.', projects: [steam] },
      { id: 'jpa', name: 'JPA', mark: 'JPA', sampleLevel: '중', summary: '커서 조회와 연관 데이터 조회 방식 조정', evidence: 'Ait 채팅 이력을 메시지 ID 커서와 Slice로 조회했습니다. 연관 조회를 분리하고 배치 조회를 적용하며 조회 병목을 확인했습니다.', projects: [ait] },
      { id: 'querydsl', name: 'QueryDSL', mark: 'Q', sampleLevel: '중하', summary: '키워드, 태그, 정렬 조건의 게시글 검색 구현', evidence: 'Ait 게시글 검색에서 키워드와 태그, 정렬 조건을 조합하는 쿼리를 작성했습니다. 검색 조건을 제외한 진단 실험은 기능을 유지한 개선 결과와 구분합니다.', projects: [ait] },
      { id: 'mysql', name: 'MySQL', logo: 'mysql.svg', sampleLevel: '중', summary: '실행 계획과 인덱스로 조회 병목 분석', evidence: 'Ait의 게시글, 댓글, 채팅 이력 조회에서 실행 계획과 정렬 인덱스를 살피고 변경 전후를 측정했습니다. 측정값은 개발 및 검증 환경의 기록입니다.', projects: [{ ...ait, section: 'benchmarks' }] },
      { id: 'redis', name: 'Redis', logo: 'redis.svg', sampleLevel: '중하', summary: '분산 API 속도 제한 적용', evidence: 'SteamFolder에서 Bucket4j와 Redis를 연결해 API 속도 제한을 적용했습니다. 개인 프로젝트는 현재 로컬 개발 중입니다.', projects: [steam] },
    ],
  },
  {
    id: 'runtime', title: '연결과 실행 환경', skills: [
      { id: 'websocket', name: 'STOMP / WebSocket', mark: 'WS', sampleLevel: '중', summary: '인증과 그룹 멤버 권한을 확인하는 채팅 구현', evidence: 'Ait 채팅 연결에서 JWT를 검증하고 메시지 저장 전 그룹 멤버 여부를 확인했습니다.', projects: [ait] },
      { id: 'sse', name: 'SSE', mark: 'SSE', sampleLevel: '중', summary: '알림 heartbeat와 연결 오류 정리 구현', evidence: 'Ait 알림의 SSE 연결에 heartbeat와 오류 발생 시 emitter 정리를 추가했습니다. 끊김의 단일 원인과 안정화 정도는 확정하지 않았습니다.', projects: [ait] },
      { id: 'mediamtx', name: 'MediaMTX', mark: 'MTX', sampleLevel: '중', summary: 'RTSP 영상 중계와 카메라 스트림 설정', evidence: 'ONEWORK에서 카메라 영상을 MediaMTX로 받아 중계하고 설비 ID별로 카메라 스트림을 매핑했습니다.', projects: [onework] },
      { id: 'webrtc', name: 'WebRTC', mark: 'RTC', sampleLevel: '중하', summary: 'WHEP로 웹과 Unity 영상 뷰어 연결', evidence: 'ONEWORK 영상 스트림을 웹과 Unity 뷰어에 연결했습니다. HTTPS 화면에서 HTTP API와 WHEP 요청이 차단되는 통합 문제는 남아 있습니다.', projects: [onework] },
      { id: 'docker', name: 'Docker Compose', logo: 'docker.svg', sampleLevel: '중하', summary: 'MediaMTX 실행과 녹화 볼륨 구성', evidence: 'ONEWORK의 Docker Compose 실행과 배포 연결, 녹화 경로와 보관 설정을 보완했습니다.', projects: [onework] },
      { id: 'ngrinder', name: 'nGrinder', mark: 'nG', sampleLevel: '중', summary: 'API 조회 변경 전후를 부하 테스트로 기록', evidence: 'Ait의 알림, 게시글 목록, 채팅 이력, 댓글 조회를 부하 테스트했습니다. 데이터 건수와 Vuser 등 기록된 조건을 결과와 함께 남겼습니다.', projects: [{ ...ait, section: 'benchmarks' }] },
      { id: 'git', name: 'Git', logo: 'git.svg', sampleLevel: '상중', summary: '팀의 브랜치 작업 가이드 작성 및 공유', evidence: 'Ait에서 Git Flow를 제안하고 Git에 익숙하지 않은 팀원을 위해 명령어와 브랜치 작업 순서 가이드를 작성했습니다.', projects: [ait] },
    ],
  },
  {
    id: 'frontend', title: '화면 구현', skills: [
      { id: 'react', name: 'React', logo: 'react.svg', sampleLevel: '중하', summary: '게임 폴더, 데스크톱, 쇼케이스 화면 구현', evidence: 'SteamFolder의 폴더, 게임 배치, 공유 화면을 React로 구현하고 백엔드 API와 연결했습니다. 현재 로컬 개발 중입니다.', projects: [steam] },
      { id: 'typescript', name: 'TypeScript', mark: 'TS', sampleLevel: '중하', summary: '화면 props와 선택과 드래그 상태 타입 정의', evidence: 'SteamFolder의 DesktopCanvas에서 컴포넌트 인터페이스와 선택과 드래그 상태의 타입을 정의했습니다.', projects: [steam] },
      { id: 'vite', name: 'Vite', mark: 'Vite', sampleLevel: '하', summary: '개발 서버, API 프록시, 빌드 설정 사용', evidence: 'SteamFolder의 프론트 개발 서버와 API 프록시, 빌드 설정을 사용했습니다. 도구 사용 경험에 해당합니다.', projects: [steam] },
    ],
  },
]
