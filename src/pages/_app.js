import "../../styles.css";
import PropTypes from "prop-types";

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

MyApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};

export default MyApp;
