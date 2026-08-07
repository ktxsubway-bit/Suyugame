// appCheck.js

// 1. Firebase v11 SDK 모듈 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app-check.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

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
  provider: new ReCaptchaV3Provider('발급받은_사이트_키'), // reCAPTCHA v3 사이트 키 입력
  isTokenAutoRefreshEnabled: true
});

// 4. Firestore 연결
const db = getFirestore(app);

// 5. 공지사항 수정 함수
export async function updateNotice(title, content) {
  try {
    // 캡처 화면의 경로에 맞춘 Firestore 문서 Reference
    const noticeRef = doc(
      db, 
      "artifacts", "default-app-id", 
      "public", "data", 
      "config", "main_notice"
    );

    // 공지사항 업데이트
    await updateDoc(noticeRef, {
      title: title,
      content: content,
      updatedAt: new Date()
    });

    alert("공지사항이 성공적으로 수정되었습니다!");
  } catch (error) {
    console.error("수정 실패:", error);
    alert("수정 실패: suyugame.kro.kr 도메인이 아니거나 보안 정책에 의해 차단되었습니다.");
  }
}

// HTML inline 이벤트(onclick 등)에서 호출 가능하도록 window 전역 객체에 연결
window.updateNotice = updateNotice;
