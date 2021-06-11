const { applicationBasePath } = require("./src/constants/basePath");

module.exports = {
    basePath: applicationBasePath,
    redirects: async () => [
        {
            source: "/",
            destination: applicationBasePath,
            permanent: false,
            basePath: false,
        },
    ],
};
