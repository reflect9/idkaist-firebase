import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, orderBy, Direction, query, getDocs, doc, limit, deleteDoc, where} from "firebase/firestore";
import { db } from "../../data/firestore/auth";

function RetrieveArticles(allowedArticleTypes, isFeatured, doclimit, callback) {
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    // const db = getFirestore(app);
    // READ ARTICLES MATCHING WITH articleType
    (async () => {
        const articlesRef = collection(db, "articles");
        let querySnapshot;
        if(isFeatured != null) {
            querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
            , where("featured", "==", isFeatured), orderBy('datetime', 'desc'), limit(doclimit)));    
            callback(querySnapshot.docs);    
        } else {
            querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
            , orderBy('datetime', 'desc'), limit(doclimit)));    
            callback(querySnapshot.docs);    
        }
        // querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
        //     , where("featured", "in", allowedFeaturedFlags), orderBy('datetime', 'desc'), limit(doclimit)));    
        // callback(querySnapshot.docs);
            // } else {
        //     querySnapshot = await getDocs(query(articlesRef, orderBy('datetime', 'desc'), where("featured","==", isFeatured), limit(doclimit)));
        // }
        // console.log(articleType);
        // if(articleType=="" || articleType=="All" || typeof articleType === "undefined") callback(querySnapshot.docs);
        // else {
        //     let filteredSnapshot = querySnapshot.docs.filter(d=>{
        //         console.log(d.data().type.toLowerCase() + " ?= "+ articleType.toLowerCase());
        //         return d.data().type.toLowerCase()==articleType.toLowerCase();
        //     }); 
        //     callback(filteredSnapshot);
        // }
    })();
    return (
        <div>Retrieving Articles</div>
    )
}
export default RetrieveArticles;
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries