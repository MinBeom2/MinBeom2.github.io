import type { ProjectId } from './content'

export type CaseStudy = {
  title: string
  problem: string
  decision: string
  outcome: string
  note?: string
}

export type ProjectDetail = {
  techChoices: { technology: string; use: string }[]
  cases: CaseStudy[]
  results: string[]
  evidence: { label: string; detail: string }[]
}

export const projectDetails: Record<ProjectId, ProjectDetail> = {
  ait: {
    techChoices: [
      {
        technology: 'STOMP / WebSocket',
        use: '그룹별 채팅 메시지를 저장하고 구독자에게 전달했습니다. 연결 시 JWT를 검증하고, 메시지 저장 전 그룹 멤버 여부를 확인했습니다.',
      },
      {
        technology: 'JPA / Slice / 커서 조회',
        use: '메시지 ID를 기준으로 다음 채팅 이력을 가져오도록 구현했습니다. 다른 조회에서는 Count 범위, 연관 조회와 배치 조회를 조정했습니다.',
      },
      {
        technology: 'SSE / nGrinder',
        use: '알림 전달에는 SSE와 heartbeat를 사용했습니다. nGrinder로 API 부하를 주고 조회 변경 전후의 결과를 기록했습니다.',
      },
    ],
    cases: [
      {
        title: '스터디 채팅의 권한 확인과 연결 관리',
        problem: '그룹 채팅에는 로그인한 사용자와 해당 그룹의 멤버를 확인하는 과정이 필요했습니다. 프론트엔드 배포 후에는 알림 SSE 연결이 끊기는 현상도 경험했습니다.',
        decision: 'STOMP 연결에서 JWT를 검증하고 메시지 저장 전 그룹 멤버 여부를 확인했습니다. SSE에는 주기적인 heartbeat와 연결 오류 시 emitter 정리를 추가했습니다.',
        outcome: '권한을 확인한 뒤 그룹별 메시지를 저장하고 전달하도록 구현했습니다. 채팅 이력은 메시지 ID 커서와 Slice로 조회하도록 구성했습니다.',
        note: 'SSE 연결 끊김의 단일 원인과 안정화 정도는 확정하거나 수치로 측정하지 않았습니다.',
      },
      {
        title: '조회 방식에 따라 달라지는 병목 확인',
        problem: '게시글 목록, 채팅 이력과 댓글 조회를 부하 테스트하며 응답 시간을 확인했습니다. 조회 대상 데이터가 늘어난 조건에서 쿼리와 연관 데이터 조회 방식을 살펴봤습니다.',
        decision: 'SQL 실행 계획과 정렬 인덱스를 살피며 제한된 Count, fetch join 분리, 배치 조회와 커서 조회를 적용했습니다. 변경 전후를 nGrinder로 측정해 기록했습니다.',
        outcome: '개발 및 검증 환경에서 조회 변경 전후의 응답 시간과 TPS를 확인했습니다. 각 실험의 조건과 수치는 성능 검증 결과에 정리했습니다.',
        note: '여러 변경을 함께 적용한 결과입니다. LIKE 검색 조건을 제외한 실험은 병목을 진단하기 위한 비교이며, 검색 기능을 유지한 개선 결과로 제시하지 않습니다.',
      },
      {
        title: '프로젝트 종료 후 좋아요 수 정합성 개선',
        problem: '팀 프로젝트 종료 후 개인 부하 테스트에서 같은 게시글의 좋아요 수가 정확히 증가하지 않는 문제를 확인했습니다. 별도 개인 브랜치에서 동시 갱신 처리를 개선했습니다.',
        decision: '좋아요 추가하거나 취소할 때 게시글을 비관적 쓰기 락으로 조회하도록 변경했습니다. 사용자 100명의 요청을 32개 작업 스레드로 실행하는 통합 테스트를 작성했습니다.',
        outcome: '총 100건의 좋아요 요청 후 최종 좋아요 수가 100인지 검증했습니다. 처리량이나 응답 시간 향상보다 카운트 정합성을 확인한 작업입니다.',
        note: '개인 개선 브랜치의 작업이며 팀 master 브랜치와 배포 버전에는 반영되지 않았습니다. 이 변경만의 전후 처리량과 응답 시간은 측정하지 않았습니다.',
      },
    ],
    results: [
      '스터디 그룹 신청, 승인, 거절과 일정 API, 커뮤니티와 알림 API를 구현했습니다.',
      '채팅 인증과 멤버 권한 확인과 커서 이력 조회를 구현하고, 알림 SSE에 heartbeat와 연결 정리를 추가했습니다.',
      '개발 및 검증 환경의 조회 실험과 프로젝트 종료 후 개인 브랜치의 좋아요 정합성 검증을 기록했습니다.',
    ],
    evidence: [
      {
        label: '스터디와 실시간 연결',
        detail: '커밋 8721f55, 71f0c5f의 신청과 일정 API와 8fdf2ae, 736cc1d의 채팅 구현을 조사했습니다. StompHandler.java, StudyGroupChatController.java, StudyGroupChatService.java에 인증과 멤버 확인과 커서 조회가 기록되어 있습니다.',
      },
      {
        label: 'SSE와 협업 기록',
        detail: '커밋 1a23e0c와 NotificationSseService.java에 heartbeat와 연결 정리가 있습니다. 커밋 b2dc022의 README.md와 docs/Git_command.md에는 팀원에게 공유한 브랜치 작업 순서와 명령어 가이드가 있습니다.',
      },
      {
        label: '개인 개선 브랜치',
        detail: '커밋 2adfa5d는 minbeom/Improve 브랜치의 비관적 락 변경입니다. 같은 브랜치의 PostInteractionServiceConcurrencyTest.java에 최종 좋아요 수 100을 확인하는 검증 코드가 있습니다.',
      },
    ],
  },
  onework: {
    techChoices: [
      {
        technology: 'RTSP / MediaMTX / WebRTC WHEP',
        use: '웹캠이나 CCTV의 RTSP 영상을 MediaMTX로 받아 웹과 Unity 뷰어에 전달하는 경로를 구성했습니다. 송출 스크립트와 MediaMTX 설정을 함께 작성했습니다.',
      },
      {
        technology: 'Spring Boot 카메라 API',
        use: '관제 화면에서 카메라와 스트림을 조회하는 API를 구현했습니다. 설비 ID와 카메라 스트림을 매핑하는 연결을 보완했습니다.',
      },
      {
        technology: 'Docker Compose / 녹화 설정',
        use: 'MediaMTX 실행과 배포 구성을 연결했습니다. 녹화 경로와 보관 설정과 배포 볼륨을 구성했습니다.',
      },
    ],
    cases: [
      {
        title: '카메라에서 관제 화면까지 영상 전달',
        problem: '카메라 영상을 브라우저와 Unity 디지털 트윈에서 확인할 수 있도록 연결해야 했습니다. 제 담당 범위는 영상 송출 경로와 카메라 관제 API였습니다.',
        decision: 'RTSP 송출 스크립트와 MediaMTX를 구성하고 WebRTC WHEP로 뷰어에 전달하도록 구현했습니다. Spring Boot 카메라 API와 테스트 뷰어도 작성했습니다.',
        outcome: '카메라 송출, 스트림 중계와 관제 조회에 필요한 구성 요소를 구현했습니다. RTSP → MediaMTX → WebRTC WHEP 경로를 문서로 남겼습니다.',
        note: '팀의 3D 디지털 트윈과 전체 데이터 처리 파이프라인을 모두 개인 기여로 제시하지 않습니다. 영상 지연시간은 직접 측정하지 않았습니다.',
      },
      {
        title: '실행과 녹화 설정과 설비별 스트림 매핑',
        problem: '카메라 구성을 로컬 실행과 배포 환경에 연결하는 작업이 필요했습니다. 관제 화면에서 설비에 해당하는 영상과 녹화 설정을 함께 관리하도록 보완했습니다.',
        decision: '로컬 Compose와 배포 구성을 연결하고 fMP4 녹화 경로와 보관 설정을 추가했습니다. 원격 송출 스크립트와 설비 ID와 카메라 스트림의 매핑을 보완했습니다.',
        outcome: '송출, 중계, 녹화 구성을 코드와 설정으로 정리했습니다. 설비 ID를 기준으로 해당 카메라 스트림을 조회하는 연결을 구현했습니다.',
      },
      {
        title: 'WebGL 배포 주소 수정과 HTTPS 연동의 한계',
        problem: 'Unity WebGL 배포본이 카메라 API를 localhost로 요청하는 문제를 경험했습니다. 이후 HTTPS로 전환하는 과정에서는 HTTP API와 WHEP 요청이 다시 차단됐습니다.',
        decision: 'WebGL 페이지 주소에서 카메라 API 호스트를 계산하도록 수정했습니다. Unity WebGL의 HTTP 요청 허용 설정도 추가했습니다.',
        outcome: 'localhost를 향하던 카메라 API 요청 주소를 수정했습니다. HTTPS 화면에서 HTTP 요청이 차단되는 통합 문제는 해결하지 못했습니다.',
        note: 'HTTPS 환경의 영상 재생이 정상화되었다고 제시하지 않습니다. 구현한 범위와 남은 연동 문제를 함께 기록했습니다.',
      },
    ],
    results: [
      'RTSP 송출, MediaMTX 구성과 Spring Boot 카메라 관제 API를 구현했습니다.',
      'Compose 실행과 배포 연결, 녹화 설정과 설비별 스트림 매핑을 보완했습니다.',
      'WebGL의 localhost 요청 주소를 수정했고, HTTPS 혼합 콘텐츠 차단 문제는 미해결로 기록했습니다.',
    ],
    evidence: [
      {
        label: '영상 전달 경로와 카메라 API',
        detail: '커밋 f2a358c에 초기 송출과 중계, API 구현이 있습니다. mediamtx.yml, README_CAMERA_SYSTEM.md, CameraController.java, CameraService.java에 설정과 처리 흐름이 기록되어 있습니다.',
      },
      {
        label: '실행, 녹화, 설비 매핑',
        detail: '커밋 d8244af, f4572be는 실행과 배포 연결, 42870b7은 녹화 설정입니다. docker-compose.mediamtx.yml과 mediamtx.yml을 보완했으며, 2817d1a와 a9bb3c7에서 원격 송출과 설비 매핑을 연결했습니다.',
      },
      {
        label: 'WebGL 주소와 HTTPS 제약',
        detail: '커밋 d9262fb는 API 호스트 수정, e1c91b4는 WebGL HTTP 요청 설정입니다. TwinCameraOverlay.cs, WebGlBuild.cs와 develop 브랜치의 twin-poc.html, deploy/caddy/README.md에 요청 경로와 HTTPS 제약이 기록되어 있습니다.',
      },
    ],
  },
  steamfolder: {
    techChoices: [
      {
        technology: 'Steam OpenID / JWT',
        use: 'Steam 로그인과 JWT 재발급을 구현했습니다. 보유 게임 동기화와 요청 쿨다운을 함께 구성했습니다.',
      },
      {
        technology: 'React / TypeScript',
        use: '데스크톱 형태의 폴더와 게임 화면과 공유 화면을 개발했습니다. 계층형 폴더와 2D 그리드 배치를 화면에 연결했습니다.',
      },
      {
        technology: 'Spring Boot / Redis',
        use: '폴더, 쇼케이스, 좋아요, 랭킹 API를 구현했습니다. 외부 연동과 서비스 API의 요청 수를 제한하는 Redis 기반 처리를 추가했습니다.',
      },
    ],
    cases: [
      {
        title: 'Steam 인증과 게임 라이브러리 동기화',
        problem: '보유 게임을 폴더로 정리하려면 Steam 계정과 게임 정보를 서비스에 연결해야 했습니다. 인증과 동기화 API를 프론트엔드와 함께 직접 개발했습니다.',
        decision: 'Steam OpenID 로그인, JWT 재발급과 보유 게임 동기화를 구현했습니다. 동기화 요청에는 쿨다운을 적용했습니다.',
        outcome: 'Steam 계정 인증부터 보유 게임을 가져오는 기능을 로컬 개발 단계에서 구현했습니다. 프론트엔드와 백엔드 두 저장소가 하나의 서비스를 구성합니다.',
      },
      {
        title: '최대 5단계 폴더와 2D 게임 배치',
        problem: 'Steam 라이브러리 화면까지 여러 단계를 거치지 않고 원하는 게임 목록을 보여주고 싶었습니다. 사용자가 기준을 정해 폴더로 정리하는 화면을 만들었습니다.',
        decision: '최대 5단계의 계층형 폴더와 2D 좌표 모델을 구현했습니다. React와 TypeScript의 데스크톱 화면에서 폴더와 게임을 배치하도록 연결했습니다.',
        outcome: '계층형 폴더와 게임 배치 화면을 로컬에서 구현했습니다. 정리한 게임 목록을 공개 쇼케이스 링크로 공유하는 기능을 연결했습니다.',
      },
      {
        title: '쇼케이스 상호작용과 요청 수 제한',
        problem: '쇼케이스를 공유한 뒤 좋아요와 랭킹을 조회하는 API가 필요했습니다. API에 들어오는 요청 수를 제한하는 처리도 함께 구현했습니다.',
        decision: '쇼케이스 좋아요와 랭킹, 커서 기반 목록 조회를 구현했습니다. Redis 기반 API 속도 제한과 관련 테스트 코드를 추가했습니다.',
        outcome: '공유 화면과 상호작용 API, 요청 수 제한을 로컬 개발 단계에서 구현했습니다. 외부에 배포하기 전인 개인 프로젝트로 정리했습니다.',
        note: '운영 트래픽이나 외부 배포의 성과 수치는 제시하지 않습니다.',
      },
    ],
    results: [
      '개인적으로 문제를 정의하고 Steam 인증과 동기화부터 폴더와 공유 화면까지 개발했습니다.',
      '최대 5단계 폴더, 2D 게임 배치와 공개 쇼케이스 기능을 구현했습니다.',
      '좋아요, 랭킹, 커서 조회와 Redis 속도 제한을 구현했으며, 현재 로컬 개발 중입니다.',
    ],
    evidence: [
      {
        label: '인증과 게임 동기화',
        detail: '프로젝트_정리_초안.md에 백엔드 커밋 cfe1e7f, fe54a27의 OpenID 검증, JWT, 게임 동기화와 쿨다운과 관련 테스트 코드가 기록되어 있습니다.',
      },
      {
        label: '폴더와 데스크톱 화면',
        detail: '백엔드 커밋 3d4f68f, 4d954dd와 프론트엔드 커밋 2b3366e를 조사했습니다. FolderService.java, DesktopCanvas.tsx, HomePage.tsx에 계층형 폴더와 화면 구현이 기록되어 있습니다.',
      },
      {
        label: '쇼케이스와 API 보호',
        detail: '프로젝트_정리_초안.md에 커밋 c21750c, 2663b70의 좋아요, 랭킹, 커서 조회와 afa5909, 83323a6의 Redis 속도 제한과 관련 테스트 코드가 기록되어 있습니다. GuestShowcasePage.tsx는 공개 공유 화면을 구성합니다.',
      },
    ],
  },
}