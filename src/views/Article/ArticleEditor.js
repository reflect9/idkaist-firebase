import _ from "lodash";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Menu from '../../components/Menu/Menu.js';
import PageHeader from '../../components/Page/PageHeader.js';
import formatDate from '../../utils/FormatDate';
import MDEditor from '@uiw/react-md-editor';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { initializeApp } from "firebase/app";
import { app, firebaseConfig, storage } from "../../data/firestore/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import FetchArticle from "../../data/firestore/fetchArticle";
import UploadArticle from "../../data/firestore/uploadArticle";
import UploadImageS3 from "../../data/firestore/UploadImageS3";
import { v4 } from 'uuid';

import "./ArticleEditor.scss";


function ArticleEditor() {
    let { articleIDparam } = useParams();
    const [articleID, setArticleID] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [progressPercent, setProgresspercent] = useState(null);
    const [uploadedImages, setUploadedImages] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleDatetime, setArticleDatetime] = useState(new Date());
    const [articleDatetimeEnd, setArticleDatetimeEnd] = useState(null);
    const [articleType, setArticleType] = useState("Award");
    const [articleCoverImage, setArticleCoverImage] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [mdValue, setMdValue] = React.useState("**Hello world!!!**");
    const atypes = {
        "Award":"디자인 어워드나 논문 수상 소식 (Home의 Featured와 Highlight영역에 표시)", 
        "Event":"학과 행사나 이벤트 (Home의 Featured와 Highlight영역에 표시)", 
        "News":"디자인/연구 결과 및 미디어 자료 (Home의 Featured와 Highlight영역에 표시)", 
        "Notice":"공지사항. (Home의 두번째 페이지에 수록됨)", 
        "Banner":"이미지 배너. (Home의 두번째 페이지 왼편에 큰 이미지로 보여짐; 세로가 긴 이미지가 적당)"
    };


    useEffect(()=>{
        if(typeof articleIDparam !== "undefined" && articleIDparam.length>0) {
            console.log("Fetching Article "+ articleIDparam);
            setArticleID(articleIDparam);
            FetchArticle(articleIDparam, (art)=>{
                // Setting the article properties
                setArticleTitle(art.title);
                setArticleDatetime(art.datetime.toDate());
                if(art.datetimeEnd) {
                    setArticleDatetimeEnd(art.datetimeEnd.toDate());
                }
                setArticleType(art.type);
                setArticleCoverImage(art.coverImage);
                setMdValue(art.text);
                setIsFeatured(art.featured);
            });
        } else {
            setArticleID(v4());
            console.log("New Article: "+ articleID);
        }
    },[]);    
    
    const uploadImage = () => {
        if (imageUpload == null) return;
        // const app = initializeApp(firebaseConfig);
        // const storage = getStorage();
        const filePath = "images/" + imageUpload.name + v4();
        const imageRef = ref(storage, filePath);
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot. totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setUploadedImages(downloadURL);
                });
            }
        )

        // uploadBytes(imageRef, imageUpload).then(() => {
        //     const uri = imageRef.getDownloadUrl();
        //     console.log(uri);
        //     setUploadedImages(uri);
        // });
    };
    const uploadMD = () => {
        const feedbackHolder = document.querySelector("#uploadMDFeedback");
        const callback = (msg)=>{
            feedbackHolder.innerHTML = msg;
        };
        let data = {
            "title":articleTitle,
            "type":articleType,
            "coverImage":articleCoverImage,
            "text":mdValue,
            "featured":isFeatured,
            "datetime": Timestamp.fromDate(articleDatetime),
            "isVisible": true
        };
        if (articleDatetimeEnd) {
            data["datetimeEnd"] = Timestamp.fromDate(articleDatetimeEnd);
        }
        const instantFeedback = UploadArticle(articleID, data, callback);
        callback(instantFeedback);
    }

    return (<div className="ArticleEditor">
        <div className="PageContentWrapper">
            <div className="markdownUI">
                <Link to="/articleListEditor/All">Back to Article List</Link> &nbsp;&nbsp;
                <Link to={"/article/"+articleIDparam}>Back to Article</Link>

                <label>Article Type</label>
                <ul className="typeSelector">
                    {_.map(atypes, (at,ati) => {
                        return (
                            <li key={ati}>
                                <input type="radio" id={ati} name="articleType" 
                                    onChange={()=>{setArticleType(ati);}}
                                    checked={(ati==articleType)?true:false}></input>
                                <span> <b>{ati}</b>: {at}
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <label>Article Title</label>
                <input type="text" id="articleTitle" onChange={(e)=>{setArticleTitle(e.target.value);}} value={articleTitle}/>
                <div className="uiColumn">
                    <label>Start Date</label>
                    <DatePicker selected={articleDatetime} onChange={(date)=>{setArticleDatetime(date)}}/>
                </div>
                <div className="uiColumn">
                    <label>(Optional) End Date</label>
                    <DatePicker selected={articleDatetimeEnd} onChange={(date)=>{setArticleDatetimeEnd(date)}}/>
                </div>
                <label>Markdown Text</label>
                <div className="container">
                    <MDEditor
                        value={mdValue}
                        onChange={setMdValue}
                        height={500}
                    />
                    {/* <MDEditor.Markdown source={mdValue} style={{ whiteSpace: 'pre-wrap' }} /> */}
                </div>

                <label>Cover Image URI </label>
                <input type="text" id="coverImage" onChange={(e)=>{setArticleCoverImage(e.target.value);}} value={articleCoverImage}/>
                <div className="instruction">
                    커버 이미지는 각 아티클의 내용을 미리보기 하는 용도로 쓰임. 사이즈 제한은 없으나 가로로 긴 landscap (3:4 - 6:15)이 적당
                    아래 Image File Upload기능을 사용해서 업로드하고, 업로드후 표시되는 URL을 입력창에 복붙할것.  
                </div>

                
                <label>Is Featured? (Featured는 Home의 첫 페이지에 표시; Notice나 Banner는 해당사항 없음)</label> 
                <input type="checkbox" onChange={(event)=>{
                    setIsFeatured(event.target.checked);
                }} checked={isFeatured}></input>


                <div className="saveButtonWrapper">
                    <button onClick={()=>{setMdValue("")}} >Reset</button>
                    <button onClick={uploadMD} >Save</button>
                    <div id="uploadMDFeedback"></div>
                </div>
            </div>
            <div className="imageUploadUI">
                <label>Image File Upload</label>
                {/* <input
                    type="file"
                    onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                    }}
                /> */}
                {/* <button onClick={uploadImage}>Upload Image</button>  */}
                <UploadImageS3/>
                <div className="instruction">
                    이미지를 선택해서 S3에 업로드하면 아래에 URL이 하나 표시되는데, 그것을 복사해서 본문이나 Cover Image URI창에 붙여넣으면 됩니다.
                    <br/>본문에 넣을 때는 <code>![아무텍스트](이미지URL)</code>의 형식을 지켜야 함. 
                </div>
                <span> {progressPercent} </span>
                <div className="uploadedImages">
                    {uploadedImages}
                </div>
            </div>

        </div>

    </div>)
}

export default ArticleEditor;
