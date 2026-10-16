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
export const skills: SkillEvidence[] = [
  { id: 'java', name: 'Java', logo: 'java.svg', sampleLevel: '상중', summary: 'API의 조회, 검증, 예외 처리 로직 작성', evidence: 'Ait의 스터디와 채팅 서비스와 SteamFolder의 폴더 서비스에서 요청을 검증하고 비즈니스 로직을 구현했습니다.', projects: [ait, steam] },
  { id: 'spring', name: 'Spring Boot', logo: 'spring.svg', sampleLevel: '상중', summary: '스터디, 커뮤니티, 카메라 관리 API 구현', evidence: 'Ait의 스터디, 커뮤니티, 알림, ONEWORK의 카메라 관리, SteamFolder의 인증과 폴더 API를 구현했습니다.', projects: [ait, onework, steam] },
  { id: 'jpa', name: 'JPA', mark: 'JPA', sampleLevel: '중', summary: '커서 조회와 연관 데이터 조회 방식 조정', evidence: 'Ait 채팅 이력을 메시지 ID 커서와 Slice로 조회했습니다. 연관 조회를 분리하고 배치 조회를 적용하며 조회 병목을 확인했습니다.', projects: [ait] },
  { id: 'mysql', name: 'MySQL', logo: 'mysql.svg', sampleLevel: '중', summary: '실행 계획과 인덱스로 조회 병목 분석', evidence: 'Ait의 게시글, 댓글, 채팅 이력 조회에서 실행 계획과 정렬 인덱스를 살피고 변경 전후를 측정했습니다. 측정값은 개발 및 검증 환경의 기록입니다.', projects: [{ ...ait, section: 'benchmarks' }] },
  { id: 'redis', name: 'Redis', logo: 'redis.svg', sampleLevel: '중하', summary: '분산 API 속도 제한 적용', evidence: 'SteamFolder에서 Bucket4j와 Redis를 연결해 API 속도 제한을 적용했습니다. 개인 프로젝트는 현재 로컬 개발 중입니다.', projects: [steam] },
  { id: 'git', name: 'Git', logo: 'git.svg', sampleLevel: '상중', summary: '팀의 브랜치 작업 가이드 작성 및 공유', evidence: 'Ait에서 Git Flow를 제안하고 Git에 익숙하지 않은 팀원을 위해 명령어와 브랜치 작업 순서 가이드를 작성했습니다.', projects: [ait] },
]
