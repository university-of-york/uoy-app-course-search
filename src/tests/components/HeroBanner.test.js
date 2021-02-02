import { getByText, render } from "@testing-library/react";
import { HeroBanner } from "../../components/HeroBanner";

describe("HeroBanner", () => {
    it("wraps content inside a hero banner", () => {
        const children = <h2>Hi there</h2>;

        render(<HeroBanner>{children}</HeroBanner>);

        const container = document.querySelector(".c-hero__banner");

        expect(getByText(container, "Hi there")).toBeInTheDocument();
    });
});
