import React from "react";
import PropTypes from 'prop-types';
import styles from './Course.module.css';
import {useRouter} from "next/router";

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
    course: PropTypes.shape({
        title: PropTypes.string,
        liveUrl: PropTypes.string,
    })
};

export {Course};
