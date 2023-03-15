import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import _ from "lodash";

import Menu from './components/Menu/Menu.js';

import Home from './views/Home/Home.js';
import Education from './views/Education/Education.js';
import About from './views/About/About.js';
import Research from './views/Research/Research.js';
import Lab from './views/Lab/Lab.js';
import People from './views/People/People.js';
import Article from './views/Article/Article.js';
import ArticleList from './views/Article/ArticleList.js';
import ArticleListEditor from './views/Article/ArticleListEditor.js';
import ArticleEditor from './views/Article/ArticleEditor.js';
import LogIn from "./views/LogIn/LogIn.js";

import UploadImageS3 from './data/firestore/UploadImageS3.js';

import Labs from "./data/Labs";
import Footer from './components/Footer/Footer.js';
import PageHeader from './components/Page/PageHeader.js';

import './i18n';  // For Language support
// import logo from './logo.svg';
import './App.scss';

// import ScrollToTop from "./utils/scrollToTop.js";

function App() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  // Checking window size and setMatches true / false
  const [matches, setMatches] = useState(
      window.matchMedia("(min-width: 1000px)").matches
  )
  useEffect(() => {
      window
      .matchMedia("(min-width: 1000px)")
      .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  const toggleIsMenuActive = ()=>{
    setIsMenuActive(!isMenuActive);
  }
  return (
    <Router>
      {/* <ScrollToTop/> */}
      <div className="App">
        <Routes>
          <Route path="/" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section="" />} />
          <Route path="/home" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section=""/>} />
          <Route path="/education/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section="Education"/>} />
          <Route path="/research/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section="Research"/>} />
          <Route path="/people/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section="People"/>} />
          <Route path="/about/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section="About"/>} />
          <Route path="/articleList/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section=""/>} />
          <Route path="/articleListEditor/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section=""/>} />
          <Route path="/article/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section=""/>} />
          <Route path="/articleEditor/*" element={<PageHeader toggleIsMenuActive={toggleIsMenuActive} Section=""/>} />
          <Route path="*" element={<div></div>} />
        </Routes>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/education" element={<Education />} /> */}
          <Route path="/education" element={<Education course='Undergraduate' />} />
            <Route path="/education/Undergraduate" element={<Education course='Undergraduate'/>} />
            <Route path="/education/Master" element={<Education course='Master'/>} />
            <Route path="/education/PhD" element={<Education course='PhD'/>} />
            <Route path="/education/International" element={<Education course='International'/>} />
          
          <Route path="/research" element={<Research />} />
          {_.map(Labs, (labData,labID)=>{
            return (
              <Route path={"/research/"+labID} element={<Lab labID={labID}/>} />
            );
          })}

          <Route path="/about/*" element={<About />} />

          <Route path="/people" element={<People filter='All'/>} />
            <Route path="/people/All" element={<People filter='All'/>} />
            <Route path="/people/Faculty" element={<People  filter='Faculty'/>} />
            <Route path="/people/OldFaculty" element={<People  filter='OldFaculty'/>} />
            <Route path="/people/Staff" element={<People  filter='Staff'/>} />
            <Route path="/people/OtherFaculty" element={<People  filter='OtherFaculty'/>} />

          <Route path="/articleList" element={<ArticleList ArticleType='All'/>} />
            <Route path="/articleList/:articleType" element={<ArticleList/>} />
          
          <Route path="/article/:articleID" element={<Article/>} />

          <Route path="/articleListEditor" element={<ArticleListEditor ArticleType='All'/>} />
            <Route path="/articleListEditor/:articleType" element={<ArticleListEditor/>} />

          <Route path="/articleEditor" element={<ArticleEditor/>} />
          <Route path="/articleEditor/:articleIDparam" element={<ArticleEditor/>} />
          {/* Add more routes here */}

          <Route path="/uploadS3" element={<UploadImageS3/>} />

          {/* <Route path="/login" element={<LogIn/>} /> */}
        </Routes>

        {/* Routes for rendering footer (or skip for some pages) */}
        <Routes>
          <Route path="/research" element={<Footer setIsLoginActive={setIsLoginActive} />} />
          <Route path="/research/*" element={<div/>} />
          <Route path="*" element={<Footer  setIsLoginActive={setIsLoginActive}/>} />
        </Routes>
      </div>

      {isMenuActive ? (<Menu setIsMenuActive={setIsMenuActive} defaultSubMenuOpen={matches}/>):null}
      {isMenuActive ? (<div className="backdrop" onClick={()=>{
        document.querySelector(".Menu").classList.add("small");
        setTimeout(()=>{
          setIsMenuActive(false);
        },300);
      }}></div>): null}

      {isLoginActive ? <LogIn setIsLoginActive={setIsLoginActive}/>:null
      } 
      {isLoginActive ? (<div className="backdrop" onClick={()=>{
        setIsLoginActive(false);
      }}></div>): null}
    </Router>
  );
}

export default App;
