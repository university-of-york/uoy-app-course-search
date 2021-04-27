import PropTypes from "prop-types";
import React from "react";

const GlobalNotice = ({ children }) => {
    if (children) {
        return <div className="c-global-notice c-global-notice--highlighted">{children}</div>;
    }

    return null;
};

GlobalNotice.propTypes = {
    children: PropTypes.node,
};

export { GlobalNotice };
