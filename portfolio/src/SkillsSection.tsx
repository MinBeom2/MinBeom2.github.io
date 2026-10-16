import { useId, useRef, useState } from 'react'
import { skills } from './skillEvidence'
import type { SkillEvidence } from './skillEvidence'

function Chevron({ className = '' }: { className?: string }) {
  return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
}

function SkillRow({ skill, onToggle }: { skill: SkillEvidence; onToggle: () => void }) {
  return <details className="skill-row" onToggle={onToggle}>
    <summary>
      <span className="skill-logo" aria-hidden="true">{skill.logo ? <img src={import.meta.env.BASE_URL + 'assets/skills/' + skill.logo} alt="" width="64" height="44" loading="lazy" decoding="async" /> : <span className="skill-text-mark">{skill.mark}</span>}</span>
      <span className="skill-copy"><strong>{skill.name}</strong><span>{skill.summary}</span></span>
      <span className="skill-level"><span className="sr-only">시안용 숙련도 예시: </span>{skill.sampleLevel}</span>
      <Chevron className="skill-chevron" />
    </summary>
    <div className="skill-detail"><p>{skill.evidence}</p><div className="skill-project-links"><span>사용한 프로젝트</span>{skill.projects.map(project => <a key={project.id} href={'#project/' + project.id + '/' + project.section}>{project.name}</a>)}</div></div>
  </details>
}

export default function SkillsSection() {
  const [allOpen, setAllOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const instanceId = useId()

  function toggleAll() {
    const rows = Array.from(listRef.current?.querySelectorAll('details') ?? [])
    const next = !rows.every(row => row.open)
    rows.forEach(row => { row.open = next })
    setAllOpen(next)
  }

  function syncOpenState() {
    const rows = Array.from(listRef.current?.querySelectorAll('details') ?? [])
    setAllOpen(rows.length > 0 && rows.every(row => row.open))
  }

  return <section className="skills-section" aria-labelledby={instanceId + '-title'}>
    <div className="skills-heading"><h3 id={instanceId + '-title'}>사용하는 기술</h3><details className="skill-level-guide"><summary>숙련도 기준<Chevron /></summary><div className="skill-guide-content"><p>구현할 수 있는 범위를 기준으로 표시합니다.</p><dl><div><dt>상중</dt><dd>주요 기능을 독립적으로 구현하고 문제를 해결</dd></div><div><dt>중</dt><dd>문서를 참고해 필요한 기능을 구현</dd></div><div><dt>중하</dt><dd>예제를 응용해 제한된 기능을 구현</dd></div><div><dt>하</dt><dd>기초 개념을 학습하고 예제를 실행</dd></div></dl></div></details><p>어디에, 어떻게 사용했는지 함께 담았습니다.</p></div>
    <div className="skill-list-toolbar"><p className="skill-preview-note">등급은 디자인 확인용 예시입니다.</p><button type="button" onClick={toggleAll} aria-controls={instanceId + '-list'}>{allOpen ? '모두 접기' : '모두 펼치기'}<Chevron className={allOpen ? 'is-open' : ''} /></button></div>
    <div ref={listRef} id={instanceId + '-list'} className="skill-list" aria-label="사용하는 기술 목록">{skills.map(skill => <SkillRow key={skill.id} skill={skill} onToggle={syncOpenState} />)}</div>
  </section>
}
