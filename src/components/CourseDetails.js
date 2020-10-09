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
        </TagList>
    );
};

const AwardTag = ({ award }) => {
    if (award) {
        return <Tag icon="bank" mainText={award} />;
    }

    return null;
};

const StartDateTag = ({ yearOfEntry }) => {
    if (yearOfEntry) {
        const startYear = yearOfEntry.slice(0, 4);
        return <Tag icon="calendar" mainText={`Starts ${startYear}`} />;
    }

    return null;
};

AwardTag.propTypes = {
    award: PropTypes.string,
};

StartDateTag.propTypes = {
    yearOfEntry: PropTypes.string,
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

export { CourseDetails };
