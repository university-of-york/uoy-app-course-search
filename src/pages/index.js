import PropTypes from "prop-types";
import { SearchFailedMessage } from "../components/SearchFailedMessage";

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
        searchResponseData = await response.json();
    } catch {
        isSuccessfulSearch = false;
    }

    return { props: { isSuccessfulSearch, searchResults: searchResponseData?.results } };
};

export { App as default, getServerSideProps };
