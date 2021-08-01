const router = require("express").Router();
//Add models so I can use them
const { User, Blog, Comment } = require("./api/index");
//Express session data
const session = require("express-session");
//Authorization
const withAuth = require("../utils/auth");
//Sequelize to save session so user remains logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//Connect to database
const sequelize = require("../config/connection");


//Get blog posts with title and date created
router.get('/', withAuth, async (req, res) => {
    try {
        const dashInfo = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
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
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Update blog post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // create method
    // expects an object in the form {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
      const dashInfo = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'contents', 'title', 'created_at'],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
      if (!dashInfo) {
        // if no user is found, return an error
        res.status(404).json({ message: 'No post found.' });
        return;
      }
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//Delete blog post
router.delete('')

module.exports = router;
