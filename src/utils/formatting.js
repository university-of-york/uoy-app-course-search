const sentenceCase = (string) => {
    if (!string) return null;

    const head = string.slice(0, 1);
    const tail = string.slice(1);

    return head.toUpperCase().concat(tail);
};

export { sentenceCase };
