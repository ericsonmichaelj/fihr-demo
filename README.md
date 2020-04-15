This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Starting

The simpliest way to get started is to run

`yarn` and `yarn start:all:dev`

The application takes in two environmental variables 

- UPHEALTH_CLIENT_ID
- UPHEALTH_CLIENT_SECRET

Alternatively you can find the configuration in `/server/constants.js` and replace the environmental variables wit your own keys.

UPHEALTH_CLIENT_ID and UPHEALTH_CLIENT_SECRET are the client id and secret when registering. 


For more information see the link below:

- https://1up.health/dev/quick-start

A user needs to be created in order to log in. More information on creating a user can be found here:

- https://1up.health/dev/doc/user-management

As soon as you log in, you will either be redirected to the homepage or to where you were before going to the login page.

On the homepage, select a patient and you will be directed to a formatted page of the $everything Query.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### server:dev

Runs a server for local development. Will restart on any changes made

### server

Runs the server for production deployment.

### start:all:dev

The application runs on Node 8 or higher.

## Tech Debt Items

- State for access token should be shared []
- Fix linting warnings []
- Authorization is reusable and should be avoided in components. Can go into a higher order component, or render prop []
- Add PropTypes []
- Repeat logic in calling services can be encapsulated in an API class []
- Remove direct calls to the `window.location` for redirects in favor of `history.push` []
- Need tests to avoid regressions when adding features and refactoring []
- Avoid error page in favor of rendering errors on screen []
- Pagination can be cached better. Moving forward should also be cached []
