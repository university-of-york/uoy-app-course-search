import { render, screen, within } from "@testing-library/react";
import { Course } from "../../components/Course.js";

describe("Course", () => {
    it("displays the course title and award", () => {
        const course = {
            title: "Mathematics",
            liveUrl: "",
            level: "undergraduate",
            award: "BSc (Hons)",
        };

        render(<Course course={course} />);

        expect(screen.getByRole("heading", { name: "Mathematics - BSc (Hons)" })).toBeInTheDocument();
    });
    it("displays the course title when no award", () => {
        const course = {
            title: "Mathematics",
            liveUrl: "",
        };

        render(<Course course={course} />);

        expect(screen.getByRole("heading", { name: "Mathematics" })).toBeInTheDocument();
    });

    // This is one test as we are testing the link content, not the tags or title specifically
    it("wraps the course details in a link", async () => {
        const course = {
            title: "A Course",
            liveUrl: "https://fakecourse.notadomain/",
            level: "undergraduate",
            award: "Award",
        };

        render(<Course course={course} />);

        const link = screen.getByRole("link");

        expect(link.href).toEqual("https://fakecourse.notadomain/");
        expect(within(link).getByRole("heading", { name: "A Course - Award" })).toBeInTheDocument();
        expect(within(link).getByTestId("tag-icon")).toBeInTheDocument();
    });

    it("uses the course title plus award as the accessibility tree link name, when award is present", async () => {
        const course = {
            title: "A Course",
            liveUrl: "https://fakecourse.notadomain/",
            level: "undergraduate",
            award: "Award",
        };

        render(<Course course={course} />);

        expect(screen.getByRole("link", { name: "A Course - Award" })).toBeInTheDocument();
    });

    it("the accessibility tree link name is generated ok when award is not present", async () => {
        const course = {
            title: "A Course",
            liveUrl: "https://fakecourse.notadomain/",
            level: "undergraduate",
        };

        render(<Course course={course} />);

        expect(screen.getByRole("link", { name: "A Course" })).toBeInTheDocument();
    });
});
