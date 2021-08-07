const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("../../models");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../../utils/auth");
const { post } = require("./userRoutes");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Create a new blog
router.post("/", withAuth, async (req, res) => {
  try {
    const blogInfo = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    if (!blogInfo) {
      res.status(400).json({ message: "No blog with this id." });
      return;
    }
    res.json(blogInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Get all blog posts with title and date
router.get("/", withAuth, async (req, res) => {
  try {
    const blogInfo = await Blog.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "created_at", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!blogInfo) {
      res.status(400).json({ message: "No blog posts." });
      return;
    }
    res.json(blogInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Get one blog and get post title, content, username, date with option to leave comment
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogInfo = await Blog.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Blog,
          attributes: ["title", "id", "content", "created_at"],
        },
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "created_at"],
          include: {
            model: Blog,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!blogInfo) {
      res.status(400).json({ message: "No blog found with this id." });
      return;
    }
    res.json(blogInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Update a blog
router.put("/id", withAuth, async (req, res) => {
  try {
    const blogInfo = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    if (!blogInfo) {
      res.status(400).json({ message: "No blog post with that id" });
      return;
    }
    res.json(blogInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//Delete a blog
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogInfo = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (!blogInfo) {
      res.status(400).json({ message: "No comment for this blog post" });
      return;
    }
    res.json(blogInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
