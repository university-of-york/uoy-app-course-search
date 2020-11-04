import { render, screen, within } from "@testing-library/react";
import { Search } from "../../components/Search";

describe("Search", () => {
    it("displays a search input and button", () => {
        render(<Search />);

        const search = screen.getByRole("search", { name: "Courses" });

        expect(search).toBeVisible();

        const { getByRole } = within(search);

        expect(getByRole("textbox", { name: "Search" })).toBeVisible();
        expect(getByRole("button", { name: "Search" })).toBeVisible();
    });

    it("populates the search box with the search term", () => {
        render(<Search searchTerm="French" />);

        const { getByRole } = within(screen.getByRole("search", { name: "Courses" }));

        expect(getByRole("textbox", { name: "Search" }).value).toEqual("French");
    });

    it("informs the user that only a limited number of results are being shown when the number of matches is greater than the number of results", () => {
        render(<Search searchTerm="Maths" numberOfMatches={25} numberOfResultsShown={23} />);

        expect(screen.getByTestId("search-results-description")).toHaveTextContent(
            "Showing the top 23 results for Maths"
        );
    });

    it("informs the user that all results are shown when the number of matches is equal to the number of results", () => {
        render(<Search searchTerm="Maths" numberOfMatches={5} numberOfResultsShown={5} />);

        expect(screen.getByTestId("search-results-description")).toHaveTextContent("Showing all 5 results for Maths");
    });

    it.each`
        description    | searchTerm
        ${"blank"}     | ${""}
        ${"null"}      | ${null}
        ${"undefined"} | ${undefined}
    `("does not display any text when given $description search terms", ({ searchTerm }) => {
        render(<Search searchTerm={searchTerm} />);

        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
});
