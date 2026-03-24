import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAjPAJ_Q0mVikWCEnktYTdQV5Rmf7RLHpY",
  authDomain: "time-with-me-745b5.firebaseapp.com",
  projectId: "time-with-me-745b5",
  storageBucket: "time-with-me-745b5.firebasestorage.app",
  messagingSenderId: "313950885061",
  appId: "1:313950885061:web:4df95d01000f0ce85eccac",
  measurementId: "G-QKXFVH3C7N"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { app, analytics }
