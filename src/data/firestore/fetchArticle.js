import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, where } from "firebase/firestore";
import { db } from "./auth";

function FetchArticle(docID, callback) {
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    // const db = getFirestore(app);
    const docRef = doc(db, "articles", docID);
    // READ SINGLE ARTICLE
    (async () => {
        getDoc(docRef)
        .then((snapshot)=>{
            // console.log(snapshot.data().text);
            callback(snapshot.data());
        });
    })();
    return (
        <div>Fetching Article</div>
    )
}
export default FetchArticle;