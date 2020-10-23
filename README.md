# Course Search

This is the University of York's Course Search application. It allows prospective students to search for courses,
view results, and follow links to course pages.

See our [GitHub Wiki](https://github.com/university-of-york/uoy-app-course-search/wiki) for architectural decisions and related developer guides.

**This project is a work-in-progress and search results may not meet expectations**

Live URL: https://courses.app.york.ac.uk/
Dev URL: https://courses.dev.app.york.ac.uk/

## Related Repos

- [Courses API](https://github.com/university-of-york/uoy-api-courses) - the API that provides Course Search functionality and in turn calls the Funnelback Courses API.
- [Funnelback Courses API](https://github.com/university-of-york/uoy-config-funnelback-courses) - the underlying Funnelback search provider configuration that powers searches.
- [Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components) - suite of React components for incorporating university style into the application.

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

#### Pattern Library dependency requires `.npmrc`

The application has a dependency on [ESG Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components).
Fetching this dependency requires the project to have appropriate credentials
for the `@university-of-york` Github registry configured. 
See the [Pattern Library README](https://github.com/university-of-york/esg-lib-pattern-library-react-components)
for instructions on setting up a `.npmrc` file for this. Without it, running
`npm install` may produce errors like:

```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@university-of-york%2fesg-lib-pattern-library-react-components - Not found
npm ERR! 404
npm ERR! 404  '@university-of-york/esg-lib-pattern-library-react-components@4.3.4' is not in the npm registry.
```

### Testing

Tests live in `src/tests`. To run them:

```
npm test
```

Or, in Intellij, open the `npm` window and double-click on `test`, or in package.json, click on the green arrow next to the "test": "jest" entry.

Tests are run automatically upon creation of a pull request, configured in `.github/workflows/checks.yml`, 
and upon a merge into `dev` or `main` branches on Github as part of `.github/workflows/deploy.yml`

### Deployment

Deployment to the development and production environments happen through GitHub actions that trigger automatically when 
new code is merged into the `dev` and `main` branches. 

### Domain setup

This application is automatically deployed to a custom domain by serverless and CloudFormation
if the environment is appropriately configured (by setting environment variables `DOMAIN_NAME`
and `SSL_CERTIFICATE_ARN`). For local sandbox development, you are unlikely to need to use a
custom domain name, and therefore don't need to set these environment variables. For `dev` and 
`production` environments, these environment variables are populated as part of the CI/CD 
pipeline in `.github/workflows/deploy.yml`, though the sensitive values are stored securely 
in the `Secrets` section of the GitHub repo settings.

Provided that the [SSL certificate has been provisioned beforehand](https://github.com/university-of-york/uoy-app-course-search/wiki/Creating-and-Validating-an-SSL-Certificate-in-AWS),
serverless will do all the work necessary to set up the environment, as detailed in `serverless.yml`. This involves setting up a custom domain name
in API Gateway and mapping this to the API endpoint that serves our Next.js application. 

### Development and production environments

Development environment variables are configured in `.env.development` and production
environment variables are configured in `.env.production`. 
The CI/CD pipeline is configured so that pushes to the `dev` branch will trigger a
deployment to the ESG development AWS account using development environment variables,
and pushes to the `main` branch will trigger a deployment to the ESG production AWS account
using production environment variables.

For local development, environment variables can be overridden by creating 
`.env.development.local` and `.env.production.local`. These files will be ignored by Git.

#### Switching between development and production Courses API

This application fetches course data using the [Courses API](https://github.com/university-of-york/uoy-api-courses).
Its URL is configured as an environment variable so that each deployment can use 
the appropriate Courses API version. The development and production versions of 
Course Search use the development and production versions of the Courses API respectively. 

##### Local development

When running Course Search locally using `npm run dev`, development environment variables
will be used. To switch between development and
production Courses API, create a file `.env.development.local` and add the production
Courses API URL to it.

##### Developer AWS sandbox

When running Course Search in your AWS sandbox, use `npm run deploy` to deploy using
production environment variables (and therefore the production Courses API), and 
`npm run deploy:dev` to deploy using development environment variables (and
 therefore the development Courses API).

##### courses.dev.app.york.ac.uk

To change the development version of Course Search so that it uses the production version
of the Courses API
* checkout the `dev` branch of Course Search
* log in to AWS using `saml2aws`
* select the ESG Dev write user
* run `npm run deploy`

To change it back to using the development version of the Courses API, run `npm run deploy:dev`.

### Code style

The project defines rules for code formatting and style. Code is checked against these
rules upon creation of a pull request, configured in `.github/workflows/checks.yml`, 
and upon a merge into `dev` or `main` branches on Github as part of `.github/workflows/deploy.yml`

#### Formatting

This project uses [prettier](https://prettier.io/) to format code and to check that code
is correctly formatted. Overrides to its default formatting rules are agreed by the team and
configured in `.prettierrc.json` in the root folder. You can use `npm run format` to format
all code in the project.

##### Intellij

You can configure Intellij to format code, using `prettier`, when you save a file and when 
you run Intellij's formatting command (`Ctrl-Alt-L`). To do this:
* install the `prettier` plugin (under `File` > `Settings` > `Plugins`)
* go to `File` > `Settings` > `Languages & Frameworks` > `Javascript` > `Prettier` and
check the options `on save` and `on code reformat`

To make Intellij use the `prettier` formatting rules while you edit code, open
`package.json` and above the code window it will prompt you to `Use code style based on prettier for this project?`
which you can accept.

#### Linting

This project uses [XO](https://github.com/xojs/xo) to check code style. 
XO is based on [ESLint](https://eslint.org/). Overrides to default linting rules are agreed
by the team and configured in `.xo-config.json` in the root folder. You can use `npm run lint`
to check whether the code conforms to the linting rules.

### Useful commands

**`npm run dev`**

Start the application locally (running at http://localhost:3000 by default).

**`npm run build`**

Build the application. The build folder is `.next`.

**`npm run start`**

Start the application that has been built. This will use the code in the `.next` folder rather than the current source code.

**`npm run deploy`**

Deploy the application to AWS. To deploy to your AWS sandbox, you will need to 
* be logged in to AWS using [saml2aws](https://wiki.york.ac.uk/display/AWS/2.+Command+Line+Access)
* have defined an environment variable called `AWS_ACCOUNT_ID` with the account id of your sandbox:

```
set AWS_ACCOUNT_ID=012345678
```

You can find your sandbox AWS account id by logging in to AWS either via
the web console or via saml2aws - it is displayed when you select which
account you want to use.

This will deploy the app using production environment variables (configured in
`.env.production`).

**`npm run deploy:dev`**

As above, but will use development environment variables (configured in `.env.development`).

**`npm run undeploy`**

Remove the application from AWS.

**`npm run test`**

Run the application's tests.

**`npm run format`**

Format all code using the team's agreed formatting rules. This uses `prettier`.

**`npm run checkformat`**

Check all code is correctly formatted according to agreed rules. Uses `prettier`.

**`npm run lint`**

Check to see if code meets the team's agreed coding standards. This uses `XO` (which in turn uses `eslint`).

**`npm run check`**

Checks code formatting (`prettier`), checks coding standards (`XO`), then runs tests.

**`npm run formatandcheck`**

Fixes code formatting (`prettier`), checks coding standards (`XO`), then runs tests.

## TroubleShooting

### Logs
Logs for the application can be found in CloudWatch. As an ESG AWS user for the relevant environment, open CloudWatch from the AWS Management console and click on `Log groups`. The group name is `/aws/lambda/uoy-app-course-search-v1-server`.

This is the place to check if the application is experiencing weird errors, for example 
```
{
message: "Internal server error"
}
```
instead of a next error page or suspicious errors with nothing in the console.

## Automated BugFixes (Dependabot)
We have experienced issues with Dependabot updates breaking the application in the past. Before merging in an automated security 
PR/Dependabot PR we should check out and deploy the code to a sandbox account, to ensure there aren't any breaking changes.

## Accessibility

The application's linting process checks for conformance to accessibility standards
using [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

## Contact

- [Digital Platforms and Developments Team](mailto:marketing-support@york.ac.uk)
- [Enterprise Systems Teaching and Learning Team](mailto:esg-teaching-and-learning-group@york.ac.uk)

## Licence

MIT
