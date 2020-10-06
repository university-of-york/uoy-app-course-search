import {
    FormElement,
    FormFieldset,
    FormInputText,
    Grid,
    GridBoxFull,
    GridRow,
    SearchIcon,
} from "@university-of-york/esg-lib-pattern-library-react-components";
import React from "react";

const Search = () => {
    return (
        <form autoComplete="off" method="get" className="c-form c-form--joined" role="search" aria-label="Courses">
            <FormFieldset>
                <Grid>
                    <GridRow>
                        <GridBoxFull>
                            <FormElement>
                                <FormInputText
                                    name="search"
                                    type="text"
                                    ariaLabel="Search"
                                    placeholder="Search for your course"
                                />
                                <button className="c-btn c-btn--medium" type="submit" aria-label="Search">
                                    <SearchIcon />
                                </button>
                            </FormElement>
                        </GridBoxFull>
                    </GridRow>
                </Grid>
            </FormFieldset>
        </form>
    );
};

export { Search };
