import { render, screen, within } from "@testing-library/react";
import { RichTagList } from "../../components/RichTagList.js";
import { RichTag } from "../../components/RichTag.js";
import React from "react";

describe("TagList", () => {
    it("displays tags labelled with given inputs", () => {
        render(
            <RichTagList>
                <RichTag topIcon="institution" title="foo bar" subText="something else" />
                <RichTag topIcon="key" title="fruit salad" />
                <RichTag topIcon="plane" title="" subText="hot pudding" />
            </RichTagList>
        );

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("foo bar");
        expect(tags[0]).toHaveTextContent("something else");
        expect(within(tags[0]).getByTestId("tag-icon")).toHaveClass("c-icon--institution");

        expect(tags[1]).toHaveTextContent("fruit salad");
        expect(within(tags[1]).getByTestId("tag-icon")).toHaveClass("c-icon--key");

        expect(tags[2]).toHaveTextContent("hot pudding");
        expect(within(tags[2]).getByTestId("tag-icon")).toHaveClass("c-icon--plane");
    });
});
