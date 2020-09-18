import { render, screen } from "@testing-library/react";
import { App, getServerSideProps } from "../../pages";

beforeEach(() => {
    fetch.resetMocks();
});

// basic test to demonstrate how to get started with app testing
describe("App", () => {
    it("renders without crashing", () => {
        render(<App />);
        expect(screen.getByRole("heading", { name: "Hello World!" })).toBeInTheDocument();
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
