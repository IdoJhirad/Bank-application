require('dotenv').config();

const cors = require("cors");
const express = require('express');
const cookieParser = require("cookie-parser");

const authRouter = require("./src/routes/AuthRouter");
const accountRouter = require("./src/routes/AccountRouter");
const transactionRouter = require("./src/routes/TransactionRouter");
const app = express();

//addMiddleware
app.use(express.json());
//parse the cookies and make them accessible via req.cookies
app.use(cookieParser());
/**
 * specifies the allowed origins the domains from which requests are allowed.
 *  allows the server to accept cookies and other credentials
 *  exposedHeaders:  Specifies the headers that can be exposed to the browser in the response
 *  methods:  Defines the HTTP methods that are allowed for cross-origin requests. */
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
// parses incoming JSON request bodies

//maybe add morgan to  logs HTTP requests in a compact, human-readable format.

//the routes
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);
module.exports = app;