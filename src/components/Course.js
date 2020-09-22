import React from "react";
import styles from './Course.module.css';
import {useRouter} from "next/router";
import {COURSE_MODEL} from "../constants/CourseModel";

const Course = ({course, router = useRouter()}) => {

    const goToCoursePage = event => {
        event.preventDefault;
        router.push(course.liveUrl);
    };

    return (
        <li className={styles.course} onClick={goToCoursePage}>
            <h3>{course.title}</h3>
        </li>
    );
};

Course.propTypes = {
    course: COURSE_MODEL
};

export {Course};
