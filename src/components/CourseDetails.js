import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <Tag icon="calendar" mainText={`Starts ${course.yearOfEntry}`} />
        </TagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

export { CourseDetails };
