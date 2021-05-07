import { render, screen, within } from "@testing-library/react";
import { Search } from "../../components/Search.js";

describe("Search", () => {
    it("displays a search input and button", () => {
        render(<Search />);

        const search = screen.getByRole("search", { name: "Courses" });

        expect(search).toBeVisible();

        const { getByRole } = within(search);

        expect(getByRole("textbox", { name: "Search" })).toBeVisible();
        expect(getByRole("button", { name: "Search" })).toBeVisible();
    });

    it("populates the search box with the search term", () => {
        render(<Search searchTerm="French" />);

        const { getByRole } = within(screen.getByRole("search", { name: "Courses" }));

        expect(getByRole("textbox", { name: "Search" }).value).toEqual("French");
    });
});
