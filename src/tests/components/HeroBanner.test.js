import { render } from "@testing-library/react";
import { HeroBanner } from "../../components/HeroBanner.js";

describe("HeroBanner", () => {
    it("renders as expected", () => {
        const children = <h2>Hi there</h2>;

        const { asFragment } = render(<HeroBanner>{children}</HeroBanner>);

        expect(asFragment()).toMatchSnapshot();
    });
});
