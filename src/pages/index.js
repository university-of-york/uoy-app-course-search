const App = (props) => {
    return (
        <>
            <h1>Course search results</h1>
            {props.searchResults?.map((course, index) => (
                <h2 key={index}>{course.title}</h2>
            ))}
        </>
    );
};

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    const response = await fetch(courseSearchUrl);
    const data = await response.json();

    return { props: { searchResults: data.results } };
};

export { App as default, getServerSideProps };
