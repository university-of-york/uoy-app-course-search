import React from "react";
import PropTypes from "prop-types";
import {
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import { CourseSearchResults } from "../components/CourseSearchResults";
import { COURSE_MODEL } from "../constants/CourseModel";
import { PageHead } from "../components/PageHead";

const App = ({ isSuccessfulSearch, searchResults }) => {
    return (
        <>
            <PageHead />
            <UniversityHeaderWithSearch />
            <UniversityTitleBar title="Courses" />

            <div className="o-wrapper o-wrapper--main o-grid js-wrapper--main">
                <div className="o-grid__row">
                    <div className="o-grid__box o-grid__box--full">
                        <CourseSearchResults isSuccessfulSearch={isSuccessfulSearch} searchResults={searchResults} />
                    </div>
                </div>
            </div>

            <UniversityFooter />
        </>
    );
};

App.propTypes = {
    isSuccessfulSearch: PropTypes.bool,
    searchResults: PropTypes.arrayOf(COURSE_MODEL),
};

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
