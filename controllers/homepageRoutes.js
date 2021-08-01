const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("./api");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes
//Get blog posts with title and date created
router.get("/", async (req, res) => {
    try {
        const homeInfo = await Blog.findAll({
            attributes: ["id", "title", "contents", "date"],
            order: [[ 'date', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ["id", "comment", "date", "blog_id", "user_id"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    }
                }
            ]
        })
        if(!homeInfo) {
            res.status(400).json({ message: "No posts found."});
            return;
        }
        res.json(homeInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Login page
router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Signup page
router.get('/signup', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }
        res.render('signup');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
