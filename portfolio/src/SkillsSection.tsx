import { useId, useRef, useState } from 'react'
import { skills } from './skillEvidence'
import type { SkillEvidence } from './skillEvidence'
import Chevron from './Chevron'

function SkillRow({ skill, onToggle }: { skill: SkillEvidence; onToggle: () => void }) {
  return <details className="skill-row" onToggle={onToggle}>
    <summary>
      <span className="skill-logo" aria-hidden="true">{skill.logo ? <img src={import.meta.env.BASE_URL + 'assets/skills/' + skill.logo} alt="" width="64" height="44" loading="lazy" decoding="async" /> : <span className="skill-text-mark">{skill.mark}</span>}</span>
      <span className="skill-copy"><strong>{skill.name}</strong><span>{skill.summary}</span></span>
      {skill.level ? <span className="skill-level"><span className="sr-only">숙련도: </span>{skill.level}</span> : <span aria-hidden="true" />}
      <Chevron className="skill-chevron" />
    </summary>
    <div className="skill-detail">
      <p className="skill-highlight">{skill.highlight}</p>
      <p className="skill-support">{skill.evidence}</p>
      <div className="skill-project-links"><span>사용한 프로젝트</span>{skill.projects.map(project => <a key={project.id} href={'#project/' + project.id + '/' + project.section}>{project.name}</a>)}</div>
    </div>
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

  return <section id="skills" className="skills-section" aria-labelledby={instanceId + '-title'}>
    <div className="skills-heading"><h3 id={instanceId + '-title'}>사용하는 기술</h3><details className="skill-level-guide"><summary>숙련도 기준<Chevron /></summary><div className="skill-guide-content"><p>프로젝트 코드와 커밋, 작성한 테스트를 기준으로 정리했습니다.</p><dl>
      <div><dt>상</dt><dd>설계부터 구현, 문제 해결과 개선까지 주도</dd></div>
      <div><dt>상중</dt><dd>복잡한 기능과 외부 연동을 구현하고 테스트로 검증</dd></div>
      <div><dt>중</dt><dd>일반적인 기능 구현과 문제 해결을 독립적으로 수행</dd></div>
      <div><dt>중하</dt><dd>자료를 참고해 기본 기능을 구현하고 설정을 수정</dd></div>
      <div><dt>하</dt><dd>기본 개념을 이해하고 예제를 따라 사용</dd></div>
    </dl></div></details></div>
    <div className="skill-list-toolbar"><button type="button" onClick={toggleAll} aria-controls={instanceId + '-list'}>{allOpen ? '모두 접기' : '모두 펼치기'}<Chevron className={allOpen ? 'is-open' : ''} /></button></div>
    <div ref={listRef} id={instanceId + '-list'} className="skill-list" aria-label="사용하는 기술 목록">{skills.map(skill => <SkillRow key={skill.id} skill={skill} onToggle={syncOpenState} />)}</div>
  </section>
}
