import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";

const PageHead = ({ search }) => {
    return (
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="University of York" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="University of York Course search" />

            <title>{pageTitle(search)}</title>

            <link rel="shortcut icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />
            <link rel="stylesheet" href="https://www.york.ac.uk/static/stable/css/styles.min.css" media="screen" />

            <script src="https://www.york.ac.uk/static/stable/js/modernizr.min.js" />
            <script src="https://www.york.ac.uk/static/stable/js/app.min.js" />

            <script src="//use.typekit.net/dvj8rpp.js" />
            <script language="application/javascript">Typekit.load();</script>
        </Head>
    );
};

PageHead.propTypes = {
    search: PropTypes.string,
};

const pageTitle = (searchTerm) =>
    searchTerm ? `Course results for ${searchTerm}, University of York` : "Course Search, University of York";

pageTitle.propTypes = {
    search: PropTypes.string,
};

export { PageHead, pageTitle };
