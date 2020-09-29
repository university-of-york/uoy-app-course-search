import React from "react";
import PropTypes from "prop-types";
import {
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import { Course } from "../components/Course";
import { COURSE_MODEL } from "../constants/CourseModel";
require("regenerator-runtime/runtime");

const App = ({ isSuccessfulSearch, searchResults }) => {
    return (
        <>
            <UniversityHeaderWithSearch />
            <UniversityTitleBar title="Course search results" />

            <div className="o-wrapper o-wrapper--main o-grid js-wrapper--main">
                <CourseSearchResults isSuccessfulSearch={isSuccessfulSearch} searchResults={searchResults} />
            </div>

            <UniversityFooter />
        </>
    );
};

App.propTypes = {
    isSuccessfulSearch: PropTypes.bool,
    searchResults: PropTypes.arrayOf(COURSE_MODEL),
};

const CourseSearchResults = ({ isSuccessfulSearch, searchResults }) => {
    if (!isSuccessfulSearch) {
        return <SearchFailedMessage />;
    }

    return (
        <>
            {searchResults?.map((course) => (
                <Course key={course.liveUrl} course={course} />
            ))}
        </>
    );
};

CourseSearchResults.propTypes = {
    isSuccessfulSearch: PropTypes.bool,
    searchResults: PropTypes.arrayOf(COURSE_MODEL),
};

const SearchFailedMessage = () => (
    <div className="c-alert c-alert--warning">
        <div className="c-alert__content">
            Course search is currently unavailable. Please try again later, or{" "}
            <a href="https://www.york.ac.uk/it-support/">contact IT Support</a>.
        </div>
    </div>
);

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    let isSuccessfulSearch;
    let searchResponseData;

    try {
        const response = await fetch(courseSearchUrl);
        isSuccessfulSearch = response.ok;
        searchResponseData = isSuccessfulSearch ? await response.json() : { results: [] };
    } catch {
        isSuccessfulSearch = false;
        searchResponseData = { results: [] };
    }

    return { props: { isSuccessfulSearch, searchResults: searchResponseData.results } };
};

export { App as default, getServerSideProps };
