# 이미지 자료

사용자 확인일: 2026-10-13. 실제 자료를 사용하고 원래 이미지의 색과 내용을 변경하지 않습니다.

| 용도 | 현재 위치 | 출처 |
| --- | --- | --- |
| 김민범 프로필 사진 | public/assets/profile/kim-minbeom.jpg | 사용자가 제공한 저장소 루트의 증명출력.jpg를 이름 변경·이동 |
| Ait 로고 | public/assets/projects/ait-logo.png | 사용자가 제공한 ait-app-icon-512.png를 이름 변경·이동 |
| ONEWORK 로고 | public/assets/projects/onework-logo.png | 사용자 요청에 따라 C:\S15P21D202\serving\api\static\img\onework-logo.png에서 복사 |
| ONEWORK 실제 화면 | public/assets/projects/onework-overview.png | 사용자가 제공한 onework-project사진.png를 이름 변경·이동 |

ONEWORK 화면은 팀 서비스의 모습이며 개인 기여는 카메라 연동·API·실행/녹화·설비 매핑으로 설명합니다. 캡처가 있다는 사실을 HTTPS 통합 문제 해결의 근거로 사용하지 않습니다.

## 추후 보충할 자료

- Ait 실제 화면: 사용자가 로컬에서 직접 캡처할 예정입니다. 현재는 실제 로고와 구현 흐름도를 보여줍니다.
- 공개 데모: 준비되면 프로젝트 links에 추가합니다.
- SteamFolder의 별도 로고·화면은 현재 제공되지 않았습니다. 허구 로고나 실제 화면을 가장한 이미지를 만들지 않습니다.

## 추가로 확인하면 좋은 근거

- nGrinder 실행 환경과 원본 결과: 하드웨어, 실행 시간, 반복 횟수, DB·캐시 상태를 확보하면 수치의 재현 조건을 더 상세히 적을 수 있습니다.
- 공개 열람 가능한 상세 기록: 기존 Notion·SSAFY GitLab 링크의 공개 접근은 확인되지 않았습니다. 현재 제공된 Notion 연결은 이전 페이지에 접근되지 않습니다.

## 파일 내 출처 기록

네 개의 제공·복사 이미지에는 원본 파일명과 사용 경위를 메타데이터로 기록했습니다. 출처 검사 결과: 4개 이미지, 누락 0개. 픽셀과 투명도는 유지했습니다.

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
