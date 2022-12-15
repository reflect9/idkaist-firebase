import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import firebaseConfig from "./auth";


function UpdateArticle(articleID, propertiesToUpdate, callback) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const docRef = doc(db, "articles", articleID); // Creating reference to the new/existing document
    // UPDATING SINGLE ARTICLE
    (async () => {
        updateDoc(docRef, propertiesToUpdate)
        .then(docRef =>{
            if(callback) callback("Success");
        })
        .catch(error => {
            if(callback) callback("Failed:"+error);
        });
    })();
    return "Updating Article";
}
export default UpdateArticle;