const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("../models");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes
//Get user by id
router.get("/:id", async (req, res) => {
  try {
    //finds one user from the User model but exclude the password attribute where id matches the request id
    const userInfo = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.params.id },
      //includes from the Blog model the id, title, contents, and date
      include: [
        {
          model: Blog,
          attributes: ["id", "title", "contents", "date"],
        },
        //includes from the Comment model the id, comment date, blog_id and user_id
        {
          model: Comment,
          attributes: ["id", "comment", "date", "blog_id", "user_id"],
          include: {
            model: Blog,
            attributes: ["title"],
          },
        },
      ],
    });
    //if there's no userInfo, then return these messages
    if (!userInfo) {
      res.status(400).json({ message: "No user found with that id" });
      return;
    }
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


