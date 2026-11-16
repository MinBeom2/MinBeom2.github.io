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
  columns?: string[]
  alternatives: { method: string; difference: string; values?: string[]; selected?: boolean; reference?: TechnologyReference }[]
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
        problem: '프로젝트 기간이 촉박해 구현까지만 마쳤고, 조회 성능은 손보지 못했습니다. 끝난 뒤 채팅 이력과 댓글 조회에 부하를 주며 쿼리와 연관 데이터 조회 방식을 살펴봤습니다.',
        decision: '채팅은 기존 ID 커서와 정렬을 유지하면서 작성자 조인을 분리했습니다. 댓글은 (post_id, parent_id, created_at) 복합 인덱스 적용 전후를 비교했습니다.',
        outcome: '개발 및 검증 환경에서 조회 방식과 인덱스 변경 전후의 응답 시간과 TPS를 비교했습니다.',
      },
      {
        id: 'benchmark-check',
        title: '인증 실패 응답을 성능 향상으로 잘못 읽은 기록 바로잡기',
        problem: '게시글 검색 테스트에서 TPS가 129.26에서 1,276.13으로 올라, 약 10배 개선으로 정리한 적이 있습니다.',
        decision: 'nGrinder의 CSV와 실행 로그를 다시 대조했습니다. 변경 후 테스트의 69,386건이 모두 응답 오류로 집계돼 있었고, 로그에는 HTTP 401 인증 실패가 남아 있었습니다. nGrinder 화면의 Errors는 0이었습니다.',
        outcome: '이 수치를 성능 개선 성과에서 뺐습니다. 부하 테스트는 HTTP 상태와 응답 오류 수까지 확인한 실행끼리 비교해야 한다는 점을 배웠습니다.',
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
        title: 'WebGL 배포본의 카메라 API 주소 수정',
        problem: 'Unity WebGL 배포본이 카메라 API를 localhost로 요청하는 문제를 경험했습니다.',
        decision: 'WebGL 페이지 주소에서 카메라 API 호스트를 계산하도록 수정했습니다. Unity WebGL의 HTTP 요청 허용 설정도 추가했습니다.',
        outcome: 'localhost를 향하던 카메라 API 요청 주소를 수정했습니다. 배포 주소가 바뀌어도 화면이 접속한 호스트를 기준으로 API를 호출합니다.',
      },
    ],
    results: [
      'RTSP 송출, MediaMTX 구성과 Spring Boot 카메라 관제 API를 구현했습니다.',
      'Compose 실행과 배포 연결, 녹화 설정과 설비별 스트림 매핑을 보완했습니다.',
      'WebGL 배포본이 localhost로 보내던 카메라 API 요청 주소를 수정했습니다.',
    ],
  },
  nyamnyam: {
    technologyDecision: {
      title: '신고 1차 검토에 금칙어 필터 대신 LLM',
      background: '신고된 글을 사람이 확인하기 전에, 명백한 스팸과 내용 없는 욕설은 바로 숨기고 싶었습니다. 금칙어 필터는 욕설 단어가 섞인 정상 글까지 숨기고, 목록에 없는 표현의 스팸은 놓칩니다. 그래서 직접 만든 데이터와 공개 데이터로 LLM과 금칙어 필터를 비교했습니다.',
      implementation: '대상의 첫 신고가 들어오면 신고 저장이 끝난 뒤 별도 스레드에서 LLM(gpt-4o)에 판단을 맡깁니다. 스팸이나 욕설로 판단하고 신뢰도가 0.95 이상일 때만 바로 숨기고 Mattermost로 알립니다. 나머지는 신고 3건 자동 숨김과 사람 검토로 넘깁니다. 사용자 글은 JSON 값으로만 전달해 글 속 지시문이 프롬프트로 읽히지 않게 했습니다.',
      comparisonTitle: 'LLM과 금칙어 필터 비교 (직접 만든 100건)',
      comparisonNote: '직접 만들고 판단 기준을 정할 때는 쓰지 않은 100건(숨김 30, 유지 70)에 신뢰도 기준 0.9로 1회 실행한 결과입니다.',
      columns: ['정밀도', '재현율', '오탐'],
      alternatives: [
        { method: 'LLM (gpt-4o)', selected: true, values: ['85.7%', '100%', '5건 (7.1%)'], difference: '오탐 5건은 모두 모임 오픈채팅이나 동호회 카페 같은 취미 관련 링크였습니다.' },
        { method: '금칙어 필터', values: ['45.2%', '46.7%', '17건 (24.3%)'], difference: '숨겨야 할 30건 중 절반 넘게 놓쳤습니다.' },
      ],
      additionalComparisons: [
        {
          comparisonTitle: '즉시 숨김 기준 0.9와 0.95 비교 (공개 댓글 800건)',
          comparisonNote: 'Smilegate UnSmile 공개 데이터에서 정상 500건과 악플 300건을 무작위로 뽑았습니다. 악플 라벨이 서비스 기준보다 넓어 정밀도와 재현율은 계산하지 않았습니다. 라벨은 고치지 않은 원래 값으로 셌습니다.',
          columns: ['정상 500건 중 오탐', '악플 300건 중 즉시 숨김'],
          alternatives: [
            { method: 'LLM 기준 0.95', selected: true, values: ['4건 (0.8%)', '65건 (22%)'], difference: '' },
            { method: 'LLM 기준 0.9', values: ['24건 (4.8%)', '129건 (43%)'], difference: '오탐 24건 중 20건의 신뢰도가 정확히 0.9였습니다.' },
            { method: '금칙어 필터', values: ['8건 (1.6%)', '87건 (29%)'], difference: '' },
          ],
        },
      ],
      limitation: '모든 수치는 데이터셋마다 1회 실행한 결과이고, 100건은 직접 만든 데이터입니다. 기준을 0.95로 올리면서 악플 즉시 숨김이 43%에서 22%로 줄었습니다. 즉시 숨김은 확실한 경우만 맡기고, 나머지는 신고 3건 규칙과 사람 검토로 처리합니다.',
    },
    techChoices: [
      {
        technology: 'YouTube Data API / LLM',
        use: '취미별 키워드로 숏폼을 검색하고 LLM으로 취미 영상인지 판별했습니다. 하루 할당량 상한을 두고 실행 기록을 남겼습니다.',
      },
      {
        technology: 'Redis / Bucket4j',
        use: 'API 그룹별 토큰 버킷으로 요청 수를 제한했습니다. 실제 Redis에 동시 요청을 보내는 테스트를 작성했습니다.',
      },
      {
        technology: 'PostgreSQL / Flyway',
        use: '좋아요 중복은 INSERT ON CONFLICT로 막았습니다. 판별 기준을 바꿀 때 이전 기준으로 제외된 영상을 마이그레이션으로 지웠습니다.',
      },
      {
        technology: 'Mattermost',
        use: '신고를 매시 정각 비공개 채널에 모아 알리고, 숨기기와 유지 버튼으로 처리하게 했습니다.',
      },
    ],
    cases: [
      {
        id: 'report-ai',
        title: '신고 AI의 오탐 원인을 기준값이 아닌 정의에서 찾기',
        problem: '직접 만든 100건에서 LLM이 정상 글 5건을 스팸으로 숨겼습니다. 모임 오픈채팅, 동호회 카페, 본인 블로그와 도안처럼 모두 취미와 관련된 링크였습니다.',
        decision: '신뢰도 기준을 0.95로 올려 봐도 오탐이 2건 남았습니다. 기준값보다 스팸의 정의가 문제라고 보고, 스팸을 "취미와 무관한 돈벌이 홍보"로 좁혔습니다. 다른 사람의 전화번호가 담긴 글을 스팸으로 본 오탐도 있어, 개인정보가 담긴 글은 즉시 숨김 대상에서 뺐습니다.',
        outcome: '정의를 고친 뒤 같은 100건에서 오탐이 0건이 됐습니다. 즉시 숨김 기준 0.95는 이와 별도로 공개 댓글 800건의 오탐을 보고 정했습니다.',
        note: '오탐 0건은 결과를 보고 고친 같은 데이터에서 다시 잰 참고치입니다. 처음 보는 데이터 기준 정밀도는 85.7%입니다.',
      },
      {
        id: 'short-filter',
        title: '취미 영상까지 제외하던 숏폼 판별 기준 완화',
        problem: '처음 판별 기준은 "그 취미를 처음 시작하려는 사람에게 보여 줄 영상"으로 좁았고, "취미와 관계없는 일상"을 제외 대상으로 두었습니다. "취미 영상 아님" 판정도 신뢰도 0.7만 넘으면 바로 제외했습니다. 이 기준으로는 선수 경기 장면, 브이로그, 가족 영상처럼 취미를 다루는 영상까지 빠질 수 있었습니다.',
        decision: '이런 영상을 통과 대상으로 프롬프트에 적고, 제외 대상은 뉴스 보도, 광고와 협찬, 무관한 영상으로 줄였습니다. "취미 영상 아님"은 신뢰도 0.9 이상일 때만 제외하고, 그 아래는 사람이 확인하도록 보냈습니다. 제외한 영상에도 어느 취미에서 나왔는지 남겨 취미별로 빠지는 영상을 볼 수 있게 했습니다.',
        outcome: '이전 기준으로 제외된 영상은 마이그레이션으로 지워, 다음 수집 때 새 기준으로 다시 판별되게 했습니다.',
        note: '기준을 바꾸기 전후의 제외 비율은 측정하지 않았습니다.',
      },
      {
        id: 'rate-limit',
        title: 'Redis 장애 때 막을 요청과 통과시킬 요청 나누기',
        problem: '요청 제한 상태를 Redis에 두면, Redis가 멈췄을 때 API를 막을지 통과시킬지 정해야 했습니다. 모두 막으면 조회까지 멈추고, 모두 통과시키면 메일 발송과 유료 LLM 호출이 제한 없이 나갈 수 있었습니다.',
        decision: 'API를 메일 발송, 인증, AI 추천, 업로드, 글 작성, 그 밖의 변경, 조회의 7개 그룹으로 나눴습니다. Redis 장애 때는 비용이 드는 메일 발송과 AI 추천만 503으로 막고 나머지는 통과시켰습니다. 인증 API는 계정을 바꿔 가며 시도할 수 있어 로그인 여부와 상관없이 IP로 셉니다.',
        outcome: '실제 Redis에 한 사용자의 AI 추천 요청 100건을 동시에 보내 한도인 10건만 통과하는 것을 테스트로 확인했습니다. 다른 사용자의 버킷이 서로 영향을 주지 않는 것도 확인했습니다.',
        note: '운영 중 Redis 장애를 겪은 기록은 없습니다.',
      },
      {
        title: 'Mattermost 버튼으로 신고 처리',
        problem: '운영자가 신고를 바로 보고 처리할 수 있어야 했습니다. Mattermost 버튼으로 처리하기로 하면서, 위조된 버튼 요청과 같은 신고를 두 번 처리하는 경우를 막아야 했습니다.',
        decision: '서로 다른 사용자 3명이 신고하면 먼저 자동으로 숨기고, 매시 정각 비공개 채널에 대상별로 모아 알립니다. 버튼 요청은 HMAC 서명을 확인한 뒤 처리하고, 처리 전 상태인 신고만 바꾸는 조건부 UPDATE를 썼습니다. 이미 처리된 신고라면 상태는 두고 메시지만 최신으로 바꿉니다. 알림 본문의 멘션과 마크다운은 무력화했습니다.',
        outcome: '자동 숨김된 글을 유지로 처리하면 다시 노출되고, 처리한 사람과 결과가 신고 기록에 남도록 구현했습니다.',
      },
    ],
    results: [
      '직접 만든 100건에서 신고 AI가 정밀도 85.7%, 재현율 100%로 금칙어 필터(45.2%, 46.7%)보다 정확했습니다. 공개 데이터 정상 500건의 오탐은 기준 0.95에서 4건이었습니다.',
      'YouTube 하루 할당량 안에서 숏폼을 모아 매주 서비스에 반영하는 수집 배치를 만들었습니다.',
      '팀 서버에 배포했습니다. 실제 사용자 테스트 결과는 아직 없습니다.',
    ],
  },
  steamfolder: {
    technologyDecision: {
      title: '서버 간 요청 제한 상태를 공유하기 위한 Redis',
      background: '서버 한 대로 개발하는 단계에서는 인메모리 방식으로도 충분합니다. 다만 서버가 여러 대로 늘어나면 각 서버가 요청 횟수를 따로 세는 방식으로는 사용자별 전체 요청량을 제한하기 어렵다고 판단해 Redis를 선택했습니다.',
      implementation: 'Bucket4j와 Redis로 사용자별 요청 제한 상태를 관리합니다. 여러 서버가 같은 제한 상태를 참조할 수 있도록 구성했습니다.',
      comparisonTitle: '인메모리와 Redis 요청 제한 비교',
      alternatives: [
        { method: '인메모리', difference: '별도 저장소 없이 서버 프로세스 안에서 제한 상태를 관리합니다. 단일 서버에서는 간단하지만, 여러 서버의 상태는 각각 나뉩니다.' },
        { method: 'Redis', selected: true, difference: '서버들이 같은 저장소에서 사용자별 제한 상태를 공유할 수 있습니다. 대신 Redis 운영과 네트워크 통신, 저장소 장애 시의 처리까지 고려해야 합니다.' },
      ],
      limitation: '로컬의 단일 서버에서만 개발했습니다. 여러 서버가 동일한 제한을 적용하는지는 실제 다중 서버 환경에서 아직 검증하지 않았습니다.',
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
      {
        technology: 'Spring Boot Actuator / Discord Webhook',
        use: '서버 상태 확인과 오류 알림에 사용했습니다. 외부에는 health 엔드포인트만 공개하고 구성 요소별 세부 상태는 응답에서 숨겼습니다.',
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
      {
        id: 'like-concurrency',
        title: '쇼케이스 좋아요의 동시 요청 처리',
        problem: '여러 사용자가 같은 쇼케이스에 동시에 좋아요를 누르면 좋아요 수가 덜 올라갈 수 있었습니다. 같은 사용자가 버튼을 연달아 누르는 경우도 막아야 했습니다.',
        decision: '좋아요를 누른 사용자의 행을 비관적 락으로 조회해 같은 사용자의 요청을 순서대로 처리했습니다. 좋아요 수는 값을 읽어서 더하지 않고 DB의 증감 쿼리로 바꿨습니다.',
        outcome: '서로 다른 사용자 30명이 동시에 좋아요를 누르는 테스트에서 좋아요 수가 30으로 맞았습니다. 같은 사용자가 10번을 동시에 누르는 테스트도 오류 없이 통과했습니다.',
        note: 'Ait에서는 게시글 행에 락을 걸었고, 여기서는 다른 방식을 적용해 봤습니다.',
      },
      {
        id: 'steam-achievements',
        title: 'Steam 업적 조회 실패의 원인 구분',
        problem: '업적이 없는 게임을 조회하면 Steam은 HTTP 400과 함께 "Requested app has no stats"를 돌려줍니다. 이 응답을 비공개 프로필이나 서버 장애와 구분해야 했습니다. 내용을 확인할 수 없는 빈 400 응답까지 업적 0개로 처리하던 부분도 있었습니다.',
        decision: '본문을 문자열로 받은 뒤 JSON을 검증해, 업적 없음이 명시된 응답만 정상 0개로 처리했습니다. 비공개는 별도 오류로, HTTP 장애와 타임아웃, 해석할 수 없는 응답은 외부 연동 실패로 나눴습니다. 실패했을 때는 기존 통계와 캐시를 그대로 둡니다.',
        outcome: '실제 Steam 응답을 테스트 자료로 저장하고 업적 없음, 비공개, 장애, 타임아웃을 각각 테스트했습니다. 수정 후 전체 테스트 272개가 통과했습니다.',
      },
      {
        id: 'monitoring',
        title: '서버 상태와 오류를 Discord로 알림',
        problem: '혼자 개발하고 운영할 서비스라 서버가 멈추거나 예상하지 못한 오류가 나도 바로 알아차리기 어렵다고 봤습니다. 알림을 붙이더라도 같은 오류가 반복되면 알림이 쏟아지고, 오류 내용에 섞인 비밀값이 외부 메신저로 나갈 수 있다는 점도 고려해야 했습니다.',
        decision: 'Spring Boot Actuator로 DB, Redis, 디스크를 포함한 서버 상태를 1분마다 확인하고, 정상에서 비정상으로 바뀔 때와 다시 복구될 때만 Discord로 알리도록 했습니다. 장애 알림에는 비정상인 구성 요소 이름을 함께 담았습니다. 처리하지 못한 예외는 요청 경로, 예외 종류와 줄인 스택 트레이스를 보냅니다. 같은 알림은 5분에 한 번만 보내고, 토큰과 비밀번호 같은 값은 전송 전에 가렸습니다. 알림은 별도 스레드에서 보내 전송이 실패해도 요청 처리에 영향을 주지 않게 했습니다.',
        outcome: '상태가 바뀔 때만 알리는지, 복구 알림, 반복 알림 억제, 긴 메시지 자르기, 웹훅 실패 격리와 health 응답의 세부 정보 숨김을 테스트 코드로 확인했습니다.',
        note: '로컬 개발 단계의 구현이며 실제 운영 중 장애를 감지한 기록은 아직 없습니다.',
      },
    ],
    results: [
      'Steam 로그인부터 보유 게임 정리와 쇼케이스 공유까지 화면과 API를 함께 구현했습니다.',
      '로컬 개발 단계입니다. 외부에 배포하지 않아 운영 성과는 없습니다.',
    ],
  },
}
