import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./Education.scss";


class International extends Component {
  render() {
    return (
      <div className="EducationContent">
        <div className="section_summary">
          <h2>International Exchange Program</h2>
        
          IDKAIST exchange students with the following universities based on department-level MOUs.
          <ul className="disc">
            <li>School of Design, Carnegie Mellon University, USA</li>
            <li>College of Design, Architecture, Art and Planning, University of Cincinnati, USA</li>
            <li>Faculty of Industrial Design Engineering, Delft University of Technology</li>
          </ul>
          Also, there are almost 70 university-level student exchange programs with which IDKAIST send and take students. Here are examples.
          <ul className="disc">
            <li>Department of Design, Alto University, Finland</li>
            <li>Division of Industrial Design, National University of Singapore, Singapore</li>
            <li>School of Design School, RMIT University, Australia</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default International;
