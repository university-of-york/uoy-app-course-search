import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";

const Course = ({ course }) => {
    return (
        <p>
            <a href={course.liveUrl}>{course.title}</a>
        </p>
    );
};

Course.propTypes = {
    course: COURSE_MODEL,
};

export { Course };
