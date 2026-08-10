(function() {
    // 콘솔창에 강제 경고 문구 출력 (지워지지 않도록 주기적 설정)
    function printWarning() {
        console.clear();
        console.log(
            "%c불법 복제는 당신을 감옥으로 이끕니다.", 
            "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
        );
    }

    // 개발자 도구 유저가 무언가를 분석하려고 하면 무한 디버거를 걸어 스크립트를 마비시킵니다.
    function detectDevTools() {
        const startTime = new Date().getTime();
        
        // 이 구문은 F12가 열려있을 때만 브라우저를 멈추게 합니다.
        debugger; 
        
        const endTime = new Date().getTime();
        
        // debugger 작동으로 인해 시간 지연이 발생했다면 F12가 열린 것으로 판단
        if (endTime - startTime > 100) {
            printWarning();
            
            // 모든 페이지 요소를 지우고 스크립트 실행 흐름을 완전히 파괴합니다.
            document.body.innerHTML = "<h1>접근이 거부되었습니다.</h1>";
            throw new Error("Script execution stopped by security policy.");
        }
    }

    // 주기적으로 감시 및 경고 출력
    setInterval(detectDevTools, 500);
    setInterval(printWarning, 1000);
})();
