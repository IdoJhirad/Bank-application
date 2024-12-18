const request = require("supertest");  // Import supertest
const app = require("../../app");
const dbConnection = require("../database/db");

let user1 = {
    "name":"ido test1",
    "password": "ido1",
    "email": "ido1@gmail.com"
};
let user2 = {
    "name":"ido test2",
    "password": "ido2",
    "email": "ido2@gmail.com"
};
let user3 = {
    "name":"ido test3",
    "password": "ido3",
    "email": "ido3@gmail.com"
};

let user4 = {
    "name":"ido test4",
    "password": "ido4",
    "email": "ido4@gmail.com"
};
let user5 = {
    "name":"ido test5",
    "password": "ido5",
    "email": "ido5@gmail.com"
};
afterAll(async ()=>{
     await dbConnection.close();
})


describe("POST /auth/register", () => {
    test("register account1 successfully", async () => {
        const res = await request(app).post("/auth/register")
            .send(user5)
            .expect("Content-Type", /json/)
            .expect(201);  // Expecting 201 instead of 200
        expect(res.body.message).toBe("User registered successfully.");
    }, 10000);
});
