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
                    불법 복제는 당신을 감방으로 이끕니다.
                </div>
            `;
            throw new Error("Script execution stopped by security policy.");
        }, 50);
    }

    // 2. 기존 debugger 기반 개발자 도구 오픈 감지 로직
    function detectDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        if (endTime - startTime > 100) {
            triggerSecurityAction();
        }
    }

    // 3. 키보드 단축키 차단 로직 (F12, Ctrl+Shift+I/J, Ctrl+U)
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

    // 4. 마우스 우클릭(컨텍스트 메뉴) 차단 로직
    window.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        triggerSecurityAction();
    });

    // 주기적으로 디버거 체크 실행
    setInterval(detectDevTools, 1000);
})();
