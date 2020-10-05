import { render, screen } from "@testing-library/react";
import { TagList } from "../../components/TagList";
import React from "react";

describe("CourseSearchResults", () => {
    it("displays tags labelled with given inputs", () => {
        render(<TagList items={["foo", "bar"]} />);

        expect(screen.getByRole("listitem", { name: "foo" })).toBeInTheDocument();
        expect(screen.getByRole("listitem", { name: "bar" })).toBeInTheDocument();
    });
});
