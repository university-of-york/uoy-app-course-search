import { render, screen, within } from "@testing-library/react";
import React from "react";
import { CourseDetails } from "../../components/CourseDetails";

describe("TagList", () => {
    it("displays start date tag", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("Starts 2021/22");
        expect(within(tags[0]).getByTestId("tag-icon")).toHaveClass("c-icon--calendar");
    });
});
