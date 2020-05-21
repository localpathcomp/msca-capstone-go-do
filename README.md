This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Things you'll need
1. mySQL or MariaDB Server **(production only)** *recommended v5.6 for production mySQL*
    -[MariaDB](https://mariadb.org/)
    -[mySQL](https://www.mysql.com/)
2. Node *^v12.0*
    -[Node.js](https://nodejs.org/en/)
3. NPM *^v6.0*
    -*included with Node*
    -[Node Package Manager](https://www.npmjs.com/get-npm)
4. Sendgrid API key
    -[Send Grid Site](https://sendgrid.com/)
5. XAMPP **(development only)** *includes latest stable MariaDB server*
    -[XAMPP](https://www.apachefriends.org/index.html)

## Getting started

1. Clone this repo to your machine
2. run `npm install`
3. Create a `.env` file at your document root
    -You'll want to add the contents of `.env.example` and modify to your environment
    -run `source.env`
4. Log in to your mySQL server
    -Run `init.sql`

## Available Scripts

In the project directory, you can run:

### `node app.js`

Runs the express server.<br />
Runs at [http://localhost:8080](http://localhost:8080) this is wher your API lives.

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
**This app is using a proxy. Your server will run on port 8080 and React will proxy all calls to that port.**

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# msca-capstone-go-do
