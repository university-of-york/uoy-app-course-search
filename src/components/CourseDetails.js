import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <LevelAndAwardTag level={course.level} award={course.award} />
            <StartDateAndLengthTag yearOfEntry={course.yearOfEntry} length={course.length} />
        </TagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

const LevelAndAwardTag = ({ level, award }) => {
    if (level || award) {
        return <Tag topIcon="mortar-board" title={level} subText={award} />;
    }

    return null;
};

LevelAndAwardTag.propTypes = {
    level: PropTypes.string,
    award: PropTypes.string,
};

const StartDateAndLengthTag = ({ yearOfEntry, length }) => {
    if (yearOfEntry || length) {
        const startYear = yearOfEntry ? `Start ${yearOfEntry.slice(0, 4)}` : null;
        return <Tag topIcon="clock-o" title={startYear} subText={length} />;
    }

    return null;
};

StartDateAndLengthTag.propTypes = {
    yearOfEntry: PropTypes.string,
    length: PropTypes.string,
};

export { CourseDetails };
