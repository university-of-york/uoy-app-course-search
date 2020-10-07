import { render, screen } from "@testing-library/react";
import { Tag } from "../../components/Tag";
import React from "react";

describe("Tag", () => {
    it("displays tag containing given icon and text", () => {
        render(<Tag icon="battery-full" mainText="Battery is full" />);

        expect(screen.getByRole("listitem")).toHaveTextContent("Battery is full");
        expect(screen.getByRole("listitem")).toContainElement(screen.getByTestId("tag-icon"));
        expect(screen.getByTestId("tag-icon")).toHaveClass("c-icon--battery-full");
    });
});
