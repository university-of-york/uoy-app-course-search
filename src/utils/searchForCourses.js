import { StatusCodes } from "http-status-codes";
import { logEntry } from "./logEntry";
import { LOG_TYPES } from "../constants/LogTypes";
import nodeFetch from "node-fetch";
import fetchRetry from "fetch-retry";

const fetch = fetchRetry(nodeFetch);

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_HTTP_CODES = new Set([
    StatusCodes.INTERNAL_SERVER_ERROR,
    StatusCodes.BAD_GATEWAY,
    StatusCodes.SERVICE_UNAVAILABLE,
    StatusCodes.GATEWAY_TIMEOUT,
]);

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
            retryOn: (attempt, error, response) => {
                if (attempt >= MAX_RETRY_ATTEMPTS) return false;

                if (error !== null || RETRY_HTTP_CODES.has(response?.status)) {
                    console.warn(
                        logEntry(undefined, LOG_TYPES.WARN, searchTerm, {
                            message: "Request failed, retrying",
                            searchUrl: courseSearchUrl,
                            attempt,
                            error: error?.message,
                            response: JSON.stringify(response),
                        })
                    );
                    return true;
                }
            },
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

export { searchForCourses };
