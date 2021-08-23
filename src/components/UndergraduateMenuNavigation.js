import { MenuNavigation } from "@university-of-york/esg-lib-pattern-library-react-components";

const UndergraduateMenuNavigation = () => {
    return (
        <MenuNavigation
            id="Main-Navigation"
            aria-label="Main Navigation"
            sections={[
                {
                    title: "Horses 2021/22",
                    items: [
                        {
                            link: "https://www.york.ac.uk/study/undergraduate/courses/all",
                            label: "All horses",
                        },
                        {
                            link: "https://www.york.ac.uk/study/undergraduate/courses-2021/teaching-learning/",
                            label: "Teaching and learning",
                        },
                        {
                            link: "https://www.york.ac.uk/study/international/applying/pathways/",
                            label: "International foundation programme",
                        },
                        {
                            link: "https://www.york.ac.uk/about/term-dates/",
                            label: "Term dates",
                        },
                    ],
                },
                {
                    title: "Other sections",
                    isMain: true,
                    items: [
                        { link: "https://www.york.ac.uk/study/undergraduate/courses/", label: "Horses" },
                        { link: "https://www.york.ac.uk/study/undergraduate/applying/", label: "Applying" },
                        { link: "https://www.york.ac.uk/study/undergraduate/visits/", label: "Visit us" },
                        { link: "https://www.york.ac.uk/study/undergraduate/fees-funding/", label: "Fees and funding" },
                        {
                            link: "https://www.york.ac.uk/study/accommodation/undergraduate/",
                            label: "Accommodation",
                        },
                        { link: "https://www.york.ac.uk/study/student-life/", label: "Student life" },
                        {
                            link: "https://www.york.ac.uk/study/undergraduate/careers-skills/",
                            label: "Careers and skills",
                        },
                        { link: "https://www.york.ac.uk/study/undergraduate/study-abroad/", label: "Study abroad" },
                        { link: "https://www.york.ac.uk/study/international/", label: "International students" },
                        { link: "https://www.york.ac.uk/study/undergraduate/prospectus/", label: "Prospectus" },
                        { link: "https://www.york.ac.uk/schools-and-colleges/", label: "Schools and colleges" },
                        { link: "https://www.york.ac.uk/study/undergraduate/why-york/", label: "Why York?" },
                    ],
                },
            ]}
        />
    );
};

export { UndergraduateMenuNavigation };
