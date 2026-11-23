import './ai-capabilities.css'

export default function AiCapabilitiesSection() {
  return <section className="ai-practice" id="ai-practice" aria-labelledby="ai-practice-title">
    <h3 id="ai-practice-title">AI 분석 실패에 대비한 SteamFolder 설계</h3>
    <div id="ai-feedback-example">
      <p>피드백 분석 상태를 백엔드에서 관리하도록 바꾸고, 중단된 분석과 미전송 알림을 다시 처리하는 스케줄러를 추가했습니다.</p>
      <a className="text-link ai-case-link" href="#project/steamfolder/ai-feedback">SteamFolder 피드백 처리 기록</a>
    </div>
  </section>
}
