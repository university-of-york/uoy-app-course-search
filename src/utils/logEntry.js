import { getClientIp } from "request-ip";
import { logger } from "./logger";

/**
 *
 * @param {http.IncomingMessage} request
 * @param {Object} parameters
 * @param {Object} details additionally added directly to the log
 * @param {Object} Application log format style error
 */

const logEntry = (request, parameters, details, error) => {
    const entry = {
        details,
        error,
    };

    if (!entry.details) entry.details = {};

    entry.details.clientIp = request ? getClientIp(request) : null;
    entry.details.parameters = parameters;

    return entry;
};

/* eslint max-params: ["warn", 5] */
const logRetryWarning = (searchTerm, courseSearchUrl, attempt, error, response) => {
    logger.warn(
        logEntry(
            null,
            { search: searchTerm },
            {
                searchUrl: courseSearchUrl,
                attempt,
                response,
            },
            error
        ),
        "Request failed, retrying"
    );
};

export { logEntry, logRetryWarning };
