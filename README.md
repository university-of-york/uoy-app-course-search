# Course Search (not yet released)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/ad91c322/uoy-app-course-search)

This is the University of York's Course Search application. It allows prospective students to search for courses,
view results, and follow links to course pages. 
Both the [live system](https://courses.app.york.ac.uk/) and a [test system](https://courses.dev.app.york.ac.uk/) are available.

## Related Repos

- [Courses API](https://github.com/university-of-york/uoy-api-courses) - the API that provides Course Search functionality and in turn calls the Funnelback Courses API.
- [Funnelback Courses API](https://github.com/university-of-york/uoy-config-funnelback-courses) - the underlying Funnelback search provider configuration that powers searches.
- [Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components) - suite of React components for incorporating university style into the application.


## Development

See the [wiki](https://github.com/university-of-york/uoy-app-course-search/wiki) for architectural decisions and related developer guides.

### Prerequisites

 - You will need [Node.js](https://nodejs.org/en/download/) (v12) installed on your machine.
 - You will need to have configured a `.npmrc` file with a GitHub token that has read access to packages from the [Digital Services Pattern Library React Components](https://github.com/university-of-york/esg-lib-pattern-library-react-components) library.

### Local Development

This application uses [Next.js](https://nextjs.org/). The entry point for the application is `src/pages/index.js`.

Once started, the system is accessible at [http://localhost:3000](http://localhost:3000).

#### Run via command line

```
npm run dev
```

#### Run via IntelliJ IDEA

Open the `npm` window (right click on `package.json` and select `Show npm scripts`) and double-click on `dev`.

### Testing

Tests live in `src/tests`. To run them:

#### Run via command line

```
npm test
```

#### Run via IntelliJ IDEA

Open the `npm` window and double-click on `test`, or in `package.json` click on the green arrow next to the `test` entry.

#### Visual Testing 

Thi repo uses [Percy][Percy](https://percy.io/ad91c322/uoy-app-course-search) for visual testing - this allows us to see UI changes as a result of each pull request. More details can be found in the [University of York Wiki page](https://wiki.york.ac.uk/pages/viewpage.action?pageId=220921899) (University users only).

### Deployment

Deployment to the development and production environments happens through GitHub actions that trigger automatically when new code is merged into the `dev` and `main` branches. See the [deployment wiki page](https://github.com/university-of-york/uoy-app-course-search/wiki/Deployment) for more details.

#### Deploying to your own AWS account

You can run Course Search in your own AWS sandbox. Make sure you've got an active token under `~/.aws/credentials` (e.g. by logging into your account with `saml2aws`) and then run:

```
npm run deploy:dev
```
If you want to deploy a version that queries the production version of the Courses API, run:

```
npm run deploy
```

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
