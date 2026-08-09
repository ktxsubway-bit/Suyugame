(function() {
  function preventDebug() {
    try {
      // 디버거 구문 실행 시점의 시간을 측정하여 디버깅 여부 감지
      const startTime = performance.now();
      
      (function() {
        return false;
      }
      ["constructor"]("debugger")
      ["call"]());
      
      const endTime = performance.now();
      
      // 디버거가 활성화되어 실행이 일시 정지되면 시간 차이가 크게 발생함 (예: 100ms 이상)
      if (endTime - startTime > 100) {
        triggerWarning();
      }
    } catch (err) {
      // 에러 발생 시 예외 처리
    }
  }

  function triggerWarning() {
    // 1. 콘솔에 검은 배경, 빨간 큰 글씨로 경고 메시지 출력
    const message = "불법 복제는 당신을 감방에 쳐넣습니다.";
    const style = "background-color: black; color: red; font-size: 30px; font-weight: bold; padding: 10px; border: 2px solid red;";
    console.log(`%c${message}`, style);

    // 2. 무한 루프를 유발하여 브라우저 탭의 스크립트 실행을 사실상 정지 (먹통 상태 전환)
    while (true) {
      (function() {
        return false;
      }
      ["constructor"]("debugger")
      ["call"]());
    }
  }

  // 50ms마다 디버거 실행 여부 감시
  setInterval(preventDebug, 50);
})();
