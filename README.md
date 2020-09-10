# Course Search

This is the frontend for the Course Search application. It allows
prospective students to search for courses at the University of York,
view results, and follow links to course pages.

## Related Repos

- [Courses API](https://github.com/university-of-york/uoy-api-courses) - the API that provides Course Search functionality and in turn calls the Funnelback Courses API.
- [Funnelback Courses API](https://github.com/university-of-york/uoy-config-funnelback-courses) - the underlying Funnelback search provider configuration that powers searches.

## Development

### Prerequisites

You will need [Node.js](https://nodejs.org/en/download/) (LTS version) installed on your machine.

### Local Development

This application uses [Next.js](https://nextjs.org/). The entry point 
for the application is `src/pages/index.js`. To run the
application locally in development mode using the command line:

```
npm run dev
```
                                                      
Alternatively, in Intellij, open the `npm` window (right click
on `package.json` and select `Show npm scripts`) and double-click on 
`dev`. 

Go to [http://localhost:3000](http://localhost:3000) 
to use the application.

To stop the application, on the command line press `ctrl-c`, or in
Intellij, press the square red `Stop` button. 

## Testing

Tests live in `src/tests`. To run them:

```
npm run test
```

Or, in Intellij, open the `npm` window and double-click on `test`.

## Contact

- [Digital Platforms and Developments Team](mailto:marketing-support@york.ac.uk)
- [Enterprise Systems Teaching and Learning Team](mailto:esg-teaching-and-learning-group@york.ac.uk)
