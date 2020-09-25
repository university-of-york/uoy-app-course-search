import PropTypes from "prop-types";

const App = (props) => {
    return (
        <>
            <h1>Course search results</h1>
            {props.isSuccessfulSearch || <SearchFailedMessage />}
            {props.searchResults?.map((course) => (
                <h2 key={course.liveUrl}>{course.title}</h2>
            ))}
        </>
    );
};

App.propTypes = {
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            liveUrl: PropTypes.string,
        })
    ),
    isSuccessfulSearch: PropTypes.bool,
};

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    let isSuccessfulSearch;
    let searchResponseData;
    try {
        const response = await fetch(courseSearchUrl);
        isSuccessfulSearch = response.ok;
        searchResponseData = isSuccessfulSearch ? await response.json() : { results: [] };
    } catch {
        isSuccessfulSearch = false;
        searchResponseData = { results: [] };
    }

    return { props: { isSuccessfulSearch, searchResults: searchResponseData?.results } };
};

const SearchFailedMessage = () => (
    <div className="c-alert c-alert--warning">
        <div className="c-alert__content">
            Course search is currently unavailable. Please try again later, or{" "}
            <a href="https://www.york.ac.uk/it-support/">contact IT Support</a>.
        </div>
    </div>
);

export { App as default, getServerSideProps };
