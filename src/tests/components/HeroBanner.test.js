import { render } from "@testing-library/react";
import { HeroBanner } from "../../components/HeroBanner";

describe("HeroBanner", () => {
    it("renders as expected", () => {
        const children = <h2>Hi there</h2>;

        let banner = render(<HeroBanner>{children}</HeroBanner>);

        expect(banner).toMatchSnapshot();
    });
});
