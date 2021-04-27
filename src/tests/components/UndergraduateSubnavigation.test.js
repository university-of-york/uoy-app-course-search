import { render } from "@testing-library/react";
import { UndergraduateSubnavigation } from "../../components/UndergraduateSubnavigation";

describe("UndergraduateSubnavigation", () => {
    it("renders as expected", () => {
        const { asFragment } = render(<UndergraduateSubnavigation />);

        expect(asFragment()).toMatchSnapshot();
    });
});
