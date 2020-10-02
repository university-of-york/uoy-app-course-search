const isProd = process.env.NODE_ENV === "production";

module.exports = {
    // Retrieve assets from the correct URL that accounts for the Stage when running in AWS API Gateway.
    assetPrefix: isProd ? "/v1" : "",
};
