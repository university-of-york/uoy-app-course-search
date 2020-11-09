import { render, screen } from "@testing-library/react";
import { CourseSearchResults } from "../../components/CourseSearchResults";

describe("CourseSearchResults", () => {
    it("displays the titles from course search results", () => {
        const searchResults = [
            { title: "Maths", liveUrl: "http://foo.bar" },
            { title: "Physics", liveUrl: "http://foo.baz" },
        ];

        render(<CourseSearchResults isSuccessfulSearch searchResults={searchResults} searchTerm="foobar" />);

        expect(screen.getByRole("link", { name: "Maths" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Physics" })).toBeInTheDocument();
    });

    it("displays an appropriate message when the course search failed", () => {
        render(<CourseSearchResults isSuccessfulSearch={false} searchResults={[]} searchTerm="foobar" />);

        expect(screen.getByText(/Course search is currently unavailable. Please try again later/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toHaveAttribute(
            "href",
            "https://www.york.ac.uk/it-support/"
        );
    });

    it.each`
        description    | searchTerm
        ${"empty"}     | ${""}
        ${"non-empty"} | ${"foobar"}
    `("displays appropriate message when no search results returned ($description search term)", ({ searchTerm }) => {
        render(<CourseSearchResults isSuccessfulSearch searchResults={[]} searchTerm={searchTerm} />);

        expect(screen.getByText(/Sorry, your search did not return any results/)).toBeVisible();
    });

    it.each`
        description    | searchTerm
        ${"null"}      | ${null}
        ${"undefined"} | ${undefined}
    `("displays nothing when search terms are $description (e.g. on initial visit)", ({ searchTerm }) => {
        render(<CourseSearchResults searchTerm={searchTerm} />);

        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
});
