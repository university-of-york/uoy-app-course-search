import MockDate from "mockdate";
import { logEntry } from "../../utils/logEntry";
import { LOG_TYPES } from "../../constants/LogTypes";
import { StatusCodes } from "http-status-codes";

describe("Request Logging", () => {
    it("Logs all relevant data when all is provided", () => {
        MockDate.set(new Date());
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
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                Via: "2.0 bf4a364e1dd23fe6634f1bf013457c5c.cloudfront.net (CloudFront)",
                "X-Amz-Cf-Id": "7Px4kURZfIuh4B09Wv6vM5cSpbVXaOv1pW6h0eBMnHPpsJVQ19QtuA==",
                "X-Amzn-Trace-Id": "Root=1-60a6734a-06f7e1dd276e8dc64be2d129",
                "X-Forwarded-For": "144.32.90.155, 130.176.97.157",
                "X-Forwarded-Port": "443",
                "X-Forwarded-Proto": "https",
            },
            statusCode: 200,
            requestContext: {
                identity: {
                    sourceIp: "144.32.90.155",
                },
                apiId: "theApiId",
            },
        };

        const queryStringParameters = {
            search: "biology",
        };

        expect(logEntry(event, LOG_TYPES.AUDIT, queryStringParameters)).toEqual(
            JSON.stringify({
                timestamp: new Date().toISOString(),
                ip: {
                    client: "144.32.90.155",
                    source: "130.176.97.157",
                    sourcePort: "443",
                },
                req: {
                    user: null,
                    service: "uoy-app-course-search",
                },
                correlationId: "theApiId",
                self: {
                    application: "uoy-app-course-search",
                    type: "GET",
                    statusCode: StatusCodes.OK,
                    version: "v1",
                },
                sensitive: false,
                schemaURI: "https://github.com/university-of-york/uoy-app-course-search",
                type: "audit",
                queryStringParameters: {
                    search: "biology",
                },
            })
        );
    });

    it("Puts nonexistent fields as null instead of skipping them", () => {
        const event = {
            queryStringParameters: {
                search: "biology",
            },
        };

        const result = JSON.parse(logEntry(event, StatusCodes.OK, LOG_TYPES.AUDIT));

        expect(result.ip.client).toBeNull();
        expect(result.ip.source).toBeNull();
        expect(result.ip.sourcePort).toBeNull();
        expect(result.correlationId).toBeNull();
        expect(result.self.type).toBeNull();
    });
});
