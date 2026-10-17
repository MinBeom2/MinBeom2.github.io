# 김민범 백엔드 포트폴리오

밝은 회색과 차콜을 사용하는 React + TypeScript + Vite 포트폴리오입니다. 실제 개발 코드는 `portfolio/`에 있습니다.

## 로컬 실행

Node.js 24 LTS 이상을 권장합니다.

```powershell
cd C:\CoolDev\MinBeom2.github.io\portfolio
npm ci
npm run dev
```

브라우저에서 http://localhost:5173 을 엽니다. 파일을 수정하면 개발 서버에서 반영됩니다.

```powershell
npm run build
npm run preview
```

빌드 결과는 `portfolio/dist/`이고 미리보기는 http://localhost:4173 입니다. 포트가 사용 중이면 `npm run preview -- --port 4174`로 실행할 수 있습니다.

## 수정할 곳

- `portfolio/src/content.ts`: 소개, 연락처, 프로젝트 기본 정보와 수치
- `portfolio/src/caseStudies.ts`: 기술 적용, 문제 해결, 결과와 기여 근거
- `portfolio/src/App.tsx`: 홈과 프로젝트별 상세 모달
- `portfolio/src/styles.css`, `portfolio/src/case-studies.css`: 디자인
- `portfolio/public/assets/`: 사용자가 제공한 실제 사진·로고·프로젝트 화면

프로젝트 모달 직접 주소: `/#project/ait`, `/#project/onework`, `/#project/steamfolder`. 링크 직접 접근과 새로고침을 지원합니다.

## GitHub Pages 배포

배포 전에 저장소의 [Settings → Pages](https://github.com/MinBeom2/MinBeom2.github.io/settings/pages)에서 Source를 **GitHub Actions**로 설정해야 합니다. 이 최초 설정은 Git push만으로 만들어지지 않습니다.

GitHub Free에서는 공개 저장소에 GitHub Pages를 사용할 수 있습니다. 비공개 저장소는 GitHub Pro 등 Pages를 지원하는 요금제가 필요합니다. 공개 전환을 선택하면 사이트뿐 아니라 저장소 소스와 커밋 기록도 공개됩니다.

`.github/workflows/deploy.yml`은 Pages 설정을 먼저 확인한 뒤 `portfolio` 폴더에서 의존성을 설치하고 빌드합니다. 배포하는 파일은 `portfolio/dist/`입니다. `main`에 push하면 배포가 실행되며, 설정을 완료한 뒤에는 Actions에서 **Deploy portfolio to GitHub Pages → Run workflow**로 다시 실행할 수도 있습니다.

```powershell
cd C:\CoolDev\MinBeom2.github.io
git push origin main
```

배포 성공 후 https://minbeom2.github.io/ 에서 확인합니다.

### Configure Pages 단계에서 404가 나는 경우

`Get Pages site failed`와 `Not Found`는 저장소의 Pages 사이트를 조회하지 못했다는 뜻입니다. 위 Pages 설정에서 Actions 소스가 활성화되어 있는지 확인합니다.

Pages 활성화 요청이 `Your current plan does not support GitHub Pages for this repository.`로 거절되면 비공개 저장소와 계정 요금제의 조합이 원인입니다. 저장소 공개 전환 또는 Pages를 지원하는 요금제가 필요하며, 워크플로 YAML만 바꿔서는 이 제한을 해제할 수 없습니다.

`configure-pages`의 `enablement: true`는 별도 관리 권한 토큰이 필요한 옵션입니다. 기본 `GITHUB_TOKEN`으로 활성화하거나 요금제 제한을 우회하는 용도로 사용할 수 없습니다.

공식 문서: [GitHub Pages 지원 범위](https://docs.github.com/en/pages/quickstart), [configure-pages 입력 옵션](https://github.com/actions/configure-pages/blob/main/action.yml).

## 이미지와 기록

본인 사진, Ait 로고, ONEWORK 로고·프로젝트 화면은 실제 제공 자료입니다. 원래 로고의 색상을 바꾸거나 사진을 생성·변형하지 않았습니다. 자산 출처와 추가할 자료는 `portfolio/docs/assets.md`에 기록합니다. Ait 화면 캡처와 공개 데모는 사용자 확인 후 보충합니다.

nGrinder 수치는 개발·검증 환경의 기록이며 운영 성능이 아닙니다. LIKE 검색 제외 실험, 종료 후 개인 브랜치의 좋아요 개선, ONEWORK HTTPS 미해결, SteamFolder 로컬 개발 상태를 구분합니다.
