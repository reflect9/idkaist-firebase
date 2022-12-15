import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./SloganAndShorcuts.scss";

class SloganAndShorcuts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
    fetchSloganAndShorcuts = () => { 
        // const imgStyle = {
        //     backgroundImage:`url(${process.env.PUBLIC_URL+ bgURL})`
        // }
        return (<div className="SloganAndShorcuts">
            <div className="info">
                <div className="title">TITLE OF FEATURED ITEM </div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
            </div>
            {/* <div className="bg" style={imgStyle}></div> */}
        </div>);
        // let items = [];
        // for(var i=0; i<num; i++) {
        //     let bgURL = '/works/works'+(i+1)+'.png';
        //     const imgStyle = {
        //         backgroundImage:`url(${process.env.PUBLIC_URL+ bgURL})`
        //     }
        //     items.push(<li key={"li"+i} className="cube" >
        //         {/* <img /> */}
        //         {/* <img src={ require('/assets/works/work'+i+".png")}/> */}
        //         <div className="info">
        //             <div className="title">
        //                 <span className="highlight">Title</span>
        //             </div>
        //             <div className="description">
        //                 <span className="highlight">
        //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        //                 </span>
        //             </div>
        //         </div>
        //         <div className="thumbnailImage" style={imgStyle}>

        //         </div>
        //     </li>);
        // }
        // return items;
    }

    render() {
        return this.fetchSloganAndShorcuts();
    }
}

export default SloganAndShorcuts;
  
