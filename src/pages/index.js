import React from "react";
import PropTypes from "prop-types";
import {
    GridBoxFull,
    GridRow,
    UniversityBody,
    UniversityCookieBanner,
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
    UniversityWrapper,
    WrappedMainGrid,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import { CourseSearchResults } from "../components/CourseSearchResults";
import { COURSE_MODEL } from "../constants/CourseModel";
import { PageHead } from "../components/PageHead";
import { Search } from "../components/Search";
import { emptySearchConducted, noSearchConducted } from "../utils/searchTerms";
import { searchForCourses } from "../utils/searchForCourses";
import { HeroBanner } from "../components/HeroBanner";
import { SearchResultsDescription } from "../components/SearchResultsDescription";
import { UndergraduateMenuNavigation } from "../components/UndergraduateMenuNavigation";
import { UndergraduateBreadcrumbs } from "../components/UndergraduateBreadcrumbs";
import { GlobalNotice } from "../components/GlobalNotice";
import { logger } from "../utils/logger";
import { logEntry } from "../utils/logEntry";

const App = ({ isSuccessfulSearch, searchResults, numberOfMatches, searchTerm }) => {
    return (
        <>
            <PageHead search={searchTerm} />
            <UniversityWrapper>
                <UniversityBody>
                    <GlobalNotice>
                        This is a new Course Search. Please help us improve it by sharing your{" "}
                        <a href="https://york.qualtrics.com/jfe/form/SV_6R4pMhXXDs92mii">feedback</a> with us.
                    </GlobalNotice>
                    <UniversityHeaderWithSearch />
                    <UniversityTitleBar title="Undergraduate" />
                    <UndergraduateMenuNavigation />

                    <div role="main">
                        <HeroBanner>
                            <UndergraduateBreadcrumbs />
                            <h1>Search undergraduate courses</h1>
                            <Search
                                searchTerm={searchTerm}
                                numberOfMatches={numberOfMatches}
                                numberOfResultsShown={searchResults?.length}
                            />
                        </HeroBanner>

                        <WrappedMainGrid>
                            <GridRow>
                                <GridBoxFull>
                                    <SearchResultsDescription
                                        searchTerm={searchTerm}
                                        numberOfMatches={numberOfMatches}
                                        numberOfResultsShown={searchResults?.length}
                                    />
                                    <CourseSearchResults
                                        isSuccessfulSearch={isSuccessfulSearch}
                                        searchResults={searchResults}
                                        searchTerm={searchTerm}
                                    />
                                </GridBoxFull>
                            </GridRow>
                        </WrappedMainGrid>
                    </div>
                    <UniversityCookieBanner />
                </UniversityBody>
                <UniversityFooter />
            </UniversityWrapper>
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
    const searchTerm = context.query.search === undefined ? context.query.q : context.query.search;

    if (noSearchConducted(searchTerm)) {
        logger.info(logEntry(context.req, context.query, null), "User loaded courses index page");
        return { props: {} };
    }

    if (emptySearchConducted(searchTerm)) {
        logger.info(logEntry(context.req, context.query, null), "User conducted an empty search");
        return { props: { searchTerm, isSuccessfulSearch: true, searchResults: [], numberOfMatches: 0 } };
    }

    const { isSuccessfulSearch, searchResponseData, searchError } = await searchForCourses(searchTerm);

    if (isSuccessfulSearch) {
        logger.info(logEntry(context.req, context.query, null), "User conducted a course search");
    } else {
        logger.error(logEntry(context.req, context.query, null, searchError), "Course search failed");
    }

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
