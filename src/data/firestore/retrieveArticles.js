import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, orderBy, Direction, query, getDocs, doc, limit, deleteDoc, where} from "firebase/firestore";
import { db } from "../../data/firestore/auth";

export const RetrieveArticles = (allowedArticleTypes, isFeatured, doclimit, callback) => {
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
    })();
    return (
        <div>Retrieving Articles</div>
    )
}

export const RetrieveArticlesWithinDatetime = (allowedArticleTypes, isFeatured, doclimit, datetime, datetimeEnd, callback) => {
    (async () => {
        const articlesRef = collection(db, "articles");
        let querySnapshot;
        if(isFeatured != null) {
            if(datetimeEnd != null) {
                querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
                , where("featured", "==", isFeatured), where("datetime", ">=", datetime), where("datetime", "<=", datetimeEnd)
                , orderBy('datetime', 'desc'), limit(doclimit)));    
                callback(querySnapshot.docs);    
            } else {
                querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
                , where("featured", "==", isFeatured), where("datetime", ">=", datetime)
                , orderBy('datetime', 'desc'), limit(doclimit)));    
                callback(querySnapshot.docs);    
            }
            
        } else {
            if(datetimeEnd != null) {
                querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
                , where("datetime", ">=", datetime), where("datetime", "<=", datetimeEnd)
                , orderBy('datetime', 'desc'), limit(doclimit)));    
                callback(querySnapshot.docs);    
            } else {
                querySnapshot = await getDocs(query(articlesRef, where("type", "in", allowedArticleTypes)
                , where("datetime", ">=", datetime)
                , orderBy('datetime', 'desc'), limit(doclimit)));    
                callback(querySnapshot.docs);    
            }
        }
    })();
    return (
        <div>Retrieving Articles</div>
    )
}