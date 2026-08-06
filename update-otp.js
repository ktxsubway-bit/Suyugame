const admin = require('firebase-admin');

// GitHub Secrets에서 가져온 파이어베이스 서비스 계정 키 파싱
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function generateAndSaveOTP() {
  // 6자리 랜덤 숫자 생성
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Firestore의 'system/current_otp' 문서에 저장
  await db.collection('system').doc('current_otp').set({
    code: newOtp,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`[성공] 새로운 OTP 번호가 생성되어 저장되었습니다: ${newOtp}`);
}

generateAndSaveOTP().catch((err) => {
  console.error("OTP 생성/저장 실패:", err);
  process.exit(1);
});
