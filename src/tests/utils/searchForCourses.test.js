import { searchForCourses } from "../../utils/searchForCourses";
import { logger } from "../../utils/logger";

jest.mock("../../utils/logger");

beforeEach(() => {
    fetch.resetMocks();
    logger.warn.mockClear();
});

describe("searchForCourses", () => {
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

        const { isSuccessfulSearch, searchResponseData } = await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);

        expect(isSuccessfulSearch).toEqual(true);
        expect(searchResponseData.results).toEqual([{ title: "English" }, { title: "Maths" }]);
    });

    it("constructs the Courses API url with the expected environment variables", async () => {
        await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain("https://test.courses.api.com");
        expect(calledUrl).toContain("max=20");
    });

    it("calls the Courses API with the correct base url", async () => {
        await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain(process.env.COURSES_API_BASEURL);
    });

    it("calls the Courses API with a search term", async () => {
        await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain("search=english");
    });

    it("calls the Courses API with a maximum number of results to return", async () => {
        await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);

        const calledUrl = fetch.mock.calls[0][0];
        expect(calledUrl).toContain(`max=${process.env.COURSES_API_MAX_RESULTS}`);
    });

    it("indicates when the Courses API search failed (http error response)", async () => {
        fetch.mockResponse('{"message":"Missing authentication token"}', { status: 403, statusText: "Forbidden" });

        const { isSuccessfulSearch, searchResponseData, searchError } = await searchForCourses("english");

        expect(isSuccessfulSearch).toEqual(false);
        expect(searchResponseData.numberOfMatches).toEqual(0);
        expect(searchResponseData.results).toEqual([]);
        expect(searchError).toEqual({
            message: "Failed to fetch results from Courses API",
            searchUrl: "https://test.courses.api.com?search=english&max=20",
            response: {
                status: 403,
                statusText: "Forbidden",
                body: { message: "Missing authentication token" },
            },
        });
    });

    it("indicates when the Courses API search failed (network or other error)", async () => {
        fetch.mockReject(new Error("can not resolve host"));

        const { isSuccessfulSearch, searchResponseData, searchError } = await searchForCourses("english");

        expect(isSuccessfulSearch).toEqual(false);
        expect(searchResponseData.numberOfMatches).toEqual(0);
        expect(searchResponseData.results).toEqual([]);
        expect(searchError).toEqual({
            message: "Failed to fetch results from Courses API",
            searchUrl: "https://test.courses.api.com?search=english&max=20",
            details: "can not resolve host",
        });
    });

    it("returns an empty searchError when there are no problems with the search", async () => {
        fetch.mockResponse(JSON.stringify({ numberOfMatches: 0, results: [] }));

        const { searchError } = await searchForCourses("english");

        expect(searchError).toEqual({});
    });

    it("returns the number of matches from the API", async () => {
        fetch.mockResponse(
            JSON.stringify({
                numberOfMatches: 1,
                results: [],
            })
        );

        const { isSuccessfulSearch, searchResponseData } = await searchForCourses("english");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(isSuccessfulSearch).toEqual(true);
        expect(searchResponseData.numberOfMatches).toEqual(1);
    });

    it.each`
        searchTerm      | expectedUri
        ${"maths"}      | ${"?search=maths"}
        ${"數學"}       | ${"?search=%E6%95%B8%E5%AD%B8"}
        ${"数学"}       | ${"?search=%E6%95%B0%E5%AD%A6"}
        ${"μαθηματικά"} | ${"?search=%CE%BC%CE%B1%CE%B8%CE%B7%CE%BC%CE%B1%CF%84%CE%B9%CE%BA%CE%AC"}
        ${"математика"} | ${"?search=%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0"}
        ${"رياضيات"}    | ${"?search=%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA"}
        ${"מתמטיקה"}    | ${"?search=%D7%9E%D7%AA%D7%9E%D7%98%D7%99%D7%A7%D7%94"}
    `(
        "Correctly sanitizes the search URL for a range of alphabets (search: $searchTerm)",
        async ({ searchTerm, expectedUri }) => {
            fetch.mockResponse(
                JSON.stringify({
                    numberOfMatches: 0,
                    results: [],
                })
            );

            await searchForCourses(searchTerm);

            const requestUrl = fetch.mock.calls[0][0];

            expect(requestUrl).toContain(expectedUri);
        }
    );

    it("Retries an API request if an error occurs", async () => {
        fetch.mockRejectOnce(new Error("An error has occurred."));
        fetch.mockResponse(
            JSON.stringify({
                numberOfMatches: 2,
                results: ["english", "english pt2"],
            })
        );

        const { isSuccessfulSearch, searchResponseData, searchError } = await searchForCourses("english");

        expect(fetch.mock.calls.length).toEqual(2);

        expect(isSuccessfulSearch).toEqual(true);
        expect(searchResponseData.numberOfMatches).toEqual(2);
        expect(searchResponseData.results).toEqual(["english", "english pt2"]);
        expect(searchError).toEqual({});
    });

    it("Retries a request up to 3 times before throwing an error", async () => {
        fetch.mockReject(new Error("A network error has occurred"));

        const { isSuccessfulSearch, searchResponseData, searchError } = await searchForCourses("history");

        expect(fetch.mock.calls.length).toEqual(4);

        expect(isSuccessfulSearch).toEqual(false);
        expect(searchResponseData.numberOfMatches).toEqual(0);
        expect(searchResponseData.results).toEqual([]);
        expect(searchError).toEqual({
            message: "Failed to fetch results from Courses API",
            searchUrl: "https://test.courses.api.com?search=history&max=20",
            details: "A network error has occurred",
        });
    });

    it("logs a warning to the console when retrying a request", async () => {
        fetch.mockReject(new Error("A network error has occurred"));

        await searchForCourses("physics");

        expect(fetch.mock.calls.length).toEqual(4);
        expect(logger.warn).toBeCalledTimes(3);

        expect(logger.warn).toBeCalledWith(
            expect.objectContaining({
                details: expect.objectContaining({
                    parameters: {
                        search: "physics",
                    },

                    searchUrl: "https://test.courses.api.com?search=physics&max=20",
                }),
            }),
            "Request failed, retrying"
        );
        expect(logger.warn).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({ details: expect.objectContaining({ attempt: 0 }) }),
            "Request failed, retrying"
        );
        expect(logger.warn).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({ details: expect.objectContaining({ attempt: 1 }) }),
            "Request failed, retrying"
        );
        expect(logger.warn).toHaveBeenNthCalledWith(
            3,
            expect.objectContaining({ details: expect.objectContaining({ attempt: 2 }) }),
            "Request failed, retrying"
        );
    });
});
