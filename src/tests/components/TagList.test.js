import { render, screen, within } from "@testing-library/react";
import { TagList } from "../../components/TagList";
import { ArrayTag, Tag } from "../../components/Tag";
import React from "react";

describe("TagList", () => {
    it("displays tags labelled with given inputs", () => {
        render(
            <TagList>
                <Tag topIcon="institution" title="foo bar" subText="something else" />
                <Tag topIcon="key" title="fruit salad" />
                <Tag topIcon="plane" title="" subText="hot pudding" />
            </TagList>
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

    it("displays extra tags as per inputs", () => {
        render(
            <TagList>
                <ArrayTag
                    title="Extras"
                    content={[
                        { icon: "suitcase", text: "year abroad" },
                        { icon: "plane", text: "year in industry" },
                        { icon: "mortar-board", text: "Distance Learning" },
                    ]}
                />
                <ArrayTag
                    title=""
                    content={[
                        { icon: "suitcase", text: "year abroad" },
                        { icon: "plane", text: "year in industry" },
                        { icon: "plane", text: "Distance Learning" },
                        { icon: "mortar-board", text: "Integrated Masters" },
                    ]}
                />
            </TagList>
        );

        const tags = screen.getAllByRole("listitem");

        expect(tags[0]).toHaveTextContent("Extras");
        expect(tags[0]).toHaveTextContent("year abroad");
        expect(tags[0]).toHaveTextContent("year in industry");
        expect(within(tags[0]).getByTestId("suitcase")).toHaveClass("c-icon--suitcase");
        expect(within(tags[0]).getByTestId("plane")).toHaveClass("c-icon--plane");
        expect(within(tags[0]).getByTestId("mortar-board")).toHaveClass("c-icon--mortar-board");

        expect(tags[4]).not.toHaveTextContent("Extras");
        expect(tags[4]).toHaveTextContent("year abroad");
        expect(tags[4]).toHaveTextContent("year in industry");
        expect(tags[4]).toHaveTextContent("Distance Learning");
        expect(tags[4]).toHaveTextContent("Integrated Masters");
        expect(within(tags[4]).getByTestId("suitcase")).toHaveClass("c-icon--suitcase");
        expect(within(tags[4]).getByTestId("mortar-board")).toHaveClass("c-icon--mortar-board");
        const planes = within(tags[4]).getAllByTestId("plane");
        expect((planes.length = 2));
    });
});
