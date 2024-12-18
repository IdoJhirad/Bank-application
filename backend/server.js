const app = require("./app");
const dbConnection = require("./src/database/db");

//in this call it automatically connects to MongoDB and logs success or failure immediately.

/**
 * check if the db connected*/
dbConnection.on("connected", () => {
    //the listening/ the start
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});

dbConnection.on("error", (err) => {
    console.error("db error", err);
});