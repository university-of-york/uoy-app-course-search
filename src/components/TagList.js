import React from "react";
import PropTypes from "prop-types";

const TagList = ({ items }) => {
    return (
        <ul>
            {items.map((item) => (
                <Tag key={item} name={item} />
            ))}
        </ul>
    );
};

TagList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
};

const Tag = ({ name }) => (
    <li aria-labelledby={`${name}-tag`}>
        <span id={`${name}-tag`}>{name}</span>
    </li>
);

Tag.propTypes = {
    name: PropTypes.string,
};

export { TagList };
