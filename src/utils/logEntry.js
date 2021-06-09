/**
 *
 * @param {http.IncomingMessage} request
 * @param {String} logType
 * @param {Object} additionalDetails Added directly to the log
 */
const logEntry = (request, logType, additionalDetails) => {
    const getHeaderInfo = () => {
        const requestHeaders = request?.headers;

        const ipAddresses = requestHeaders ? requestHeaders["X-Forwarded-For"]?.split(",") : null;
        const previousIP = ipAddresses?.length > 0 ? ipAddresses[ipAddresses.length - 1].trim() : null;

        const sourcePort = requestHeaders ? requestHeaders["X-Forwarded-Port"] : null;
        return {
            previousIP,
            sourcePort,
        };
    };

    const headers = getHeaderInfo();

    return JSON.stringify({
        timestamp: new Date().toISOString(),
        ip: {
            client: request?.requestContext?.identity?.sourceIp || null,
            source: headers.previousIP || null,
            sourcePort: headers.sourcePort || null,
        },
        req: {
            user: null,
            service: "uoy-app-course-search",
        },
        correlationId: request?.requestContext?.apiId || null,
        self: {
            application: "uoy-app-course-search",
            type: request?.method || null,
            statusCode: request?.statusCode || null,
            version: "v1",
        },
        sensitive: false,
        schemaURI: "https://github.com/university-of-york/uoy-app-course-search",
        type: logType,
        queryStringParameters: request?.queryStringParameters,
        additionalDetails,
    });
};

export { logEntry };
