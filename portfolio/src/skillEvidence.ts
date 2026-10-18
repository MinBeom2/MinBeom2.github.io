import type { ProjectId } from './content'

export type SkillLevel = '상중' | '중'
export type SkillEvidence = {
  id: string
  name: string
  logo?: string
  mark?: string
  level?: SkillLevel
  summary: string
  evidence: string
  projects: { id: ProjectId; name: string; section: string }[]
}

const ait = { id: 'ait', name: 'Ait', section: 'technology' } as const
const onework = { id: 'onework', name: 'ONEWORK', section: 'technology' } as const
const steam = { id: 'steamfolder', name: 'SteamFolder', section: 'technology' } as const

// Levels are shown only for the four technologies assessed from implementation evidence.
export const skills: SkillEvidence[] = [
  {
    id: "java",
    name: "Java",
    logo: "java.svg",
    level: "상중",
    summary: "컬렉션, 계층 구조와 외부 응답 처리",
    evidence: "Map, Set, Stream으로 게시글의 태그, 댓글 수, 사용자 반응을 묶고 댓글과 답글을 부모 ID별로 그룹화해 응답을 조립했습니다. SteamFolder의 계층형 폴더에서는 순환 참조를 차단하고 이동 시 하위 트리의 깊이를 재귀적으로 갱신했습니다. Steam API의 업적 없음, 비공개, 타임아웃, 잘못된 JSON을 구분해 실패 시 기존 통계를 보존했습니다.",
    projects: [ait, steam],
  },
  {
    id: "spring",
    name: "Spring Boot",
    logo: "spring.svg",
    level: "상중",
    summary: "API, 트랜잭션 이벤트와 비동기 상태 관리",
    evidence: "Spring MVC로 커뮤니티, 스터디, 게임 라이브러리 API를 개발하고 Validation과 공통 오류 응답을 구현했습니다. 알림은 AFTER_COMMIT 이후 비동기로 처리하고 저장에 REQUIRES_NEW 트랜잭션을 적용했습니다. 외부 AI 호출은 분석 시작, 완료, 실패의 DB 트랜잭션 사이에서 실행하도록 분리하고 상태, 시도 번호로 늦은 응답의 덮어쓰기를 방지했습니다.",
    projects: [ait, onework, steam],
  },
  {
    id: "mysql",
    name: "MySQL",
    logo: "mysql.svg",
    level: "중",
    summary: "관계 모델, 제약과 좋아요 카운터 정합성",
    evidence: "사용자, 게임, 폴더, 쇼케이스의 관계를 모델링하고 중복 등록을 막는 유니크 제약과 조회 조건에 맞는 복합 인덱스를 선언했습니다. SteamFolder 좋아요 토글에는 사용자 행의 비관적 락과 DB 증가, 감소 쿼리를 적용해 갱신 유실을 방지하도록 구현했습니다.",
    projects: [ait, steam],
  },
  {
    id: "docker",
    name: "Docker, Docker Compose",
    logo: "docker.svg",
    level: "중",
    summary: "카메라 API와 MediaMTX의 컨테이너 구성",
    evidence: "ONEWORK의 MediaMTX와 Spring Boot 카메라 API를 통합하고 RTSP, HLS, WebRTC의 포트와 TCP, UDP 경로를 구분했습니다. 외부 접속 호스트를 환경변수로 분리하고 기존 Dockerfile에서 gradlew의 CRLF, 실행 권한과 빌드 실패를 숨기던 옵션을 수정했습니다.",
    projects: [onework],
  },
  {
    id: "jpa",
    name: "Spring Data JPA, QueryDSL",
    mark: "JPA",
    summary: "동적 검색, 배치 조회와 커서 페이징",
    evidence: "EntityGraph, fetch join과 ID 기반 배치 조회로 연관 데이터를 가져왔습니다. Ait 게시글의 카테고리, 키워드, 태그 검색과 정렬, 페이징을 QueryDSL로 구현했습니다. 게임 목록에는 ID 커서, 랭킹에는 좋아요 수, ID 복합 커서, 채팅 이력에는 Slice 조회를 적용했습니다.",
    projects: [ait, steam],
  },
  {
    id: "security",
    name: "Spring Security, JWT",
    mark: "JWT",
    summary: "JWT 인증과 Steam OpenID 로그인",
    evidence: "SteamFolder에서 JWT 인증 필터와 토큰 발급, 갱신, Steam OpenID 로그인을 구현했습니다. 인증 결과를 사용자별 게임, 폴더, 쇼케이스 API의 접근 제어에 연결했습니다.",
    projects: [steam],
  },
  {
    id: "redis",
    name: "Redis, Bucket4j",
    logo: "redis.svg",
    summary: "사용자와 IP별 API 요청 제한",
    evidence: "SteamFolder에서 로그인 사용자와 IP를 구분하는 API 요청 제한을 구현했습니다. 요청 초과 시 429 응답과 Retry-After를 반환하고 저장소 장애 시 요청을 통과시키거나 차단하는 정책을 구분했습니다.",
    projects: [steam],
  },
  {
    id: "github-app",
    name: "GitHub App, FastAPI",
    mark: "GH",
    summary: "설치 권한을 이용한 private 저장소 분석 연동",
    evidence: "Ait에서 JWT로 Installation Access Token을 발급받아 private 저장소도 설치 시 접근을 허용한 범위에서 연동했습니다. README, 커밋, 주요 파일 수집과 비동기 분석, FastAPI API 호출을 연결했습니다. 웹훅은 HMAC SHA-256으로 검증하고 권한 변경, 앱 삭제 시 연동 데이터와 임베딩 삭제 요청을 처리했습니다.",
    projects: [ait],
  },
  {
    id: "external-sync",
    name: "Steam API, Notion 동기화",
    mark: "API",
    summary: "게임 정보 수집과 버전 기반 외부 동기화",
    evidence: "SteamFolder의 보유 게임 동기화와 업적 조회를 구현하고 정상적인 업적 없음과 비공개, 통신 실패를 구분했습니다. 피드백의 Notion 동기화는 UPSERT, ARCHIVE 작업과 버전을 DB에 기록하고 성공한 작업만 확인 처리했습니다. 데이터가 변경되면 이전 버전의 완료 확인을 충돌로 반환했습니다.",
    projects: [steam],
  },
  {
    id: "realtime",
    name: "WebSocket/STOMP, SSE",
    mark: "WS",
    summary: "인증을 연계한 채팅과 알림 연결 관리",
    evidence: "Ait 스터디 채팅에 연결 시 JWT 검증과 메시지 전송 시 그룹 멤버 확인을 적용하고 메시지 저장, 그룹 topic 발행, 과거 이력 조회를 연결했습니다. SSE 알림에는 8초 heartbeat와 완료, 오류, 타임아웃 시 emitter 정리를 추가했습니다.",
    projects: [ait],
  },
  {
    id: "mediamtx",
    name: "MediaMTX, RTSP, WebRTC",
    mark: "RTC",
    summary: "RTSP 영상을 WebRTC, HLS로 전달",
    evidence: "ONEWORK에서 노트북 웹캠을 설비 CCTV로 활용해 RTSP → MediaMTX → WebRTC WHEP, HLS의 영상 흐름을 구성했습니다. Spring Boot 카메라 제어 API와 설비별 스트림을 연결했습니다. fMP4 녹화는 서버에서 1시간 분할, 24시간 보관으로 설정하고 외부 저장 경로에 마운트했으며 로컬에는 1분 분할 설정을 적용했습니다.",
    projects: [onework],
  },
  {
    id: "concurrency",
    name: "동시성, 정합성 검증",
    mark: "LOCK",
    summary: "비관적 락과 병렬 요청으로 데이터 정합성 검증",
    evidence: "Ait의 개인 개선 브랜치에서 게시글 좋아요에 비관적 쓰기 락을 적용하고 서로 다른 사용자 100명의 요청을 작업 스레드 32개로 실행해 최종 좋아요 수 100을 확인했습니다. 이 변경은 팀 배포 버전과 구분한 개인 작업입니다. SteamFolder는 H2의 MySQL 모드에서 사용자 30명의 동시 좋아요와 같은 사용자의 10회 동시 토글을 검증했습니다.",
    projects: [ait, steam],
  },
  {
    id: "testing",
    name: "JUnit 5, MockMvc, MockWebServer",
    mark: "TEST",
    summary: "정상, 실패 응답과 동시 요청 테스트",
    evidence: "API, 서비스와 외부 API의 정상, 오류 응답을 테스트했습니다. ExecutorService, CountDownLatch, AtomicInteger로 병렬 요청 테스트를 작성하고 외부 응답 실패 시 기존 데이터가 보존되는지 확인했습니다.",
    projects: [ait, onework, steam],
  },
  {
    id: "ngrinder",
    name: "nGrinder",
    mark: "LOAD",
    summary: "조건을 명시한 조회 API 전후 부하 비교",
    evidence: "Ait의 개인 검증 환경에서 Vuser 50, 1분 부하 실험으로 조회 API의 전후 성능을 비교했습니다. 기존 커서 기반 채팅 조회의 조인 전략을 조정한 뒤 평균 응답 시간 1,804.71ms → 131.59ms를 기록했고 댓글 조회의 복합 인덱스 적용 전후 비교에서는 TPS 28.90 → 368.13을 확인했습니다.",
    projects: [{ ...ait, section: 'benchmarks' }],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    mark: "CI",
    summary: "기존 파이프라인에 카메라 서비스 배포 추가",
    evidence: "기존 파이프라인에 카메라 서비스 배포 구간을 추가했습니다. 백엔드, Compose 변경 감지부터 Compose 구성 검사, 빌드, 기동, 컨테이너 실행 상태 확인까지 연결했습니다.",
    projects: [onework],
  },
  {
    id: "git",
    name: "Git, GitLab",
    logo: "git.svg",
    summary: "팀 브랜치 작업 방식과 명령어 가이드 공유",
    evidence: "팀 프로젝트에서 Git Flow 기반 브랜치 작업을 제안했습니다. Git 사용에 익숙하지 않은 팀원을 위해 develop, feature 브랜치의 작업 순서와 명령어 가이드를 작성해 공유했습니다.",
    projects: [{ ...ait, section: 'evidence' }],
  },
  {
    id: "react",
    name: "React, TypeScript",
    logo: "react.svg",
    summary: "게임 라이브러리 화면과 인증 상태 연계",
    evidence: "개인 프로젝트 SteamFolder의 로그인, 게임 조회, 동기화, 계층형 폴더, 쇼케이스, 랭킹 화면을 개발하고 Spring Boot API에 연결했습니다. 토큰 갱신 요청을 공유해 중복 호출을 줄이고 세션 버전을 확인해 로그아웃, 계정 변경 후 도착한 응답을 배제했습니다.",
    projects: [steam],
  },
]
