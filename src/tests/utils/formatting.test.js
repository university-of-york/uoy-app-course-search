import { sentenceCase } from "../../utils/formatting";

describe("sentenceCase", () => {
    it("Capitalises the first letter of the input string", async () => {
        expect(sentenceCase("undergraduate")).toEqual("Undergraduate");
    });
});
