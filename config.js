// config.js

// window 객체에 직접 등록하여 모든 스크립트 및 HTML에서 접근 가능하도록 변경
window.CONFIG = {
    ADMIN_PASSWORD: "ilikesuyu",
    // OTP_SECRET: "QGNJGFTDCKLPDSER" 16자리 이상의 Base32 시크릿 키
};

// 기존 코드와의 호환성을 위한 하위 선언 (선택 사항)
const CONFIG = window.CONFIG;
