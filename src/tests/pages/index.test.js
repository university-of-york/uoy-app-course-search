import { render, screen } from "@testing-library/react";
import App, { getServerSideProps } from "../../pages";

beforeEach(() => {
    fetch.resetMocks();
});

describe("App", () => {
    it("displays an appropriate page heading", () => {
        render(<App />);

        expect(screen.getByRole("heading", { name: "Course search results" })).toBeInTheDocument();
    });

    it("displays the titles from course search results", () => {
        const searchResults = [
            { title: "Maths", liveUrl: "http://foo.bar" },
            { title: "Physics", liveUrl: "http://foo.baz" },
        ];

        render(<App isSuccessfulSearch searchResults={searchResults} />);

        expect(screen.getByRole("link", { name: "Maths" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Physics" })).toBeInTheDocument();
    });

    it("displays an appropriate message when the course search failed", () => {
        render(<App isSuccessfulSearch={false} />);

        expect(screen.getByText(/Course search is currently unavailable. Please try again later/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact IT Support" })).toHaveAttribute(
            "href",
            "https://www.york.ac.uk/it-support/"
        );
    });
});

describe("getServerSideProps", () => {
    it("calls the Courses API and returns response in expected format", async () => {
        fetch.mockResponse(
            JSON.stringify({
                results: [
                    {
                        title: "Maths",
                    },
                ],
            })
        );

        const response = await getServerSideProps();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://test.courses.api.com?search=maths");
        expect(response).toEqual({
            props: {
                isSuccessfulSearch: true,
                searchResults: [
                    {
                        title: "Maths",
                    },
                ],
            },
        });
    });

    it("indicates when the Courses API search failed (http error response)", async () => {
        fetch.mockResponse("{}", { status: 500 });

        const response = await getServerSideProps();

        expect(response).toEqual({
            props: {
                isSuccessfulSearch: false,
                searchResults: [],
            },
        });
    });

    it("indicates when the Courses API search failed (network or other error)", async () => {
        fetch.mockReject(new Error("can not resolve host"));

        const response = await getServerSideProps();

        expect(response).toEqual({
            props: {
                isSuccessfulSearch: false,
                searchResults: [],
            },
        });
    });
});
