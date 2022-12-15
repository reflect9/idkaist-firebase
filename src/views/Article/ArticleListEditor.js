import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import formatDate from '../../utils/FormatDate';
import { BiSearch } from "react-icons/bi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import RetrieveArticles from "../../data/firestore/retrieveArticles";
import UpdateArticle from "../../data/firestore/updateArticle";
import "./ArticleList.scss";

const ArticleListEditor = () => {
    const { articleType } = useParams();
    const { t } = useTranslation();
    const [articles, setArticles] = useState([]);
    const [startPageNum, setStartPageNum] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const atypes = ["All", "Award", "Event", "News", "Notice", "Banner"];
    const pagesPerPagelist = 10;
    const articlesPerPage = 10;

    useEffect(() => {
        let allowedArticleTypes = (articleType=="All" || typeof articleType==="undefined")?["Award","Event","News","Notice","Banner"]:[articleType]; 
        RetrieveArticles(allowedArticleTypes, null, 1000, setArticles);
    },[articleType]);

    useEffect(()=> {
        // console.log(articles);
        // console.log(Math.ceil(articles.length / articlesPerPage));
        // 페이지UI 업데이트
        setPageNum(0);  
        setTotalPages(Math.ceil(articles.length / articlesPerPage));
    },[articles]);

    const setVisibility = (articleID, newValue)=>{
        // 아티클에 deleted항목을 true로 만든다 
        const instantFeedback = UpdateArticle(articleID, 
            {
                "isVisible": newValue
            },
            ()=>{
                let allowedArticleTypes = (articleType=="All" || typeof articleType==="undefined")?["Award","Event","News","Notice","Banner"]:[articleType]; 
                RetrieveArticles(allowedArticleTypes, null, 500, setArticles)
            }
        );
    }
    const typeLinks = atypes.map( (at) => {
        return (<Link className={articleType == at ? "active" : ""} key={at}
            to={'/articleListEditor/'+at}>
            <li key={at}>{t("ArticleList.Type."+at)}</li></Link>);
    });                 
    return (
        <div className="ArticleList">
            <div className="PageContentWrapper">
                <div className="filterUI">
                    <ul>
                        {typeLinks}
                    </ul>
                </div>
                <div className="articleContainer">
                    <div className="topbar">
                        <h2>{articleType}</h2>
                        <Link to="/articleEditor"><button className="new_article">새 글 쓰기</button></Link>
                        <div className="searchUI">    
                            <input type="text" className="input" placeholder="Search" disabled/>
                            <button type="submit">
                                <BiSearch />
                            </button>
                        </div>
                    </div>

                    <ul>
                        {(articles.length>0) ? articles
                        .slice(pageNum*articlesPerPage,((pageNum+1)*articlesPerPage))
                        .map((art) => {
                            // console.log(art.data());
                            return (<li key={art.id}>
                                <div className="type">{art.data().type}</div>
                                <Link to={'/article/'+art.id}>
                                    <div className={art.data().isVisible ? "title":"title invisible"}>{art.data().title} 
                                    {art.data().featured ? (<span className="featured_mark">FEATURED</span>):""}
                                    </div>    
                                </Link>
                                <div className="datetime">{formatDate(art.data().datetime)}</div>
                                <div className="tools">
                                    <Link to={"/articleEditor/"+art.id}><AiFillEdit /></Link>
                                    {
                                        art.data().isVisible ? 
                                            (<MdVisibility onClick={()=>{setVisibility(art.id, false)}} title="클릭시 아티클을 비활성화"/>)
                                            :
                                            (<MdVisibilityOff  onClick={()=>{setVisibility(art.id, true)}} title="클릭시 아티클을 활성화"/>)
                                    }
                                </div>
                            </li>);
                        }) : <div>{t("ArticleList.NoArticleMsg")}</div>}
                    </ul>

                    <ul className="pagination">
                        <li onClick={()=>{ 
                            const prevStartPageNum = Math.max(startPageNum-pagesPerPagelist, 0);
                            setPageNum(prevStartPageNum);
                            setStartPageNum(prevStartPageNum);
                        }}> <FiChevronLeft/> </li>
                        { _.range(startPageNum, Math.min(startPageNum+pagesPerPagelist,totalPages)).map((p)=>{
                            return (<li 
                                className={p==pageNum?"active":""}
                                onClick={()=>{setPageNum(p);}}
                            >{p+1}</li>);
                        })}
                        <li onClick={()=>{ 
                            const nextStartPageNum = Math.min(startPageNum+pagesPerPagelist, Math.max(0, totalPages-pagesPerPagelist));
                            setPageNum(nextStartPageNum);
                            setStartPageNum(nextStartPageNum);
                        }}> <FiChevronRight/> </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ArticleListEditor;
