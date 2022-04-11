import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// const key = JSON.parse(process.env.REACT_APP_FIREBASE_KEY || '{}');
// const app = initializeApp(key);
// const analytics = getAnalytics(app);

const firebaseConfig = JSON.parse(
  process?.env?.REACT_APP_FIREBASE_KEY ?? '{}',
);

let analytics: any;
let storage: any;
let auth: any;

if (firebaseConfig?.projectId) {
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage, analytics };
