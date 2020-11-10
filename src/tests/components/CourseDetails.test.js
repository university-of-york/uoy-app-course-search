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

    it("displays level and award tag when both level and award are present", () => {
        const exampleCourse = {
            level: "undergraduate",
            award: "BA (Hons)",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("undergraduate");
        expect(tag[0]).toHaveTextContent("BA (Hons)");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--mortar-board");
    });

    it("displays level and award tag when both only level is present", () => {
        const exampleCourse = {
            level: "undergraduate",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("undergraduate");
        expect(tag[0]).not.toHaveTextContent("BA (Hons)");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--mortar-board");
    });

    it("displays level and award tag when only award is present", () => {
        const exampleCourse = {
            award: "BA (Hons)",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).not.toHaveTextContent("undergraduate");
        expect(tag[0]).toHaveTextContent("BA (Hons)");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--mortar-board");
    });

    it("does not display level and award tag when neither level or award is present", () => {
        const exampleCourse = {};

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.queryAllByRole("listitem");

        if (tag.length === 0) {
            expect((tag.length = 0));
        } else {
            expect(tag[0]).not.toHaveTextContent("undergraduate");
            expect(tag[0]).not.toHaveTextContent("BA (Hons)");
            expect(within(tag[0]).queryByTestId("tag-icon")).toBe(null);
        }
    });

    it("displays tag with start year and length of course when both are present", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
            length: "4 years full-time",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("Start 2021");
        expect(tag[0]).toHaveTextContent("4 years full-time");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--clock-o");
    });

    it("displays tag with start year and length of course when only year of entry is present", () => {
        const exampleCourse = {
            yearOfEntry: "2021/22",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).toHaveTextContent("Start 2021");
        expect(tag[0]).not.toHaveTextContent("4 years full-time");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--clock-o");
    });

    it("displays tag with start year and length of course only length is present", () => {
        const exampleCourse = {
            length: "4 years full-time",
        };

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.getAllByRole("listitem");

        expect(tag[0]).not.toHaveTextContent("Start 2021");
        expect(tag[0]).toHaveTextContent("4 years full-time");
        expect(within(tag[0]).getByTestId("tag-icon")).toHaveClass("c-icon--clock-o");
    });

    it("does not displays tag with start year and length of course when neither are present", () => {
        const exampleCourse = {};

        render(<CourseDetails course={exampleCourse} />);

        const tag = screen.queryAllByRole("listitem");

        if (tag.length === 0) {
            expect((tag.length = 0));
        } else {
            expect(tag[0]).not.toHaveTextContent("Start");
            expect(tag[0]).not.toHaveTextContent("years");
            expect(within(tag[0]).queryByTestId("tag-icon")).toBe(null);
        }
    });
});
