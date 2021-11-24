import { getClientIp } from "request-ip";
import { logger } from "./logger";

/**
 *
 * @param {http.IncomingMessage} request
 * @param {Object} parameters
 * @param {Object} details additionally added directly to the log
 * @param {Error} error
 */

const logEntry = (request, parameters, details, error) => {
    return {
        clientIp: request ? getClientIp(request) : null,
        parameters,
        details,
        error,
    };
};

/* eslint max-params: ["warn", 5] */
const logRetryWarning = (searchTerm, courseSearchUrl, attempt, error, response) => {
    logger.warn(
        logEntry(
            null,
            { search: searchTerm },
            {
                message: "Request failed, retrying",
                searchUrl: courseSearchUrl,
                attempt,
                response,
            },
            error
        )
    );
};

export { logEntry, logRetryWarning };
