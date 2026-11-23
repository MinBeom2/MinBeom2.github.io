import { chatHistoryBenchmark } from './content'
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
  id?: string
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
  techChoices: { id?: string; technology: string; use: string }[]
  cases: CaseStudy[]
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
    },
    techChoices: [
      {
        technology: 'STOMP / WebSocket',
        use: '그룹별 채팅 메시지를 저장하고 구독자에게 전달했습니다. 연결 시 JWT를 검증하고, 메시지 저장 전 그룹 멤버 여부를 확인했습니다.',
      },
      {
        id: 'jpa',
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
        id: 'chat-history',
        title: '작성자 조인을 분리한 채팅 이력 조회',
        problem: '프로젝트 종료 후 최신 채팅 이력을 조회하는 쿼리에 부하를 주고 연관 데이터 조회 방식을 살폈습니다.',
        decision: '메시지 ID 커서와 정렬은 유지하고 작성자 조인을 분리했습니다.',
        outcome: `평균 응답 시간이 ${chatHistoryBenchmark.before} ms에서 ${chatHistoryBenchmark.after} ms로 줄었습니다. 채팅 5만 건에서 최신 50건을 조회했고, 개인 검증 환경에서 Vuser 50으로 1분간 측정했습니다.`,
      },
      {
        title: '배포 후 끊긴 SSE 알림 복구',
        problem: '프론트엔드를 Vercel에 배포한 뒤 SSE 알림이 수신되지 않았습니다.',
        decision: '연결 직후 초기 SSE 이벤트를 보내고, 이후 8초마다 heartbeat 주석을 보냈습니다. 완료·타임아웃·오류가 발생한 연결은 정리했습니다.',
        outcome: '변경 후 배포 환경에서 알림이 다시 수신되는 것을 확인했습니다.',
        note: '연결 중단의 단일 원인과 끊김 감소 정도는 확인하지 못했습니다.',
      },
      {
        id: 'concurrency',
        title: '프로젝트 종료 후 좋아요 수 정합성 개선',
        problem: '팀 프로젝트 종료 후 추가 부하 테스트에서 같은 게시글의 좋아요 수가 정확히 증가하지 않는 문제를 확인했습니다.',
        decision: '좋아요를 추가하거나 취소할 때 게시글을 비관적 쓰기 락으로 조회하도록 변경했습니다. 좋아요 요청 100건을 32개 작업 스레드로 실행하는 통합 테스트를 작성했습니다.',
        outcome: '32개 작업 스레드로 요청 100건을 실행해 최종 좋아요 수가 100개인 것을 확인했습니다. 프로젝트 종료 후 개인 개선이며 팀 배포에는 반영되지 않았습니다.',
      },
      {
        title: '스터디 채팅의 연결 인증과 전송 권한',
        problem: '그룹 채팅에는 로그인한 사용자와 해당 그룹의 멤버를 확인하는 과정이 필요했습니다.',
        decision: 'STOMP 연결에서 JWT를 검증하고 메시지 저장 전 그룹 멤버 여부를 확인했습니다.',
        outcome: '권한을 확인한 뒤 그룹별 메시지를 저장하고 전달하도록 구현했습니다. 채팅 이력은 메시지 ID 커서와 Slice로 조회하도록 구성했습니다.',
      },
      {
        id: 'github-webhook',
        title: 'ngrok으로 GitHub 웹훅을 로컬에서 검증',
        problem: '프론트엔드의 GitHub 연동 화면이 준비되기 전에 저장소 접근 권한 변경과 앱 삭제 이벤트를 처리하는 백엔드를 검증해야 했습니다.',
        decision: 'ngrok으로 로컬 Spring Boot 서버에 접근할 수 있는 공개 주소를 만들고 GitHub App의 Webhook URL로 연결했습니다. 수신한 요청은 HMAC SHA-256으로 서명을 검증한 뒤, 이벤트에 따라 저장소 목록을 재동기화하거나 앱 연동 정보를 삭제하도록 구현했습니다.',
        outcome: '실제 GitHub 이벤트를 로컬 서버로 받아 테스트했습니다. MySQL을 직접 조회해 연동 데이터가 추가되고 삭제되는 것까지 확인했습니다.',
      },
      {
        id: 'benchmark-check',
        title: 'HTTP 401이 나온 부하 실험 제외',
        problem: 'nGrinder 화면의 Errors가 0으로 표시돼 게시글 검색 실행을 정상으로 읽었습니다.',
        decision: 'CSV의 응답 오류 수와 실행 로그를 대조해 HTTP 401 인증 실패를 확인했습니다.',
        outcome: '해당 실행을 성능 비교에서 제외했습니다.',
      },
    ],
  },
  onework: {
    technologyDecision: {
      title: 'MediaMTX로 중계하고 WebRTC로 재생',
      background: 'MediaMTX 한 곳에서 설비별 RTSP 입력, 브라우저의 WebRTC 재생과 녹화를 설정할 수 있어 선택했습니다.',
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
        id: 'camera-api',
        title: '설비별 카메라 전환과 API 응답 검증',
        problem: '디지털 트윈에서 고른 설비와 영상 스트림을 연결하고, 잘못된 설비 요청이나 활성 카메라가 없는 상태도 구분해야 했습니다.',
        decision: '설비 ID를 WebRTC WHEP 주소와 매핑하고, 카메라 API에 표준 오류 응답을 추가했습니다.',
        outcome: '정상 설비는 스트림 주소를 반환하고, 잘못되거나 비어 있는 ID는 표준 HTTP 400을 반환하는지 테스트했습니다. 활성 세션이 없을 때는 active: false를 확인했습니다.',
      },
      {
        title: '브라우저 영상 재생과 WebGL 배포 주소',
        problem: 'Unity WebGL 배포본이 카메라 API를 localhost로 호출했습니다.',
        decision: 'API 호스트를 페이지 주소에서 계산하고, Unity의 CCTV 버튼은 HTML 영상 창과 연결했습니다.',
        outcome: 'API 호스트 계산을 수정했고, 테스트 뷰어에서는 RTSP 입력을 MediaMTX로 중계해 WebRTC로 재생하는 경로를 확인했습니다.',
        note: '최종 HTTPS 통합 재생에서는 혼합 콘텐츠 문제가 남았습니다. 영상 지연 시간은 측정하지 않았습니다.',
      },
      {
        title: 'MediaMTX 배포와 설비 이상 알림',
        problem: '영상 중계 설정을 배포에 포함하고 설비 상태 변화를 팀이 보는 채널로 전달해야 했습니다.',
        decision: 'Jenkins와 Docker Compose에 MediaMTX 배포를 연결했습니다. 설비 이상 알림을 Mattermost로 전환했습니다.',
        outcome: 'MediaMTX 배포 설정과 fMP4 녹화 경로·보관 설정을 반영했습니다. Mattermost 쪽은 경고·위험·복구 상태의 알림과 전송 재시도를 테스트 코드로 확인했습니다.',
      },
    ],
  },
  nyamnyam: {
    technologyDecision: {
      title: '공개 댓글 800건으로 정한 즉시 숨김 기준',
      background: '공개 댓글 800건에서 기준을 0.9에서 0.95로 높이자 정상 글 오탐은 24건에서 4건으로 줄었습니다. 악플 즉시 숨김도 129건에서 65건으로 줄어, 나머지는 기존 신고 절차와 사람 검토로 넘겼습니다.',
      implementation: '첫 신고를 저장한 뒤 비동기로 gpt-4o를 호출합니다. 스팸·욕설로 판단하고 신뢰도가 0.95 이상이면 바로 숨기고 Mattermost로 알립니다. 그 외에는 신고 3건 자동 숨김과 사람 검토를 적용합니다. 사용자 본문은 JSON 값으로 넘기고 글 속 지시를 따르지 않도록 모델에 명시했습니다.',
      id: 'report-threshold',
      comparisonTitle: '즉시 숨김 기준 0.9와 0.95 비교 (공개 댓글 800건)',
      comparisonNote: 'Smilegate UnSmile에서 정상 500건과 악플 300건을 무작위로 뽑았습니다. 공개 데이터의 악플 라벨이 서비스 기준보다 넓어 정밀도와 재현율은 계산하지 않았습니다.',
      columns: ['정상 500건 중 오탐', '악플 300건 중 즉시 숨김'],
      alternatives: [
        { method: 'LLM 기준 0.95', selected: true, values: ['4건 (0.8%)', '65건 (22%)'], difference: '' },
        { method: 'LLM 기준 0.9', values: ['24건 (4.8%)', '129건 (43%)'], difference: '오탐 24건 중 20건의 신뢰도가 정확히 0.9였습니다.' },
        { method: '금칙어 필터', values: ['8건 (1.6%)', '87건 (29%)'], difference: '' },
      ],
      additionalComparisons: [
        {
          id: 'report-comparison',
          comparisonTitle: 'LLM과 금칙어 필터 비교 (자체 제작 100건)',
          comparisonNote: '판단 기준을 정할 때 쓰지 않은 자체 제작 데이터입니다. 숨김 30건과 유지 70건에 신뢰도 기준 0.9로 1회 실행했습니다.',
          columns: ['정밀도', '재현율', '오탐'],
          alternatives: [
            { method: 'LLM (gpt-4o)', selected: true, values: ['85.7%', '100%', '5건 (7.1%)'], difference: '오탐 5건은 모임 오픈채팅이나 동호회 카페 같은 취미 관련 링크였습니다.' },
            { method: '금칙어 필터', values: ['45.2%', '46.7%', '17건 (24.3%)'], difference: '숨겨야 할 30건 중 절반 넘게 놓쳤습니다.' },
          ],
        },
      ],
      limitation: '각 데이터셋의 1회 실행 결과입니다. 실제 운영 중의 신고 판별 성능은 별도로 측정하지 않았습니다.',
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
        id: 'jpa',
        technology: 'Spring Data JPA',
        use: '게시글과 댓글의 신고를 저장하고, 신고 대상과 처리 상태를 기준으로 조회했습니다.',
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
        id: 'rate-limit',
        title: 'Redis 장애 때 막을 요청과 통과시킬 요청 나누기',
        problem: '요청 제한 상태를 Redis에 두면, Redis가 멈췄을 때 API를 막을지 통과시킬지 정해야 했습니다. 모두 막으면 조회까지 멈추고, 모두 통과시키면 메일 발송과 유료 LLM 호출이 제한 없이 나갈 수 있었습니다.',
        decision: 'API를 메일 발송, 인증, AI 추천, 업로드, 글 작성, 그 밖의 변경, 조회의 7개 그룹으로 나눴습니다. Redis 장애 때는 비용이 드는 메일 발송과 AI 추천만 503으로 막고 나머지는 통과시켰습니다. 인증 API는 계정을 바꿔 가며 시도할 수 있어 로그인 여부와 상관없이 IP로 셉니다.',
        outcome: '실제 Redis에 한 사용자의 AI 추천 요청 100건을 동시에 보내 한도인 10건만 통과하는 것을 테스트로 확인했습니다. 다른 사용자의 버킷이 서로 영향을 주지 않는 것도 확인했습니다.',
        note: '운영 중 Redis 장애를 겪은 기록은 없습니다.',
      },
      {
        id: 'report-ai',
        title: '취미 관련 링크를 스팸으로 숨긴 원인 수정',
        problem: '자체 제작 100건에서 LLM이 모임 오픈채팅, 동호회 카페 같은 정상 링크 글 5건을 숨겼습니다.',
        decision: '기준을 0.95로 높여도 오탐 2건이 남아, 스팸을 “취미와 무관한 돈벌이 홍보”로 좁혔습니다. 개인정보가 담긴 글은 즉시 숨김 대상에서 제외했습니다.',
        outcome: '같은 100건에서 재실험한 결과 오탐이 0건이었습니다.',
        note: '오탐 0건은 수정에 사용한 데이터로 다시 잰 참고치입니다. 적용 기준 0.95는 별도의 공개 댓글 800건 비교에서 정했습니다.',
      },
      {
        id: 'short-filter',
        title: '숏폼 수집 중단 조건과 판별 기준 개선',
        problem: 'YouTube 할당량이 제한돼 있고, 처음에는 판별 기준이 좁아 경기 장면이나 취미 브이로그도 제외할 수 있었습니다.',
        decision: '할당량이 부족하면 실행을 중단하고, 개별 키워드가 실패하면 다음 대상으로 넘어가게 했습니다. 취미 관련 영상의 허용 범위를 넓히고 애매한 판정은 사람 검토로 보냈습니다.',
        outcome: '할당량 초과 시 조회를 멈추고 PARTIAL 상태로 남기는 경우와 키워드 실패 이후 계속 수집하는 경우를 테스트했습니다. 이전 기준으로 탈락한 영상은 다시 판별하도록 마이그레이션했습니다.',
        note: '판별 기준 변경 전후의 영상 제외 비율은 측정하지 않았습니다.',
      },
      {
        title: 'Mattermost 버튼으로 신고 처리',
        problem: '운영자가 신고를 바로 보고 처리할 수 있어야 했습니다. Mattermost 버튼으로 처리하기로 하면서, 위조된 버튼 요청과 같은 신고를 두 번 처리하는 경우를 막아야 했습니다.',
        decision: '서로 다른 사용자 3명이 신고하면 먼저 자동으로 숨기고, 매시 정각 비공개 채널에 대상별로 모아 알립니다. 버튼 요청은 HMAC 서명을 확인한 뒤 처리하고, 처리 전 상태인 신고만 바꾸는 조건부 UPDATE를 썼습니다. 이미 처리된 신고라면 상태는 두고 메시지만 최신으로 바꿉니다. 알림 본문의 멘션과 마크다운은 무력화했습니다.',
        outcome: '자동 숨김된 글을 유지로 처리하면 다시 노출되고, 처리한 사람과 결과가 신고 기록에 남도록 구현했습니다.',
      },
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
        id: 'jpa',
        technology: 'Spring Data JPA',
        use: '폴더와 폴더에 배치한 게임을 저장했습니다. 폴더를 조회할 때는 EntityGraph로 연결된 게임 정보도 함께 가져왔습니다.',
      },
      {
        technology: 'Spring Boot Actuator / Discord Webhook',
        use: '서버 상태 확인과 오류 알림에 사용했습니다. 외부에는 health 엔드포인트만 공개하고 구성 요소별 세부 상태는 응답에서 숨겼습니다.',
      },
    ],
    cases: [
      {
        id: 'steam-achievements',
        title: 'Steam 업적 조회 실패의 원인 구분',
        problem: '업적이 없는 게임을 조회하면 Steam은 HTTP 400과 함께 "Requested app has no stats"를 돌려줍니다. 이 응답을 비공개 프로필이나 서버 장애와 구분해야 했습니다. 내용을 확인할 수 없는 빈 400 응답까지 업적 0개로 처리하던 부분도 있었습니다.',
        decision: '본문을 문자열로 받은 뒤 JSON을 검증해, 업적 없음이 명시된 응답만 정상 0개로 처리했습니다. 비공개는 별도 오류로, HTTP 장애와 타임아웃, 해석할 수 없는 응답은 외부 연동 실패로 나눴습니다. 실패했을 때는 기존 통계와 캐시를 그대로 둡니다.',
        outcome: '실제 Steam 응답을 테스트 자료로 저장하고 업적 없음, 비공개, 장애, 타임아웃을 각각 테스트했습니다. 2026년 10월 5일 재검증에서 전체 테스트 272개가 통과했습니다.',
      },
      {
        id: 'like-concurrency',
        title: '쇼케이스 좋아요의 동시 갱신 검증',
        problem: '여러 사용자가 동시에 좋아요를 누르면 카운트 갱신이 유실될 수 있었고, 한 사용자가 버튼을 반복해서 누르는 경우도 처리해야 했습니다.',
        decision: '요청을 보낸 사용자 행에 비관적 락을 걸어 같은 사용자의 요청을 직렬화하고, 쇼케이스 카운트는 DB 쿼리로 증감했습니다.',
        outcome: '서로 다른 30명의 동시 요청 후 좋아요 수가 30개였습니다. 한 사용자의 10회 동시 토글 후에는 좋아요 행 수와 카운터가 모두 0으로 일치했습니다.',
        note: 'H2의 MySQL 호환 모드에서 검증했습니다.',
      },
      {
        id: 'ranking',
        title: '동점에서도 순서가 유지되는 쇼케이스 랭킹',
        problem: '좋아요 수만 기준으로 삼으면 동점 쇼케이스가 페이지 경계에서 어느 쪽에 속하는지 구분할 수 없습니다.',
        decision: '좋아요 수 내림차순과 사용자 ID 오름차순을 함께 적용했습니다. 다음 페이지 커서에도 두 값을 넣었습니다.',
        outcome: '동점일 때도 정렬 기준이 고정되고, 다음 페이지는 마지막 항목 다음부터 조회합니다.',
      },
      {
        title: '최대 5단계 폴더와 2D 게임 배치',
        problem: '폴더를 옮기거나 게임을 다시 배치할 때 기존 계층과 위치가 어긋나지 않아야 했습니다.',
        decision: '폴더 이동 시 자기 자신이나 하위 폴더로의 이동을 막고 하위 계층 깊이를 함께 검사했습니다. 게임은 2D 좌표를 저장하고 React 화면에 연결했습니다.',
        outcome: '최대 5단계 안에서 게임을 배치하고 정리한 목록을 쇼케이스로 공유할 수 있게 했습니다.',
      },
      {
        id: 'monitoring',
        title: '서버 상태 변화와 오류를 Discord로 알림',
        problem: '장애는 바로 알아야 하지만 같은 오류가 반복되면 알림이 쌓이고, 예외 내용에 비밀값이 섞일 수 있습니다.',
        decision: 'Actuator로 DB·Redis·디스크 상태를 1분마다 확인해 장애와 복구를 알립니다. 반복 알림은 5분 간격으로 제한하고 토큰·비밀번호는 전송 전에 가렸습니다. 웹훅은 별도 스레드에서 호출합니다.',
        outcome: '상태 변화와 복구 알림, 중복 억제, 웹훅 실패 격리, health 응답의 세부 정보 숨김을 테스트했습니다.',
        note: '로컬 개발 단계이며 실제 운영에서 장애를 감지한 기록은 없습니다.',
      },
    ],
  },
}
