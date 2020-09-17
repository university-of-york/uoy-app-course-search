import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

// basic test to demonstrate how to get started with app testing
describe("App", () => {
    it("renders without crashing", () => {
        render(<App />);
        expect(screen.getByRole("heading", { name: "Hello World!" })).toBeInTheDocument();
    });
});
