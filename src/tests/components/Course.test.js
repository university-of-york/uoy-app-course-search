import { render, screen } from "@testing-library/react";
import { Course } from "../../components/Course";

describe("Course", () => {
    it("displays the course title and award", () => {
        const course = {
            title: "Mathematics",
            liveUrl: "",
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
});
