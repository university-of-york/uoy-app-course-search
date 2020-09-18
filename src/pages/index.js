const App = () => {
    return <h1>Hello World!</h1>; // application entry point - edit to start app development
};

const getServerSideProps = async () => {
    const courseSearchUrl = `${process.env.COURSES_API_BASEURL}?search=maths`;
    const response = await fetch(courseSearchUrl);
    const data = await response.json();

    return { props: { searchResults: data.results } };
};

export { getServerSideProps };
export default App;
