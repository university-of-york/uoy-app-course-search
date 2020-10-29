import React from "react";
import PropTypes from "prop-types";
import {
    GridBoxFull,
    GridRow,
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
    WrappedMainGrid,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import { CourseSearchResults } from "../components/CourseSearchResults";
import { COURSE_MODEL } from "../constants/CourseModel";
import { PageHead } from "../components/PageHead";
import { Search } from "../components/Search";

const App = ({ isSuccessfulSearch, searchResults, numberOfMatches, numberOfResultsShown, searchTerm }) => {
    return (
        <>
            <PageHead search={searchTerm} />
            <UniversityHeaderWithSearch />
            <UniversityTitleBar title="Courses" />

            <WrappedMainGrid>
                <GridRow>
                    <GridBoxFull>
                        <Search
                            searchTerm={searchTerm}
                            numberOfMatches={numberOfMatches}
                            numberOfResultsShown={numberOfResultsShown}
                        />
                    </GridBoxFull>
                </GridRow>
                <GridRow>
                    <GridBoxFull>
                        <CourseSearchResults isSuccessfulSearch={isSuccessfulSearch} searchResults={searchResults} />
                    </GridBoxFull>
                </GridRow>
            </WrappedMainGrid>

            <UniversityFooter />
        </>
    );
};

App.propTypes = {
    isSuccessfulSearch: PropTypes.bool,
    searchResults: PropTypes.arrayOf(COURSE_MODEL),
    numberOfMatches: PropTypes.number,
    numberOfResultsShown: PropTypes.number,
    searchTerm: PropTypes.string,
};

const getServerSideProps = async (context) => {
    const searchTerm = context.query.search || "maths";

    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=${searchTerm}&max=${process.env.COURSES_API_MAX_RESULTS}`;

    let isSuccessfulSearch;
    let searchResponseData;

    try {
        const response = await fetch(courseSearchUrl);
        isSuccessfulSearch = response.ok;
        searchResponseData = isSuccessfulSearch ? await response.json() : { numberOfMatches: 0, results: [] };
    } catch {
        isSuccessfulSearch = false;
        searchResponseData = { numberOfMatches: 0, results: [] };
    }

    return {
        props: {
            isSuccessfulSearch,
            searchResults: searchResponseData.results,
            numberOfMatches: searchResponseData.numberOfMatches,
            numberOfResultsShown: searchResponseData.results.length,
            searchTerm,
        },
    };
};

export { App as default, getServerSideProps };
