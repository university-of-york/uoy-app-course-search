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
import { emptySearchConducted, noSearchConducted } from "../utils/searchTerms";

const App = ({ isSuccessfulSearch, searchResults, numberOfMatches, searchTerm }) => {
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
                            numberOfResultsShown={searchResults?.length}
                        />
                    </GridBoxFull>
                </GridRow>
                <GridRow>
                    <GridBoxFull>
                        <CourseSearchResults
                            isSuccessfulSearch={isSuccessfulSearch}
                            searchResults={searchResults}
                            searchTerm={searchTerm}
                        />
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
    searchTerm: PropTypes.string,
};

const getServerSideProps = async (context) => {
    const searchTerm = context.query.search;

    if (noSearchConducted(searchTerm)) {
        return { props: {} };
    }

    if (emptySearchConducted(searchTerm)) {
        return { props: { searchTerm, isSuccessfulSearch: true, searchResults: [], numberOfMatches: 0 } };
    }

    const { isSuccessfulSearch, searchResponseData } = await searchForCourses(searchTerm);

    return {
        props: {
            searchTerm,
            isSuccessfulSearch,
            searchResults: searchResponseData.results,
            numberOfMatches: searchResponseData.numberOfMatches,
        },
    };
};

const searchForCourses = async (searchTerm) => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=${searchTerm}&max=${process.env.COURSES_API_MAX_RESULTS}`;

    let isSuccessfulSearch;
    let searchResponseData;
    const defaultResponse = { numberOfMatches: 0, results: [] };

    try {
        const response = await fetch(courseSearchUrl);
        isSuccessfulSearch = response.ok;
        searchResponseData = isSuccessfulSearch ? await response.json() : defaultResponse;
    } catch {
        isSuccessfulSearch = false;
        searchResponseData = defaultResponse;
    }

    return { isSuccessfulSearch, searchResponseData };
};

export { App as default, getServerSideProps };
