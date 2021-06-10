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
        <Grid>
            <GridRow>
                <GridBoxFull>
                    <Form
                        action=""
                        autoComplete="off"
                        method="get"
                        role="search"
                        id="course-search-form"
                        aria-label="Courses"
                    >
                        <FormElement>
                            <FormInputText
                                name="search"
                                type="text"
                                ariaLabel="Search"
                                placeholder="Search for your course"
                                defaultValue={searchTerm}
                            />
                            <input
                                type="hidden"
                                name="level"
                                value="undergraduate"
                                data-testid="temporaryLevelParameter"
                            />
                            <BasicSubmitButton aria-label="Search">
                                <SearchIcon ariaHidden />
                            </BasicSubmitButton>
                        </FormElement>
                    </Form>
                </GridBoxFull>
            </GridRow>
        </Grid>
    );
};

Search.propTypes = {
    searchTerm: PropTypes.string,
};

export { Search };
