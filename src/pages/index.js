import PropTypes from "prop-types";

const App = (props) => {
    return (
        <>
            <h1>Course search results</h1>
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
};

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    let searchSuccess, searchResponseData;
    try {
        const response = await fetch(courseSearchUrl);
        searchSuccess = response.ok;
        searchResponseData = await response.json();
    } catch {
        searchSuccess = false;
    }

    return { props: { searchSuccess, searchResults: searchResponseData?.results } };
};

export { App as default, getServerSideProps };
