import PropTypes from "prop-types";

const SearchResultsDescription = ({ searchTerm, numberOfMatches, numberOfResultsShown }) => {
    if (!numberOfResultsShown) {
        return null;
    }

    return (
        <p data-testid="search-results-description">
            Showing {numberOfMatches > numberOfResultsShown ? "the top" : "all"} {numberOfResultsShown} results for{" "}
            <strong>{searchTerm}</strong>
        </p>
    );
};

SearchResultsDescription.propTypes = {
    searchTerm: PropTypes.string,
    numberOfMatches: PropTypes.number,
    numberOfResultsShown: PropTypes.number,
};

export { SearchResultsDescription };
