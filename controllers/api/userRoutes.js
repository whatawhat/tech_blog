const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("./index");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../../utils/auth");
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



// POST /api/users -- add a new user
router.post("/", async (req, res) => {
  try {
    // create method
    // expects an object in the form {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
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
    res.status(500).json(err);
  }
});

// POST /api/users/login -- login route for a user
router.post("/login", async (req, res) => {
  try {
    // findOne method by email to look for an existing user in the database with the email address entered
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    const userInfo = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // if the email is not found, return an error
    if (!userInfo) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    // Otherwise, verify the user.
    // call the instance method as defined in the User model
    const validPassword = userInfo.checkPassword(req.body.password);
    // if the password is invalid (method returns false), return an error
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // otherwise, save the session, and return the user object and a success message
    req.session.save(() => {
      // declare session variables
      req.session.user_id = userInfo.id;
      req.session.username = userInfo.username;
      req.session.loggedIn = true;

      res.json({ user: userInfo, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users/logout -- log out an existing user
router.post("/logout", withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        // 204 status is that a request has succeeded, but client does not need to go to a different page
        // (200 indicates success and that a newly updated page should be loaded, 201 is for a resource being created)
        res.status(204).end();
      });
    } else {
      // if there is no session, then the logout request will send back a no resource found status
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    // update method
    // if req.body has exact key/value pairs to match the model,
    // you can just use `req.body` instead of calling out each property,
    // allowing for updating only key/value pairs that are passed through
    const userInfo = await User.update(req.body, {
      // since there is a hook to hash only the password, the option is noted here
      individualHooks: true,
      // use the id as the parameter for the individual user to be updated
      where: {
        id: req.params.id,
      },
    });

    if (!userInfo[0]) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userInfo = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userInfo) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
