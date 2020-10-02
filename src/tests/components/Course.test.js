import { render, screen } from "@testing-library/react";
import { Course } from "../../components/Course";

describe("Course", () => {
    it("displays the course title", () => {
        const course = {
            title: "Mathematics",
            liveUrl: "",
        };

        render(<Course course={course} />);

        expect(screen.getByRole("link", { name: "Mathematics" })).toBeInTheDocument();
    });
});
