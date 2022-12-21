import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {db} from "./auth";


function UploadArticle(articleID, articleData, callback) {
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    // const db = getFirestore(app);
    const docRef = doc(db, "articles", articleID); // Creating reference to the new/existing document
    // UPDATING SINGLE ARTICLE
    (async () => {
        setDoc(docRef, articleData)
        .then(docRef =>{
            callback("Success");
        })
        .catch(error => {
            callback("Failed:"+error);
        });
    })();
    return "Uploading Article";
}
export default UploadArticle;