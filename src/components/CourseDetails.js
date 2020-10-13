import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <AwardTag award={course.award} />
            <StartDateTag yearOfEntry={course.yearOfEntry} />
            <LengthCourseTag length={course.length} />
        </TagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

const AwardTag = ({ award }) => {
    if (award) {
        return <Tag icon="university" mainText={award} />;
    }

    return null;
};

AwardTag.propTypes = {
    award: PropTypes.string,
};

const StartDateTag = ({ yearOfEntry }) => {
    if (yearOfEntry) {
        const startYear = yearOfEntry.slice(0, 4);
        return <Tag icon="calendar" mainText={`Starts ${startYear}`} />;
    }

    return null;
};

StartDateTag.propTypes = {
    yearOfEntry: PropTypes.string,
};

const LengthCourseTag = ({ length }) => {
    if (length) {
        return <Tag icon="clock-o" mainText={length} />;
    }

    return null;
};

LengthCourseTag.propTypes = {
    length: PropTypes.string,
};

export { CourseDetails };
