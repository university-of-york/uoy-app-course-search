import fetch from "node-fetch";

const getClearingCourses = async () => {
    const response = await fetch(`${process.env.COURSES_API_BASEURL}/clearing`);
    return response.json();
};

const addClearingData = (searchedCourses, clearingCourses) => {
    // We create a map storing key-value pairs (UCAS code / clearing data)
    // This allows us to query for a course's clearing data by UCAS code.
    const clearingsWithIndex = clearingCourses.reduce(
        (clearingsWithIndex, clearing) => clearingsWithIndex.set(clearing.ucasCode, clearing),
        new Map()
    );

    return searchedCourses.map((course) => {
        let clearing = clearingsWithIndex.get(course.ucasCode);
        if (clearing) {
            let courseAndClearing = course;
            courseAndClearing.inClearingOnlyHome = clearing.inClearingOnlyHome;
            courseAndClearing.inClearingOnlyInternational = clearing.inClearingOnlyInternational;
            courseAndClearing.inAdjustmentOnlyHome = clearing.inAdjustmentOnlyHome;
            courseAndClearing.inAdjustmentOnlyInternational = clearing.inAdjustmentOnlyInternational;
            return courseAndClearing;
        }
        return course;
    });
};

export { getClearingCourses, addClearingData };
