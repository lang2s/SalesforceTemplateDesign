/* Approval (전자결재) Form Builder — catalog: document blocks, fields, prop
   schema & starter templates. Exposed as window.APB. Blocks render with literal
   inline styles so the canvas matches the exported HTML form.

   Prop schema entry: { k, l, t:'text'|'textarea'|'number'|'select'|'toggle'|'color', d, o:[options] } */
(function () {
  const aligns = ["left", "center", "right"];

  const catalog = [
    // ---- 문서 (Document) ----
    { type: "approvalLine", label: "결재선 (도장칸)", icon: "utility:approval", group: "문서 (Document)",
      desc: "직위·도장·이름이 들어가는 결재 박스",
      props: [{ k: "label", l: "세로 라벨", t: "text", d: "결재" }, { k: "roles", l: "결재 단계 (직위:이름, 한 줄에 하나)", t: "textarea", d: "담당\n팀장\n본부장\n대표이사" }, { k: "showDate", l: "날짜칸 표시", t: "toggle", d: true }, { k: "align", l: "정렬", t: "select", d: "right", o: aligns }] },
    { type: "docTitle", label: "문서 제목", icon: "utility:text", group: "문서 (Document)",
      desc: "가운데 정렬 문서 표제",
      props: [{ k: "title", l: "제목", t: "text", d: "지 출 결 의 서" }, { k: "subtitle", l: "부제 / 영문", t: "text", d: "" }, { k: "spread", l: "자간 넓게", t: "toggle", d: true }] },
    { type: "docInfo", label: "문서 정보표", icon: "utility:table", group: "문서 (Document)",
      desc: "문서번호·기안일·부서 등 메타 표",
      props: [{ k: "rows", l: "항목 (라벨:값, 한 줄에 하나)", t: "textarea", d: "문서번호:\n기 안 일: \n기안부서:\n기 안 자:\n시 행 일:\n보존연한: 5년" }, { k: "cols", l: "열 수", t: "select", d: "2", o: ["1", "2"] }] },

    // ---- 항목 (Fields) ----
    { type: "textField", label: "텍스트", icon: "utility:edit", group: "항목 (Fields)",
      desc: "한 줄 텍스트 입력",
      props: [{ k: "label", l: "라벨", t: "text", d: "건명" }, { k: "placeholder", l: "안내문구", t: "text", d: "" }, { k: "required", l: "필수", t: "toggle", d: true }] },
    { type: "numberField", label: "숫자", icon: "utility:number_input", group: "항목 (Fields)",
      desc: "숫자 입력 (단위 옵션)",
      props: [{ k: "label", l: "라벨", t: "text", d: "수량" }, { k: "unit", l: "단위", t: "text", d: "개" }, { k: "required", l: "필수", t: "toggle", d: false }] },
    { type: "dateField", label: "날짜", icon: "utility:date_input", group: "항목 (Fields)",
      desc: "날짜 선택",
      props: [{ k: "label", l: "라벨", t: "text", d: "지출예정일" }, { k: "required", l: "필수", t: "toggle", d: true }] },
    { type: "currencyField", label: "금액 / 통화", icon: "utility:currency", group: "항목 (Fields)",
      desc: "통화 금액 입력",
      props: [{ k: "label", l: "라벨", t: "text", d: "금액" }, { k: "currency", l: "통화기호", t: "select", d: "₩", o: ["₩", "$", "€", "¥"] }, { k: "required", l: "필수", t: "toggle", d: true }] },
    { type: "selectField", label: "드롭다운", icon: "utility:picklist_type", group: "항목 (Fields)",
      desc: "단일 선택 목록",
      props: [{ k: "label", l: "라벨", t: "text", d: "계정과목" }, { k: "options", l: "옵션 (쉼표)", t: "text", d: "여비교통비, 접대비, 소모품비, 복리후생비, 도서인쇄비" }, { k: "required", l: "필수", t: "toggle", d: true }] },
    { type: "radioGroup", label: "라디오", icon: "utility:choice", group: "항목 (Fields)",
      desc: "단일 선택 (라디오)",
      props: [{ k: "label", l: "라벨", t: "text", d: "긴급도" }, { k: "options", l: "옵션 (쉼표)", t: "text", d: "보통, 긴급, 즉시" }, { k: "inline", l: "가로 배열", t: "toggle", d: true }] },
    { type: "checkboxGroup", label: "체크박스", icon: "utility:check", group: "항목 (Fields)",
      desc: "복수 선택 (체크박스)",
      props: [{ k: "label", l: "라벨", t: "text", d: "지급방법" }, { k: "options", l: "옵션 (쉼표)", t: "text", d: "계좌이체, 법인카드, 현금" }, { k: "inline", l: "가로 배열", t: "toggle", d: true }] },
    { type: "textareaField", label: "여러 줄 텍스트", icon: "utility:justify_text", group: "항목 (Fields)",
      desc: "사유·내용 등 장문 입력",
      props: [{ k: "label", l: "라벨", t: "text", d: "사유 / 비고" }, { k: "rows", l: "줄 수", t: "number", d: 3 }, { k: "placeholder", l: "안내문구", t: "text", d: "지출 사유를 입력하세요." }] },
    { type: "fileField", label: "파일 첨부", icon: "utility:attach", group: "항목 (Fields)",
      desc: "증빙 파일 첨부 영역",
      props: [{ k: "label", l: "라벨", t: "text", d: "증빙 첨부" }, { k: "multiple", l: "여러 파일", t: "toggle", d: true }, { k: "hint", l: "안내문구", t: "text", d: "영수증·세금계산서 등" }] },

    // ---- 구성 (Composite) ----
    { type: "lineItems", label: "품목 표", icon: "utility:richtextbulletedlist", group: "구성 (Composite)",
      desc: "품목·수량·단가·금액 표 + 합계",
      props: [{ k: "title", l: "표 제목", t: "text", d: "지출 내역" }, { k: "columns", l: "열 (쉼표)", t: "text", d: "적요, 수량, 단가, 금액" }, { k: "rows", l: "빈 행 수", t: "number", d: 4 }, { k: "amountCol", l: "합계 열 이름", t: "text", d: "금액" }, { k: "currency", l: "통화기호", t: "select", d: "₩", o: ["₩", "$", "€", "¥"] }, { k: "showTotal", l: "합계 행", t: "toggle", d: true }] },
    { type: "signatureArea", label: "서명 / 도장 영역", icon: "utility:signature", group: "구성 (Composite)",
      desc: "신청자·승인자 서명/도장 칸",
      props: [{ k: "parties", l: "서명 주체 (쉼표)", t: "text", d: "신청자, 승인자" }, { k: "showDate", l: "날짜 줄", t: "toggle", d: true }, { k: "stampWord", l: "도장 문구", t: "text", d: "(인)" }] },
    { type: "sectionHeader", label: "구분 제목", icon: "utility:rows", group: "구성 (Composite)",
      desc: "본문 구역 구분 머리글",
      props: [{ k: "text", l: "제목", t: "text", d: "신청 내용" }, { k: "shade", l: "배경 음영", t: "toggle", d: true }] },
    { type: "notice", label: "안내문", icon: "utility:info", group: "구성 (Composite)",
      desc: "유의사항 / 안내 문구",
      props: [{ k: "text", l: "내용", t: "textarea", d: "※ 본 문서는 전자결재 후 효력이 발생합니다. 증빙 미첨부 시 반려될 수 있습니다." }] },
  ];

  const byType = {};
  catalog.forEach((c) => (byType[c.type] = c));
  function defaultProps(type) { const c = byType[type]; const p = {}; (c.props || []).forEach((pr) => (p[pr.k] = pr.d)); return p; }
  function mk(type, over) { return { type, props: Object.assign(defaultProps(type), over || {}) }; }

  // ----------------------------------------------------------- starter templates
  const baseSettings = { docTitle: "지출결의서", company: "글로벌미디어 주식회사", objectApiName: "Approval_Request__c", accent: "#1b3a6b", fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", width: 760 };

  const templates = {
    expense: {
      label: "지출결의서", icon: "utility:currency",
      settings: { ...baseSettings, docTitle: "지출결의서" },
      blocks: [
        mk("approvalLine"), mk("docTitle", { title: "지 출 결 의 서" }),
        mk("docInfo"),
        mk("sectionHeader", { text: "신청 내용" }),
        mk("textField", { label: "건명" }),
        mk("selectField"), mk("dateField"), mk("currencyField"),
        mk("lineItems"),
        mk("textareaField"),
        mk("fileField"),
        mk("notice"),
        mk("signatureArea"),
      ],
    },
    leave: {
      label: "휴가신청서", icon: "utility:event",
      settings: { ...baseSettings, docTitle: "휴가신청서", accent: "#0b6b4f" },
      blocks: [
        mk("approvalLine", { roles: "담당\n팀장\n부서장" }), mk("docTitle", { title: "휴 가 신 청 서" }),
        mk("docInfo", { rows: "문서번호:\n기 안 일: \n소    속:\n성    명:\n직    위:" }),
        mk("sectionHeader", { text: "신청 내용" }),
        mk("selectField", { label: "휴가구분", options: "연차, 반차, 병가, 경조사, 공가" }),
        mk("dateField", { label: "시작일" }), mk("dateField", { label: "종료일" }),
        mk("numberField", { label: "사용일수", unit: "일" }),
        mk("textareaField", { label: "사유", placeholder: "휴가 사유를 입력하세요." }),
        mk("textField", { label: "비상연락처", required: false }),
        mk("notice", { text: "※ 휴가 시작 3일 전까지 상신 바랍니다." }),
        mk("signatureArea", { parties: "신청자" }),
      ],
    },
    purchase: {
      label: "구매요청서", icon: "utility:cart",
      settings: { ...baseSettings, docTitle: "구매요청서", accent: "#7a3da3" },
      blocks: [
        mk("approvalLine"), mk("docTitle", { title: "구 매 요 청 서" }),
        mk("docInfo", { rows: "문서번호:\n요 청 일: \n요청부서:\n요 청 자:\n납기희망일:" }),
        mk("sectionHeader", { text: "구매 품목" }),
        mk("selectField", { label: "구매유형", options: "비품, 소모품, 장비, 외주, 소프트웨어" }),
        mk("lineItems", { title: "품목 내역", columns: "품목, 규격, 수량, 단가, 금액" }),
        mk("currencyField", { label: "총 구매금액" }),
        mk("textareaField", { label: "구매사유" }),
        mk("fileField", { label: "견적서 첨부" }),
        mk("signatureArea"),
      ],
    },
    trip: {
      label: "출장신청서", icon: "utility:travel_and_places",
      settings: { ...baseSettings, docTitle: "출장신청서", accent: "#b5621b" },
      blocks: [
        mk("approvalLine"), mk("docTitle", { title: "출 장 신 청 서" }),
        mk("docInfo", { rows: "문서번호:\n기 안 일: \n소    속:\n성    명:" }),
        mk("sectionHeader", { text: "출장 정보" }),
        mk("textField", { label: "출장지" }),
        mk("dateField", { label: "출발일" }), mk("dateField", { label: "복귀일" }),
        mk("radioGroup", { label: "교통수단", options: "자가용, 대중교통, 항공, 기차" }),
        mk("textareaField", { label: "출장목적" }),
        mk("currencyField", { label: "예상경비" }),
        mk("notice", { text: "※ 복귀 후 7일 이내 출장보고서를 제출하세요." }),
        mk("signatureArea"),
      ],
    },
  };

  function starter() { return templates.expense.blocks.map((b) => ({ type: b.type, props: { ...b.props } })); }

  window.APB = { catalog, byType, defaultProps, mk, templates, baseSettings, starter };
})();
