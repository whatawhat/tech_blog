const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("../models");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Create a new blog
router.post("/", withAuth, async (req, res) => {
    try {
        const blogInfo = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        if(!blogInfo) {
            res.status(400).json({ message: "No blog with this id."})
            return;
        }
        res.json(blogInfo)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



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



//Get all blog posts with title and date
//Get one blog and get post title, content, username, date with option to leave comment
//Delete a blog
//Update a blog




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