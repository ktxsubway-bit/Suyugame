const admin = require('firebase-admin');

// 환경 변수에서 서비스 계정 JSON 로드
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 6자리 랜덤 OTP 생성 (예: 049215)
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function updateOtp() {
  try {
    const newOtp = generateOtp();
    
    // Firestore system/current_otp 문서 업데이트
    await db.collection('system').doc('current_otp').set({
      code: newOtp,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[성공] 새 OTP가 생성되어 파이어베이스에 저장되었습니다: ${newOtp}`);
  } catch (error) {
    console.error('[오류] OTP 업데이트 실패:', error);
    process.exit(1);
  }
}

updateOtp();
