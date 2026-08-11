(function() {
    let devToolsOpen = false;

    function printWarning() {
    // console.log 대신 console.error 사용 (글자색 지정을 위해 %c 유지)
    console.error(
        "%c불법 복제는 당신을 감옥으로 이끕니다.",
        "color: red; font-size: 30px; font-weight: bold; background-color: black; padding: 10px;"
    );
}


    function detectDevTools() {
        const startTime = Date.now();
        debugger; 
        const endTime = Date.now();

        if (endTime - startTime > 100) {
            if (devToolsOpen) return; 
            devToolsOpen = true;
            
            // [수정] 콘솔 경고를 가장 먼저 확실하게 출력합니다.
            printWarning(); 
            
            // [수정] 화면 차단 및 스크립트 중단은 콘솔이 찍힌 후 시차를 두고 실행합니다.
            setTimeout(() => {
                document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%;'>접근이 거부되었습니다.</h1>";
                throw new Error("Script execution stopped by security policy.");
            }, 50);
        }
    }

    setInterval(detectDevTools, 1000);
})();
