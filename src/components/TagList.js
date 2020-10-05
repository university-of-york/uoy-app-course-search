import React from "react";

const TagList = ({ items }) => {
    return (
        <ul>
            {items.map((item) => (
                <Tag key={item} name={item} />
            ))}
        </ul>
    );
};

const Tag = ({ name }) => (
    <li aria-labelledby={`${name}-tag`}>
        <span id={`${name}-tag`}>{name}</span>
    </li>
);

export { TagList };
