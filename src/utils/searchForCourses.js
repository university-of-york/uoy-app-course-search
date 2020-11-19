const searchForCourses = async (searchTerm) => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=${searchTerm}&max=${process.env.COURSES_API_MAX_RESULTS}`;

    let isSuccessfulSearch;
    let searchResponseData;
    const defaultResponse = { numberOfMatches: 0, results: [] };

    try {
        const response = await fetch(courseSearchUrl);
        isSuccessfulSearch = response.ok;
        searchResponseData = isSuccessfulSearch ? await response.json() : defaultResponse;
    } catch {
        isSuccessfulSearch = false;
        searchResponseData = defaultResponse;
    }

    return { isSuccessfulSearch, searchResponseData };
};

export { searchForCourses };
