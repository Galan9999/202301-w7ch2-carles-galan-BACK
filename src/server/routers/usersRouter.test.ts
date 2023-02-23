import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
import { type UserCredentials } from "../../types";
import { token } from "morgan";
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
      const mockedUserCredentials: UserCredentials = {
        username: "Carles",
        password: "12345678",
        email: "galan@",
      };
      const newMockedUser = User.create(mockedUserCredentials);

      const status = 200;

      const response = await request(app)
        .post(registerUrl)
        .send(mockedUserCredentials)
        .expect(status);

      expect(response.body).toHaveProperty("token");
    });
  });
});
