import "../../styles.css";
import PropTypes from "prop-types";

// Required for Next to use a global stylesheet - see README
const CourseSearchApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

CourseSearchApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};

export default CourseSearchApp;
