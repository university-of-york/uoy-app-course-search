import PropTypes from "prop-types";
import React from "react";

const RichTag = ({ topIcon, title, subText }) => (
    <li className="rich-tag">
        {topIcon && <i aria-hidden className={`c-icon c-icon--${topIcon} c-icon--2x`} data-testid="tag-icon" />}
        <p className="rich-tag__title">{title}</p>
        <p className="rich-tag__text">{subText}</p>
    </li>
);

RichTag.propTypes = {
    topIcon: PropTypes.string,
    title: PropTypes.string,
    subText: PropTypes.string,
};

export { RichTag };
