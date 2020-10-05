import React from "react";
import PropTypes from "prop-types";

const TagList = ({ items }) => {
    return (
        <ul className="c-tag-list">
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
    <li className="c-tag-list__item" aria-labelledby={`${name}-tag`}>
        <span className="c-tag" id={`${name}-tag`}>
            {name}
        </span>
    </li>
);

Tag.propTypes = {
    name: PropTypes.string,
};

export { TagList };
