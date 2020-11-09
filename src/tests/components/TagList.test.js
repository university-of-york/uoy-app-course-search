import { render, screen, within } from "@testing-library/react";
import { TagList } from "../../components/TagList";
import { Tag } from "../../components/Tag";
import React from "react";

describe("TagList", () => {
    it("displays tags labelled with given inputs", () => {
        render(
            <TagList>
                <Tag topIcon="institution" title="foo bar" />
                <Tag topIcon="key" title="fruit salad" />
            </TagList>
        );

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("foo bar");
        expect(within(tags[0]).getByTestId("tag-icon")).toHaveClass("c-icon--institution");

        expect(tags[1]).toHaveTextContent("fruit salad");
        expect(within(tags[1]).getByTestId("tag-icon")).toHaveClass("c-icon--key");
    });
});
