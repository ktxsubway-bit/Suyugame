(function() {
  // 관리자 예외 처리 (?admin=mysecretkey 로 접속 시 정상 코드 보임)
  if (new URLSearchParams(window.location.search).get("admin") === "mysecretkey") return;

  let isReplaced = false;

  // 개발자 도구 내부의 HTML 소스 전체를 "코드 훔치지 마"로 대체
  function hideOriginalSource() {
    if (isReplaced) return;
    isReplaced = true;

    // 1. 기존 head, body 안의 소스 태그들을 개발자 도구 트리에서 제거
    const head = document.head;
    const body = document.body;

    // 화면은 그대로 둔 채, DOM 트리 구조상에서만 "코드 훔치지 마"로 변경
    const fakeNode = document.createElement('div');
    fakeNode.id = 'protected-source';
    fakeNode.innerText = '코드 훔치지 마';
    fakeNode.style.cssText = 'font-size: 24px; color: red; font-weight: bold; padding: 20px;';

    // 기존 요소들을 Shadow DOM 뒤로 숨기거나 대체
    document.documentElement.innerHTML = '<html><head><title>Protected</title></head><body><h1 style="color:red; font-size: 40px; padding: 50px;">코드 훔치지 마</h1></body></html>';
  }

  // 감지용 게터 (우클릭 '검사' 또는 F12 진입 시 동작)
  const checkDevTools = () => {
    const tracker = new Image();
    Object.defineProperty(tracker, 'id', {
      get: function () {
        hideOriginalSource(); // 개발자 도구가 열리면 소스코드를 바꿈
      }
    });
    console.log('%c', tracker);
    console.clear();
  };

  setInterval(checkDevTools, 200);

  // 우클릭 및 단축키 차단
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault();
      hideOriginalSource();
    }
  });
})();
