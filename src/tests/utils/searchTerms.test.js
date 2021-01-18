import { noSearchConducted, emptySearchConducted } from "../../utils/searchTerms";

describe("noSearchConducted", () => {
    it.each`
        description    | searchTerm
        ${"null"}      | ${null}
        ${"undefined"} | ${undefined}
    `("returns true when search terms are $description", ({ searchTerm }) => {
        expect(noSearchConducted(searchTerm)).toBe(true);
    });

    it.each`
        description    | searchTerm
        ${"empty"}     | ${""}
        ${"non-empty"} | ${"foobar"}
    `("returns false when search terms are $description", ({ searchTerm }) => {
        expect(noSearchConducted(searchTerm)).toBe(false);
    });
});

describe("emptySearchConducted", () => {
    it("returns true when search terms are empty", () => {
        expect(emptySearchConducted("")).toBe(true);
    });

    it.each`
        description    | searchTerm
        ${"null"}      | ${null}
        ${"undefined"} | ${undefined}
        ${"non-empty"} | ${"foobar"}
    `("returns false when search terms are $description", ({ searchTerm }) => {
        expect(emptySearchConducted(searchTerm)).toBe(false);
    });
});
