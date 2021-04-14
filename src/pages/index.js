import React from "react";
import PropTypes from "prop-types";
import {
    Breadcrumbs,
    GridBoxFull,
    GridRow,
    UniversityFooter,
    UniversityHeaderWithSearch,
    UniversityTitleBar,
    UniversityWrapper,
    UniversityBody,
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

const App = ({ isSuccessfulSearch, searchResults, numberOfMatches, searchTerm }) => {
    return (
        <>
            <PageHead search={searchTerm} />
            <UniversityWrapper>
                <UniversityBody>
                    <UniversityHeaderWithSearch />
                    <UniversityTitleBar title="Courses" />

                    <HeroBanner>
                        <Breadcrumbs screenBreadcrumbs={[{ label: "Course search", link: "/" }]} />
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
