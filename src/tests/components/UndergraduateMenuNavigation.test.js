import { render } from "@testing-library/react";
import { UndergraduateMenuNavigation } from "../../components/UndergraduateMenuNavigation.js";

describe("UndergraduateMenuNavigation", () => {
    it("renders as expected", () => {
        const { asFragment } = render(<UndergraduateMenuNavigation />);

        expect(asFragment()).toMatchSnapshot();
    });
});
