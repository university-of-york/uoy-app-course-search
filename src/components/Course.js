import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { CourseDetails } from "./CourseDetails";

const Course = ({ course }) => {
    return (
        <li className="c-listings-item ">
            <a className="c-listings-item__link" href={course.liveUrl}>
                <h2 className="c-listings-item__title">{course.title}</h2>
            </a>
            <CourseDetails course={course} />
        </li>
    );
};

Course.propTypes = {
    course: COURSE_MODEL,
};

export { Course };
