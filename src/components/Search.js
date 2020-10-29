import {
    BasicSubmitButton,
    Form,
    FormElement,
    FormInputText,
    Grid,
    GridBoxFull,
    GridRow,
    SearchIcon,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchTerm, numberOfMatches, numberOfResults }) => {
    return (
        <Grid>
            <GridRow>
                <GridBoxFull>
                    <Form action="/" autoComplete="off" method="get" role="search" aria-label="Courses">
                        <FormElement>
                            <FormInputText
                                name="search"
                                type="text"
                                ariaLabel="Search"
                                placeholder="Search for your course"
                                defaultValue={searchTerm}
                            />
                            <BasicSubmitButton aria-label="Search">
                                <SearchIcon />
                            </BasicSubmitButton>
                        </FormElement>
                    </Form>
                </GridBoxFull>
            </GridRow>
            <GridRow>
                <GridBoxFull>
                    <SearchResultsDescription
                        searchTerm={searchTerm}
                        numberOfMatches={numberOfMatches}
                        numberOfResults={numberOfResults}
                    />
                </GridBoxFull>
            </GridRow>
        </Grid>
    );
};

Search.propTypes = {
    searchTerm: PropTypes.string,
    numberOfMatches: PropTypes.number,
    numberOfResults: PropTypes.number,
};

const SearchResultsDescription = ({ searchTerm, numberOfMatches, numberOfResults }) => {
    return (
        <p data-testid="search-results-description">
            Showing {numberOfMatches > numberOfResults ? "the top" : ""} {numberOfResults} results for{" "}
            <strong>{searchTerm}</strong>
        </p>
    );
};

SearchResultsDescription.propTypes = {
    searchTerm: PropTypes.string,
    numberOfMatches: PropTypes.number,
    numberOfResults: PropTypes.number,
};

export { Search };
