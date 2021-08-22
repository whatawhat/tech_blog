const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

//const session = require("express-session");
//Authorization
//const withAuth = require("../../utils/auth");
//Sequelize to save session so user remains logged in

//const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes

// Add user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res. status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//Get user by id
//router.get("/:id", async (req, res) => {
  //try {

    // const userInfo = await User.findOne({
    //   attributes: { exclude: ["password"] },
    //   where: { id: req.params.id },
    //   include: [
    //     {
    //       model: Blog,
    //       attributes: ["id", "title", "contents", "created_at"],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ["id", "comment", "created_at", "blog_id", "user_id"],
    //       include: {
    //         model: Blog,
    //         attributes: ["title"],
    //       },
    //     },
    //   ],
    // });
    //if there's no userInfo, then return these messages
//     if (!userInfo) {
//       res.status(400).json({ message: "No user found with that id" });
//       return;
//     }
//     res.json(userInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });



// Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username }
        // email: req.body.email }
    });

    // if no username
    if (!userData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    // if the password is no good
    if (!validPassword) {
      res.status(400).json({ message: "Wrong password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      //req.session.username = userInfo.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are logged in!" });
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

// Log out
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      res.status(400).end();
    }
});

//Update
// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     const userInfo = await User.update(req.body, {
//       individualHooks: true,
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userInfo[0]) {
//       res.status(400).json({ message: "No user found with this id" });
//       return;
//     }
//     res.json(userInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const userInfo = await User.destroy({
//       where: { id: req.params.id }
//     });
//     if (!userInfo) {
//       res.status(400).json({ message: "No user found with this id" });
//       return;
//     }
//     res.json(userInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;
