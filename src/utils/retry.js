import { StatusCodes } from "http-status-codes";
import { logEntry } from "./logEntry";
import { LOG_TYPES } from "../constants/LogTypes";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_HTTP_CODES = new Set([
    StatusCodes.INTERNAL_SERVER_ERROR,
    StatusCodes.BAD_GATEWAY,
    StatusCodes.SERVICE_UNAVAILABLE,
    StatusCodes.GATEWAY_TIMEOUT,
]);

const retryOn = (searchTerm, courseSearchUrl) => (attempt, error, response) => {
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
};

export { retryOn };
