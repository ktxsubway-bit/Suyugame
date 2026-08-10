(function () {
    // 1. 변수 전체를 즉시 실행 함수 안으로 숨깁니다.
    const CONFIG = {
        'ADMIN_PASSWORD': 'ilikesuyu',
        'OTP_SECRET': 'QGNJGFTDCKLPDSER'
    };
    
    // 2. 외부(HTML 등)에서 가져다 쓸 수 있도록 globalThis(window)에 등록합니다.
    globalThis['CONFIG'] = CONFIG;
})();
