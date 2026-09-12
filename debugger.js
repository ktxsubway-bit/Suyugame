(function() {
    let devToolsOpen = false;
    let originalBodyContent = null;
    let overlayElement = null;

    // 1. 차단 오버레이 생성 함수
    function createOverlay() {
        if (overlayElement) return;
        overlayElement = document.createElement('div');
        overlayElement.id = 'security-overlay';
        overlayElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: none;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-weight: bold;
            color: red;
            background-color: black;
            user-select: none;
            z-index: 999999;
        `;
        overlayElement.innerText = '접근이 거부되었습니다.';
        document.body.appendChild(overlayElement);
    }

    // 2. 보안 조치 활성화 (개발자 도구 열림)
    function triggerSecurityAction() {
        if (devToolsOpen) return;
        devToolsOpen = true;

        console.error(
            "%c불법 복제는 당신을 감옥으로 이끕니다.",
            "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
        );

        if (!overlayElement) createOverlay();
        if (overlayElement) overlayElement.style.display = 'flex';
    }

    // 3. 보안 조치 해제 (개발자 도구 닫힘)
    function restoreNormalState() {
        if (!devToolsOpen) return;
        devToolsOpen = false;

        if (overlayElement) {
            overlayElement.style.display = 'none';
        }
    }

    // 4. 시간차 기반 개발자 도구 열림/닫힘 감지
    function checkDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        // 디버거에서 걸린 시간이 100ms 초과면 개발자 도구가 열려있는 상태
        if (endTime - startTime > 100) {
            triggerSecurityAction();
        } else {
            restoreNormalState();
        }
    }

    // 5. 키보드 단축키 차단 로직
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

    // 문서 로드 완료 후 오버레이 생성 및 주기적 체크 시작
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createOverlay);
    } else {
        createOverlay();
    }

    setInterval(checkDevTools, 500);
})();
