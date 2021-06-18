# Course Search (not yet released)

[![build](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/build.yml/badge.svg)](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/build.yml)
[![tests](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/tests.yml/badge.svg)](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/tests.yml)
[![code formatting](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/code-formatting.yml/badge.svg)](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/code-formatting.yml)
[![linting](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/linting.yml/badge.svg)](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/linting.yml)
[![performance checks](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/performance-checks.yml/badge.svg)](https://github.com/university-of-york/uoy-app-course-search/actions/workflows/performance-checks.yml)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/ad91c322/uoy-app-course-search)
[![GitHub](https://img.shields.io/github/license/university-of-york/uoy-app-course-search?color=blue)](https://github.com/university-of-york/uoy-app-course-search/blob/update-status-badges/LICENSE)

This is the University of York's Course Search application. It allows prospective students to search for courses,
view results, and follow links to course pages. 
Both a [live system](https://courses.app.york.ac.uk/) and a [test system](https://courses.dev.app.york.ac.uk/) are available.

See the [wiki](https://github.com/university-of-york/uoy-app-course-search/wiki) for architectural decisions and developer guides.

## Related repositories

- [Courses API](https://github.com/university-of-york/uoy-api-courses) - the API that provides Course Search functionality and in turn calls the Funnelback Courses API.
- [Funnelback Courses API](https://github.com/university-of-york/uoy-config-funnelback-courses) - the underlying Funnelback search provider configuration that powers searches.
- [Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components) - a suite of React components for incorporating university style into the application.

## Dependencies

 - You will need [Node.js](https://nodejs.org/en/download/) (v12) installed on your machine.
 - You will need to have configured a `.npmrc` file with a GitHub token that has read access to packages from [Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components).

## Development

This application uses [Next.js](https://nextjs.org/). The entry point for the application is `src/pages/index.js`.

To build and run the application:

```
npm run dev
```

Once started, the system is accessible at [http://localhost:3000](http://localhost:3000).

## Tests

Automated tests live in `src/tests`. To run them:

```
npm test
```

### Visual tests

We use [Percy](https://percy.io/ad91c322/uoy-app-course-search) for visual testing. This adds snapshots of UI changes to each pull request.

### Performance tests

We use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to run performance tests against the application on each new build and pull request. Performance scores below 85 are marked as a failing build.

### Accessibility tests

We use the [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) to perform basic accessibility checks. We also run manual accessibility tests against the application, including testing with users of assistive technologies.

To reinforce an accessibility-first approach, we use ARIA roles and reference these in automated tests where possible.

### Functional tests

We use [Cypress](https://www.cypress.io) for functional tests. To execute them

1. start the application locally
2. run `npx cypress run`

Note that we have had problems running Cypress tests using Windows Subsystem for Linux. The workaround for this has been to run the tests using Node on Windows.

## Code formatting and linting

This project uses [Prettier](https://prettier.io/) for code formatting and [XO](https://github.com/xojs/xo) for linting. To format the code and run these checks:

```
npm run fc
```

## Deployment

Deployment to the development and production environments happens through GitHub actions that trigger automatically when new code is merged into the `dev` and `main` branches. See the [deployment wiki page](https://github.com/university-of-york/uoy-app-course-search/wiki/Deployment) for more details.

### Deploying to your own AWS account

You can run Course Search in your own AWS account. You will need to do the following:

- Make sure you've got an active token under `~/.aws/credentials` (e.g. by logging into your account with `saml2aws`)
- Define an environment variable called `AWS_ACCOUNT_ID` populated with your AWS account ID
   
Then run one of the following, depending on whether you want to query the development or production version of the Courses API:

```
npm run deploy:dev
npm run deploy
```

To undeploy the application from your AWS account:

```
npm run undeploy
```

## Contact

- [Digital Services Teaching and Learning Service Delivery Team](mailto:esg-teaching-and-learning-group@york.ac.uk)
