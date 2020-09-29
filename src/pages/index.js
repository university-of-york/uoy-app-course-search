import React from "react";
import PropTypes from "prop-types";
import {
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import { Course } from "../components/Course";
import { COURSE_MODEL } from "../constants/CourseModel";
import Head from "next/head";
require("regenerator-runtime/runtime");

const App = ({ isSuccessfulSearch, searchResults }) => {
    return (
        <>
            <PageHead />
            <UniversityHeaderWithSearch />
            <UniversityTitleBar title="Courses" />

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

const PageHead = () => {
    return (
        <Head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="University of York" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="University of York Course search" />

            <title>Course search, University of York</title>

            <link rel="shortcut icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />

            <script src="https://www.york.ac.uk/static/stable/js/modernizr.min.js"></script>
            <script src="https://www.york.ac.uk/static/stable/js/app.min.js"></script>

            <script src="//use.typekit.net/dvj8rpp.js"></script>
            <script language="application/javascript">Typekit.load();</script>
        </Head>
    );
};

const CourseSearchResults = ({ isSuccessfulSearch, searchResults }) => {
    if (!isSuccessfulSearch) {
        return <SearchFailedMessage />;
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
