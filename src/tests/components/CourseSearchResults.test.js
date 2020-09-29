import { render, screen } from "@testing-library/react";
import { CourseSearchResults } from "../../components/CourseSearchResults";

describe("CourseSearchResults", () => {
    it("displays the titles from course search results", () => {
        const searchResults = [
            { title: "Maths", liveUrl: "http://foo.bar" },
            { title: "Physics", liveUrl: "http://foo.baz" },
        ];

        render(<CourseSearchResults isSuccessfulSearch searchResults={searchResults} />);

        expect(screen.getByRole("link", { name: "Maths" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Physics" })).toBeInTheDocument();
    });

    it("displays an appropriate message when the course search failed", () => {
        render(<CourseSearchResults isSuccessfulSearch={false} />);

        expect(screen.getByText(/Course search is currently unavailable. Please try again later/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toHaveAttribute(
            "href",
            "https://www.york.ac.uk/it-support/"
        );
    });
});
