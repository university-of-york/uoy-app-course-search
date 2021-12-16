import PropTypes from "prop-types";

const COURSE_MODEL = PropTypes.shape({
    ucasCode: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    liveUrl: PropTypes.string.isRequired,
    award: PropTypes.string.isRequired,
    yearOfEntry: PropTypes.string.isRequired,
    inClearingOnlyHome: PropTypes.bool,
    inClearingOnlyInternational: PropTypes.bool,
    inAdjustmentOnlyHome: PropTypes.bool,
    inAdjustmentOnlyInternational: PropTypes.bool,
});

export { COURSE_MODEL };
