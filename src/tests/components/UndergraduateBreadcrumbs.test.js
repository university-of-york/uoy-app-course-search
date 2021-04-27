import { render } from "@testing-library/react";
import { UndergraduateBreadcrumbs } from "../../components/UndergraduateBreadcrumbs";

describe("UndergraduateBreadcrumbs", () => {
    it("renders as expected", () => {
        const { asFragment } = render(<UndergraduateBreadcrumbs />);

        expect(asFragment()).toMatchSnapshot();
    });
});
