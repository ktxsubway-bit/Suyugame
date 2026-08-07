// appCheck.js

// 1. Firebase SDK 모듈 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 2. Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyA9CfIdZ0DNkvUdOk3-GlMlHV_FbAFNnGk",
  authDomain: "hasi-game.firebaseapp.com",
  databaseURL: "https://hasi-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hasi-game",
  storageBucket: "hasi-game.firebasestorage.app",
  messagingSenderId: "48274416774",
  appId: "1:48274416774:web:c15811462fc618ebdd9d07",
  measurementId: "G-FT9MYSD4GW"
};

// 3. 앱 및 App Check 초기화
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcHlnktAAAAAEIp8Fnj-J1x8dPIoSgdVtkCDEmf'), // reCAPTCHA v3 사이트 키 입력
  isTokenAutoRefreshEnabled: true
});

// 4. Realtime Database 연결
const db = getDatabase(app);

// 5. 공지사항 수정 함수
export async function updateNotice(title, content) {
  try {
    await update(ref(db, 'notice'), {
      title: title,
      content: content,
      updatedAt: new Date().toISOString()
    });
    alert("공지사항이 성공적으로 수정되었습니다!");
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정 실패: 허용되지 않은 도메인이거나 보안 정책에 의해 차단되었습니다.");
  }
}

// HTML inline 이벤트(onclick 등) 지원용 전역 연결
window.updateNotice = updateNotice;
