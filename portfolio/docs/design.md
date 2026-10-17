---
name: 김민범 포트폴리오
description: 밝은 회색과 차콜로 구현 범위와 검증 기록을 읽게 하는 포트폴리오
colors:
  ink: "#262626"
  ink-hover: "#454545"
  muted: "#595959"
  quiet: "#646464"
  surface: "#f4f4f4"
  paper: "#ffffff"
  pale: "#ebebeb"
  line: "#d5d5d5"
  control-line: "#8a8a8a"
  inverse: "#ffffff"
  inverse-muted: "#d4d4d4"
  diagram-surface: "#e5e5e5"
  tag-surface: "#e6e6e6"
  media-surface: "#343434"
  modal-backdrop: "rgba(0, 0, 0, .46)"
  modal-close-hover: "#dedede"
typography:
  display:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(48px, 7.2vw, 96px)"
    fontWeight: 740
    lineHeight: 1.3
    letterSpacing: "-.03em"
  project-display:
    fontFamily: "Manrope Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "clamp(38px, 4vw, 56px)"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "-.025em"
  detail-headline:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "25px"
    fontWeight: 650
    lineHeight: 1.5
    letterSpacing: "-.025em"
  project-title:
    fontFamily: "Manrope Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "30px"
    fontWeight: 750
    lineHeight: 1.4
    letterSpacing: "-.025em"
  body:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  reading-body:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.95
  label:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.8
  numeric:
    fontFamily: "Manrope Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.8
  tag:
    fontFamily: "Manrope Variable, Noto Sans KR Variable, sans-serif"
    fontSize: "12px"
    fontWeight: 550
    lineHeight: 1.8
  island-mobile-label:
    fontFamily: "Noto Sans KR Variable, sans-serif"
    fontSize: "13px"
    fontWeight: 550
    lineHeight: 1.8
rounded:
  tag: "4px"
  segmented-item: "5px"
  navigation-item: "6px"
  control: "8px"
  compact-surface: "10px"
  mobile-surface: "12px"
  surface: "14px"
  modal: "16px"
  island: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  detail-section: "48px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.inverse}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "11px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.pale}"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "8px 0"
  technology-tag:
    backgroundColor: "{colors.tag-surface}"
    textColor: "{colors.ink-hover}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "4px 9px"
  project-visual:
    backgroundColor: "{colors.diagram-surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.surface}"
    padding: "26px 28px 20px"
  island-nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.inverse-muted}"
    rounded: "{rounded.island}"
    padding: "6px"
    width: "348px"
    height: "60px"
  island-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.island}"
  project-modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.modal}"
---

# Design System: 김민범 포트폴리오

## Overview

**Creative North Star: "밝은 회색, 차콜, 실제 기록"**

사용자가 확정한 밝은 회색 바탕과 차콜 글자를 구현한 현재 디자인 체계다. 넓은 여백, 왼쪽 정렬, 제한된 읽기 폭으로 프로젝트의 담당 범위와 검증 기록을 읽게 한다. 회색 농도가 제목·본문·조건·구획의 위계를 만들고, 원본 사진과 프로젝트 로고·실제 화면은 고유 색을 유지한다.

기존 홈의 순서와 두 글꼴의 역할을 유지한 refinement에서 추출했다. 프로젝트 상세도 같은 표면·글자·간격 체계를 사용한다. 이 문서의 토큰은 `src/styles.css`와 뒤에 적용되는 `src/case-studies.css`, 글꼴 로딩은 `src/main.tsx`, 구성과 상호작용은 `src/App.tsx`에 근거한다. 자산의 원본과 사용 경위는 `docs/assets.md`, 사실·기여·검증의 경계는 `PRODUCT.md`를 따른다.

**Key Characteristics:**

- 밝은 회색 바탕, 차콜 글자, 흰색 또는 옅은 회색 표면.
- 한국어의 읽기 위계와 영문 프로젝트명·수치의 글꼴 역할 분리.
- 본문은 표면 농도와 얇은 경계로 나누고, 아일랜드 헤더·상세 모달은 떠 있는 역할에만 그림자를 사용한다.
- 원본 사진·로고·실제 화면과, 개념도·흐름도로 명시한 자료.

## Colors

색은 사이트의 회색 위계와 원본 자산의 색으로 구성한다. 정확한 값은 위 frontmatter가 기준이다.

### Primary

- **차콜 (`ink`)**: 제목, 기본 본문, 주요 행동의 배경, 선택한 검증 사례, 도형 강조에 사용한다.
- **부드러운 차콜 (`ink-hover`)**: 주요 버튼의 hover와 기술 태그·상태 글자에 사용한다.

### Neutral

- **밝은 회색 (`surface`)**: 페이지와 모달의 기본 바탕. 중앙 헤더는 차콜 바탕을 쓴다.
- **흰 종이 (`paper`)**: 측정 기록, 실제 화면 주변, 프로젝트 내부 노드와 개인 프로젝트 본문 표면.
- **옅은 회색 (`pale`)**: 작업 방식 영역, 선택 버튼의 바깥 표면, 보조 행동의 hover.
- **본문 회색 (`muted`)**: 설명, 기술 적용, 검증 조건과 보조 링크.
- **조건 회색 (`quiet`)**: 작은 조건·기간·주석. 중요 내용도 읽을 수 있는 글자 대비를 유지한다.
- **구획선 (`line`)**: 모달 닫기 도구줄, 목록, 표, 상세 기록의 1px 경계.
- **행동 경계 (`control-line`)**: 보조 버튼, 연락 버튼, 아이콘 버튼의 경계.
- **반전 글자 (`inverse`, `inverse-muted`)**: 차콜 연락 영역과 어두운 영상 흐름도의 글자.
- **도식 회색 (`diagram-surface`)**: Ait 기능 흐름도, SteamFolder 개념도, 영상 중계 노드.
- **태그 회색 (`tag-surface`)**: 기술 태그와 개발 상태 배경.
- **영상 차콜 (`media-surface`)**: ONEWORK 영상 전달 구조의 어두운 배경.

**The Gray Hierarchy Rule.** 사이트의 구획과 행동은 회색 농도로 구분한다. 원본 프로젝트 로고·사진·서비스 화면의 색은 유지한다.

사이드카의 tonalRamp는 회색 색상표를 보여주기 위한 파생 미리보기다. 실제 구현에 새 색상 토큰을 추가하는 근거로 사용하지 않는다.

## Typography

**Display Font:** Noto Sans KR Variable, sans-serif.
**Body Font:** Noto Sans KR Variable, sans-serif.
**Project / Numeric Font:** Manrope Variable, Noto Sans KR Variable, sans-serif.

한국어 제목은 두께와 크기로 위계를 만든다. 영문 프로젝트명, 기술 목록, 기간·수치에는 Manrope를 사용한다. 두 Variable 글꼴은 npm 패키지에서 import하여 빌드에 포함한다.

### Hierarchy

- **Display:** 홈 제목은 두 개의 block span으로 두 줄을 유지한다. frontmatter의 유동 크기와 균형 줄바꿈을 사용하며 한국어 단어를 유지한다. 600px 이하에서는 `clamp(32px, 9vw, 46px)`와 줄높이 1.45, 360px 이하에서는 27px가 적용된다.
- **Intro Supporting Copy:** 첫 소개의 이름·역할은 20px·600, 설명은 20px·줄높이 1.9다. 600px 이하에서는 모두 16px로 줄인다.
- **Project Display:** 상세 프로젝트명. 820px 이하 44px이며 모바일 모달에서는 30px로 줄인다.
- **Headline:** 홈 영역 제목. 820px 이하 29px, 600px 이하 26px.
- **Detail Headline:** 상세 기록의 영역 제목. 후순위 상세 stylesheet가 데스크톱 25px, 600px 이하 22px를 적용한다.
- **Project Title:** 기존 상세 글꼴 역할을 보존한다. 홈 정사각 타일 이름은 Manrope 18px·750·줄높이 1.5이며 모바일에서는 16px다.
- **Body / Reading Body:** 기본 본문과 상세 설명. 홈 프로젝트 설명은 15px·줄높이 1.9, 상세 본문은 16px·1.95이고 모바일에서는 15px·1.9다. 상세 기술·검증 기록은 15px 중심이며 모바일 14px로 조정한다.
- **Label / Tag:** 메뉴·버튼은 13–14px 중심, 기술 태그와 캡션은 12px. 기본 글자와 같은 높이 체계를 쓰며 대문자 장식 표제를 추가하지 않는다.
- **Numeric:** 검증 수치. 비교 막대의 수치는 Manrope와 tabular numerals로 읽고, 단위는 더 작게 표시한다.

Frontmatter는 대표 역할을 담는다. 기존 CSS의 반응형 제목·도식·메타 글자에는 15·17·19·22px 등 서술한 개별 크기와 중립 회색 변형이 남아 있다. 정적 검사에서 대표 토큰 범위 밖으로 표시되는 이 값들은 기존 읽기 위계를 보존한 의도적 변형이며, 새로운 헤더의 모바일 13px와 모달 배경·닫기 hover는 frontmatter에 추가했다.

**The Two Typeface Roles Rule.** 한국어 서술은 Noto Sans KR, 영문 프로젝트명과 수치는 Manrope의 역할을 유지한다.

## Layout

홈 본문의 최대 폭은 1120px이며 가운데 정렬한다. 헤더는 별도의 중앙 캡슐이다. 기본 가로 여백은 총 112px, 1100px 이하 80px, 820px 이하 48px, 600px 이하 40px다. 기본 페이지 최소 폭은 320px다. 텍스트는 왼쪽 정렬하고, 첫 소개의 글 묶음은 최대 1040px, 설명은 42ch, 상세 서술은 최대 72ch와 800px 본문 폭으로 제한한다.

홈은 한 열 소개 → 프로젝트 Ait·ONEWORK·SteamFolder → 작업 방식 → 소개·기술·학력 → 연락 순서다. 모든 화면의 첫 viewport는 메뉴와 제목·이름·본문으로 된 소개에 할당한다. 프로젝트는 그 아래에 배치하고 스크롤 또는 메뉴로 진입한다. 데스크톱 프로젝트 영역은 왼쪽 제목과 오른쪽 정사각 타일 세 개를 가로로 연결하며, 타일은 최대 184px 세 열과 20px 간격이다. 1100px 이하에서는 최대 164px·16px 간격, 960px 이하에서는 제목 아래 목록, 600px 이하에서는 최대 160px 두 열·16px 간격으로 전환하며 가용 폭에 맞춰 줄어든다. 작업 방식은 세 열에서 820px 이하 한 열로 전환하고 아이콘을 글 옆에 배치한다.

홈 영역의 기본 세로 여백은 72px, 820px 이하 56px, 600px 이하 44px다. 첫 소개는 헤더의 흐름 높이를 뺀 `min-height: calc(100svh - var(--header-flow))`를 확보하고 flex로 글 묶음을 세로 중앙에 둔다. 헤더 흐름 높이는 기본 80px, 600px 이하 72px다. 소개의 안쪽 여백은 위 64px·아래 128px, 600px 이하에서는 위 48px·아래 96px다. 이름·역할의 위 간격은 36px, 설명은 20px이며 모바일에서는 각각 28px·16px다. 높이가 짧은 화면에서는 내용과 여백에 맞춰 소개가 첫 viewport보다 길어질 수 있다.

프로젝트 영역은 상단 경계와 위 36px·아래 60px 여백을 사용한다. 상세 기록 사이 간격은 48px에서 모바일 36px로 줄인다. 작은 요소는 8·12·16·24·32px의 반복 간격을 사용한다.

소개는 280px 왼쪽 소개와 남은 폭의 기술·학력, 64px 간격으로 구성한다. 왼쪽은 상단 112px에 붙고 사진은 144px다. 1100px 이하 왼쪽 248px·간격 40px, 960px 이하 220px·32px, 820px 이하에서는 단일 열로 풀고 128px 사진을 소개 글 옆에 둔다. 모바일 사진은 96px, 360px 이하 72px이며 소개 제목은 각각 22px·20px다.

상세 모달은 최대 1200px 폭이며 데스크톱 화면 사방에 최소 32px 여백을 둔다. 내부는 172px 목차와 최대 800px 본문, 40px 간격이다. 960px 이하에서는 화면 여백 20px와 단일 열 목차, 600px 이하에서는 가로 여백 8px·세로 여백 12px를 사용한다. 닫기 도구줄은 스크롤 영역 밖에 유지하고, 본문은 별도로 스크롤한다. 내부 anchor 여유는 28px, 모바일 20px이며 데스크톱 목차는 스크롤 영역의 24px 위치에 붙는다.

측정 표는 최소 폭 640px를 보존하고 자체 컨테이너 안에서 가로 스크롤한다. 이미지와 그리드가 페이지 전체를 넘치게 만들지 않는다. 프로젝트 상세는 홈을 유지한 native dialog로 연다. `#project/{id}`와 하위 anchor의 직접 접근·새로고침도 모달을 연다. 목차와 프로젝트 간 이동은 현재 모달의 해시를 교체해 닫기·뒤로 가기로 한 번에 홈으로 돌아온다.

## Elevation & Depth

본문의 깊이는 흰 표면, 옅은 회색 영역, 1px 경계와 여백으로 구분한다. 떠 있는 아일랜드 헤더에는 `0 12px 28px rgba(0, 0, 0, .14)`, 모달에는 `0 24px 72px rgba(0, 0, 0, .24)` 그림자를 사용한다. 모달 배경은 `rgba(0, 0, 0, .46)`로 어둡게 한다. 기능 도식의 내부 노드는 흰색, 영상 흐름도는 어두운 차콜 위의 반전 글자를 사용한다.

**The Flat Surface Rule.** 본문의 구분은 농도·경계·간격으로 표현한다. 그림자는 떠 있는 헤더와 모달에 한정하며 정보 카드마다 반복하지 않는다.

## Shapes

아일랜드와 선택 표시는 999px 캡슐 모서리, 상세 모달은 16px 모서리이며 모바일에서는 14px다. 주요 표면은 14px 모서리, 모바일 검증·프로젝트 표면은 12px 모서리다. 버튼과 메뉴 제어는 8px, 기술 태그·개발 상태는 4px, 목차 항목은 6px다. 실제 화면의 모서리는 10px, 인물 사진은 12px다. 도식 노드에는 12px 모서리를 사용한다.

원본 로고는 `object-fit: contain`으로 비율을 보존한다. 홈 타일의 Ait 로고는 64px, ONEWORK는 100px 폭과 64px 높이 안에 맞춘다. 모바일에서는 각각 52px와 86px 폭·52px 높이다. 상세 로고는 64px, 모바일 모달에서는 44px다. ONEWORK 실제 화면과 인물 사진도 비율을 유지한다. SteamFolder 타일의 폴더 아이콘은 중립 식별 표시이며, 상세의 폴더 형태와 Ait 연결선은 기능 설명 도식이다.

## Components

### Buttons

차콜 채움의 주요 버튼, 경계가 있는 투명 보조 버튼, 밑줄이 나타나는 텍스트 링크를 사용한다. 기본 버튼은 14px·600, 최소 높이 48px, padding 11px 20px, 8px 모서리다. 모바일은 13px, 최소 높이 46px, padding 10px 15px다. 텍스트 링크와 메뉴 항목은 최소 높이 44px다.

주요 버튼 hover는 `ink-hover`, 보조 버튼 hover는 `pale`다. 링크 hover는 밑줄로 표시한다. `:focus-visible`은 기본 2px 차콜 outline·5px offset이며 주요 버튼은 4px offset, 어두운 연락 영역에서는 흰 outline을 사용한다. 비활성 제어는 opacity .55와 not-allowed cursor를 사용한다.

### Chips

기술 목록과 개발 상태는 작은 회색 표면, 4px 모서리, 12px 글자, padding 4px 9px를 사용한다. 기술 태그는 설명용 목록이며 클릭 상태를 만들지 않는다.

### Cards / Containers

홈 프로젝트 타일은 흰 표면, 1px 구획선, 14px 모서리와 `aspect-ratio: 1`을 사용하며 그림자는 없다. 로고 또는 중립 폴더 아이콘과 이름만 중앙에 배치한다. padding은 24px 12px, 요소 간격은 18px이며 모바일에서는 12px 모서리·padding 14px 8px·간격 12px다. hover는 옅은 회색 면과 행동 경계색으로 표시하며 키보드 focus에는 기존 outline을 적용한다. 타일 전체가 기존 프로젝트 상세 모달의 진입 링크다.

상세의 주석 callout은 실제 구현의 옅은 회색 배경, 10px 모서리, padding 22px 24px를 사용한다. 검증·기술·근거 목록은 1px 경계로 나누며 별도 카드로 감싸지 않는다.

### Skills Disclosure

제목과 숙련도 기준은 두 열 grid에 두고 안내 문장을 그 아래 전체 폭으로 배치한다. 예시 등급 안내와 모두 펼치기·접기 버튼은 같은 도구줄에 둔다. 분류 버튼은 13px, 개수는 12px이며 선택 상태는 차콜 채움이다. 기술 행은 원본 SVG 또는 텍스트 약칭·기술명·대표 근거·예시 등급을 보여준다. 대표 근거는 데스크톱 13px·모바일 12px, 펼친 경험은 14px·줄높이 1.9다. 행별 disclosure와 분류별 모두 펼치기, 기존 프로젝트 상세 연결을 유지한다. 이 크기는 기술 영역의 역할별 값이며 전역 최소 글자 크기를 새로 정의하지 않는다.

### Navigation

헤더는 이름·브랜드 마크·연락 버튼 없이 프로젝트·작업 방식·소개만 담는 중앙 아일랜드다. 캡슐은 차콜 바탕, 348×60px, padding 6px, 999px 모서리이고 상단 16px에 붙는다. 600px 이하에서는 310×56px·상단 12px이며 작은 화면은 좌우 20px 여백 안에 줄어든다. 세 링크를 항상 가로로 보여주며 최소 높이는 48px, 모바일 44px다.

스크롤과 메뉴 선택으로 현재 읽는 섹션을 추적한다. 선택한 메뉴는 밝은 이동 표면, 차콜 글자와 `aria-current="location"`을 사용한다. 첫 소개 화면에서 해당 섹션에 도착하기 전에는 선택 표시를 숨긴다. 모달이 열리면 프로젝트 메뉴를 선택 상태로 유지한다. 키보드 focus는 반전 outline으로 드러낸다.

상세에는 breadcrumb, 목차, 전체 프로젝트 복귀, 다음 프로젝트 링크가 있다. 목차 hover는 옅은 회색 배경이다. 상세 목차의 활성 위치 추적은 구현되지 않았다.

960px 이하 목차는 본문 앞 두 열로 배치하며 모바일에서도 링크 최소 높이 44px를 유지한다.

### Project Modal

native `dialog.showModal()`로 프로젝트 상세를 열어 배경을 inert 상태로 만들고 키보드 초점을 모달에 둔다. 배경 스크롤을 고정하고 닫기 도구줄을 항상 보이게 유지한다. Escape·닫기 버튼·모달 바깥 클릭·뒤로 가기로 닫으면 이전 스크롤과 진입 링크의 초점을 복원한다. 상세 목차와 다른 프로젝트 선택은 현재 모달 안에서 동작한다. 새로운 독립 페이지를 렌더링하지 않는다.
모달은 열릴 때 `scale(.94)`·opacity .6에서 원래 크기·opacity 1로 220ms 확대한다. easing은 `cubic-bezier(.16, 1, .3, 1)`이며 reduced motion에서는 animation을 끈다.

모달 breadcrumb의 상단 여백은 16px, 헤더는 위 16px·아래 28px다. 모바일은 각각 12px와 위 12px·아래 24px이며 프로젝트명 30px·로고 44px·부제 18px로 첫 화면을 압축한다. 기간·구성·담당 역할은 데스크톱 세 열, 모바일 두 열에서 역할만 전체 폭으로 두며 모바일 label은 12px·값은 13px다.

### Verification Records

홈의 Ait 검증 패널과 전환 버튼은 제거했다. 측정 조건·개인 개선·팀 배포 반영 여부와 긴 검증 기록은 Ait 상세 모달에서 함께 읽는다.

### Project Materials

홈 타일의 Ait·ONEWORK는 제공된 원본 로고를 비율 그대로 사용한다. SteamFolder는 새 로고를 만들지 않고 기존 중립 폴더 아이콘을 사용한다. ONEWORK 실제 화면은 상세 모달에 두고 이미지 확대 링크는 원본 파일을 연다. Ait와 SteamFolder의 상세 도식은 구현 흐름도·서비스 개념도라고 표시한다. 사진·로고·실제 화면의 출처를 함께 관리하고, 자산 추가 시 원본과 사용 경위를 기록한다. Ait 실제 화면과 공개 데모 링크는 아직 제공되지 않았다.

일반 제어의 색·경계 전환은 160ms ease다. 아일랜드 선택 표시는 `transform 240ms cubic-bezier(.22, 1, .36, 1)`과 opacity 160ms로 현재 섹션을 따라 이동하며 reduced motion에서는 전환을 끈다. anchor 이동과 맨 위로 이동은 smooth scroll을 사용하며 reduced motion에서는 자동 이동으로 조정하고 버튼·링크 transition을 끈다.

## Do's and Don'ts

### Do:

- **Do** 회색 농도와 글자 크기·두께·간격으로 정보의 위계를 유지한다.
- **Do** 원본 사진·로고·실제 화면의 색과 비율을 유지하고 출처와 사용 경위를 기록한다.
- **Do** 도식에는 흐름도·개념도라는 설명을 붙이고 실제 화면과 구분한다.
- **Do** 작은 화면에서는 열을 순서대로 접고, 측정 표의 가로 스크롤은 표 안에 한정한다.
- **Do** 수치와 검증 조건, 본인 기여와 현재 상태를 가까이 배치하여 함께 읽게 한다.

### Don't:

- **Don't** 사이트 행동에 이전 파랑 강조 체계를 다시 적용하거나 원본 자산의 색을 회색으로 변환한다.
- **Don't** 프로젝트마다 같은 외곽선과 그림자를 반복하여 기록보다 컨테이너를 강조한다.
- **Don't** 제공되지 않은 서비스 화면·로고·데모를 만들어 실제 자료로 제시한다.
- **Don't** 팀의 전체 화면이나 측정 기록을 개인의 운영 성과·해결 완료로 표현한다.


## 2026-10-17 승인한 소개와 프로젝트 비중 조정

최신 사용자 승인은 풀스크린 소개를 유지하면서 큰 화면 제목을 최대 96px로 확대하고, 프로젝트 제목 아래에 기존 작은 정사각 타일 세 개를 배치하는 방향이다. 이 결정이 앞선 80px 최대 제목과 프로젝트 좌우 배치 설명을 대체한다.

색과 글꼴은 기존 Noto Sans KR, Manrope와 회색 여섯 역할을 유지한다. 소개 제목은 clamp(48px, 7.2vw, 96px), 줄높이 1.3이며, 이름 위 간격은 32px다. 모바일의 두 줄 제목 크기와 전체 화면 소개, 아일랜드 메뉴, 원본 로고와 프로젝트 모달은 보존한다.

프로젝트는 단일 열, 제목과 타일 사이 40px, 최소 높이 480px, 위 80px·아래 96px 여백으로 구성한다. 작은 타일은 기존 184px와 좁은 화면의 크기 규칙을 유지한다. 820px 이하에서는 고정 최소 높이를 해제하고 위 64px·아래 72px, 600px 이하에서는 위 56px·아래 64px로 줄인다.

작업 방식은 상하 80px·88px, 최소 높이 600px를 기준으로 실제 내용이 늘어나면 자연스럽게 커진다. 세 열에 원칙, 구현 사례, 실제 근거, 관련 상세 링크를 순서대로 둔다. 근거는 채팅 조회 평균 응답의 전후 값과 개인 검증 조건, JWT와 멤버 확인 흐름, 공유한 Git 가이드의 작업 시작 예시다. 별도 장식 카드나 임의 성과를 추가하지 않는다.

960px 이하에서는 작업 방식을 한 열로 풀고 최소 높이를 해제한다. 항목 사이 간격과 얇은 가로선으로 구분하며 링크 높이는 44px 이상 유지한다. 상세 근거 링크를 열면 대상 제목에 초점을 옮기고 닫으면 진입 링크로 복귀한다.

320px 화면에서는 stable scrollbar gutter와 충돌하던 body 최소 폭을 제거한다. 360px 이하 측정값은 23px로 줄여 단위를 포함한 숫자가 열 안에 들어가게 한다. 실제 확인과 도구 제한은 [검증 기록](layout-verification-2026-10-17.md)에 남긴다.
