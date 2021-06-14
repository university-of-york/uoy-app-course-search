import "../../public/stylesheets/styles.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import TagManager from "react-gtm-module";

const CourseSearchApp = ({ Component, pageProps }) => {
    useEffect(() => {
        // Enable Google Tag Manager with the university's GTM container ID
        TagManager.initialize({ gtmId: "GTM-WXLX54" });
    }, []);
    // Required for Next to use a global stylesheet
    return <Component {...pageProps} />;
};

CourseSearchApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};

export default CourseSearchApp;
