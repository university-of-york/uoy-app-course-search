import React from "react";
import styles from "./Course.module.scss";
import { COURSE_MODEL } from "../constants/model/CourseModel";

const Course = ({ course }) => {
    return (
        <li className={styles.course}>
            <a href={course.liveUrl}>{course.title}</a>
        </li>
    );
};

Course.propTypes = {
    course: COURSE_MODEL,
};

export { Course };
