import PropTypes from "prop-types";
import React from "react";

const HeroBanner = ({ children }) => (
    <figure className="c-hero">
        <div className="c-hero__banner">
            <div className="o-wrapper">
                <div className="o-grid">
                    <div className="o-grid__row">
                        <div className="o-grid__box o-grid__box--full">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    </figure>
);

HeroBanner.propTypes = {
    children: PropTypes.node,
};

export { HeroBanner };
