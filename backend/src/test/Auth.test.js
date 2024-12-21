const request = require("supertest");  // Import supertest
const app = require("../../app");
const dbConnection = require("../database/db");
const users = require("../models/UserSchema");

let account1 = {
    "name":"ido test1",
    "password": "ido1",
    "email": "ido1@gmail.com"
};
let account2 = {
    "name":"ido test2",
    "password": "ido2",
    "email": "ido2@gmail.com"
};
let account3 = {
    "name":"ido test3",
    "password": "ido3",
    "email": "ido3@gmail.com"
};



afterAll(async() => {
    try{
        await users.deleteOne({email: account1.email});
        await users.deleteOne({email: account2.email});
        await users.deleteOne({email: account3.email});

        await dbConnection.close(); // close db connection
    } catch(err) {
        console.log(err);
    }
});

describe("POST /auth/register", () => {
    test("register account1 successfully", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(account1)
            .expect("Content-Type", /json/)
            .expect(201);
        expect(res.body.message).toBe("User registered successfully");
    }, 10000);

    test("register account2 successfully", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(account2)
            .expect("Content-Type", /json/)
            .expect(201);
        expect(res.body.message).toBe("User registered successfully");
    }, 10000);

    test("register account3 successfully", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(account3)
            .expect("Content-Type", /json/)
            .expect(201);
        expect(res.body.message).toBe("User registered successfully");
    }, 10000);

    test("should get duplicate error", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(account1)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(res.body.message).toBe("Email already exists");

    }, 10000);

    test("should get missing parameters - email missing", async () => {
        const {email, ...account} = account1;
        const res = await request(app)
            .post("/auth/register")
            .send(account)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(res.body.message).toBe("Missing required field");

    }, 10000);

    test("should get missing parameters - password missing", async () => {
        const {password, ...account} = account1;
        const res = await request(app)
            .post("/auth/register")
            .send(account)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(res.body.message).toBe("Missing required field");

    }, 10000);
});

describe("POST /auth/login", () => {
    test("should return the account1 info ", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send(account1)
            .expect("Content-Type", /json/)
            .expect(200);
        const {password, ...account} = account1;
        expect(res.body).toEqual(
            expect.objectContaining(account)
        );
    }, 10000);

    test("should return the account2 info ", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send(account2)
            .expect("Content-Type", /json/)
            .expect(200);
        const {password, ...account} = account2;
        expect(res.body).toEqual(
            expect.objectContaining(account)
        );
    }, 10000);

    test("should return the account3 info ", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send(account3)
            .expect("Content-Type", /json/)
            .expect(200);
        const {password, ...account} = account3;
        expect(res.body).toEqual(
            expect.objectContaining(account)
        );
    }, 10000);

    test("should return error missing parameter - email missing ", async () => {
        const login_data = {
            password: "shahar1@gmail.com"
        }
        const res = await request(app)
            .post("/auth/login")
            .send(login_data)
            .expect("Content-Type", /json/)
            .expect(400);
        expect(res.body.message).toBe("Missing required fields: email and/or password");
    }, 10000);

    test("should return error missing parameter - password missing ", async () => {
        const login_data = {
            email: "shahar1@gmail.com"
        }
        const res = await request(app)
            .post("/auth/login")
            .send(login_data)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(res.body.message).toBe("Missing required fields: email and/or password");
    }, 10000);

    test("should return error missing parameters - body missing ", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({})
            .expect("Content-Type", /json/)
            .expect(400);

        expect(res.body.message).toBe("Missing required fields: email and/or password");
    }, 10000);

    test("should return error not found account", async () => {
        const login_data = {
            email: "shahar123@gmail.com",
            password: "shahar1@gmail.com"
        }
        const res = await request(app)
            .post("/auth/login")
            .send(login_data)
            .expect("Content-Type", /json/)
            .expect(404);

        expect(res.body.message).toBe("User not found");
    }, 10000);

    test("should return authentication failed", async () => {
        const login_data = {
            email: "ido3@gmail.com",
            password: "asfsafddas"
        }
        const res = await request(app)
            .post("/auth/login")
            .send(login_data)
            .expect("Content-Type", /json/)
            .expect(401);

        expect(res.body.message).toBe("Authentication failed");
    }, 10000);

});