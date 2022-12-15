import React, { Component } from 'react';
import "./AdmissionMaster.scss";

function AdmissionMasterInternational(){
    return (
    <div className="section_content">
        <h2>Admission for international students</h2>
        <p>This page is for international students. For Korean students, please refer to the other page.</p>
        <h3>Eligibility</h3>
        <ul className="disc">
            <li>For Master’s Degree Program Applicants hold or expect to hold a bachelor’s degree before enrollment at KAIST.</li>
            <li>For Doctoral Degree Program Applicants hold or expect to hold a bachelor’s and master’s degree before enrollment at KAIST</li>
            <li>Applicants are not a citizen of Korea / International applicants of Korean ethnicity needs to satisfy the <a href="https://admission.kaist.ac.kr/intl-graduate/Eligibility/">following criteria</a>.</li>
        </ul>
        
        <h3>For prospective undergraduate students</h3>
        <p>KAIST undergraduate admission is centralized. All students are scrutinized and admitted directly by the KAIST Admission Office, not the individual departments. Only during the second year of coursework students get to choose the department for their majors.</p>
        <p>Please visit the <a href="https://admission.kaist.ac.kr/intl-undergraduate/" target="_blank">KAIST Admission Office website</a> for a detailed description of how to apply to KAIST.</p>
        
        <h3>For prospective Graduate Students (Master, Master/Ph.D combined, Ph.D. programs)</h3>
        <p>Prospective graduate students apply directly to the department of interst. The full documentation of the documents to be submitted can be found <a href="https://admission.kaist.ac.kr/intl-graduate/required-application/" target="_blank">here</a>. Make however sure to submit all the documents listed below.</p>

        <h4>Part 1 - Online application</h4>
            <ul>
                <li>1.a) Fill out the online application.</li>
                <li>1.b) Print out your online application form for your reference.</li>
                <li>1.c) Application Fee (USD 80 or KRW 80,000)</li>
            </ul>
        <h4>Part 2 - Document Submission to be sent physically to the admission office</h4>
            <ul>
                <li>2.a) Statement of Purpose (see also material description below)</li>
                <li>2.b) List of up to 3 possible supervisors</li>
                <li>2.c) Porfolio of previous work (see also material description below)</li>
                <li>2.d) Statement of Financial Resources (see also material description below)</li>
                <li>2.e) Two Recommendation Letters</li>
                <li>2.f) Certified Degree / Diploma</li>
                <li>2.g) Certified Transcripts</li>
                <li>2.h) Certified English Proficiency Test Reports</li>
                <li>2.i) Curriculum Vitae</li>
                <li>2.j) Country of Citizenship</li>
                <li>2.k) Optional Document</li>
                <ul>
                    <li>(1) List of Honors and Awards</li>
                    <li>(2) Employment Certificate</li>
                    <li>(3) School Profile/ Credit Rating System</li>
                </ul>
            </ul>
        <p>
            These documents should be sent to
        </p>
        <pre>
            <code>
                Graduate Admission Team, KAIST <br/><br/>
                Address: # 110, 1st Floor, E 16-1 B/D291 Daehak-ro, Yuseong-gu, Daejeon 34141 Republic of Korea, Graduate Admissions Team, KAIST<br/><br/>
                Office: +82-42-350-2352, 2354 <br/><br/>
                E-Mail: advanced.adm@kaist.ac.kr
            </code>
        </pre>
        <h3>Material Description</h3>
        <h4>Statement of Purpose</h4>
        <p>Write down a detailed and accurate statement of your purpose and objective in pursuing your study at KAIST.Please try to answer briefly to the following questions</p>
        <ul className="disc">
            <li>What you studied at your previous institution</li>
            <li>Motivation applying for the major</li>
            <li>Motivation applying under supervision of XYZ professor/s</li>
            <li>Brief study plan</li>
            <li>Future plan after study</li>
            <li>Honors and awards, major accomplishments</li>
            <li>Introduction of the institution you previously attended</li>
        </ul>
        <h4>List of up to 3 possible supervisors</h4>
        <p>
            You should clearly indicate in your application up to 3 faculty members you would like to work with. Once granted acceptance, you will work in one of these professors' labs, so please make sure to visit our <a href="">faculty's lab websites</a>. We also encourage you to contact the professors you would like to work with or lab representatives in advance. This list can be submitted as a separate file, <b>or</b> the names of the possible advisors should be inclued in the statement of purpose.
        </p>
        <h4>Porfolio of previous work</h4>
        <p>
            The portfolio is an <b>extremely important</b> part of your application to the department of Industrial Design: it allows faculty and prospective supervisors to judge your capabilities and fit with current labs.
        </p>
        <p>
            The portfolio should contain some examples of your previous work or projects, and it can be submitted as a physical printed document, or, preferably, as a link to a personal webpage.
        </p>
        <p>
            The portfolio can contain (but is not limited to) visual expressions, PowerPoint slides, art or artifacts, videos, business cases reports, code, online repositories, etc... or any other form of media that could communicate your capabilities, interest, and potential.
        </p>
        
        <h4>Statement of Financial Resources</h4>
        <p>Indicate your source of fundings:</p>
        <ol>
            <li>Self-support or Parental Sponsor</li>
            <li>Government/Organization Scholarship</li>
            <li>KAIST Scholarship</li>
        </ol>
        <h4>More info</h4>
        <p>
            For more information about any other item in the list, please refer to <a href="https://admission.kaist.ac.kr/intl-graduate/required-application/">the official admission guideline</a> of KAIST.
        </p>
    </div>);
}

export default AdmissionMasterInternational;