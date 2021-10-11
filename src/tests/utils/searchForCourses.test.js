import { searchForCourses } from "../../utils/searchForCourses";

beforeEach(() => {
    fetch.resetMocks();
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
});
