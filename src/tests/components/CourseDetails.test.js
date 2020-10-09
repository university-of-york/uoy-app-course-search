import { render, screen, within } from "@testing-library/react";
import React from "react";
import { CourseDetails } from "../../components/CourseDetails";

describe("Course details", () => {
    it("displays award tag", () => {
        const exampleCourse = {
            award: "BA (Hons)",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("BA (Hons)");
        expect(within(tags[0]).getByTestId("tag-icon")).toHaveClass("c-icon--bank");
    });

    it("displays start date tag", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getByRole("listitem");

        expect(tag).toHaveTextContent("Starts 2021");
        expect(within(tag).getByTestId("tag-icon")).toHaveClass("c-icon--calendar");
    });

    it("works with no metadata", () => {
        const exampleCourse = {};

        render(<CourseDetails course={exampleCourse} />);

        const tagList = screen.getByRole("list"); // UL tags always have a role of list.

        expect(tagList).toBeEmptyDOMElement();
    });
});
