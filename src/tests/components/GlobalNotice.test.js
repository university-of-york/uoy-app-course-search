import { render, screen } from "@testing-library/react";
import { GlobalNotice } from "../../components/GlobalNotice.js";

describe("GloablNotice", () => {
    it("renders child content as expected", () => {
        const children = <h2>This is a notice</h2>;

        const { asFragment } = render(<GlobalNotice>{children}</GlobalNotice>);

        expect(asFragment()).toMatchSnapshot();
    });

    it("does not render any content if no children are present", () => {
        render(<GlobalNotice />);

        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
});
