import React, { Component, useState } from 'react';
import { useTranslation } from "react-i18next";
import ReactDOM from 'react-dom';
import "./Grid.scss";


let Grid = ({ }) => {
    // 한/영 변환 모듈 초기화
	const { t, i18n, ready } = useTranslation();
	const changeLanguage = (m) => {
		i18n.changeLanguage(m);
	}
    let fetchItems = (num) => { 
        let items = [];
        for(var i=0; i<num; i++) {
            let bgURL = '/works/works'+(i+1)+'.png';
            const imgStyle = {
                backgroundImage:`url(${process.env.PUBLIC_URL+ bgURL})`
            }
            items.push(<li key={"li"+i}>
                {/* <img /> */}
                {/* <img src={ require('/assets/works/work'+i+".png")}/> */}
                <div className="thumbnailImage" style={imgStyle}></div>
                <div className="info">
                    <div className="kind">
                        AWARD
                    </div>
                    <div className="title">
                        <span className="highlight">Lee’s Design Team Wins Red Dot Design Award</span>
                    </div>
                    <div className="description">
                        <span className="highlight">우리 대학 이상수 산업디자인학과 교수가 이끄는 디자인팀이 ʻ레드닷 디자인 어워드(Red Dot Design Award) 2021ʼ의 브랜드&커뮤니케이션 부문에서 2개의 본상(Winner)을 수상했다. 
레드닷 디자인 어워드는 iF 디자인어워드와 함께 세계 최고 권위의 디자인상으로 꼽히며, 지난 4월에 제품 디자인 수상작을 발표한 데 이어 최근 브랜드&커뮤니케이션 부문 입상작을 발표했다. 
이 교수 연구팀의 첫 번째 수상작인 ʻ얼라인(ALINE)’은 새로운 개념의 투자를 돕는 모바일 애플리케이션 솔루션이다. 최근 화두로 떠오르고 있는 사회적 책임 투자(ESG)를 기반으로 기존의 수익률 중심의 투자 방식에서 벗어나 사용자의 가치관을 반영해 소비를 유도하는 서비스다. 서비스 개발 및 디자인에 정은희, 남서우, 박수연, 황영주, 에드윈 트루먼(Edwin Truman), 이선옥, 최다솜 학생이 참여했고, NH투자증권과의 산학협력을 통해 진행됐다. 
                        </span>
                    </div>
                    <a class="read_more" href="">{t("General.read_more")}</a>
                </div>
                
            </li>);
        }
        return items;
    }

    return (
        <div className="Grid">
            <ul>
            {fetchItems(14)}
            </ul>
        </div>
    );
}

export default Grid;
  
