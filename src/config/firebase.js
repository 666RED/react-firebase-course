import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCxPLDCru7jZiQGsP-FzbFPixGlJzDJt24",
	authDomain: "fir-course-25775.firebaseapp.com",
	projectId: "fir-course-25775",
	storageBucket: "fir-course-25775.appspot.com",
	messagingSenderId: "70804823713",
	appId: "1:70804823713:web:b20a3918fc71dfc2badae0",
	measurementId: "G-FFDZVDQGGW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
// use this only when you deploy the application & many user using it
