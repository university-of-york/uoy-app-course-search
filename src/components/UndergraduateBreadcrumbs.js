const UndergraduateBreadcrumbs = () => {
    return (
        <nav aria-label="Breadcrumb" className="c-breadcrumb">
            <div className="c-breadcrumb__items">
                <a href="https://www.york.ac.uk">
                    <i className="c-icon c-icon--home" title="Home" />
                    <span className="c-icon__sr-text">Home</span>
                </a>
                <span className="c-breadcrumb__separator">&gt;</span>
                <a href="https://www.york.ac.uk/study/">Study at York</a>
                <span className="c-breadcrumb__separator">&gt;</span>
                <a href="https://www.york.ac.uk/study/undergraduate/">Undergraduate</a>
                <span className="c-breadcrumb__separator">&gt;</span>
                <a href="https://www.york.ac.uk/study/undergraduate/courses-2021/">Courses 2021/22</a>
            </div>
        </nav>
    );
};

export { UndergraduateBreadcrumbs };
