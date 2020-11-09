import PropTypes from "prop-types";
import React from "react";
import {Icon} from "@university-of-york/esg-lib-pattern-library-react-components";

const Tag = ({ topIcon, title, subText }) => (
    <div className="new-tag">
        {topIcon && <i aria-hidden className={`c-icon c-icon--${topIcon} c-icon--2x`} data-testid="tag-icon" />}
        <dt className="new-tag__title">{title}</dt>
        <dd className="new-tag__text">{subText}</dd>
    </div>
);

Tag.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    subText: PropTypes.string,
};

const ExtrasTag = ({title, content}) => {
  const contents = content.map(item => (<ExtrasTagContent icon={item.icon} label={item.text} fullWidth={title == null} />));
  const uglyClassNameVariable = title ? "new-tag" : "new-tag new-tag--extras";


  return (
    <div className={uglyClassNameVariable}>
      {title && <dt className="new-tag__title">{title}</dt>}
      {contents}
    </div>
  );
};

const ExtrasTagContent = ({icon, label}) => (
    <p className={"new-tag__text new-tag__text--extras"}>
      {icon && <span className="new-tag__icon"><Icon behaviour={icon} /></span>} {label}
    </p>
)

export { Tag, ExtrasTag };
