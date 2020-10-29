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
    let searchNumberStatement;
    if (numberOfMatches > numberOfResults) {
        searchNumberStatement = (
            <p data-testid="search-results-description">
                Showing the top {numberOfResults} results for <strong>{searchTerm}</strong>
            </p>
        );
    } else {
        searchNumberStatement = (
            <p data-testid="search-results-description">
                Showing {numberOfResults} results for <strong>{searchTerm}</strong>
            </p>
        );
    }

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
                <GridBoxFull>{searchNumberStatement}</GridBoxFull>
            </GridRow>
        </Grid>
    );
};

Search.propTypes = {
    searchTerm: PropTypes.string,
    numberOfMatches: PropTypes.number,
    numberOfResults: PropTypes.number,
};

export { Search };
