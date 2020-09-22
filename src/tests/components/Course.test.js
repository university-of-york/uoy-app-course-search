import {render, screen, fireEvent,  wait} from "@testing-library/react";
import { Course } from "../../components/Course";

describe("Course", () => {
    it("displays the course title", () => {
        const course = {
            title: 'Mathematics',
            liveUrl: ''
        }

        render(<Course course={course}/>);

        expect(screen.getByRole("heading", { name: "Mathematics" })).toBeInTheDocument();
    });

    it("clicking takes the user to the full course page", async () => {
        const courseUrl = 'www.google.com';

        const course = {
            title: 'Mathematics',
            liveUrl: courseUrl
        };

        let router = [];

        render(<Course course={course} router={router}/>);

        fireEvent.click(screen.getByRole('listitem'));

        expect(router).toContain(courseUrl);
    });
});
