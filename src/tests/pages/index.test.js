import { render, screen } from "@testing-library/react";
import App, { getServerSideProps } from "../../pages";
import { searchForCourses } from "../../utils/searchForCourses";

jest.mock("../../utils/searchForCourses");

beforeEach(() => {
    jest.clearAllMocks();
});

const searchResults = [
    { title: "Maths", liveUrl: "http://foo.bar" },
    { title: "Physics", liveUrl: "http://foo.baz" },
];
const emptyContext = { query: {} };
const contextWithSearchTerm = { query: { search: "english" } };

describe("App", () => {
    it("displays an appropriate page heading", () => {
        render(<App />);

        expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
    });

    it("displays the search element", () => {
        render(<App />);

        expect(screen.getByRole("search", { name: "Courses" })).toBeVisible();
    });

    it("displays the search results description", () => {
        render(<App isSuccessfulSearch searchResults={searchResults} searchTerm="foobar" />);

        expect(screen.getByTestId("search-results-description")).toBeVisible();
    });

    it("displays the titles from course search results", () => {
        render(<App isSuccessfulSearch searchResults={searchResults} searchTerm="foobar" />);

        expect(screen.getByRole("heading", { name: "Maths" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Physics" })).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
    it("calls course search and returns response in expected format", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 1, results: [{ title: "English" }, { title: "Maths" }] },
        });

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(searchForCourses).toHaveBeenCalledTimes(1);

        expect(response.props.isSuccessfulSearch).toEqual(true);
        expect(response.props.searchResults).toEqual([{ title: "English" }, { title: "Maths" }]);
        expect(response.props.searchTerm).toEqual("english");
    });

    it("does not search for courses when no search term is entered", async () => {
        await getServerSideProps(emptyContext);

        expect(searchForCourses).toHaveBeenCalledTimes(0);
    });

    it("calls course search with a search term", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 0, results: [] },
        });

        await getServerSideProps(contextWithSearchTerm);

        expect(searchForCourses).toHaveBeenCalledTimes(1);
        expect(searchForCourses).toHaveBeenCalledWith("english");
    });

    it("indicates when the course search failed", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: false,
            searchResponseData: { numberOfMatches: 0, results: [] },
        });

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(response.props.isSuccessfulSearch).toEqual(false);
        expect(response.props.numberOfMatches).toEqual(0);
        expect(response.props.searchResults).toEqual([]);
    });

    it("returns the number of matches from the course search", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 1, results: [] },
        });

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(searchForCourses).toHaveBeenCalledTimes(1);

        expect(response.props.isSuccessfulSearch).toEqual(true);
        expect(response.props.numberOfMatches).toEqual(1);
    });

    it.each`
        description    | searchTerm
        ${"null"}      | ${null}
        ${"undefined"} | ${undefined}
    `("returns nothing when given $description search terms (e.g. on initial visit)", async ({ searchTerm }) => {
        const response = await getServerSideProps({ query: { search: searchTerm } });

        expect(response.props).toEqual({});
    });

    it("returns blank properties when user conducts blank search", async () => {
        const response = await getServerSideProps({ query: { search: "" } });

        expect(response.props.searchTerm).toEqual("");
        expect(response.props.isSuccessfulSearch).toEqual(true);
        expect(response.props.searchResults).toEqual([]);
        expect(response.props.numberOfMatches).toEqual(0);
    });
});
