import React from "react";

const TagList = ({ tags }) => {
    return (
        <ul>
            {tags.map((item) => {
                return (
                    <li key={item} aria-labelledby={`${item}-tag`}>
                        <span id={`${item}-tag`}>{item}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export { TagList };
