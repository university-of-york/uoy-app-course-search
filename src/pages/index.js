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
import { searchForCourses } from "../utils/searchForCourses";

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

export { App as default, getServerSideProps };
