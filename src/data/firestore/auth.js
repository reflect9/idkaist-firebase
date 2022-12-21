import _ from "lodash";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBIRz1PMlAIuwHvRJpk-QeeteiQWHc3iGE",
    authDomain: "idkaist-9dc43.firebaseapp.com",
    projectId: "idkaist-9dc43",
    storageBucket: "idkaist-9dc43.appspot.com",
    messagingSenderId: "751680666470",
    appId: "1:751680666470:web:c82980030469c256d6a6a7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

