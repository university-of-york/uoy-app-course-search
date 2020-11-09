import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <AwardTag level={course.level} award={course.award} />
            <StartDateAndLengthTag yearOfEntry={course.yearOfEntry} length={course.length} />
            <Tag mainText="Extras" subText="something something" />
        </TagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

const AwardTag = ({ level, award }) => {
    if (level) {
        return <Tag topIcon="mortar-board" mainText={level} subText={award} />;
    }

    return null;
};

AwardTag.propTypes = {
    award: PropTypes.string,
};

const StartDateAndLengthTag = ({ yearOfEntry, length }) => {
    if (yearOfEntry) {
        const startYear = yearOfEntry.slice(0, 4);
        return <Tag topIcon="clock-o" mainText={`Start ${startYear}`} subText={length} />;
    }

    return null;
};

StartDateAndLengthTag.propTypes = {
    yearOfEntry: PropTypes.string,
};

export { CourseDetails };
