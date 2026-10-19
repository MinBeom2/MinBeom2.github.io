import type { ReactNode } from 'react'
import { aiFeedback, aiLearning, aiPractice, aiPresentation } from './aiCapabilities'
import './ai-capabilities.css'
import ProcessSteps from './ProcessSteps'
import Chevron from './Chevron'

function CaseDisclosure({ label, children }: { label: string; children: ReactNode }) {
  return <details className="ai-case-details">
    <summary><span>{label}</span><Chevron className="ai-disclosure-icon" /></summary>
    <div className="ai-case-explanation">{children}</div>
  </details>
}

function FeedbackFlow() {
  return <figure className="ai-case-visual ai-feedback-visual" aria-label="피드백을 저장한 뒤 AI로 분류하고 중요도에 따라 알림을 나누는 흐름">
    <ProcessSteps steps={aiPresentation.feedbackStages} label="피드백 처리 순서" className="ai-feedback-stages" />
    <dl className="ai-feedback-branches" aria-label="AI 분류 결과별 알림">
      {aiPresentation.branches.map(branch => <div key={branch.priority}>
        <dt>{branch.priority}</dt>
        <dd><strong>{branch.title}</strong><span>{branch.note}</span></dd>
      </div>)}
    </dl>
  </figure>
}

function LearningTimeline() {
  return <figure className="ai-case-visual ai-learning-visual" aria-label="직접 풀이, AI 리뷰, 기록 이후의 복습 일정">
    <ProcessSteps steps={aiPresentation.learningStages} label="학습 진행 순서" className="ai-learning-stages" />
    <div className="ai-review-schedule">
      <p>{aiPresentation.scheduleOrigin}</p>
      <ol className="ai-review-timeline" aria-label="풀이 완료일을 기준으로 한 복습 시점">
        {aiPresentation.reviewDays.map(day => <li key={day}><strong>{day}<span>일 뒤</span></strong></li>)}
      </ol>
    </div>
  </figure>
}

function FeedbackCase() {
  return <article className="ai-case" id="ai-feedback-example" aria-labelledby="ai-feedback-example-title">
    <header>
      <h4 id="ai-feedback-example-title">SteamFolder</h4>
      <p className="ai-case-summary">{aiPresentation.feedbackSummary}</p>
    </header>
    <FeedbackFlow />
    <CaseDisclosure label="처리 방식 자세히 보기">
      <p>{aiFeedback.intro}</p>
      <dl className="ai-explanation-list">{aiFeedback.priorities.map(priority => <div key={priority.name}><dt>{priority.name}</dt><dd>{priority.description}</dd></div>)}</dl>
    </CaseDisclosure>
    <a className="text-link ai-case-link" href="#project/steamfolder/ai-feedback">{aiPractice.linkLabel}</a>
  </article>
}

function LearningCase() {
  return <article className="ai-case" id="ai-learning" aria-labelledby="ai-learning-title">
    <header>
      <h4 id="ai-learning-title">{aiLearning.title}</h4>
      <p className="ai-case-summary">{aiPresentation.learningSummary}</p>
    </header>
    <LearningTimeline />
    <CaseDisclosure label="학습 방식 자세히 보기">
      <p>{aiLearning.intro}</p>
      <dl className="ai-explanation-list">{aiLearning.steps.map(step => <div key={step.title}><dt>{step.title}</dt><dd>{step.description}</dd></div>)}</dl>
    </CaseDisclosure>
    <a className="text-link ai-case-link" href={aiLearning.repository} target="_blank" rel="noopener noreferrer">
      {aiLearning.linkLabel}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M10 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5" /></svg>
      <span className="sr-only"> (새 탭)</span>
    </a>
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
    <div className="ai-cases"><FeedbackCase /><LearningCase /></div>
  </section>
}
