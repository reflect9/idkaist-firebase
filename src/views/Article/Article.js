import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import formatDate from '../../utils/FormatDate';
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import { checkAdmin, auth } from "../../data/firestore/auth";
import FetchArticle from "../../data/firestore/fetchArticle";
import "./Article.scss";
import { AutoScaling } from 'aws-sdk';

function Article() {
    const { articleID } = useParams();
    const [ art, setArticle ] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t } = useTranslation();
    const atypes = ["All", "Award", "Event", "News", "Notice", "Banner"];

    useEffect(()=>{
        FetchArticle(articleID, setArticle);
    },[articleID]);    

    if (art) {
        return (
            <div className="Article stretching">
                <div className="PageContentWrapper">
                    <div className="dropdownUI">
                        <div className="dd-header"  onClick={()=>{setIsDropdownOpen(!isDropdownOpen);}}>
                            <div className="dd-header-title">
                                {art.type}
                            </div>
                            <div className="dd-header-arrow">
                                {isDropdownOpen?<AiOutlineUp/>:<AiOutlineDown/>}
                            </div>
                        </div>
                        {isDropdownOpen
                            && (<ul className="dd-list">
                                {atypes.map((at)=>{
                                    return (<Link className={(art && (art.type.toLowerCase() === at.toLowerCase())) ? "active" : ""} 
                                        to={'/articleList/'+at}
                                        key={at}>
                                        <li>{t("ArticleList.Type."+at)}</li></Link>);
                                 })}
                            </ul>)
                        }
                    </div>
                    <div className="filterUI">
                        <ul>
                            {atypes.map((at)=>{
                                return (<Link className={(art && (art.type.toLowerCase() === at.toLowerCase())) ? "active" : ""} 
                                    to={'/articleList/'+at}
                                    key={at}>
                                    <li>{t("ArticleList.Type."+at)}</li></Link>);
                            })}
                        </ul>
                    </div>
                    {/* <div className="toList">
                        <Link to={'articleList/'+art.type.toLowerCase()}>{t("ArticleList.Type."+art.type)}</Link>
                    </div> */}
                    <div className="articleContainer">
                        <div className="datetime">{formatDate(art.datetime)}
                            {(auth && auth.currentUser)? <Link to={"/articleEditor/"+articleID}>EDIT</Link>: ""}
                        </div>
                        <div className="title">{art.title}</div>
                        <div className="coverImage">
                            <img src={art.coverImage}
                            style={{
                                    background: `url('${process.env.PUBLIC_URL}/images/giphy.gif')`,
                                    'backgroundRepeat': 'no-repeat'

                                }}
                            />
                        </div>
                        <div className="content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {art.text}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else  return <div>No Article </div>
    
}

export default Article;
