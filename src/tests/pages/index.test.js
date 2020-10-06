import { render, screen, within } from "@testing-library/react";
import App, { getServerSideProps } from "../../pages";

beforeEach(() => {
    fetch.resetMocks();
});

describe("App", () => {
    it("displays an appropriate page heading", () => {
        render(<App />);

        expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
    });

    it("displays the search element", () => {
        render(<App />);

        expect(screen.getByRole("search", { name: "Courses" })).toBeVisible();
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
