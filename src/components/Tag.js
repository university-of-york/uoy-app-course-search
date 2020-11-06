import PropTypes from "prop-types";
import React from "react";
import { TagList } from "./TagList";

const Tag = ({ topIcon, mainText, subText }) => (
    <li className="c-tag-list__item">
        <span className="new-tag">
            <TopIcon icon={topIcon} />
            <p className="new_tag__title">{mainText}</p>
            <p className="new_tag__text">{subText}</p>
        </span>{" "}
    </li>
);

Tag.propTypes = {
    icon: PropTypes.string,
    mainText: PropTypes.string.isRequired,
    subText: PropTypes.string,
};

const TopIcon = ({ icon }) => {
    if (icon) {
        return <i aria-hidden className={`new-tag__icon c-icon c-icon--${icon} c-icon--2x`} data-testid="tag-icon" />;
    }

    return null;
};

export { Tag };
