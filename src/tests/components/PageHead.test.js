import { pageTitle } from "../../components/PageHead";

describe("Page title", () => {
    it("Renders a standard title if no search term is entered", () => {
        expect(pageTitle(null)).toEqual("Course Search, University of York");
        expect(pageTitle("")).toEqual("Course Search, University of York");
    });

    it("Renders a dynamic title when a search term is entered", () => {
        const searchTerm = "Maths and stuff";

        expect(pageTitle(searchTerm)).toEqual("Course results for Maths and stuff, University of York");
    });
});
