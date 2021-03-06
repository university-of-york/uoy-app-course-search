import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { RichTagList } from "./RichTagList";
import { RichTag } from "./RichTag";
import { sentenceCase } from "../utils/formatting";
import PropTypes from "prop-types";

const CourseDetails = ({ course }) => {
    return (
        <RichTagList>
            <LevelAndAwardTag level={course.level} award={course.award} />
            <StartDateAndLengthTag yearOfEntry={course.yearOfEntry} length={course.length} />
        </RichTagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

const LevelAndAwardTag = ({ level, award }) => {
    if (level || award) {
        return <RichTag topIcon="mortar-board" title={sentenceCase(level)} subText={award} />;
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
        return <RichTag topIcon="calendar" title={startYear} subText={length} />;
    }

    return null;
};

StartDateAndLengthTag.propTypes = {
    yearOfEntry: PropTypes.string,
    length: PropTypes.string,
};

export { CourseDetails };
