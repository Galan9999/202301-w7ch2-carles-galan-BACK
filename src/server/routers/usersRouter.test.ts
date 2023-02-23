import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
import { app } from "../index";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given POST '/users/login' endpoint", () => {
  describe("When it receives a request with name 'Carles' and password '12345678'", () => {
    test("It should repsond wiht a status code 200 and message and a message 'login successfull'", async () => {
      const registerUrl = "/users/login";
      const mockedUserCredentials = {
        username: "Carles",
        password: "12345678",
      };

      const response = await request(app)
        .post("/users/login")
        .send(registerUrl)
        .expect(respnse.body);
    });
  });
});
