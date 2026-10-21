import { aiPractice, aiPresentation } from './aiCapabilities'
import './ai-capabilities.css'
import ProcessSteps from './ProcessSteps'

function FeedbackFlow() {
  return <figure className="ai-case-visual ai-feedback-visual" aria-label="피드백을 저장한 뒤 AI로 분류하고 중요도에 따라 알림을 나누는 흐름">
    <ProcessSteps steps={aiPresentation.feedbackStages} label="피드백 처리 순서" className="ai-feedback-stages" />
    <dl className="ai-feedback-branches" aria-label="AI 분류 결과별 알림">
      {aiPresentation.branches.map(branch => <div key={branch.priority}>
        <dt>{branch.priority}</dt>
        <dd><strong>{branch.title}</strong></dd>
      </div>)}
    </dl>
  </figure>
}

function FeedbackCase() {
  return <article className="ai-case" id="ai-feedback-example" aria-labelledby="ai-feedback-example-title">
    <header>
      <h4 id="ai-feedback-example-title">SteamFolder</h4>
      <p className="ai-case-summary">{aiPresentation.feedbackSummary}</p>
    </header>
    <FeedbackFlow />
    <a className="text-link ai-case-link" href="#project/steamfolder/ai-feedback">{aiPractice.linkLabel}</a>
  </article>
}

export default function AiCapabilitiesSection() {
  return <section className="ai-practice" id="ai-practice" aria-labelledby="ai-practice-title">
    <header className="ai-practice-heading">
      <h3 id="ai-practice-title">{aiPractice.title}</h3>
      <p>{aiPractice.intro}</p>
    </header>
    <ul className="ai-review-criteria">
      {aiPractice.reviews.map((review, index) => <li className="ai-criterion" key={review.title}>
        <h4>{aiPresentation.reviewLabels[index]}</h4>
        <p>{review.description}</p>
      </li>)}
    </ul>
    <div className="ai-cases"><FeedbackCase /></div>
  </section>
}
