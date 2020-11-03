import { render, screen } from "@testing-library/react";
import App, { getServerSideProps } from "../../pages";

beforeEach(() => {
    fetch.resetMocks();
});

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
        render(<App />);

        expect(screen.getByTestId("search-results-description")).toBeVisible();
    });

    it("displays the titles from course search results", () => {
        const searchResults = [
            { title: "Maths", liveUrl: "http://foo.bar" },
            { title: "Physics", liveUrl: "http://foo.baz" },
        ];

        render(<App isSuccessfulSearch searchResults={searchResults} searchTerm="foobar" />);

        expect(screen.getByRole("link", { name: "Maths" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Physics" })).toBeInTheDocument();
    });
});

describe("getServerSideProps", () => {
    it("calls the Courses API and returns response in expected format", async () => {
        fetch.mockResponse(
            JSON.stringify({
                numberOfMatches: 1,
                results: [
                    {
                        title: "English",
                    },
                    {
                        title: "Maths",
                    },
                ],
            })
        );

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(response.props.isSuccessfulSearch).toEqual(true);
        expect(response.props.searchResults).toEqual([{ title: "English" }, { title: "Maths" }]);
        expect(response.props.searchTerm).toEqual("english");
    });

    it("constructs the Courses API url with the expected environment variables", async () => {
        await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain("https://test.courses.api.com");
        expect(calledUrl).toContain("max=20");
    });

    it("calls the Courses API with the correct base url", async () => {
        await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain(process.env.COURSES_API_BASEURL);
    });

    it("does not call the Courses API when no search term is entered", async () => {
        await getServerSideProps(emptyContext);

        expect(fetch).toHaveBeenCalledTimes(0);
    });

    it("calls the Courses API with a search term", async () => {
        await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain("search=english");
    });

    it("calls the Courses API with a maximum number of results to return", async () => {
        await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain(`max=${process.env.COURSES_API_MAX_RESULTS}`);
    });

    it("indicates when the Courses API search failed (http error response)", async () => {
        fetch.mockResponse("{}", { status: 500 });

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(response.props.isSuccessfulSearch).toEqual(false);
        expect(response.props.numberOfMatches).toEqual(0);
        expect(response.props.searchResults).toEqual([]);
    });

    it("indicates when the Courses API search failed (network or other error)", async () => {
        fetch.mockReject(new Error("can not resolve host"));

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(response.props.isSuccessfulSearch).toEqual(false);
        expect(response.props.numberOfMatches).toEqual(0);
        expect(response.props.searchResults).toEqual([]);
    });

    it("returns the number of matches from the API", async () => {
        fetch.mockResponse(
            JSON.stringify({
                numberOfMatches: 1,
                results: [],
            })
        );

        const response = await getServerSideProps(contextWithSearchTerm);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(response.props.isSuccessfulSearch).toEqual(true);
        expect(response.props.numberOfMatches).toEqual(1);
    });

    it("returns nothing when given no search terms", async () => {
        const response = await getServerSideProps(emptyContext);

        expect(response.props).toEqual({});
    });
});
