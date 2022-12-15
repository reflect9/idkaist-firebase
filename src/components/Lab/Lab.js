import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import "./Lab.scss";
import Labs from "../../data/Labs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
function Lab({ labID }) {
    const { t, i18n, ready } = useTranslation();
    const [imageNum, setImageNum] = useState();
    const LabData = Labs[labID];
    const getRandomNumber = () => {
        return (Math.floor(Math.random() * 10));
    }
    let projectImages, projectImagesEl;
    if (LabData.lab_works) {
        projectImagesEl = LabData.lab_works.map((pi,pii)=>{
            let tag;
            if (pi.type=="image") {
                tag  = (<img className="projectImage" key={pii} onClick={()=>{setImageNum(pii);}} src={pi.source}/>);
            } else if(pi.type="YouTube") {
                tag = (<iframe width="1080" className="projectImage" key={pii} src={pi.source+"?vq=hd1080"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>);
            }
            return tag;
        });
    } else {
        projectImagesEl = [
        ];
    }
    // projectImagesEl.push(
    //     <div className="hidden-flex-item"></div>
    // )
    
    let labKeywords;
    if (typeof LabData.lab_keywords !== "undefined") {
        labKeywords = LabData.lab_keywords.map((k) => {
            return (<li key={k}>{k}</li>);
        });
    }

    return <div className="Lab">
        <div className="LabInfo">
            <div className="leftPanel">
                <div className="LabTitle">
                    {LabData.lab_long}
                </div>
                <div className="LabTitleShort">{LabData.lab}</div>
                <div className="description">{(i18n.language == "kr" && LabData.description_kr) ? LabData.description_kr : LabData.description_en}</div>
            </div>

            <div className="rightPanel">
                <h4>{t("Research.principal_investigator")}</h4>
                <div className="LabPI">
                    {i18n.language == "kr" ? LabData.name_kr : LabData.name_en}
                </div>
                <div className="email">
                    {LabData.email}
                </div>
                <h4>{t("Research.research_areas")}</h4>
                <div className="LabKeywords">
                    <ul>
                        {labKeywords}
                    </ul>
                </div>

                <h4>{t("Research.homepage")}</h4>
                <div className="LabLink">
                    <a href={LabData.lab_url} target="IDKAIST_LAB">{LabData.lab_url}</a>&nbsp;&nbsp;
                </div>
            </div>

        </div>
        <div className="projects">
            {projectImagesEl}
        </div>
        {(typeof imageNum !=="undefined") && (imageNum!=null) ? (
            <div className="imagePopup unselectable">
                <div className="leftArrow changeImageButton" onClick={()=>{
                    let newImageNum = imageNum-1; 
                    if (newImageNum<0) newImageNum = projectImagesEl.length-1;
                    setImageNum(newImageNum);
                    return false;
                }}><MdArrowBackIos/></div>
                <div className="rightArrow changeImageButton" onClick={()=>{
                    let newImageNum = imageNum+1; 
                    if (newImageNum==projectImagesEl.length) newImageNum = 0;
                    setImageNum(newImageNum);
                    return false;
                }}><MdArrowForwardIos /></div>
                <div className="closeButton" onClick={()=>{setImageNum(null);}}>
                    <AiOutlineCloseCircle/>
                </div>
                <div className="largeImageContainer"  onClick={()=>{setImageNum(null);}}>
                    {projectImagesEl[imageNum]}
                </div>
                {/* {<img src={projectImages[imageNum]} onClick={()=>{setImageNum(null);}}/>} */}
            </div>
        ):<div/>}
        
    </div>
}

export default Lab;