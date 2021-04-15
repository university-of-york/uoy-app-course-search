// To run this script, install K6 locally
//     https://k6.io/docs/getting-started/installation/
// and then run the command
//     k6 run k6-load-test.js

import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus: 3, // number of virtual users
    duration: "5s", // duration of test
};

export default function main() {
    let response = http.get(
        "https://wwwtest.york.ac.uk/study-453/undergraduate/courses/search?q=english&level=undergraduate"
    );
    console.log(
        `Virtual user: ${__VU}  -  iteration: ${__ITER}\nResponse status: ${
            response.status
        }\nResponse headers: ${JSON.stringify(response.headers)}`
    );
    sleep(1);
}
