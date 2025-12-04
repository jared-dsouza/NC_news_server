const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
const { forEach } = require("../db/data/test-data/articles.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("app", () => {
  describe("GET /api/topics", () => {
    test("returns with array of objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(Array.isArray(body.topics)).toBe(true);

          expect(body.topics.length).not.toBe(0);
          body.topics.forEach((topic) => {
            expect(typeof topic["slug"]).toBe("string");
            expect(typeof topic["description"]).toBe("string");
            expect(typeof topic["img_url"]).toBe("string");
          });
        });
    });
  });
});
