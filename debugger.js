(function() {
    let devToolsOpen = false;

    // 1. 경고 및 화면 차단 공통 처리 함수
    function triggerSecurityAction() {
        if (devToolsOpen) return; 
        devToolsOpen = true;

        // 콘솔 에러 출력
        console.error(
            "%c불법 복제는 당신을 감옥으로 이끕니다.",
            "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
        );

        // 시차를 두고 화면 차단 및 스크립트 중단
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    font-size: 24px; 
                    font-weight: bold; 
                    color: red; 
                    background-color: black;
                    user-select: none;
                    margin: 0;
                ">
                    접근이 거부되었습니다. 불법 복제는 당신을 감옥으로 이끕니다.
                </div>
            `;
            throw new Error("Script execution stopped by security policy.");
        }, 50);
    }

    // 2. 무한 디버거 루프 생성 함수 (재귀 호출 구조)
    function antiDebugging(index) {
        // 숫자가 계속 변경되는 함수 구조를 만들어 분석을 방해합니다.
        if (String(index / index).length !== 1 || index % 20 === 0) {
            (function() {}.constructor("debugger")());
        } else {
            (function() {}.constructor("debugger")());
        }
        // 연속적으로 재귀 호출을 수행하여 디버거를 유지합니다.
        antiDebugging(++index);
    }

    // 3. 기존 시간차 기반 개발자 도구 오픈 감지 로직
    function detectDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        if (endTime - startTime > 100) {
            triggerSecurityAction();
            
            // 개발자 도구가 감지되면 무한 디버거 루프를 발동시킵니다.
            try {
                antiDebugging(0);
            } catch (e) {
                // 루프 중 발생할 수 있는 에러 제어
            }
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
            
            // 단축키 입력 즉시 무한 루프 발동
            try { antiDebugging(0); } catch (e) {}
        }
    });

    // 페이지 로드 직후 및 주기적으로 디버거 체크 실행
    detectDevTools();
    setInterval(detectDevTools, 500); // 감지 주기를 0.5초로 단축
})();
