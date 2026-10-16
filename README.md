# 김민범 백엔드 포트폴리오

밝은 회색과 차콜을 사용하는 React + TypeScript + Vite 포트폴리오입니다. 실제 개발 코드는 `portfolio/`에 있습니다.

## 로컬 실행

Node.js 24 LTS 이상을 권장합니다.

```powershell
cd C:\MinBeom2.github.io\portfolio
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

저장소의 Settings → Pages → Source를 **GitHub Actions**로 선택합니다. 루트의 `.github/workflows/deploy.yml`이 `portfolio` 폴더에서 설치·빌드하고 `portfolio/dist`를 배포합니다.

```powershell
cd C:\MinBeom2.github.io
git add .
git commit -m "Refine portfolio design and project pages"
git push origin main
```

배포 성공 후 https://minbeom2.github.io/ 에서 확인합니다. 로컬 작업만 진행한 상태이며 이 수정은 자동으로 push하지 않습니다.

## 이미지와 기록

본인 사진, Ait 로고, ONEWORK 로고·프로젝트 화면은 실제 제공 자료입니다. 원래 로고의 색상을 바꾸거나 사진을 생성·변형하지 않았습니다. 자산 출처와 추가할 자료는 `portfolio/docs/assets.md`에 기록합니다. Ait 화면 캡처와 공개 데모는 사용자 확인 후 보충합니다.

nGrinder 수치는 개발·검증 환경의 기록이며 운영 성능이 아닙니다. LIKE 검색 제외 실험, 종료 후 개인 브랜치의 좋아요 개선, ONEWORK HTTPS 미해결, SteamFolder 로컬 개발 상태를 구분합니다.
