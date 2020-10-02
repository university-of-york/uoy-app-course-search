# Course Search

This is the frontend for the Course Search application. It allows
prospective students to view a list of courses at the University of York
and follow links to course pages.

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

### Code style

The project defines rules for code formatting and style. Code is checked against these
rules upon creation of a pull request and upon a merge into `dev` or `main` branches on Github.
These checks are configured in `.github/workflows/checks.yml`.

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

**npm run dev**

Start the application locally (running at http://localhost:3000 by default).

**npm run build**

Build the application. The build folder is `.next`.

**npm run start**

Start the application that has been built. This will use the code in the `.next` folder rather than the current source code.

**npm run deploy**

Deploy the application to AWS. To deploy to your AWS sandbox, you will need to 
* be logged in to AWS using [saml2aws](https://wiki.york.ac.uk/display/AWS/2.+Command+Line+Access)
* have defined an environment variable called `AWS_ACCOUNT_ID` with the account id of your sandbox:

```
set AWS_ACCOUNT_ID=012345678
```

You can find your sandbox AWS account id by logging in to AWS either via
the web console or via saml2aws - it is displayed when you select which
account you want to use.

**npm run test**

Run the application's tests.

**npm run format**

Format all code using the team's agreed formatting rules. This uses `prettier`.

**npm run checkformat**

Check all code is correctly formatted according to agreed rules. Uses `prettier`.

**npm run lint**

Check to see if code meets the team's agreed coding standards. This uses `XO` (which in turn uses `eslint`).

**npm run check**

Checks code formatting (`prettier`), checks coding standards (`XO`), then runs tests.

**npm run formatandcheck**

Fixes code formatting (`prettier`), checks coding standards (`XO`), then runs tests.

## Testing

Tests live in `src/tests`. To run them:

```
npm run test
```

Or, in Intellij, open the `npm` window and double-click on `test`.

## Accessibility

The application's linting process checks for conformance to accessibility standards
using [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

## Contact

- [Digital Platforms and Developments Team](mailto:marketing-support@york.ac.uk)
- [Enterprise Systems Teaching and Learning Team](mailto:esg-teaching-and-learning-group@york.ac.uk)

## Licence

MIT
