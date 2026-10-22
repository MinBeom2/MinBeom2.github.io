import type { ProjectId } from './content'

export type CaseStudy = {
  id?: string
  title: string
  problem: string
  decision: string
  outcome: string
  note?: string
}

type TechnologyReference = { label: string; url: string }

export type TechnologyComparison = {
  comparisonTitle: string
  comparisonNote?: string
  alternatives: { method: string; difference: string; selected?: boolean; reference?: TechnologyReference }[]
  reference?: TechnologyReference
}

export type TechnologyDecision = TechnologyComparison & {
  title: string
  background: string
  implementation: string
  selectionReasons?: { title: string; description: string; reference?: TechnologyReference }[]
  additionalComparisons?: TechnologyComparison[]
  limitation?: string
}

export type ProjectDetail = {
  technologyDecision: TechnologyDecision
  techChoices: { technology: string; use: string }[]
  cases: CaseStudy[]
  results: string[]
}

export const projectDetails: Record<ProjectId, ProjectDetail> = {
  ait: {
    technologyDecision: {
      title: 'SSE로 연결한 실시간 알림',
      background: '개발 기한이 얼마 남지 않은 시점에 알림을 추가하면서 구현 부담이 적은 방식을 우선했습니다. 서버에서 새 알림을 보내는 기능에는 SSE를 적용했습니다.',
      implementation: '채팅은 STOMP/WebSocket으로 메시지를 주고받고, 알림은 HTTP 연결을 유지하며 서버에서 전달하도록 구성했습니다.',
      comparisonTitle: 'SSE, 주기적 폴링, WebSocket 비교',
      alternatives: [
        { method: 'SSE', selected: true, difference: '서버에서 브라우저로 이벤트를 보냅니다. 새 알림을 바로 전달할 수 있지만, 연결 유지와 끊어진 뒤의 재연결을 다뤄야 합니다.' },
        { method: '주기적 폴링', difference: '일정 간격으로 알림 API를 조회합니다. 장시간 연결을 유지할 필요는 없지만, 조회 주기에 따라 알림이 늦어지고 새 알림이 없어도 요청이 발생합니다.' },
        { method: 'WebSocket', difference: '양방향 메시지 전송을 지원해 채팅과 알림을 모두 보낼 수 있습니다. 기존 채팅 연결을 활용하려면 알림의 메시지 형식과 구독 규칙을 추가해야 합니다.' },
      ],
      limitation: 'SSE를 선택해도 연결 관리가 사라지는 것은 아닙니다. 배포 후 알림 수신이 중단되는 문제를 겪었고, heartbeat와 emitter 정리로 대응했습니다.',
    },
    techChoices: [
      {
        technology: 'STOMP / WebSocket',
        use: '그룹별 채팅 메시지를 저장하고 구독자에게 전달했습니다. 연결 시 JWT를 검증하고, 메시지 저장 전 그룹 멤버 여부를 확인했습니다.',
      },
      {
        technology: 'JPA / Slice / 커서 조회',
        use: '메시지 ID를 기준으로 다음 채팅 이력을 가져오도록 구현했습니다. 작성자 정보는 별도로 조회하도록 조정했습니다.',
      },
      {
        technology: 'SSE',
        use: '알림 전달에 사용했습니다. 8초마다 heartbeat를 보내고 완료, timeout, 오류가 발생한 emitter를 정리했습니다.',
      },
      {
        technology: 'nGrinder',
        use: 'API에 부하를 주고 조회 변경 전후의 응답 시간과 TPS를 기록했습니다.',
      },
    ],
    cases: [
      {
        title: '스터디 채팅의 연결 인증과 전송 권한',
        problem: '그룹 채팅에는 로그인한 사용자와 해당 그룹의 멤버를 확인하는 과정이 필요했습니다.',
        decision: 'STOMP 연결에서 JWT를 검증하고 메시지 저장 전 그룹 멤버 여부를 확인했습니다.',
        outcome: '권한을 확인한 뒤 그룹별 메시지를 저장하고 전달하도록 구현했습니다. 채팅 이력은 메시지 ID 커서와 Slice로 조회하도록 구성했습니다.',
      },
      {
        title: 'Vercel 배포 후 알림 수신 문제와 heartbeat',
        problem: '프론트엔드를 Vercel에 배포한 뒤 SSE 알림이 수신되지 않는 문제를 겪었습니다. 배포 경로에서 장시간 연결이 어떻게 유지되는지 충분히 고려하지 못했습니다.',
        decision: 'Spring 백엔드에서 8초마다 heartbeat 주석을 보내도록 추가했습니다. 연결 완료, timeout, 오류가 발생한 emitter도 정리하도록 보완했습니다.',
        outcome: '변경 후 배포 환경에서 알림이 다시 수신되는 것을 확인했습니다. 기능 구현뿐 아니라 배포 환경의 연결 유지도 살펴야 한다는 점을 배웠습니다.',
        note: '연결 중단의 단일 원인은 확정하지 않았으며, 연결 유지 시간이나 끊김 감소 정도를 수치로 측정하지는 않았습니다.',
      },
      {
        id: 'github-webhook',
        title: 'ngrok으로 GitHub 웹훅을 로컬에서 검증',
        problem: '프론트엔드의 GitHub 연동 화면이 준비되기 전에 저장소 접근 권한 변경과 앱 삭제 이벤트를 처리하는 백엔드를 검증해야 했습니다.',
        decision: 'ngrok으로 로컬 Spring Boot 서버에 접근할 수 있는 공개 주소를 만들고 GitHub App의 Webhook URL로 연결했습니다. 수신한 요청은 HMAC SHA-256으로 서명을 검증한 뒤, 이벤트에 따라 저장소 목록을 재동기화하거나 앱 연동 정보를 삭제하도록 구현했습니다.',
        outcome: '실제 GitHub 이벤트를 로컬 서버로 받아 테스트했습니다. MySQL을 직접 조회해 연동 데이터가 추가되고 삭제되는 것까지 확인했습니다.',
      },
      {
        title: '채팅과 댓글 조회 방식 개선',
        problem: '채팅 이력과 댓글 조회를 부하 테스트하며 쿼리와 연관 데이터 조회 방식을 살펴봤습니다.',
        decision: '채팅은 기존 ID 커서와 정렬을 유지하면서 작성자 조인을 분리했습니다. 댓글은 복합 인덱스 적용 전후를 비교했습니다.',
        outcome: '개발 및 검증 환경에서 조회 방식과 인덱스 변경 전후의 응답 시간과 TPS를 비교했습니다.',
      },
      {
        id: 'concurrency',
        title: '프로젝트 종료 후 좋아요 수 정합성 개선',
        problem: '팀 프로젝트 종료 후 추가 부하 테스트에서 같은 게시글의 좋아요 수가 정확히 증가하지 않는 문제를 확인했습니다.',
        decision: '좋아요를 추가하거나 취소할 때 게시글을 비관적 쓰기 락으로 조회하도록 변경했습니다. 좋아요 요청 100건을 32개 작업 스레드로 실행하는 통합 테스트를 작성했습니다.',
        outcome: '총 100건의 좋아요 요청 후 최종 좋아요 수가 100인지 확인했습니다.',
      },
    ],
    results: [
      'heartbeat와 연결 정리를 추가한 뒤 배포 환경에서 알림이 다시 수신되는 것을 확인했습니다.',
      '개인 검증 환경에서 채팅 5만 건의 최신 50건을 조회한 평균 응답 시간이 1,804.71ms에서 131.59ms로 줄었습니다. Vuser 50으로 1분간 측정한 결과입니다.',
      '프로젝트 종료 후 좋아요 요청 100건을 32개 스레드로 실행해 최종 좋아요 수가 100인지 확인했습니다. 팀 배포 버전에는 반영하지 않은 추가 검증입니다.',
    ],
  },
  onework: {
    technologyDecision: {
      title: 'MediaMTX로 중계하고 WebRTC로 재생',
      background: 'RTSP 카메라 영상을 브라우저에서 실시간으로 보여주는 중계 서버가 필요했습니다. MediaMTX는 RTSP 입력, WebRTC 재생, 설비별 스트림 구분과 녹화를 비교적 단순한 구성으로 충족할 수 있어 프로젝트에 적합했습니다.',
      implementation: 'FFmpeg로 웹캠 영상을 H.264로 인코딩해 RTSP로 송출하고 MediaMTX에서 WebRTC WHEP로 중계합니다. Unity WebGL의 CCTV 버튼을 누르면 JavaScript 브릿지를 통해 같은 페이지에 겹쳐 놓은 HTML 영상 창에서 재생합니다.',
      selectionReasons: [
        { title: 'RTSP 입력에서 브라우저 재생까지 연결', description: 'RTSP 입력과 WebRTC 출력을 함께 지원하므로 중계 기능을 직접 개발하는 범위를 줄일 수 있었습니다. 코덱을 바꿔야 할 때는 MediaMTX에 FFmpeg나 GStreamer를 함께 사용해야 합니다.', reference: { label: 'MediaMTX의 재인코딩 설명', url: 'https://mediamtx.org/docs/features/remuxing-reencoding-compression' } },
        { title: 'Docker와 YAML로 실행 구성', description: 'MediaMTX는 별도 런타임 의존성이 없는 단일 실행 파일로 제공됩니다. 프로젝트에서는 Docker와 YAML 설정으로 실행해 로컬에서도 같은 영상 전달 경로를 구성했습니다.' },
        { title: '설비별 스트림 경로와 녹화 설정', description: 'live/fan-01처럼 경로로 영상을 구분하고 녹화를 설정할 수 있습니다. 실제 프로젝트에도 설비별 스트림 매핑, fMP4 녹화 경로와 보관 설정을 적용했습니다.', reference: { label: 'MediaMTX의 녹화 설정 설명', url: 'https://mediamtx.org/docs/features/record' } },
        { title: '실시간 관제에 맞춘 WebRTC 재생', description: '설비를 선택해 현재 영상을 확인하는 화면이므로 지연을 줄이는 것이 중요했습니다. WebRTC 재생을 선택한 이유이며, MediaMTX가 다른 WebRTC 서버보다 빠르다고 측정한 결과는 아닙니다.' },
      ],
      comparisonTitle: 'MediaMTX와 다른 중계 서버 비교',
      comparisonNote: '현재 구조에서 가능한 대안을 정리한 비교입니다. 당시 이 제품들을 모두 구현하거나 성능을 측정해 비교한 것은 아닙니다.',
      alternatives: [
        { method: 'MediaMTX', selected: true, difference: 'RTSP 입력을 WebRTC로 중계하고 경로별 스트림과 녹화를 함께 설정할 수 있습니다. 필요했던 영상 전달 경로와 녹화 설정을 이 서버에 구성했습니다.' },
        { method: 'go2rtc', difference: 'RTSP 영상을 받아 WebRTC로 전달하는 직접적인 대안입니다. 교체하려면 기존 재생 코드, 카메라 API와 녹화 구성을 새 서버에 맞춰야 합니다.', reference: { label: 'go2rtc 공식 문서', url: 'https://github.com/AlexxIT/go2rtc' } },
        { method: 'Janus Gateway', difference: 'Streaming 플러그인으로 RTSP/RTP 영상을 WebRTC로 중계할 수 있습니다. 스트림 등록과 Janus 세션, 플러그인 API에 맞춘 연동이 필요합니다.', reference: { label: 'Janus Streaming 공식 문서', url: 'https://janus.conf.meetecho.com/docs/streaming' } },
        { method: 'OvenMediaEngine', difference: 'RTSP 입력과 WebRTC, LL-HLS 출력을 지원합니다. 내장 트랜스코딩과 여러 화질 제공까지 필요하다면 검토할 수 있으며, 요구 범위에 맞춘 구성이 필요합니다.', reference: { label: 'OvenMediaEngine 공식 문서', url: 'https://ovenmedia.com/docs/ome' } },
      ],
      reference: { label: 'MediaMTX 공식 소개', url: 'https://mediamtx.org/docs/kickoff/introduction' },
      additionalComparisons: [
        {
          comparisonTitle: 'WebRTC/WHEP와 HLS 비교',
          alternatives: [
            { method: 'WebRTC/WHEP', selected: true, difference: '관제 화면의 영상 지연을 줄이는 데 초점을 둔 경로입니다. HLS보다 낮은 지연을 기대할 수 있지만, 미디어 포트와 네트워크 연결 설정을 함께 다뤄야 합니다.' },
            { method: 'HLS', difference: '같은 MediaMTX에서 제공할 수 있는 다른 재생 경로입니다. HTTP를 이용해 연결 구성이 상대적으로 간단하지만, WebRTC보다 영상 지연이 커질 수 있습니다.' },
          ],
          reference: { label: 'MediaMTX의 브라우저 재생 설명', url: 'https://mediamtx.org/docs/read/web-browsers' },
        },
      ],
    },
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
        outcome: '카메라 송출, 스트림 중계와 관제 조회에 필요한 구성 요소를 구현했습니다. RTSP 입력, MediaMTX 중계와 WebRTC WHEP 재생 경로를 문서로 남겼습니다.',
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
      'WebGL의 localhost 요청 주소를 수정했고 HTTPS 혼합 콘텐츠 차단 문제는 미해결로 기록했습니다.',
    ],
  },
  steamfolder: {
    technologyDecision: {
      title: '서버 간 요청 제한 상태를 공유하기 위한 Redis',
      background: '현재처럼 서버 한 대로 개발할 때는 인메모리 방식으로도 충분합니다. 다만 서버가 여러 대로 늘어나면 각 서버가 요청 횟수를 따로 세는 방식으로는 사용자별 전체 요청량을 제한하기 어렵다고 판단해 Redis를 선택했습니다.',
      implementation: 'Bucket4j와 Redis로 사용자별 요청 제한 상태를 관리합니다. 여러 서버가 같은 제한 상태를 참조할 수 있도록 구성했습니다.',
      comparisonTitle: '인메모리와 Redis 요청 제한 비교',
      alternatives: [
        { method: '인메모리', difference: '별도 저장소 없이 서버 프로세스 안에서 제한 상태를 관리합니다. 단일 서버에서는 간단하지만, 여러 서버의 상태는 각각 나뉩니다.' },
        { method: 'Redis', selected: true, difference: '서버들이 같은 저장소에서 사용자별 제한 상태를 공유할 수 있습니다. 대신 Redis 운영과 네트워크 통신, 저장소 장애 시의 처리까지 고려해야 합니다.' },
      ],
      limitation: '현재는 로컬의 단일 서버에서 개발하고 있습니다. 여러 서버가 동일한 제한을 적용하는지는 실제 다중 서버 환경에서 아직 검증하지 않았습니다.',
      reference: { label: 'Bucket4j 8.17의 로컬과 분산 버킷 설명', url: 'https://bucket4j.com/8.17.0/toc.html' },
    },
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
        note: '운영 트래픽이나 외부 배포의 성과 수치는 제시하지 않습니다. Redis의 제한 상태 공유를 실제 다중 서버 환경에서 검증하지는 않았습니다.',
      },
    ],
    results: [
      'Steam 로그인부터 보유 게임 정리와 쇼케이스 공유까지 화면과 API를 함께 구현했습니다.',
      '현재 로컬에서 개발하고 있습니다. 외부 배포 후 사용자 피드백을 받을 계획이며 운영 성과는 아직 없습니다.',
    ],
  },
}
