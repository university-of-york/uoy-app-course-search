import { Course } from "./Course";
import PropTypes from "prop-types";
import { COURSE_MODEL } from "../constants/CourseModel";
import React from "react";

const CourseSearchResults = ({ isSuccessfulSearch, searchResults }) => {
    if (!isSuccessfulSearch) {
        return <SearchFailedMessage />;
    }

    if (!searchResults) {
        return <NoSearchResultsMessage />;
    }

    return (
        <ul className="c-listings">
            {searchResults?.map((course) => (
                <Course key={course.liveUrl} course={course} />
            ))}
        </ul>
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

const NoSearchResultsMessage = () => (
    <div className="c-alert c-alert--info">
        <div className="c-alert__content">Sorry, your search did not return any results.</div>
    </div>
);

export { CourseSearchResults };
