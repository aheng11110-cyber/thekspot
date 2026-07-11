// ============================================================
// Firebase Configuration
// ============================================================
// .env 파일에서 자동으로 값을 가져옵니다.
// .env.example 파일을 참고해서 .env 파일을 만드세요.
//
// 또는 아래 값을 직접 교체해도 됩니다.
// Firebase Console > Project Settings > General > Your apps
// CLI: npx -y firebase-tools@latest apps:sdkconfig <APP_ID>
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyvSO0XNpncoIl64eOlURToeVfXJFegzk",
  authDomain: "the-k-spot.firebaseapp.com",
  projectId: "the-k-spot",
  storageBucket: "the-k-spot.firebasestorage.app",
  messagingSenderId: "875738366187",
  appId: "1:875738366187:web:441f4cc6eae85a4db1beae",
  measurementId: "G-0J4MZVVQC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Firestore instance
export const db = getFirestore(app);

export default app;
