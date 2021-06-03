import "../../public/stylesheets/styles.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import TagManager from "react-gtm-module";

// Required for Next to use a global stylesheet - see README
const CourseSearchApp = ({ Component, pageProps }) => {
    useEffect(() => {
        TagManager.initialize({ gtmId: "GTM-WXLX54" });
    }, []);
    return <Component {...pageProps} />;
};

CourseSearchApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};

export default CourseSearchApp;
