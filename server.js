/**
 * Import the Express framework for Node.js to create a web server
 * and manage HTTP routes.
 * 'require' loads the Express library, and the function 'express' initializes the app.
 */
const express = require('express');

const AuthRouter = require('./routes/AuthRouter');
const Middleware = require('./routes/AuthRouter');

const app = express();
const port = 3000;

/**
 * app.get() defines a route handler for HTTP GET requests.
 * '/' is the route path.
 * req (request): Contains information about the incoming request.
 * res (response): Used to send a response to the client.
 * res.send() sends the "Hello World!" message back to the client.
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Another GET route handler for '/test'.
 * It responds with "avshalommmmmmmm!" when the /test URL is accessed.
 */
app.get('/test', (req, res) => {
    res.send('avshalommmmmmmm!');
});


app.use("/auth", AuthRouter);
app.use(middleware)
app.get("/login", AuthController);

/**
 * Start the server and listen on the specified port.
 * A console log message confirms the server is running.
 */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
