# 김민범 백엔드 포트폴리오

React + TypeScript + Vite 앱입니다. 전체 실행·배포 안내는 [저장소 README](../README.md)에 있습니다.

## 이 폴더에서 실행

```powershell
npm ci
npm run dev
```

기본 주소는 `http://localhost:5173`입니다. 사용 중인 포트라면 터미널에 표시된 주소를 엽니다.

```powershell
npm run build
npm run preview
```

빌드는 이 폴더의 `dist/`에 생성됩니다. 저장소 루트의 `.github/workflows/deploy.yml`이 이 폴더에서 빌드하고 GitHub Pages에 배포합니다. 현재 `portfolio/` 구조를 그대로 유지합니다.

## 수정할 곳

- `src/content.ts`: 소개, 연락처, 프로젝트 기본 정보와 측정값
- `src/caseStudies.ts`: 구현 범위, 기술 적용, 문제 해결과 기여 근거
- `src/App.tsx`: 홈과 프로젝트 상세 모달
- `src/styles.css`, `src/case-studies.css`: 디자인과 반응형 레이아웃
- `public/assets/`: 실제 사진·프로젝트 로고·화면

모달의 직접 주소는 `/#project/ait`, `/#project/onework`, `/#project/steamfolder`입니다.

[디자인 기준](docs/design.md), [이미지 출처·추가할 자료](docs/assets.md), [확인 기록](docs/verification.md)을 참고하세요.
