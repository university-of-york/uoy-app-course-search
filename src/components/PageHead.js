import Head from "next/head";
import React from "react";

const PageHead = () => {
    return (
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content="University of York" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="University of York Course search" />

            <title>Course search, University of York</title>

            <link rel="shortcut icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="https://www.york.ac.uk/static/stable/img/favicon.ico" />

            <script src="https://www.york.ac.uk/static/stable/js/modernizr.min.js" />
            <script src="https://www.york.ac.uk/static/stable/js/app.min.js" />

            <script src="//use.typekit.net/dvj8rpp.js" />
            <script language="application/javascript">Typekit.load();</script>
        </Head>
    );
};

export { PageHead };
