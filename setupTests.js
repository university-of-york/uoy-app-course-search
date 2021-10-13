import "@testing-library/jest-dom/extend-expect";
import jestFetchMock from "jest-fetch-mock";

jestFetchMock.enableMocks();

// Mock out logging functions so that logging can be tested and
// also to suppress logs (particularly errors) from test output
console.info = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

// use 'dotenv' to load environment variables for test environment
// Next.js claims to have built-in support for .env.test
// (see https://nextjs.org/docs/basic-features/environment-variables#test-environment-variables)
// but this only works if you build the app before running the tests, which isn't practical
// (see https://github.com/vercel/next.js/discussions/16270)
require("dotenv").config({
    path: ".env.test",
});
