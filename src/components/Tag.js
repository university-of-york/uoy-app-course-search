import PropTypes from "prop-types";
import React from "react";

const Tag = ({ icon, mainText, subText }) => (
    <li className="c-tag-list__item">
        <span className="new-tag">
            <i aria-hidden className={`new-tag__icon c-icon c-icon--${icon} c-icon--2x`} data-testid="tag-icon" />
            <h2 className="new_tag__text">{mainText}</h2>
            <p className="new_tag__text">{subText}</p>
        </span>{" "}
    </li>
);

Tag.propTypes = {
    icon: PropTypes.string,
    mainText: PropTypes.string.isRequired,
};

export { Tag };
