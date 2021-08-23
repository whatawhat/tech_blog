const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
//const session = require("express-session");
//Authorization
const withAuth = require("../../utils/auth");
//const { post } = require("./userRoutes");

//Sequelize to save session so user remains logged in
//const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Create a new blog
router.post("/", withAuth, async (req, res) => {
   try {
    const newPost = await Post.create({
       name: req.body.name,
       content: req.body.content,
       user_id: req.session.user_id,
     });
//     if (!blogInfo) {
//       res.status(400).json({ message: "No blog with this id." });
//       return;
//     }
     res.status(200).json(newPost);
   } catch (err) {
     res.status(400).json(err);
   }
 });

//Get all blog posts with title and date
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      //attributes: ["id", "name", "content", "created_at"],
      //order: [["created_at", "DESC"]],
      include: 
        {
          model: User,
          model: Comment
          //attributes: ["username"],
        // {
        //   model: Comment,
        //   attributes: ["id", "text", "blog_id", "created_at", "user_id"],
        //   include: {
        //     model: User,
        //     attributes: ["username"],
        //   },
        }
    });
    res.status(200).json(posts);
} catch (err) {
    res.status(400).json(err);
}
//     if (!blogInfo) {
//       res.status(400).json({ message: "No blog posts." });
//       return;
//     }
//     res.json(blogInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
});

//Get one blog and get post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      //attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'name', 'created_at'],
      include: [
        {
            model: User,
            attributes: ["username"],
          }
      ]
        // {
        //   model: Blog,
        //   attributes: ["name", "id", "content", "created_at"],
        // },

        // {
        //   model: Comment,
        //   attributes: ["id", "text", "blog_id", "created_at"],
        //   include: {
        //     model: Blog,
        //     attributes: ["name"],
        //   },
    });
    if (!postData) {
      res.status(400).json({ message: "No blog found with this id." });
      return;
    }
    const commentsData = await Comment.findAll({
        where: {post_id: req.params.id},
        include: [
            {model: User,
            attributes: ['username'],}
        ]
    });

    let commentsArr = [];
    commentsData.forEach((comment) => {
        commentsArr.push(comment.get({plain:true}));
    })
    const post = postData.get({plain: true });
        res.render('onePost', { post, commentsArr, logged_in: req.session.logged_in});
    }
    catch(err){
        res.status(400).json(err);
    }
});

//New Comment
router.post('/comment', async (req, res) => {
    try{
        req.body.user_id = req.session.user_id;
  
        const CommentData = Comment.create(req.body);
  
        res.status(200).json(CommentData);
    } catch(err){
        res.status(400).json(err);
    }
  })



//Update a blog
// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     const blogInfo = await Blog.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!blogInfo) {
//       res.status(400).json({ message: "No blog post with that id" });
//       return;
//     }
//     res.json(blogInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

//Delete a blog
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const data = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!data) {
      res.status(400).json({ message: "No comment for this blog post" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
