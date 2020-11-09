import PropTypes from "prop-types";
import React from "react";

const Tag = ({ topIcon, mainText, subText }) => (
    <div className="new-tag">
        <TopIcon icon={topIcon} />
        <dt className="new_tag__title">{mainText}</dt>
        <dd className="new_tag__text">{subText}</dd>
    </div>
);

Tag.propTypes = {
    icon: PropTypes.string,
    mainText: PropTypes.string.isRequired,
    subText: PropTypes.string,
};

const TopIcon = ({ icon }) => {
    if (icon) {
        return <i aria-hidden className={`c-icon c-icon--${icon} c-icon--2x`} data-testid="tag-icon" />;
    }

    return null;
};

export { Tag };
