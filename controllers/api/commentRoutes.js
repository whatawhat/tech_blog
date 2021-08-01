const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("../models");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Create new comment
router.post("/", withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.create({ //Comment is a model and create is a property
            comment: req.body.comment, //from the comment model and requesting the body and it can be entered
            blog_id: req.session.blog_id, //uses session because it's pulling from the id
            user_id: req.session.user_ud
        })
        if(!commentInfo) {
            res.status(400).json({ message: "No comments for this user."});
            return;
        }
        res.json(commentInfo)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//View comment by GET
router.get("/", withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.findAll(req.body, {})
            if(!commentInfo) {
                res.status(400).json({ message: "No comments for this post."});
                return;
            }
            res.json(commentInfo)
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

//Update comment PUT


//Delete comment DELETE



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