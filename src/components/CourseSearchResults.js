import { Course } from "./Course";
import PropTypes from "prop-types";
import { COURSE_MODEL } from "../constants/CourseModel";
import React from "react";
import { Alert } from "@university-of-york/esg-lib-pattern-library-react-components";
import { noSearchConducted } from "../utils/searchTerms";

const CourseSearchResults = ({ isSuccessfulSearch, searchResults, searchTerm }) => {
    if (noSearchConducted(searchTerm)) {
        return null;
    }

    if (!isSuccessfulSearch) {
        return <SearchFailedMessage />;
    }

    if (!searchResults?.length) {
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
    searchTerm: PropTypes.string,
};

const SearchFailedMessage = () => (
    <Alert className="warning">
        Course search is currently unavailable. Please try again later, or{" "}
        <a href="https://www.york.ac.uk/it-support/">contact IT Support</a>.
    </Alert>
);

const NoSearchResultsMessage = () => <Alert className="info">Sorry, your search did not return any results.</Alert>;

export { CourseSearchResults };
