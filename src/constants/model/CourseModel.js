import PropTypes from "prop-types";

const COURSE_MODEL = PropTypes.shape({
    title: PropTypes.string,
    liveUrl: PropTypes.string,
    award: PropTypes.string,
    department: PropTypes.string,
    level: PropTypes.string,
    length: PropTypes.string,
    typicalOffer: PropTypes.string,
    yearOfEntry: PropTypes.string,
    distanceLearning: PropTypes.string, // This will be a boolean in the future
    summary: PropTypes.string,
    imageUrl: PropTypes.string,
    ucasCode: PropTypes.string,
});

export { COURSE_MODEL };
