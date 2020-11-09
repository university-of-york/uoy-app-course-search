import { render, screen, within } from "@testing-library/react";
import React from "react";
import { CourseDetails } from "../../components/CourseDetails";

describe("Course details", () => {
    /* Commenting out the following test until the hard-coded extras tags are removed */
    /* it("works with no metadata", () => {
        const exampleCourse = {};

        render(<CourseDetails course={exampleCourse} />);

        const tagList = screen.getByRole("list"); // UL tags always have a role of list.

        expect(tagList).toBeEmptyDOMElement();
    });
    */

    it("displays award tag", () => {
        const exampleCourse = {
            level: "undergraduate",
            award: "BA (Hons)",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("BA (Hons)");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--mortar-board");
    });

    it("displays start date tag", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("Start 2021");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--clock-o");
    });

    it("displays tag with length of course", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
            length: "4 years full-time",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("4 years full-time");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--clock-o");
    });
});
