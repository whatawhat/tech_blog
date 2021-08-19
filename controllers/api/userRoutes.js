const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const session = require("express-session");
//Authorization
const withAuth = require("../../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes

// Add user
router.post("/", async (req, res) => {
  try {
    const userInfo = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (!userInfo) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // otherwise, save the session, and return the user object and a success message
    req.session.save(() => {
      // declare session variables
      req.session.user_id = userInfo.id;
      req.session.username = userInfo.username;
      req.session.loggedIn = true;

      res.json(userInfo);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

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
          attributes: ["id", "title", "contents", "created_at"],
        },
        //includes from the Comment model the id, comment date, blog_id and user_id
        {
          model: Comment,
          attributes: ["id", "comment", "created_at", "blog_id", "user_id"],
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
    res.status(400).json(err);
  }
});





// Login
router.post("/login", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { username: req.body.username }
        // email: req.body.email }
    });

    // if no username
    if (!userInfo) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }
    const validPass = userInfo.checkPassword(req.body.password);
    // if the password is no good
    if (!validPass) {
      res.status(400).json({ message: "Wrong password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.username = userInfo.username;
      req.session.loggedIn = true;

      res.json({ user: userInfo, message: "You are logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Log out
router.post("/logout", withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      res.status(400).end();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Update
router.put("/:id", withAuth, async (req, res) => {
  try {
    const userInfo = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });
    if (!userInfo[0]) {
      res.status(400).json({ message: "No user found with this id" });
      return;
    }
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userInfo = await User.destroy({
      where: { id: req.params.id }
    });
    if (!userInfo) {
      res.status(400).json({ message: "No user found with this id" });
      return;
    }
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
