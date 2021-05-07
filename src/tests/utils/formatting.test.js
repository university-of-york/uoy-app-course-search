import { sentenceCase } from "../../utils/formatting.js";

describe("sentenceCase", () => {
    it("Capitalises the first letter of the input string", async () => {
        expect(sentenceCase("undergraduate")).toEqual("Undergraduate");
    });

    it("Has no effect on a string already in sentence case", async () => {
        expect(sentenceCase("Undergraduate")).toEqual("Undergraduate");
    });

    it("Correctly handles a null input", async () => {
        expect(sentenceCase(null)).toEqual("");
    });

    it("Correctly handles an empty input", async () => {
        expect(sentenceCase("")).toEqual("");
    });

    it("Correctly cases a single character input", async () => {
        expect(sentenceCase("a")).toEqual("A");
    });

    it("Correctly cases a more complex string with spaces and hyphens", async () => {
        expect(sentenceCase("this is a complex-string with spaces and a hyphen")).toEqual(
            "This is a complex-string with spaces and a hyphen"
        );
    });
});
