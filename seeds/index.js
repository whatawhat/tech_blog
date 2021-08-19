const userSeed = require('./userData.json');
const blogSeed = require('./blogData.json');
const commentSeed = require('./commentData.json');
//Connects to database
const sequelize = require('../config/connection');

//newly added
//import user model
const { User, Comment, Blog } = require('../models');

const seedData = async() => {
    await sequelize.sync({ force: true });
    console.log("Connecting to Database");
    await User.bulkCreate(userSeed, {
       individualHooks: true,
       returning: true,
     });

    console.log("Seed users ran");
    //await blogSeed();
    await Blog.bulkCreate(blogSeed, {
        //individualHooks: true,
        returning: true,
      });
    console.log("Blogs posted");
    //await commentSeed();
    await Comment.bulkCreate(commentSeed, {
        //individualHooks: true,
        returning: true,
      });
    console.log("Comments are added");
    process.exit(0);
};

seedData();

