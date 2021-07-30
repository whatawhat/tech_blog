const User = require('./User');

const Blog = require('./Blog');

//Didn't use right now
//const Post = require('./Post');

const Comment = require('./Comment');

//const { belongsTo } = require('./Post');

Blog.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Blog, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Blog.hasMany(Comment, {
    foreignKey: "blog_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Blog.belongsTo(Blog, {
    foreignKey: "user_id"
});


module.exports = { User, Blog, Comment };