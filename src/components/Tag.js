import PropTypes from "prop-types";
import React from "react";

const Tag = ({ topIcon, title, subText }) => (
    <div className="new-tag" role="listitem">
        {topIcon && <i aria-hidden className={`c-icon c-icon--${topIcon} c-icon--2x`} data-testid="tag-icon" />}
        <dt className="new-tag__title">{title}</dt>
        <dd className="new-tag__text">{subText}</dd>
    </div>
);

Tag.propTypes = {
    topIcon: PropTypes.string,
    title: PropTypes.string,
    subText: PropTypes.string,
};

const ExtrasTag = ({ title, content }) => {
    const contents = content.map((item) => (
        <ExtrasTagContent key={item.text} icon={item.icon} label={item.text} fullWidth={title === null} />
    ));
    const tagClass = title ? "new-tag" : "new-tag new-tag--extras";

    return (
        <div className={tagClass} role="listitem">
            {title && <dt className="new-tag__title">{title}</dt>}
            {contents}
        </div>
    );
};

ExtrasTag.propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
};

const ExtrasTagContent = ({ icon, label }) => (
    <p className="new-tag__text new-tag__text--extras">
        {icon && (
            <span className="new-tag__icon">
                <i aria-hidden className={`c-icon c-icon--${icon} c-icon--1g`} data-testid={icon} />
            </span>
        )}
        {label}
    </p>
);

ExtrasTagContent.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
};

export { Tag, ExtrasTag };
