import nodeFetch from "node-fetch";
import fetchRetry from "fetch-retry";
import { logRetryWarning } from "./logEntry";

const fetch = fetchRetry(nodeFetch);

const searchForCourses = async (searchTerm) => {
    const courseSearchUrl =
        `${process.env.COURSES_API_BASEURL}/courses` +
        `?search=${encodeURI(searchTerm)}` +
        `&max=${process.env.COURSES_API_MAX_RESULTS}`;

    let isSuccessfulSearch;
    let searchResponseData = { numberOfMatches: 0, results: [] };
    let searchError = {
        message: "Failed to fetch results from Courses API",
        type: "SearchError",
        details: {
            searchUrl: courseSearchUrl,
        },
    };

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
            searchError.details.response = {
                status: response.status,
                statusText: response.statusText,
                body: await response.json(),
            };
        }
    } catch (error) {
        isSuccessfulSearch = false;
        searchError.message = error.message;
    }

    return { isSuccessfulSearch, searchResponseData, searchError };
};

const shouldRetry = (searchTerm, courseSearchUrl) => (attempt, error, response) => {
    const MAX_RETRY_ATTEMPTS = 3;

    if (attempt >= MAX_RETRY_ATTEMPTS) return false;

    if (error) {
        logRetryWarning(searchTerm, courseSearchUrl, attempt, error, response);
        return true;
    }

    return false;
};

export { searchForCourses };
