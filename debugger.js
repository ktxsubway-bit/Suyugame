(function() {
    let devToolsOpen = false;

    function printWarning() {
        // 개발자 도구가 감지되었을 때만 경고를 출력합니다. (console.clear 제거)
        if (devToolsOpen) {
            console.log(
                "%c불법 복제는 당신을 감옥으로 이끕니다.",
                "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
            );
        }
    }

    function detectDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        if (endTime - startTime > 100) {
            // 이미 감지되었다면 중복 실행 방지
            if (devToolsOpen) return; 
            
            devToolsOpen = true;
            
            // 1. 화면 차단
            document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%;'>접근이 거부되었습니다.</h1>";
            
            // 2. 콘솔 경고 출력
            printWarning(); 
            
            // 3. 미세한 시차를 두고 스크립트 중단 (로그 출력 보장)
            setTimeout(() => {
                throw new Error("Script execution stopped by security policy.");
            }, 10);
        }
    }

    // 1초마다 개발자 도구 열림 감시
    setInterval(detectDevTools, 1000);
})();
