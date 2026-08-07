(function() {
  function preventDebug() {
    try {
      // 개발자 도구가 열렸을 때 경고 메시지 출력
      console.log(
        "%c불법 복제는 당신을 감옥으로 이끕니다.", 
        "color: red; font-size: 20px; font-weight: bold; background-color: black; padding: 10px; border-radius: 5px;"
      );

      // 디버거 강제 실행
      (function() {
        return false;
      }
      ["constructor"]("debugger")
      ["call"]());
    } catch (err) {
      // 에러 발생 시 예외 처리
    }
  }
  // 50ms마다 감시 및 콘솔 출력 실행
  setInterval(preventDebug, 50);
})();
