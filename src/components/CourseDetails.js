import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <StartDateTag yearOfEntry={course.yearOfEntry} />
        </TagList>
    );
};

const StartDateTag = ({ yearOfEntry }) => {
    if (yearOfEntry) {
        return <Tag icon="calendar" mainText={`Starts ${yearOfEntry}`} />;
    }

    return null;
};

StartDateTag.propTypes = {
    yearOfEntry: PropTypes.string,
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

export { CourseDetails };
