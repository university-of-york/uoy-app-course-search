import { render, screen, within } from "@testing-library/react";
import { RichTag } from "../../components/RichTag";
import React from "react";

describe("Tag", () => {
    it("displays tag containing given icon and text", () => {
        render(<RichTag topIcon="battery-full" title="Battery is full" />);

        const tag = screen.getByRole("listitem");
        expect(tag).toHaveTextContent("Battery is full");
        expect(within(tag).getByTestId("tag-icon")).toHaveClass("c-icon--battery-full");
    });
});
