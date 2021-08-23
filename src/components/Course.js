import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { CourseDetails } from "./CourseDetails";

const Course = ({ course }) => {
    const title = () => {
        if (course.award) {
            return `${course.title} - ${course.award}`;
        }

        return course.title;
    };

    const headingId = "course-title-" + title(course).replace(/ /g, "-");

    return (
        <li className="c-listings-item ">
            <a className="c-listings-item__link" aria-labelledby={headingId} href={course.liveUrl}>
                <h2 id={headingId} className="c-listings-item__title">
                    {title(course)}
                </h2>
                <div className="c-listings-item__description">
                    <img src="https://www.thesprucepets.com/thmb/KYaXBSM013GnZ2jEZJnX4a9oIsU=/3865x2174/smart/filters:no_upscale()/horse-galloping-in-grass-688899769-587673275f9b584db3a44cdf.jpg" />
                </div>
            </a>
        </li>
    );
};

Course.propTypes = {
    course: COURSE_MODEL,
};

export { Course };
