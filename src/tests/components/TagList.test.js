import { render, screen } from "@testing-library/react";
import { TagList } from "../../components/TagList";
import { Tag } from "../../components/Tag";
import React from "react";

describe("TagList", () => {
    it("displays tags labelled with given inputs", () => {
        render(
            <TagList>
                <Tag icon="clock" mainText="foo bar" />
                <Tag icon="key" mainText="fruit salad" />
            </TagList>
        );

        const items = screen.getAllByRole("listitem");
        const icons = screen.getAllByTestId("tag-icon");

        expect(items[0]).toHaveTextContent("foo bar");
        expect(items[0]).toContainElement(icons[0]);
        expect(icons[0]).toHaveClass("c-icon--clock");

        expect(items[1]).toHaveTextContent("fruit salad");
        expect(items[1]).toContainElement(icons[1]);
        expect(icons[1]).toHaveClass("c-icon--key");
    });

    it("displays no tags when given no inputs", () => {
        render(<TagList />);

        expect(screen.queryByRole("listitem")).toBeNull();
    });
});
