import type { ProjectId } from './content'

export type SkillLevel = '상' | '상중' | '중' | '중하' | '하'
export type SkillEvidence = {
  id: string
  name: string
  logo?: string
  mark?: string
  level?: SkillLevel
  summary: string
  highlight: string
  evidence: string
  projects: { id: ProjectId; name: string; section: string }[]
}

const ait = { id: 'ait', name: 'Ait', section: 'technology' } as const
const onework = { id: 'onework', name: 'ONEWORK', section: 'technology' } as const
const steam = { id: 'steamfolder', name: 'SteamFolder', section: 'technology' } as const

export const skills: SkillEvidence[] = [
  {
    id: "java",
    name: "Java",
    logo: "java.svg",
    level: "상중",
    summary: "컬렉션 활용, 폴더 트리와 예외 처리",
    highlight: "폴더 이동 시 순환 참조와 깊이 초과를 막았습니다.",
    evidence: "하위 폴더의 깊이를 재귀적으로 갱신하고, 외부 API 실패 시 기존 통계를 보존합니다.",
    projects: [ait, steam],
  },
  {
    id: "spring",
    name: "Spring Boot",
    logo: "spring.svg",
    level: "상중",
    summary: "API 구현, 비동기 처리와 트랜잭션 분리",
    highlight: "DB 저장을 먼저 확정하고, 외부 AI 호출은 비동기로 처리했습니다.",
    evidence: "트랜잭션을 분리하고 분석 시도 번호를 대조해 늦은 응답이 새 결과를 덮어쓰지 않게 했습니다.",
    projects: [ait, onework, steam],
  },
  {
    id: "jpa",
    name: "JPA / Hibernate",
    logo: "hibernate.webp",
    level: "중",
    summary: "연관 데이터 조회, 커서 페이징과 비관적 락",
    highlight: "연관 데이터는 함께 조회하고, 목록은 커서로 이어 읽습니다.",
    evidence: "EntityGraph와 fetch join, Slice를 사용했습니다. 좋아요 처리에는 비관적 락을 적용했습니다.",
    projects: [ait, steam],
  },
  {
    id: "mysql",
    name: "MySQL",
    logo: "mysql.svg",
    level: "중",
    summary: "관계와 제약 설계, 인덱스와 카운터 정합성",
    highlight: "중복 저장과 좋아요 수의 갱신 유실을 막도록 설계했습니다.",
    evidence: "유니크 제약과 DB 증감 쿼리를 적용하고, H2의 MySQL 모드로 동시 요청 테스트를 작성했습니다.",
    projects: [ait, steam],
  },
  {
    id: "redis",
    name: "Redis",
    logo: "redis.svg",
    level: "중하",
    summary: "사용자와 IP별 요청 제한, 장애 시 처리 정책",
    highlight: "Lettuce로 Redis를 연결해 사용자와 IP별 요청을 제한했습니다.",
    evidence: "429와 Retry-After를 반환하고, Redis 장애 시 통과 또는 차단 정책을 API별로 나눴습니다.",
    projects: [steam],
  },
  {
    id: "git",
    name: "Git",
    logo: "git.svg",
    level: "중",
    summary: "브랜치 작업과 병합, 팀 작업 가이드 작성",
    highlight: "팀원이 따라 할 수 있는 브랜치 작업 가이드를 만들었습니다.",
    evidence: "develop과 기능 브랜치를 사용하고, 최신 코드 반영부터 커밋과 병합까지 작업 순서를 공유했습니다.",
    projects: [{ ...ait, section: 'collaboration' }],
  },
]
