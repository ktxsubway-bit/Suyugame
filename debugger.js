(function() {
    let devToolsOpen = false;

    // 1. 보안 동작 처리 (콘솔 경고 출력만 수행)
    function triggerSecurityAction() {
        if (devToolsOpen) return;
        devToolsOpen = true;

        // 콘솔 에러 출력
        console.error(
            "%c불법 복제는 당신을 감옥으로 이끕니다.",
            "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
        );
    }

    // 2. 개발자 도구 닫힘 상태 복구
    function restoreNormalState() {
        if (!devToolsOpen) return;
        devToolsOpen = false;
    }

    // 3. 시간차 기반 개발자 도구 열림/닫힘 감지
    function checkDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        // 디버거 동작 시 걸린 시간이 100ms 초과면 개발자 도구가 열려있는 상태
        if (endTime - startTime > 100) {
            triggerSecurityAction();
        } else {
            restoreNormalState();
        }
    }

    // 4. 키보드 단축키 차단 로직 (F12, Ctrl+Shift+I/J, Ctrl+U)
    window.addEventListener('keydown', function(event) {
        const isCtrl = event.ctrlKey || event.metaKey;
        const isShift = event.shiftKey;

        if (
            event.key === 'F12' || event.keyCode === 123 ||
            (isCtrl && isShift && (event.key === 'I' || event.key === 'i' || event.keyCode === 73)) ||
            (isCtrl && isShift && (event.key === 'J' || event.key === 'j' || event.keyCode === 74)) ||
            (isCtrl && (event.key === 'U' || event.key === 'u' || event.keyCode === 85))
        ) {
            event.preventDefault();
            triggerSecurityAction();
        }
    });

    // 주기적으로 디버거 및 개발자 도구 상태 체크 (0.5초 간격)
    setInterval(checkDevTools, 500);
})();
