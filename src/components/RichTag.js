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

const ArrayTag = ({ title, content }) => {
    const contents = content.map((item) => (
        <ArrayTagContent key={item.text} icon={item.icon} label={item.text} fullWidth={title === null} />
    ));

    return (
        <li className="rich-tag">
            {title && <p className="rich-tag__title">{title}</p>}
            <ul className="c-icon--ul">{contents}</ul>
        </li>
    );
};

ArrayTag.propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
};

const ArrayTagContent = ({ icon, label }) => (
    <li className="rich-tag__text">
        {icon && <i aria-hidden className={`c-icon c-icon--${icon} c-icon--1g c-icon--li`} data-testid={icon} />}
        {label}
    </li>
);

ArrayTagContent.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
};

export { RichTag, ArrayTag };
