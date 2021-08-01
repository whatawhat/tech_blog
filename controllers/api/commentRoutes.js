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
            user_id: req.session.user_id
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
router.put("/:id", withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.findOne({ where: comment_id = req.session.comment_id }
            )
            if(!commentInfo) {
                res.status(400).json({ message: "No comment for this blog post."});
                return;
            }
            res.json(commentInfo)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete comment DELETE
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.destroy({
            where: {id: req.params.id}
        })
        if (!commentInfo) {
            res.status(400).json({ message: "No comment for this blog post"});
            return;
    }
        res.json(commentInfo)
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
    }
});

module.exports = roter;