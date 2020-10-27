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

const Search = ({ searchTerm }) => {
    return (
        <Form action="/" autoComplete="off" method="get" role="search" aria-label="Courses">
            <Grid>
                <GridRow>
                    <GridBoxFull>
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
                        <span data-testid="search-results-description">
                            Showing results for <strong>{searchTerm}</strong>
                        </span>
                    </GridBoxFull>
                </GridRow>
            </Grid>
        </Form>
    );
};

Search.propTypes = {
    searchTerm: PropTypes.string,
};

export { Search };
