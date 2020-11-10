import React from "react";
import PropTypes from "prop-types";

const TagList = (props) => {
    return <ul className="rich-tag-list">{props.children}</ul>;
};

TagList.propTypes = {
    children: PropTypes.node,
};

export { TagList };
