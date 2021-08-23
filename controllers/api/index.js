const router = require('express').Router();
const userRoutes = require('./userRoutes');
//const blogRoutes = require('./blogRoutes');
//const commentRoutes = require('./commentRoutes');
const postsRoutes = require('./postsRoutes');

router.use('/users', userRoutes);
//router.use('/blog', blogRoutes);
//router.use('/comment', commentRoutes);
router.use('/posts', postsRoutes);

module.exports = router;