# 이미지 자료

사용자 확인일: 2026-10-13. 실제 자료를 사용하고 원래 이미지의 색과 내용을 변경하지 않습니다.

| 용도 | 현재 위치 | 출처 |
| --- | --- | --- |
| 김민범 프로필 사진 | public/assets/profile/kim-minbeom.jpg | 사용자가 제공한 저장소 루트의 증명출력.jpg를 이름 변경·이동 |
| Ait 로고 | public/assets/projects/ait-logo.png | 2026-10-19 루트의 ait-logo-horizontal-512.png로 교체, 원본 512×234 |
| ONEWORK 로고 | public/assets/projects/onework-logo.png | 사용자 요청에 따라 C:\S15P21D202\serving\api\static\img\onework-logo.png에서 복사 |
| ONEWORK 실제 화면 | public/assets/projects/onework-overview.png | 사용자가 제공한 onework-project사진.png를 이름 변경·이동 |
| Ait 랜딩페이지 | public/assets/projects/ait-landing.png | 2026-10-19 사용자가 루트에 저장한 ait 랜딩페이지.png를 이름 변경하고 이동 |
| SteamFolder 랜딩페이지 | public/assets/projects/steamfolder-landing.png | 2026-10-19 사용자가 루트에 저장한 steamfolder 랜딩페이지.png를 이름 변경하고 이동 |

ONEWORK 화면은 팀 서비스의 모습이며 개인 기여는 카메라 연동·API·실행/녹화·설비 매핑으로 설명합니다. 캡처가 있다는 사실을 HTTPS 통합 문제 해결의 근거로 사용하지 않습니다.

## 추후 보충할 자료

- Ait 담당 기능 화면: 스터디, 채팅, 커뮤니티 등의 캡처는 추후 보충합니다. 현재 홈 미리보기에는 제공된 랜딩페이지 캡처를 사용합니다.
- 공개 데모: 준비되면 프로젝트 links에 추가합니다.
- SteamFolder의 폴더와 공개 쇼케이스 화면은 추후 보충합니다. 현재 홈 미리보기에는 제공된 랜딩페이지 캡처를 사용하며, 별도 로고는 아직 제공되지 않았습니다.

## 추가로 확인하면 좋은 근거

- nGrinder 실행 환경과 원본 결과: 하드웨어, 실행 시간, 반복 횟수, DB·캐시 상태를 확보하면 수치의 재현 조건을 더 상세히 적을 수 있습니다.
- 공개 열람 가능한 상세 기록: 기존 Notion·SSAFY GitLab 링크의 공개 접근은 확인되지 않았습니다. 현재 제공된 Notion 연결은 이전 페이지에 접근되지 않습니다.

## 파일 내 출처 기록

2026-10-19 새 가로형 Ait 로고를 기존 배포 파일 위치로 이동해 교체했습니다. 원본의 픽셀과 투명도, 메타데이터는 변경하지 않았습니다. 원본 및 교체 파일의 SHA-256은 `C279EDEEF6F3FE0ADDF813FBF3E8D45C663F7545E61BEE355A71DBF4EC4811E2`로 같습니다. 홈 카드, 상세 제목과 개념도에 같은 로고를 사용하며 원본 512:234 비율을 유지합니다. 1440, 1920, 390, 320px에서 이미지 로딩, 전체 표시와 가로 넘침 없음 및 상세 닫기와 초점 복귀를 확인했고 TypeScript와 Vite 빌드도 통과했습니다. 화면 기록은 `.impeccable/review/ait-horizontal-logo/`에 있습니다. 아래의 기존 Ait 아이콘 메타데이터 기록은 교체 전 자료입니다.

네 개의 제공·복사 이미지에는 원본 파일명과 사용 경위를 메타데이터로 기록했습니다. 출처 검사 결과: 4개 이미지, 누락 0개. 픽셀과 투명도는 유지했습니다.

2026-10-19 제공된 랜딩페이지 두 장은 아래 원본 SHA-256과 동일한 파일로 이동했습니다. PNG를 재인코딩하거나 픽셀과 메타데이터를 변경하지 않았습니다. Ait은 2830×1446, SteamFolder는 2879×1440입니다. 최종 요청에 따라 홈 미리보기는 사진을 자르지 않습니다. CSS width: 100%, height: auto와 object-fit: contain으로 전체를 원본 비율대로 표시하며, 최신 공통 너비 요청에서도 사진 크기는 유지하며 늘어난 카드 폭은 양쪽과 가운데 여백으로 배분합니다. 원본 파일은 유지합니다. 홈의 사진도 카드 전체와 같은 프로젝트 상세 모달로 연결하며 별도 원본 보기 링크는 표시하지 않습니다.

| 파일 | 원본 및 현재 SHA-256 |
| --- | --- |
| ait-landing.png | E55CD08B4AFBBE7B50E1BB8AE0F31D271F9319D79CA3748EAE0A2E7A238BAAFD |
| steamfolder-landing.png | 62E7EF22EE4382CE44B25B65260642476E1C42AA99B0EFD1B8B3A6DAE23B2D4C |

## 2026-10-16 기술 로고

사용자가 이전 기기에서 준비해 저장소 루트에 남긴 SVG 7개를 `public/assets/skills/`에 기술별 파일명으로 옮겼습니다. 기존 화면에서 사용하던 대상 파일과 원본이 바이트 단위로 같음을 확인한 뒤 이동했으며, 색·viewBox·워드마크는 유지됩니다. CSS `object-fit: contain`으로 비율을 보존합니다.

| 표시 기술 | 배포 경로 | 제공된 원본 |
| --- | --- | --- |
| Java | public/assets/skills/java.svg | java.svg |
| Spring Boot / Spring Security | public/assets/skills/spring.svg | spring-2.svg |
| MySQL | public/assets/skills/mysql.svg | mysql.svg |
| Redis | public/assets/skills/redis.svg | redis.svg |
| Docker Compose | public/assets/skills/docker.svg | docker-logo-ocean-blue.svg |
| Git | public/assets/skills/git.svg | Git-Logo-2Color.svg |
| React | public/assets/skills/react.svg | react_original_wordmark_logo_icon_146375.svg |

공식 배포처 URL은 아직 제공되지 않았으며 사용자 제공 파일이라는 출처로 기록합니다. 나머지 기술은 로고를 새로 만들지 않고 기술명 약칭을 텍스트로 표시합니다.

## 2026-10-21 Spring과 Hibernate 로고 교체

사용자가 루트에 제공한 두 파일을 아래 위치로 이름 변경해 이동했다. 재인코딩 없이 원본 파일을 보관하며 이동 전후 SHA-256이 일치한다.

| 용도 | 배포 경로 | 제공된 원본 | SHA-256 |
| --- | --- | --- | --- |
| Spring Boot | public/assets/skills/spring.png | spring 변경 logo.png | 138335168DD9917F1926613B2BCFBD162550B4F37F24F3B1242A810B0BCE23EE |
| JPA / Hibernate | public/assets/skills/hibernate.webp | Hibernate_logo.svg.webp | B10B2843574F3BC0CEF511A5A3CBD1FA934178B66ACD5499DE8387CC664DB91B |

Spring PNG는 447×447 심볼이다. Hibernate WebP는 1280×214 가로형으로, 목록에서는 object-fit: cover와 object-position: left center를 사용해 왼쪽 심볼을 42×42로 표시한다. 배포 파일 자체에는 전체 로고가 유지된다. 기존 JPA 약칭 표시를 이 로고로 교체하고 기술 이름은 JPA / Hibernate로 쓴다. 위의 기존 spring.svg 사용 기록은 교체 전 자료다.

후속 요청으로 흰 배경의 spring.png를 삭제하고 기존 spring.svg로 되돌렸다. Spring Boot에는 기존 투명 SVG를 사용하며 Hibernate 로고는 유지한다. 위 Spring PNG 기록은 삭제 전 이력이다.
