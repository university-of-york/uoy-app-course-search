import React from "react";
import ReactGA from "react-ga";

const GA_TRACKING_ID = "UA-149035954-1";

const initGA = (trackingId = GA_TRACKING_ID) => {
    console.debug("GA|Initialising");
    ReactGA.initialize(trackingId);
};

const logPageView = () => {
    if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
    }

    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    console.debug("GA|Pageview Sent: ", window.location.pathname);
};

export { logPageView };
