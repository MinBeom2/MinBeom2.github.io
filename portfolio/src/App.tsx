import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { benchmarks, profile, projects } from './content'
import SkillsSection from './SkillsSection'
import type { Project, SourceLink } from './content'
import { projectDetails } from './caseStudies'
import type { ProjectDetail, TechnologyComparison } from './caseStudies'
import { aiFeedback } from './aiCapabilities'
import AiCapabilitiesSection from './AiCapabilitiesSection'
import ProcessSteps from './ProcessSteps'
import Chevron from './Chevron'

const asset = (path: string) => import.meta.env.BASE_URL + 'assets/' + path
const assets = {
  portrait: asset('profile/kim-minbeom.jpg'),
  aitLogo: asset('projects/ait-logo.png'),
  oneworkLogo: asset('projects/onework-logo.png'),
  oneworkOverview: asset('projects/onework-overview.png'),
}

const projectPreviews = {
  ait: { src: asset('projects/ait-landing.png'), width: 2830, height: 1446, alt: 'Ait 랜딩페이지의 면접 연습 소개와 AI 모의면접 미리보기' },
  onework: { src: assets.oneworkOverview, width: 2558, height: 1266, alt: 'ONEWORK 디지털 트윈과 CCTV 영상 관제 화면' },
  steamfolder: { src: asset('projects/steamfolder-landing.png'), width: 2879, height: 1440, alt: 'SteamFolder 랜딩페이지의 게임 라이브러리 소개와 로그인 화면' },
}

type IconName = 'external' | 'mail' | 'github' | 'code' | 'message' | 'bell' | 'database' | 'check' | 'close' | 'camera' | 'play' | 'folder' | 'layers' | 'branch' | 'menu'

function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    external: <path d="M14 4h6v6M20 4l-9 9M10 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    github: <path d="M9 20c-4 1-4-2-6-2m12 4v-4a3.4 3.4 0 0 0-1-3c3 0 6-1 6-5a4 4 0 0 0-1-3 4 4 0 0 0 0-3s-1-1-4 1a13 13 0 0 0-6 0C6 3 5 4 5 4a4 4 0 0 0 0 3 4 4 0 0 0-1 3c0 4 3 5 6 5a3.4 3.4 0 0 0-1 3v4" />,
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" />,
    message: <><path d="M20 13a4 4 0 0 1-4 4H9l-5 4V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4z" /><path d="M8 8h8M8 12h5" /></>,
    bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    camera: <><rect x="2" y="5" width="14" height="14" rx="3" /><path d="m16 9 6-4v14l-6-4" /></>,
    play: <path d="m9 5 11 7-11 7z" />,
    folder: <path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    layers: <path d="m12 3 10 6-10 6L2 9zm-10 11 10 6 10-6M2 18l10 6 10-6" />,
    branch: <><circle cx="6" cy="5" r="3" /><circle cx="18" cy="5" r="3" /><circle cx="6" cy="19" r="3" /><path d="M6 8v8M18 8a8 8 0 0 1-8 8H6" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  }
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<Icon name="external" size={16} /><span className="sr-only"> (새 탭)</span></a>
}

function CaseSources({ links }: { links?: SourceLink[] }) {
  if (!links?.length) return null
  return <ul className="case-sources" aria-label="관련 자료">{links.map(link => <li key={link.url}><ExternalLink href={link.url}>{link.label}</ExternalLink></li>)}</ul>
}

function ProjectLogo({ project, className = 'project-logo' }: { project: Project; className?: string }) {
  if (project.id === 'steamfolder') return null
  return <img className={className + ' project-logo-' + project.id} src={project.id === 'ait' ? assets.aitLogo : assets.oneworkLogo} alt={project.name + ' 로고'} width={project.id === 'ait' ? 512 : 584} height={project.id === 'ait' ? 234 : 284} decoding="async" />
}

function AitVisual() {
  return <div className="project-visual ait-visual" aria-label="Ait의 담당 기능과 역할">
    <div className="visual-heading"><div className="project-brand"><ProjectLogo project={projects[0]} /><span className="ait-wordmark">Ait</span></div><span>스터디를 연결하는 백엔드</span></div>
    <dl className="ait-capabilities">
      <div><dt>스터디 채팅</dt><dd>STOMP / WebSocket 연결 인증과 그룹 멤버 권한 확인</dd></div>
      <div><dt>서비스 API</dt><dd>Spring Boot로 스터디와 커뮤니티 기능 구현</dd></div>
      <div><dt>실시간 알림</dt><dd>SSE 알림 전송과 heartbeat 연결 관리</dd></div>
    </dl>
    <div className="visual-caption"><span>담당 기능과 역할</span><span>스터디, 커뮤니티, 알림</span></div>
  </div>
}

function StreamDiagram() {
  return <div className="project-visual onework-visual" aria-label="RTSP 카메라에서 MediaMTX를 거쳐 WebRTC WHEP로 영상 전달">
    <ProcessSteps label="영상 전달 순서" className="stream-steps" steps={[
      { title: '카메라', note: 'RTSP 영상 송출' },
      { title: 'MediaMTX', note: 'WebRTC WHEP로 중계' },
      { title: '관제 화면', note: 'HTML 영상 창에서 재생' },
    ]} />
    <div className="visual-caption"><span>영상 전달 구조</span><span>HTTPS 통합 문제는 미해결</span></div>
  </div>
}

function SteamVisual() {
  return <div className="steam-visual" aria-label="게임 라이브러리를 폴더로 정리해 공유하는 서비스 개념도">
    <div className="folder-tree">
      <ul className="library-tree" aria-label="폴더 구성 예시"><li>
        <div className="tree-root"><span className="folder-shape" /><strong>내 게임 라이브러리</strong></div>
        <ul className="tree-children"><li><Icon name="folder" /> 함께 할 게임</li><li><Icon name="folder" /> 다음에 할 게임</li></ul>
      </li></ul>
      <p className="tree-share">쇼케이스 링크로 공유</p>
    </div>
    <span className="steam-visual-caption">서비스 개념도</span>
  </div>
}

function ProjectTile({ project }: { project: Project }) {
  const preview = projectPreviews[project.id]
  return <li className="project-showcase-row">
    <a className="project-showcase-card" href={'#project/' + project.id} aria-label={project.name + ' 자세히 보기'} aria-describedby={'project-overview-' + project.id} aria-haspopup="dialog">
      <div className="project-tile">
        <span className="project-tile-mark" aria-hidden="true">{project.id === 'steamfolder' ? <Icon name="folder" size={48} /> : <ProjectLogo project={project} className={'project-tile-logo project-tile-logo-' + project.id} />}</span>
        <div className="project-tile-copy"><h3>{project.name}</h3><p className="project-tile-description" id={'project-overview-' + project.id}>{project.overview}</p></div>
      </div>
      <div className="project-preview"><img src={preview.src} width={preview.width} height={preview.height} alt={preview.alt} loading="lazy" decoding="async" /></div>
    </a>
  </li>
}

function SteamAiFeedbackSection() {
  return <section className="detail-section" id="case-ai-feedback" aria-labelledby="ai-feedback-title">
    <h2 id="ai-feedback-title">{aiFeedback.title}</h2>
    <p>{aiFeedback.intro}</p>
    <dl className="feedback-priority">{aiFeedback.priorities.map(priority => <div key={priority.name}><dt>{priority.name}</dt><dd>{priority.description}</dd></div>)}</dl>
    <CaseSources links={[{ label: '피드백 AI 분류와 알림 구현', url: 'https://github.com/MinBeom2/SteamFolder' }]} />
  </section>
}

function HomePage() {
  return <>
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title" tabIndex={-1}><span>필요한 기능을 만들고,</span><span>근거로 개선합니다.</span></h1>
        <p className="hero-person">{profile.name} / {profile.role}</p>
        <p className="hero-description">사용자의 흐름을 API로 연결합니다.<br />동시성, 실시간 연결, 데이터 조회의 문제를<br className="desktop-break" /> 코드와 테스트로 좁혀갑니다.</p>
      </div>
    </section>
    <section className="projects-section container section-space" id="projects" aria-labelledby="projects-title">
      <div className="section-heading"><div><h2 id="projects-title">프로젝트</h2><p>카드를 누르면 자세한 기록이 열립니다.</p></div></div>
      <ul className="project-showcase">{projects.map(project => <ProjectTile key={project.id} project={project} />)}</ul>
    </section>
    <section className="approach-section section-space" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <div className="section-heading"><div><h2 id="approach-title">이렇게 일합니다</h2><p>구현에서 멈추지 않고, 확인한 결과를 남깁니다.</p></div></div>
        <div className="approach-grid">
          <article>
            <div className="approach-copy"><h3>테스트로 결과를 확인합니다</h3>
            <p>조회 성능은 nGrinder로 비교하고, 동시 요청의 데이터 정합성은 통합 테스트로 확인했습니다. 변경 전후의 결과와 검증 조건을 함께 남겼습니다.</p></div>
            <div className="approach-evidence">
              <div className="approach-test"><h4>채팅 조회 응답 시간</h4>
                <dl className="approach-measure" aria-label="채팅 조회 평균 응답 시간 비교">
                  <div><dt>개선 전</dt><dd>1,804.71 <span>ms</span></dd></div>
                  <div><dt>개선 후</dt><dd>131.59 <span>ms</span></dd></div>
                </dl>
                <p className="approach-note">개인 검증 환경, Vuser 50, 1분</p>
                <a className="approach-link" href="#project/ait/benchmarks">측정 조건과 결과 보기</a>
              </div>
              <div className="approach-test"><h4>좋아요 동시 갱신 통합 테스트</h4>
                <dl className="approach-facts" aria-label="좋아요 동시 갱신 검증 결과">
                  <div><dt>실행 조건</dt><dd>요청 100건 / 작업 스레드 32개</dd></div>
                  <div><dt>확인 결과</dt><dd>최종 좋아요 100개</dd></div>
                </dl>
                <p className="approach-note">프로젝트 종료 후 개인 개선 / 팀 배포 미반영</p>
                <a className="approach-link" href="#project/ait/concurrency">동시성 검증 기록 보기</a>
              </div>
            </div>
          </article>
          <article>
            <div className="approach-copy"><h3>팀의 진행 상황을 함께 점검합니다</h3>
            <p>스크럼 마스터로서 매주 KPT 회고를 진행했습니다. 번다운 차트로 진행 상황을 함께 점검했습니다.</p>
            <p>Git Flow를 제안하고 Git에 익숙하지 않은 팀원을 위해 브랜치 작업 순서와 명령어 가이드를 작성해 공유했습니다.</p></div>
            <div className="approach-evidence">
              <dl className="approach-facts approach-collaboration" aria-label="스크럼 마스터로 진행한 협업 활동">
                <div><dt>맡은 역할</dt><dd>스크럼 마스터</dd></div>
                <div><dt>주간 회고</dt><dd>KPT</dd></div>
                <div><dt>진행 점검</dt><dd>번다운 차트</dd></div>
              </dl>
              <pre className="approach-code" aria-label="Git 작업 가이드의 브랜치 시작 예시"><code>{'git switch develop\ngit pull origin develop\ngit checkout -b feature/기능이름'}</code></pre>
              <p className="approach-note">공유한 가이드의 작업 시작 순서</p>
              <a className="approach-link" href="#project/ait/collaboration">협업 가이드 근거 보기</a>
            </div>
          </article>
        </div>
        <AiCapabilitiesSection />
      </div>
    </section>
    <section className="about-section container section-space" id="about" aria-labelledby="about-title">
      <div className="about-intro"><img className="profile-portrait" src={assets.portrait} alt="김민범 프로필 사진" width="569" height="759" loading="lazy" decoding="async" /><h2 id="about-title">백엔드를 중심으로,<br />필요한 연결까지.</h2><p>API와 데이터를 다루고,<br />실시간 연결과 화면 구현으로<br />서비스의 흐름을 이해합니다.</p></div>
      <div className="about-content"><SkillsSection /><div className="background"><h3>학력과 활동</h3><div className="background-item"><span>2026.01 –</span><div><strong>삼성청년SW AI 아카데미 15기</strong><p>SSAFY 교육 및 팀 프로젝트</p></div></div><div className="background-item"><span><time dateTime="2020-02">2020.02 입학</time><br /><time dateTime="2026-02">2026.02 졸업</time></span><div><strong>국립금오공과대학교</strong><p>컴퓨터공학과 학사</p></div></div><div className="certifications"><span>자격</span><p>SQLD (<time dateTime="2026-03">2026.03</time>)<br />정보처리기사 (<time dateTime="2025-12">2025.12</time>)</p></div></div></div>
    </section>
    <section className="contact-section container" aria-labelledby="contact-title"><div className="contact-panel"><div><h2 id="contact-title">함께 만들 서비스에 대해<br />이야기하고 싶습니다.</h2></div><div className="contact-links"><a href={'mailto:' + profile.email}><Icon name="mail" size={22} /><span>{profile.email}</span></a><ExternalLink href={profile.github}><Icon name="github" size={21} /> GitHub</ExternalLink></div></div></section>
  </>
}

function BenchmarkSection() {
  return <section className="detail-section" id="case-benchmarks" aria-labelledby="benchmarks-title">
    <h2 id="benchmarks-title">nGrinder 성능 측정 기록</h2>
    <p>각 실험은 1분 동안 진행했습니다. 아래 수치는 개발 및 검증 환경의 HTTP API 응답 기록이며 실제 운영 트래픽이나 팀 배포 버전의 성능을 뜻하지 않습니다.</p>
    <div className="benchmark-wrap" tabIndex={0} role="region" aria-label="nGrinder 결과 표, 좁은 화면에서 가로 스크롤 가능">
      <table className="benchmark-table"><caption>Ait의 개발 및 검증 환경 측정</caption><colgroup><col /></colgroup><colgroup span={2} /><colgroup span={2} /><thead>
        <tr><th scope="col" rowSpan={2}>대상 / 기록된 조건</th><th scope="colgroup" colSpan={2}>평균 응답 시간 (ms)</th><th scope="colgroup" colSpan={2}>TPS</th></tr>
        <tr><th scope="col">변경 전</th><th scope="col">변경 후</th><th scope="col">변경 전</th><th scope="col">변경 후</th></tr>
      </thead><tbody>{benchmarks.map(row => <tr key={row.name}><th scope="row">{row.name}<small>{row.condition}</small></th><td>{row.before}</td><td><strong>{row.after}</strong></td><td>{row.tpsBefore}</td><td><strong>{row.tpsAfter}</strong></td></tr>)}</tbody></table>
    </div>
    <dl className="benchmark-notes">{benchmarks.map(row => <div key={row.name}><dt>{row.name}</dt><dd>{row.note}</dd></div>)}</dl>
    <CaseSources links={[{ label: '측정 조건과 원본 검증 기록', url: profile.troubleshooting }]} />
  </section>
}

function TechnologyComparisonDetails({ comparison }: { comparison: TechnologyComparison }) {
  return <details className="technology-disclosure">
    <summary>{comparison.comparisonTitle}<Chevron /></summary>
    <div className="technology-comparison-content">
      {comparison.comparisonNote && <p className="technology-comparison-note">{comparison.comparisonNote}</p>}
      <table className="technology-comparison">
        <caption className="sr-only">{comparison.comparisonTitle}: 현재 구현을 기준으로 본 대안과의 차이</caption>
        <thead><tr><th scope="col">방식</th><th scope="col">이 구조에서의 차이</th></tr></thead>
        <tbody>{comparison.alternatives.map(alternative => <tr key={alternative.method} className={alternative.selected ? 'technology-selected' : undefined}>
          <th scope="row">{alternative.method}{alternative.selected && <span className="technology-used">사용</span>}</th>
          <td>{alternative.difference}{alternative.reference && <div className="technology-reference"><ExternalLink href={alternative.reference.url}>{alternative.reference.label}</ExternalLink></div>}</td>
        </tr>)}</tbody>
      </table>
      {comparison.reference && <div className="technology-reference"><ExternalLink href={comparison.reference.url}>{comparison.reference.label}</ExternalLink></div>}
    </div>
  </details>
}

function TechnologyChoices({ detail }: { detail: ProjectDetail }) {
  const decision = detail.technologyDecision
  return <div className="technology-choices">
    <h3 className="technology-choice-title">{decision.title}</h3>
    <p className="technology-choice-background">{decision.background}</p>
    <p className="technology-choice-implementation">{decision.implementation}</p>
    {decision.pipeline && <p className="technology-pipeline" aria-label="영상 전달 경로">{decision.pipeline}</p>}
    {decision.selectionReasons && <details className="technology-disclosure">
      <summary>선택 이유 자세히 보기<Chevron /></summary>
      <dl className="technology-reasons">{decision.selectionReasons.map(reason => <div key={reason.title}>
        <dt>{reason.title}</dt><dd>{reason.description}{reason.reference && <div className="technology-reference"><ExternalLink href={reason.reference.url}>{reason.reference.label}</ExternalLink></div>}</dd>
      </div>)}</dl>
    </details>}
    <TechnologyComparisonDetails comparison={decision} />
    {decision.additionalComparisons?.map(comparison => <TechnologyComparisonDetails key={comparison.comparisonTitle} comparison={comparison} />)}
    <p className="technology-choice-limitation"><strong>한계와 확인 범위</strong>{decision.limitation}</p>
    <details className="technology-disclosure technology-implementation">
      <summary>사용 기술과 적용 내용<Chevron /></summary>
      <dl className="case-technology-list">{detail.techChoices.map(choice => <div key={choice.technology}><dt>{choice.technology}</dt><dd>{choice.use}</dd></div>)}</dl>
    </details>
  </div>
}

function ProjectPage({ project }: { project: Project }) {
  const pageRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const page = pageRef.current
    const scrollArea = page?.closest<HTMLElement>('.modal-scroll')
    if (!page || !scrollArea) return
    const targets = [...page.querySelectorAll<HTMLElement>('.case-content > .detail-section[id]')]
    if (!targets.length) return

    let frame = 0
    const measure = () => {
      frame = 0
      const readingLine = scrollArea.getBoundingClientRect().top + Math.min(120, scrollArea.clientHeight * .25)
      let current = targets[0]
      for (const target of targets) {
        if (target.getBoundingClientRect().top > readingLine) break
        current = target
      }
      if (scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 2) {
        current = targets[targets.length - 1]
      }
      setActiveSection(current.id.slice('case-'.length))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure) }
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(page)
    resizeObserver.observe(scrollArea)
    scrollArea.addEventListener('scroll', schedule, { passive: true })
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      scrollArea.removeEventListener('scroll', schedule)
    }
  }, [project.id])

  const detail = projectDetails[project.id]
  const sections = [
    { id: 'overview', label: '문제와 목표' },
    { id: 'scope', label: '담당 구현' },
    { id: 'technology', label: '기술 선택' },
    ...(project.id === 'steamfolder' ? [{ id: 'ai-feedback', label: 'AI 연동' }] : []),
    { id: 'troubleshooting', label: '문제 해결' },
    ...(project.id === 'ait' ? [{ id: 'benchmarks', label: '성능 측정' }] : []),
    { id: 'results', label: '결과와 현재 상태' },
  ]
  return <article ref={pageRef} className="container case-page">
    <header className="case-header detail-header">
      <div className="case-title-row"><ProjectLogo project={project} className="case-logo" /><h1 id="case-title" tabIndex={-1}>{project.name}</h1></div>
      <p className="detail-subtitle">{project.subtitle}</p>
      <dl className="detail-facts"><div><dt>기간 / 상태</dt><dd>{project.period}</dd></div><div><dt>프로젝트 구성</dt><dd>{project.team}</dd></div><div><dt>담당 역할</dt><dd>{project.role}</dd></div></dl>
      <ul className="tags" aria-label="사용 기술">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    </header>
    <div className="case-layout">
      <nav className="case-nav" aria-label={project.name + ' 상세 목차'}><h2>이 프로젝트의 기록</h2><ul className="case-nav-list">{sections.map(section => <li key={section.id}><a href={'#project/' + project.id + '/' + section.id} aria-current={activeSection === section.id ? 'location' : undefined}>{section.label}</a></li>)}</ul></nav>
      <div className="case-content">
        {project.id === 'onework' && <figure className="case-cover"><img src={assets.oneworkOverview} width="2558" height="1266" alt="ONEWORK 디지털 트윈과 CCTV 영상 관제 화면" loading="lazy" decoding="async" /><figcaption><span>ONEWORK 서비스 화면. 제 담당은 카메라 연동과 API입니다.</span><ExternalLink href={assets.oneworkOverview}>화면 크게 보기</ExternalLink></figcaption></figure>}
        <section className="detail-section" id="case-overview" aria-labelledby="overview-title"><h2 id="overview-title">문제와 목표</h2><p>{project.problem}</p><CaseSources links={project.links.filter(link => link.url !== profile.troubleshooting)} /></section>
        <section className="detail-section" id="case-scope" aria-labelledby="scope-title"><h2 id="scope-title">직접 구현한 범위</h2><div className="contributions">{project.contributions.map(item => <div id={item.id ? 'case-' + item.id : undefined} className="case-contribution" key={item.title}><h3>{item.title}</h3><p>{item.description}</p><CaseSources links={item.sources} /></div>)}</div></section>
        <section className="detail-section" id="case-technology" aria-labelledby="technology-title"><h2 id="technology-title">기술 선택과 이유</h2><TechnologyChoices key={project.id} detail={detail} />{project.id === 'ait' ? <AitVisual /> : project.id === 'onework' ? <StreamDiagram /> : <SteamVisual />}</section>
        {project.id === 'steamfolder' && <SteamAiFeedbackSection />}
        <section className="detail-section" id="case-troubleshooting" aria-labelledby="troubleshooting-title"><h2 id="troubleshooting-title">문제 해결과 검증</h2><div className="case-studies">{detail.cases.map(study => <article className="case-study" id={study.id ? 'case-' + study.id : undefined} key={study.title}><h3>{study.title}</h3><dl><div><dt>문제</dt><dd>{study.problem}</dd></div><div><dt>판단과 구현</dt><dd>{study.decision}</dd></div><div><dt>확인한 결과</dt><dd>{study.outcome}</dd></div></dl>{study.note && <p className="detail-note">{study.note}</p>}<CaseSources links={study.sources} /></article>)}</div></section>
        {project.id === 'ait' && <BenchmarkSection />}
        <section className="detail-section" id="case-results" aria-labelledby="results-title"><h2 id="results-title">결과와 현재 상태</h2><ul className="case-result-list">{detail.results.map(result => <li key={result}><Icon name="check" size={18} /><span>{result}</span></li>)}</ul></section>
      </div>
    </div>
    <section className="case-next" aria-labelledby="next-title"><h2 id="next-title">다른 프로젝트도 살펴보기</h2><div className="case-next-grid">{projects.filter(item => item.id !== project.id).map(item => <a className="next-project-link" key={item.id} href={'#project/' + item.id}><strong>{item.name}</strong><span>{item.subtitle}</span></a>)}</div></section>
  </article>
}

type Route = { kind: 'home'; anchor: string } | { kind: 'project'; project: Project; anchor: string } | { kind: 'not-found' }

function readRoute(): Route {
  const hash = window.location.hash
  if (hash.startsWith('#project/')) {
    const [, , id, anchor = ''] = hash.split(/[\/#]/)
    const project = projects.find(item => item.id === id)
    return project ? { kind: 'project', project, anchor } : { kind: 'not-found' }
  }
  return { kind: 'home', anchor: hash.slice(1) }
}

function useRoute() {
  const [route, setRoute] = useState<Route>(readRoute)
  const currentRoute = useRef(route)
  const previousKind = useRef<Route['kind'] | null>(null)

  useEffect(() => {
    const updateRoute = () => {
      const next = readRoute()
      if (currentRoute.current.kind === 'home' && next.kind === 'project') {
        window.history.replaceState({ ...window.history.state, portfolioModal: true }, '', window.location.href)
      }
      currentRoute.current = next
      setRoute(next)
    }
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    const returningFromModal = previousKind.current !== null && previousKind.current !== 'home'
    previousKind.current = route.kind
    document.title = route.kind === 'project' ? route.project.name + ' | 김민범 포트폴리오' : '김민범 | 백엔드 개발자'
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.kind === 'project' ? route.project.description : '백엔드 개발자 김민범의 구현과 문제 해결 기록. Ait, ONEWORK와 개인 프로젝트 SteamFolder를 소개합니다.')
    if (route.kind !== 'home' || returningFromModal) return
    const frame = requestAnimationFrame(() => {
      if (route.anchor) {
        const target = document.getElementById(route.anchor)
        target?.scrollIntoView({ block: 'start' })
        if (route.anchor === 'main') target?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [route])

  const closeProject = () => {
    if (window.history.state?.portfolioModal) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', '#projects')
      const next = readRoute()
      currentRoute.current = next
      setRoute(next)
    }
  }
  return { route, closeProject }
}

type HomeSection = 'projects' | 'approach' | 'about'
const homeSections: { id: HomeSection; label: string }[] = [
  { id: 'projects', label: '프로젝트' },
  { id: 'approach', label: '작업 방식' },
  { id: 'about', label: '소개' },
]

function SiteHeader({ modalOpen }: { modalOpen: boolean }) {
  const [visibleSection, setVisibleSection] = useState<HomeSection | null>(null)
  useEffect(() => {
    if (modalOpen) return
    let frame = 0
    const measure = () => {
      frame = 0
      const line = Math.max(112, Math.min(window.innerHeight * .25, 240))
      let current: HomeSection | null = null
      for (const section of homeSections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= line) current = section.id
      }
      setVisibleSection(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [modalOpen])
  const activeSection = modalOpen ? 'projects' : visibleSection
  const activeIndex = homeSections.findIndex(section => section.id === activeSection)
  return <header className="site-header">
    <nav className="site-nav island-nav" aria-label="주요 메뉴">
      <span className={'island-indicator' + (activeIndex < 0 ? ' is-hidden' : '')} aria-hidden="true" style={{ transform: `translateX(${Math.max(0, activeIndex) * 100}%)` }} />
      {homeSections.map(section => <a key={section.id} href={'#' + section.id} aria-current={activeSection === section.id ? 'location' : undefined} className={activeSection === section.id ? 'is-current' : ''} onClick={() => {
        if (window.location.hash === '#' + section.id) document.getElementById(section.id)?.scrollIntoView({ block: 'start' })
      }}>{section.label}</a>)}
    </nav>
  </header>
}

function ProjectModal({ route, onClose }: { route: Exclude<Route, { kind: 'home' }>; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleId = route.kind === 'project' ? 'case-title' : 'not-found-title'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const scrollY = window.scrollY
    const body = document.body
    const original = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      Object.assign(body.style, original)
      window.scrollTo({ top: scrollY, behavior: 'instant' })
      if (opener?.isConnected && opener !== body) opener.focus({ preventScroll: true })
      else document.getElementById('hero-title')?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const anchor = route.kind === 'project' ? route.anchor : ''
      if (anchor && anchor !== 'main') {
        const section = anchor === 'evidence' ? 'scope' : anchor === 'test-validation' ? 'troubleshooting' : anchor
        const target = document.getElementById('case-' + section)
        if (target) {
          const heading = target.querySelector<HTMLElement>('h2, h3') ?? target
          heading.tabIndex = -1
          target.scrollIntoView({ block: 'start' })
          heading.focus({ preventScroll: true })
        }
      } else {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
        document.getElementById(titleId)?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [route, titleId])

  return <dialog ref={dialogRef} className="project-modal" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      return
    }
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const hash = link.getAttribute('href') ?? ''
    if (hash.startsWith('#project/')) {
      event.preventDefault()
      window.history.replaceState(window.history.state, '', hash)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    } else if (hash === '#projects') {
      event.preventDefault()
      onClose()
    }
  }}>
    <div className="modal-toolbar"><button className="modal-close" type="button" onClick={onClose} aria-label="프로젝트 상세 닫기"><Icon name="close" size={19} /><span>닫기</span></button></div>
    <div ref={scrollRef} className="modal-scroll">
      {route.kind === 'project' ? <ProjectPage project={route.project} /> : <section className="container page-not-found"><h1 id="not-found-title" tabIndex={-1}>프로젝트를 찾을 수 없습니다.</h1><p>주소를 확인하거나 프로젝트 목록에서 다시 선택해 주세요.</p><a className="button primary" href="#projects">프로젝트 목록 보기</a></section>}
    </div>
  </dialog>
}

export default function App() {
  const { route, closeProject } = useRoute()
  const modalOpen = route.kind !== 'home'
  return <>
    <a className="skip-link" href="#main">본문으로 이동</a>
    <SiteHeader modalOpen={modalOpen} />
    <main id="main" tabIndex={-1}><HomePage /></main>
    <footer className="container site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>만들고, 확인하고, 기록합니다.</span><a href="#" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) }}>맨 위로</a></footer>
    {route.kind !== 'home' && <ProjectModal route={route} onClose={closeProject} />}
  </>
}
