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
          expect(Array.isArray(body.topics)).toBe(true);
        });
    });

    test("returns with appropriate properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).not.toBe(0);
          body.topics.forEach((topic) => {
            expect(typeof topic["slug"]).toBe("string");
            expect(typeof topic["description"]).toBe("string");
            expect(typeof topic["img_url"]).toBe("string");
          });
        });
    });

    test("object to contain slug, description, img_url", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).not.toBe(0);
          body.topics.forEach((topic) => {
            expect(topic).toEqual({
              slug: expect.any(String),
              description: expect.any(String),
              img_url: expect.any(String),
            });
          });
        });
    });
  });
  describe("GET /api/users", () => {
    test("returns with array of objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.users)).toBe(true);
        });
    });

    test("returns with appropriate properties", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).not.toBe(0);
          body.users.forEach((user) => {
            expect(typeof user["username"]).toBe("string");
            expect(typeof user["name"]).toBe("string");
            expect(typeof user["avatar_url"]).toBe("string");
          });
        });
    });
    test("object to contain username, name, avatar_url", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).not.toBe(0);
          body.users.forEach((user) => {
            expect(user).toEqual({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    test("article object has exactly the 8 required properties", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(Object.keys(article)).toEqual([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "article_img_url",
          ]);
          expect(Object.keys(article).length).toBe(8);
        });
    });

    test("404: returns 'Article not found' when article_id does not exist", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });

    test("returns appropriate article with relevant properties", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).toBe(1);
        });
    });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("returns correct number of comment of relevant article ", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
      });
  });

  test("returns correct number of comment of relevant article ", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });

  test("error appears when the article does not exist", () => {
    return request(app)
      .get("/api/articles/99999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  test("error appears when invalid article_id (not a number)", () => {
    return request(app)
      .get("/api/articles/sfea/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("return the correct data for article_id 5", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 5,
          });
        });
      });
  });

  test("query is in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("posts a new comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        author: "butter_bridge",
        body: "I have not idea what to think of this",
      })

      .expect(201)
      .then(({ body }) => {
        body.comment.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),

            created_at: expect.any(String),
            author: "butter_bridge",
            body: "I have not idea what to think of this",
            article_id: 1,
            votes: 0,
          });
        });
      });
  });

  test("error appears when the article does not exist", () => {
    return request(app)
      .post("/api/articles/99999/comments")
      .send({
        author: "butter_bridge",
        body: "This article doesn't exist",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("error appears when the article_id is invalid", () => {
    return request(app)
      .post("/api/articles/43uy/comments")
      .send({
        author: "butter_bridge",
        body: "This article doesn't exist",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("201:enters new positive votes and updates the article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 7 })
      .expect(201)
      .then(({ body }) => {
        const article = body.article;
        expect(article).toMatchObject({
          votes: 107,
          article_id: 1,
        });
      });
  });

  test("enters new negative votes and updates the article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -50 })
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        const article = body.article;

        expect(article).toMatchObject({
          votes: 50,
          article_id: 1,
        });
      });
  });

  // test("404: article does not exist", () => {
  //   return request(app)
  //     .patch("/api/articles/999999")
  //     .send({ inc_votes: 45 })
  //     .expect(404)
  //     .then(({ body }) => {
  //       expect(body.msg).toBe("Not found");
  //     });
  // });

  test("400: article id is invalid", () => {
    return request(app)
      .patch("/api/articles/ak4k")
      .send({ inc_votes: 44 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

// describe("DELETE /api/comments/:comment_id", () => {
//   test("204: removes relevant comment", () => {
//     return request(app)
//       .delete("/api/comments/1")

//       .expect(204)
//       .then(({ body }) => {
//         expect(body).toEqual({});
//       });
//   });
// });
