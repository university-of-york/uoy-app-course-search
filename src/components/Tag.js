import PropTypes from "prop-types";
import React from "react";

const Tag = ({ icon, mainText }) => (
    <li className="c-tag-list__item">
        <span className="c-tag">
            <i aria-hidden className={`c-tag__icon c-icon c-icon--${icon}`} data-testid="tag-icon" />
            {mainText}
        </span>
    </li>
);

Tag.propTypes = {
    icon: PropTypes.string,
    mainText: PropTypes.string.isRequired,
};

export { Tag };
