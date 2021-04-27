import React from "react";
import PropTypes from "prop-types";
import {
    GridBoxQuarter,
    GridBoxThreeQuarters,
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
import { UndergraduateMenuNavigation } from "../components/UndergraduateMenuNavigation";
import { UndergraduateBreadcrumbs } from "../components/UndergraduateBreadcrumbs";
import { CoronavirusNotice } from "../components/CoronavirusNotice";
import { UndergraduateSubnavigation } from "../components/UndergraduateSubnavigation";
import { GlobalNotice } from "../components/GlobalNotice";

const App = ({ isSuccessfulSearch, searchResults, numberOfMatches, searchTerm }) => {
    return (
        <>
            <PageHead search={searchTerm} />
            <UniversityWrapper>
                <UniversityBody>
                    <CoronavirusNotice />
                    <GlobalNotice>
                        This is a new service. Please help us improve it by sharing your{" "}
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
                                <GridBoxQuarter>
                                    <UndergraduateSubnavigation />
                                </GridBoxQuarter>
                                <GridBoxThreeQuarters>
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
                                </GridBoxThreeQuarters>
                            </GridRow>
                        </WrappedMainGrid>
                    </div>
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
