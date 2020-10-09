import PropTypes from "prop-types";

const COURSE_MODEL = PropTypes.shape({
    title: PropTypes.string,
    liveUrl: PropTypes.string,
    award: PropTypes.string,
    yearOfEntry: PropTypes.string,
});

export { COURSE_MODEL };
