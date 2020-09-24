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

        render(<App searchResults={searchResults} />);

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
                searchResults: [
                    {
                        title: "Maths",
                    },
                ],
            },
        });
    });
});
