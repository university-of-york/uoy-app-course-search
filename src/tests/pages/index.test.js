import { render, fireEvent, screen, within } from "@testing-library/react";
import { cleanCookies } from "universal-cookie/lib/utils";
import App, { getServerSideProps } from "../../pages";
import { searchForCourses } from "../../utils/searchForCourses";
import { logger } from "../../utils/logger";

jest.mock("../../utils/searchForCourses");
jest.mock("../../utils/logger");

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

        expect(screen.getByRole("heading", { name: "Undergraduate" })).toBeInTheDocument();
    });

    it("displays the undergraduate menu navigation", () => {
        render(<App />);

        expect(screen.getByRole("navigation", { name: "Main Navigation" })).toBeInTheDocument();
    });

    it("displays the undergraduate breadcrumbs", () => {
        render(<App />);

        expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
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

    it("displays the cookie banner", () => {
        cleanCookies();
        render(<App />);

        expect(screen.getByText("our use of cookies")).toBeVisible();
    });

    it("hides cookie banner when dismiss clicked", async () => {
        cleanCookies();
        render(<App />);

        const cookieBanner = screen.getByRole("region", { name: "Cookie banner" });
        const dismissButton = within(cookieBanner).getByRole("button", { name: "Dismiss this notification" });

        fireEvent.click(dismissButton);

        expect(screen.getByText("our use of cookies")).not.toBeVisible();
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

    it("can handle query parameter 'q' as synonym for 'search'", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 0, results: [] },
        });

        await getServerSideProps({ query: { q: "biology" } });

        expect(searchForCourses).toHaveBeenCalledTimes(1);
        expect(searchForCourses).toHaveBeenCalledWith("biology");
    });

    it("creates a log entry when a course search is conducted", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 0, results: [] },
        });

        await getServerSideProps(contextWithSearchTerm);

        expect(logger.info).toHaveBeenCalledTimes(1);
        expect(logger.info).toHaveBeenCalledWith(
            expect.objectContaining({ details: { clientIp: null, parameters: { search: "english" } } }),
            "User conducted a course search"
        );
    });

    it("logs an error when the course search failed", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: false,
            searchResponseData: { numberOfMatches: 0, results: [] },
            searchError: {
                message: "Search failed",
                searchUrl: "http://foo.bar",
                response: {
                    status: 403,
                    statusText: "Forbidden",
                    body: { message: "Missing authentication token" },
                },
            },
        });

        await getServerSideProps(contextWithSearchTerm);

        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledWith(
            {
                details: {
                    clientIp: null,
                    parameters: {
                        search: "english",
                    },
                },
                error: {
                    message: "Search failed",
                    searchUrl: "http://foo.bar",
                    response: {
                        status: 403,
                        statusText: "Forbidden",
                        body: {
                            message: "Missing authentication token",
                        },
                    },
                },
            },
            "Course search failed"
        );
    });

    it("does not log an error when the course search succeeds", async () => {
        searchForCourses.mockResolvedValue({
            isSuccessfulSearch: true,
            searchResponseData: { numberOfMatches: 0, results: [] },
        });

        await getServerSideProps(contextWithSearchTerm);

        expect(logger.error).not.toHaveBeenCalled();
    });
});
