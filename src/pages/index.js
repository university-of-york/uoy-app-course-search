import React from "react";
import PropTypes from "prop-types";
import {UniversityFooter, UniversityHeaderWithSearch, UniversityTitleBar} from "@university-of-york/esg-lib-pattern-library-react-components";
import {Course} from "../components/Course";
import {COURSE_MODEL} from "../constants/CourseModel";
require("regenerator-runtime/runtime");

const App = (props) => {
    return (
        <>
            <UniversityHeaderWithSearch/>
            <UniversityTitleBar title={"Course search results"}/>

            <div className="o-wrapper o-wrapper--main o-grid js-wrapper--main">
                <ul className="course-results">
                {props.searchResults?.map((course) => (
                    <Course key={course.liveUrl} course={course}/>
                ))}
                </ul>
            </div>

            <UniversityFooter/>
        </>
    );
};

App.propTypes = {
    searchResults: PropTypes.arrayOf(COURSE_MODEL),
};

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    const response = await fetch(courseSearchUrl);
    const data = await response.json();

    return { props: { searchResults: data.results } };
};

export { App as default, getServerSideProps };
