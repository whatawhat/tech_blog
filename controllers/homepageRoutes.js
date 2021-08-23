const router = require("express").Router();

//Add models so I can use them
const { User, Post, Comment } = require("../models");

//Express session data
//const session = require("express-session");

//Authorization
const withAuth = require("../utils/auth");

//Sequelize to save session so user remains logged in
//const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Routes

//Login page
router.get('/login', (req, res) => {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render('login');
    // } catch (err) {
    //     console.log(err);
    //     res.status(400).json(err);
    // }
});

//Signup page
// router.get('/signup', async (req, res) => {
//     try {
//         if (req.session.loggedIn) {
//             res.redirect('/');
//             return;
//         }
//         res.render('signup');
//     } catch (err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// });

//Home page with blog posts
//Get blog posts with title and date created 
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            //attributes: ["id", "name", "content", "created_at"],
            //order: [[ 'created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ["id", "text", "post_id", "user_id", "createdAt", "updatedAt"],
                    include: [{
                        model: User,
                        attributes: ["username"]}]
                    }
            ],
        });
        
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts, logged_in: req.session.logged_in});
        } catch (err) {
            res.status(400).json(err);
        }
        });

//get one blog post
// router.get("/post/:id", async (req, res) => {
//     try {
//         const homeInfo = await Blog.findAll({
//             where: { id: req.params.id },
//             attributes: ["id", "name", "content", "created_at"],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     attributes: ["id", "text", "blog_id", "user_id", "created_at"],
//                     include: {
//                         model: User,
//                         attributes: ["username"],
//                     }
//                 }
//             ]
//         })
//         if(!homeInfo) {
//             res.status(400).json({ message: "This id has no posts."});
//             return;
//         }
//         const blogs = homeInfo.map(blog => blog.get({ plain: true}));
//         res.render("one-blog", { blogs, loggedIn: req.session.loggedIn});
//     } catch (err) {
//         console.log(err);
//         res.status(400).json(err);
//     }
// });


module.exports = router;
