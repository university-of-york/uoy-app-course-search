import React from "react";
import styles from "./Course.module.scss";
import { COURSE_MODEL } from "../constants/CourseModel";

const Course = ({ course }) => {
    return (
        <a className={styles.course} href={course.liveUrl}>
            <h3>{course.title}</h3>
        </a>
    );
};

Course.propTypes = {
    course: COURSE_MODEL,
};

export { Course };
