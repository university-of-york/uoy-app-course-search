import PropTypes from "prop-types";

const COURSE_MODEL = PropTypes.shape({
    length: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    liveUrl: PropTypes.string.isRequired,
    award: PropTypes.string.isRequired,
    yearOfEntry: PropTypes.string.isRequired,
    inClearingOnlyHome: PropTypes.boolean,
    inClearingOnlyInternational: PropTypes.boolean,
    inAdjustmentOnlyHome: PropTypes.boolean,
    inAdjustmentOnlyInternational: PropTypes.boolean,
});

export { COURSE_MODEL };
