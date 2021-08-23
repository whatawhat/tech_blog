const User = require('./User');
//const Blog = require('./Blog');
const Comment = require('./Comment');
const Post = require('./Post');

//const { belongsTo } = require('./Post');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

User.hasMany(Post, {
    foreignKey: "user_id"
});

// User.hasMany(Blog, {
//     foreignKey: "user_id"
// });

// Blog.belongsTo(User, {
//     foreignKey: "user_id",
//     onDelete: "cascade"
// });

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "cascade"

});

// Comment.belongsTo(Blog, {
//     foreignKey: "blog_id",
//     onDelete: "cascade"
// });

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "cascade"
});

// Blog.hasMany(Comment, {
//     foreignKey: "blog_id",
//     onDelete: "cascade"
// });

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "cascade"
});
module.exports = { User, Post, Comment };