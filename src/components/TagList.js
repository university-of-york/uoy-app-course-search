import React from "react";
import PropTypes from "prop-types";

const TagList = (props) => {
    return <dl className="new-tag-list">{props.children}</dl>;
};

TagList.propTypes = {
    children: PropTypes.node,
};

export { TagList };
