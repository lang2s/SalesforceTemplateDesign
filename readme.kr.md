# Salesforce Lightning Design System 2 (SLDS 2 · Cosmos) — 디자인 시스템

**Salesforce Lightning Design System 2**와 그 기본 테마인 **Salesforce Cosmos**를 재현한 디자인 에이전트 키트입니다. 최신 Salesforce Lightning Experience(Sales Cloud, Service Cloud 및 광범위한 Lightning Platform)의 비주얼 언어를 담고 있습니다. 레코드 페이지, 리스트 뷰, 대시보드, 앱 셸 등 브랜드에 맞는 Salesforce UI를 — 실제 프로덕션용이든 일회성 프로토타입이든 — 만드는 데 사용하세요.

> **SLDS 2란.** SLDS 2는 차세대 Salesforce 디자인 시스템이며 Salesforce의 "에이전틱(agentic)" 디자인 방향의 토대입니다. 그 **Cosmos** 테마는 SLDS 1을 풍부해진 컬러 팔레트, 부드러워진 모서리, 가독성 높은 타입 스케일, 차분한 여백, 그리고 새로운 **글로벌 스타일링 훅(styling-hook)** 프레임워크(`--slds-g-*`)로 리프레시합니다. 재구축이 아니라 SLDS 1의 *업그레이드*입니다 — 동일한 블루프린트와 베이스 컴포넌트를 다시 스타일링한 것입니다.

## 출처

이 키트는 공식 Salesforce 스타터 킷과 공개된 SLDS 컬러/토큰 시스템을 읽어 제작했습니다. 더 높은 충실도를 원한다면 아래 출처를 직접 살펴보길 권장합니다(접근에 권한이 필요할 수 있음):

- **GitHub — `salesforce-ux/design-system-2-starter-kit`** · https://github.com/salesforce-ux/design-system-2-starter-kit
  LWC + Vite + SLDS 2 스타터 앱. `src/modules/`(셸, 페이지, ui)가 앱 셸, 글로벌 헤더, 글로벌 내비게이션, 예제 페이지(Home, Contacts, Contact Detail)를 정의하며 Lightning CRM UI 킷이 이를 재현합니다. 실제 비주얼 토큰은 npm 패키지 `@salesforce-ux/design-system`(SLDS 1)과 `@salesforce-ux/design-system-2`(SLDS 2 / Cosmos)에 들어 있으며 빌드 시점에 해석됩니다.
- **Lightning Design System** · https://www.lightningdesignsystem.com (SLDS 2 베타) · https://v1.lightningdesignsystem.com (SLDS 1)
- **Lightning Base Components 레퍼런스**(`lightning` 네임스페이스 컴포넌트 카탈로그 — Button, Modal, Breadcrumbs, Progress Indicator/Path, Alert, Datatable 등, SLDS 블루프린트를 구현) · https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/components.html
- **스타일링 훅 레퍼런스** · https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-custom-properties.html
- **The Salesforce Color System**(팔레트 램프) · `--slds-g-color-palette-*` 값의 출처.

### 대체 항목(표시됨 — 프로덕션에서는 교체 필요)

- **서체.** ✅ 실제 브랜드 서체 **Salesforce Sans**가 번들로 포함됩니다(`assets/fonts/`, 전체 패밀리 — Thin/Light/Regular/Bold + 이탤릭, © Salesforce). 기본 UI 폰트로 설정됨. 굵기 500(medium)은 400으로, 600(semibold)은 700으로 가장 가까운 굵기로 해석됩니다. **Public Sans**(Google Fonts)는 메트릭 폴백으로만 남아 있고, **Roboto Mono**가 모노스페이스입니다.
- **아이콘.** ✅ **공식 SLDS 아이콘 스프라이트**가 이제 `assets/icons/`에 번들로 포함됩니다(utility, standard, action, doctype, custom — 총 1,764개 심볼, CC BY-ND 4.0, © Salesforce). `Icon` 컴포넌트가 SLDS 이름(예: `utility:download`, `standard:contact`)으로 직접 렌더링합니다. 스프라이트를 가져올 수 없을 때(예: `file://`로 열린 경우) Material Symbols가 자동 폴백으로만 동작합니다. 아래 **아이코노그래피** 참고.
- **아바타 사진.** 스타터 킷의 `avatar1.jpg`가 깔끔하게 임포트되지 않아, 아바타는 컴포넌트의 브랜드 일관된 **이니셜** 폴백(파란 원)을 사용합니다.

---

## 디자인 원칙

SLDS 2는 단순한 컴포넌트 세트가 아니라 철학으로 정의됩니다 — 다섯 가지 원칙이 모든 패턴과 제품 결정을 이끕니다. 이 키트로 디자인하는 모든 것에 이 원칙을 적용하세요:

- **명료함(Clarity)** — *단순함이 추진력을 만든다.* 명확하고 직관적인 레이아웃과 간결한 워크플로를 우선하고, 마찰을 제거해 과제에 집중되도록 한다. (실무: 뷰당 기본 액션 하나, 평이한 라벨, 넉넉한 여백, 장식적 노이즈 없음.)
- **혁신(Innovation)** — *미래는 늘 움직인다.* 적응하도록 만든다 — 새로운 패턴(예: Agentforce/에이전틱 화면)을 수용하고 단일 레이아웃에 고정되기보다 다음을 위해 설계한다.
- **확장성(Scalability)** — *훌륭한 시스템은 함께 성장한다.* 모듈식을 유지한다 — 프리미티브로 화면을 구성해 하나의 컴포넌트에서 글로벌 UI까지 재설계 없이 유연하게 확장한다.
- **권한 부여(Empowerment)** — *디자인은 모두를 위한 것.* 진입 장벽을 낮춘다 — 기본적으로 접근 가능(포커스 링, 대비, 시맨틱), 스타일링 훅을 통한 노코드 테마, 누구나 따라할 수 있는 문서.
- **영감(Inspiration)** — *딜라이트도 시스템의 일부.* 시스템 안에서 표현력을 발휘한다 — 차분한 모션, 자신감 있는 타입, 의도를 가지고 사용하는 단일 브랜드 블루. 기능 우선이지만 생기 없지는 않게.

**이 키트가 다루는 파운데이션**(SLDS 2의 "What you'll find here" 세트): 아이코노그래피, 컬러, 타이포그래피, 간격 & 사이징, 보더 & 라디우스, 섀도우 — 모두 `tokens/`와 `guidelines/` 스펙시먼 카드에 명세됨. *일러스트레이션*은 **EmptyState** 컴포넌트의 아이콘 처리로만 표현됩니다(실제 SLDS 일러스트 라이브러리는 라이선스 아트워크 — 프로덕션에서는 공식 에셋으로 교체).

---

## 콘텐츠 기본 원칙

Salesforce 제품 UI가 어떻게 쓰여지는가. SLDS 인터페이스는 **전문적이고, 평이하며, 과제 중심적**입니다 — 소비자 마케팅이 아니라 영업 담당, 서비스 상담원, 관리자를 위한 엔터프라이즈 소프트웨어입니다.

- **보이스:** 명확하고 직접적이며 도움이 되도록. 액션은 동사 우선(**New**, **Edit**, **Log a Call**, **Save**, **Follow**). 크롬에 느낌표 없음. 토스트는 자신감 있는 마침표 하나 허용("Contact saved.").
- **인칭:** UI는 사용자를 **you**로 호칭("Search Salesforce…", "Your changes were saved"). 레코드 데이터는 3인칭 사실 기술.
- **대소문자:** 버튼, 탭, 메뉴 항목, 컬럼 헤더는 **Title Case**(Recently Viewed, Close Date, Account Name). 본문, 도움말, 토스트 메시지는 **Sentence case**. ALL-CAPS는 `title_caps` 스타일을 통한 작은 eyebrow/섹션 라벨에만(자간 적용).
- **라벨 & 오브젝트:** Salesforce CRM 명사가 일급 — Account, Contact, Lead, Opportunity, Case, Task, Campaign, Pipeline, Stage, Close Date, Amount, Owner. 리스트 뷰는 "**Recently Viewed**", "**My Open Opportunities**", "**12 items · sorted by Name · Updated a few seconds ago**"처럼 읽힘.
- **톤:** 자신감 있고 조용히 낙관적("Sell faster", "Close more deals"), 절대 과장 없음. 숫자와 통화는 구체적($240,000, 68%, Q3).
- **이모지:** **없음.** Salesforce 제품 UI는 이모지를 쓰지 않음. 상태는 색상 배지, 아이콘, 텍스트로 전달 — 절대 이모지로 아님.
- **마이크로카피:** 짧고 훑어보기 쉽게. 빈 상태는 간결하고 실행 가능하게("No contacts match your search."). 도움말은 한 줄.

예시 스펙시먼(`guidelines/type-*` 카드 참고): eyebrow "SALES CLOUD" → heading "Pipeline overview" → body "Track every opportunity from first touch to closed-won with a single source of truth." → meta "Last modified by Austin Guevara · 2 hours ago".

---

## 비주얼 파운데이션

Cosmos 룩: **깨끗하고, 밝고, 뉴트럴 우선, 그리고 자신감 있는 블루 하나.** 정보 밀도는 높지만 차분 — 부드러운 회색 캔버스 위에 떠 있는 흰 카드 안에 넉넉한 여백.

- **컬러.** 단일 브랜드 색이 모든 일을 한다: **Salesforce Blue `#0176D3`**(`palette-blue-50` → `--slds-g-color-accent-1`). 크롬에서 유일한 채도 있는 색 — 기본 버튼, 링크, 활성 탭, 레코드명 링크에 사용. 그 외 모든 것은 **뉴트럴 그레이**(텍스트 `#181818`부터 12단계 램프를 거쳐 `#ffffff`까지). 피드백 색은 상태에만 엄격히 예약: 녹색 `#2e844a`(성공/won), 주황 `#fe9339`(경고/at-risk), 빨강 `#ea001e`(오류/overdue), 시안 `#0d9dda`(정보). Cosmos는 테마용 브랜드 가능 **액센트** 색(인디고, 바이올렛, 핑크, 틸)과 색상 있는 **표준 오브젝트 아이콘 타일**(account=인디고, contact=블루, opportunity=앰버 등)도 제공. 전체 **다크 테마**는 `data-slds-theme="dark"`로 표면/텍스트를 전환.
- **표면(Surfaces).** 세 개의 뉴트럴 레이어: 앱 캔버스(`surface-1`, 연한 회색 `#f3f3f3`), 흰색 **컨테이너/카드**(`surface-container-1`), 가라앉은 웰(`surface-3`). 페이지는 회색, 콘텐츠는 흰 카드 위에. 배경 이미지·그라데이션·텍스처 없음 — Cosmos는 접근성을 위해 배경 이미지를 명시적으로 배제.
- **타입.** Public Sans(→ Salesforce Sans). 가독성 높은 스케일: 디스플레이 52/32, 헤딩 24/20/16/14, 본문 16/14(기본)/12. 헤딩은 **볼드**에 타이트한 트래킹, 본문은 1.5 줄간격의 레귤러, 메타는 옅은 회색. 코드/토큰에는 모노(Roboto Mono).
- **간격(Spacing).** 4px 기본 단위. 숫자형 `spacing-1…8`을 SLDS 티셔츠 이름에 매핑(x-small 8 · small 12 · medium 16 · large 24 · x-large 32). 편안하고 일관된 거터, 카드는 숨 쉰다.
- **모서리(Corners).** SLDS 1보다 부드러움. `radius-2`(4px) 입력/칩, `radius-3`(8px) 버튼/컨트롤, `radius-4`(12px) 카드/패널, `radius-5`(16px) 대형 표면, 배지/검색은 풀 **pill**, 아바타는 **원형**.
- **고도(Elevation).** 절제되고 저대비의 뉴트럴 틴트 섀도우 — 절대 강하지 않게. `shadow-1` 헤어라인(휴지 상태), `shadow-2` 카드, `shadow-3` 호버-리프트/드롭다운, `shadow-4` 모달/팝오버. 카드는 흰색 + `1px` 헤어라인 보더 + `shadow-2`. 글로우 없음, 색상 섀도우 없음.
- **보더(Borders).** `1px` 헤어라인(`border-1` `#e5e5e5`)이 행을 나누고 카드를 둘러쌈. 컨트롤 보더는 약간 더 어둡게(`border-2` `#c9c9c9`), 브랜드 보더는 블루.
- **모션(Motion).** 차분하고 빠르게 — **바운스 없음**. 지속시간 `quickly 0.1s` / `promptly 0.2s` / `slowly 0.4s`에 표준 ease-out. 트랜지션은 호버/포커스 시 색상·배경·box-shadow로 제한, 장식적 루프 없음.
- **상태(States).** 호버 = 미묘한 배경 틴트(`surface-3`) 또는 더 어두운 브랜드 셰이드, 링크는 어두워짐. 누름 = 더 어두운 셰이드(축소 없음). **포커스 = 3px 소프트 블루 링**(`shadow-focus`) — 모든 인터랙티브 요소에 걸친 일관된 접근성 신호. 비활성 = 0.5 투명도 / 흐린 회색.
- **이미지(Imagery).** 최소한으로. 제품 표면은 사진이 아니라 UI다. 아바타는 사진 *또는* 파란 이니셜 원, 표준 오브젝트는 색상 있는 둥근 사각 아이콘 타일로 렌더. 히어로 이미지 없음, 크롬에 일러스트 없음(일러스트는 실제 제품에서 빈/오류 상태에만 등장).
- **레이아웃(Layout).** 고정 앱 셸: `~52px` 흰색 **글로벌 헤더**(로고, 중앙 pill 검색, 액션 아이콘, 아바타) 위에 `~44px` 흰색 **앱 내비게이션 바**(App Launcher 와플 + 앱 이름 + 밑줄 탭), 그 아래 최대폭 컨테이너(~1180px)에 중앙 정렬된 스크롤 콘텐츠 영역. 레코드 페이지는 하이라이트 **페이지 헤더** + 2/3 상세 · 1/3 활동 분할을 사용.

---

## 아이코노그래피

- **시스템:** Salesforce는 자체 **SLDS 아이콘 세트**를 사용 — 네 가지 카테고리: `utility:`(모노크롬 라인/솔리드 UI 글리프, ~16–24px, 텍스트 색 상속), `standard:`(**색상 있는 둥근 사각 타일** 위의 CRM 오브젝트, 흰 글리프), `action:`(둥글고 색상 있음), `doctype:`(파일 유형). 아이콘은 콜론 이름으로 참조(`utility:download`, `standard:opportunity`).
- **이 키트에서:** `Icon` 컴포넌트(`components/display/Icon.jsx`)가 `assets/icons/*.svg`의 **실제 SLDS 스프라이트**를 렌더. 한 번 가져와 카테고리 네임스페이스가 붙은 심볼 id(`slds-<category>-<name>`, Safari 안전한 동일 문서 `<use>`)로 문서에 주입하고 SLDS 이름으로 참조. `utility:*`는 색을 상속하는 모노크롬 글리프로(변형 틴트: `brand`, `success`, `warning`, `error`, `inverse`), `standard:*`/`action:*`/`custom:*`는 색상 타일 + 흰 글리프로, `doctype:*`는 풀 컬러로 렌더. 크기: `xx-small`–`large`. 이름이 스프라이트에 없거나 가져오기 실패 시 Material Symbols 글리프로 폴백.
- **전체 둘러보기:** `guidelines/iconography.card.html`(Design System 탭 → **Iconography → Icon Gallery**)는 다섯 스프라이트의 **모든** 심볼(총 1,764개)을 검색할 수 있는 브라우저. 탭으로 카테고리 전환, 입력해 이름으로 필터, 아무 아이콘이나 클릭하면 그 `category:name` 참조(예: `standard:opportunity`)가 클립보드에 복사됨. `Icon` 컴포넌트에 넘길 정확한 이름을 찾는 데 사용.
- **이모지 / 유니코드:** 아이코노그래피로 절대 사용 안 함. 모든 아이콘은 SLDS 세트에서.
- **스프라이트:** `assets/icons/utility.svg`(779), `standard.svg`(639), `action.svg`(187), `custom.svg`(113), `doctype.svg`(46). 업데이트하려면 동일한 `<symbol id>` 규칙으로 새 SLDS 아이콘 릴리스로 이 파일들을 교체.

---

## 색인 / 매니페스트

**루트**
- `styles.css` — 소비자가 링크하는 단일 진입점. 아래 토큰 + 베이스 파일을 `@import`.
- `readme.md` — 영문 가이드. · `readme.kr.md` — 한국어 가이드(본 문서). · `SKILL.md` — Agent Skills 래퍼.

**`tokens/`** (모두 `styles.css`에서 도달 가능)
- `palette.css` — 원시 컬러 램프(`--slds-g-color-palette-<hue>-<step>`).
- `color.css` — 시맨틱 글로벌 훅(`--slds-g-color-*`) + **다크 테마** 스코프.
- `typography.css` — 패밀리, 굵기, `--slds-g-text-*` 사이즈, 줄간격.
- `spacing.css` — `--slds-g-spacing-*` 스케일 + 사이징 컨테이너.
- `radius-elevation.css` — 라디우스, 섀도우, 모션(지속시간/이징).
- `fonts.css` — Public Sans + Roboto Mono + Material Symbols `@import`(Material Symbols는 아이콘 폴백 전용, 실제 SLDS 스프라이트는 `assets/icons/`에).
- `base.css` — 엘리먼트 리셋 + SLDS 텍스트 유틸리티 클래스(`.slds-text-*`).

**`components/`** — 재사용 가능한 React 프리미티브(네임스페이스 `window.SalesforceSLDS2DesignSystem_2eee88`). 40개 컴포넌트가 공식 **Lightning Base Components** 카탈로그(`lightning` 네임스페이스)를 미러링. 각 디렉터리에 `*.card.html` 쇼케이스(Design System 탭), 각 컴포넌트에 `.d.ts` + `.prompt.md`.
- `buttons/` — **Button**(neutral · brand · outline-brand · destructive · success · text), **ButtonIcon**, **ButtonGroup**(세그먼트 컨트롤), **ButtonMenu**(아이템·구분선·서브헤더·destructive 드롭다운), **ButtonStateful**(Follow/Following 토글).
- `forms/` — **Input**, **Select**, **Textarea**, **Slider**, **Combobox**, **Checkbox**, **CheckboxGroup**, **RadioGroup**, **Toggle**, **DualListbox**, **FileUpload**(드롭 존).
- `display/` — **Card**, **Badge**, **Avatar**, **Pill**, **Icon**, **EmptyState**(일명 Illustration), **Helptext**(툴팁).
- `containers/` — **Accordion**, **Tile**, **Carousel**, **Layout** + **LayoutItem**(12컬럼 그리드).
- `feedback/` — **Tabs**, **Alert**(지속형), **Toast**(일시형), **Spinner**.
- `overlays/` — **Modal**(포커스 다이얼로그, small · medium · large).
- `navigation/` — **Breadcrumbs**, **VerticalNavigation**(섹션·아이콘·카운트 배지 사이드바).
- `progress/` — **ProgressIndicator**(`path` = Salesforce 영업/케이스 Path · `base` = 스테퍼), **ProgressBar**, **ProgressRing**.
- `data/` — **Datatable**(선택·정렬 컬럼·커스텀 셀·행 액션), **Tree**(중첩 펼침/접힘).

**카탈로그 패리티 — 의도적으로 문서화했으나 빌드하지 않은 컴포넌트.** 라이브 Salesforce org가 필요하거나 별도 비주얼 디자인이 없는 데이터 바인딩/로케일 포맷팅 LWC라서 정적 키트에 포함하지 않음. 필요할 때 위 프리미티브로 재구성:
- **폼(레코드 데이터 바인딩):** Record Form, Record Edit Form, Record View Form, Input Field, Output Field — 런타임에 `recordId`/SObject 필드에 바인딩. 목업에서는 `Card`/`Modal` 안에 `Input`/`Select`/`Combobox`를 구성.
- **출력 포맷터(로케일/i18n):** Formatted Address, Date Time, Email, Location, Name, Number, Phone, Rich Text, Text, Time, URL, Relative Date Time — 사용자 로케일로 포맷된 값을 렌더. 목업에서는 미리 포맷된 문자열만 출력.
- **알림 변형:** Confirm, Prompt(푸터 버튼이 있는 **Modal** 사용), Toast Container / Platform Show Toast Event(**Toast**의 호스트/큐).
- **입력:** Input Rich Text(+ Rich Text Toolbar Button/Group), Record Picker(레코드에 바인딩된 검색 **Combobox**), Click To Dial.
- **비주얼/컨테이너:** Dynamic Icon(애니메이션 상태), Illustration(**EmptyState**로 커버), Map(맵 제공자 필요), Quick Action Panel, Tab/Tab Set 내부, Carousel Image, Pill Container(**Pill** 배치로 커버), Tree Grid(**Tree** + **Datatable** 컬럼 구성), Flow.

**`ui_kits/lightning-crm/`** — 인터랙티브 **Sales Cloud** 재현
- `index.html` — 앱 진입점: 글로벌 헤더 + 앱 내비 + 라우팅 화면, 동작하는 검색·내비게이션·레코드 드릴인·토스트 포함.
- `shell.jsx`(GlobalHeader, AppNav), `home.jsx`(HomeDashboard — KPI, 기회, 작업), `records.jsx`(ContactsList, ContactDetail, OpportunityBoard/칸반), `data.js`(샘플 CRM 데이터).

**`templates/`** — 재사용 가능한 **시작점**(Templates 피커에 표시됨, 폴더를 복사해 새 디자인의 씨앗으로 사용):
- `templates/lightning-crm/` — 전체 Sales Cloud 앱(`LightningCrm.dc.html`이 자체 완결형 `LightningCrmApp.jsx`를 마운트).
- `templates/lwc-reference/` — **정본** 검색 가능한 LWC 컴포넌트 카탈로그(81개 컴포넌트, 12개 카테고리에 걸친 80개 라이브 데모). `reference/` 카드가 이를 임베드.
- `templates/crm-builder/` — **정본** 드래그 앤 드롭 CRM 페이지 빌더. `crm-builder/` Tools 카드가 이를 임베드.
- `templates/dashboard-builder/` — 드래그 앤 드롭 **대시보드 빌더**: 21개 위젯 유형(막대/세로 막대/누적, 선/영역/누적합/콤보, 도넛/파이/퍼널, 산점도/히트맵, 게이지, 메트릭, 테이블/라이트닝 테이블/피벗, 텍스트/이미지/필터)을 크기 조절 가능한 12컬럼 그리드 위에; 대시보드 설정 + 팔레트; 대시보드 메타데이터 XML, JSON, 또는 목업 아웃라인으로 내보내기. CRM 페이지 빌더와 동일한 `index.html` + `catalog.js`/`render.jsx`/`export.js`/`app.jsx` 구조.
- `templates/email-builder/` — 드래그 앤 드롭 **이메일 템플릿 빌더**: 13개 블록 유형(헤더/푸터, 히어로, 헤딩, 텍스트, 버튼, 리스트, 이미지, 제품 카드, 2컬럼, 구분선, 스페이서, 소셜)을 단일 컬럼 이메일 캔버스에 쌓음; 머지 필드 문법 토글(`{{Object.Field}}` ↔ `{!Object.Field}`)과 개인화 칩; 5개 스타터 템플릿(Welcome, Newsletter, Receipt, Invite, Re-engagement); 테이블 기반 **인라인 HTML 이메일**, **Lightning 이메일 템플릿** 본문, 또는 JSON으로 내보내기. 동일한 `index.html` + `catalog.js`/`render.jsx`/`export.js`/`app.jsx` 구조.
- `templates/approval-builder/` — 드래그 앤 드롭 **전자결재 폼 빌더**(한국형 전자결재 문서): 16개 블록 유형 — 결재선(stamp grid), 문서 제목, 문서정보표, 섹션 헤더, 공지, 폼 필드(텍스트, 숫자, 날짜, 통화, select, radio, checkbox, textarea, file), 그리고 품목 표(라인 아이템)와 서명/도장 영역; 4개 스타터 양식(지출결의서, 휴가신청서, 구매요청서, 출장신청서); 액센트 컬러 + 서체 설정; 인쇄 가능한 **인라인 HTML 폼**, **Lightning(LWC) 스캐폴드**(`.html`/`.js`/`.js-meta.xml`, 필드를 lightning 베이스 컴포넌트 + 승인 프로세스 훅에 매핑), 또는 JSON으로 내보내기. 동일한 빌더 구조.
- `templates/detail-builder/` — 드래그 앤 드롭 **LWC 상세 화면 빌더**: 리프 컴포넌트를 드롭해 Salesforce **레코드 상세 화면**을 설계 — 폼(Input, Select, Combobox, Text Area, Checkbox + Group, Radio Group, Toggle, Slider, Dual Listbox, File Upload), 디스플레이(Badge, Avatar, Pill, Icon, Progress Bar, Text Block), 액션(Button, Button Group) — 을 조합 가능한 **Section / Card / Modal** 컨테이너에, 각각 실제 편집 가능한 변형 스키마를 갖고; 편집 가능한 레코드 헤더, 라이브 **모달 미리보기**, 컴포넌트별 인스펙터; **Lightning(LWC) 번들** & JSON으로 내보내기. 동일한 `index.html` + `catalog.js`/`render.jsx`/`export.js`/`app.jsx` 구조.

**`reference/`** — `LWC Reference.html`: 얇은 **임베드 래퍼**(`@dsCard group="Reference"` 태그를 가지고 `templates/lwc-reference/`의 정본 파일을 iframe). 136 KB 소스를 중복하지 않고 카탈로그를 Design System 탭에 표시.

**`crm-builder/`** — `index.html`: 얇은 **임베드 래퍼**(`@dsCard group="Tools"` 태그를 가지고 `templates/crm-builder/`의 정본 빌더를 iframe). 빌더 코드를 중복하지 않고 CRM 페이지 빌더를 Design System 탭 → "Tools"에 표시. 실제 빌더 — Lightning App Builder 스타일의 드래그 앤 드롭 프로토타이퍼(`catalog.js`, `render.jsx`, `export.js`, `app.jsx`; 25개 페이지 컴포넌트, 6개 영역 레이아웃, 페이지 설정, 컴포넌트별 속성; FlexiPage XML, LWC 스캐폴드, JSON, 또는 목업 아웃라인 내보내기) — 는 `templates/crm-builder/`에 있음.

**`guidelines/`** — 파운데이션 스펙시먼 카드(Design System 탭): Colors(Brand, Surfaces, Feedback, Dark), Type(Typeface, Headings, Body), Spacing(Scale, Radius, Elevation), Brand(Logo), Iconography(Icon Gallery — 1,764개 SLDS 아이콘 전체의 검색 브라우저).

**`assets/`** — `salesforce-cloud.svg`(클라우드 마크) + `icons/`(다섯 개의 공식 SLDS 아이콘 스프라이트: utility, standard, action, doctype, custom). `public/favicon.ico` + `public/images/salesforce.svg`는 원본 스타터 킷 임포트.
