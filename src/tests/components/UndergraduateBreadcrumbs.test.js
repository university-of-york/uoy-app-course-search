import { render } from "@testing-library/react";
import { UndergraduateBreadcrumbs } from "../../components/UndergraduateBreadcrumbs.js";

describe("UndergraduateBreadcrumbs", () => {
    it("renders as expected", () => {
        const { asFragment } = render(<UndergraduateBreadcrumbs />);

        expect(asFragment()).toMatchSnapshot();
    });
});
