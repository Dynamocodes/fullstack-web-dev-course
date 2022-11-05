const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await User.deleteMany({});
  let userjson = { username: "testuser", name: "testuser", password: "test" };
  let user = await api.post("/api/users").send(userjson);
  let res = await api
    .post("/api/login")
    .send({ username: "testuser", password: "test" });
  let login = res.body;
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs;
  const promiseArray = blogObjects.map((blog) =>
    api
      .post("/api/blogs")
      .set("authorization", `bearer ${login.token}`)
      .send(blog)
  );
  await Promise.all(promiseArray);
});

describe("Getting the blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test(`there are ${initialBlogs.length} blogs`, async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("the specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((b) => b.title);
    expect(titles).toContain("React patterns");
  });

  test("the field id is defined in all of the blogs", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    blogs.forEach((b) => expect(b.id).toBeDefined());
  });
});

describe("Adding a new blog", () => {
  test("a new blog is added to the database after a valid post request", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    let blog = {
      title: "my cool title",
      author: "test user",
      url: "www.mycoolblogsit.com/lkjsdflk/",
      likes: 4,
    };
    await api
      .post("/api/blogs")
      .set("authorization", `bearer ${login.token}`)
      .send(blog)
      .expect(201);
    const getResponse = await api.get("/api/blogs");
    titles = getResponse.body.map((b) => b.title);

    expect(titles).toContain(blog.title);
    expect(getResponse.body.length).toBe(initialBlogs.length + 1);
  });

  test("likes are initilized to 0 if no value is given", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    let blog = {
      title: "my other cool title",
      author: "Elien Hietanas",
      url: "www.mycoolblogsit.com/lkjsdflk/",
    };
    let postedBlog = await api
      .post("/api/blogs")
      .send(blog)
      .set("authorization", `bearer ${login.token}`)
      .expect(201);
    let response = await api.get("/api/blogs");
    expect(postedBlog.body.likes).toBe(0);
  });

  test("the title is mandatory", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    let blog = {
      author: "Elien Hietanas",
      url: "www.mycoolblogsit.com/lkjsdflk/",
    };
    await api
      .post("/api/blogs")
      .set("authorization", `bearer ${login.token}`)
      .send(blog)
      .expect(400);
    let blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("the url is mandatory", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    let blog = {
      title: "my cool title",
      author: "Elien Hietanas",
    };
    await api
      .post("/api/blogs")
      .set("authorization", `bearer ${login.token}`)
      .send(blog)
      .expect(400);
    let blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("the title AND the url are mandatory", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    let blog = {
      author: "Elien Hietanas",
    };
    await api
      .post("/api/blogs")
      .set("authorization", `bearer ${login.token}`)
      .send(blog)
      .expect(400);
    let blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("deletion of a blog", () => {
  test("the proper blog gets deleted if the note exists and if the logged in user created it", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    const initialBlogs = await helper.blogsInDb();
    const blogToRemove = initialBlogs[0];
    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .set("authorization", `bearer ${login.token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  });

  test("deletion of a blog that does not exist returns 404", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    const nonExistingId = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set("authorization", `bearer ${login.token}`)
      .expect(404);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("updating an existing blog", () => {
  test("update the correct blog when the entered data is valid", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = { ...initialBlogs[0] };
    blogToUpdate.likes = 30;
    await api
      .put(`/api/blogs/${initialBlogs[0].id}`)
      .set("authorization", `bearer ${login.token}`)
      .send(blogToUpdate);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(30);
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("update of a blog that does not exist returns 400", async () => {
    let res = await api
      .post("/api/login")
      .send({ username: "testuser", password: "test" });
    let login = res.body;
    const initialBlogs = await helper.blogsInDb();
    const { id, ...blogToUpdate } = initialBlogs[0];
    blogToUpdate.likes = 30;
    const nonExistingId = await helper.nonExistingId();
    const updatedBlog = await api
      .put(`/api/blogs/${nonExistingId}`)
      .set("authorization", `bearer ${login.token}`)
      .send(blogToUpdate)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
