const request = require("supertest");
const app = require("../server");

describe("POST /api/signup", function() {
  it("creates a new user", function(done) {
    request(app)
      .post("/api/users")
      .send({
        firstname: "firstTest",
        lastname: "lastTest",
        username: "userTest",
        email: "testy@test.com",
        password: "test123"
      })
      .expect(200)
      .end(function(err, res) {
        if(err) {return done(err)};
        done();
      });
  });
});


// test("Should sign up a new user", async () => {
//   await request(app).post("/api/user")
//     .send({
//       firstname: "firstTest",
//       lastname: "lastTest",
//       username: "userTest",
//       email: "test@test.com",
//       password: "test123"
//     })
//     .expect(201);
// });

