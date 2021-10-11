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
        fetch.mockResponse("{}", { status: 500 });

        const { isSuccessfulSearch, searchResponseData } = await searchForCourses("english");

        expect(isSuccessfulSearch).toEqual(false);
        expect(searchResponseData.numberOfMatches).toEqual(0);
        expect(searchResponseData.results).toEqual([]);
    });

    it("indicates when the Courses API search failed (network or other error)", async () => {
        fetch.mockReject(new Error("can not resolve host"));

        const { isSuccessfulSearch, searchResponseData } = await searchForCourses("english");

        expect(isSuccessfulSearch).toEqual(false);
        expect(searchResponseData.numberOfMatches).toEqual(0);
        expect(searchResponseData.results).toEqual([]);
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
});
