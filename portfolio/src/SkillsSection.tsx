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
      {skill.level ? <span className="skill-level"><span className="sr-only">숙련도: </span>{skill.level}</span> : <span aria-hidden="true" />}
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
    <div className="skills-heading"><h3 id={instanceId + '-title'}>사용하는 기술</h3><details className="skill-level-guide"><summary>숙련도 기준<Chevron /></summary><div className="skill-guide-content"><p>구현과 검증 기록을 바탕으로 표시합니다.</p><dl><div><dt>상중</dt><dd>복잡한 기능과 외부 연동을 구현하고 테스트로 검증</dd></div><div><dt>중</dt><dd>일반적인 기능 구현과 설정, 문제 해결을 독립적으로 수행</dd></div></dl></div></details><p>어디에, 어떻게 사용했는지 함께 담았습니다.</p></div>
    <div className="skill-list-toolbar"><p className="skill-preview-note">숙련도는 평가한 네 기술에만 표시합니다.</p><button type="button" onClick={toggleAll} aria-controls={instanceId + '-list'}>{allOpen ? '모두 접기' : '모두 펼치기'}<Chevron className={allOpen ? 'is-open' : ''} /></button></div>
    <div ref={listRef} id={instanceId + '-list'} className="skill-list" aria-label="사용하는 기술 목록">{skills.map(skill => <SkillRow key={skill.id} skill={skill} onToggle={syncOpenState} />)}</div>
  </section>
}
