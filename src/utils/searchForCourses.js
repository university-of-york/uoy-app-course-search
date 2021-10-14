import nodeFetch from "node-fetch";
import fetchRetry from "fetch-retry";
import { logRetryWarning } from "./logEntry";

const fetch = fetchRetry(nodeFetch);

const searchForCourses = async (searchTerm) => {
    const courseSearchUrl =
        process.env.COURSES_API_BASEURL +
        `?search=${encodeURI(searchTerm)}` +
        `&max=${process.env.COURSES_API_MAX_RESULTS}`;

    let isSuccessfulSearch;
    let searchResponseData = { numberOfMatches: 0, results: [] };
    let searchError = { message: "Failed to fetch results from Courses API", searchUrl: courseSearchUrl };

    try {
        const response = await fetch(courseSearchUrl, {
            retryDelay: 1000,
            retryOn: shouldRetry(searchTerm, courseSearchUrl),
        });

        isSuccessfulSearch = response.ok;
        if (isSuccessfulSearch) {
            searchResponseData = await response.json();
            searchError = {};
        } else {
            searchError.response = {
                status: response.status,
                statusText: response.statusText,
                body: await response.json(),
            };
        }
    } catch (error) {
        isSuccessfulSearch = false;
        searchError.details = error.message;
    }

    return { isSuccessfulSearch, searchResponseData, searchError };
};

const MAX_RETRY_ATTEMPTS = 3;

const shouldRetry = (searchTerm, courseSearchUrl) => (attempt, error, response) => {
    if (attempt >= MAX_RETRY_ATTEMPTS) return false;

    if (error !== null) {
        logRetryWarning(searchTerm, courseSearchUrl, attempt, error, response);
        return true;
    }
};

export { searchForCourses };
