import { render, screen, within } from "@testing-library/react";

import React from "react";
import { CourseDetails } from "../../components/CourseDetails";

describe("TagList", () => {
    it("displays tags labelled with given inputs", () => {
        render(<CourseDetails course={{}} />);

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("example");
        expect(within(tags[0]).getByTestId("tag-icon")).toHaveClass("c-icon--twitter");
    });
});
