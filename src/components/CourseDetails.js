import React from "react";
import { COURSE_MODEL } from "../constants/CourseModel";
import { TagList } from "./TagList";
import { Tag } from "./Tag";

const CourseDetails = ({ course }) => {
    return (
        <TagList>
            <Tag icon="twitter" mainText="example" />
        </TagList>
    );
};

CourseDetails.propTypes = {
    course: COURSE_MODEL,
};

export { CourseDetails };
