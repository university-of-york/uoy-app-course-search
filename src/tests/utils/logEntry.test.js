import MockDate from "mockdate";
import { logEntry } from "../../utils/logEntry";

const event = {
    method: "GET",
    headers: {
        Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "GB",
        Host: "k0fqbcuftg.execute-api.eu-west-1.amazonaws.com",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
        Via: "2.0 bf4a364e1dd23fe6634f1bf013457c5c.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "7Px4kURZfIuh4B09Wv6vM5cSpbVXaOv1pW6h0eBMnHPpsJVQ19QtuA==",
        "X-Amzn-Trace-Id": "Root=1-60a6734a-06f7e1dd276e8dc64be2d129",
        "X-Forwarded-For": "144.32.100.16, 130.176.97.157",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https",
    },
    statusCode: 200,
    requestContext: {
        identity: {
            sourceIp: "144.32.100.16",
        },
        apiId: "theApiId",
    },
};

const parameters = {
    search: "biology",
};

const details = {
    results: [],
};

const error = new Error("test error");

describe("Request Logging", () => {
    it("logs all relevant data when all is provided", () => {
        MockDate.set(new Date());

        expect(logEntry(event, parameters, details)).toEqual({
            clientIp: "144.32.100.16",
            parameters: {
                search: "biology",
            },
            details: { results: [] },
        });
    });

    it("puts nonexistent fields as null instead of skipping them", () => {
        const result = logEntry(null, parameters, null);

        expect(result.clientIp).toBeNull();
    });

    it("can log an error", () => {
        const result = logEntry(null, null, null, error);

        expect(result.error).toEqual(error);
    });

    it("can parse the http event to find an IP address", () => {
        const result = logEntry(event, null, null);

        expect(result.clientIp).toEqual("144.32.100.16");
    });

    it("returns clientIp as null with no http request", () => {
        const result = logEntry(null, parameters, details);

        expect(result.clientIp).toBeNull();
    });
});
