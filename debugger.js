(function() {
  function preventDebug() {
    try {
      (function() {
        return false;
      }
      ["constructor"]("debugger")
      ["call"]());
    } catch (err) {
      // 에러 발생 시 예외 처리
    }
  }
  // 50ms마다 디버거 실행 여부 감시
  setInterval(preventDebug, 50);
})();
