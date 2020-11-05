const noSearchConducted = (searchTerm) => {
    return searchTerm === null || searchTerm === undefined;
};

const emptySearchConducted = (searchTerm) => {
    return searchTerm === "";
};

export { noSearchConducted, emptySearchConducted };
