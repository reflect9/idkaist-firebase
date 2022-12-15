import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/firestore";
import {ref, getStorage, uploadBytes} from "firebase/storage";
import firebaseConfig from "data/firestore/auth";

function handleUpload() {
    if (!file) {
        alert("Please choose a file first!")
    }
}

function UploadImage(file, callback) {
    const app = initializeApp(firebaseConfig);
    // 화일업로드 (https://firebase.google.com/docs/storage/web/upload-files)
    const storage = getStorage();
    const imageRef = ref(storage, "image");

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg',
    };

    uploadBytes(imageRef, file, metadata).then((snapshot) => {
        console.log("Uploaded a file!");
    });


    return (
        <div>Uplading Image</div>
    )
}

export default UploadImage;