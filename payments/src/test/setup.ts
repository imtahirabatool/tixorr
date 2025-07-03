import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper.ts');

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Make a session object. { jwt }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as a base64 string
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return the string : the cookie with the encoded data
  return [`session=${base64}`];
};