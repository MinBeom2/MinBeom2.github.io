# 협업 자료 검토 (2026-10-22)

## 자료와 출처

사용자가 직접 작성한 Git 협업 문서 두 개와 직접 진행한 스크럼 자료 세 개를 제공했다. 원본은 내용과 파일 해시를 보존해 저장소 루트에서 아래 검토 폴더로 옮겼다.

| 제공된 파일 | 보관 위치 |
| --- | --- |
| git flow 정리.pdf | _workspace/collaboration-evidence-2026-10-22/source/git-branch-workflow.pdf |
| git flow 준비.md | _workspace/collaboration-evidence-2026-10-22/source/git-command-cheatsheet.md |
| 번다운차트.png | _workspace/collaboration-evidence-2026-10-22/source/sprint-burndown.png |
| 번다운 회고.png | _workspace/collaboration-evidence-2026-10-22/source/sprint-burndown-retrospective.png |
| kpt.png | _workspace/collaboration-evidence-2026-10-22/source/sprint-kpt.png |

`_workspace`는 기존 Git 제외 경로다. 파일별 SHA-256은 같은 검토 폴더의 source-manifest.json에 기록했다. 홈에는 자료에서 확인한 행동을 문장으로 반영한다.

## 스크럼 마스터 경험

- 매주 KPT 회고를 진행하고 번다운 차트를 함께 점검한 경험은 기존 사용자 설명과 이번 자료로 뒷받침된다.
- 제공된 차트는 작업량 증가와 급격한 감소, 오랫동안 유지되는 구간을 보여 준다. 차트만으로 생산성 증가나 일정 준수율을 계산하지 않는다.
- 회고에는 작업을 완료해도 Jira 상태를 바로 바꾸지 않고 한꺼번에 반영한 문제가 담겨 있다. 김민범 본인 의견은 작업을 완료할 때마다 Jira에 반영하자는 제안이다.
- KPT 표는 코어타임, 담당 업무의 책임과 작업 분배에 대한 팀원 의견을 모은 자료다. 사용자가 제안하거나 실행했다고 확인되지 않은 세부 정책은 개인 성과로 적지 않는다.
- 특히 매일 9시와 5시에 진행 상황을 공유하는 job은 다른 팀원의 발언이므로 사용자가 만든 것으로 쓰지 않는다.
- 완료 즉시 Jira 갱신은 제안한 행동으로 표시한다. 이후 실제로 정착했는지, 차트가 개선됐는지는 후속 자료 없이 단정하지 않는다.

## Git 자료에서 확인한 범위

- main, develop, feature, release, hotfix의 역할과 생성 및 병합 방향을 설명했다.
- release 브랜치를 생략하고 develop에서 검증한 뒤 main으로 병합하는 흐름을 팀 적용안으로 제안했다. 문서의 설명을 실제 운영 이력이나 배포 경험으로 치환하지 않는다.
- clone, 상태 확인, 선택 스테이징, 커밋, upstream, stash, 작업 복원과 브랜치 정리를 설명했다.
- develop의 최신 코드를 가져온 뒤 기능 브랜치에서 merge develop을 실행하는 작업 순서를 제공했다.
- 사용자는 이전 대화에서 팀원의 충돌 해결을 도왔다고 확인했다. 이 경험은 사용자 설명으로 반영하며, 두 문서에 실제 충돌 diff나 선택 근거가 담겨 있다고 쓰지 않는다.

## Git 등급 판단

Git 표시 등급은 **중**을 유지한다. 독립적인 브랜치 작업과 병합, 문서 작성 및 팀원 지원 경험이 확인된다. 이번 자료는 협업 경험의 구체성을 보강한다. release와 hotfix를 설명했다는 사실만으로 해당 흐름을 실제 운영했다고 평가하지 않는다. 구체적인 복잡한 충돌 해결이나 이력 복구 사례를 확인하면 그 범위를 포함해 다시 판단할 수 있다.

등급을 낮게 두기 위해 새로운 필수 명령어 목록을 만들지 않는다. 특정 명령어를 썼는지보다 어떤 문제에서 무엇을 판단하고 어떻게 확인했는지를 본다.

## 원본 가이드에서 주의할 설명

- `git pull origin develop`은 현재 체크아웃한 브랜치에 develop의 변경을 통합한다. pull 설정에 따라 merge 또는 rebase가 사용될 수 있으므로 항상 강제 병합이라고 설명하지 않는다.
- `git config --global core.editor "code --wait"`는 Git의 메시지 편집기를 설정한다. 충돌 파일을 자동으로 VS Code에서 열거나 충돌 해결 도구를 지정하는 설정은 아니다.
- develop으로 이동해 pull한 뒤 기능 브랜치로 돌아오는 것만으로 기능 브랜치에 변경이 들어오지는 않는다. 가이드 마지막의 `git merge develop` 단계까지 포함해야 한다.

원본 자료는 수정하지 않는다. 이 표현을 포트폴리오의 기술 설명으로 복사하지 않는다.

## 문구 반영과 확인

- 홈의 협업 소개와 오른쪽 요약에 회고 자료, 완료 상태 일괄 반영 문제, 완료 즉시 Jira 갱신 제안을 반영했다.
- Git 상세는 문서 공유 한 문장과 동기화, stash, 병합 및 충돌 해결 지원에 대한 보충 한 문장으로 구성했다. 등급은 중이다.
- 새로운 사실을 자료에서 먼저 정리한 뒤 그 초안을 humanize-korean으로 다듬었다. 윤문은 light 경로, 초안 대비 변경률 0.2%, B등급, 자체검증 6/6, 공통 게이트 exit 0이다. 이 변경률은 기존 홈페이지와 새 문구의 차이를 뜻하지 않는다. 진단 및 finalizer 승급은 필요하지 않았으며 남은 경고는 없다. 윤문 기록은 _workspace/2026-10-22-001-ce63에 있다.
- TypeScript 검사, Vite 프로덕션 빌드와 공백 검사를 통과했다. 기본 데스크톱 화면과 320×740 모바일에서 문구를 확인했고 가로 넘침이 없다. 모바일에서 Git 상세를 펼쳐 중 등급과 문서 공유 및 충돌 해결 지원 문구를 확인했다. 브라우저 오류와 경고는 없다.
- 화면 기록은 portfolio/.impeccable/review/collaboration-evidence/desktop.png와 mobile.png다.
