const sls = require("serverless-http");
const binaryMimeTypes = require("./binaryMimeTypes");
const server = require("./server");

const handler = sls(server, {
    binary: binaryMimeTypes,
});

module.exports.server = async (event, context) => {
    console.log("Test");

    return await handler(event, context);
};
