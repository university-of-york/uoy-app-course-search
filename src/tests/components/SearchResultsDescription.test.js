import { render, screen } from "@testing-library/react";
import { SearchResultsDescription } from "../../components/SearchResultsDescription.js";

describe("SearchResultsDescription", () => {
    it("informs the user that only a limited number of results are being shown when the number of matches is greater than the number of results", () => {
        render(<SearchResultsDescription searchTerm="Maths" numberOfMatches={25} numberOfResultsShown={23} />);

        expect(screen.getByTestId("search-results-description")).toHaveTextContent(
            "Showing the top 23 results for Maths"
        );
    });

    it("informs the user that all results are shown when the number of matches is equal to the number of results", () => {
        render(<SearchResultsDescription searchTerm="Maths" numberOfMatches={5} numberOfResultsShown={5} />);

        expect(screen.getByTestId("search-results-description")).toHaveTextContent("Showing all 5 results for Maths");
    });

    it("does not display any text when there are no search results", () => {
        render(<SearchResultsDescription numberOfResultsShown={0} />);

        expect(screen.queryByTestId("search-results-description")).not.toBeInTheDocument();
    });
});
