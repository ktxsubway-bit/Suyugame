const admin = require('firebase-admin');

// 1. 환경 변수 검증
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('[오류] FIREBASE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (error) {
  console.error('[오류] Secrets의 JSON 형식이 올바르지 않습니다:', error.message);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function updateOtp() {
  try {
    const newOtp = generateOtp();
    
    await db.collection('system').doc('current_otp').set({
      code: newOtp,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[성공] 새 OTP가 생성되어 파이어베이스에 저장되었습니다`);
    
    // 2. 작업 성공 후 명시적 프로세스 종료 (필수)
    process.exit(0);
  } catch (error) {
    console.error('[오류] OTP 업데이트 실패:', error);
    process.exit(1);
  }
}

updateOtp();
