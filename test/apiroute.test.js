const request = require("supertest");
const app = require("../server");

test("Should sign up a new user", async () => {
  await request(app).post("/api/user")
    .send({
      firstname: "firstTest",
      lastname: "lastTest",
      username: "userTest",
      email: "test@test.com",
      password: "test123"
    })
    .expect(201);
});

