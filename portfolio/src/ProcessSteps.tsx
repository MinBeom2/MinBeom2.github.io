import './process-steps.css'

type ProcessStep = { title: string; note: string }

export default function ProcessSteps({ steps, label, className = '' }: { steps: readonly ProcessStep[]; label: string; className?: string }) {
  return <ol className={'process-steps ' + className} aria-label={label} role="list">
    {steps.map((step, index) => <li key={step.title}>
      <span className="process-step-index" aria-hidden="true">{index + 1}</span>
      <div className="process-step-copy"><strong>{step.title}</strong><p>{step.note}</p></div>
    </li>)}
  </ol>
}
