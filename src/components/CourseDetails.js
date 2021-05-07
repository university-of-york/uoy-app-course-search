import React from "react";
import PropTypes from "prop-types";
import { COURSE_MODEL } from "../constants/CourseModel.js";
import { RichTagList } from "./RichTagList.js";
import { RichTag } from "./RichTag.js";
import { sentenceCase } from "../utils/formatting.js";

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
        return <RichTag topIcon="clock-o" title={startYear} subText={length} />;
    }

    return null;
};

StartDateAndLengthTag.propTypes = {
    yearOfEntry: PropTypes.string,
    length: PropTypes.string,
};

export { CourseDetails };
