import { getClientIp } from "request-ip";
import { logger } from "./logger";

/**
 *
 * @param {http.IncomingMessage} request
 * @param {Object} parameters
 * @param {Object} details addiotionaly added directly to the log
 * @param {Error} error
*/

const logEntry = (request, parameters, details, error) => {
    if (error) {
        return {
            clientIp: getClientIp(request),
            parameters: parameters,
            details: details,
            error: error,
        }
    }

    return {
        clientIp: getClientIp(request),
        parameters: parameters,
        details: details,
    };
};

/* eslint max-params: ["warn", 5] */
const logRetryWarning = (searchTerm, courseSearchUrl, attempt, error, response) => {
    logger.warn(
        logEntry(undefined, searchTerm, {
            message: "Request failed, retrying",
            searchUrl: courseSearchUrl,
            attempt,
            error: error?.message,
            response: response,
        })
    );
};

export { logEntry, logRetryWarning };
